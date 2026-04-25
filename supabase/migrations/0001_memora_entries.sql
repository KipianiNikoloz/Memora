create table if not exists public.memora_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  default_tone text not null default 'Wise',
  created_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.memory_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (char_length(title) >= 3),
  memory text not null check (char_length(memory) >= 10),
  lesson text not null check (char_length(lesson) >= 5),
  emotion text not null,
  tags text[] not null default '{}',
  life_phase text not null,
  event_date date not null default current_date,
  ai_tone text not null default 'Wise',
  ai_title text,
  ai_response text,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists memory_entries_user_created_idx on public.memory_entries(user_id, created_at desc);
create index if not exists memory_entries_user_emotion_idx on public.memory_entries(user_id, emotion);
create index if not exists memory_entries_user_life_phase_idx on public.memory_entries(user_id, life_phase);

alter table public.memora_profiles enable row level security;
alter table public.memory_entries enable row level security;

create policy "Users can view own profile" on public.memora_profiles
  for select using ((select auth.uid()) = id);

create policy "Users can update own profile" on public.memora_profiles
  for update using ((select auth.uid()) = id);

create policy "Users can insert own profile" on public.memora_profiles
  for insert with check ((select auth.uid()) = id);

create policy "Users can create own memories" on public.memory_entries
  for insert with check ((select auth.uid()) = user_id);

create policy "Users can view own memories" on public.memory_entries
  for select using ((select auth.uid()) = user_id);

create policy "Users can update own memories" on public.memory_entries
  for update using ((select auth.uid()) = user_id);

create policy "Users can delete own memories" on public.memory_entries
  for delete using ((select auth.uid()) = user_id);
