export interface User {
  id: string;
  email: string;
  full_name: string | null;
  company_name: string | null;
  created_at: string;
  updated_at: string;
}

export interface Campaign {
  id: string;
  user_id: string;
  name: string;
  subject: string;
  content: string;
  status: "draft" | "scheduled" | "active" | "completed" | "archived";
  scheduled_at: string | null;
  sent_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Subscriber {
  id: string;
  user_id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  status: "active" | "unsubscribed" | "bounced";
  subscribed_at: string;
  last_engagement: string | null;
  created_at: string;
  updated_at: string;
}

export interface CampaignSubscriber {
  id: string;
  campaign_id: string;
  subscriber_id: string;
  status: "pending" | "sent" | "opened" | "clicked" | "bounced";
  sent_at: string | null;
  opened_at: string | null;
  clicked_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan: "starter" | "professional" | "enterprise";
  status: "active" | "canceled" | "past_due";
  current_period_start: string;
  current_period_end: string;
  created_at: string;
  updated_at: string;
}

export interface EmailTemplate {
  id: string;
  user_id: string;
  name: string;
  subject: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface Automation {
  id: string;
  user_id: string;
  name: string;
  trigger_type: "subscriber_created" | "subscriber_unsubscribed" | "campaign_opened" | "campaign_clicked";
  trigger_value: string | null;
  action_type: "send_email" | "add_to_segment" | "remove_from_segment";
  action_value: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Segment {
  id: string;
  user_id: string;
  name: string;
  conditions: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface SegmentSubscriber {
  id: string;
  segment_id: string;
  subscriber_id: string;
  created_at: string;
}

export interface ApiKey {
  id: string;
  user_id: string;
  name: string;
  key: string;
  last_used_at: string | null;
  created_at: string;
  updated_at: string;
} 