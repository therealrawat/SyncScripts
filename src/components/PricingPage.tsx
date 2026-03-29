import { COLORS } from '../theme';
import logoIcon from '../assets/logo.svg';

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 mt-1">
    <path d="M20 6L9 17L4 12" stroke={COLORS.green} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function PricingPage({ onNavigate }: { onNavigate: (view: 'app' | 'auth' | 'pricing') => void }) {
  return (
    <div className="min-h-screen text-[#E8EEF8]" style={{ backgroundColor: COLORS.bg, fontFamily: "'DM Mono', monospace" }}>
      {/* Background Effects */}
      <div 
        style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 0, opacity: 0.025,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='a'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23a)'/%3E%3C/svg%3E\")"
        }} 
      />
      <div 
        style={{
          position: "fixed", borderRadius: "50%", filter: "blur(120px)", pointerEvents: "none", zIndex: 0,
          width: 600, height: 600, top: -200, left: -100, background: "rgba(0,200,255,0.03)"
        }} 
      />
      
      {/* Navigation */}
      <nav className="flex items-center justify-between px-5 md:px-10 py-4 md:py-5 sticky top-0 z-[100] backdrop-blur-md bg-[#080c18cc] border-b" style={{ borderColor: COLORS.border }}>
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('app')}>
          <img src={logoIcon} alt="SyncScript Logo" style={{ width: 32, height: 32 }} />
          <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 17, fontWeight: 700 }}>SyncScript</span>
        </div>
        <div className="flex items-center gap-5 md:gap-8">
           <a onClick={() => onNavigate('app')} style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: COLORS.textMuted, cursor: "pointer", textDecoration: "none" }}>App</a>
          <button style={{ background: "none", border: "none", color: COLORS.textMuted, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }} onClick={() => onNavigate('auth')}>Log in</button>
        </div>
      </nav>

      <div className="relative z-10 px-5 md:px-6 py-12 md:py-20 pb-20 max-w-[1000px] mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <h1 className="text-[32px] md:text-[44px] font-[800] mb-4 tracking-[-0.02em] leading-tight" style={{ fontFamily: "'Syne', sans-serif" }}>Predictable pricing, designed to scale</h1>
          <p className="text-[14px] md:text-[15px]" style={{ color: COLORS.textMuted, letterSpacing: "0.02em" }}>Start converting meetings for free, collaborate with your team, then scale.</p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 items-start">
          
          {/* FREE PLAN */}
          <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "40px 32px", display: "flex", flexDirection: "column", height: "100%" }}>
            <h2 style={{ fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700, marginBottom: 8 }}>Free</h2>
            <p style={{ color: COLORS.textMuted, fontSize: 13, lineHeight: 1.6, marginBottom: 24, minHeight: 42 }}>Perfect for personal projects & occasional usages.</p>
            <button style={{ width: "100%", background: "#1D2B3F", color: COLORS.text, border: "none", padding: "12px", borderRadius: 6, fontSize: 13, fontWeight: 500, letterSpacing: "0.05em", cursor: "pointer", marginBottom: 32, transition: "background 0.2s" }} onClick={() => onNavigate('auth')} onMouseEnter={e => e.currentTarget.style.background = "#243552"} onMouseLeave={e => e.currentTarget.style.background = "#1D2B3F"}>
              Start for Free
            </button>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 16 }}>
              <span style={{ fontSize: 42, fontWeight: 700, fontFamily: "'Syne', sans-serif" }}>₹0</span>
              <span style={{ color: COLORS.textMuted, fontSize: 13 }}>/ month</span>
            </div>
            <div style={{ borderTop: `1px solid ${COLORS.border}`, margin: "32px 0 24px" }} />
            <p style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 16 }}>Get started with:</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", gap: 12 }}><CheckIcon /><span style={{ fontSize: 13, color: COLORS.text }}><b>3 summaries</b> / month</span></div>
              <div style={{ display: "flex", gap: 12 }}><CheckIcon /><span style={{ fontSize: 13, color: COLORS.text }}>Basic action items</span></div>
              <div style={{ display: "flex", gap: 12 }}><CheckIcon /><span style={{ fontSize: 13, color: COLORS.text }}>Copy to clipboard</span></div>
            </div>
          </div>

          {/* PRO PLAN */}
          <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.accentDark}`, borderRadius: 12, padding: "40px 32px", display: "flex", flexDirection: "column", height: "100%", position: "relative", transform: "translateY(-12px)", boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)" }}>
            <div style={{ position: "absolute", top: -14, left: "20px", background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.indigo})`, color: "#fff", padding: "4px 12px", borderRadius: 20, fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Most Popular</div>
            <h2 style={{ fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700, marginBottom: 8, color: COLORS.text }}>Pro</h2>
            <p style={{ color: COLORS.textMuted, fontSize: 13, lineHeight: 1.6, marginBottom: 24, minHeight: 42 }}>For professionals seeking unlimited sync features.</p>
            <button style={{ width: "100%", background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.indigo})`, color: "#fff", border: "none", padding: "12px", borderRadius: 6, fontSize: 13, fontWeight: 500, letterSpacing: "0.05em", cursor: "pointer", marginBottom: 32, transition: "opacity 0.2s" }} onClick={() => onNavigate('auth')} onMouseEnter={e => e.currentTarget.style.opacity = "0.9"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
              Upgrade now
            </button>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 16 }}>
              <span style={{ fontSize: 42, fontWeight: 700, fontFamily: "'Syne', sans-serif" }}>₹399</span>
              <span style={{ color: COLORS.textMuted, fontSize: 13 }}>/ month</span>
            </div>
            <div style={{ borderTop: `1px solid ${COLORS.border}`, margin: "32px 0 24px" }} />
            <p style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 16 }}>Everything in Free, plus:</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", gap: 12 }}><CheckIcon /><span style={{ fontSize: 13, color: COLORS.text }}><b>Unlimited</b> summaries</span></div>
              <div style={{ display: "flex", gap: 12 }}><CheckIcon /><span style={{ fontSize: 13, color: COLORS.text }}>Export to <b>Jira</b></span></div>
              <div style={{ display: "flex", gap: 12 }}><CheckIcon /><span style={{ fontSize: 13, color: COLORS.text }}>Export to <b>Notion</b></span></div>
              <div style={{ display: "flex", gap: 12 }}><CheckIcon /><span style={{ fontSize: 13, color: COLORS.text }}>Detailed engineering tasks</span></div>
            </div>
          </div>

          {/* TEAM PLAN */}
          <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "40px 32px", display: "flex", flexDirection: "column", height: "100%" }}>
            <h2 style={{ fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700, marginBottom: 8 }}>Team</h2>
            <p style={{ color: COLORS.textMuted, fontSize: 13, lineHeight: 1.6, marginBottom: 24, minHeight: 42 }}>Add seats and features for your org.</p>
            <button style={{ width: "100%", background: "#1D2B3F", color: COLORS.text, border: "none", padding: "12px", borderRadius: 6, fontSize: 13, fontWeight: 500, letterSpacing: "0.05em", cursor: "pointer", marginBottom: 32, transition: "background 0.2s" }} onClick={() => onNavigate('auth')} onMouseEnter={e => e.currentTarget.style.background = "#243552"} onMouseLeave={e => e.currentTarget.style.background = "#1D2B3F"}>
              Upgrade now
            </button>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 16 }}>
              <span style={{ fontSize: 42, fontWeight: 700, fontFamily: "'Syne', sans-serif" }}>₹1499</span>
              <span style={{ color: COLORS.textMuted, fontSize: 13 }}>/ month</span>
            </div>
            <div style={{ borderTop: `1px solid ${COLORS.border}`, margin: "32px 0 24px" }} />
            <p style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 16 }}>Everything in Pro, plus:</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", gap: 12 }}><CheckIcon /><span style={{ fontSize: 13, color: COLORS.text }}>Up to <b>5 users</b></span></div>
              <div style={{ display: "flex", gap: 12 }}><CheckIcon /><span style={{ fontSize: 13, color: COLORS.text }}>Shared workspaces</span></div>
              <div style={{ display: "flex", gap: 12 }}><CheckIcon /><span style={{ fontSize: 13, color: COLORS.text }}>Centralized billing</span></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
