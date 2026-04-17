import { useEffect, useRef, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { CollectionState } from '../types';

const DEBOUNCE_MS = 3000; // save 3s after last change

export function useCloudSync(
  userId: string | null,
  collection: CollectionState,
  onCloudLoad: (state: CollectionState) => void,
) {
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSyncedRef = useRef<string>('');
  const isFirstLoad = useRef(true);

  // On login: load cloud save and merge with local
  useEffect(() => {
    if (!userId) return;
    isFirstLoad.current = true;

    supabase
      .from('saves')
      .select('collection, updated_at')
      .eq('user_id', userId)
      .single()
      .then(({ data }) => {
        if (data?.collection) {
          onCloudLoad(data.collection as CollectionState);
        }
        isFirstLoad.current = false;
      });
  }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-save on collection change (debounced)
  useEffect(() => {
    if (!userId || isFirstLoad.current) return;

    const serialized = JSON.stringify(collection);
    if (serialized === lastSyncedRef.current) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      await supabase.from('saves').upsert({
        user_id: userId,
        collection,
        updated_at: new Date().toISOString(),
      });
      lastSyncedRef.current = serialized;
    }, DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [userId, collection]);

  // Force immediate save (e.g. on page close)
  const syncNow = useCallback(async () => {
    if (!userId) return;
    await supabase.from('saves').upsert({
      user_id: userId,
      collection,
      updated_at: new Date().toISOString(),
    });
    lastSyncedRef.current = JSON.stringify(collection);
  }, [userId, collection]);

  return { syncNow };
}
