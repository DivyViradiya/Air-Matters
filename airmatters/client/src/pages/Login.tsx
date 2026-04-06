import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { motion } from "framer-motion";
import { Leaf, Shield, User, Lock, ArrowRight, Loader2 } from "lucide-react";

export default function Login() {
  const [, navigate] = useLocation();
  const { loginMutation } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(formData, {
      onSuccess: () => {
        navigate('/dashboard');
      },
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center relative overflow-hidden px-4">
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] -z-10" />

      {/* SVG Scanning Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 -z-10">
        <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary/30" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        <div className="bg-card/40 backdrop-blur-2xl p-8 md:p-10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] border border-white/10 relative overflow-hidden rounded-[3rem]">
          {/* Glassmorphism accents */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 blur-3xl -z-10 rounded-bl-[100px]" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/20 blur-2xl -z-10 rounded-tr-[100px]" />
          
          <div className="text-center flex flex-col items-center mb-10">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-primary to-primary/60 p-0.5 mb-6 shadow-xl shadow-primary/20">
              <div className="w-full h-full bg-background/80 backdrop-blur-md rounded-[1.4rem] flex items-center justify-center">
                <Leaf className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground font-display mb-2">Welcome Back</h1>
            <p className="text-muted-foreground font-medium flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" /> 
              Secure Bio-Citizen Access
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Identity Sync</Label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50 group-focus-within:text-primary transition-colors" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="h-14 pl-12 rounded-2xl bg-background/50 border-white/10 focus:border-primary/50 transition-all font-medium"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Access Cipher</Label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50 group-focus-within:text-primary transition-colors" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className="h-14 pl-12 rounded-2xl bg-background/50 border-white/10 focus:border-primary/50 transition-all font-medium font-mono tracking-widest"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 rounded-2xl text-lg font-bold shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all group overflow-hidden relative"
              disabled={loginMutation.isPending}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loginMutation.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    Initialize Session
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm font-medium text-muted-foreground">
              New to the ecosystem?{" "}
              <Link to="/register" className="font-bold text-primary hover:text-primary/80 transition-colors">
                Create Identity
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
