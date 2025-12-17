# Backend Deployment Required ⚠️

The frontend is live at **https://planomation.vercel.app/** but social OAuth connections (except Facebook) require backend services to be deployed.

## What Works Now:
- ✅ Web app (UI, authentication with Clerk)
- ✅ Facebook OAuth (client-side SDK)

## What Needs Backend:
- ❌ Twitter/X OAuth
- ❌ LinkedIn OAuth
- ❌ Instagram OAuth
- ❌ TikTok OAuth
- ❌ YouTube OAuth
- ❌ Pinterest OAuth
- ❌ Threads OAuth
- ❌ Post scheduling

## To Enable Full Functionality:

### Option 1: Deploy to Railway (Easiest)
```bash
# 1. Create account at railway.app
# 2. Connect GitHub repo
# 3. Deploy these services:
#    - API Gateway (port 3000)
#    - Scheduler Service (port 3333)
#    - PostgreSQL (provision)
#    - Redis (provision)
```

### Option 2: Deploy to Render
```bash
# 1. Create account at render.com
# 2. Connect GitHub repo
# 3. Create Web Services for each backend
# 4. Provision PostgreSQL & Redis
```

### Required Environment Variables (Backend):
```bash
DATABASE_URL=postgresql://...
CLERK_SECRET_KEY=sk_test_...
TWITTER_CLIENT_ID=...
TWITTER_CLIENT_SECRET=...
LINKEDIN_CLIENT_ID=...
LINKEDIN_CLIENT_SECRET=...
# ... other OAuth credentials
```

### Once Deployed:
Update Vercel environment variable:
```
API_GATEWAY_URL=https://your-api-gateway.railway.app
```

## Current Status:
🟢 **Ready for Demo** - Beautiful UI with Clerk authentication
🟡 **Backend Required** - For full social media integration
🟢 **Facebook Works** - Uses client-side SDK (no backend needed)

## Cost Estimate:
- **Vercel**: Free
- **Railway**: $5/month credit (covers all services)
- **Render**: Free tier available
- **Supabase (DB)**: Free tier available

Would you like help deploying the backend? 🚀
