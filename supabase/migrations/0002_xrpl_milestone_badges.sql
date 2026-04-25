create table if not exists public.xrpl_milestone_badges (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  entry_id uuid not null references public.memory_entries(id) on delete cascade,
  status text not null check (status in ('pending', 'issued', 'failed')),
  recipient_address text not null,
  issuer_address text,
  nftoken_id text,
  offer_id text,
  mint_tx_hash text,
  offer_tx_hash text,
  accept_tx_hash text,
  metadata_uri text not null,
  issued_at timestamptz,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now()),
  error text,
  unique(user_id, entry_id)
);

create index if not exists xrpl_milestone_badges_user_status_idx on public.xrpl_milestone_badges(user_id, status);
create index if not exists xrpl_milestone_badges_entry_idx on public.xrpl_milestone_badges(entry_id);

alter table public.xrpl_milestone_badges enable row level security;

create policy "Users can create own milestone badges" on public.xrpl_milestone_badges
  for insert with check ((select auth.uid()) = user_id);

create policy "Users can view own milestone badges" on public.xrpl_milestone_badges
  for select using ((select auth.uid()) = user_id);

create policy "Users can update own milestone badges" on public.xrpl_milestone_badges
  for update using ((select auth.uid()) = user_id);

create policy "Users can delete own milestone badges" on public.xrpl_milestone_badges
  for delete using ((select auth.uid()) = user_id);
