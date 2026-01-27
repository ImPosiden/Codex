# Copilot Instructions for ServiceHub - Admin & User Portals

## Project Overview
ServiceHub is a dual-portal Next.js application consisting of:
1. **Admin Portal** (`/`) - Administrative dashboard for managing services, users, reports, and system settings
2. **User Portal** (`/portal`) - Customer-facing portal for browsing, purchasing, and managing services

## Technology Stack
- **Framework**: Next.js 16.1.5 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Package Manager**: npm

## Project Structure
```
src/
├── app/
│   ├── layout.tsx              # Root layout for admin portal
│   ├── page.tsx                # Admin dashboard
│   ├── users/page.tsx          # User management
│   ├── services/page.tsx       # Services management
│   ├── reports/page.tsx        # Reports
│   ├── settings/page.tsx       # System settings
│   ├── portal/
│   │   ├── layout.tsx          # User portal layout with navbar & footer
│   │   ├── page.tsx            # Portal home/hero
│   │   ├── catalog/page.tsx    # Service catalog with filtering
│   │   ├── pricing/page.tsx    # Pricing plans
│   │   ├── about/page.tsx      # About & contact
│   │   ├── login/page.tsx      # User login
│   │   ├── signup/page.tsx     # User registration
│   │   ├── cart/page.tsx       # Shopping cart
│   │   └── dashboard/page.tsx  # User account dashboard
│   └── globals.css             # Global Tailwind CSS
├── components/
│   ├── Navbar.tsx              # Admin navigation bar
│   ├── Sidebar.tsx             # Admin left sidebar
│   ├── StatCard.tsx            # Admin stats component
│   ├── RecentActivity.tsx      # Admin activity widget
│   ├── UserNavbar.tsx          # User portal navigation
│   └── UserFooter.tsx          # User portal footer
└── middleware.ts               # Optional auth/routing

public/                         # Static assets
```

## Key Features

### Admin Portal Features
1. **Dashboard**: Overview with stats, recent activity, and quick links
2. **Users Management**: View, search, and manage system users
3. **Services Management**: Monitor active services and their health
4. **Reports**: View and download system reports
5. **Settings**: Configure security, notifications, and general settings

### User Portal Features
1. **Service Catalog**: Browse available services with filtering and search
2. **Pricing Plans**: View flexible pricing options with feature comparison
3. **User Authentication**: Secure login and signup pages
4. **Shopping Cart**: Add services and manage cart
5. **User Dashboard**: Manage subscriptions, view invoices, update payment methods
6. **Contact & Support**: Company information and contact form
7. **Responsive Design**: Mobile-friendly layouts for all pages

## Development Commands
- `npm run dev` - Start development server (localhost:3000)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint checks

## Component Guidelines
- Use `'use client'` directive for interactive components
- Use Lucide React icons from `lucide-react` package
- Follow Tailwind CSS utility classes for styling
- Component structure should be modular and reusable

## Adding New Pages
1. Create a new folder in `src/app/` with the route name
2. Add `page.tsx` inside the folder
3. Update `Sidebar.tsx` to add the navigation link
4. Use consistent styling with existing components

## Styling Conventions
- Primary colors: Blue (#2563EB) for buttons and active states
- Secondary colors: Gray scale for text and backgrounds
- Spacing: Use Tailwind's space utilities
- Components: Rounded corners (8px) for cards and inputs

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design included

## Future Enhancements
- Authentication system
- Database integration
- Real-time notifications
- Advanced analytics
- API integration for backend services

## Notes for Copilot
- When creating new pages, maintain consistent styling with existing components
- Use TypeScript for type safety
- Keep components focused and single-responsibility
- Test responsive design on mobile viewports
