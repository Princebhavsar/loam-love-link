
-- ====== ROLES ======
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ====== PRODUCTS ======
CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  category text NOT NULL,
  price_per_yard numeric(10,2) NOT NULL,
  short_description text,
  description text,
  delivery_notes text,
  image_path text,
  sort_order int DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active products" ON public.products FOR SELECT USING (is_active = true);
CREATE POLICY "Admins manage products" ON public.products FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- ====== QUOTE REQUESTS ======
CREATE TABLE public.quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  fulfillment_type text NOT NULL CHECK (fulfillment_type IN ('delivery','pickup')),
  delivery_address text,
  pickup_time text,
  notes text,
  items jsonb NOT NULL,
  subtotal numeric(10,2) NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins view quotes" ON public.quote_requests FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins update quotes" ON public.quote_requests FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin'));

-- ====== NEWSLETTER ======
CREATE TABLE public.newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text,
  source text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins view subscribers" ON public.newsletter_subscribers FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));

-- ====== PROMO CLAIMS ======
CREATE TABLE public.promo_claims (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  promo_type text NOT NULL CHECK (promo_type IN ('first_time_10','returning_5')),
  invoice_number text,
  name_norm text GENERATED ALWAYS AS (lower(trim(customer_name))) STORED,
  email_norm text GENERATED ALWAYS AS (lower(trim(email))) STORED,
  phone_norm text GENERATED ALWAYS AS (regexp_replace(phone, '\D', '', 'g')) STORED,
  created_at timestamptz NOT NULL DEFAULT now()
);
-- Prevent same person claiming first_time_10 twice (any combination match)
CREATE UNIQUE INDEX promo_first_time_unique_email ON public.promo_claims(email_norm) WHERE promo_type = 'first_time_10';
CREATE UNIQUE INDEX promo_first_time_unique_phone ON public.promo_claims(phone_norm) WHERE promo_type = 'first_time_10';
CREATE UNIQUE INDEX promo_first_time_unique_name_phone ON public.promo_claims(name_norm, phone_norm) WHERE promo_type = 'first_time_10';
ALTER TABLE public.promo_claims ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins view promos" ON public.promo_claims FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));

-- ====== BLOG POSTS ======
CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  excerpt text,
  content text,
  cover_image text,
  published_at timestamptz DEFAULT now(),
  is_published boolean DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view published posts" ON public.blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Admins manage posts" ON public.blog_posts FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- ====== CONTACT MESSAGES ======
CREATE TABLE public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  source text DEFAULT 'contact_form',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins view messages" ON public.contact_messages FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
