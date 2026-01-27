# ServiceHub - Dual-Portal Application

A comprehensive Next.js application with a landing page for selecting between two distinct portals:
1. **Admin Portal** - Administrative dashboard for system management
2. **User Portal** - Customer-facing platform for service browsing and purchases

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation & Running

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit `http://localhost:3000` to see the portal selector landing page.

## 📍 Portal Routes

### Landing Page
- **`/`** - Portal selector where users choose between Admin or User portal

### Admin Portal
- **`/admin`** - Dashboard with statistics and activity
- **`/admin/users`** - User management system
- **`/admin/services`** - Service monitoring and management
- **`/admin/reports`** - Reports and analytics
- **`/admin/settings`** - System configuration

### User Portal  
- **`/portal`** - Home/Hero page
- **`/portal/catalog`** - Service catalog with filtering
- **`/portal/pricing`** - Pricing plans comparison
- **`/portal/about`** - About us and contact form
- **`/portal/login`** - User login
- **`/portal/signup`** - User registration
- **`/portal/cart`** - Shopping cart
- **`/portal/dashboard`** - User account and subscriptions

## Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd cool-react-site
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

| Command | Description |
| `npm run dev` | Start development server with hot reload (localhost:3000) |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## Portals Overview

### 🏠 Landing Page (/)
Beautiful portal selector with:
- Clear choice between Admin, Staff, and User portal
- Feature highlights for each portal
- Attractive card-based interface with hover effects
- Security and reliability information

### 👨‍💼 Admin Portal (/admin)
Administrative dashboard for system management:
- **Dashboard**: Real-time statistics, activity tracking, and quick links
- **Users**: Complete user administration with search and filtering
- **Services**: Monitor service health, uptime, and performance
- **Reports**: Generate and download system reports
- **Settings**: Configure security, notifications, and general settings

### 🛍️ User Portal (/portal)
Customer-facing platform for service discovery:
- **Home**: Hero section with features and popular services
- **Catalog**: Browse all services with category filtering and ratings
- **Pricing**: Compare pricing plans with feature matrix
- **About**: Company information and contact form
- **Authentication**: Secure login and signup
- **Cart**: Shopping cart with order summary
- **Dashboard**: Manage subscriptions, view invoices, payment methods

### 👨‍💻 Staff Portal (/staff)
Support and ticket management portal for staff:
- **Dashboard**: Performance metrics, ticket stats, and recent assignments
- **Tickets**: Browse and manage support tickets with filtering and search
- **Reports**: Performance analytics, customer feedback, and response time metrics
- **Settings**: Profile management, notification preferences, and security options

## Project Structure

```
src/
├── app/
│   ├── layout.tsx                    # Root layout (landing page only)
│   ├── page.tsx                      # Portal selector landing page
│   ├── admin/
│   │   ├── layout.tsx                # Admin layout with sidebar & navbar
│   │   ├── page.tsx                  # Admin dashboard
│   │   ├── users/page.tsx            # User management
│   │   ├── services/page.tsx         # Services management
│   │   ├── reports/page.tsx          # Reports
│   │   └── settings/page.tsx         # System settings
│   ├── portal/
│   │   ├── layout.tsx                # User portal layout with navbar & footer
│   │   ├── page.tsx                  # Portal home/hero
│   │   ├── catalog/page.tsx          # Service catalog
│   │   ├── pricing/page.tsx          # Pricing plans
│   │   ├── about/page.tsx            # About & contact
│   │   ├── login/page.tsx            # User login
│   │   ├── signup/page.tsx           # User registration
│   │   ├── cart/page.tsx             # Shopping cart
│   │   └── dashboard/page.tsx        # User account dashboard
│   └── globals.css                   # Global Tailwind CSS
├── components/
│   ├── Navbar.tsx                    # Admin navbar
│   ├── Sidebar.tsx                   # Admin sidebar
│   ├── StatCard.tsx                  # Admin stats card
│   ├── RecentActivity.tsx            # Admin activity widget
│   ├── UserNavbar.tsx                # User portal navbar
│   └── UserFooter.tsx                # User portal footer
└── middleware.ts                     # Optional middleware

public/                               # Static assets
.github/copilot-instructions.md      # Copilot guidelines
```

## Key Pages

### Admin Portal Dashboard (/)
- System statistics cards with KPIs
- Recent activity log
- Quick action links
- System health overview

### Admin Users (/users)
- User list with search functionality
- User roles and status display
- Edit and delete user actions
- Add new user button

### Admin Services (/services)
- Service cards with status indicators
- Uptime monitoring
- Request statistics
- Service filtering by status

### Admin Reports (/reports)
- Report list with metadata
- Download functionality
- Report generation
- Date-based organization

### Admin Settings (/settings)
- General system configuration
- Security settings (2FA, IP whitelist)
- Notification preferences
- Save/cancel buttons

### User Portal Home (/portal)
- Hero section with CTA buttons
- Feature highlights
- Popular services showcase
- Call-to-action section

### Service Catalog (/portal/catalog)
- Complete service listing
- Category filtering
- Service search
- Ratings and user counts
- Detailed feature list per service
- "Add to Cart" functionality

### Pricing Plans (/portal/pricing)
- Three-tier pricing structure (Starter, Professional, Enterprise)
- Feature comparison
- FAQ section
- Free trial offer

### User Dashboard (/portal/dashboard)
- Profile information
- Active subscriptions with renewal dates
- Usage statistics
- Recent invoices with download links
- Payment method management

### Shopping Cart (/portal/cart)
- List of added services
- Quantity management
- Price summary with tax calculation
- Checkout button

### Authentication Pages (/portal/login, /portal/signup)
- Secure login form
- New account registration
- Password management
- Terms of service acceptance

## Customization

### Adding a New Page

1. Create a new folder in `src/app/`
```bash
mkdir src/app/new-page
```

2. Create `page.tsx`
```tsx
'use client';

export default function NewPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">New Page</h1>
      {/* Your content here */}
    </div>
  );
}
```

3. Add navigation link in `src/components/Sidebar.tsx`

### Color Scheme

- **Primary**: Blue (`#2563EB`, `bg-blue-600`)
- **Success**: Green (`#10B981`, `bg-green-600`)
- **Warning**: Yellow (`#F59E0B`, `bg-yellow-500`)
- **Danger**: Red (`#EF4444`, `bg-red-600`)
- **Background**: Gray (`#F3F4F6`, `bg-gray-100`)

## Development Guidelines

### Component Structure
```tsx
'use client'; // Add for interactive components

import { useState } from 'react';
import { IconName } from 'lucide-react';

export default function ComponentName() {
  const [state, setState] = useState('');
  
  return (
    <div className="space-y-6">
      {/* Content */}
    </div>
  );
}
```

### Styling Convention
- Use Tailwind utility classes
- Use `space-y-*` and `space-x-*` for spacing
- Use `gap-*` for flexbox/grid spacing
- Responsive classes: `md:` and `lg:` prefixes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Built with Turbopack for fast compilation
- Server-side rendering for optimal performance
- Code splitting and lazy loading
- Optimized images and assets

## Future Features

- [ ] User authentication system (JWT/Sessions)
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Real-time notifications (WebSockets)
- [ ] Advanced analytics and charting
- [ ] API integration for backend services
- [ ] User activity logging and auditing
- [ ] Data export functionality (CSV/PDF)
- [ ] Dark mode support
- [ ] Multi-language support (i18n)
- [ ] Payment processing integration (Stripe)
- [ ] Email notifications
- [ ] Admin email notifications for new orders
- [ ] Service usage tracking and analytics
- [ ] Subscription renewal automation
- [ ] Refund and dispute management

## Troubleshooting

### Port Already in Use
If port 3000 is in use, you can specify a different port:
```bash
npm run dev -- -p 3001
```

### Build Issues
Clear cache and reinstall dependencies:
```bash
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### TypeScript Errors
Run type checking:
```bash
npx tsc --noEmit
```

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@servicehub.local or open an issue on the repository.

---

**Version**: 1.0.0  
**Last Updated**: January 27, 2026This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
