-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Create users table
create table if not exists public.users (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  company_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create campaigns table
create table if not exists public.campaigns (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users on delete cascade not null,
  name text not null,
  subject text not null,
  content text not null,
  status text not null check (status in ('draft', 'scheduled', 'active', 'completed', 'archived')),
  scheduled_at timestamp with time zone,
  sent_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create subscribers table
create table if not exists public.subscribers (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users on delete cascade not null,
  email text not null,
  first_name text,
  last_name text,
  status text not null check (status in ('active', 'unsubscribed', 'bounced')),
  subscribed_at timestamp with time zone default timezone('utc'::text, now()) not null,
  last_engagement timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, email)
);

-- Create campaign_subscribers table
create table if not exists public.campaign_subscribers (
  id uuid default uuid_generate_v4() primary key,
  campaign_id uuid references public.campaigns on delete cascade not null,
  subscriber_id uuid references public.subscribers on delete cascade not null,
  status text not null check (status in ('pending', 'sent', 'opened', 'clicked', 'bounced')),
  sent_at timestamp with time zone,
  opened_at timestamp with time zone,
  clicked_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(campaign_id, subscriber_id)
);

-- Create subscriptions table
create table if not exists public.subscriptions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users on delete cascade not null,
  plan text not null check (plan in ('starter', 'professional', 'enterprise')),
  status text not null check (status in ('active', 'canceled', 'past_due')),
  current_period_start timestamp with time zone not null,
  current_period_end timestamp with time zone not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create email_templates table
create table if not exists public.email_templates (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users on delete cascade not null,
  name text not null,
  subject text not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create automations table
create table if not exists public.automations (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users on delete cascade not null,
  name text not null,
  trigger_type text not null check (trigger_type in ('subscriber_created', 'subscriber_unsubscribed', 'campaign_opened', 'campaign_clicked')),
  trigger_value text,
  action_type text not null check (action_type in ('send_email', 'add_to_segment', 'remove_from_segment')),
  action_value text not null,
  is_active boolean default true not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create segments table
create table if not exists public.segments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users on delete cascade not null,
  name text not null,
  conditions jsonb not null default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create segment_subscribers table
create table if not exists public.segment_subscribers (
  id uuid default uuid_generate_v4() primary key,
  segment_id uuid references public.segments on delete cascade not null,
  subscriber_id uuid references public.subscribers on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(segment_id, subscriber_id)
);

-- Create api_keys table
create table if not exists public.api_keys (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users on delete cascade not null,
  name text not null,
  key text not null,
  last_used_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(key)
);

-- Create RLS policies
alter table public.users enable row level security;
alter table public.campaigns enable row level security;
alter table public.subscribers enable row level security;
alter table public.campaign_subscribers enable row level security;
alter table public.subscriptions enable row level security;
alter table public.email_templates enable row level security;
alter table public.automations enable row level security;
alter table public.segments enable row level security;
alter table public.segment_subscribers enable row level security;
alter table public.api_keys enable row level security;

-- Users policies
create policy "Users can view their own data"
  on public.users for select
  using (auth.uid() = id);

create policy "Users can update their own data"
  on public.users for update
  using (auth.uid() = id);

-- Campaigns policies
create policy "Users can view their own campaigns"
  on public.campaigns for select
  using (auth.uid() = user_id);

create policy "Users can create their own campaigns"
  on public.campaigns for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own campaigns"
  on public.campaigns for update
  using (auth.uid() = user_id);

create policy "Users can delete their own campaigns"
  on public.campaigns for delete
  using (auth.uid() = user_id);

-- Subscribers policies
create policy "Users can view their own subscribers"
  on public.subscribers for select
  using (auth.uid() = user_id);

create policy "Users can create their own subscribers"
  on public.subscribers for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own subscribers"
  on public.subscribers for update
  using (auth.uid() = user_id);

create policy "Users can delete their own subscribers"
  on public.subscribers for delete
  using (auth.uid() = user_id);

-- Campaign subscribers policies
create policy "Users can view their own campaign subscribers"
  on public.campaign_subscribers for select
  using (
    exists (
      select 1 from public.campaigns
      where campaigns.id = campaign_subscribers.campaign_id
      and campaigns.user_id = auth.uid()
    )
  );

create policy "Users can create their own campaign subscribers"
  on public.campaign_subscribers for insert
  with check (
    exists (
      select 1 from public.campaigns
      where campaigns.id = campaign_subscribers.campaign_id
      and campaigns.user_id = auth.uid()
    )
  );

create policy "Users can update their own campaign subscribers"
  on public.campaign_subscribers for update
  using (
    exists (
      select 1 from public.campaigns
      where campaigns.id = campaign_subscribers.campaign_id
      and campaigns.user_id = auth.uid()
    )
  );

create policy "Users can delete their own campaign subscribers"
  on public.campaign_subscribers for delete
  using (
    exists (
      select 1 from public.campaigns
      where campaigns.id = campaign_subscribers.campaign_id
      and campaigns.user_id = auth.uid()
    )
  );

-- Subscriptions policies
create policy "Users can view their own subscriptions"
  on public.subscriptions for select
  using (auth.uid() = user_id);

create policy "Users can create their own subscriptions"
  on public.subscriptions for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own subscriptions"
  on public.subscriptions for update
  using (auth.uid() = user_id);

create policy "Users can delete their own subscriptions"
  on public.subscriptions for delete
  using (auth.uid() = user_id);

-- Email templates policies
create policy "Users can view their own email templates"
  on public.email_templates for select
  using (auth.uid() = user_id);

create policy "Users can create their own email templates"
  on public.email_templates for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own email templates"
  on public.email_templates for update
  using (auth.uid() = user_id);

create policy "Users can delete their own email templates"
  on public.email_templates for delete
  using (auth.uid() = user_id);

-- Automations policies
create policy "Users can view their own automations"
  on public.automations for select
  using (auth.uid() = user_id);

create policy "Users can create their own automations"
  on public.automations for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own automations"
  on public.automations for update
  using (auth.uid() = user_id);

create policy "Users can delete their own automations"
  on public.automations for delete
  using (auth.uid() = user_id);

-- Segments policies
create policy "Users can view their own segments"
  on public.segments for select
  using (auth.uid() = user_id);

create policy "Users can create their own segments"
  on public.segments for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own segments"
  on public.segments for update
  using (auth.uid() = user_id);

create policy "Users can delete their own segments"
  on public.segments for delete
  using (auth.uid() = user_id);

-- Segment subscribers policies
create policy "Users can view their own segment subscribers"
  on public.segment_subscribers for select
  using (
    exists (
      select 1 from public.segments
      where segments.id = segment_subscribers.segment_id
      and segments.user_id = auth.uid()
    )
  );

create policy "Users can create their own segment subscribers"
  on public.segment_subscribers for insert
  with check (
    exists (
      select 1 from public.segments
      where segments.id = segment_subscribers.segment_id
      and segments.user_id = auth.uid()
    )
  );

create policy "Users can delete their own segment subscribers"
  on public.segment_subscribers for delete
  using (
    exists (
      select 1 from public.segments
      where segments.id = segment_subscribers.segment_id
      and segments.user_id = auth.uid()
    )
  );

-- API keys policies
create policy "Users can view their own API keys"
  on public.api_keys for select
  using (auth.uid() = user_id);

create policy "Users can create their own API keys"
  on public.api_keys for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own API keys"
  on public.api_keys for update
  using (auth.uid() = user_id);

create policy "Users can delete their own API keys"
  on public.api_keys for delete
  using (auth.uid() = user_id);

-- Create functions for updating timestamps
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Create triggers for updating timestamps
create trigger handle_users_updated_at
  before update on public.users
  for each row
  execute function public.handle_updated_at();

create trigger handle_campaigns_updated_at
  before update on public.campaigns
  for each row
  execute function public.handle_updated_at();

create trigger handle_subscribers_updated_at
  before update on public.subscribers
  for each row
  execute function public.handle_updated_at();

create trigger handle_campaign_subscribers_updated_at
  before update on public.campaign_subscribers
  for each row
  execute function public.handle_updated_at();

create trigger handle_subscriptions_updated_at
  before update on public.subscriptions
  for each row
  execute function public.handle_updated_at();

create trigger handle_email_templates_updated_at
  before update on public.email_templates
  for each row
  execute function public.handle_updated_at();

create trigger handle_automations_updated_at
  before update on public.automations
  for each row
  execute function public.handle_updated_at();

create trigger handle_segments_updated_at
  before update on public.segments
  for each row
  execute function public.handle_updated_at();

create trigger handle_api_keys_updated_at
  before update on public.api_keys
  for each row
  execute function public.handle_updated_at(); 