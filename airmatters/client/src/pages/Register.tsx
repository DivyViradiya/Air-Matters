import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { motion } from "framer-motion";
import { Leaf, Shield, User, Lock, Phone, MapPin, Mail, ArrowRight, Loader2 } from "lucide-react";

export default function Register() {
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const { registerMutation } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Validation Error",
        description: "The access ciphers (passwords) do not match.",
        variant: "destructive",
      });
      return;
    }
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...registerData } = formData;
    
    registerMutation.mutate(registerData, {
      onSuccess: () => {
        navigate('/dashboard');
      }
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center relative overflow-hidden px-4 py-20">
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] -z-10" />

      {/* SVG Scanning Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 -z-10">
        <pattern id="grid-pattern-reg" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary/30" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid-pattern-reg)" />
      </svg>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl"
      >
        <div className="bg-card/40 backdrop-blur-2xl p-8 md:p-12 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] border border-white/10 relative overflow-hidden rounded-[3rem]">
          {/* Glassmorphism accents */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary/20 blur-3xl -z-10 rounded-br-[150px]" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-accent/20 blur-2xl -z-10 rounded-tl-[100px]" />
          
          <div className="text-center flex flex-col items-center mb-10">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-primary to-primary/60 p-0.5 mb-6 shadow-xl shadow-primary/20">
              <div className="w-full h-full bg-background/80 backdrop-blur-md rounded-[1.4rem] flex items-center justify-center">
                <Leaf className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground font-display mb-2">Create Identity</h1>
            <p className="text-muted-foreground font-medium flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" /> 
              Register as a Bio-Citizen
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Full Name</Label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50 group-focus-within:text-primary transition-colors" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="h-14 pl-12 rounded-2xl bg-background/50 border-white/10 focus:border-primary/50 transition-all font-medium"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Email Address</Label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50 group-focus-within:text-primary transition-colors" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="h-14 pl-12 rounded-2xl bg-background/50 border-white/10 focus:border-primary/50 transition-all font-medium"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Phone Number</Label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50 group-focus-within:text-primary transition-colors" />
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phoneNumber || ""}
                    onChange={(e) => handleChange('phoneNumber', e.target.value)}
                    className="h-14 pl-12 rounded-2xl bg-background/50 border-white/10 focus:border-primary/50 transition-all font-medium"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Physical Location</Label>
                <div className="relative group">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50 group-focus-within:text-primary transition-colors" />
                  <Input
                    id="address"
                    type="text"
                    placeholder="123 Eco District"
                    value={formData.address || ""}
                    onChange={(e) => handleChange('address', e.target.value)}
                    className="h-14 pl-12 rounded-2xl bg-background/50 border-white/10 focus:border-primary/50 transition-all font-medium"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
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
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Verify Cipher</Label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50 group-focus-within:text-primary transition-colors" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    className="h-14 pl-12 rounded-2xl bg-background/50 border-white/10 focus:border-primary/50 transition-all font-medium font-mono tracking-widest"
                    required
                  />
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 rounded-2xl text-lg font-bold shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all group overflow-hidden relative mt-8"
              disabled={registerMutation.isPending}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {registerMutation.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Integrating Identity...
                  </>
                ) : (
                  <>
                    Establish Bio-Citizen Identity
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
              Already integrated?{" "}
              <Link to="/login" className="font-bold text-primary hover:text-primary/80 transition-colors">
                Initialize Session
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}