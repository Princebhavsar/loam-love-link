DROP POLICY IF EXISTS "Public can contact" ON public.contact_messages;
DROP POLICY IF EXISTS "Public can subscribe" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Public can claim promo" ON public.promo_claims;
DROP POLICY IF EXISTS "Public can submit quotes" ON public.quote_requests;
REVOKE INSERT ON public.contact_messages, public.newsletter_subscribers, public.promo_claims, public.quote_requests FROM anon;