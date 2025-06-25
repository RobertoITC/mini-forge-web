🛠️ MiniForge

MiniForge is a full-stack (but server-optional) web app for commissioning, browsing, and buying custom 3-D printed miniatures and board-game upgrades. Built with React + Vite, Tailwind CSS, shadcn/ui, and Supabase (Auth · Database · Storage · Edge Functions).



⸻

✨ Features

Category	Highlights
Landing	Hero banner, animated product carousel, feature teasers
Catalog	Filter sidebar, search bar, product grid, details page with add-to-cart
Auth	Email + Magic Link, Google OAuth, profile avatar upload, RLS-secured profiles table
Cart	React context, badge indicator, quantity controls, local-storage persistence
Inspiration	Games Ideas library (miniature wargames & board games with printable upgrade suggestions)
Custom Orders	Multi-step form, file upload to Storage, custom_orders table with RLS
Admin ready	Order statuses, secured policies, edge-function hooks (Stripe etc.)


⸻

🔧 Tech Stack

Layer	Tech
Front-end	React 18, Vite, TypeScript
Styling	Tailwind CSS, shadcn/ui, Lucide Icons, framer-motion (select components)
State / Data	React Context (Auth, Cart), React Hook Form + Zod validation
Backend-as-a-Service	Supabase (PostgreSQL · Auth · Storage · Realtime)
Deployment	Works on Netlify, Vercel, Cloudflare, Render, Fly, …


⸻

🚀 Getting Started

# clone & install
pnpm i   # or npm install / yarn

# copy environment template
cp .env.example .env
# ↳ fill VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY

# start dev server
pnpm run dev

Tip: Want a one-click Supabase setup? Run supabase init, then supabase db push to apply the SQL in /sql.

⸻

🗂️ Project Structure

src/
 ├─ Components/        # reusable UI pieces
 ├─ Pages/             # route components (Home, Products, Cart, …)
 ├─ contexts/          # AuthContext, CartContext
 ├─ lib/               # supabaseClient.ts
 ├─ Types/             # shared TS interfaces
 public/
 ├─ games/             # hero images for Games Ideas page
 └─ assets/            # logo, banners, etc.


⸻

🛡️ Supabase Schema (Key Tables)

-- products
id uuid pk, name text, price numeric, image text, category text, description text

-- profiles
id uuid pk → auth.users.id, username text, avatar_url text

-- custom_orders (see /sql/custom_orders.sql)

All tables have Row-Level Security enabled; see /sql for policies.

⸻

📄 Scripts

Script	Description
dev	Vite dev server (localhost:5173)
build	Production build (dist/)
preview	Deploy-like static preview
supabase functions serve	Local edge-function test


⸻

🖼️ Credits & Assets
	•	Icons — Lucide
	•	Sample game logos & photos belong to their respective publishers (used here as placeholders only).
	•	Aceternity UI optional components by @shadcn.

⸻

📜 License

MIT

Craft, print, paint — Forge on! 🔨
