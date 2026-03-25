alter table public.quotes enable row level security;
alter table public.quote_messages enable row level security;
alter table public.project_types enable row level security;
alter table public.budget_ranges enable row level security;
alter table public.timelines enable row level security;

drop policy if exists "Public can insert quotes" on public.quotes;
create policy "Public can insert quotes"
on public.quotes
for insert
to anon, authenticated
with check (true);

drop policy if exists "Authenticated can read quotes" on public.quotes;
create policy "Authenticated can read quotes"
on public.quotes
for select
to authenticated
using (true);

drop policy if exists "Authenticated can update quotes" on public.quotes;
create policy "Authenticated can update quotes"
on public.quotes
for update
to authenticated
using (true)
with check (true);

drop policy if exists "Public can read project types" on public.project_types;
create policy "Public can read project types"
on public.project_types
for select
to anon, authenticated
using (true);

drop policy if exists "Public can read budget ranges" on public.budget_ranges;
create policy "Public can read budget ranges"
on public.budget_ranges
for select
to anon, authenticated
using (true);

drop policy if exists "Public can read timelines" on public.timelines;
create policy "Public can read timelines"
on public.timelines
for select
to anon, authenticated
using (true);

drop policy if exists "Authenticated can read quote messages" on public.quote_messages;
create policy "Authenticated can read quote messages"
on public.quote_messages
for select
to authenticated
using (true);

drop policy if exists "Authenticated can insert quote messages" on public.quote_messages;
create policy "Authenticated can insert quote messages"
on public.quote_messages
for insert
to authenticated
with check (auth.uid() = user_id);
