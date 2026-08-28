-- DOWN de 00000000000001_profiles (Supabase). RIESGO: borra todos los perfiles.
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();
drop table if exists public.profiles;
