alter table public.memora_profiles
  add constraint memora_profiles_default_tone_check
  check (default_tone in ('Motivational', 'Humorous', 'Wise')) not valid;

alter table public.memory_entries
  add constraint memory_entries_emotion_check
  check (emotion in ('Happy', 'Stressed', 'Proud', 'Disappointed', 'Grateful', 'Anxious', 'Frustrated', 'Other')) not valid,
  add constraint memory_entries_life_phase_check
  check (life_phase in ('New Beginnings', 'Growth and Learning', 'Relationships', 'Challenges', 'Milestones')) not valid,
  add constraint memory_entries_ai_tone_check
  check (ai_tone in ('Motivational', 'Humorous', 'Wise')) not valid;

alter table public.memora_profiles validate constraint memora_profiles_default_tone_check;
alter table public.memory_entries validate constraint memory_entries_emotion_check;
alter table public.memory_entries validate constraint memory_entries_life_phase_check;
alter table public.memory_entries validate constraint memory_entries_ai_tone_check;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

drop trigger if exists set_memory_entries_updated_at on public.memory_entries;
create trigger set_memory_entries_updated_at
before update on public.memory_entries
for each row
execute function public.set_updated_at();

drop trigger if exists set_xrpl_milestone_badges_updated_at on public.xrpl_milestone_badges;
create trigger set_xrpl_milestone_badges_updated_at
before update on public.xrpl_milestone_badges
for each row
execute function public.set_updated_at();
