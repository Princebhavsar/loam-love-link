-- Remove auto-grant admin trigger and function (privilege escalation risk)
DROP TRIGGER IF EXISTS on_auth_user_created_grant_admin ON auth.users;
DROP FUNCTION IF EXISTS public.auto_grant_admin_role();

-- Restrict EXECUTE on SECURITY DEFINER has_role() so signed-in users cannot
-- call it directly via the Data API. RLS policies still invoke it correctly
-- because policy evaluation runs with the table owner's privileges.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM authenticated;