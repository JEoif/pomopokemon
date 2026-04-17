import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { RARITY_CONFIG } from '../../lib/raritySystem';
import type { UserProfile } from '../../firebase/firestore';
import type { CollectedPokemon, CollectionState } from '../../types';

interface ProfilePageProps {
  collection: CollectionState;
  uniqueCount: number;
  shinyCount: number;
  onClose: () => void;
}

export function ProfilePage({ collection, uniqueCount, shinyCount, onClose }: ProfilePageProps) {
  const { user, isConfigured } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [usernameInput, setUsernameInput] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [savingUsername, setSavingUsername] = useState(false);
  const [showcase, setShowcase] = useState<CollectedPokemon[]>([]);
  const [syncing, setSyncing] = useState(false);

  // Load profile on mount
  useEffect(() => {
    if (!user || !isConfigured) return;
    import('../../firebase/firestore').then(({ getUserProfile }) => {
      getUserProfile(user.uid).then((p) => {
        setProfile(p);
        setUsernameInput(p?.username ?? '');
      });
    });
  }, [user, isConfigured]);

  const handleSaveUsername = async () => {
    if (!user || !usernameInput.trim()) return;
    const clean = usernameInput.trim().toLowerCase().replace(/[^a-z0-9_]/g, '');
    if (clean.length < 3) {
      setUsernameError('Minimum 3 caracteres (lettres, chiffres, _)');
      return;
    }
    setSavingUsername(true);
    setUsernameError('');
    try {
      const { isUsernameAvailable, createOrUpdateProfile } = await import('../../firebase/firestore');
      if (profile?.username !== clean) {
        const available = await isUsernameAvailable(clean);
        if (!available) {
          setUsernameError('Ce pseudo est deja pris !');
          return;
        }
      }
      await createOrUpdateProfile(user.uid, {
        uid: user.uid,
        displayName: user.displayName ?? '',
        username: clean,
        photoURL: user.photoURL ?? null,
      });
      setProfile((p) => p ? { ...p, username: clean } : null);
    } catch {
      setUsernameError('Erreur lors de la sauvegarde.');
    } finally {
      setSavingUsername(false);
    }
  };

  const handleSyncStats = async () => {
    if (!user || !isConfigured) return;
    setSyncing(true);
    try {
      const { syncCollectionStats, updateShowcase } = await import('../../firebase/firestore');
      await syncCollectionStats(user.uid, {
        totalPomodoros: collection.stats.totalPomodoros,
        totalMinutesFocused: collection.stats.totalMinutesFocused,
        totalCaught: collection.pokemon.length,
        uniqueCaught: uniqueCount,
        shinyCaught: shinyCount,
      });
      if (showcase.length > 0) {
        await updateShowcase(user.uid, showcase);
      }
    } catch {}
    finally { setSyncing(false); }
  };

  const toggleShowcase = (pokemon: CollectedPokemon) => {
    setShowcase((prev) => {
      if (prev.find((p) => p.id === pokemon.id)) {
        return prev.filter((p) => p.id !== pokemon.id);
      }
      if (prev.length >= 3) return prev; // max 3
      return [...prev, pokemon];
    });
  };

  if (!isConfigured) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
        <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-6 w-full max-w-sm text-center">
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white">×</button>
          <p className="text-4xl mb-3">🔧</p>
          <h2 className="text-xl font-bold text-white mb-2">Firebase non configure</h2>
          <p className="text-slate-400 text-sm">
            Ajoute tes variables Firebase dans le fichier <code className="text-pink-400">.env</code> pour activer les profils.
          </p>
          <button onClick={onClose} className="mt-4 px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-sm hover:bg-slate-700 transition-all">
            Fermer
          </button>
        </div>
      </div>
    );
  }

  const hours = Math.floor(collection.stats.totalMinutesFocused / 60);
  const mins = collection.stats.totalMinutesFocused % 60;
  const focusStr = hours > 0 ? `${hours}h${mins > 0 ? mins : ''}` : `${mins}m`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl p-6 w-full max-w-sm shadow-2xl my-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-white text-xl transition-colors"
        >
          ×
        </button>

        {/* Avatar + name */}
        <div className="flex flex-col items-center gap-3 mb-6">
          {user?.photoURL ? (
            <img src={user.photoURL} alt="" className="w-16 h-16 rounded-full ring-2 ring-pink-500/30" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-2xl font-bold text-white">
              {(user?.displayName ?? 'U')[0]}
            </div>
          )}
          <div className="text-center">
            <p className="text-lg font-bold text-white">{user?.displayName}</p>
            {profile?.username && (
              <p className="text-slate-500 text-sm">@{profile.username}</p>
            )}
          </div>
        </div>

        {/* Username setup */}
        <div className="mb-5">
          <label className="text-xs text-slate-400 uppercase tracking-wider block mb-2">
            Pseudo public
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              placeholder="ex: leywin_97"
              className="flex-1 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700/50 text-white text-sm placeholder-slate-600 outline-none focus:border-pink-500/50 transition-all"
            />
            <button
              onClick={handleSaveUsername}
              disabled={savingUsername}
              className="px-3 py-2 rounded-xl bg-pink-500/20 border border-pink-500/30 text-pink-300 text-sm hover:bg-pink-500/30 transition-all disabled:opacity-50"
            >
              {savingUsername ? '...' : '✓'}
            </button>
          </div>
          {usernameError && <p className="text-red-400 text-xs mt-1">{usernameError}</p>}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          <StatMini label="Captures" value={String(collection.pokemon.length)} icon="🎯" />
          <StatMini label="Uniques" value={String(uniqueCount)} icon="📋" />
          <StatMini label="Shiny" value={String(shinyCount)} icon="✨" />
          <StatMini label="Pomodoros" value={String(collection.stats.totalPomodoros)} icon="🍅" />
          <StatMini label="Focus" value={focusStr} icon="⏱" />
          <StatMini label="Rarete max" value={getMaxRarity(collection.pokemon)} icon="⭐" />
        </div>

        {/* Showcase selector */}
        {collection.pokemon.length > 0 && (
          <div className="mb-5">
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">
              Vitrine ({showcase.length}/3 selectionnes)
            </p>
            <div className="grid grid-cols-4 gap-1.5 max-h-36 overflow-y-auto pr-1 scrollbar-none">
              {collection.pokemon.map((p) => {
                const selected = showcase.find((s) => s.id === p.id);
                return (
                  <button
                    key={p.id}
                    onClick={() => toggleShowcase(p)}
                    className={`relative rounded-lg p-1 border transition-all ${
                      selected
                        ? 'border-pink-500/60 bg-pink-500/10'
                        : 'border-slate-700/30 bg-slate-800/30 hover:border-slate-600'
                    }`}
                  >
                    <img src={p.artworkUrl} alt={p.nameFr} className="w-full h-10 object-contain" />
                    {selected && (
                      <span className="absolute top-0 right-0 text-[8px] text-pink-400 font-bold">✓</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Sync to cloud */}
        <button
          onClick={handleSyncStats}
          disabled={syncing || !user}
          className="w-full py-2.5 rounded-xl bg-slate-800 border border-slate-700/40 text-slate-300 text-sm hover:border-slate-600 hover:text-white transition-all disabled:opacity-40 flex items-center justify-center gap-2"
        >
          {syncing ? (
            <span className="w-3.5 h-3.5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
          ) : '☁️'}
          {syncing ? 'Synchronisation...' : 'Synchroniser avec le cloud'}
        </button>
      </div>
    </div>
  );
}

function StatMini({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="bg-slate-800/60 border border-slate-700/30 rounded-xl p-2 flex flex-col items-center gap-0.5">
      <span className="text-base">{icon}</span>
      <span className="text-sm font-bold text-white">{value}</span>
      <span className="text-[9px] text-slate-500 uppercase tracking-wider text-center">{label}</span>
    </div>
  );
}

function getMaxRarity(pokemon: CollectedPokemon[]): string {
  if (pokemon.length === 0) return '—';
  const max = Math.max(...pokemon.map((p) => p.rarity)) as 1 | 2 | 3 | 4 | 5;
  return RARITY_CONFIG[max]?.labelFr ?? '—';
}
