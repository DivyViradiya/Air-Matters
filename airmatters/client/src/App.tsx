import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import HowItWorks from "@/pages/HowItWorks";
import About from "@/pages/About";
import Vision from "@/pages/Vision";
import AirMatters from "@/pages/AirMatters";
import CarbonCredits from "@/pages/CarbonCredits";
import Nutraceuticals from "@/pages/Nutraceuticals";
import NotFound from "@/pages/not-found";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import Admin from "@/pages/Admin";
import Profile from "@/pages/Profile";
import Login from "@/pages/Login";
import FrostedBackground from "@/components/FrostedBackground";
import { AuthProvider } from "@/hooks/use-auth";

// ── Page transition wrapper ──────────────────────────────────
const pageVariants = {
  initial:  { opacity: 0, y: 12 },
  animate:  { opacity: 1, y: 0,  transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const } },
  exit:     { opacity: 0, y: -6, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] as const } },
};

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
}

// ── Router with AnimatePresence ──────────────────────────────
function Router() {
  const [location] = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Switch key={location} location={location}>
        <Route path="/">
          <PageWrapper><Home /></PageWrapper>
        </Route>
        <Route path="/air-matters">
          <PageWrapper><AirMatters /></PageWrapper>
        </Route>
        <Route path="/carbon-credits">
          <PageWrapper><CarbonCredits /></PageWrapper>
        </Route>
        <Route path="/nutraceuticals">
          <PageWrapper><Nutraceuticals /></PageWrapper>
        </Route>
        <Route path="/products">
          <PageWrapper><Products /></PageWrapper>
        </Route>
        <Route path="/products/:id">
          <PageWrapper><ProductDetail /></PageWrapper>
        </Route>
        <Route path="/how-it-works">
          <PageWrapper><HowItWorks /></PageWrapper>
        </Route>
        <Route path="/vision">
          <PageWrapper><Vision /></PageWrapper>
        </Route>
        <Route path="/about">
          <PageWrapper><About /></PageWrapper>
        </Route>
        <Route path="/register">
          <PageWrapper><Register /></PageWrapper>
        </Route>
        <Route path="/dashboard">
          <PageWrapper><Dashboard /></PageWrapper>
        </Route>
        <Route path="/admin">
          <PageWrapper><Admin /></PageWrapper>
        </Route>
        <Route path="/profile">
          <PageWrapper><Profile /></PageWrapper>
        </Route>
        <Route path="/login">
          <PageWrapper><Login /></PageWrapper>
        </Route>
        <Route>
          <PageWrapper><NotFound /></PageWrapper>
        </Route>
      </Switch>
    </AnimatePresence>
  );
}

// ── App root ─────────────────────────────────────────────────
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <FrostedBackground />
          <Navbar />
          <main className="relative z-10">
            <Router />
          </main>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
