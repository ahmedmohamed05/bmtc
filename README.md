# College Website - BMTC

A modern college website built with React, TypeScript, and Supabase, featuring an admin dashboard for content management and a public-facing website for students and visitors.

## Features

### Admin Dashboard

- **Authentication**: Secure login system using Supabase Auth
- **Content Management**: Full CRUD operations for:
  - News articles
  - Events
  - Library books
  - Staff members
- **Protected Routes**: Admin-only access with authentication checks
- **Modern UI**: Clean, responsive dashboard interface

### Public Website

- **Home Page**: Overview with recent news and upcoming events
- **News Section**: Browse all college news articles
- **Events Section**: View upcoming and past events
- **Library Section**: Searchable book catalog
- **Staff Section**: Browse staff members by department

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4
- **Routing**: React Router DOM 7
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Build Tool**: Vite
- **Icons**: React Icons

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Supabase account (free tier works)

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd bmtc
```

2. Install dependencies:

```bash
npm install
```

3. Set up Supabase:

   - Create a new project at [supabase.com](https://supabase.com)
   - Follow the instructions in `SUPABASE_SETUP.md` to create the database tables
   - Get your project URL and anon key from Settings > API

4. Create environment variables:

   - Create a `.env` file in the root directory
   - Add your Supabase credentials:

   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. Start the development server:

```bash
npm run dev
```

6. Create your first admin user:

   - **See `FIRST_ADMIN_SETUP.md` for detailed instructions**
   - Quick method: Go to Supabase Dashboard > Authentication > Users > Add user
   - Or use the signup feature on the login page

7. Open your browser:
   - Public website: `http://localhost:5173/home`
   - Admin dashboard: `http://localhost:5173/admin/auth`

## Project Structure

```
src/
├── admin/              # Admin dashboard
│   ├── components/    # Admin form components
│   ├── pages/         # Admin pages (Home, News, Events, Library, Staff)
│   └── AdminRouter.tsx
├── user/              # Public website
│   ├── components/    # User-facing components
│   ├── pages/         # Public pages (Home, News, Events, Library, Staff)
│   └── UserRouter.tsx
├── shared/            # Shared code
│   ├── components/    # Shared components (ProtectRoutes)
│   └── supabase.ts    # Supabase client and types
├── App.tsx            # Main app with routing
└── main.tsx           # Entry point
```

## Database Schema

The application uses four main tables:

1. **news**: News articles with title, content, and optional image
2. **events**: College events with date, location, and description
3. **books**: Library catalog with availability status
4. **staff**: Staff members with contact information and department

See `SUPABASE_SETUP.md` for detailed SQL schema and setup instructions.

## Usage

### Admin Dashboard

1. Navigate to `/admin/auth`
2. Log in with your Supabase user credentials
3. Use the navigation to manage:
   - **News**: Create, edit, and delete news articles
   - **Events**: Manage college events
   - **Library**: Add and manage books
   - **Staff**: Add and manage staff members

### Public Website

- Navigate to `/home` to see the homepage
- Use the navigation bar to access:
  - News, Events, Library, and Staff sections
  - All content is read-only for public users

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready to be deployed to any static hosting service (Vercel, Netlify, etc.).

## Environment Variables

Required environment variables:

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous/public key

## Security Notes

- The current setup disables Row Level Security (RLS) for simplicity
- For production, enable RLS and create proper policies:
  - Public read access for user pages
  - Authenticated admin write access for admin dashboard
- Never commit your `.env` file to version control

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please refer to the `SUPABASE_SETUP.md` file for database setup help.
