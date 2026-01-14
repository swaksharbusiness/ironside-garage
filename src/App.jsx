import React, { useState, useEffect } from "react"
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
  ChevronRight,
  X,
  MessageSquare,
  Lock,
  Unlock,
  Terminal,
  Upload,
  RefreshCcw,
  CheckCircle2,
  AlertCircle
} from "lucide-react"

// --- CONFIGURATION ---
const CLOUDINARY_CLOUD_NAME = "dq0eqnh6u"; 
const CLOUDINARY_UPLOAD_PRESET = "ironside_preset"; 
const GALLERY_TAG = "ironside_gallery"; 
const ADMIN_PASSWORD = "1234"; 
const SHOP_PHONE = "(555) 123-4567";

export default function App() {
  // State for Modals and Admin
  const [showBooking, setShowBooking] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState(false);
  
  // State for Business Logic
  const [isOpen, setIsOpen] = useState(() => JSON.parse(localStorage.getItem("ironside_isOpen") ?? "true"));
  const [leadTime, setLeadTime] = useState(() => localStorage.getItem("ironside_leadTime") || "3–5 DAYS OUT");
  const [builds, setBuilds] = useState([]);
  
  // State for Gallery / Debugging
  const [isLoadingGallery, setIsLoadingGallery] = useState(false);
  const [debugLog, setDebugLog] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState("idle");

  const addLog = (msg, type = "info") => {
    setDebugLog(prev => [{ msg, type, time: new Date().toLocaleTimeString() }, ...prev].slice(0, 5));
  };

  // 1. Script Injection for Cloudinary
  useEffect(() => {
    const scriptId = "cloudinary-upload-widget-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://upload-widget.cloudinary.com/global/all.js";
      script.async = true;
      script.onload = () => addLog("Cloudinary Ready", "success");
      document.head.appendChild(script);
    }
  }, []);

  // 2. Fetch Gallery
  const fetchGallery = async () => {
    setIsLoadingGallery(true);
    try {
      const url = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/list/${GALLERY_TAG}.json?v=${Date.now()}`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        const formatted = data.resources.map(res => ({
          img: `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/q_auto,f_auto/v${res.version}/${res.public_id}.${res.format}`,
          title: "Ironside Custom"
        }));
        setBuilds(formatted);
        setConnectionStatus("success");
      } else {
        setConnectionStatus("error");
      }
    } catch (e) {
      setConnectionStatus("error");
    } finally {
      setIsLoadingGallery(false);
    }
  };

  useEffect(() => {
    fetchGallery();
    localStorage.setItem("ironside_isOpen", JSON.stringify(isOpen));
    localStorage.setItem("ironside_leadTime", leadTime);
  }, [isOpen, leadTime]);

  const handleAuth = (e) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAdminAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
      setPasswordInput("");
    }
  };

  const openUploadWidget = () => {
    if (!window.cloudinary) return;
    window.cloudinary.openUploadWidget(
      { cloudName: CLOUDINARY_CLOUD_NAME, uploadPreset: CLOUDINARY_UPLOAD_PRESET, tags: [GALLERY_TAG] },
      (error, result) => {
        if (!error && result.event === "success") {
          addLog("Upload Success", "success");
          setTimeout(fetchGallery, 2000);
        }
      }
    );
  };

  const services = [
    { name: "Quick Diagnostic", price: "$75", icon: Gauge, description: "Full system check" },
    { name: "Oil Change & Filter", price: "$95", icon: Droplet, description: "Premium fluids" },
    { name: "Brake Service", price: "$185", icon: Disc, description: "Pads & rotors" },
    { name: "Chain & Sprocket", price: "$120", icon: Zap, description: "Drive system" },
    { name: "Tire Mount", price: "$65", icon: Cog, description: "Balance & disposal" },
    { name: "Full Tune-Up", price: "Quote", icon: Shield, description: "Total performance" }
  ];

  return (
    
    <div className="fixed inset-0 h-dynamic-screen w-full flex flex-col bg-zinc-950 text-zinc-100 font-sans selection:bg-[#FF5733] overflow-hidden">
  
      {/* 1. BOOKING MODAL */}
      {showBooking && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
              <h3 className="font-black uppercase italic tracking-widest text-[#FF5733]">Secure a Slot</h3>
              <button onClick={() => setShowBooking(false)} className="p-2 hover:bg-zinc-800 rounded-full"><X/></button>
            </div>
            <div className="p-8 space-y-6">
              <p className="text-zinc-400 text-sm font-medium">To maintain quality, we handle all bookings via direct communication. Choose your preferred method:</p>
              
              <a href={`sms:+15551234567?body=I'd like to book a service at Ironside Garage.`} className="flex items-center gap-4 p-5 bg-zinc-950 border border-zinc-800 rounded-2xl hover:border-[#FF5733] transition-all group">
                <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center group-hover:bg-[#FF5733]/10">
                  <MessageSquare className="text-[#FF5733]" />
                </div>
                <div>
                  <div className="font-black uppercase text-xs tracking-widest">Text Us</div>
                  <div className="text-zinc-500 text-[10px]">Fastest for photos & quotes</div>
                </div>
              </a>

              <a href="tel:+15551234567" className="flex items-center gap-4 p-5 bg-zinc-950 border border-zinc-800 rounded-2xl hover:border-[#FF5733] transition-all group">
                <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center group-hover:bg-[#FF5733]/10">
                  <Phone className="text-[#FF5733]" />
                </div>
                <div>
                  <div className="font-black uppercase text-xs tracking-widest">Call Shop</div>
                  <div className="text-zinc-500 text-[10px]">Direct line to the mechanic</div>
                </div>
              </a>
            </div>
            <div className="p-6 bg-zinc-950/50 text-center">
               <p className="text-[9px] font-black uppercase text-zinc-600 tracking-[0.2em]">Estimated Lead Time: {leadTime}</p>
            </div>
          </div>
        </div>
      )}    
      
      {/* SETTINGS / ADMIN OVERLAY */}
      {showSettings && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {!isAdminAuthenticated ? (
              <div className="p-12 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-6">
                  <Lock className="w-8 h-8 text-[#FF5733]" />
                </div>
                <h2 className="text-2xl font-black uppercase italic mb-2 tracking-tighter">Admin Access</h2>
                <p className="text-zinc-500 text-sm mb-8 font-bold uppercase tracking-widest">Enter Credentials to Wrench</p>
                <form onSubmit={handleAuth} className="w-full space-y-4">
                  <div className="relative">
                    <input 
                      type="password" 
                      autoFocus
                      className={`w-full bg-zinc-800 border-2 ${authError ? 'border-red-500' : 'border-transparent'} p-4 rounded-xl text-center font-black tracking-[0.5em] outline-none focus:border-[#FF5733] transition-all`}
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder=""
                    />
                    {authError && <p className="text-red-500 text-[10px] font-black uppercase mt-2">Invalid Code</p>}
                  </div>
                  <button className="w-full py-4 bg-[#FF5733] text-white font-black uppercase tracking-widest rounded-xl">Unlock Panel</button>
                  <button type="button" onClick={() => setShowSettings(false)} className="text-zinc-600 text-[10px] font-black uppercase tracking-widest hover:text-white">Cancel</button>
                </form>
              </div>
            ) : (
              <>
                <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
                  <div className="flex items-center gap-2">
                    <Unlock className="w-5 h-5 text-[#FF5733]" />
                    <h2 className="text-xl font-black uppercase italic tracking-tighter text-[#FF5733]">Garage Controls</h2>
                  </div>
                  <button onClick={() => setShowSettings(false)} className="text-zinc-500 hover:text-white transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="p-6 overflow-y-auto space-y-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Shop Status</label>
                      <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className={`w-full py-3 rounded-lg font-black uppercase text-xs tracking-widest transition-colors ${isOpen ? 'bg-green-600/20 text-green-500 border border-green-500/50' : 'bg-red-600/20 text-red-500 border border-red-500/50'}`}
                      >
                        {isOpen ? 'Currently Open' : 'Currently Closed'}
                      </button>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Lead Time Text</label>
                      <input 
                        type="text"
                        className="w-full bg-zinc-800 border-none p-3 rounded-lg text-xs font-black uppercase tracking-tighter"
                        value={leadTime}
                        onChange={(e) => setLeadTime(e.target.value)}
                      />
                    </div>
                  </div>

                  <section>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xs font-black text-zinc-500 uppercase tracking-[0.2em]">Gallery Management</h3>
                      <span className="text-[9px] font-bold text-zinc-600 uppercase italic">Tag: {GALLERY_TAG}</span>
                    </div>
                    <button 
                      onClick={openUploadWidget}
                      className="w-full py-6 border-2 border-dashed border-zinc-800 hover:border-[#FF5733] rounded-xl flex items-center justify-center gap-3 mb-4 transition-colors"
                    >
                      <Upload className="w-5 h-5 text-[#FF5733]" />
                      <span className="font-black text-xs uppercase tracking-widest">Upload Persistent Build</span>
                    </button>
                    <div className="grid grid-cols-4 gap-2">
                      {builds.map((build, i) => (
                        <div key={i} className="relative aspect-square">
                          <img src={build.img} className="w-full h-full object-cover rounded-lg brightness-75" alt="" />
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 text-[10px] text-zinc-600 leading-tight">
                      * To delete images permanently, Contact Administrator.
                      Changes appear here on refresh.
                    </p>
                  </section>
                </div>
                
                <div className="p-6 bg-zinc-900 border-t border-zinc-800 flex gap-4">
                  <button 
                    onClick={() => { setIsAdminAuthenticated(false); setShowSettings(false); }}
                    className="flex-1 py-4 bg-[#FF5733] text-white font-black uppercase text-sm tracking-widest"
                  >
                    Save & Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* HEADER */}
      <header className="flex-none border-b border-zinc-900 bg-zinc-950 z-40 relative px-4 py-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-2">
          <Wrench className="w-6 h-6 text-[#FF5733]" strokeWidth={2.5} />
          <span className="text-xl font-black tracking-tighter uppercase italic">Ironside<span className="text-zinc-600">Garage</span></span>
        </div>
        <button onDoubleClick={() => setShowSettings(true)} className="flex items-center gap-2 bg-zinc-900 py-1.5 px-3 rounded-full border border-zinc-800">
          <div className={`w-3 h-3 rounded-full ${isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
          <span className="text-[20px] font-black text-zinc-400 uppercase tracking-widest">{isOpen ? 'OPEN' : 'CLOSED'}</span>
        </button>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden touch-pan-y">
        
        {/* HERO */}
        <section className="relative min-h-[75vh] flex items-center justify-center px-4 py-12 bg-zinc-950 overflow-hidden text-center">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800 to-transparent"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-[0.85] mb-8 text-white italic">
              We Get You<br />
              <span className="text-[#FF5733]">Back On The Road.</span>
            </h1>
            <p className="text-zinc-400 font-bold uppercase tracking-widest text-lg md:text-2xl mb-10">no upsell. just honest services.</p>
            <button 
              onClick={() => setShowBooking(true)}
              className="px-12 py-6 bg-[#FF5733] text-white text-xl font-black italic tracking-wide skew-x-[-10deg] hover:scale-105 transition-transform"
            >
              <span className="block skew-x-[10deg]">BOOK TODAY</span>
            </button>
          </div>
        </section>

        <section className="px-4 -mt-10 relative z-20 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
		{/* Lead Time Section */}
			<div className="bg-zinc-900 border-l-4 border-[#FF5733] p-8 shadow-2xl flex flex-col justify-center gap-4">
				<div>
					<p className="text-[10px] font-black text-[#FF5733] uppercase tracking-[0.3em] mb-2">Shop Availability</p>
					<h3 className="text-5xl font-black text-white tracking-tighter italic">{leadTime}</h3>
				</div>
					<p className="text-zinc-500 text-[10px] font-bold uppercase italic">
					{isOpen ? 'Current estimate for major repairs. Tires & oil changes are walk-in friendly.' : 'Shop is currently at capacity.'}
					</p>
			</div>

		{/* Text Us Section */}
			<div className="bg-[#FF5733] p-8 shadow-2xl flex flex-col items-center justify-center text-center gap-4">
				<div className="flex items-center gap-4">
				  <Camera className="w-12 h-12 text-black/55" strokeWidth={1.5} />
				  <h2 className="text-2xl font-black text-white tracking-tight leading-none uppercase italic">Something Sounding Wrong?</h2>
				</div>
				<a href="sms:+15551234567" className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-zinc-950 text-white text-sm font-black tracking-wide hover:scale-[1.02] transition-transform shadow-xl uppercase">
				  <MessageSquare className="w-4 h-4 text-[#FF5733]" />
				  Text a photo or video
				</a>
			</div>
		</section>	

        {/* SERVICES */}
        <section className="max-w-7xl mx-auto px-4 py-24">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-5xl font-black text-zinc-500">01</h2>
            <h3 className="text-2xl font-black uppercase italic">Service Menu</h3>
            <div className="h-px flex-1 bg-zinc-900"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s, i) => (
              <div key={i} className="group bg-zinc-900/30 p-8 border border-zinc-900 hover:border-[#FF5733] transition-all rounded-2xl">
                <div className="flex justify-between items-start mb-6">
                  <s.icon className="w-8 h-8 text-zinc-800 group-hover:text-[#FF5733] transition-colors" />
                  <span className="text-[#FF5733] font-black text-lg">{s.price}</span>
                </div>
                <h4 className="text-xl font-black uppercase italic mb-2 tracking-tight">{s.name}</h4>
                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{s.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* GALLERY */}
        <section className="max-w-7xl mx-auto px-4 py-24 border-t border-zinc-900">
           <div className="flex items-center gap-4 mb-12">
            <h2 className="text-5xl font-black text-zinc-500">02</h2>
            <h3 className="text-2xl font-black uppercase italic">Recent Builds</h3>
            <div className="h-px flex-1 bg-zinc-900"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {builds.length > 0 ? builds.map((b, i) => (
              <div key={i} className="aspect-square bg-zinc-900 rounded-2xl overflow-hidden group border border-zinc-900">
                <img src={b.img} className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
              </div>
            )) : (
              <div className="col-span-full py-20 text-center border-2 border-dashed border-zinc-900 rounded-3xl">
                <Camera className="w-8 h-8 text-zinc-900 mx-auto mb-4" />
                <p className="text-[10px] font-black uppercase text-zinc-800 tracking-widest">Awaiting First Custom Build</p>
              </div>
            )}
          </div>
        </section>

        <div className="h-40"></div>
      </main>

      {/* FOOTER: Now fully visible on mobile because parent uses fixed bounds and dvh height. */}
      <footer className="flex-none bg-zinc-950 border-t-2 border-[#FF5733] z-50">
        <div className="grid grid-cols-3 divide-x divide-zinc-900">
          <a href="tel:+15551234567" className="flex flex-col items-center justify-center py-6 bg-zinc-900 hover:bg-zinc-800 group transition-colors">
            <Phone className="w-6 h-6 mb-1 text-zinc-600 group-hover:text-white" />
            <span className="text-[9px] font-black tracking-[0.2em] text-zinc-600 group-hover:text-white uppercase">CALL</span>
          </a>
          <a href="https://maps.google.com" target="_blank" className="flex flex-col items-center justify-center py-6 bg-zinc-900 hover:bg-zinc-800 group transition-colors">
            <MapPin className="w-6 h-6 mb-1 text-zinc-600 group-hover:text-white" />
            <span className="text-[9px] font-black tracking-[0.2em] text-zinc-600 group-hover:text-white uppercase">MAPS</span>
          </a>
          <button 
            onClick={() => setShowBooking(true)}
            className="flex flex-col items-center justify-center py-6 bg-[#FF5733] hover:bg-[#E64A2A] transition-colors"
          >
            <Calendar className="w-6 h-6 mb-1 text-white" />
            <span className="text-[9px] font-black tracking-[0.2em] text-white uppercase">BOOK</span>
          </button>
        </div>
      </footer>
    </div>
  )
}