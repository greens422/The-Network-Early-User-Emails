# The Network - Supabase Setup Guide

## Step 1: Create Supabase Project

1. Go to [Supabase](https://supabase.com)
2. Sign in and create a new project
3. Wait for the project to be provisioned

## Step 2: Create Database Table

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy and paste the SQL from `supabase-setup.sql`
3. Click **Run** to create the table

## Step 3: Get Your API Credentials

1. Go to **Project Settings** > **API**
2. Copy your:
   - **Project URL** (SUPABASE_URL)
   - **anon/public key** (SUPABASE_ANON_KEY)

## Step 4: Update Your Credentials

Open `supabase-script.js` and replace the placeholder values with your actual Supabase credentials:

```javascript
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key-here';
```

**Note:** For production deployment, use Vercel environment variables instead (see Step 7).

## Step 5: Update HTML Files

Replace the script reference in `signup.html`:

Change:
```html
<script src="script.js"></script>
```

To:
```html
<script type="module" src="supabase-script.js"></script>
```

## Step 6: Test Locally

Open `signup.html` in your browser and test the signup form.

## Step 7: Deploy to Vercel

In Vercel Dashboard:
1. Go to your project settings > Environment Variables
2. Add (optional for enhanced security):
   - `VITE_SUPABASE_URL` = your Supabase URL
   - `VITE_SUPABASE_ANON_KEY` = your anon key
3. Redeploy

Or simply deploy with credentials in `supabase-script.js`:
```bash
vercel
```

## Security Notes

- The `anon` key is safe to use in the browser
- Row Level Security (RLS) is enabled to protect your data
- Only inserts are allowed publicly; reads require authentication
- Email addresses are unique (duplicates will be rejected)

## View Your Data

Go to **Table Editor** in Supabase to see collected emails.
