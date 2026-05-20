
-- Allow public form submissions
CREATE POLICY "Public can submit quotes" ON public.quote_requests
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Public can subscribe" ON public.newsletter_subscribers
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Public can contact" ON public.contact_messages
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Public can claim promo" ON public.promo_claims
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Prevent duplicate promo claims by normalized email/phone
CREATE UNIQUE INDEX IF NOT EXISTS promo_claims_email_norm_unique
  ON public.promo_claims (promo_type, email_norm) WHERE email_norm IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS promo_claims_phone_norm_unique
  ON public.promo_claims (promo_type, phone_norm) WHERE phone_norm IS NOT NULL;
