import { useState, useRef } from 'react';
import type { CollectionState } from '../../types';
import type { AuthUser } from '../../lib/supabase';

const STORAGE_KEY = 'pomopokemon-save';
const PROFILE_NAME_KEY = 'pomopokemon-profile-name';

interface ProfileModalProps {
  collection: CollectionState;
  user: AuthUser | null;
  onClose: () => void;
  onSignOut: () => void;
  onImport: (state: CollectionState) => void;
}

export function ProfileModal({ collection, user, onClose, onSignOut, onImport }: ProfileModalProps) {
  const [name, setName] = useState(() => localStorage.getItem(PROFILE_NAME_KEY) ?? '');
  const [nameInput, setNameInput] = useState(name);
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const saveName = () => {
    const trimmed = nameInput.trim();
    if (!trimmed) return;
    localStorage.setItem(PROFILE_NAME_KEY, trimmed);
    setName(trimmed);
  };

  const handleExport = () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const profileName = name || 'Dresseur';
    const date = new Date().toISOString().slice(0, 10);
    const blob = new Blob([raw], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pomopokemon-${profileName}-${date}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportError(null);
    setImportSuccess(false);
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target?.result as string);
        if (!parsed.pokemon || !Array.isArray(parsed.pokemon)) {
          setImportError('Fichier invalide — ce n\'est pas une sauvegarde PomoPokemon.');
          return;
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
        onImport(parsed as CollectionState);
        setImportSuccess(true);
      } catch {
        setImportError('Fichier corrompu ou invalide.');
      }
    };
    reader.readAsText(file);
    // Reset input so same file can be re-imported
    e.target.value = '';
  };

  const stats = collection.stats;
  const pokemonCount = collection.pokemon.length;
  const shinyCount = collection.pokemon.filter((p) => p.isShiny).length;
  const uniqueCount = new Set(collection.pokemon.map((p) => p.pokemonId)).size;
  const hours = Math.floor(stats.totalMinutesFocused / 60);
  const mins = stats.totalMinutesFocused % 60;
  const focusTime = hours > 0 ? `${hours}h${mins > 0 ? String(mins).padStart(2, '0') : ''}` : `${mins}m`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-sm rounded-3xl overflow-hidden flex flex-col"
        style={{
          background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <h2 className="text-lg font-bold text-white">Mon Profil</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
          >
            ✕
          </button>
        </div>

        <div className="px-5 pb-5 flex flex-col gap-4">
          {/* Avatar + name */}
          <div className="flex items-center gap-3 bg-slate-800/50 rounded-2xl p-3 border border-slate-700/30">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-xl flex-shrink-0 font-bold text-white">
              {(user?.username || name || '?').slice(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              {user ? (
                <>
                  <p className="text-white font-semibold truncate">{user.username || user.email}</p>
                  <p className="text-xs text-emerald-400">☁ Sauvegarde cloud active</p>
                </>
              ) : name ? (
                <>
                  <p className="text-white font-semibold truncate">{name}</p>
                  <p className="text-xs text-slate-500">Dresseur local · <span className="text-pink-400">Connecte-toi pour sauver en cloud</span></p>
                </>
              ) : (
                <p className="text-slate-400 italic text-sm">Pas encore de nom</p>
              )}
            </div>
            {user && (
              <button onClick={onSignOut} className="text-xs text-slate-500 hover:text-red-400 transition-colors flex-shrink-0">
                Déco
              </button>
            )}
          </div>

          {/* Name input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && saveName()}
              placeholder="Ton nom de dresseur..."
              maxLength={24}
              className="flex-1 px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/40 text-white text-sm placeholder-slate-500 outline-none focus:border-pink-500/60 transition-colors"
            />
            <button
              onClick={saveName}
              disabled={!nameInput.trim() || nameInput.trim() === name}
              className="px-3 py-2 rounded-xl bg-pink-500 hover:bg-pink-400 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium transition-all"
            >
              Sauver
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-2">
            <StatBox label="Pokémon" value={String(pokemonCount)} icon="🎒" />
            <StatBox label="Uniques" value={String(uniqueCount)} icon="📖" />
            <StatBox label="Shiny ✨" value={String(shinyCount)} icon="⭐" />
            <StatBox label="Focus" value={focusTime} icon="⏱" />
          </div>

          {/* Divider */}
          <div className="border-t border-slate-700/40" />

          {/* Export */}
          <div className="flex flex-col gap-2">
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Sauvegarde</p>
            <button
              onClick={handleExport}
              disabled={pokemonCount === 0}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold transition-all flex items-center justify-center gap-2"
            >
              <span>⬇</span> Exporter ma sauvegarde
            </button>
            <p className="text-[11px] text-slate-500 text-center">
              Télécharge un fichier .json — garde-le précieusement
            </p>
          </div>

          {/* Import */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => fileRef.current?.click()}
              className="w-full py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold transition-all flex items-center justify-center gap-2"
            >
              <span>⬆</span> Importer une sauvegarde
            </button>
            <input
              ref={fileRef}
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
            {importError && (
              <p className="text-xs text-red-400 text-center">{importError}</p>
            )}
            {importSuccess && (
              <p className="text-xs text-emerald-400 text-center">✓ Sauvegarde restaurée !</p>
            )}
            <p className="text-[11px] text-slate-500 text-center">
              Restaure depuis un fichier exporté précédemment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="bg-slate-800/40 border border-slate-700/20 rounded-xl p-3 flex items-center gap-2">
      <span className="text-base">{icon}</span>
      <div>
        <p className="text-white font-bold text-sm leading-none">{value}</p>
        <p className="text-slate-500 text-[11px] mt-0.5">{label}</p>
      </div>
    </div>
  );
}
