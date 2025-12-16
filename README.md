# Planomation - Social Media Scheduler

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/axfrgo/planomation)

A premium social media scheduling platform with OAuth integration for Twitter/X and LinkedIn.

## 🚀 Live Demo

**Production:** [https://planomation.vercel.app/](https://planomation.vercel.app/)

## ✨ Features

- 🔐 **Clerk Authentication** - Secure sign-up/sign-in
- 🎨 **Premium iOS Design** - Minimal black & white aesthetic
- 📱 **Fully Responsive** - Works on all devices
- 🐦 **Twitter/X Integration** - OAuth connection (backend required)
- 💼 **LinkedIn Integration** - OAuth connection (backend required)
- 📅 **Post Scheduling** - Queue posts for future publishing (backend required)

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 16 (React)
- **Styling:** Tailwind CSS v4
- **Authentication:** Clerk
- **Monorepo:** Nx

### Backend (Not deployed in free tier)
- **API:** NestJS
- **Database:** PostgreSQL + Prisma
- **Queue:** Redis + BullMQ
- **Social Integrations:** Twitter API v2, LinkedIn API

## 📦 Project Structure

```
planomation/
├── apps/
│   ├── web/              # Next.js frontend (Deployed to Vercel)
│   ├── api-gateway/      # NestJS API Gateway
│   └── scheduler-service/ # Post scheduling service
├── libs/
│   ├── db/               # Prisma schema & client
│   ├── social-integrations/ # Twitter/LinkedIn adapters
│   └── util-auth/        # Clerk guard for backend
└── vercel.json           # Vercel configuration
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- PostgreSQL (for backend)
- Redis (for backend)

### Installation

```bash
# Clone the repository
git clone https://github.com/axfrgo/planomation.git
cd planomation

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Add your Clerk keys to .env

# Run the web app
npx nx serve web
```

Visit `http://localhost:4200`

## 🔑 Environment Variables

See `.env.example` for all required variables.

**Required for Web App:**
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`

**Required for Backend:**
- `DATABASE_URL`
- `TWITTER_CLIENT_ID` / `TWITTER_CLIENT_SECRET`
- `LINKEDIN_CLIENT_ID` / `LINKEDIN_CLIENT_SECRET`

## 📚 Documentation

- [Deployment Guide](./DEPLOYMENT.md) - How to deploy to Vercel & backend services
- [Production Setup](./PRODUCTION.md) - Live production configuration

## 🤝 Contributing

Contributions welcome! Please open an issue or PR.

## 📄 License

MIT License - feel free to use this project!

## 🙏 Acknowledgments

- Built with [Nx](https://nx.dev)
- Authentication by [Clerk](https://clerk.com)
- Hosted on [Vercel](https://vercel.com)
