-- Issues table
create table if not exists public.issues (
  id uuid default gen_random_uuid() primary key,
  volume integer not null,
  number integer not null,
  year integer not null,
  published_at date,
  full_pdf_url text,
  cover_url text,
  created_at timestamp default now()
);

-- Articles table
create table if not exists public.articles (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  authors text not null,
  pages text,
  category text,
  language text default 'Русский',
  issue_id uuid references public.issues(id) on delete cascade,
  pdf_url text,
  abstract text,
  views integer default 0,
  downloads integer default 0,
  created_at timestamp default now()
);

-- Announcements table
create table if not exists public.announcements (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  body text not null,
  published_at date default now(),
  created_at timestamp default now()
);

-- Enable RLS (public read, no public write)
alter table public.issues enable row level security;
alter table public.articles enable row level security;
alter table public.announcements enable row level security;

-- Public read policies (open access journal)
create policy "issues_public_read" on public.issues for select using (true);
create policy "articles_public_read" on public.articles for select using (true);
create policy "announcements_public_read" on public.announcements for select using (true);

-- Service role can do anything (used by admin panel via server-side calls)
-- (service role bypasses RLS by default, so no additional policies needed)
