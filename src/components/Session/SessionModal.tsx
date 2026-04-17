import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { CATEGORY_META } from '../../lib/taskDetector';
import { RARITY_CONFIG } from '../../lib/raritySystem';
import type { Session, SessionParticipant } from '../../firebase/sessions';
import type { CategoryId, TimerDuration } from '../../types';
import { DURATION_OPTIONS } from '../../types';

interface SessionModalProps {
  onClose: () => void;
  onJoinSession: (code: string) => void; // called when user is in a session and starts
  currentSessionCode: string | null;
  currentSession: Session | null;
  category: CategoryId | null;
  taskName: string;
}

type ModalView = 'menu' | 'create' | 'join' | 'lobby';

export function SessionModal({
  onClose,
  onJoinSession,
  currentSessionCode,
  currentSession,
  category,
  taskName,
}: SessionModalProps) {
  const { user } = useAuth();
  const [view, setView] = useState<ModalView>(currentSessionCode ? 'lobby' : 'menu');
  const [joinCode, setJoinCode] = useState('');
  const [sessionDuration, setSessionDuration] = useState<TimerDuration>(1500);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  // If we already have a session, show lobby
  useEffect(() => {
    if (currentSessionCode) setView('lobby');
  }, [currentSessionCode]);

  const handleCreate = async () => {
    if (!user) return;
    setLoading(true);
    setError('');
    try {
      const { createSession, joinSession } = await import('../../firebase/sessions');
      const code = await createSession(user.uid, user.displayName ?? 'Anonyme', sessionDuration);
      // Host joins their own session
      await joinSession(code, {
        uid: user.uid,
        displayName: user.displayName ?? 'Anonyme',
        photoURL: user.photoURL ?? null,
        taskName: taskName || 'A definir',
        category: category ?? 'other',
        status: 'waiting',
        lastReward: null,
      });
      onJoinSession(code);
      setView('lobby');
    } catch (err) {
      setError('Impossible de creer la session. Reessaie.');
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async () => {
    if (!user || !joinCode.trim()) return;
    setLoading(true);
    setError('');
    try {
      const { joinSession } = await import('../../firebase/sessions');
      await joinSession(joinCode.trim().toUpperCase(), {
        uid: user.uid,
        displayName: user.displayName ?? 'Anonyme',
        photoURL: user.photoURL ?? null,
        taskName: taskName || 'A definir',
        category: category ?? 'other',
        status: 'waiting',
        lastReward: null,
      });
      onJoinSession(joinCode.trim().toUpperCase());
      setView('lobby');
    } catch {
      setError('Session introuvable. Verifie le code.');
    } finally {
      setLoading(false);
    }
  };

  const handleLeave = async () => {
    if (!user || !currentSessionCode) return;
    try {
      const { leaveSession } = await import('../../firebase/sessions');
      await leaveSession(currentSessionCode, user.uid);
    } catch {}
    onJoinSession(''); // clear session
    setView('menu');
  };

  const copyCode = () => {
    if (!currentSessionCode) return;
    navigator.clipboard.writeText(currentSessionCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const participants = currentSession
    ? Object.values(currentSession.participants)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-white text-lg transition-colors"
        >
          ×
        </button>

        {/* ===== MENU ===== */}
        {view === 'menu' && (
          <div className="flex flex-col gap-4">
            <div className="text-center">
              <h2 className="text-xl font-bold text-white">Session Co-op</h2>
              <p className="text-slate-400 text-sm mt-1">
                Travaille avec tes amis et boostez vos drops !
              </p>
            </div>

            <div className="bg-slate-800/40 border border-slate-700/30 rounded-xl p-3 text-xs text-slate-400">
              <p className="font-medium text-slate-300 mb-1">🤝 Bonus co-op</p>
              <p>+15% de chance d'avoir un Pokemon social/thematique</p>
              <p className="mt-1 text-slate-500">
                Pokemon sociaux : Togekiss, Audino, Lucario, Riolu...
              </p>
            </div>

            <button
              onClick={() => setView('create')}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold text-sm hover:from-pink-400 hover:to-purple-400 transition-all"
            >
              🎯 Creer une session
            </button>
            <button
              onClick={() => setView('join')}
              className="w-full py-3 rounded-xl bg-slate-800 border border-slate-700/40 text-slate-300 font-semibold text-sm hover:border-slate-600 hover:text-white transition-all"
            >
              🔗 Rejoindre avec un code
            </button>
          </div>
        )}

        {/* ===== CREATE ===== */}
        {view === 'create' && (
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-white">Nouvelle session</h2>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-slate-400 uppercase tracking-wider">
                Duree du pomodoro
              </label>
              <div className="flex gap-2">
                {DURATION_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setSessionDuration(opt.value)}
                    className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-all ${
                      sessionDuration === opt.value
                        ? 'bg-pink-500/20 text-pink-300 border-pink-500/40'
                        : 'bg-slate-800/60 text-slate-400 border-slate-700/30 hover:text-white'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {error && <p className="text-red-400 text-xs">{error}</p>}

            <button
              onClick={handleCreate}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold text-sm disabled:opacity-50 transition-all"
            >
              {loading ? 'Creation...' : 'Creer la session'}
            </button>
            <button onClick={() => setView('menu')} className="text-xs text-slate-500 hover:text-slate-400">
              ← Retour
            </button>
          </div>
        )}

        {/* ===== JOIN ===== */}
        {view === 'join' && (
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-white">Rejoindre</h2>

            <input
              type="text"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              placeholder="Code ex: A3K7M2"
              maxLength={6}
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700/50 text-white text-center text-xl font-bold tracking-widest placeholder-slate-600 outline-none focus:border-pink-500/50 transition-all"
            />

            {error && <p className="text-red-400 text-xs">{error}</p>}

            <button
              onClick={handleJoin}
              disabled={loading || joinCode.length < 6}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold text-sm disabled:opacity-40 transition-all"
            >
              {loading ? 'Connexion...' : 'Rejoindre'}
            </button>
            <button onClick={() => setView('menu')} className="text-xs text-slate-500 hover:text-slate-400">
              ← Retour
            </button>
          </div>
        )}

        {/* ===== LOBBY ===== */}
        {view === 'lobby' && currentSession && (
          <div className="flex flex-col gap-4">
            <div className="text-center">
              <h2 className="text-xl font-bold text-white">Session Active</h2>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="text-2xl font-mono font-bold tracking-widest text-pink-400">
                  {currentSessionCode}
                </span>
                <button
                  onClick={copyCode}
                  className="text-slate-500 hover:text-slate-300 text-xs transition-colors"
                >
                  {copiedCode ? '✓' : '📋'}
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Partage ce code avec tes amis
              </p>
            </div>

            {/* Participants */}
            <div className="flex flex-col gap-2">
              <p className="text-xs text-slate-500 uppercase tracking-wider">
                {participants.length} participant{participants.length > 1 ? 's' : ''}
              </p>
              {participants.map((p) => (
                <ParticipantRow key={p.uid} participant={p} />
              ))}
            </div>

            {/* Co-op bonus active */}
            {participants.length >= 2 && (
              <div className="bg-pink-500/10 border border-pink-500/20 rounded-xl p-3 text-center">
                <p className="text-sm text-pink-300 font-medium">🤝 Bonus co-op actif !</p>
                <p className="text-xs text-pink-400/60 mt-0.5">
                  +15% Pokemon sociaux sur le prochain drop
                </p>
              </div>
            )}

            <button
              onClick={handleLeave}
              className="w-full py-2.5 rounded-xl border border-slate-700/40 text-slate-400 text-sm hover:border-red-500/40 hover:text-red-400 transition-all"
            >
              Quitter la session
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ParticipantRow({ participant }: { participant: SessionParticipant }) {
  const categoryMeta = CATEGORY_META[participant.category] ?? CATEGORY_META.other;
  const statusColors: Record<SessionParticipant['status'], string> = {
    waiting: 'text-slate-500',
    focusing: 'text-green-400',
    break: 'text-blue-400',
    done: 'text-pink-400',
  };
  const statusLabels: Record<SessionParticipant['status'], string> = {
    waiting: 'En attente',
    focusing: '🔥 Focus',
    break: '☕ Pause',
    done: '✅ Termine',
  };

  return (
    <div className="flex items-center gap-3 bg-slate-800/40 border border-slate-700/20 rounded-xl p-2.5">
      {participant.photoURL ? (
        <img src={participant.photoURL} alt="" className="w-7 h-7 rounded-full" />
      ) : (
        <span className="w-7 h-7 rounded-full bg-slate-700 text-slate-400 flex items-center justify-center text-xs font-bold">
          {participant.displayName[0]}
        </span>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">
          {participant.displayName}
        </p>
        <p className="text-[10px] text-slate-500 truncate">
          {participant.taskName}
        </p>
      </div>
      <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
        <span
          className="text-xs font-medium flex items-center gap-1"
          style={{ color: categoryMeta.gradient.includes('#') ? undefined : undefined }}
        >
          {categoryMeta.emoji}
        </span>
        <span className={`text-[10px] font-medium ${statusColors[participant.status]}`}>
          {statusLabels[participant.status]}
        </span>
      </div>
      {/* Last reward */}
      {participant.lastReward && (
        <img
          src={participant.lastReward.artworkUrl}
          alt={participant.lastReward.nameFr}
          className="w-8 h-8 object-contain"
          title={`${participant.lastReward.nameFr}${participant.lastReward.isShiny ? ' ✨' : ''} (${RARITY_CONFIG[participant.lastReward.rarity as 1].labelFr})`}
        />
      )}
    </div>
  );
}
