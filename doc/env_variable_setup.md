# Supabase Environment Variables

## 1. Create `.env.local`

If you don't already have one, create a file named `.env.local` in the root of your Next.js application:

```
test-unit/.env.local
```

## 2. Add Supabase Credentials

Open `test-unit/.env.local` and add the following lines. Replace `YOUR_SUPABASE_PROJECT_URL` and `YOUR_SUPABASE_ANON_KEY` with the actual values from your Supabase project dashboard (found under "Settings" -> "API").

```
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY
```

*   **`NEXT_PUBLIC_` Prefix:** This prefix is essential for Next.js to make these variables accessible on both the client-side and server-side. This is required for initializing the Supabase client in our frontend components.

## 3. Restart Development Server

If your Next.js development server is currently running, you **must** restart it for the new environment variables to be loaded and recognized by your application.

---

Once you have completed these steps, please let me know. I will then update the TODO list and proceed with setting up the Supabase client within your Next.js project and creating the necessary backend API routes.