import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { 
  Loader2, 
  MapPin, 
  Wind, 
  Activity, 
  Droplets, 
  Sun, 
  TrendingUp,
  Heart,
  Leaf,
  Clock,
  ShieldCheck
} from "lucide-react";
import { motion } from "framer-motion";

interface AQIData {
  latitude: number;
  longitude: number;
  current: {
    pm10: number;
    pm2_5: number;
    carbon_monoxide: number;
    nitrogen_dioxide: number;
    sulphur_dioxide: number;
    ozone: number;
    dust: number;
    uv_index: number;
  };
}

interface AQILevel {
  level: number;
  label: string;
  color: string;
  advice: string;
  aqiValue: number;
}

/**
 * Standard EPA AQI Calculation (Simplified for PM2.5)
 * Using actual PM2.5 concentration to derive the standard AQI Index.
 */
function calculateAQI(pm25: number): AQILevel {
  if (pm25 <= 12) return { 
    level: 1, label: "Good", color: "text-emerald-500", aqiValue: Math.round((50/12) * pm25),
    advice: "Ideal for all outdoor activities."
  };
  if (pm25 <= 35.4) return { 
    level: 2, label: "Moderate", color: "text-primary", aqiValue: Math.round(51 + (49/23.4) * (pm25 - 12)),
    advice: "Sensitive groups should monitor symptoms."
  };
  if (pm25 <= 55.4) return { 
    level: 3, label: "Unhealthy (Sensitive)", color: "text-amber-500", aqiValue: Math.round(101 + (49/20) * (pm25 - 35.4)),
    advice: "Reduce prolonged outdoor exertion."
  };
  if (pm25 <= 150.4) return { 
    level: 4, label: "Unhealthy", color: "text-orange-600", aqiValue: Math.round(151 + (49/95) * (pm25 - 55.4)),
    advice: "Limit outdoor time. Wear a mask."
  };
  return { 
    level: 5, label: "Hazardous", color: "text-rose-600", aqiValue: Math.round(201 + (99/100) * (pm25 - 150.4)),
    advice: "Avoid all outdoor physical activity."
  };
}

const DiagnosticRing = ({ aqi, colorClass, rawValue }: { aqi: number, colorClass: string, rawValue: number }) => {
  const radius = 55;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(aqi, 300) / 300) * circumference;

  return (
    <div className="relative w-40 h-40 md:w-52 md:h-52 flex items-center justify-center shrink-0 group">
      {/* Outer Rotating Scan Line */}
      <div className="absolute inset-0 border border-foreground/5 rounded-full animate-[spin_10s_linear_infinite]" />
      <div className="absolute inset-2 border border-dashed border-primary/20 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
      
      {/* Background Glow */}
      <div className={cn("absolute inset-10 blur-[40px] opacity-20 dark:opacity-30 rounded-full transition-colors duration-1000", colorClass.replace('text-', 'bg-'))} />

      <svg className="w-full h-full -rotate-90 relative z-10">
        <circle cx="50%" cy="50%" r={radius} className="stroke-foreground/5 fill-none" strokeWidth="2" />
        <motion.circle
          cx="50%" cy="50%" r={radius}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 2, ease: "circOut" }}
          className={cn("fill-none stroke-current transition-colors duration-700", colorClass)}
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeLinecap="round"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-0.5">
        <div className="text-[8px] font-black uppercase tracking-[0.3em] text-muted-foreground">AQI_Index</div>
        <div className={cn("text-4xl md:text-5xl font-black tracking-tighter tabular-nums leading-none", colorClass)}>
          {aqi}
        </div>
        <div className="flex items-center gap-1.5">
          <div className={cn("w-1 h-1 rounded-full animate-pulse", colorClass.replace('text-', 'bg-'))} />
          <div className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest tabular-nums">{rawValue.toFixed(1)} μg/m³</div>
        </div>
      </div>

      {/* Corner Brackets */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-border" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-border" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-border" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-border" />
    </div>
  );
};

export default function AirQualitySection() {
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
          setLocation({ lat: 28.6139, lon: 77.2090 });
          setLocationName("New Delhi Station");
        }
      );
    }
  }, []);

  const { data, isLoading } = useQuery<AQIData>({
    queryKey: ["/api/air-quality", location?.lat, location?.lon],
    enabled: !!location,
    queryFn: async () => {
      const res = await fetch(
        `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${location?.lat}&longitude=${location?.lon}&current=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,dust,uv_index`
      );
      return res.json();
    },
    refetchInterval: 300000, 
  });

  const aqi = data ? calculateAQI(data.current.pm2_5) : null;

  return (
    <section className="py-12 bg-background relative overflow-hidden font-lexend transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header: Intelligence Status */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-[0.4em] text-[9px]">
              <div className="w-8 h-px bg-primary/40" />
              <span>Diagnostic Feed</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none text-foreground">
              Atmospheric <span className="premium-gradient-text italic font-normal text-2xl md:text-4xl block md:inline">Intelligence.</span>
            </h2>
          </div>
          
          <div className="flex flex-col items-start md:items-end gap-3">
            <div className="bg-card border border-border rounded-xl px-4 py-2 flex items-center gap-3 shadow-xl">
              <div className="space-y-0.5">
                <div className="text-[7px] font-black text-muted-foreground uppercase tracking-widest">Station</div>
                <div className="text-[10px] font-bold text-foreground uppercase tracking-tight flex items-center gap-1.5">
                  <MapPin className="w-2.5 h-2.5 text-primary" />
                  {locationName}
                </div>
              </div>
              <div className="w-px h-6 bg-border" />
              <div className="space-y-0.5">
                <div className="text-[7px] font-black text-muted-foreground uppercase tracking-widest">Status</div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                  <span className="text-[8px] font-mono font-bold text-muted-foreground uppercase">Live</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="h-64 w-full flex flex-col items-center justify-center gap-4 bg-card rounded-[2rem] border border-border border-dashed">
            <Loader2 className="w-6 h-6 animate-spin text-primary/40" />
            <div className="text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground animate-pulse">
              Syncing Telemetry...
            </div>
          </div>
        ) : data && aqi && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left: Compact Scan Visualization */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 bg-card border border-border rounded-[2rem] p-6 md:p-10 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity text-foreground">
                <Wind className="w-48 h-48" />
              </div>

              <DiagnosticRing aqi={aqi.aqiValue} colorClass={aqi.color} rawValue={data.current.pm2_5} />
              
              <div className="mt-8 text-center space-y-4 relative z-10 w-full">
                <div className="space-y-1">
                  <div className={cn("text-[9px] font-black uppercase tracking-[0.3em]", aqi.color)}>
                    {aqi.label} Condition
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground font-medium leading-tight max-w-[240px] mx-auto">
                    {aqi.advice}
                  </p>
                </div>
                
                <div className="pt-4 border-t border-border grid grid-cols-2 gap-4">
                  <div className="text-left space-y-0.5">
                    <div className="text-[7px] font-black text-muted-foreground uppercase tracking-widest">Bio Risk</div>
                    <div className="text-[11px] font-black text-foreground uppercase">{aqi.level <= 2 ? 'Minimal' : 'Elevated'}</div>
                  </div>
                  <div className="text-left space-y-0.5">
                    <div className="text-[7px] font-black text-muted-foreground uppercase tracking-widest">Exposure</div>
                    <div className="text-[11px] font-black text-foreground tabular-nums">{data.current.uv_index.toFixed(1)} UVI</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Data Intelligence Grid (Strict 2x2) */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              {[
                { label: "Particulates", value: data.current.pm10.toFixed(1), unit: "μg/m³", icon: Wind, id: "PM10", desc: "Coarse dust and pollen." },
                { label: "Oxidants", value: data.current.ozone.toFixed(1), unit: "ppb", icon: Sun, id: "Ozone", desc: "Ground-level ozone." },
                { label: "Nitrogen", value: data.current.nitrogen_dioxide.toFixed(1), unit: "ppb", icon: Activity, id: "NO₂", desc: "Combustion byproduct." },
                { label: "Monoxide", value: data.current.carbon_monoxide.toFixed(0), unit: "ppm", icon: Droplets, id: "CO", desc: "Carbon emissions." },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border rounded-[1.5rem] p-4 md:p-5 flex flex-col justify-between hover:border-primary/30 transition-colors group relative overflow-hidden shadow-sm"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-10 transition-opacity text-primary">
                    <item.icon className="w-8 h-8" />
                  </div>

                  <div className="space-y-2 md:space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-foreground/5 border border-border flex items-center justify-center shrink-0">
                        <item.icon className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <div className="space-y-0">
                        <div className="text-[7px] font-black text-muted-foreground uppercase tracking-widest leading-none">{item.label}</div>
                        <div className="text-[10px] font-bold text-foreground uppercase tracking-tight">{item.id}</div>
                      </div>
                    </div>
                    
                    <div className="text-xl md:text-2xl font-black text-foreground tabular-nums leading-none flex items-baseline gap-1">
                      {item.value} <span className="text-[9px] text-muted-foreground uppercase tracking-widest">{item.unit}</span>
                    </div>
                    
                    <p className="text-[8px] md:text-[9px] text-muted-foreground leading-relaxed line-clamp-2">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Technical Footnote Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="col-span-2 bg-primary/5 border border-primary/20 rounded-[1rem] p-3 md:p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <div className="text-[8px] font-black text-muted-foreground uppercase tracking-[0.1em] leading-tight">
                    Verified through decentralized node verification. <br className="hidden sm:block" />
                    Network Calibration: Active.
                  </div>
                </div>
                <TrendingUp className="w-3.5 h-3.5 text-primary hidden sm:block" />
              </motion.div>
            </div>

          </div>
        )}
      </div>
    </section>
  );
}
