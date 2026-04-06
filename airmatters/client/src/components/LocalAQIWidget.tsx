import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { 
  Loader2, 
  MapPin, 
  Wind, 
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AQIData {
  latitude: number;
  longitude: number;
  current: {
    pm2_5: number;
  };
}

interface AQILevel {
  level: number;
  label: string;
  color: string;
  bg: string;
  icon: any;
  aqiValue: number;
}

function calculateAQI(pm25: number): AQILevel {
  if (pm25 <= 12) return { 
    level: 1, label: "Good", color: "text-emerald-500", bg: "bg-emerald-500/10", icon: CheckCircle2,
    aqiValue: Math.round((50/12) * pm25)
  };
  if (pm25 <= 35.4) return { 
    level: 2, label: "Moderate", color: "text-primary", bg: "bg-primary/10", icon: Wind,
    aqiValue: Math.round(51 + (49/23.4) * (pm25 - 12))
  };
  if (pm25 <= 55.4) return { 
    level: 3, label: "Unhealthy (Sensitive)", color: "text-amber-500", bg: "bg-amber-500/10", icon: ShieldAlert,
    aqiValue: Math.round(101 + (49/20) * (pm25 - 35.4))
  };
  if (pm25 <= 150.4) return { 
    level: 4, label: "Unhealthy", color: "text-orange-600", bg: "bg-orange-600/10", icon: AlertTriangle,
    aqiValue: Math.round(151 + (49/95) * (pm25 - 55.4))
  };
  return { 
    level: 5, label: "Hazardous", color: "text-rose-600", bg: "bg-rose-600/10", icon: XCircle,
    aqiValue: Math.round(201 + (99/100) * (pm25 - 150.4))
  };
}

export default function LocalAQIWidget() {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [locationName, setLocationName] = useState<string>("Locating...");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude: lat, longitude: lon } = position.coords;
          setLocation({ lat, lon });
          try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
            const data = await res.json();
            setLocationName(data.address.city || data.address.town || data.address.suburb || "Local Station");
          } catch (e) { setLocationName("Nearby Station"); }
        },
        () => {
          // Fallback to New Delhi if denied/failed
          setLocation({ lat: 28.6139, lon: 77.2090 });
          setLocationName("New Delhi Station");
        }
      );
    }
  }, []);

  const { data, isLoading } = useQuery<AQIData>({
    queryKey: ["/api/air-quality-compact", location?.lat, location?.lon],
    enabled: !!location,
    queryFn: async () => {
      const res = await fetch(
        `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${location?.lat}&longitude=${location?.lon}&current=pm2_5`
      );
      return res.json();
    },
    refetchInterval: 300000, 
  });

  const aqi = data ? calculateAQI(data.current.pm2_5) : null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card border-primary/20 p-4 min-w-[280px] shadow-2xl relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
          <Wind className="w-12 h-12 text-primary" />
        </div>

        <div className="flex items-center gap-4 relative z-10">
          {isLoading ? (
            <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-primary/40" />
            </div>
          ) : aqi ? (
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center border", aqi.bg, aqi.color.replace('text-', 'border-'))}>
              <aqi.icon className={cn("w-6 h-6", aqi.color)} />
            </div>
          ) : null}

          <div className="flex-1">
            <div className="flex items-center gap-1.5 text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">
              <MapPin className="w-2.5 h-2.5 text-primary" />
              {locationName}
            </div>
            
            {isLoading ? (
              <div className="h-6 w-24 bg-foreground/5 animate-pulse rounded" />
            ) : aqi ? (
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black tracking-tighter tabular-nums leading-none">
                  AQI {aqi.aqiValue}
                </span>
                <span className={cn("text-[10px] font-black uppercase tracking-widest leading-none", aqi.color)}>
                  — {aqi.label}
                </span>
              </div>
            ) : null}
          </div>
        </div>

        {/* Action/Detail Label */}
        <div className="mt-4 pt-3 border-t border-primary/10 flex justify-between items-center">
          <span className="text-[7px] font-bold uppercase tracking-[0.3em] text-muted-foreground">Local Atmospheric Status</span>
          <div className="flex gap-1">
            <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
            <div className="w-1 h-1 rounded-full bg-primary animate-pulse [animation-delay:0.2s]" />
            <div className="w-1 h-1 rounded-full bg-primary animate-pulse [animation-delay:0.4s]" />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
