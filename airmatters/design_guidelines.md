# Air Matters Design Guidelines

## Design Approach

**Reference-Based Approach**: Drawing inspiration from premium tech brands (Apple, Dyson, Tesla) combined with scientific credibility (Nature Portfolio, Scientific American). The design should communicate innovation, environmental responsibility, and cutting-edge biotechnology while remaining approachable for consumers.

## Core Design Principles

1. **Scientific Elegance**: Balance technical credibility with consumer accessibility
2. **Living Technology**: Organic, flowing design elements that suggest biological processes
3. **Premium Innovation**: High-end product positioning through refined aesthetics
4. **Environmental Trust**: Communicate sustainability and environmental impact

## Typography System

**Primary Font**: Inter (Google Fonts) - Clean, modern, technical
**Accent Font**: Space Grotesk (Google Fonts) - For headlines and emphasis

**Hierarchy**:
- Hero Headlines: text-6xl to text-7xl, font-bold, tracking-tight
- Section Headers: text-4xl to text-5xl, font-bold
- Subsection Headers: text-2xl to text-3xl, font-semibold
- Body Text: text-base to text-lg, leading-relaxed
- Small Text/Captions: text-sm, font-medium

## Layout System

**Spacing Primitives**: Use Tailwind units of 4, 8, 12, 16, 20, 24, and 32 for consistent rhythm
- Section padding: py-20 (desktop), py-12 (mobile)
- Component gaps: gap-8 to gap-12
- Inner content spacing: space-y-6 to space-y-8
- Container max-widths: max-w-7xl for full sections, max-w-4xl for content-focused areas

## Page Structure

### 1. Hero Section (100vh)
**Layout**: Full-viewport immersive experience with animated background
- Centered content with max-w-4xl
- Large headline with supporting tagline below
- Primary CTA button ("Join Waitlist") and secondary link ("Learn More")
- Subtle trust indicator ("Backed by leading biotech researchers")
- Animated background: Floating particle effect representing air molecules and microalgae cells

**Hero Image**: Full-screen background with semi-transparent overlay. Image shows close-up of microalgae in liquid medium with bubbles (oxygen), soft focus, scientific yet beautiful. Alternative: Abstract visualization of photosynthesis process with flowing organic shapes.

### 2. Product Introduction (Natural height)
**Layout**: Two-column split (lg:grid-cols-2)
- Left: Large product visualization or cross-section diagram showing internal mechanics
- Right: Content with headline, description paragraphs, key specs in compact grid
- Use py-24 spacing

**Product Image**: High-quality render or photo of the air purifier device - sleek, modern design with visible liquid chamber containing green microalgae. Show device in modern home setting to provide context and scale.

### 3. How It Works (Natural height)
**Layout**: Vertical timeline/process flow with three stages
- Each stage: Icon/illustration (left), content (right) on desktop
- Connecting lines between stages with animated flow effect
- Use alternating layout (zigzag pattern) for visual interest

**Process Illustrations**: Three custom illustrations/diagrams:
1. CO2 absorption - arrows showing carbon dioxide entering system
2. Photosynthesis - microalgae cells actively converting CO2 to O2, glowing effect
3. Oxygen release - clean air flowing out with particle visualization

### 4. Benefits Grid (Natural height)
**Layout**: Three-column grid (lg:grid-cols-3, md:grid-cols-2, grid-cols-1)
- Six benefit cards with icons, titles, short descriptions
- Cards with subtle borders, generous padding (p-8)
- Benefits: Carbon-Negative, Living Ecosystem, Silent Operation, Low Maintenance, Renewable Medium, Smart Monitoring

### 5. Science & Technology (Natural height)
**Layout**: Split section with science credentials
- Left: Stats/metrics in 2x2 grid (CO2 absorbed, O2 produced, efficiency %, lifecycle)
- Right: Technical explanation with expandable accordions covering photosynthesis efficiency, microalgae species, liquid medium composition, comparison to traditional filters
- Full-width bottom: Research partnerships and certifications

**Science Visuals**: Microscopic image of microalgae cells, chemical equation visualization (CO2 → O2), efficiency comparison chart

### 6. Testimonials/Early Adopters (Natural height)
**Layout**: Horizontal scroll carousel (desktop), vertical stack (mobile)
- Three testimonial cards showing early adopter feedback
- Each card: Quote, name, role, small portrait
- Include mix of consumers and industry experts

### 7. FAQ Section (Natural height)
**Layout**: Two-column layout (lg:grid-cols-2) with accordion items
- 8-10 key questions covering: maintenance, pricing expectations, how it works, installation, algae replacement, comparison to HEPA, energy usage, warranty
- Clean accordion UI with expand/collapse icons

### 8. Waitlist/Contact Form (Natural height)
**Layout**: Centered form with two-column split at md breakpoint
- Left: Form fields (name, email, interest type dropdown, optional message)
- Right: Contact information, expected launch timeline, and value props
- Form submission triggers confirmation message
- Include privacy statement below form

### 9. Footer (Natural height)
**Layout**: Three-column grid (lg:grid-cols-3)
- Column 1: Logo, tagline, social media icons
- Column 2: Quick links (About, Science, FAQ, Contact, Privacy, Terms)
- Column 3: Newsletter signup (compact form), contact email
- Bottom bar: Copyright, compliance statements

## Component Library

**Buttons**:
- Primary: Large rounded buttons (px-8 py-4, text-lg, rounded-full)
- Secondary: Outlined version with hover effects
- Buttons on images: Backdrop blur effect (backdrop-blur-md)

**Cards**:
- Feature cards: Rounded corners (rounded-2xl), padding p-8, subtle borders
- Testimonial cards: Compact padding (p-6), includes quote marks styling

**Form Elements**:
- Input fields: Rounded (rounded-lg), generous padding (px-4 py-3)
- Labels: Small caps (uppercase, tracking-wide, text-sm)
- Validation states with clear error messages

**Icons**: Use Heroicons via CDN for consistency

## Animations & Interactions

**Minimal, purposeful animations**:
- Hero: Floating particles background (CSS keyframes)
- Scroll reveal: Fade-in with slight upward motion for sections
- Process flow: Animated connecting lines between steps
- Hover states: Subtle scale transforms on cards (scale-105)
- No complex scroll-driven animations - keep it clean

## Images Summary

**Required Images**:
1. **Hero Background**: Microalgae in liquid medium, bubbles, soft focus (full-screen)
2. **Product Photo**: Sleek purifier device in modern home (large, prominent)
3. **Process Diagrams**: Three illustrations showing CO2→O2 conversion (custom graphics)
4. **Microscopic Algae**: Close-up scientific imagery for credibility
5. **Testimonial Portraits**: Three small circular photos

**Hero Image Strategy**: Large, immersive hero with semi-transparent overlay to ensure text readability. The background should be scientifically accurate yet aesthetically beautiful, showing the living nature of the technology.

## Responsive Behavior

- Hero maintains full viewport height on all devices
- Multi-column layouts stack to single column below md breakpoint
- Typography scales down one size on mobile
- Touch-friendly spacing (min 44px) for all interactive elements
- Horizontal scroll testimonials on mobile