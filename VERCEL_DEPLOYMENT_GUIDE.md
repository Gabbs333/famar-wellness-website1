# Vercel Deployment Guide for Famar Wellness

## Current Status
You've migrated from Netlify to Vercel due to free tier limitations. All API endpoints are returning 404 errors on Vercel despite environment variables being set.

## Changes Made

### 1. Fixed API Structure
- Removed conflicting Next.js-style route files (`api/book/route.ts`, `api/contact/route.ts`, `api/newsletter/route.ts`)
- Kept the Vercel Serverless Function (`api/index.js`) as the main API handler
- Updated `Booking.tsx` to use `/api/book` instead of `/.netlify/functions/book`
- `Contact.tsx` and `Footer.tsx` were already using correct API endpoints

### 2. Updated Development Server
- Created `dev-server.js` for local development
- Updated `package.json` to use the new development server
- The development server mimics the Vercel Serverless Function API structure

### 3. Added Debugging
- Added environment variable logging to `api/index.js`
- Created test scripts for API verification

## Steps to Fix Vercel Deployment

### Step 1: Verify Environment Variables in Vercel
Log into your Vercel dashboard and check that these environment variables are set:

```
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_ANON_KEY=your_anon_key
```

**Important**: The `.env` file in your project shows `SUPABASE_URL=ma` which is incomplete. Make sure the correct URL is set in Vercel.

### Step 2: Test Locally
1. Install dependencies if needed:
   ```bash
   npm install
   ```

2. Create a proper `.env` file for local testing:
   ```bash
   cp .env.example .env
   # Edit .env with your actual Supabase credentials
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Test API endpoints:
   - Open `http://localhost:3000/api/health` in your browser
   - Test the booking form on the website
   - Check browser console for errors

### Step 3: Deploy to Vercel
1. Push changes to GitHub:
   ```bash
   git add .
   git commit -m "fix: migrate to Vercel Serverless Functions"
   git push origin main
   ```

2. Vercel should automatically deploy from your GitHub repository.

3. Check Vercel deployment logs for errors.

### Step 4: Verify Deployment
1. After deployment, visit your Vercel URL
2. Test the health endpoint: `https://your-vercel-app.vercel.app/api/health`
3. Test the booking form
4. Check Vercel function logs for any errors

## Troubleshooting

### If APIs still return 404:
1. Check Vercel function logs in the dashboard
2. Verify the `vercel.json` configuration:
   ```json
   {
     "rewrites": [
       {
         "source": "/api/:path*",
         "destination": "/api/index.js"
       }
     ]
   }
   ```

3. Check that `api/index.js` exists and exports a default function

### If Supabase connection fails:
1. Check environment variables in Vercel
2. Verify RLS policies in Supabase allow inserts
3. Test Supabase connection with the service role key

### If build fails:
1. Check Vercel build logs
2. Ensure all dependencies are in `package.json`
3. Verify Node.js version compatibility (set to 18 in `vercel.json`)

## API Endpoints
- `GET /api/health` - Health check
- `POST /api/book` - Booking form submission
- `POST /api/contact` - Contact form submission  
- `POST /api/newsletter` - Newsletter subscription

## Local Development
- Run `npm run dev` for local server on port 3000
- Run `npm run build` to build for production
- Run `npm run preview` to preview production build

## Notes
- The Express server (`server.ts`) is no longer used for production on Vercel
- Vercel uses Serverless Functions from the `api/` directory
- For production-like local testing, use `vercel dev` (requires Vercel CLI)