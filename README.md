# Craig-O-Deploy 🚀

One-click deployment platform for modern web applications. Deploy to Vercel, Render, or Railway with a single click.

![Craig-O-Deploy](https://img.shields.io/badge/Version-1.0.0-orange)
![License](https://img.shields.io/badge/License-MIT-blue)
![Next.js](https://img.shields.io/badge/Next.js-15-black)

## Features

- **🔗 GitHub Integration** - Connect your repositories and deploy with automatic branch detection
- **☁️ Multi-Platform Deploy** - Deploy to Vercel, Render, or Railway with a single click
- **⚙️ Environment Management** - Manage environment variables across different environments
- **📊 Deploy History** - Track every deployment with detailed logs and analytics
- **⏪ Instant Rollback** - Roll back to any previous deployment instantly
- **🔒 Secure & Reliable** - Enterprise-grade security with encrypted secrets

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Styling**: Tailwind CSS
- **Payments**: Stripe
- **Auth**: NextAuth.js (GitHub OAuth)

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- PostgreSQL database (Neon recommended)
- Stripe account
- GitHub OAuth app

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ttracx/craig-o-deploy.git
   cd craig-o-deploy
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your values
   ```

4. Set up the database:
   ```bash
   npx prisma db push
   ```

5. Run the development server:
   ```bash
   pnpm dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret"

# GitHub OAuth
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Deployment Platforms
VERCEL_TOKEN="your-vercel-token"
```

## API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/projects` | GET/POST | List/create projects |
| `/api/deployments` | GET/POST | List/create deployments |
| `/api/deployments/[id]/rollback` | POST | Rollback deployment |
| `/api/environments` | GET/POST | List/create environments |
| `/api/environments/[id]/variables` | POST/DELETE | Manage env variables |
| `/api/deploy/vercel` | POST | Deploy to Vercel |
| `/api/stripe/checkout` | POST | Create checkout session |
| `/api/stripe/webhook` | POST | Handle Stripe webhooks |

## Pricing

**Craig-O-Deploy Pro** - $29/month
- Unlimited deployments
- All platforms (Vercel, Render, Railway)
- Environment management
- Deploy history & rollback
- Priority support

## License

MIT License - see [LICENSE](LICENSE) for details.

## Author

Built with ❤️ by [VibeCaaS](https://vibecaas.com)

---

[Website](https://craig-o-deploy.vercel.app) • [Documentation](https://docs.craig-o-deploy.com) • [Twitter](https://twitter.com/vibecaas)
