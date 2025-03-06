import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Subscriber } from '@/types/database';

export function useSubscribers() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getSubscribers = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('subscribers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Subscriber[];
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getSubscriber = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('subscribers')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as Subscriber;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createSubscriber = async (subscriber: Omit<Subscriber, 'id' | 'created_at' | 'updated_at'>) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('subscribers')
        .insert([subscriber])
        .select()
        .single();

      if (error) throw error;
      return data as Subscriber;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateSubscriber = async (id: string, updates: Partial<Subscriber>) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('subscribers')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Subscriber;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteSubscriber = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase
        .from('subscribers')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const importSubscribers = async (subscribers: Omit<Subscriber, 'id' | 'created_at' | 'updated_at'>[]) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('subscribers')
        .insert(subscribers)
        .select();

      if (error) throw error;
      return data as Subscriber[];
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getSubscribers,
    getSubscriber,
    createSubscriber,
    updateSubscriber,
    deleteSubscriber,
    importSubscribers,
  };
} 