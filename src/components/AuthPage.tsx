import React, { useState } from 'react';
import { COLORS } from '../theme';
import logoIcon from '../assets/logo.svg';
import { IconBolt, IconLock, IconTarget } from './ui-icons';
import type { AppView } from '../navigation';
import { supabase } from '../supabase';

const AuthGoogleFonts = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800&display=swap');
    
    .auth-bg { background-color: ${COLORS.bg}; }
    .auth-surface { background-color: ${COLORS.surface}; border-color: ${COLORS.border}; }
    
    .grid-bg-auth { 
      background-image: linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
      background-size: 64px 64px;
    }
    
    .noise-auth {
      position: absolute; top: 0; left: 0; right: 0; bottom: 0; pointer-events: none; z-index: 0; opacity: 0.025;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='a'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23a)'/%3E%3C/svg%3E");
    }
    
    .glow-orb-auth { position: absolute; border-radius: 50%; filter: blur(120px); pointer-events: none; z-index: 0; }
    
    .syne-font { font-family: 'Figtree', sans-serif; }
    .dm-mono { font-family: 'Figtree', sans-serif; }
    
    .social-btn {
      background: ${COLORS.surface};
      border: 1px solid ${COLORS.border};
      color: ${COLORS.text};
      transition: all 0.2s ease;
    }
    .social-btn:hover {
      background: rgba(255, 255, 255, 0.04);
      border-color: ${COLORS.borderLight};
      transform: translateY(-1px);
    }
  `}</style>
);

export default function AuthPage({ onNavigate }: { onNavigate?: (view: AppView) => void }) {
  const [errorMsg, setErrorMsg] = useState("");

  const handleGoogleSignIn = async () => {
    setErrorMsg("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin // The auth listener in App.tsx will handle redirection
      }
    });
    if (error) setErrorMsg(error.message);
  };

  return (
    <>
      <AuthGoogleFonts />
      <div className="min-h-screen text-[#FAFAFA] flex flex-col md:flex-row dm-mono auth-bg">
        {/* Left Column - Login Form */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 sm:p-12 md:p-16 lg:px-24 border-r relative z-10" style={{ borderColor: COLORS.borderSoft, background: COLORS.surface }}>
          <div className="w-full max-w-[340px] flex flex-col items-center">
            
            {/* SyncScript Logo */}
            <div className="mb-10 flex items-center justify-center gap-2">
              <img src={logoIcon} alt="SyncScript Logo" style={{ width: 32, height: 32 }} />
              <span className="syne-font text-[20px] font-bold">SyncScript</span>
            </div>

            <h1 className="syne-font text-[28px] font-bold mb-4 tracking-tight">Sign in to SyncScript</h1>
            <p className="text-[11px] mb-8 font-medium tracking-widest uppercase" style={{ color: COLORS.textDim }}>Join SyncScript today</p>

            <div className="w-full space-y-3 mb-8">
              <SocialButton icon={<GoogleIcon />} label="Continue with Google" onClick={handleGoogleSignIn} />
            </div>

            {errorMsg && (
              <div className="w-full text-[#EA4335] text-[11px] font-medium tracking-wide mt-1 text-center bg-[rgba(234,67,53,0.1)] py-2 rounded mb-6">
                {errorMsg}
              </div>
            )}

            <p className="text-[10px] text-center max-w-[280px] leading-relaxed uppercase tracking-wider" style={{ color: COLORS.textDim }}>
              By continuing, you agree to our <a href="#" className="underline transition-colors" style={{ color: COLORS.textMuted }}>terms of service</a> and <a href="#" className="underline transition-colors" style={{ color: COLORS.textMuted }}>privacy policy</a>.
            </p>
          </div>
        </div>

        {/* Right Column - Features */}
        <div className="hidden md:flex flex-[1.2] relative overflow-hidden p-12 lg:p-24 flex-col justify-center grid-bg-auth">
          <div className="noise-auth" />
          <div className="glow-orb-auth" style={{ width: 600, height: 600, top: -200, right: -100, background: "rgba(255, 255, 255, 0.06)" }} />
          <div className="glow-orb-auth" style={{ width: 500, height: 500, bottom: -100, left: -200, background: "rgba(255, 255, 255, 0.04)" }} />
          
          <div className="relative z-10 max-w-md ml-auto mr-auto lg:ml-0 space-y-12 pl-4 lg:pl-16">
            <FeatureItem 
              icon={<IconBolt size={22} style={{ color: COLORS.text }} />}
              title="Instant processing"
              description="Turn hours of meeting transcripts into structured actionable insights in just seconds using AI."
              titleColor={COLORS.text}
            />
            
            <FeatureItem 
              icon={<IconTarget size={22} style={{ color: COLORS.textMuted }} />}
              title="JIRA-ready actions"
              description="Extract beautifully formatted engineering tasks, tracked bug reports, and clear to-do lists seamlessly."
              titleColor={COLORS.textMuted}
            />
            
            <FeatureItem 
              icon={<IconLock size={22} style={{ color: COLORS.accentDim }} />}
              title="Secure & Private"
              description="We respect your data. Your internal discussions remain totally confidential and are never persisted."
              titleColor={COLORS.accentDim}
            />
          </div>
        </div>
      </div>
    </>
  );
}

function SocialButton({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick?: () => void }) {
  return (
    <button onClick={onClick} className="social-btn w-full sm:w-[340px] flex items-center gap-3 py-[10px] px-5 rounded-md group">
      <div className="flex items-center justify-center w-[18px] h-[18px] flex-shrink-0">
        {icon}
      </div>
      <span className="text-[12px] font-medium tracking-wide flex-1 text-center -ml-[18px]">{label}</span>
      <div className="w-[18px] h-[18px] flex-shrink-0"></div>
    </button>
  );
}

function FeatureItem({ icon, title, description, titleColor }: { icon: React.ReactNode; title: string; description: string; titleColor: string }) {
  return (
    <div className="flex gap-4 sm:gap-6">
      <div className="flex-shrink-0 mt-0.5 flex items-center justify-center w-10 h-10 rounded-[10px]" style={{ background: COLORS.accentGlow }}>
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="syne-font text-[17px] font-bold mb-2 tracking-wide" style={{ color: titleColor }}>{title}</h3>
        <p className="text-[13px] leading-[1.7] font-normal tracking-wide" style={{ color: COLORS.textMuted }}>
          {description}
        </p>
      </div>
    </div>
  );
}

// Icons
function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}
