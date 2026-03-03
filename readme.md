![Superteam Malaysia Banner](/public/media/images/banners/stmy-official-banner.jpg)

# Superteam Malaysia Website

A dynamic community hub and CMS for Superteam Malaysia builders.

## Links
- **Bounty:** [Superteam Malaysia — Website Design & Build Challenge](https://superteam.fun/earn/listing/superteam-malaysia-website-design-and-build-challenge)
- **Submission:** [Notion Portfolio](https://www.notion.so/Website-Design-for-Superteam-Malaysia-30ba497b58e2808ab999f5a6d212eb22?source=copy_link)
- **Design:** [Figma Mockup](https://www.figma.com/design/ewbKzYg1ACtTvT5rTToqwC/SuperteamMY-Website-Design?node-id=0-1&t=5BitKSxp74aisxC1-1)

## Tech Stack
`Next.js` `Solana` `Supabase` `Tailwind CSS` `Cloudinary` `Framer Motion`

## Core Features
- **Dynamic Content:** Server-side rendered landing page where all stats, members, projects, and testimonials are fetched real-time from Supabase.
- **Admin CMS:** Secure portal at `/admin` using a screen-based navigation system to manage every section of the site.
- **Luma Integration:** Hybrid event section supporting both live Luma calendar embeds and featured manual events.
- **Member Directory:** Searchable and filterable directory of Malaysian Solana builders with flip-card profiles.
- **Product Showcase:** Directory of ecosystem products with direct links to X and live websites.

## Setup Instructions

### 1. Database (Supabase)
- Create a new Supabase project.
- Run the schema provided in `fe/supabase/schema.sql` in the SQL Editor to create tables for members, projects, events, partners, testimonials, and site settings.
- Enable Row Level Security (RLS) and ensure public read access is active for all tables except `admin_profiles`.

### 2. Image Hosting (Cloudinary)
- Create a Cloudinary account.
- Generate an unsigned upload preset named `superteam-malaysia`.
- Add your Cloud Name, API Key, and API Secret to the environment variables.

### 3. Luma Configuration
- Obtain your Luma Calendar Embed URL from your Luma dashboard.
- Log into the website admin portal and paste this URL into the **Website Content > Luma Live Feed** section to enable the live view.

### 4. Environment Variables
Create a `.env.local` file in the `fe` directory with the following:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_UPLOAD_PRESET=superteam-malaysia
```

### 5. Installation
```bash
cd fe
pnpm install
pnpm dev
```
