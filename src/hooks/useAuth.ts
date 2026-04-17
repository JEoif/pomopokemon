import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { AuthUser } from '../lib/supabase';

function toFakeEmail(username: string): string {
  return `${username.toLowerCase().replace(/[^a-z0-9]/g, '')}@pomopokemon.app`;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string, email: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('username')
      .eq('id', userId)
      .single();
    return { id: userId, email, username: data?.username ?? null };
  };

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const profile = await fetchProfile(session.user.id, session.user.email!);
        setUser(profile);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const profile = await fetchProfile(session.user.id, session.user.email!);
        setUser(profile);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

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
    setUser((prev) => prev ? { ...prev, username } : null);
  }, [user]);

  return { user, loading, signUp, signIn, signOut, updateUsername };
}
