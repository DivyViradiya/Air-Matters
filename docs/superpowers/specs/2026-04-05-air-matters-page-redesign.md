# Design Specification: Air Matters Page Redesign

**Date:** 2026-04-05
**Status:** Approved
**Topic:** Educational "Air Matters" page refactor focusing on clarity, credibility, and conversion.

## 1. Vision & Purpose
The "Air Matters" page is the primary educational funnel for the application. It shifts from heavy scroll-jacking to a structured, narrative-driven layout that builds tension through "The Invisible Enemy" and resolves it through "Biological Defense." 

The goal is to move the user from **curiosity** → **concern** → **education** → **conversion**.

## 2. Page Architecture

### Section 1: Hero (The Dramatic Hook)
- **Headline:** THE AIR YOU CANNOT SEE.
- **Visuals:** Immersive high-quality video or render of microalgae in a bioreactor (using `/videos/Microalgae_Green_Pigmentation_Video_Generation.mp4`).
- **Narrative Flow:**
    - **The Hook:** 20,000 breaths a day.
    - **The Danger:** Indoor air is up to 5× more toxic than outdoor air. Modern buildings are carbon traps.
    - **The Solution:** The first living shield for your home—biotech bio-reactors that restore life-sustaining oxygen.
- **CTAs:** [See the Threat] (Scrolls to Section 2) | [Explore the Bio-Reactor] (Links to /products).

### Section 2 & 9: Atmospheric Sentinels (Global & Local Reality)
- **The Visualization:** A real-time global PM2.5 heatmap (CO2Globe) showing toxic particle spread across borders.
- **Headline:** POLLUTION HAS NO BORDERS.
- **The Personalization:** A local AQI widget detecting the visitor's city (e.g., "London: AQI 42 — Good").
- **The Multiplier Hook:** A dynamic "Indoor Multiplier" counter (e.g., "Outdoor AQI is 42. Your indoor concentration could be as high as 210 without biological exchange.").
- **Credibility:** Citations from OpenAQ and IQAir.

### Section 3: The Cognitive Cost (Science-First)
- **Headline:** INVISIBLE CONSEQUENCES.
- **Key Facts:** 
    - Harvard Study: 50% drop in decision-making and strategic thinking at high CO2 levels.
- **Longevity Hook:** Poor air quality as a silent, incremental tax on the respiratory and cardiovascular systems, compounding into chronic risks over decades.
- **Target Audience:** Focus on WFH workers, students, and the elderly.

### Section 5: Know Your Pollutants (The Education)
- **Layout:** 4-column grid for mobile-to-desktop reflow.
- **Pollutant Profiles:**
    - **PM2.5:** Systemic Inflammation (Medical) / Respiratory Fatigue & Cough (Symptom).
    - **CO2:** Cognitive Impairment (Medical) / Brain Fog & 2 PM Slump (Symptom).
    - **VOCs:** Neurotoxicity (Medical) / Chronic Headaches & Dizziness (Symptom).
    - **NOx:** Pulmonary Hyper-responsiveness (Medical) / Triggered Asthma (Symptom).

### Section 6: Invisible Infiltrators (The "Aha" Moment)
- **Visual:** Isometric top-down floor plan of a **modern minimalist apartment**.
- **Hotspots:**
    - **Kitchen:** NOx from gas stoves and harsh cleaning chemicals.
    - **Living Area:** VOCs from furniture glues, foams, and synthetic fabrics.
    - **Bedroom:** CO2 buildup and allergens (pet dander/bedding).
    - **Home Office:** Concentrated CO2 during focused work sessions.

### Section 4: The Paradigm Shift (The Comparison)
- **Layout:** Stacked mobile-friendly cards.
- **Card A: Static HEPA Traps (Passive):**
    - Traps particles but passes CO2/VOCs.
    - Reservoir for pollutants; potential for mold/degradation.
    - High environmental waste (non-recyclable fiberglass).
- **Card B: Air Matters Bio-Reactor (Active):**
    - Metabolizes CO2/VOCs into clinical-grade oxygen.
    - Active biological neutralization of pathogens.
    - Zero-waste biomass byproduct for plant fertilizer.

### Section 7: Meet Air Matters (The Solution Intro)
- **Visual:** High-impact, full-width premium product hero render of the Bio-Reactor in a real home setting.
- **Positioning:** "An ancient biological engine, perfected through biotech to provide the oxygen your brain and body require."
- **Key Specs:** Clinical-grade oxygen, Bio-Feedback monitoring, and low-maintenance biological protocol.

### Section 8: Breathe the Future (The Exit CTA)
- **Headline:** BREATHE THE FUTURE.
- **Split Path:**
    - **Path A (Direct Buy):** "Ready to transform your home atmosphere? [Shop the Bio-Reactor]"
    - **Path B (Science Deep-Dive):** "Still curious about the science? [See How It Works]"

## 3. Design System & Components
- **Style:** "Scientific Elegance" (Clean, high-end tech + biological credibility).
- **Colors:** Bio-Vibrant Green (#56B452), Electric Blue (#0EA5E9), Deep Moss (#142C16).
- **Typography:** Poppins/Space Grotesk (Headings), Open Sans (Body), JetBrains Mono (Technical/Data).
- **Animations:** Subtle `whileInView` entry animations (fade + slight vertical slide). No scroll-jacking.

## 4. Technical Constraints
- Must be responsive (375px to 1440px+).
- Integrated with existing `AirQualitySection` and `CO2Globe` components.
- Uses `framer-motion` for reveal transitions.
- All health/scientific claims must be explicitly cited (EPA, WHO, Harvard).
