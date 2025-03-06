import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Campaign, CampaignSubscriber } from '@/types/database';

export function useAnalytics() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCampaignStats = async (campaignId: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data: campaign, error: campaignError } = await supabase
        .from('campaigns')
        .select('*')
        .eq('id', campaignId)
        .single();

      if (campaignError) throw campaignError;

      const { data: subscribers, error: subscribersError } = await supabase
        .from('campaign_subscribers')
        .select('*')
        .eq('campaign_id', campaignId);

      if (subscribersError) throw subscribersError;

      const totalSubscribers = subscribers.length;
      const openedCount = subscribers.filter(s => s.opened_at).length;
      const clickedCount = subscribers.filter(s => s.clicked_at).length;
      const unsubscribedCount = subscribers.filter(s => s.unsubscribed_at).length;

      return {
        campaign,
        stats: {
          totalSubscribers,
          openedCount,
          clickedCount,
          unsubscribedCount,
          openRate: totalSubscribers > 0 ? (openedCount / totalSubscribers) * 100 : 0,
          clickRate: totalSubscribers > 0 ? (clickedCount / totalSubscribers) * 100 : 0,
          unsubscribeRate: totalSubscribers > 0 ? (unsubscribedCount / totalSubscribers) * 100 : 0,
        },
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getSubscriberStats = async (subscriberId: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data: campaigns, error: campaignsError } = await supabase
        .from('campaign_subscribers')
        .select(`
          *,
          campaign:campaigns(*)
        `)
        .eq('subscriber_id', subscriberId)
        .order('created_at', { ascending: false });

      if (campaignsError) throw campaignsError;

      const totalCampaigns = campaigns.length;
      const openedCount = campaigns.filter(c => c.opened_at).length;
      const clickedCount = campaigns.filter(c => c.clicked_at).length;
      const unsubscribedCount = campaigns.filter(c => c.unsubscribed_at).length;

      return {
        campaigns,
        stats: {
          totalCampaigns,
          openedCount,
          clickedCount,
          unsubscribedCount,
          openRate: totalCampaigns > 0 ? (openedCount / totalCampaigns) * 100 : 0,
          clickRate: totalCampaigns > 0 ? (clickedCount / totalCampaigns) * 100 : 0,
          unsubscribeRate: totalCampaigns > 0 ? (unsubscribedCount / totalCampaigns) * 100 : 0,
        },
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getOverallStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: campaigns, error: campaignsError } = await supabase
        .from('campaigns')
        .select('*');

      if (campaignsError) throw campaignsError;

      const { data: subscribers, error: subscribersError } = await supabase
        .from('campaign_subscribers')
        .select('*');

      if (subscribersError) throw subscribersError;

      const totalCampaigns = campaigns.length;
      const totalSubscribers = subscribers.length;
      const totalOpened = subscribers.filter(s => s.opened_at).length;
      const totalClicked = subscribers.filter(s => s.clicked_at).length;
      const totalUnsubscribed = subscribers.filter(s => s.unsubscribed_at).length;

      return {
        stats: {
          totalCampaigns,
          totalSubscribers,
          totalOpened,
          totalClicked,
          totalUnsubscribed,
          averageOpenRate: totalSubscribers > 0 ? (totalOpened / totalSubscribers) * 100 : 0,
          averageClickRate: totalSubscribers > 0 ? (totalClicked / totalSubscribers) * 100 : 0,
          averageUnsubscribeRate: totalSubscribers > 0 ? (totalUnsubscribed / totalSubscribers) * 100 : 0,
        },
      };
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
    getCampaignStats,
    getSubscriberStats,
    getOverallStats,
  };
} 