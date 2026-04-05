import { useState } from 'react';
import type { AppView } from '../navigation';
import { supabase } from '../supabase';
import { COLORS } from '../theme';
import logoIcon from '../assets/logo.svg';

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 mt-1">
    <path d="M20 6L9 17L4 12" stroke={COLORS.green} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function PricingPage({ onNavigate }: { onNavigate: (view: AppView) => void }) {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleUpgrade = async (plan: 'pro' | 'team') => {
    try {
      setLoadingPlan(plan);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        alert("Please log in first before upgrading!");
        onNavigate('auth');
        return;
      }
      
      const userId = session.user.id;
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) throw new Error("Razorpay SDK failed to load. Check your connection.");

      // Fetch order from our express backend
      const orderRes = await fetch('http://localhost:3001/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, userId })
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.error);

      // Initialize Razorpay Options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "test_key",
        amount: orderData.amount,
        currency: "INR",
        name: "SyncScript",
        description: `Upgrade to ${plan.toUpperCase()} Plan`,
        order_id: orderData.orderId,
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch('http://localhost:3001/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                plan,
                userId
              })
            });
            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              alert("Payment successful! Database Limits unlocked.");
              onNavigate('app');
            } else {
              alert("Verification failed: " + verifyData.message);
            }
          } catch (e) {
            alert("Payment verification error.");
          }
        },
        theme: {
          color: "#09090B"
        }
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();

    } catch (error: any) {
      console.error(error);
      alert(error.message || "Failed to initiate payment");
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.bg, fontFamily: "'Figtree', sans-serif", color: COLORS.text }}>
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
          width: 600, height: 600, top: -200, left: -100, background: "rgba(255, 255, 255, 0.06)"
        }} 
      />
      
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 sticky top-0 z-[100] backdrop-blur-md border-b" style={{ borderColor: COLORS.borderSoft, background: "rgba(9, 9, 11, 0.80)", height: 56 }}>
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('landing')}>
          <img src={logoIcon} alt="SyncScript Logo" style={{ width: 28, height: 28 }} />
          <span style={{ fontFamily: "'Figtree', sans-serif", fontSize: 17, fontWeight: 700, letterSpacing: "-0.3px" }}>SyncScript</span>
        </div>
        <div className="flex items-center gap-5 md:gap-6">
           <a onClick={() => onNavigate('app')} style={{ fontSize: 14, color: COLORS.textMuted, cursor: "pointer", textDecoration: "none", padding: "6px 12px", borderRadius: 6 }} onMouseEnter={e => { e.currentTarget.style.color = COLORS.text; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }} onMouseLeave={e => { e.currentTarget.style.color = COLORS.textMuted; e.currentTarget.style.background = "transparent"; }}>App</a>
          <button style={{ background: "none", border: "none", color: COLORS.textMuted, fontSize: 14, cursor: "pointer", padding: "6px 12px", borderRadius: 6 }} onClick={() => onNavigate('auth')} onMouseEnter={e => { e.currentTarget.style.color = COLORS.text; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }} onMouseLeave={e => { e.currentTarget.style.color = COLORS.textMuted; e.currentTarget.style.background = "transparent"; }}>Log in</button>
        </div>
      </nav>

      <div className="relative z-10 px-5 md:px-6 py-12 md:py-20 pb-20 max-w-[1000px] mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <h1 className="text-[32px] md:text-[44px] font-[800] mb-4 tracking-[-0.03em] leading-tight" style={{ fontFamily: "'Figtree', sans-serif" }}>Predictable pricing, designed to scale</h1>
          <p className="text-[14px] md:text-[15px]" style={{ color: COLORS.textMuted, letterSpacing: "0.02em" }}>Start converting meetings for free, collaborate with your team, then scale.</p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 items-start">
          
          {/* FREE PLAN */}
          <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "40px 32px", display: "flex", flexDirection: "column", height: "100%" }}>
            <h2 style={{ fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700, marginBottom: 8 }}>Free</h2>
            <p style={{ color: COLORS.textMuted, fontSize: 13, lineHeight: 1.6, marginBottom: 24, minHeight: 42 }}>Perfect for personal projects & occasional usages.</p>
            <button style={{ width: "100%", background: COLORS.surface2, color: COLORS.text, border: `1px solid ${COLORS.border}`, padding: "12px", borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: "pointer", marginBottom: 32, transition: "background 0.2s, border-color 0.2s" }} onClick={() => onNavigate('app')} onMouseEnter={e => { e.currentTarget.style.background = COLORS.border; e.currentTarget.style.borderColor = COLORS.textDim; }} onMouseLeave={e => { e.currentTarget.style.background = COLORS.surface2; e.currentTarget.style.borderColor = COLORS.border; }}>
              Continue with Free
            </button>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 16 }}>
              <span style={{ fontSize: 42, fontWeight: 800, fontFamily: "'Figtree', sans-serif", letterSpacing: "-1px" }}>₹0</span>
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
          <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.borderLight}`, borderRadius: 12, padding: "40px 32px", display: "flex", flexDirection: "column", height: "100%", position: "relative", transform: "translateY(-12px)", boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)" }}>
            <div style={{ position: "absolute", top: -14, left: "20px", background: COLORS.accent, color: COLORS.onAccent, padding: "4px 12px", borderRadius: 20, fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Most Popular</div>
            <h2 style={{ fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700, marginBottom: 8, color: COLORS.text }}>Pro</h2>
            <p style={{ color: COLORS.textMuted, fontSize: 13, lineHeight: 1.6, marginBottom: 24, minHeight: 42 }}>For professionals seeking unlimited sync features.</p>
            <button disabled={loadingPlan === 'pro'} style={{ width: "100%", background: COLORS.accent, color: COLORS.onAccent, border: "none", padding: "12px", borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: loadingPlan === 'pro' ? 'wait' : 'pointer', marginBottom: 32, transition: "opacity 0.2s" }} onClick={() => handleUpgrade('pro')} onMouseEnter={e => { if(loadingPlan !== 'pro') e.currentTarget.style.opacity = "0.88"; }} onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
              {loadingPlan === 'pro' ? 'Processing...' : 'Upgrade now'}
            </button>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 16 }}>
              <span style={{ fontSize: 42, fontWeight: 800, fontFamily: "'Figtree', sans-serif", letterSpacing: "-1px" }}>₹399</span>
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
            <button disabled={loadingPlan === 'team'} style={{ width: "100%", background: COLORS.surface2, color: COLORS.text, border: `1px solid ${COLORS.border}`, padding: "12px", borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: loadingPlan === 'team' ? 'wait' : 'pointer', marginBottom: 32, transition: "background 0.2s, border-color 0.2s" }} onClick={() => handleUpgrade('team')} onMouseEnter={e => { if(loadingPlan !== 'team') { e.currentTarget.style.background = COLORS.border; e.currentTarget.style.borderColor = COLORS.textDim; } }} onMouseLeave={e => { e.currentTarget.style.background = COLORS.surface2; e.currentTarget.style.borderColor = COLORS.border; }}>
              {loadingPlan === 'team' ? 'Processing...' : 'Upgrade now'}
            </button>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 16 }}>
              <span style={{ fontSize: 42, fontWeight: 800, fontFamily: "'Figtree', sans-serif", letterSpacing: "-1px" }}>₹1499</span>
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
