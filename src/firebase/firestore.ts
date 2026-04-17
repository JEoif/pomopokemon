import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
  type Timestamp,
} from 'firebase/firestore';
import { getFirebaseApp } from './config';
import type { CollectedPokemon } from '../types';

export function getDb() {
  return getFirestore(getFirebaseApp());
}

// ========== USER PROFILES ==========

export interface UserProfile {
  uid: string;
  displayName: string;
  username: string;        // unique handle (e.g. "leywin")
  photoURL: string | null;
  totalPomodoros: number;
  totalMinutesFocused: number;
  totalCaught: number;
  uniqueCaught: number;
  shinyCaught: number;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
  // Public showcase (top 3 favorites)
  showcasePokemon: {
    pokemonId: number;
    nameFr: string;
    artworkUrl: string;
    isShiny: boolean;
    rarity: number;
  }[];
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const db = getDb();
  const ref = doc(db, 'users', uid);
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data() as UserProfile) : null;
}

export async function getUserByUsername(username: string): Promise<UserProfile | null> {
  const db = getDb();
  const q = query(collection(db, 'users'), where('username', '==', username.toLowerCase()));
  const snaps = await getDocs(q);
  if (snaps.empty) return null;
  return snaps.docs[0].data() as UserProfile;
}

export async function createOrUpdateProfile(
  uid: string,
  data: Partial<UserProfile>
): Promise<void> {
  const db = getDb();
  const ref = doc(db, 'users', uid);
  const existing = await getDoc(ref);

  if (existing.exists()) {
    await updateDoc(ref, { ...data, updatedAt: serverTimestamp() });
  } else {
    await setDoc(ref, {
      uid,
      displayName: '',
      username: '',
      photoURL: null,
      totalPomodoros: 0,
      totalMinutesFocused: 0,
      totalCaught: 0,
      uniqueCaught: 0,
      shinyCaught: 0,
      showcasePokemon: [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      ...data,
    });
  }
}

export async function syncCollectionStats(
  uid: string,
  stats: {
    totalPomodoros: number;
    totalMinutesFocused: number;
    totalCaught: number;
    uniqueCaught: number;
    shinyCaught: number;
  }
): Promise<void> {
  const db = getDb();
  const ref = doc(db, 'users', uid);
  await updateDoc(ref, { ...stats, updatedAt: serverTimestamp() });
}

export async function updateShowcase(
  uid: string,
  pokemon: CollectedPokemon[]
): Promise<void> {
  const db = getDb();
  const ref = doc(db, 'users', uid);
  const showcase = pokemon.slice(0, 3).map((p) => ({
    pokemonId: p.pokemonId,
    nameFr: p.nameFr,
    artworkUrl: p.artworkUrl,
    isShiny: p.isShiny,
    rarity: p.rarity,
  }));
  await updateDoc(ref, { showcasePokemon: showcase, updatedAt: serverTimestamp() });
}

// ========== USERNAME AVAILABILITY ==========

export async function isUsernameAvailable(username: string): Promise<boolean> {
  const db = getDb();
  const q = query(
    collection(db, 'users'),
    where('username', '==', username.toLowerCase())
  );
  const snaps = await getDocs(q);
  return snaps.empty;
}
