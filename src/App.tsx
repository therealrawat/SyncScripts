import { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import AuthPage from './components/AuthPage';
import LandingPage from './components/LandingPage';
import PricingPage from './components/PricingPage';
import { IconArrowRight, IconBolt, IconCheck, IconLock, IconTarget } from './components/ui-icons';
import type { AppView } from './navigation';
import { COLORS } from './theme';
import logoIcon from './assets/logo.svg';
import { supabase } from './supabase';

// --- STYLES & GLOBALS ---

const style = {
  root: { fontFamily: "'Figtree', sans-serif", background: COLORS.bg, minHeight: "100vh", color: COLORS.text }
};

const TYPE_BADGE: Record<string, string> = {
  Bug: "badge-teal", Feature: "badge-green", DevOps: "badge-indigo", QA: "badge-indigo",
};

const PRIORITY_STYLES: Record<string, any> = {
  critical: { color: "#FF5A7A", bg: "rgba(255,90,122,0.08)", border: "rgba(255,90,122,0.2)" },
  high: { color: "#FFB547", bg: "rgba(255,181,71,0.08)", border: "rgba(255,181,71,0.2)" },
  medium: { color: COLORS.accentDim, bg: COLORS.accentGlow, border: "rgba(255,255,255,0.2)" },
};

const GoogleFonts = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600;700;800;900&display=swap');
    
    * { box-sizing: border-box; margin: 0; padding: 0; }
    
    :root {
      --bg: ${COLORS.bg};
      --surface: ${COLORS.surface};
      --surface2: ${COLORS.surface2};
      --border: ${COLORS.border};
      --accent: ${COLORS.accent};
      --green: ${COLORS.green};
      --indigo: ${COLORS.indigo};
      --text: ${COLORS.text};
      --muted: ${COLORS.textMuted};
    }
    
    body { background: var(--bg); }
    
    .pulse-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: var(--text);
      animation: pulse 2s ease-in-out infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }
    
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    
    .fade-up { animation: fadeUp 0.5s ease forwards; }
    .fade-up-1 { animation: fadeUp 0.5s ease 0.1s both; }
    .fade-up-2 { animation: fadeUp 0.5s ease 0.2s both; }
    .fade-up-3 { animation: fadeUp 0.5s ease 0.3s both; }
    
    textarea:focus, button:focus { outline: none; }
    
    .generate-btn {
      background: var(--accent); border: none; color: ${COLORS.onAccent};
      font-family: 'Figtree', sans-serif; font-size: 14px; font-weight: 500;
      letter-spacing: -0.01em; padding: 10px 20px;
      border-radius: 7px; cursor: pointer; transition: opacity 0.15s, transform 0.15s;
      position: relative; overflow: hidden;
    }
    .generate-btn:hover { opacity: 0.92; transform: translateY(-1px); box-shadow: 0 8px 28px rgba(255, 255, 255, 0.12); }
    .generate-btn:active { transform: translateY(0); }
    .generate-btn.loading {
      background: linear-gradient(90deg, #fafafa 0%, #d4d4d8 50%, #fafafa 100%);
      background-size: 200% 100%; animation: shimmer 1.5s linear infinite;
      color: ${COLORS.onAccent};
    }
    .generate-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }
    
    .tab-btn {
      background: none; border: none; cursor: pointer; font-family: 'Figtree', sans-serif;
      font-size: 13px; font-weight: 500;
      padding: 8px 14px; border-radius: 6px; transition: all 0.15s ease;
      color: ${COLORS.textMuted};
    }
    .tab-btn.active { background: rgba(255, 255, 255, 0.1); color: ${COLORS.text}; }
    .tab-btn.inactive { color: ${COLORS.textMuted}; }
    .tab-btn.inactive:hover { color: ${COLORS.text}; background: rgba(255,255,255,0.05); }
    
    .result-card {
      background: ${COLORS.surface}; border: 1px solid ${COLORS.border};
      border-radius: 8px; padding: 20px; margin-bottom: 12px; transition: border-color 0.2s ease;
    }
    .result-card:hover { border-color: ${COLORS.borderLight}; }
    
    .badge {
      display: inline-flex; align-items: center; gap: 6px; font-size: 10px; font-weight: 600;
      letter-spacing: 0.08em; text-transform: uppercase; padding: 4px 10px; border-radius: 5px;
    }
    .badge-teal { background: ${COLORS.accentGlow}; color: ${COLORS.accentDim}; border: 1px solid rgba(255, 255, 255, 0.15); }
    .badge-green { background: rgba(255, 255, 255, 0.06); color: ${COLORS.textMuted}; border: 1px solid rgba(255, 255, 255, 0.12); }
    .badge-indigo { background: rgba(255, 255, 255, 0.06); color: ${COLORS.indigo}; border: 1px solid rgba(255, 255, 255, 0.12); }
    
    .copy-btn {
      background: rgba(255,255,255,0.04); border: 1px solid ${COLORS.border}; color: ${COLORS.textMuted};
      font-family: 'Figtree', sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase;
      padding: 6px 12px; border-radius: 6px; cursor: pointer; transition: all 0.15s ease;
    }
    .copy-btn:hover { background: rgba(255,255,255,0.08); color: ${COLORS.text}; border-color: ${COLORS.borderLight}; }
    
    .action-item {
      display: flex; align-items: flex-start; gap: 12px; padding: 10px 0; border-bottom: 1px solid ${COLORS.border};
    }
    .action-item:last-child { border-bottom: none; }
    
    .action-check {
      width: 16px; height: 16px; border: 1px solid ${COLORS.borderLight}; border-radius: 3px;
      flex-shrink: 0; margin-top: 2px; cursor: pointer; transition: all 0.15s ease;
      display: flex; align-items: center; justify-content: center;
    }
    .action-check.checked { background: ${COLORS.text}; border-color: ${COLORS.text}; color: ${COLORS.onAccent}; }
    
    .nav-link {
      font-size: 14px; color: ${COLORS.textMuted};
      cursor: pointer; transition: color 0.15s, background 0.15s; text-decoration: none;
      padding: 6px 12px; border-radius: 6px;
    }
    .nav-link:hover { color: ${COLORS.text}; background: rgba(255,255,255,0.05); }
    
    .grid-bg {
      background-image:
        linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
      background-size: 64px 64px;
    }
    
    .noise {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0; pointer-events: none; z-index: 0; opacity: 0.025;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='a'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23a)'/%3E%3C/svg%3E");
    }
    
    .glow-orb {
      position: fixed; border-radius: 50%; filter: blur(120px); pointer-events: none; z-index: 0;
    }
    
    .scrollbar-thin::-webkit-scrollbar { width: 4px; }
    .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
    .scrollbar-thin::-webkit-scrollbar-thumb { background: ${COLORS.border}; border-radius: 4px; }

    @keyframes skeleton-blink {
      0% { opacity: 0.1; }
      50% { opacity: 0.25; }
      100% { opacity: 0.1; }
    }
    .skeleton {
      background: var(--text);
      border-radius: 4px;
      animation: skeleton-blink 1.5s ease-in-out infinite;
    }

    /* Mobile Responsiveness */
    @media (max-width: 768px) {
      .nav-desktop-links { display: none !important; }
      .nav-container { padding: 16px 20px !important; }
      .hero-container { padding: 48px 24px 32px !important; }
      .hero-title { font-size: 36px !important; line-height: 1.15 !important; }
      .hero-text { font-size: 14px !important; margin-bottom: 24px !important; }
      .app-container { padding: 0 16px !important; margin-bottom: 40px !important; }
      .tab-controls { flex-direction: column !important; align-items: stretch !important; gap: 12px; }
      .footer-container { flex-direction: column !important; align-items: center !important; gap: 16px; padding: 24px 20px !important; text-align: center; }
      textarea { font-size: 16px !important; } /* Stops iOS zoom */
      .action-item { flex-direction: column }
      .hide-on-mobile { display: none !important; }
      .generate-btn { width: 100% !important; text-align: center; }
      .nav-actions { gap: 16px !important; }
    }

    /* Modal Styles */
    @keyframes modalFadeIn {
      from { opacity: 0; transform: scale(0.95) translateY(10px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
    .modal-overlay {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(9, 9, 11, 0.9); backdrop-filter: blur(8px);
      display: flex; align-items: center; justify-content: center;
      z-index: 1000; padding: 24px;
    }
    .modal-card {
      background: #18181b; border: 1px solid rgba(255,255,255,0.1);
      width: 100%; max-width: 440px; border-radius: 24px;
      padding: 48px 32px; text-align: center;
      animation: modalFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.5);
    }
    .google-btn-modal {
      background: white; border: none; color: black;
      width: 100%; font-family: 'Figtree', sans-serif;
      font-size: 16px; font-weight: 600; padding: 14px 24px;
      border-radius: 40px; cursor: pointer; transition: all 0.2s;
      display: flex; align-items: center; justify-content: center; gap: 12px;
      margin: 32px 0 20px;
    }
    .google-btn-modal:hover { background: #f4f4f5; transform: scale(1.02); }
    .google-btn-modal:active { transform: scale(0.98); }
    .maybe-later {
      background: none; border: none; font-size: 11px;
      font-weight: 700; color: rgba(255,255,255,0.3);
      letter-spacing: 0.15em; cursor: pointer; transition: color 0.2s;
    }
    .maybe-later:hover { color: rgba(255,255,255,0.6); }
  `}</style>
);

interface MockResult {
  summary: string;
  actions: { id: number; text: string; owner: string; priority: string }[];
  tasks: { id: number; title: string; type: string; estimate: string; assignee: string }[];
}

// --- SKELETON LOADER ---
const SkeletonView = ({ type }: { type: string }) => {
  if (type === "summary") {
    return (
      <div className="fade-up">
        <div className="result-card">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div className="skeleton" style={{ width: 120, height: 20 }} />
            <div className="skeleton" style={{ width: 80, height: 24 }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div className="skeleton" style={{ width: "100%", height: 14 }} />
            <div className="skeleton" style={{ width: "95%", height: 14 }} />
            <div className="skeleton" style={{ width: "98%", height: 14 }} />
            <div className="skeleton" style={{ width: "60%", height: 14 }} />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
          <div className="result-card">
            <div className="skeleton" style={{ width: 100, height: 10, marginBottom: 12 }} />
            <div className="skeleton" style={{ width: 40, height: 32 }} />
          </div>
          <div className="result-card">
            <div className="skeleton" style={{ width: 100, height: 10, marginBottom: 12 }} />
            <div className="skeleton" style={{ width: 40, height: 32 }} />
          </div>
        </div>
      </div>
    );
  }
  
  if (type === "actions") {
    return (
      <div className="fade-up result-card" style={{ padding: "0 20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${COLORS.border}`, padding: "20px 0" }}>
          <div className="skeleton" style={{ width: 100, height: 20 }} />
          <div className="skeleton" style={{ width: 80, height: 12 }} />
        </div>
        <div style={{ padding: "10px 0" }}>
          {[1, 2, 3].map(i => (
            <div key={i} className="action-item">
              <div className="skeleton" style={{ width: 16, height: 16, borderRadius: 3, marginTop: 2 }} />
              <div style={{ flex: 1 }}>
                <div className="skeleton" style={{ width: "85%", height: 13, marginBottom: 10 }} />
                <div style={{ display: "flex", gap: 8 }}>
                  <div className="skeleton" style={{ width: 50, height: 10 }} />
                  <div className="skeleton" style={{ width: 60, height: 14 }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="fade-up">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="result-card" style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div className="skeleton" style={{ width: 60, height: 20 }} />
          <div className="skeleton" style={{ flex: 1, height: 14 }} />
          <div className="skeleton" style={{ width: 50, height: 12 }} />
          <div className="skeleton" style={{ width: 40, height: 20 }} />
        </div>
      ))}
    </div>
  );
};

// --- COMPONENTS ---
const SignInModal = ({ onSignIn, onClose }: { onSignIn: () => void, onClose: () => void }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-card" onClick={e => e.stopPropagation()}>
      <img src={logoIcon} alt="" style={{ width: 64, height: 64, marginBottom: 32 }} />
      <h2 style={{ fontSize: 26, fontWeight: 800, color: "white", marginBottom: 12, letterSpacing: "-0.5px" }}>You've used your free meetings</h2>
      <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
        Sign in with Google to continue summarizing.<br />It's free, takes 2 seconds.
      </p>
      <button className="google-btn-modal" onClick={onSignIn}>
        <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        Sign in with Google
      </button>
      <button className="maybe-later" onClick={onClose}>MAYBE LATER</button>
    </div>
  </div>
);

// --- MAIN APP COMPONENT ---
export default function App() {
  const [tab, setTab] = useState("input");
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MockResult | null>(null);
  const [resultTab, setResultTab] = useState("summary");
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [copied, setCopied] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [showSignInModal, setShowSignInModal] = useState(false);

  // User hits tracking logic
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [hits, setHits] = useState<number>(0);
  const [user, setUser] = useState<any>(null);
  const [userPlan, setUserPlan] = useState<string>('free');
  const [userUsage, setUserUsage] = useState<number>(0);

  const fetchUserLimits = async (userId: string) => {
    const [subRes, usageRes] = await Promise.all([
      supabase.from('subscriptions').select('plan').eq('user_id', userId).single(),
      supabase.from('usage').select('generations_count').eq('user_id', userId).single()
    ]);
    if (subRes.data) setUserPlan(subRes.data.plan);
    if (usageRes.data) setUserUsage(usageRes.data.generations_count);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }: any) => {
      setUser(session?.user || null);
      if (session?.user) fetchUserLimits(session.user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      setUser(session?.user || null);
      if (session?.user) fetchUserLimits(session.user.id);
      else {
        setUserPlan('free');
        setUserUsage(0);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const storedHits = localStorage.getItem('syncScriptsHits');
    if (storedHits) {
      setHits(parseInt(storedHits, 10));
    }
  }, []);

  useEffect(() => { setCharCount(transcript.length); }, [transcript]);

  const handleGenerate = async () => {
    if (!user && hits >= 2) {
      setShowSignInModal(true);
      return;
    }
    
    // Strict Database Checking for Authenticated Users
    if (user && userPlan === 'free' && userUsage >= 3) {
      setCurrentView('pricing');
      return;
    }

    if (!transcript.trim()) return;
    setLoading(true);
    setTab("result");
    setResultTab("summary");

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) throw new Error("Missing VITE_GEMINI_API_KEY in .env");
      
      const ai = new GoogleGenAI({ apiKey });
      const systemPrompt = `You are a Senior Product Manager processing transcripts. Return ONLY a raw JSON object string with no markdown backticks, representing actionable metrics.
      
### SCHEMA:
{
  "summary": "High-level goal and decisions (max 60 words).",
  "actions": [
    { "id": 1, "text": "Immediate next step.", "owner": "Name or N/A", "priority": "high|medium|critical" }
  ],
  "tasks": [
    { "id": 1, "title": "Implementation task", "type": "Bug|Feature|DevOps|QA", "estimate": "1d/2h", "assignee": "Name" }
  ]
}`;

      const prompt = `${systemPrompt}\n\nRaw Notes:\n${transcript}`;
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });
      
      let jsonText = (response.text || '').trim();
      if (jsonText.startsWith('```json')) jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      else if (jsonText.startsWith('```')) jsonText = jsonText.replace(/```\n?/g, '');
      
      const processedData = JSON.parse(jsonText);
      if (processedData.summary && Array.isArray(processedData.actions) && Array.isArray(processedData.tasks)) {
        setResult(processedData as MockResult);
        
        if (user) {
          const newUsage = userUsage + 1;
          setUserUsage(newUsage);
          await supabase.from('usage').update({ generations_count: newUsage }).eq('user_id', user.id);
        } else {
          const newHits = hits + 1;
          setHits(newHits);
          localStorage.setItem('syncScriptsHits', newHits.toString());
        }
        
        setTab("result");
        setResultTab("summary");
      } else {
        throw new Error("Invalid schema returned.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to process with live API. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });
    if (error) alert(error.message);
  };
  
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleCheck = (id: number) => setChecked(p => ({ ...p, [id]: !p[id] }));

  if (currentView === 'auth') {
    return <AuthPage onNavigate={setCurrentView} />;
  }

  if (currentView === 'pricing') {
    return <PricingPage onNavigate={setCurrentView} />;
  }

  if (currentView === 'landing') {
    return <LandingPage onNavigate={setCurrentView} onSignIn={handleGoogleSignIn} />;
  }

  return (
    <>
      <GoogleFonts />
      <div style={style.root} className="grid-bg">
        <div className="noise" />
        <div className="glow-orb" style={{ width: 600, height: 600, top: -200, left: "50%", transform: "translateX(-50%)", background: "rgba(255, 255, 255, 0.06)" }} />
        <div className="glow-orb" style={{ width: 320, height: 320, bottom: 80, right: "8%", background: "rgba(255, 255, 255, 0.04)" }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <nav className="nav-container" style={{ borderBottom: `1px solid ${COLORS.borderSoft}`, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", background: "rgba(9, 9, 11, 0.80)", position: "sticky", top: 0, zIndex: 100 }}>
            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setCurrentView('landing')} role="presentation">
                <img src={logoIcon} alt="SyncScript Logo" style={{ width: 28, height: 28 }} />
                <span style={{ fontFamily: "'Figtree', sans-serif", fontSize: 17, fontWeight: 700, letterSpacing: "-0.3px" }}>SyncScript</span>
                <span style={{ fontSize: 10, fontWeight: 600, padding: "4px 8px", borderRadius: 6, background: COLORS.accentGlow, color: COLORS.accentDim, border: "1px solid rgba(255,255,255,0.15)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Beta</span>
              </div>
              <div className="nav-actions" style={{ display: "flex", alignItems: "center", gap: 24 }}>
                <div className="nav-desktop-links" style={{ display: "flex", gap: 4 }}>
                  <a className="nav-link" onClick={() => setCurrentView('landing')} style={{ cursor: "pointer" }}>How it works</a>
                  <a className="nav-link" onClick={() => setCurrentView('landing')} style={{ cursor: "pointer" }}>Docs</a>
                </div>

                {user ? (
                  <button className="generate-btn" style={{ padding: "7px 16px", fontSize: 14 }} onClick={() => supabase.auth.signOut()}>Sign out</button>
                ) : (
                  <button className="generate-btn" style={{ padding: "7px 16px", fontSize: 14 }} onClick={handleGoogleSignIn}>Sign in</button>
                )}
              </div>
            </div>
          </nav>

          {/* HERO */}
          <div className="hero-container" style={{ textAlign: "center", padding: "120px 24px 48px", maxWidth: 780, margin: "0 auto" }}>

            <h1 className="fade-up-1 hero-title" style={{ fontFamily: "'Figtree', sans-serif", fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 800, letterSpacing: "-3px", lineHeight: 1.0, marginBottom: 20, color: "#ffffff" }}>
              Turn meetings into<br />
              <span style={{ color: "#ffffff" }}>actionable work.</span>
            </h1>
            <p className="fade-up-2 hero-text" style={{ fontSize: 17, lineHeight: 1.65, color: COLORS.textMuted, maxWidth: 480, margin: "0 auto 36px" }}>
              Paste any conversation transcript. Get executive summaries, action items, and structured technical tasks - in seconds.
            </p>
            <div className="fade-up-3" style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
              {[
                { Icon: IconBolt, label: "Instant output" },
                { Icon: IconTarget, label: "JIRA-ready tasks" },
                { Icon: IconLock, label: "No data stored" },
              ].map(({ Icon, label }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ display: "flex", color: COLORS.textMuted }} aria-hidden>
                    <Icon size={18} />
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: COLORS.textMuted }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* APP */}
          <div className="app-container" style={{ maxWidth: 900, margin: "0 auto 80px", padding: "0 24px" }}>
            <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 12, overflow: "hidden" }}>
              <div className="tab-controls" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderBottom: `1px solid ${COLORS.border}`, background: COLORS.surface2 }}>
                <div style={{ display: "flex", gap: 4 }}>
                  <button className={`tab-btn ${tab === "input" ? "active" : "inactive"}`} onClick={() => setTab("input")}>Input</button>
                  <button className={`tab-btn ${tab === "result" && result ? "active" : "inactive"}`} onClick={() => result && setTab("result")} style={{ opacity: result ? 1 : 0.4 }}>
                    Output {result && <span style={{ marginLeft: 6, width: 6, height: 6, borderRadius: "50%", background: COLORS.textMuted, display: "inline-block" }} />}
                  </button>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  {tab === "input" && (
                    <span style={{ fontSize: 12, color: COLORS.textDim, fontWeight: 500 }}>{charCount.toLocaleString()} chars</span>
                  )}
                </div>
              </div>

              {/* Input panel */}
              {tab === "input" && (
                <div style={{ padding: 24 }}>
                  <textarea value={transcript} onChange={e => setTranscript(e.target.value)} placeholder={`Paste your meeting transcript here...\n\nSupported formats:\n- Zoom transcripts\n- Google Meet notes\n- Raw chat logs`} className="scrollbar-thin" style={{ width: "100%", height: 320, background: COLORS.bg, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 20, color: COLORS.text, fontSize: 14, lineHeight: 1.7, fontFamily: "'Figtree', sans-serif", resize: "vertical", transition: "border-color 0.15s" }} onFocus={e => e.target.style.borderColor = COLORS.accent} onBlur={e => e.target.style.borderColor = COLORS.border} />
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 24 }}>
                    <div className="hide-on-mobile" style={{ display: "flex", gap: 8 }}>
                      {["Executive Summary", "Action Items", "Tech Tasks"].map(tag => (
                        <span key={tag} className="badge badge-teal" style={{ opacity: 0.7 }}>{tag}</span>
                      ))}
                    </div>
                    <button className={`generate-btn ${loading ? "loading" : ""}`} onClick={handleGenerate} disabled={!transcript.trim() || loading} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                      {loading ? "Processing..." : (
                        <>
                          Generate
                          <IconArrowRight size={16} aria-hidden />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Result panel */}
              {tab === "result" && (result || loading) && (
                <div style={{ padding: 24 }} className="fade-up">
                  <div style={{ display: "flex", gap: 4, marginBottom: 24 }}>
                    {[
                      { key: "summary", label: "Summary", badge: "badge-teal" },
                      { key: "actions", label: `Actions (${result?.actions.length || 0})`, badge: "badge-green" },
                      { key: "tasks", label: `Tasks (${result?.tasks.length || 0})`, badge: "badge-indigo" }
                    ].map(t => (
                      <button key={t.key} className={`tab-btn ${resultTab === t.key ? "active" : "inactive"}`} onClick={() => result && setResultTab(t.key)} disabled={loading} style={{ opacity: loading && t.key !== resultTab ? 0.5 : 1 }}>{t.label}</button>
                    ))}
                    <div style={{ flex: 1 }} />
                    <button className="copy-btn" onClick={() => handleCopy(JSON.stringify(result, null, 2))} disabled={loading} style={{ display: "inline-flex", alignItems: "center", gap: 6, opacity: loading ? 0.5 : 1 }}>
                      {copied ? (
                        <>
                          <IconCheck size={12} aria-hidden />
                          Copied
                        </>
                      ) : (
                        "Export JSON"
                      )}
                    </button>
                  </div>

                  {loading ? (
                    <SkeletonView type={resultTab} />
                  ) : result && (
                    <>
                      {/* Summary */}
                      {resultTab === "summary" && (
                        <div className="fade-up">
                          <div className="result-card">
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                              <span className="badge badge-teal">Executive Summary</span>
                              <button className="copy-btn" onClick={() => handleCopy(result.summary)}>Copy text</button>
                            </div>
                            <p style={{ fontSize: 14, lineHeight: 1.75, color: COLORS.text }}>{result.summary}</p>
                          </div>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
                            <div className="result-card">
                              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: COLORS.textDim, marginBottom: 8 }}>Actionable Items</div>
                              <div style={{ fontFamily: "'Figtree', sans-serif", fontSize: 32, fontWeight: 800, letterSpacing: "-1px", color: COLORS.text }}>{result.actions.length}</div>
                            </div>
                            <div className="result-card">
                              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: COLORS.textDim, marginBottom: 8 }}>Engineering Tasks</div>
                              <div style={{ fontFamily: "'Figtree', sans-serif", fontSize: 32, fontWeight: 800, letterSpacing: "-1px", color: COLORS.accentDim }}>{result.tasks.length}</div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      {resultTab === "actions" && (
                        <div className="fade-up result-card" style={{ padding: "0 20px" }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${COLORS.border}`, padding: "20px 0" }}>
                            <span className="badge badge-green">Action Items</span>
                            <span style={{ fontSize: 10, color: COLORS.textMuted, letterSpacing: "0.08em" }}>{Object.values(checked).filter(Boolean).length}/{result.actions.length} Completed</span>
                          </div>
                          <div style={{ padding: "10px 0" }}>
                            {result.actions.map(a => {
                              const p = PRIORITY_STYLES[a.priority] || PRIORITY_STYLES.medium;
                              return (
                                <div key={a.id} className="action-item">
                                  <div className={`action-check ${checked[a.id] ? "checked" : ""}`} onClick={() => toggleCheck(a.id)}>
                                    {checked[a.id] && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l2.5 2.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                                  </div>
                                  <div style={{ flex: 1 }}>
                                    <p style={{ fontSize: 13, lineHeight: 1.6, color: checked[a.id] ? COLORS.textDim : COLORS.text, textDecoration: checked[a.id] ? "line-through" : "none", marginBottom: 6 }}>{a.text}</p>
                                    <div style={{ display: "flex", gap: 8 }}>
                                      <span style={{ fontSize: 10, color: COLORS.textMuted }}>@{a.owner}</span>
                                      <span style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: p.color, background: p.bg, border: `1px solid ${p.border}`, padding: "1px 7px", borderRadius: 3 }}>{a.priority}</span>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Tasks */}
                      {resultTab === "tasks" && (
                        <div className="fade-up">
                          {result.tasks.map(t => (
                            <div key={t.id} className="result-card" style={{ display: "flex", alignItems: "center", gap: 16 }}>
                              <span className={`badge ${TYPE_BADGE[t.type] || "badge-teal"}`}>{t.type}</span>
                              <span style={{ flex: 1, fontSize: 13, color: COLORS.text }}>{t.title}</span>
                              <span style={{ fontSize: 11, color: COLORS.textMuted }}>@{t.assignee}</span>
                              <span style={{ fontSize: 11, color: COLORS.accentDim, background: COLORS.accentGlow, border: "1px solid rgba(255,255,255,0.12)", padding: "3px 10px", borderRadius: 5 }}>{t.estimate}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          <footer className="footer-container" style={{ borderTop: `1px solid ${COLORS.borderSoft}`, padding: "32px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 1100, margin: "0 auto" }}>
            <span style={{ fontFamily: "'Figtree', sans-serif", fontSize: 14, fontWeight: 700, color: COLORS.textMuted }}>SyncScript</span>
            <span style={{ fontSize: 12, color: COLORS.textDim }}>© 2026 Priyanshu Rawat</span>
            <div className="nav-desktop-links" style={{ display: "flex", gap: 24 }}>
              <a className="nav-link">Privacy</a>
              <a className="nav-link">Terms</a>
            </div>
          </footer>
        </div>
      </div>
      {showSignInModal && <SignInModal onSignIn={handleGoogleSignIn} onClose={() => setShowSignInModal(false)} />}
    </>
  );
}
