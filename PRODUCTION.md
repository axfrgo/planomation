# Production Deployment - Planomation

🎉 **Live URL:** https://planomation.vercel.app/

## Current Setup

### ✅ Deployed Components
- **Web App**: Vercel (https://planomation.vercel.app/)

### ⚠️ Not Yet Deployed
- API Gateway (Backend)
- Scheduler Service (Backend)
- PostgreSQL Database
- Redis Cache

## Required Configuration Updates

### 1. Clerk Dashboard
Update your Clerk application to allow the production domain:
1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Select your application
3. Go to **Domains** → Add domain: `planomation.vercel.app`
4. In **Paths** → Update redirect URLs to include `https://planomation.vercel.app/*`

### 2. OAuth Callback URLs

When you're ready to enable Twitter/LinkedIn OAuth, update these URLs:

**Twitter Developer Portal:**
- Callback URL: `https://planomation.vercel.app/api/auth/twitter/callback`

**LinkedIn Developer Portal:**
- Redirect URL: `https://planomation.vercel.app/api/auth/linkedin/callback`

### 3. Vercel Environment Variables (Already Set)
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_cHJldHR5LXRlYWwtNDYuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_bDgKMhZE2zWE19lUlfJLlZs1ePmtddAQqZwzx8obwY
```

## Next Steps for Full Functionality

To enable backend features (post scheduling, social connections), you'll need to:

1. **Deploy Backend Services** to Railway/Render/Fly.io
2. **Deploy PostgreSQL** to Supabase/Neon
3. **Deploy Redis** to Upstash
4. **Update Vercel Environment Variables** with backend URLs:
   ```
   API_GATEWAY_URL=https://your-api-gateway.railway.app
   DATABASE_URL=postgresql://...
   ```

## Current Limitations

Without backend deployed:
- ❌ Cannot schedule posts
- ❌ Cannot connect social accounts
- ✅ Clerk authentication works
- ✅ UI is fully functional
- ✅ Dashboard loads

## Testing

Visit https://planomation.vercel.app/ and you should be able to:
- Sign up / Sign in with Clerk
- View the dashboard
- See the premium UI

Backend features will show errors until services are deployed.
