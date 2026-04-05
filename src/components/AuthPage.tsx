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
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleAuth = async () => {
    if (!email || !password) return setErrorMsg("Please fill all fields");
    setLoading(true);
    setErrorMsg("");
    
    let err = null;
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      err = error;
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      err = error;
    }
    
    setLoading(false);
    if (err) {
      setErrorMsg(err.message);
    } else {
      if (onNavigate) onNavigate('app');
    }
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

            <h1 className="syne-font text-[28px] font-bold mb-4 tracking-tight">{isLogin ? "Welcome Back" : "Create Account"}</h1>
            <p className="text-[11px] mb-8 font-medium tracking-widest uppercase" style={{ color: COLORS.textDim }}>Select an option to {isLogin ? "login" : "sign up"}</p>

            <div className="w-full space-y-3 mb-8">
              <SocialButton icon={<GoogleIcon />} label={isLogin ? "Continue with Google" : "Sign up with Google"} />
              <SocialButton icon={<GitHubIcon />} label={isLogin ? "Continue with GitHub" : "Sign up with GitHub"} />
              <SocialButton icon={<GitLabIcon />} label={isLogin ? "Continue with GitLab" : "Sign up with GitLab"} />
              <SocialButton icon={<BitbucketIcon />} label={isLogin ? "Continue with Bitbucket" : "Sign up with Bitbucket"} />
            </div>

            <div className="w-full flex flex-col items-center gap-4 mb-10 mt-6 md:mt-0">
              <div className="w-full h-[1px] relative" style={{ background: COLORS.border }}>
                <span className="absolute left-1/2 -top-[10px] -translate-x-1/2 px-4 text-[10px] tracking-widest font-bold uppercase" style={{ background: COLORS.surface, color: COLORS.textDim }}>or email</span>
              </div>
            </div>

            <div className="w-full flex flex-col gap-3 mb-10">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full rounded-md px-4 py-3 text-[13px] focus:outline-none transition-colors"
                style={{ background: COLORS.bg, border: `1px solid ${COLORS.border}`, color: COLORS.text }}
                onFocus={e => { e.target.style.borderColor = COLORS.accent; }}
                onBlur={e => { e.target.style.borderColor = COLORS.border; }}
                autoComplete="email"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full rounded-md px-4 py-3 text-[13px] focus:outline-none transition-colors"
                style={{ background: COLORS.bg, border: `1px solid ${COLORS.border}`, color: COLORS.text }}
                onFocus={e => { e.target.style.borderColor = COLORS.accent; }}
                onBlur={e => { e.target.style.borderColor = COLORS.border; }}
                onKeyDown={e => e.key === 'Enter' && handleAuth()}
                autoComplete={isLogin ? "current-password" : "new-password"}
              />
              
              {errorMsg && (
                <div className="text-[#EA4335] text-[11px] font-medium tracking-wide mt-1 text-center bg-[rgba(234,67,53,0.1)] py-2 rounded">
                  {errorMsg}
                </div>
              )}
              
              <button 
                onClick={handleAuth}
                disabled={loading}
                className={`w-full hover:opacity-90 font-semibold text-[13px] py-3 rounded-md transition-all mt-2 ${loading ? 'opacity-70 cursor-wait' : ''}`}
                style={{ background: COLORS.accent, color: COLORS.onAccent }}
              >
                {loading ? "Processing..." : (isLogin ? "Sign In" : "Create Account")}
              </button>
            </div>

            <div className="text-[11px] mb-10 flex flex-col items-center gap-1.5 tracking-widest uppercase font-medium" style={{ color: COLORS.textDim }}>
              <span>{isLogin ? "No account yet?" : "Already have an account?"}</span>
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="transition-colors mt-1"
                style={{ color: COLORS.textMuted }}
                onMouseEnter={e => { e.currentTarget.style.color = COLORS.text; }}
                onMouseLeave={e => { e.currentTarget.style.color = COLORS.textMuted; }}
              >
                {isLogin ? "Sign up" : "Log in"}
              </button>
            </div>

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

function SocialButton({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <button className="social-btn w-full sm:w-[340px] flex items-center gap-3 py-[10px] px-5 rounded-md group">
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

function GitHubIcon() {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

function GitLabIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.65 10.95L19.24 3.32c-.19-.44-.81-.44-1 0L15.35 10H8.65L5.76 3.32c-.19-.44-.81-.44-1 0L1.35 10.95c-.17.38-.06.84.26 1.11l10.39 7.6 10.39-7.6c.32-.27.43-.73.26-1.11z" fill="#FC6D26" />
      <path d="M15.35 10l-4.96 7.6L19.24 3.32l-3.89 6.68z" fill="#E24329" />
      <path d="M8.65 10l4.96 7.6L4.76 3.32l3.89 6.68z" fill="#E24329" />
      <path d="M1.35 10.95L5.76 3.32 8.65 10H1.35c0 0 0 .01 0 .95z" fill="#FCA326" />
      <path d="M22.65 10.95L18.24 3.32 15.35 10h7.3c0 0 0 .01 0 .95z" fill="#FCA326" />
    </svg>
  );
}

function BitbucketIcon() {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.2 3.86a1.07 1.07 0 00-1.06 1.23l3.24 14.15c.1.44.52.88.97.88h13.3c.45 0 .86-.44.97-.88l3.24-14.15c0-.42-.52-.8-.97-.8H2.2zm12.35 10.32H9.45l-1.07-5.11h7.24l-1.07 5.11z" fill="#2684FF" />
    </svg>
  );
}
