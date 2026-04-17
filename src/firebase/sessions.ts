import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
  serverTimestamp,
  type Timestamp,
  type Unsubscribe,
} from 'firebase/firestore';
import { getFirebaseApp } from './config';
import type { CategoryId, TimerDuration } from '../types';

export function getDb() {
  return getFirestore(getFirebaseApp());
}

// ========== SESSION TYPES ==========

export interface SessionParticipant {
  uid: string;
  displayName: string;
  photoURL: string | null;
  taskName: string;
  category: CategoryId;
  status: 'waiting' | 'focusing' | 'break' | 'done';
  joinedAt: Timestamp | null;
  lastReward?: {
    nameFr: string;
    artworkUrl: string;
    isShiny: boolean;
    rarity: number;
  } | null;
}

export interface Session {
  id: string;
  hostUid: string;
  hostName: string;
  duration: TimerDuration;
  status: 'lobby' | 'running' | 'break' | 'ended';
  startedAt: Timestamp | null;
  createdAt: Timestamp | null;
  participants: Record<string, SessionParticipant>; // uid -> participant
}

// ========== SESSION CRUD ==========

/**
 * Generate a short 6-char session code (e.g. "A3K7M2")
 */
export function generateSessionCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

/**
 * Create a new session as host.
 */
export async function createSession(
  hostUid: string,
  hostName: string,
  duration: TimerDuration
): Promise<string> {
  const db = getDb();
  const code = generateSessionCode();
  const ref = doc(db, 'sessions', code);

  await setDoc(ref, {
    id: code,
    hostUid,
    hostName,
    duration,
    status: 'lobby',
    startedAt: null,
    createdAt: serverTimestamp(),
    participants: {},
  });

  return code;
}

/**
 * Join a session by code.
 */
export async function joinSession(
  sessionCode: string,
  participant: Omit<SessionParticipant, 'joinedAt'>
): Promise<void> {
  const db = getDb();
  const ref = doc(db, 'sessions', sessionCode.toUpperCase());

  await updateDoc(ref, {
    [`participants.${participant.uid}`]: {
      ...participant,
      joinedAt: serverTimestamp(),
    },
  });
}

/**
 * Update a participant's status.
 */
export async function updateParticipantStatus(
  sessionCode: string,
  uid: string,
  status: SessionParticipant['status']
): Promise<void> {
  const db = getDb();
  const ref = doc(db, 'sessions', sessionCode);
  await updateDoc(ref, {
    [`participants.${uid}.status`]: status,
  });
}

/**
 * Update participant task / category.
 */
export async function updateParticipantTask(
  sessionCode: string,
  uid: string,
  taskName: string,
  category: CategoryId
): Promise<void> {
  const db = getDb();
  const ref = doc(db, 'sessions', sessionCode);
  await updateDoc(ref, {
    [`participants.${uid}.taskName`]: taskName,
    [`participants.${uid}.category`]: category,
  });
}

/**
 * Share a reward result with the session.
 */
export async function shareReward(
  sessionCode: string,
  uid: string,
  reward: SessionParticipant['lastReward']
): Promise<void> {
  const db = getDb();
  const ref = doc(db, 'sessions', sessionCode);
  await updateDoc(ref, {
    [`participants.${uid}.lastReward`]: reward,
    [`participants.${uid}.status`]: 'done',
  });
}

/**
 * Start the session (host only).
 */
export async function startSession(sessionCode: string): Promise<void> {
  const db = getDb();
  const ref = doc(db, 'sessions', sessionCode);
  await updateDoc(ref, {
    status: 'running',
    startedAt: serverTimestamp(),
  });
}

/**
 * End / close a session.
 */
export async function endSession(sessionCode: string): Promise<void> {
  const db = getDb();
  const ref = doc(db, 'sessions', sessionCode);
  await updateDoc(ref, { status: 'ended' });
}

/**
 * Leave a session (remove participant entry).
 */
export async function leaveSession(sessionCode: string, uid: string): Promise<void> {
  const db = getDb();
  const ref = doc(db, 'sessions', sessionCode);
  // Firestore doesn't support delete of map keys directly, set to null then clean up client-side
  await updateDoc(ref, {
    [`participants.${uid}`]: null,
  });
}

/**
 * Real-time listener for a session document.
 */
export function subscribeToSession(
  sessionCode: string,
  callback: (session: Session | null) => void
): Unsubscribe {
  const db = getDb();
  const ref = doc(db, 'sessions', sessionCode.toUpperCase());
  return onSnapshot(ref, (snap) => {
    if (!snap.exists()) {
      callback(null);
      return;
    }
    const data = snap.data() as Session;
    // Filter out null participants (left users)
    const participants = Object.fromEntries(
      Object.entries(data.participants ?? {}).filter(([, v]) => v !== null)
    );
    callback({ ...data, participants });
  });
}
