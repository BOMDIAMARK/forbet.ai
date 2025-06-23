# Environment Variables Setup

## Required Environment Variables

### Frontend (Vite) - Required for Vercel

```bash
# Clerk Authentication (Required)
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key_here

# Backend API URL (Required)
VITE_API_URL=https://your-backend-domain.railway.app
```

## Vercel Deployment Steps

1. **Add Environment Variables in Vercel Dashboard:**
   - Go to your Vercel project settings
   - Navigate to "Environment Variables"
   - Add the following variables:

   ```
   VITE_CLERK_PUBLISHABLE_KEY = pk_test_your_actual_key
   VITE_API_URL = https://your-backend-domain.railway.app
   ```

2. **Redeploy your application:**
   - After adding the environment variables
   - Trigger a new deployment in Vercel

## Getting Your Clerk Keys

1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Select your application
3. Go to "API Keys"
4. Copy the "Publishable Key" (starts with `pk_test_` or `pk_live_`)

## Local Development

Create a `.env` file in the root directory:

```bash
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key_here
VITE_API_URL=http://localhost:5000
```

## Troubleshooting

- If you see a white screen, check the browser console for errors
- The app will show a configuration error if environment variables are missing
- Make sure to redeploy after adding environment variables to Vercel 