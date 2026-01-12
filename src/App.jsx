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
  Settings,
  Upload,
  Trash2,
  X,
  Lock,
  Unlock,
  AlertCircle
} from "lucide-react"

// --- CONFIGURATION ---
// Replace with your actual Cloudinary details
const CLOUDINARY_CLOUD_NAME = "dq0eqnh6u";
const CLOUDINARY_UPLOAD_PRESET = "ironside_preset";
const GALLERY_TAG = "ironside_gallery"; // Images will be fetched by this tag
const ADMIN_PASSWORD = "1234"; 

export default function App() {
  // --- UI STATE ---
  const [showSettings, setShowSettings] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState(false);
  const [isLoadingGallery, setIsLoadingGallery] = useState(true);

  // --- CONTENT STATE (Persisted via LocalStorage & Cloudinary Tagging) ---
  const [isOpen, setIsOpen] = useState(() => {
    const saved = localStorage.getItem("ironside_isOpen");
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [leadTime, setLeadTime] = useState(() => {
    return localStorage.getItem("ironside_leadTime") || "3–5 DAYS OUT";
  });

  const [builds, setBuilds] = useState([]);

  // --- PERSISTENCE LOGIC ---
  
  // Save settings to local storage when they change
  useEffect(() => {
    localStorage.setItem("ironside_isOpen", JSON.stringify(isOpen));
    localStorage.setItem("ironside_leadTime", leadTime);
  }, [isOpen, leadTime]);

  // Fetch gallery from Cloudinary using Tags
  const fetchGallery = async () => {
    try {
      setIsLoadingGallery(true);
      // NOTE: For this URL to work, "Resource List" must be enabled in Cloudinary 
      // settings under Settings -> Security -> Restricted media types: Uncheck "Resource list"
      const response = await fetch(
        `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/list/${GALLERY_TAG}.json`
      );
      
      if (response.ok) {
        const data = await response.json();
        const formattedBuilds = data.resources.map(res => ({
          title: "Custom Build",
          img: `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/v${res.version}/${res.public_id}.${res.format}`
        }));
        setBuilds(formattedBuilds);
      }
    } catch (err) {
      console.error("Gallery fetch failed. Check Cloudinary 'Resource List' settings.", err);
    } finally {
      setIsLoadingGallery(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // --- ADMIN LOGIC ---
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
      { 
        cloudName: CLOUDINARY_CLOUD_NAME, 
        uploadPreset: CLOUDINARY_UPLOAD_PRESET, 
        tags: [GALLERY_TAG], // CRITICAL: This tags the photo so we can find it later
        sources: ["local", "url", "camera"], 
        multiple: false 
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          // Re-fetch gallery to include the new persistent image
          setTimeout(fetchGallery, 1000);
        }
      }
    );
  };

  const services = [
    { name: "Quick Diagnostic", description: "Full system check and issue report", price: "$75", icon: Gauge },
    { name: "Oil Change & Filter", description: "Fresh oil, new filter, fluid check", price: "$95", icon: Droplet },
    { name: "Brake Service", description: "Pads, rotors, fluid replacement", price: "$185", icon: Disc },
    { name: "Chain & Sprocket", description: "Clean, adjust, or replace drive system", price: "$120", icon: Zap },
    { name: "Tire Mount & Balance", description: "Professional mount, balance, disposal", price: "$65", icon: Cog },
    { name: "Full Tune-Up", description: "Complete maintenance and performance check", price: "Call for Quote", icon: Shield }
  ];

  return (
    <div className="h-screen w-full flex flex-col bg-zinc-950 text-zinc-100 font-sans selection:bg-[#FF5733] selection:text-white overflow-hidden">
      
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
                      * To delete images permanently, use your Cloudinary Dashboard. 
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
      <header className="flex-none border-b border-zinc-800 bg-zinc-950 z-40 relative shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Wrench className="w-6 h-6 text-[#FF5733]" strokeWidth={2.5} />
            <span className="text-xl font-black tracking-tighter uppercase italic">
              Ironside<span className="text-zinc-600">Garage</span>
            </span>
          </div>
          <button 
            onDoubleClick={() => setShowSettings(true)}
            className="flex items-center gap-2 group p-2 rounded-lg hover:bg-zinc-900 transition-all"
          >
            <div className={`w-2 h-2 rounded-full animate-pulse ${isOpen ? 'bg-[#FF5733]' : 'bg-red-500'}`}></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600 group-hover:text-zinc-400">
              {isOpen ? 'Open' : 'Closed'}
            </span>
            <Settings className="w-4 h-4 text-zinc-800 group-hover:text-zinc-600 ml-2" />
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth touch-pan-y">
        
        {/* HERO */}
        <section className="relative min-h-[60vh] flex items-center justify-center px-4 py-12 bg-zinc-900 border-b border-zinc-800 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-zinc-950 to-zinc-950 pointer-events-none"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8 text-white">
              BUILT TO<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#FF5733] to-[#cc3719]">PERFORM.</span>
            </h1>
            <button className="px-10 py-5 bg-[#FF5733] hover:bg-[#E64A2A] text-white text-xl font-black italic tracking-wide skew-x-[-10deg] transition-all transform active:scale-95 shadow-xl">
              <span className="block skew-x-[10deg]">BOOK SERVICE</span>
            </button>
          </div>
        </section>

        {/* SHOP STATUS SECTION */}
        <section className="max-w-7xl mx-auto px-4 -mt-6 relative z-20">
          <div className="bg-zinc-900 border-l-4 border-[#FF5733] p-6 shadow-2xl ring-1 ring-white/5">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-5 h-5 text-[#FF5733]" />
                  <h2 className="text-sm font-black text-[#FF5733] tracking-widest uppercase">Current Lead Time</h2>
                </div>
                <div className="text-4xl font-black text-white tracking-tighter uppercase italic">
                  {leadTime}
                </div>
              </div>
              <div className="text-zinc-500 text-sm font-black uppercase italic tracking-widest bg-zinc-950 px-4 py-2 border border-zinc-800">
                {isOpen ? "Shop is Active" : "No Walk-ins Today"}
              </div>
            </div>
          </div>
        </section>

        {/* SERVICE MENU */}
        <section className="max-w-7xl mx-auto px-4 py-20">
          <div className="flex items-end gap-4 mb-12 border-b-2 border-zinc-800 pb-4">
            <h2 className="text-5xl font-black text-zinc-800 leading-none">01</h2>
            <h3 className="text-3xl font-black text-white leading-none mb-1 uppercase italic">Services</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="group bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800 hover:border-[#FF5733] p-6 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <Icon className="w-8 h-8 text-zinc-600 group-hover:text-[#FF5733] transition-colors" />
                    <span className="text-xl font-black text-[#FF5733] italic">{service.price}</span>
                  </div>
                  <h4 className="text-xl font-black mb-2 uppercase italic tracking-tighter">{service.name}</h4>
                  <p className="text-zinc-500 text-xs font-bold uppercase tracking-wide">{service.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* RECENT BUILDS */}
        <section className="max-w-7xl mx-auto px-4 py-20">
          <div className="flex items-end gap-4 mb-12 border-b-2 border-zinc-800 pb-4">
            <h2 className="text-5xl font-black text-zinc-800 leading-none">02</h2>
            <h3 className="text-3xl font-black text-white leading-none mb-1 uppercase italic">Recent Builds</h3>
          </div>
          
          {isLoadingGallery ? (
            <div className="py-20 text-center">
              <div className="inline-block w-8 h-8 border-4 border-zinc-800 border-t-[#FF5733] rounded-full animate-spin mb-4"></div>
              <p className="text-[10px] font-black uppercase text-zinc-600 tracking-[0.3em]">Loading Gallery...</p>
            </div>
          ) : builds.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4">
              {builds.map((build, i) => (
                <div key={i} className="relative aspect-[4/5] group overflow-hidden bg-zinc-900 border border-zinc-800">
                  <img src={build.img} alt={build.title} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 flex items-end p-4 transition-opacity">
                    <span className="text-white font-black uppercase text-xs">{build.title}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center border-2 border-dashed border-zinc-900 rounded-2xl">
              <Camera className="w-10 h-10 text-zinc-800 mx-auto mb-4" />
              <p className="text-zinc-600 font-black uppercase text-[10px] tracking-widest">No builds found in Cloudinary</p>
            </div>
          )}
        </section>

        <div className="h-32"></div>
      </main>

      {/* FOOTER */}
      <footer className="flex-none bg-zinc-950 border-t-2 border-[#FF5733] z-50 shadow-2xl pb-[env(safe-area-inset-bottom)]">
        <div className="grid grid-cols-3 divide-x divide-zinc-900">
          <a href="tel:+15551234567" className="flex flex-col items-center justify-center py-6 bg-zinc-900 hover:bg-zinc-800 group transition-colors">
            <Phone className="w-7 h-7 mb-1 text-zinc-500 group-hover:text-white" />
            <span className="text-[10px] font-black tracking-widest text-zinc-500 uppercase">CALL</span>
          </a>
          <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center py-6 bg-zinc-900 hover:bg-zinc-800 group transition-colors">
            <MapPin className="w-7 h-7 mb-1 text-zinc-500 group-hover:text-white" />
            <span className="text-[10px] font-black tracking-widest text-zinc-500 uppercase">MAPS</span>
          </a>
          <button className="flex flex-col items-center justify-center py-6 bg-[#FF5733] hover:bg-[#E64A2A] text-white">
            <Calendar className="w-7 h-7 mb-1" />
            <span className="text-[10px] font-black tracking-widest uppercase">BOOK</span>
          </button>
        </div>
      </footer>
    </div>
  )
}