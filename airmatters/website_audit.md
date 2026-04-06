# Website Audit: Air Matters

This document provides a comprehensive audit of the "Air Matters" web application codebase, detailing the overall architecture, layout patterns, individual pages, and content themes.

## 1. Technical Stack & Architecture
- **Framework**: React via Vite. 
- **Routing**: `wouter` for lightweight, client-side routing.
- **Styling**: Tailwind CSS combined with `framer-motion` for complex scroll-linked and viewport-triggered animations.
- **UI Components**: Shadcn/ui (radix-ui based) for accessible, standard elements (Buttons, Tooltips, Toaster, Tabs, Cards). Custom 3D components are present for scientific data visualization.
- **State/Data**: `@tanstack/react-query` for data fetching caching, and a custom context hook (`use-auth`) for authentication state.

## 2. Global Layout System
The main application shell is defined in `client/src/App.tsx`. 
- **Global Wrappers**: `QueryClientProvider`, `AuthProvider`, `TooltipProvider`, and `Toaster`.
- **Global Styling Components**: `FrostedBackground` provides a constant aesthetic backdrop across all pages.
- **Header**: A global `Navbar` sits at the top level of the app.
- **Routing Space**: A `<main className="relative z-10">` wrapper houses the `Wouter` Switch, which wraps every page in a `<PageWrapper>` for seamless `framer-motion` opacity and positional transitions between routes.
- **Footer**: Distinctively, the `Footer` component is *not* at the global layout level. Instead, it is imported and appended at the bottom of almost every individual page (e.g., `Home.tsx`, `About.tsx`, `AirMatters.tsx`). This is typically done to accommodate highly customized sticky-scroll or fixed-height parallax sections that exist on a per-page basis.

## 3. Page Breakdown & Content Audit

### 3.1. Landing & Educational Pages

#### Home Page (`/` -> `Home.tsx`)
- **Theme**: "Breathe Better. Living Technology."
- **Content & Layout**: 
  - **SpecimenHero**: A highly visual, 400vh sticky scroll section integrating an auto-playing video of biological specimens with animated scientific UI (HUD overlays).
  - **AirQualitySection**: An atmospheric monitoring terminal.
  - **SpatialIntegration**: Demonstrates the physical integration of the product in spaces.
  - **HardwareReveal & BentoImpact**: Showcases the "Bio-Reactor" technical specs (CO2 Sequestrated, O2 Restored, PM2.5 Captured). 
  - **StickyMicroscopic**: A deep chronological narrative (800vh scroll) detailing the 3.5 billion-year evolutionary history of microalgae, referencing Vedic India, Aztecs, Kanembu, and Han Dynasty China.

#### Air Matters (`/air-matters` -> `AirMatters.tsx`)
- **Theme**: "The Air You Cannot See" (focusing on the invisible enemy: indoor air pollution).
- **Content & Layout**:
  - Educational hero defining the threat of 20,000 indoor breaths.
  - Interactive **CO2Globe** for real-world pollution mapping.
  - "Did You Know" fact cards about indoor toxicity vs cognitive function.
  - A dissolving-bubble background section contrasting mechanical static filters (which trap mold and create waste) with the biological "Paradigm Shift" (Active Defense, Zero Waste, Oxygen creation).

#### How It Works (`/how-it-works` -> `HowItWorks.tsx`)
- **Theme**: "Ancient Solution for Modern Challenges."
- **Focus**: Features an interactive 3D model of the system (`BioReactorGL`), detailing the mechanical and biological integration of the miniature biosphere.

#### Carbon Credits (`/carbon-credits` -> `CarbonCredits.tsx`)
- **Theme**: Gamification and Web3 Integration – "The Air You Breathe, Tokenized."
- **Content**: 
  - Details the Eco-Protocol: Capture, Measure, Verify, Earn.
  - Features a `DataBars3D` visualizer representing daily token yield (`AIR` tokens). 
  - Explains the trustless verification system linking hardware IoT data directly to user wallets.

#### Vision & About (`/vision`, `/about` -> `Vision.tsx`, `About.tsx`)
- **Content**: Outlines the team, the corporate ethos ("What We Stand For"), and a multi-phased roadmap ("Cycle of National Transformation"). Features a 3D `MicroalgaeGL` visual.

#### Nutraceuticals (`/nutraceuticals` -> `Nutraceuticals.tsx`)
- **Theme**: "A Nutritional Powerhouse", detailing the byproduct of the bio-reactor. The harvested biomass acts as a high-grade nutritional or agricultural resource.

### 3.2. E-Commerce & Product Pages

#### Products (`/products` & `/products/:id` -> `Products.tsx`, `ProductDetail.tsx`)
- **Content**: Standard e-commerce listing and detailed views. Features a `BiologicalComparison` component highlighting the product's edge over traditional HEPA/Carbon filters. 

### 3.3. Application & User Portal
- **Dashboard (`/dashboard`)**: The primary interface for users to track their device's metrics (likely IoT connection).
- **Admin (`/admin`)**: A "Command Center" featuring standard data tables, metric badges, and configuration tabs for managing users and system metadata.
- **Profile (`/profile`)**: User account management with a thematic `MicroalgaeBackground`.
- **Auth (`/login`, `/register`)**: Modular and page-based authentication flows.

---

## Summary of Findings
The website is a highly polished, aesthetic-first web application designed to sell a premium, biotechnology-based air purification system. The brand voice leans heavily into **"Scientific Elegance"** and **"Deep Time History."** Structurally, the site uses intensive scroll-jacking, sticky containers, and 3D canvas rendering to create dramatic narrative flows over standard scrolling, which is why global elements like headers and footers are deeply integrated per-page rather than globally nested.
