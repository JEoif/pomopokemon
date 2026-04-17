import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { AuthUser } from '../lib/supabase';

function toFakeEmail(username: string): string {
  return `${username.toLowerCase().replace(/[^a-z0-9]/g, '')}@pomopokemon.app`;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Charge la session initiale
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({ id: session.user.id, email: session.user.email!, username: null });
      }
      setLoading(false);
    });

    // ⚠️ Ne PAS appeler supabase.from() ici — deadlock avec signUp/signIn
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(prev => {
          if (prev?.id === session.user!.id) return prev;
          return { id: session.user!.id, email: session.user!.email!, username: null };
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Charge le username séparément (jamais dans onAuthStateChange)
  useEffect(() => {
    if (!user?.id || user.username !== null) return;
    supabase
      .from('profiles')
      .select('username')
      .eq('id', user.id)
      .single()
      .then(({ data }) => {
        setUser(prev => prev ? { ...prev, username: data?.username ?? null } : null);
      });
  }, [user?.id]);

  const signUp = useCallback(async (username: string, password: string) => {
    const email = toFakeEmail(username);
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    if (data.user) {
      await supabase.from('profiles').insert({ id: data.user.id, username });
    }
  }, []);

  const signIn = useCallback(async (username: string, password: string) => {
    const email = toFakeEmail(username);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
  }, []);

  const updateUsername = useCallback(async (username: string) => {
    if (!user) return;
    await supabase.from('profiles').update({ username }).eq('id', user.id);
    setUser(prev => prev ? { ...prev, username } : null);
  }, [user]);

  return { user, loading, signUp, signIn, signOut, updateUsername };
}
