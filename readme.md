![Superteam Malaysia Banner](/media/images/banners/stmy-official-banner.jpg)

# Superteam Malaysia

A dynamic community hub and CMS for the Superteam Malaysia ecosystem.

## Project Overview
Superteam Malaysia is a high-performance community platform built to connect Malaysian Solana builders with opportunities, events, and grants. The platform features a real-time landing page, searchable member and product directories, and a robust Admin CMS for managing all site content dynamically.

## Tech Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Database & Auth:** Supabase
- **Image Hosting:** Cloudinary
- **Animations:** Framer Motion
- **Events:** Luma Integration

## Environment Variables
Create a `.env.local` file in the root directory with the following keys:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_UPLOAD_PRESET=superteam-malaysia
```

## Installation Steps
1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Database Setup:**
   - Create a Supabase project.
   - Execute the SQL provided in `supabase/schema.sql` within the Supabase SQL Editor to initialize all required tables and RLS policies.

4. **Image Hosting Setup:**
   - Configure a Cloudinary account.
   - Create an unsigned upload preset named `superteam-malaysia`.

## Local Development Guide
To start the development server locally:

```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the site.

- **Admin Access:** Navigate to `/admin` to access the CMS.
- **Components:** UI components are located in `components/ui` (Radix UI + Tailwind).
- **Sections:** Landing page sections are modularized in `components/sections`.

## Deployment Instructions
This project is optimized for deployment on **Vercel**.

1. Connect your GitHub repository to Vercel.
2. Add all environment variables listed above to the Vercel project settings.
3. Use the following build settings:
   - **Framework Preset:** Next.js
   - **Build Command:** `pnpm build`
   - **Install Command:** `pnpm install`
4. Deploy.

---
**Submission Links:**
- **Bounty:** [🇲🇾 Superteam Malaysia — Website Design & Build Challenge](https://superteam.fun/earn/listing/superteam-malaysia-website-design-and-build-challenge)
- **Design:** [Figma Mockup](https://www.figma.com/design/ewbKzYg1ACtTvT5rTToqwC/SuperteamMY-Website-Design?node-id=0-1&t=5BitKSxp74aisxC1-1)
- **Portfolio:** [Notion Submission](https://www.notion.so/Website-Design-for-Superteam-Malaysia-30ba497b58e2808ab999f5a6d212eb22?source=copy_link)
