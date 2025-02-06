# Emted Tedarik B2B E-Ticaret Platformu

Modern ve kullanıcı dostu B2B e-ticaret platformu.

## Özellikler

- **Product Categories**
  - Cleaning Supplies
  - Disposable Tableware
  - Eco-Friendly Options

- **Core Functionality**
  - Product listings with detailed specifications
  - Shopping cart and checkout system
  - User authentication
  - Admin dashboard
  - Multi-language support (Turkish/English)

## Tech Stack

- **Frontend**: Next.js 13+
- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL
- **Deployment**: Vercel (Frontend), Railway/Heroku (Backend)

## Project Structure

```
emted-tedarik/
├── frontend/           # Next.js frontend application
├── backend/           # Express.js backend API
└── docs/             # Additional documentation
```

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Environment Variables

Create `.env` files in both frontend and backend directories:

Frontend (.env.local):
```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Backend (.env):
```
PORT=3001
DATABASE_URL=postgresql://username:password@localhost:5432/emted_tedarik
JWT_SECRET=your_jwt_secret
```

## Development

- Run `npm run dev` in both frontend and backend directories
- Frontend will be available at `http://localhost:3000`
- Backend API will be available at `http://localhost:3001`

## Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables
4. Deploy

### Backend

1. Set up a PostgreSQL database
2. Deploy to your preferred hosting service (Railway/Heroku)
3. Configure environment variables
4. Update frontend API URL

## License

MIT License - See LICENSE file for details

## Additional Features

### PWA Features

- Offline working
- Fast loading
- Add to home screen
- Push notifications
- Automatic updates

### Security

- HTTP security headers
- XSS protection
- Content Security Policy
- Referrer Policy
- Permissions Policy

### SEO

- Meta tags
- Sitemap
- Robots.txt
- Canonical URLs
- Rich snippets

### Project Structure

```
frontend/
├── public/          # Static files
├── src/
│   ├── components/  # React components
│   ├── pages/       # Page components
│   ├── styles/      # CSS styles
│   ├── types/       # TypeScript types
│   └── utils/       # Helper functions
└── ...
```

### Contributing

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push your branch (`git push origin feature/amazing-feature`)
5. Create a Pull Request

### Contact

Emted Tedarik - [https://emted.com.tr](https://emted.com.tr)
