# Environment Variable Setup Guide

## 🔑 Add to Your Local `.env` File

Update your local `.env` file with these credentials:

```bash
# Twitter / X OAuth (REAL CREDENTIALS)
TWITTER_CLIENT_ID=QjVHUHRnQk84VVlKaHB2aXVtekY6MTpjaQ
TWITTER_CLIENT_SECRET=2H0IlcvjIM88xBMHfnL-T3KW1LpPZluzcHj1QKlz-bI1Ir5ZP2
```

## ☁️ Add to Vercel (Production)

Go to your Vercel project → **Settings** → **Environment Variables** and add:

### Twitter / X
```
Name: TWITTER_CLIENT_ID
Value: QjVHUHRnQk84VVlKaHB2aXVtekY6MTpjaQ

Name: TWITTER_CLIENT_SECRET  
Value: 2H0IlcvjIM88xBMHfnL-T3KW1LpPZluzcHj1QKlz-bI1Ir5ZP2
```

**Important:** Set these for **Production**, **Preview**, and **Development** environments!

## 🔄 Update Twitter Callback URL

In your Twitter Developer Dashboard, update the callback URL to:
```
https://planomation.vercel.app/api/auth/twitter/callback
```

And for local development:
```
http://localhost:4200/api/auth/twitter/callback
```

## 📱 Other Platform Setup (When Ready)

### LinkedIn
- Get credentials from: https://www.linkedin.com/developers/apps
- Callback URL: `https://planomation.vercel.app/api/auth/linkedin/callback`

### Facebook/Instagram
- Get credentials from: https://developers.facebook.com/
- Callback URL: `https://planomation.vercel.app/api/auth/facebook/callback`

### TikTok
- Get credentials from: https://developers.tiktok.com/
- Callback URL: `https://planomation.vercel.app/api/auth/tiktok/callback`

### YouTube (Google)
- Get credentials from: https://console.cloud.google.com/
- Callback URL: `https://planomation.vercel.app/api/auth/youtube/callback`

### Pinterest
- Get credentials from: https://developers.pinterest.com/
- Callback URL: `https://planomation.vercel.app/api/auth/pinterest/callback`

### Threads (Meta)
- Get credentials from: https://developers.facebook.com/
- Callback URL: `https://planomation.vercel.app/api/auth/threads/callback`

## ⚠️ Security Note

**NEVER** commit `.env` to git! It's already in `.gitignore` to protect your secrets.
