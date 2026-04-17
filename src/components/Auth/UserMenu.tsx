import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface UserMenuProps {
  onOpenProfile: () => void;
  onOpenSession: () => void;
}

export function UserMenu({ onOpenProfile, onOpenSession }: UserMenuProps) {
  const { user, isConfigured } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  if (!isConfigured || !user) return null;

  const handleSignOut = async () => {
    const { signOut } = await import('../../firebase/auth');
    await signOut();
    setOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-2 py-1.5 rounded-xl bg-slate-800/60 border border-slate-700/30 hover:border-slate-600 transition-all"
      >
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName ?? 'User'}
            className="w-5 h-5 rounded-full"
          />
        ) : (
          <span className="w-5 h-5 rounded-full bg-pink-500/30 text-pink-400 text-xs flex items-center justify-center font-bold">
            {(user.displayName ?? 'U')[0]}
          </span>
        )}
        <span className="text-xs text-slate-300 max-w-[80px] truncate">
          {user.displayName?.split(' ')[0] ?? 'Profil'}
        </span>
        <span className="text-slate-600 text-[10px]">▾</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-44 bg-slate-800 border border-slate-700/50 rounded-xl shadow-xl shadow-black/40 overflow-hidden z-50">
          <button
            onClick={() => { onOpenProfile(); setOpen(false); }}
            className="w-full px-4 py-2.5 text-left text-sm text-slate-300 hover:bg-slate-700/60 hover:text-white transition-colors flex items-center gap-2"
          >
            <span>👤</span> Mon profil
          </button>
          <button
            onClick={() => { onOpenSession(); setOpen(false); }}
            className="w-full px-4 py-2.5 text-left text-sm text-slate-300 hover:bg-slate-700/60 hover:text-white transition-colors flex items-center gap-2"
          >
            <span>🤝</span> Session co-op
          </button>
          <div className="border-t border-slate-700/40 my-0.5" />
          <button
            onClick={handleSignOut}
            className="w-full px-4 py-2.5 text-left text-sm text-slate-500 hover:bg-slate-700/60 hover:text-red-400 transition-colors flex items-center gap-2"
          >
            <span>🚪</span> Deconnexion
          </button>
        </div>
      )}
    </div>
  );
}
