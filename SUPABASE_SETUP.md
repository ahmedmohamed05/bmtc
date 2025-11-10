# Supabase Database Setup

This document explains how to set up the required database tables in Supabase for the college website.

## Prerequisites

1. Create a Supabase account at https://supabase.com
2. Create a new project
3. Get your project URL and anon key from Settings > API

## Environment Variables

Create a `.env` file in the root directory with:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Database Tables

Run the following SQL in your Supabase SQL Editor to create the required tables:

### 1. News Table

More tables here

**Note:** For production, you should enable RLS and create proper policies that allow:

- Public read access for user pages
- Authenticated admin write access for admin dashboard

## Authentication Setup

1. Go to Authentication > Providers in your Supabase dashboard
2. Enable Email provider
3. Create an admin user:
   - **Recommended**: See `FIRST_ADMIN_SETUP.md` for detailed instructions
   - Or go to Authentication > Users > Click "Add user"
   - Enter email and password
   - Use this account to log into the admin dashboard at `/admin/auth`
   - **Note**: You can also use the signup feature on the login page to create additional admin accounts

## Testing

After setting up the tables and environment variables:

1. Start the development server: `npm run dev`
2. Visit `http://localhost:5173/admin/auth` to log in
3. Visit `http://localhost:5173/home` to see the public website
