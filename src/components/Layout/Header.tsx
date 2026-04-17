import { useEffect, useState } from 'react';
import type { AppView } from '../../types';
import type { AuthUser } from '../../lib/supabase';

const PROFILE_NAME_KEY = 'pomopokemon-profile-name';

interface HeaderProps {
  view: AppView;
  onChangeView: (view: AppView) => void;
  collectionCount: number;
  onOpenProfile: () => void;
  onOpenAuth: () => void;
  user: AuthUser | null;
  syncing: boolean;
}

export function Header({ view, onChangeView, collectionCount, onOpenProfile, onOpenAuth, user, syncing }: HeaderProps) {
  const [localName, setLocalName] = useState('');

  useEffect(() => {
    const update = () => setLocalName(localStorage.getItem(PROFILE_NAME_KEY) ?? '');
    update();
    window.addEventListener('storage', update);
    return () => window.removeEventListener('storage', update);
  }, []);

  const displayName = user?.username || localName;
  const initials = displayName ? displayName.slice(0, 2).toUpperCase() : null;

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-slate-800/60">
      <div className="flex items-center gap-2">
        <span className="text-xl">🍅</span>
        <h1 className="text-lg font-bold text-white tracking-tight">
          Pomo<span className="text-pink-400">Pokemon</span>
        </h1>
        {/* Sync indicator */}
        {user && (
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium transition-all ${
            syncing ? 'bg-yellow-500/20 text-yellow-400' : 'bg-emerald-500/20 text-emerald-400'
          }`}>
            {syncing ? '↑ sync...' : '☁ sauvé'}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <nav className="flex bg-slate-800/60 rounded-xl p-1 border border-slate-700/30 gap-0.5">
          <NavButton label="⏱ Timer" active={view === 'timer'} onClick={() => onChangeView('timer')} />
          <NavButton label="🏅 Roster" active={view === 'roster'} onClick={() => onChangeView('roster')} />
          <NavButton
            label={collectionCount > 0 ? `🎒 ${collectionCount}` : '🎒 Collection'}
            active={view === 'collection'}
            onClick={() => onChangeView('collection')}
          />
        </nav>

        {/* Auth / Profile button */}
        {user ? (
          <button
            onClick={onOpenProfile}
            className="w-8 h-8 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center hover:opacity-80 transition-all"
            title={displayName || 'Mon profil'}
          >
            <span className="text-xs font-bold text-white leading-none">
              {initials ?? '👤'}
            </span>
          </button>
        ) : (
          <button
            onClick={onOpenAuth}
            className="px-3 py-1.5 rounded-xl bg-pink-500/20 border border-pink-500/30 text-pink-400 text-xs font-medium hover:bg-pink-500/30 transition-all"
          >
            Connexion
          </button>
        )}
      </div>
    </header>
  );
}

function NavButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
        active ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-white'
      }`}
    >
      {label}
    </button>
  );
}
