# Email Marketing Automation Platform

A powerful email marketing automation platform built for e-commerce businesses and SMBs.

## Features

- 🎨 Drag-and-drop email campaign builder
- 🤖 Automated email workflows
- 👥 Customer segmentation
- 📊 Analytics dashboard
- 🔌 E-commerce platform integrations
- 💳 Subscription management with Stripe

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Shadcn UI
- Supabase (Database & Auth)
- Stripe (Payments)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/email-marketing.git
   cd email-marketing
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Fill in your Supabase and Stripe credentials

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Dashboard routes
│   ├── api/               # API routes
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── ui/               # Shadcn UI components
│   └── shared/           # Shared components
├── lib/                   # Utility functions
├── types/                 # TypeScript types
└── public/               # Static assets
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
