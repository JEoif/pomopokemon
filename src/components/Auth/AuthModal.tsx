import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

interface AuthModalProps {
  onClose: () => void;
}

type Tab = 'login' | 'signup';

export function AuthModal({ onClose }: AuthModalProps) {
  const { signIn, signUp } = useAuth();
  const [tab, setTab] = useState<Tab>('signup');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      if (tab === 'login') {
        await signIn(username.trim(), password);
        onClose();
      } else {
        if (!username.trim()) { setError('Choisis un pseudo.'); setLoading(false); return; }
        if (username.trim().length < 2) { setError('Pseudo trop court (2 caractères min).'); setLoading(false); return; }
        await signUp(username.trim(), password);
        setSuccess('Compte créé ! Tu peux maintenant te connecter.');
        setTab('login');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erreur inconnue';
      if (msg.includes('Invalid login') || msg.includes('invalid_credentials')) setError('Pseudo ou mot de passe incorrect.');
      else if (msg.includes('already registered') || msg.includes('already been registered')) setError('Ce pseudo est déjà pris.');
      else if (msg.includes('Password should be')) setError('Mot de passe trop court (6 caractères min).');
      else setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-sm rounded-3xl overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-2">
          <h2 className="text-lg font-bold text-white">
            {tab === 'login' ? 'Bon retour ! 👋' : 'Crée ton compte 🎮'}
          </h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all">✕</button>
        </div>

        {/* Tabs */}
        <div className="flex mx-5 mb-4 bg-slate-800/60 rounded-xl p-1 gap-1">
          <TabBtn label="Nouveau" active={tab === 'signup'} onClick={() => { setTab('signup'); setError(null); setSuccess(null); }} />
          <TabBtn label="Déjà un compte" active={tab === 'login'} onClick={() => { setTab('login'); setError(null); setSuccess(null); }} />
        </div>

        <form onSubmit={handleSubmit} className="px-5 pb-5 flex flex-col gap-3">
          <Input
            placeholder="Pseudo (ex: AshKetchum)"
            value={username}
            onChange={setUsername}
            maxLength={24}
            icon="🎮"
            autoFocus
          />
          <Input
            placeholder="Mot de passe"
            type="password"
            value={password}
            onChange={setPassword}
            icon="🔒"
          />

          {error && <p className="text-xs text-red-400 text-center px-2">{error}</p>}
          {success && <p className="text-xs text-emerald-400 text-center px-2">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 disabled:opacity-50 text-white font-bold text-sm transition-all mt-1"
          >
            {loading ? '...' : tab === 'login' ? 'Se connecter' : "C'est parti !"}
          </button>

          <p className="text-[11px] text-slate-500 text-center">
            Ta collection est sauvegardée automatiquement dans le cloud ☁️
          </p>
        </form>
      </div>
    </div>
  );
}

function TabBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}
      className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${active ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}>
      {label}
    </button>
  );
}

function Input({ placeholder, value, onChange, type = 'text', icon, maxLength, autoFocus }: {
  placeholder: string; value: string; onChange: (v: string) => void;
  type?: string; icon: string; maxLength?: number; autoFocus?: boolean;
}) {
  return (
    <div className="flex items-center gap-2 bg-slate-800/60 border border-slate-700/40 rounded-xl px-3 py-2 focus-within:border-pink-500/60 transition-colors">
      <span className="text-sm flex-shrink-0">{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        autoFocus={autoFocus}
        required
        className="flex-1 bg-transparent text-white text-sm placeholder-slate-500 outline-none"
      />
    </div>
  );
}
