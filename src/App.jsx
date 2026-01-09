import React from "react"
import {
  Phone,
  MapPin,
  Calendar,
  Clock,
  Camera,
  Gauge,
  Shield,
  Zap,
  Cog,
  Droplet,
  Disc,
  Wrench,
  ChevronRight
} from "lucide-react"

export default function App() {
  const services = [
    {
      name: "Quick Diagnostic",
      description: "Full system check and issue report",
      price: "$75",
      icon: Gauge
    },
    {
      name: "Oil Change & Filter",
      description: "Fresh oil, new filter, fluid check",
      price: "$95",
      icon: Droplet
    },
    {
      name: "Brake Service",
      description: "Pads, rotors, fluid replacement",
      price: "$185",
      icon: Disc
    },
    {
      name: "Chain & Sprocket",
      description: "Clean, adjust, or replace drive system",
      price: "$120",
      icon: Zap
    },
    {
      name: "Tire Mount & Balance",
      description: "Professional mount, balance, disposal",
      price: "$65",
      icon: Cog
    },
    {
      name: "Full Tune-Up",
      description: "Complete maintenance and performance check",
      price: "Call for Quote",
      icon: Shield
    }
  ]

  const builds = [
    {
      title: "Cafe Racer '78",
      img: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Scrambler Custom",
      img: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Softail Bobber",
      img: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=800"
    }
  ]

  return (
    // FIX APPLIED: "fixed inset-0" pins the app to the viewport edges.
    // This prevents the "floating footer" issue on mobile browsers.
    // z-0 ensures it sits correctly in the stacking context.
    <div className="fixed inset-0 z-0 flex flex-col bg-zinc-950 text-zinc-100 font-sans selection:bg-[#FF5733] selection:text-white">
      
      {/* HEADER */}
      <header className="flex-none border-b border-zinc-800 bg-zinc-950 z-40 relative shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Wrench className="w-6 h-6 text-[#FF5733]" strokeWidth={2.5} />
            <span className="text-xl font-black tracking-tighter uppercase italic">
              Ironside<span className="text-zinc-600">Garage</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#FF5733] animate-pulse"></div>
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Open</span>
          </div>
        </div>
      </header>

      {/* MAIN SCROLL AREA */}
      {/* "overscroll-none" prevents the bounce effect on iOS */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth pb-24 overscroll-none">
        
        {/* 1. HERO */}
        <section className="relative min-h-[70vh] flex items-center justify-center px-4 py-12 bg-zinc-900 border-b border-zinc-800 overflow-hidden">
          {/* Gritty Texture Overlay - Changed to CSS gradient to ensure it loads if external image fails */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-zinc-950 to-zinc-950 pointer-events-none"></div>
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] mb-8 text-white">
              WE GET YOU<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#FF5733] to-[#cc3719]">BACK ON THE ROAD.</span>
            </h1>
            <p className="text-lg md:text-2xl text-zinc-400 font-bold uppercase tracking-wide mb-10 max-w-2xl mx-auto">
              No Upsells. No Bullshit. Just Honest Service.
            </p>
            <button className="w-full md:w-auto px-10 py-5 bg-[#FF5733] hover:bg-[#E64A2A] active:bg-[#cc3719] text-white text-xl md:text-2xl font-black italic tracking-wide skew-x-[-10deg] transition-all transform active:scale-95 shadow-[0_0_30px_rgba(255,87,51,0.2)]">
              <span className="block skew-x-[10deg]">BOOK SERVICE NOW</span>
            </button>
          </div>
        </section>

        {/* 2. SHOP STATUS */}
        <section className="max-w-7xl mx-auto px-4 -mt-6 relative z-20">
          <div className="bg-zinc-900 border-l-4 border-[#FF5733] p-6 shadow-2xl shadow-black/80 ring-1 ring-white/5">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-5 h-5 text-[#FF5733]" />
                  <h2 className="text-sm font-black text-[#FF5733] tracking-widest uppercase">Current Lead Time</h2>
                </div>
                <div className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                  3 – 5 DAYS OUT
                </div>
              </div>
              <div className="text-zinc-500 text-sm font-medium border-t md:border-t-0 md:border-l border-zinc-800 pt-4 md:pt-0 md:pl-6 w-full md:w-auto">
                <p>Accepting Walk-ins for Tires & Oil.</p>
                <p>For Diagnostics - Give us a Call.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. SERVICE MENU */}
        <section className="max-w-7xl mx-auto px-4 py-20">
          <div className="flex items-end gap-4 mb-12 border-b-2 border-zinc-800 pb-4">
            <h2 className="text-5xl md:text-6xl font-black text-zinc-800 leading-none">01</h2>
            <h3 className="text-3xl md:text-4xl font-black text-white leading-none mb-1">SERVICE MENU</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <div 
                  key={index} 
                  className="group bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800 hover:border-[#FF5733] p-6 transition-colors duration-200"
                >
                  <div className="flex justify-between items-start mb-4">
                    <Icon className="w-8 h-8 text-[#FF5733] transition-colors" />
                    <span className="text-xl font-black text-[#FF5733]">{service.price}</span>
                  </div>
                  <h4 className="text-xl font-black mb-2 uppercase italic">{service.name}</h4>
                  <p className="text-zinc-400 text-sm font-medium">{service.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* 4. TEXT A PHOTO (CTA) */}
        <section className="bg-[#FF5733] py-20 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Camera className="w-20 h-20 text-black/20 mx-auto mb-6" strokeWidth={1.5} />
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight leading-none">
              Something Sounding Wrong?
            </h2>
            <p className="text-black/60 text-xl font-bold mb-10 max-w-xl mx-auto">
              Don't guess. Text us a photo or video of what your bike is doing. We'll diagnose it fast.
            </p>
            <a 
              href="sms:+15551234567"
              className="inline-flex items-center gap-3 px-10 py-5 bg-zinc-950 text-white text-xl font-black uppercase tracking-wide hover:scale-105 transition-transform shadow-xl"
            >
              <Phone className="w-6 h-6 text-[#FF5733]" />
              Text (555) 123-4567
            </a>
          </div>
        </section>

        {/* 5. BUILD GALLERY */}
        <section className="max-w-7xl mx-auto px-4 py-20">
           <div className="flex items-end gap-4 mb-12 border-b-2 border-zinc-800 pb-4">
            <h2 className="text-5xl md:text-6xl font-black text-zinc-800 leading-none">02</h2>
            <h3 className="text-3xl md:text-4xl font-black text-white leading-none mb-1">RECENT BUILDS</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            {builds.map((build, i) => (
              <div key={i} className="relative aspect-square group overflow-hidden bg-zinc-900">
                <img 
                  src={build.img} 
                  alt={build.title}
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white font-black uppercase tracking-tighter text-lg leading-none">{build.title}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
             <button className="text-zinc-500 hover:text-[#FF5733] font-black uppercase tracking-widest text-sm inline-flex items-center gap-2 group">
                View Full Archive <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </button>
          </div>
        </section>

        {/* Spacer for scroll clearance */}
        <div className="h-8"></div>
      </main>

      {/* FOOTER */}
      <footer className="flex-none bg-zinc-950 border-t-2 border-[#FF5733] z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] pb-[env(safe-area-inset-bottom)]">
        <div className="grid grid-cols-3 divide-x divide-zinc-800">
          <a href="tel:+15551234567" className="flex flex-col items-center justify-center py-5 md:py-6 bg-zinc-900 hover:bg-zinc-800 active:bg-[#FF5733] group transition-colors cursor-pointer">
            <Phone className="w-7 h-7 md:w-8 md:h-8 mb-1 text-zinc-500 group-hover:text-white group-active:text-white transition-colors" strokeWidth={2} />
            <span className="text-[10px] md:text-xs font-black tracking-widest text-zinc-500 group-hover:text-white group-active:text-white uppercase">CALL</span>
          </a>
          
          <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center py-5 md:py-6 bg-zinc-900 hover:bg-zinc-800 active:bg-[#FF5733] group transition-colors cursor-pointer">
            <MapPin className="w-7 h-7 md:w-8 md:h-8 mb-1 text-zinc-500 group-hover:text-white group-active:text-white transition-colors" strokeWidth={2} />
            <span className="text-[10px] md:text-xs font-black tracking-widest text-zinc-500 group-hover:text-white group-active:text-white uppercase">MAPS</span>
          </a>
          
          <button className="flex flex-col items-center justify-center py-5 md:py-6 bg-[#FF5733] hover:bg-[#E64A2A] active:bg-white group transition-colors cursor-pointer">
            <Calendar className="w-7 h-7 md:w-8 md:h-8 mb-1 text-white group-active:text-[#FF5733] transition-colors" strokeWidth={2} />
            <span className="text-[10px] md:text-xs font-black tracking-widest text-white group-active:text-[#FF5733] uppercase">BOOK</span>
          </button>
        </div>
      </footer>
    </div>
  )
}