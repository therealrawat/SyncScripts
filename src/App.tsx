import { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import AuthPage from './components/AuthPage';
import PricingPage from './components/PricingPage';
import { COLORS } from './theme';
import logoIcon from './assets/logo.svg';

// --- STYLES & GLOBALS ---

const style = {
  root: { fontFamily: "'DM Mono', monospace", background: COLORS.bg, minHeight: "100vh", color: COLORS.text }
};

const TYPE_BADGE: Record<string, string> = {
  Bug: "badge-teal", Feature: "badge-green", DevOps: "badge-indigo", QA: "badge-indigo",
};

const PRIORITY_STYLES: Record<string, any> = {
  critical: { color: "#FF5A7A", bg: "rgba(255,90,122,0.08)", border: "rgba(255,90,122,0.2)" },
  high: { color: "#FFB547", bg: "rgba(255,181,71,0.08)", border: "rgba(255,181,71,0.2)" },
  medium: { color: COLORS.accent, bg: COLORS.accentGlow, border: "rgba(0,200,255,0.2)" },
};

const GoogleFonts = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@700;800&display=swap');
    
    * { box-sizing: border-box; margin: 0; padding: 0; }
    
    :root {
      --bg: ${COLORS.bg};
      --surface: ${COLORS.surface};
      --border: ${COLORS.border};
      --accent: ${COLORS.accent};
      --green: ${COLORS.green};
      --indigo: ${COLORS.indigo};
      --text: ${COLORS.text};
      --muted: ${COLORS.textMuted};
    }
    
    body { background: var(--bg); }
    
    .pulse-dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: var(--green);
      animation: pulse 2s ease-in-out infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.8); }
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
      background: linear-gradient(135deg, #00C8FF, #7C6EFA); border: none; color: #fff;
      font-family: 'DM Mono', monospace; font-size: 13px; font-weight: 500;
      letter-spacing: 0.08em; text-transform: uppercase; padding: 14px 32px;
      border-radius: 6px; cursor: pointer; transition: all 0.2s ease;
      position: relative; overflow: hidden;
    }
    .generate-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 32px rgba(0,200,255,0.3); }
    .generate-btn:active { transform: translateY(0); }
    .generate-btn.loading {
      background: linear-gradient(90deg, #00C8FF 0%, #7C6EFA 50%, #00C8FF 100%);
      background-size: 200% 100%; animation: shimmer 1.5s linear infinite;
    }
    .generate-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
    
    .tab-btn {
      background: none; border: none; cursor: pointer; font-family: 'DM Mono', monospace;
      font-size: 11px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase;
      padding: 8px 16px; border-radius: 4px; transition: all 0.15s ease;
    }
    .tab-btn.active { background: rgba(0,200,255,0.1); color: ${COLORS.accent}; }
    .tab-btn.inactive { color: ${COLORS.textMuted}; }
    .tab-btn.inactive:hover { color: ${COLORS.text}; background: rgba(255,255,255,0.04); }
    
    .result-card {
      background: ${COLORS.surface}; border: 1px solid ${COLORS.border};
      border-radius: 8px; padding: 20px; margin-bottom: 12px; transition: border-color 0.2s ease;
    }
    .result-card:hover { border-color: ${COLORS.borderLight}; }
    
    .badge {
      display: inline-flex; align-items: center; gap: 6px; font-size: 10px; font-weight: 500;
      letter-spacing: 0.12em; text-transform: uppercase; padding: 4px 10px; border-radius: 4px;
    }
    .badge-teal { background: rgba(0,200,255,0.1); color: ${COLORS.accent}; border: 1px solid rgba(0,200,255,0.2); }
    .badge-green { background: rgba(0,229,160,0.1); color: ${COLORS.green}; border: 1px solid rgba(0,229,160,0.2); }
    .badge-indigo { background: rgba(124,110,250,0.1); color: ${COLORS.indigo}; border: 1px solid rgba(124,110,250,0.2); }
    
    .copy-btn {
      background: rgba(255,255,255,0.04); border: 1px solid ${COLORS.border}; color: ${COLORS.textMuted};
      font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase;
      padding: 5px 12px; border-radius: 4px; cursor: pointer; transition: all 0.15s ease;
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
    .action-check.checked { background: ${COLORS.green}; border-color: ${COLORS.green}; }
    
    .nav-link {
      font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: ${COLORS.textMuted};
      cursor: pointer; transition: color 0.15s ease; text-decoration: none;
    }
    .nav-link:hover { color: ${COLORS.text}; }
    
    .grid-bg {
      background-image: linear-gradient(rgba(26,40,64,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(26,40,64,0.6) 1px, transparent 1px);
      background-size: 40px 40px;
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
  `}</style>
);

interface MockResult {
  summary: string;
  actions: { id: number; text: string; owner: string; priority: string }[];
  tasks: { id: number; title: string; type: string; estimate: string; assignee: string }[];
}

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

  // User hits tracking logic
  const [currentView, setCurrentView] = useState<'app' | 'auth' | 'pricing'>('app');
  const [hits, setHits] = useState<number>(0);

  useEffect(() => {
    const storedHits = localStorage.getItem('syncScriptsHits');
    if (storedHits) {
      setHits(parseInt(storedHits, 10));
    }
  }, []);

  useEffect(() => { setCharCount(transcript.length); }, [transcript]);

  const handleGenerate = async () => {
    if (hits >= 2) {
      setCurrentView('auth');
      return;
    }

    if (!transcript.trim()) return;
    setLoading(true);

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
        const newHits = hits + 1;
        setHits(newHits);
        localStorage.setItem('syncScriptsHits', newHits.toString());
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
  
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleCheck = (id: number) => setChecked(p => ({ ...p, [id]: !p[id] }));

  if (currentView === 'auth') {
    return <AuthPage />;
  }
  
  if (currentView === 'pricing') {
    return <PricingPage onNavigate={setCurrentView} />;
  }

  return (
    <>
      <GoogleFonts />
      <div style={style.root} className="grid-bg">
        <div className="noise" />
        <div className="glow-orb" style={{ width: 600, height: 600, top: -200, left: -100, background: "rgba(0,200,255,0.03)" }} />
        <div className="glow-orb" style={{ width: 400, height: 400, bottom: 0, right: -100, background: "rgba(124,110,250,0.03)" }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <nav className="nav-container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 40px", borderBottom: `1px solid ${COLORS.border}`, backdropFilter: "blur(12px)", background: "rgba(8,12,24,0.8)", position: "sticky", top: 0, zIndex: 100 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <img src={logoIcon} alt="SyncScript Logo" style={{ width: 32, height: 32 }} />
              <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 17, fontWeight: 700 }}>SyncScript</span>
              <span style={{ fontSize: 9, letterSpacing: "0.2em", fontWeight: 500, padding: "3px 8px", borderRadius: 3, background: "rgba(0,200,255,0.08)", color: COLORS.accent, border: `1px solid rgba(0,200,255,0.15)`, textTransform: "uppercase" }}>Beta</span>
            </div>
            <div className="nav-actions" style={{ display: "flex", alignItems: "center", gap: 32 }}>
              <div className="nav-desktop-links" style={{ display: "flex", gap: 32 }}>
                <a className="nav-link">How it works</a>
                <a className="nav-link">Docs</a>
              </div>
              <a className="nav-link" onClick={() => setCurrentView('pricing')} style={{ cursor: "pointer" }}>Pricing</a>
              <button className="generate-btn" style={{ padding: "8px 20px", fontSize: 11 }} onClick={() => setCurrentView('auth')}>Sign in</button>
            </div>
          </nav>

          {/* HERO */}
          <div className="hero-container" style={{ textAlign: "center", padding: "72px 40px 48px", maxWidth: 760, margin: "0 auto" }}>
            <div className="fade-up" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 24 }}>
              <div className="pulse-dot" />
              <span style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: COLORS.green }}>AI-Powered Meeting Intelligence</span>
            </div>
            <h1 className="fade-up-1 hero-title" style={{ fontFamily: "'Syne', sans-serif", fontSize: 54, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 20, background: "linear-gradient(135deg, #E8EEF8 30%, #5A7090 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Turn meetings into<br />
              <span style={{ background: "linear-gradient(135deg, #00C8FF, #7C6EFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>actionable work.</span>
            </h1>
            <p className="fade-up-2 hero-text" style={{ fontSize: 16, lineHeight: 1.7, color: COLORS.textMuted, maxWidth: 520, margin: "0 auto 40px", fontFamily: "'DM Mono', monospace" }}>
              Paste any conversation transcript. Get executive summaries, action items, and structured technical tasks — instantly.
            </p>
            <div className="fade-up-3" style={{ display: "flex", justifyContent: "center", gap: 24 }}>
              {[ { icon: "⚡", label: "Instant output" }, { icon: "🎯", label: "JIRA-ready tasks" }, { icon: "🔒", label: "No data stored" } ].map(f => (
                <div key={f.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 14 }}>{f.icon}</span><span style={{ fontSize: 11, letterSpacing: "0.08em", color: COLORS.textMuted, textTransform: "uppercase" }}>{f.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* APP */}
          <div className="app-container" style={{ maxWidth: 900, margin: "0 auto 80px", padding: "0 40px" }}>
            <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 12, overflow: "hidden" }}>
              <div className="tab-controls" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", borderBottom: `1px solid ${COLORS.border}`, background: "rgba(0,0,0,0.2)" }}>
                <div style={{ display: "flex", gap: 4 }}>
                  <button className={`tab-btn ${tab === "input" ? "active" : "inactive"}`} onClick={() => setTab("input")}>Input</button>
                  <button className={`tab-btn ${tab === "result" && result ? "active" : "inactive"}`} onClick={() => result && setTab("result")} style={{ opacity: result ? 1 : 0.4 }}>
                    Output {result && <span style={{ marginLeft: 6, width: 6, height: 6, borderRadius: "50%", background: COLORS.green, display: "inline-block" }} />}
                  </button>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  {tab === "input" && (
                    <span style={{ fontSize: 10, color: COLORS.textDim, letterSpacing: "0.08em", textTransform: "uppercase" }}>{charCount.toLocaleString()} chars</span>
                  )}
                </div>
              </div>

              {/* Input panel */}
              {tab === "input" && (
                <div style={{ padding: 24 }}>
                  <textarea value={transcript} onChange={e => setTranscript(e.target.value)} placeholder={`Paste your meeting transcript here...\n\nSupported formats:\n- Zoom transcripts\n- Google Meet notes\n- Raw chat logs`} className="scrollbar-thin" style={{ width: "100%", height: 320, background: "rgba(0,0,0,0.3)", border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 20, color: COLORS.text, fontSize: 13, lineHeight: 1.8, fontFamily: "'DM Mono', monospace", resize: "vertical", transition: "border-color 0.2s" }} onFocus={e => e.target.style.borderColor = COLORS.accentDim} onBlur={e => e.target.style.borderColor = COLORS.border} />
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 24 }}>
                    <div className="hide-on-mobile" style={{ display: "flex", gap: 8 }}>
                      {["Executive Summary", "Action Items", "Tech Tasks"].map(tag => (
                        <span key={tag} className="badge badge-teal" style={{ opacity: 0.7 }}>{tag}</span>
                      ))}
                    </div>
                    <button className={`generate-btn ${loading ? "loading" : ""}`} onClick={handleGenerate} disabled={!transcript.trim() || loading}>
                      {loading ? "Processing..." : "Generate →"}
                    </button>
                  </div>
                </div>
              )}

              {/* Result panel */}
              {tab === "result" && result && (
                <div style={{ padding: 24 }} className="fade-up">
                  <div style={{ display: "flex", gap: 4, marginBottom: 24 }}>
                    {[
                      { key: "summary", label: "Summary", badge: "badge-teal" },
                      { key: "actions", label: `Actions (${result.actions.length})`, badge: "badge-green" },
                      { key: "tasks", label: `Tasks (${result.tasks.length})`, badge: "badge-indigo" }
                    ].map(t => (
                      <button key={t.key} className={`tab-btn ${resultTab === t.key ? "active" : "inactive"}`} onClick={() => setResultTab(t.key)}>{t.label}</button>
                    ))}
                    <div style={{ flex: 1 }} />
                    <button className="copy-btn" onClick={() => handleCopy(JSON.stringify(result, null, 2))}>
                      {copied ? "✓ Copied" : "Export JSON"}
                    </button>
                  </div>

                  {/* Summary */}
                  {resultTab === "summary" && (
                    <div className="fade-up">
                      <div className="result-card">
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                          <span className="badge badge-teal">Executive Summary</span>
                          <button className="copy-btn" onClick={() => handleCopy(result.summary)}>Copy text</button>
                        </div>
                        <p style={{ fontSize: 14, lineHeight: 1.8, color: COLORS.text, fontFamily: "'DM Mono', monospace" }}>{result.summary}</p>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
                        <div className="result-card">
                          <div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: COLORS.textMuted, marginBottom: 8 }}>Actionable Items</div>
                          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 700, color: COLORS.green }}>{result.actions.length}</div>
                        </div>
                        <div className="result-card">
                          <div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: COLORS.textMuted, marginBottom: 8 }}>Engineering Tasks</div>
                          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 700, color: COLORS.indigo }}>{result.tasks.length}</div>
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
                          <span style={{ fontSize: 11, color: COLORS.accent, background: COLORS.accentGlow, border: `1px solid rgba(0,200,255,0.15)`, padding: "3px 10px", borderRadius: 4 }}>{t.estimate}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <footer className="footer-container" style={{ borderTop: `1px solid ${COLORS.border}`, padding: "24px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: COLORS.textMuted }}>SyncScript</span>
            <span style={{ fontSize: 11, color: COLORS.textDim, letterSpacing: "0.08em" }}>© 2026 Priyanshu Rawat</span>
            <div className="nav-desktop-links" style={{ display: "flex", gap: 24 }}>
              <a className="nav-link">Privacy</a>
              <a className="nav-link">Terms</a>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
