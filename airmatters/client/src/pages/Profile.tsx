import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Loader2, User as UserIcon, Shield, MapPin, Phone, Mail, Check, X, Edit2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function Profile() {
  const { user, isLoading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  
  const [editForm, setEditForm] = useState({
    name: "",
    phoneNumber: "",
    address: ""
  });

  const startEditing = () => {
    if (user) {
      setEditForm({
        name: user.name || "",
        phoneNumber: user.phoneNumber || "",
        address: user.address || ""
      });
      setIsEditing(true);
    }
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  const updateMutation = useMutation({
    mutationFn: async (data: typeof editForm) => {
      const res = await apiRequest("PATCH", "/api/user", data);
      if (!res.ok) {
        throw new Error("Failed to update profile");
      }
      return res.json();
    },
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["/api/user"], updatedUser);
      setIsEditing(false);
      toast({ title: "Profile updated", description: "Your details have been saved." });
    },
    onError: (error) => {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-transparent">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-transparent space-y-4">
        <h1 className="text-2xl font-bold">Not Logged In</h1>
        <Link href="/">
          <Button className="rounded-full px-8">Return Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent pt-40 pb-20 px-6 flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10 animate-blob" />
      
      <div className="w-full max-w-2xl bg-card/60 backdrop-blur-md p-10 md:p-14 shadow-[0_50px_100px_rgba(0,0,0,0.3)] border border-white/10 relative overflow-hidden rounded-[2.5rem]">
        <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 blur-3xl -z-10" />
        
        <div className="text-center flex flex-col items-center mb-12 relative">
          <div className="absolute top-0 right-0">
             {!isEditing ? (
               <Button variant="ghost" size="icon" onClick={startEditing} className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
                 <Edit2 className="w-5 h-5" />
               </Button>
             ) : (
               <div className="flex gap-2">
                 <Button variant="ghost" size="icon" onClick={cancelEditing} className="rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors" disabled={updateMutation.isPending}>
                   <X className="w-5 h-5" />
                 </Button>
                 <Button variant="ghost" size="icon" onClick={() => updateMutation.mutate(editForm)} className="rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors" disabled={updateMutation.isPending}>
                   {updateMutation.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" />}
                 </Button>
               </div>
             )}
          </div>
          <div className="relative group">
            <Avatar className="h-32 w-32 mb-6 border-4 border-primary/20 p-1 bg-card/40 backdrop-blur-md shadow-2xl transition-transform group-hover:scale-105 duration-700">
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} />
              <AvatarFallback className="bg-primary/10 text-primary">
                <UserIcon className="h-14 w-14" />
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground border-4 border-background shadow-lg">
              <Shield className="w-5 h-5" />
            </div>
          </div>
          <h2 className="text-4xl font-bold mb-2">{user.name}</h2>
          <p className="text-primary font-bold uppercase tracking-[0.2em] text-xs">Bio-Citizen Pioneer</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70 ml-1">Full Name</Label>
            <div className="relative group">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50 group-focus-within:text-primary transition-colors" />
              <Input 
                className="h-14 pl-12 rounded-2xl bg-background/40 backdrop-blur-sm border border-border focus:border-primary/50 transition-all font-medium text-lg disabled:opacity-80" 
                value={isEditing ? editForm.name : user.name}
                onChange={(e) => setEditForm(prev => ({...prev, name: e.target.value}))}
                readOnly={!isEditing}
                disabled={updateMutation.isPending}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70 ml-1">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
              <Input className="h-14 pl-12 rounded-2xl bg-background/40 backdrop-blur-sm border border-border transition-all font-medium text-lg opacity-60" value={user.email} readOnly disabled title="Email cannot be changed" />
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70 ml-1">Phone Number</Label>
            <div className="relative group">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50 group-focus-within:text-primary transition-colors" />
              <Input 
                className="h-14 pl-12 rounded-2xl bg-background/40 backdrop-blur-sm border border-border focus:border-primary/50 transition-all font-medium text-lg disabled:opacity-80" 
                value={isEditing ? editForm.phoneNumber : (user.phoneNumber || "Not provided")} 
                onChange={(e) => setEditForm(prev => ({...prev, phoneNumber: e.target.value}))}
                readOnly={!isEditing}
                disabled={updateMutation.isPending}
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70 ml-1">Location</Label>
            <div className="relative group">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50 group-focus-within:text-primary transition-colors" />
              <Input 
                className="h-14 pl-12 rounded-2xl bg-background/40 backdrop-blur-sm border border-border focus:border-primary/50 transition-all font-medium text-lg disabled:opacity-80" 
                value={isEditing ? editForm.address : (user.address || "Not provided")} 
                onChange={(e) => setEditForm(prev => ({...prev, address: e.target.value}))}
                readOnly={!isEditing}
                disabled={updateMutation.isPending}
                placeholder="123 Eco District"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Link href="/dashboard" className="w-full">
            <Button className="w-full h-16 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 text-white transition-all hover:scale-[1.02]">
              Go to Dashboard
            </Button>
          </Link>
          {!isEditing && (
            <Button onClick={startEditing} variant="outline" className="w-full h-16 rounded-2xl text-lg font-bold bg-background/40 border border-border hover:bg-background/60 hover:text-primary transition-all">
              Edit Profile
            </Button>
          )}
        </div>

        {user.role === "admin" && (
          <div className="bg-primary/5 border border-primary/20 rounded-3xl p-8 mb-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/20 transition-colors duration-700" />
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <Shield className="w-6 h-6" />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="font-bold text-lg">Admin Control Panel</h3>
                  <p className="text-xs text-muted-foreground mt-1">Manage users, orders, and system settings.</p>
                </div>
              </div>
              <Link href="/admin" className="w-full sm:w-auto">
                <Button variant="secondary" className="w-full rounded-xl font-bold px-6 h-12 shadow-md hover:bg-primary hover:text-white transition-all group-hover:scale-105 duration-300">
                  Manage System
                </Button>
              </Link>
            </div>
          </div>
        )}

        <div className="mt-4 pt-10 border-t border-border text-center">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Member since September 2025. You have sequestered <span className="text-primary font-bold">142.5kg of CO2</span> to date. Keep breathing life!
          </p>
        </div>
      </div>
    </div>
  );
}
