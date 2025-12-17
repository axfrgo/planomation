# 🔑 Vercel Environment Variables Setup

## Add These to Vercel Dashboard

Go to your Vercel project → **Settings** → **Environment Variables**

### Required for All Environments (Production, Preview, Development):

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_cHJldHR5LXRlYWwtNDYuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_bDgKMhZE2zWE19lUlfJLlZs1ePmtddAQqZwzx8obwY

# Facebook OAuth (Client-Side SDK)
# ⚠️ MUST use NEXT_PUBLIC_ prefix for browser access!
NEXT_PUBLIC_FACEBOOK_APP_ID=your_facebook_app_id_here
FACEBOOK_APP_SECRET=your_facebook_app_secret_here
```

### Optional (When Backend is Deployed):

```bash
# Twitter / X OAuth
TWITTER_CLIENT_ID=QjVHUHRnQk84VVlKaHB2aXVtekY6MTpjaQ
TWITTER_CLIENT_SECRET=2H0IlcvjIM88xBMHfnL-T3KW1LpPZluzcHj1QKlz-bI1Ir5ZP2

# LinkedIn OAuth
LINKEDIN_CLIENT_ID=78lc9xmz4uf2ob
LINKEDIN_CLIENT_SECRET=WPL_AP1.XZ6kaluqi6bOoeCC.DPBEJA==

# Other Social Platforms
INSTAGRAM_APP_ID=...
TIKTOK_CLIENT_KEY=...
YOUTUBE_CLIENT_ID=...
PINTEREST_APP_ID=...
```

## ⚠️ Important: NEXT_PUBLIC_ Prefix

In Next.js:
- Variables **WITHOUT** `NEXT_PUBLIC_` → Only available on **server-side**
- Variables **WITH** `NEXT_PUBLIC_` → Available in **browser** (client-side)

Facebook SDK runs in the browser, so it **MUST** be:
```bash
NEXT_PUBLIC_FACEBOOK_APP_ID=...
```

Not just:
```bash
FACEBOOK_APP_ID=...  ❌ Won't work for client-side SDK
```

## 📝 Your Local `.env` File

For local development, use the same format:

```bash
# Must have NEXT_PUBLIC_ prefix!
NEXT_PUBLIC_FACEBOOK_APP_ID=your_app_id
FACEBOOK_APP_SECRET=your_app_secret

# Clerk (also needs NEXT_PUBLIC_ for publishable key)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Twitter
TWITTER_CLIENT_ID=...
TWITTER_CLIENT_SECRET=...
```

## How to Add in Vercel:

1. Go to https://vercel.com/dashboard
2. Select your **planomation** project
3. Click **Settings** → **Environment Variables**
4. For each variable:
   - **Name**: `NEXT_PUBLIC_FACEBOOK_APP_ID`
   - **Value**: (paste your Facebook App ID)
   - **Environments**: Check all 3 (Production, Preview, Development)
   - Click **Add**
5. **Redeploy** your site after adding variables

## Verify It Works:

After adding and redeploying, open browser console on https://planomation.vercel.app:

```javascript
console.log(process.env.NEXT_PUBLIC_FACEBOOK_APP_ID); // Should show your app ID
```

If it shows `undefined`, the variable isn't set correctly in Vercel!
