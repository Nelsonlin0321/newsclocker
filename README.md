# NewsClocker - AI-Powered News Intelligence Platform

NewsClocker is an open-source intelligent news platform that transforms how professionals consume and analyze news through AI-powered insights and personalized delivery.

![NewsClocker](public/logo.png)

## Features

- **Personalized News Subscriptions**

  - Custom keyword-based news search
  - Flexible news source selection
  - Customizable delivery schedules
  - Multi-language support

- **AI-Powered Insights**

  - Custom news analysis prompts
  - Community prompt sharing
  - PDF report generation
  - Intelligent news synthesis

- **Dedicated News Inbox**
  - Organized AI insights
  - PDF export capabilities
  - Star important insights
  - Archive management

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM, FastAPI
- **Database**: MongoDB
- **Authentication**: Clerk
- **AI Services**: Azure OpenAI, Google Vertex AI, DeepSeek
- **Email**: AWS SES
- **Payments**: Stripe
- **Deployment**: Vercel, Docker

## Prerequisites

- Node.js 20+
- MongoDB database
- AWS account for SES
- Clerk account for authentication
- Stripe account for payments
- AI service credentials (Azure OpenAI/Google Vertex AI/DeepSeek)

## Environment Variables

Create a `.env` file with the following variables:

\`\`\`env

# Database

DATABASE_URL="your_mongodb_url"

# Authentication

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"

# AI Services

AZURE_OPENAI_API_KEY="your_azure_openai_key"
DEEPSEEK_API_KEY="your_deepseek_key"
VERTEX_AI_PRIVATE_KEY_ID="your_vertex_ai_key_id"
VERTEX_AI_PRIVATE_KEY_ENCODED="your_vertex_ai_private_key"

# AWS

AWS_ACCESS_KEY_ID="your_aws_access_key"
AWS_SECRET_ACCESS_KEY="your_aws_secret_key"
AWS_REGION="your_aws_region"

# Stripe

STRIPE_SECRET_KEY="your_stripe_secret_key"
STRIPE_WEBHOOK_SECRET="your_stripe_webhook_secret"
STRIPE_MONTHLY_PRICE_ID="your_monthly_price_id"
STRIPE_YEARLY_PRICE_ID="your_yearly_price_id"
NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL="your_stripe_portal_url"

# API

API_KEY="your_api_key"
BACKEND_API_URL="your_backend_url"
\`\`\`

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/newsclocker.git
   cd newsclocker
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Generate Prisma client:

   ```bash
   npx prisma generate
   ```

4. Push database schema:

   ```bash
   npx prisma db push
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Docker Deployment

1. Build the Docker image:

   ```bash
   docker build -t newsclocker .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 --env-file .env newsclocker
   ```

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository or contact us at contact@newsclocker.com.

## Acknowledgments

- Thanks to all contributors who have helped shape NewsClocker
- Special thanks to the open-source community for the amazing tools and libraries
