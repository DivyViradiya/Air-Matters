# Air Matters - Project Requirements & Dependencies

## 📋 Overview

This document outlines all requirements, dependencies, and setup instructions for the Air Matters project.

---

## 🔧 System Requirements

### Operating Systems
- macOS 10.15+
- Windows 10/11
- Linux (Ubuntu 18.04+, Debian 10+, etc.)

### Hardware Requirements
- **RAM**: 4GB minimum (8GB recommended)
- **Disk Space**: 2GB for node_modules
- **Processor**: Any modern CPU

### Software Requirements
- **Node.js**: v16 or higher (v18+ recommended)
- **npm**: v7 or higher
- **Git**: v2.x or higher
- **Modern Web Browser**: Chrome, Firefox, Safari, or Edge

### Verify Installation
```bash
node --version    # Should show v16+
npm --version     # Should show v7+
git --version     # Should show v2.x+
```

---

## 📦 Frontend Dependencies

### Core Libraries
- **react** (^18.2.0) - UI library
- **react-dom** (^18.2.0) - React DOM
- **typescript** (^5.0.0) - Type safety

### Build & Development
- **vite** (^4.0.0) - Build tool
- **@vitejs/plugin-react** (^4.0.0) - React plugin for Vite
- **@tailwindcss/vite** - Tailwind CSS Vite plugin

### State Management & Data Fetching
- **@tanstack/react-query** (^5.0.0) - Server state management
- **wouter** (^2.0.0) - Lightweight router

### UI & Styling
- **tailwindcss** (^3.0.0) - Utility-first CSS
- **postcss** (^8.0.0) - CSS processor
- **autoprefixer** (^10.0.0) - Browser prefix support
- **tailwind-merge** - Merge Tailwind classes
- **tailwindcss-animate** - Tailwind animations
- **@tailwindcss/typography** - Typography plugin
- **class-variance-authority** - Component variants
- **clsx** - Conditional classes

### UI Components (shadcn/ui & Radix UI)
- @radix-ui/react-accordion
- @radix-ui/react-alert-dialog
- @radix-ui/react-aspect-ratio
- @radix-ui/react-avatar
- @radix-ui/react-checkbox
- @radix-ui/react-collapsible
- @radix-ui/react-context-menu
- @radix-ui/react-dialog
- @radix-ui/react-dropdown-menu
- @radix-ui/react-hover-card
- @radix-ui/react-label
- @radix-ui/react-menubar
- @radix-ui/react-navigation-menu
- @radix-ui/react-popover
- @radix-ui/react-progress
- @radix-ui/react-radio-group
- @radix-ui/react-scroll-area
- @radix-ui/react-select
- @radix-ui/react-separator
- @radix-ui/react-slider
- @radix-ui/react-slot
- @radix-ui/react-switch
- @radix-ui/react-tabs
- @radix-ui/react-toast
- @radix-ui/react-toggle
- @radix-ui/react-toggle-group
- @radix-ui/react-tooltip

### Forms & Validation
- **react-hook-form** (^7.0.0) - Form state management
- **@hookform/resolvers** - Form validation resolvers
- **zod** (^3.0.0) - Schema validation
- **zod-validation-error** - Zod error formatting
- **drizzle-zod** - Drizzle ORM integration

### Icons & Visual Components
- **lucide-react** - Icon library
- **react-icons** - Icon library
- **framer-motion** - Animations
- **embla-carousel-react** - Carousel component
- **react-day-picker** - Date picker
- **input-otp** - OTP input
- **next-themes** - Dark mode support
- **vaul** - Drawer component
- **recharts** - Charts library
- **react-resizable-panels** - Resizable panels

---

## 🛠️ Backend Dependencies

### Server Framework
- **express** (^4.18.0) - HTTP server
- **@types/express** - TypeScript types
- **@types/express-session** - Session types

### Runtime
- **tsx** - TypeScript executor
- **esbuild** - JavaScript bundler
- **@types/node** - Node.js types

### Authentication
- **passport** - Authentication middleware
- **passport-local** - Local authentication strategy
- **@types/passport** - Passport types
- **@types/passport-local** - Local strategy types
- **express-session** - Session management
- **connect-pg-simple** - PostgreSQL session store
- **@types/connect-pg-simple** - Session store types

### Database & ORM
- **drizzle-orm** - ORM
- **drizzle-kit** - Migration tool
- **@neondatabase/serverless** - Neon database client

### Real-time Communication
- **ws** - WebSocket library
- **@types/ws** - WebSocket types

### Utilities
- **memorystore** - In-memory session store
- **@jridgewell/trace-mapping** - Error mapping

---

## 🌐 External APIs (All Free)

### Open-Meteo Air Quality API
- **Endpoint**: https://air-quality-api.open-meteo.com/v1/air-quality
- **API Key Required**: ❌ No
- **Rate Limit**: Unlimited (non-commercial)
- **Data Available**: PM2.5, PM10, O₃, NO₂, SO₂, CO, dust
- **Documentation**: https://open-meteo.com/en/docs/air-quality-api

### OpenStreetMap Nominatim
- **Endpoint**: https://nominatim.openstreetmap.org
- **API Key Required**: ❌ No
- **Rate Limit**: 1 request/second
- **Use Case**: Reverse geolocation (coordinates to city name)
- **Documentation**: https://nominatim.org/release-docs/latest/api/Reverse/

---

## 📝 Configuration Files

### Required Files
- **package.json** - Dependencies and scripts
- **package-lock.json** - Locked dependency versions
- **tsconfig.json** - TypeScript configuration
- **tailwind.config.ts** - Tailwind CSS configuration
- **postcss.config.js** - PostCSS configuration
- **vite.config.ts** - Vite build configuration
- **drizzle.config.ts** - Database ORM configuration
- **.gitignore** - Git ignore rules
- **.env.example** - Environment variable template

### Generated Files (After npm install)
- **node_modules/** - Installed dependencies
- **package-lock.json** - Exact versions installed

### Build Output (After npm run build)
- **dist/** - Production-ready build

---

## 🚀 Installation Steps

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/air-matters.git
cd air-matters
```

### 2. Install Project Dependencies
```bash
npm install
```

This installs all dependencies from `package.json` and creates `node_modules/` directory.

### 3. Create Environment File
```bash
cp .env.example .env.local
```

Edit `.env.local` if needed (most APIs don't require keys).

### 4. Start Development Server
```bash
npm run dev
```

Server starts at: http://localhost:5000

---

## 🏗️ Build

### Development
```bash
npm run dev        # Start dev server with hot reload
```

### Production Build
```bash
npm run build      # Create production build (creates dist/ folder)
npm run preview    # Preview build locally
npm start         # Start production server
```

---

## 🔐 Environment Variables

### Required
```
VITE_APP_NAME=Air Matters
```

### Optional
```
VITE_APP_URL=https://yourdomain.com
VITE_GA_ID=G-XXXXXXXXXX          # Google Analytics
VITE_SENTRY_DSN=https://...       # Error tracking
```

### Local Development
1. Create `.env.local` from `.env.example`
2. Add your values
3. Changes hot-reload in dev mode

---

## 📁 Project Structure

```
air-matters/
├── client/                    # Frontend (React)
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── lib/
│   │   ├── hooks/
│   │   ├── index.css
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   └── tsconfig.json
├── server/                    # Backend (Express)
│   ├── index.ts
│   ├── index-dev.ts
│   ├── vite.ts
│   ├── routes.ts
│   └── storage.ts
├── shared/                    # Shared schemas
│   └── schema.ts
├── attached_assets/           # Product images
├── node_modules/             # Dependencies
├── dist/                      # Build output
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── vite.config.ts
├── .env.example
├── .gitignore
├── README.md
└── REQUIREMENTS.md
```

---

## 🧪 Browser Support

### Desktop
- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions

### Mobile
- iOS Safari: 12+
- Chrome Android: 80+
- Samsung Internet: Latest

---

**Last Updated**: April 2026  
**Version**: 1.0.0  
**Status**: Ready ✅
