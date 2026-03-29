-- schema.sql

-- 1. Create Profiles Table
CREATE TABLE public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create Subscriptions Table
CREATE TABLE public.subscriptions (
  user_id uuid references public.profiles(id) on delete cascade not null primary key,
  plan text default 'free'::text not null,
  status text default 'active'::text not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create Usage Table
CREATE TABLE public.usage (
  user_id uuid references public.profiles(id) on delete cascade not null primary key,
  generations_count integer default 0 not null,
  last_reset_date timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS) restricts data access per-user
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage ENABLE ROW LEVEL SECURITY;

-- Create basic RLS Select/Update Policies
CREATE POLICY "Users can view own profile" 
ON public.profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can view own subscription" 
ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own usage" 
ON public.usage FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own usage" 
ON public.usage FOR UPDATE USING (auth.uid() = user_id);

-- TRIGGER for automated onboarding logic
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  -- Auto-insert profile
  INSERT INTO public.profiles (id, email)
  VALUES (new.id, new.email);
  
  -- Auto-insert subscription (defaults to 'free')
  INSERT INTO public.subscriptions (user_id)
  VALUES (new.id);
  
  -- Auto-insert usage tracking (defaults to 0)
  INSERT INTO public.usage (user_id)
  VALUES (new.id);
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Whenever auth.users gets a row, our Trigger runs
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
