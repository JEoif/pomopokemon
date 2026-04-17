import { useEffect, useState } from 'react';
import type { AppView } from '../../types';

const PROFILE_NAME_KEY = 'pomopokemon-profile-name';

interface HeaderProps {
  view: AppView;
  onChangeView: (view: AppView) => void;
  collectionCount: number;
  onOpenProfile: () => void;
}

export function Header({ view, onChangeView, collectionCount, onOpenProfile }: HeaderProps) {
  const [profileName, setProfileName] = useState('');

  useEffect(() => {
    const update = () => setProfileName(localStorage.getItem(PROFILE_NAME_KEY) ?? '');
    update();
    window.addEventListener('storage', update);
    return () => window.removeEventListener('storage', update);
  }, []);

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-slate-800/60">
      <div className="flex items-center gap-2">
        <span className="text-xl">🍅</span>
        <h1 className="text-lg font-bold text-white tracking-tight">
          Pomo<span className="text-pink-400">Pokemon</span>
        </h1>
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

        {/* Profile button */}
        <button
          onClick={onOpenProfile}
          className="w-8 h-8 rounded-xl bg-slate-800/60 border border-slate-700/30 flex items-center justify-center hover:bg-slate-700 transition-all overflow-hidden"
          title={profileName || 'Mon profil'}
        >
          {profileName ? (
            <span className="text-xs font-bold text-pink-400 uppercase leading-none">
              {profileName.slice(0, 2)}
            </span>
          ) : (
            <span className="text-sm">👤</span>
          )}
        </button>
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
