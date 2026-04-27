# Guide: Connecting your project to Supabase

Follow these steps to set up your backend and link it to your website.

### 1. Create your Supabase Project
1.  Go to [supabase.com](https://supabase.com/) and sign in.
2.  Click **New Project** and select your organization.
3.  Enter a name (e.g., `Clouds Village`) and a secure database password.
4.  Wait for the project to finish provisioning (usually takes 1-2 minutes).

---

### 2. Get your API Credentials
1.  In your Supabase dashboard, go to **Project Settings** (gear icon) > **API**.
2.  Copy the **Project URL**.
3.  Copy the **anon public** key.

---

### 3. Update your Local Environment
1.  Open the `.env` file in your project root (`D:\cloud village\.env`).
2.  Replace the placeholders with your actual values:
    ```env
    VITE_SUPABASE_URL=https://your-project-id.supabase.co
    VITE_SUPABASE_ANON_KEY=your-actual-anon-key
    ```
3.  **Restart your development server** (stop it and run `npm run dev` again) so the new values take effect.

---

### 4. Set up the Database (SQL)
1.  Go to the **SQL Editor** in Supabase (the `>_` icon on the left).
2.  Click **New Query**.
3.  Paste the following SQL script to create all necessary tables:

```sql
-- 1. Create Tables
create table gallery (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  url text not null,
  type text default 'image' check (type in ('image', 'video')),
  category text default 'General'
);

create table destinations (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  description text not null,
  image_url text not null,
  distance text,
  map_link text
);

create table facilities (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  description text not null,
  image_url text not null,
  category text not null,
  badge text
);

create table settings (
  id uuid default gen_random_uuid() primary key,
  hero_title text,
  hero_subtitle text,
  bg_video_url text
);

create table bookings (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text not null,
  phone text,
  date date,
  message text
);

-- 2. Enable Row Level Security (RLS)
alter table gallery enable row level security;
alter table destinations enable row level security;
alter table facilities enable row level security;
alter table settings enable row level security;
alter table bookings enable row level security;

-- 3. Create Access Policies
-- Public can READ everything
create policy "Public read gallery" on gallery for select using (true);
create policy "Public read destinations" on destinations for select using (true);
create policy "Public read facilities" on facilities for select using (true);
create policy "Public read settings" on settings for select using (true);

-- Public can INSERT bookings (from the contact form)
create policy "Public insert bookings" on bookings for insert with check (true);

-- Authenticated Admin can do EVERYTHING
create policy "Admin manage gallery" on gallery for all using (auth.role() = 'authenticated');
create policy "Admin manage destinations" on destinations for all using (auth.role() = 'authenticated');
create policy "Admin manage facilities" on facilities for all using (auth.role() = 'authenticated');
create policy "Admin manage settings" on settings for all using (auth.role() = 'authenticated');
create policy "Admin manage bookings" on bookings for all using (auth.role() = 'authenticated');
```
4.  Click **Run**.

---

### 5. Setup Media Storage
1.  Go to **Storage** in Supabase.
2.  Click **New Bucket**.
3.  Name it exactly `media`.
4.  **Important**: Make it a **Public** bucket.
5.  Click **Save**.

---

### 6. Create your Admin Account
1.  Go to **Authentication** > **Users**.
2.  Click **Add User** > **Create new user**.
3.  Enter the email and password you want to use for the login page.
4.  **Confirm the email** (if required by your settings) or disable "Confirm Email" in **Auth** > **Providers** > **Email**.

---

### 7. Verification
1.  Go to `http://localhost:4000/login`.
2.  Sign in with the email and password you just created.
3.  Try uploading a photo in the **Gallery Manager**. If it appears, your connection is successful!
