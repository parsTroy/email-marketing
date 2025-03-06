import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Subscription } from '@/types/database';

export function useSubscription() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getSubscription = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .single();

      if (error) throw error;
      return data as Subscription;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createSubscription = async (subscription: Omit<Subscription, 'id' | 'created_at' | 'updated_at'>) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .insert([subscription])
        .select()
        .single();

      if (error) throw error;
      return data as Subscription;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateSubscription = async (id: string, updates: Partial<Subscription>) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Subscription;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const cancelSubscription = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase
        .from('subscriptions')
        .update({ status: 'canceled' })
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

  return {
    loading,
    error,
    getSubscription,
    createSubscription,
    updateSubscription,
    cancelSubscription,
  };
} 