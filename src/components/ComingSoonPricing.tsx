import { useState } from 'react';
import type { AppView } from '../navigation';
import logoIcon from '../assets/logo.svg';
import Header from './Header';

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.15s' }}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const CheckIcon = () => (
  <svg width="9" height="9" viewBox="0 0 10 8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1,4 4,7 9,1" />
  </svg>
);

const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

type Props = { 
  user: any;
  onNavigate: (view: AppView) => void;
  onSignIn: () => void;
  onSignOut: () => void;
};

export default function ComingSoonPricing({ user, onNavigate, onSignIn, onSignOut }: Props) {
  const [email, setEmail] = useState('');
  const [notified, setNotified] = useState(false);
  const [error, setError] = useState(false);

  const handleNotify = () => {
    if (email.includes('@')) {
      setNotified(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="coming-soon-pricing">
      <style>{`
        .coming-soon-pricing {
          --bg: #09090B;
          --bg-2: #111113;
          --bg-3: #18181B;
          --border: #27272A;
          --border-soft: #1F1F23;
          --text: #FAFAFA;
          --text-2: #A1A1AA;
          --text-3: #52525B;
          --accent: #FFFFFF;
          --accent-dim: rgba(255, 255, 255, 0.08);
          --font: 'Figtree', sans-serif;
          
          background: var(--bg);
          color: var(--text);
          font-family: var(--font);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow-x: hidden;
        }

        .coming-soon-pricing::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px);
          background-size: 64px 64px;
          pointer-events: none;
          z-index: 0;
        }

        nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          border-bottom: 1px solid var(--border-soft);
          background: rgba(9, 9, 11, 0.85);
          backdrop-filter: blur(16px);
        }

        .nav-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          font-weight: 700;
          font-size: 17px;
          color: var(--text);
          letter-spacing: -0.3px;
          cursor: pointer;
        }

        .nav-links {
          display: flex;
          align-items: center;
          list-style: none;
        }

        .nav-links a {
          color: var(--text-2);
          text-decoration: none;
          font-size: 14px;
          padding: 6px 12px;
          border-radius: 6px;
          transition: all 0.15s;
          cursor: pointer;
        }
        .nav-links a:hover { color: var(--text); background: rgba(255,255,255,0.05); }
        .nav-links a.active { color: var(--text); background: rgba(255,255,255,0.08); }

        .btn-ghost {
          font-size: 14px;
          color: var(--text-2);
          background: none;
          border: none;
          padding: 7px 14px;
          border-radius: 7px;
          cursor: pointer;
          transition: all 0.15s;
        }
        .btn-ghost:hover { color: var(--text); background: rgba(255,255,255,0.05); }

        .btn-primary {
          font-size: 14px;
          font-weight: 600;
          color: #000;
          background: #fff;
          border: none;
          padding: 7px 16px;
          border-radius: 7px;
          cursor: pointer;
          transition: all 0.15s;
        }
        .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }

        main {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 100px 24px 80px;
          position: relative;
          z-index: 1;
          text-align: center;
        }

        .glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
        }
        .glow-1 {
          width: 500px; height: 400px;
          background: rgba(255, 255, 255, 0.06);
          top: 0; left: 50%;
          transform: translateX(-50%);
        }

        .orbit {
          position: relative;
          width: 110px;
          height: 110px;
          margin-bottom: 40px;
          animation: fadeUp 0.5s ease both;
        }

        .core {
          width: 56px; height: 56px;
          border-radius: 50%;
          background: var(--accent-dim);
          border: 1px solid rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          animation: breathe 3s ease-in-out infinite;
        }

        .core svg {
          width: 22px; height: 22px;
          stroke: #fff;
        }

        .ring {
          position: absolute;
          top: 50%; left: 50%;
          border-radius: 50%;
          border: 1px solid var(--border);
          animation: spin linear infinite;
        }

        .ring-1 {
          width: 82px; height: 82px;
          margin: -41px 0 0 -41px;
          animation-duration: 7s;
        }

        .ring-2 {
          width: 110px; height: 110px;
          margin: -55px 0 0 -55px;
          animation-duration: 12s;
          animation-direction: reverse;
          border-style: dashed;
          border-color: var(--border-soft);
        }

        .orbit-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          position: absolute;
          top: -3.5px;
          left: 50%;
          margin-left: -3.5px;
          background: #fff;
        }
        .ring-1 .orbit-dot { background: #A1A1AA; }

        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes breathe {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50%       { transform: translate(-50%, -50%) scale(1.08); }
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 5px 14px;
          border-radius: 99px;
          border: 1px solid var(--border);
          background: var(--bg-2);
          font-size: 12px;
          font-weight: 600;
          color: var(--text-2);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 22px;
          animation: fadeUp 0.5s 0.05s ease both;
        }

        .blink {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #fff;
          animation: blink 2s infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }

        h1 {
          font-size: clamp(36px, 6vw, 60px);
          font-weight: 800;
          letter-spacing: -2.5px;
          line-height: 1.05;
          color: #fff;
          max-width: 580px;
          margin-bottom: 16px;
          animation: fadeUp 0.5s 0.1s ease both;
        }

        .sub {
          font-size: 17px;
          color: var(--text-2);
          max-width: 460px;
          line-height: 1.65;
          margin: 0 auto 48px;
          animation: fadeUp 0.5s 0.16s ease both;
        }

        .plans-preview {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 48px;
          animation: fadeUp 0.5s 0.28s ease both;
        }

        .plan-ghost {
          border: 1px dashed var(--border-soft);
          border-radius: 12px;
          padding: 24px;
          width: 160px;
          opacity: 0.5;
          text-align: center;
        }

        .plan-ghost-name {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-3);
          margin-bottom: 6px;
        }

        .plan-ghost-price {
          font-size: 22px;
          font-weight: 800;
          letter-spacing: -1px;
          color: var(--text-3);
        }

        .plan-ghost-label {
          font-size: 11px;
          color: var(--text-3);
          margin-top: 4px;
        }

        .free-card {
          border: 1px solid var(--border);
          border-radius: 16px;
          background: var(--bg-2);
          padding: 32px 36px;
          max-width: 400px;
          width: 100%;
          margin: 0 auto 36px;
          position: relative;
          overflow: hidden;
          animation: fadeUp 0.5s 0.22s ease both;
          text-align: left;
        }

        .free-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #fff, transparent);
        }

        .plan-label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-3);
          margin-bottom: 12px;
        }

        .plan-price {
          font-size: 52px;
          font-weight: 800;
          letter-spacing: -2.5px;
          color: var(--text);
          line-height: 1;
          margin-bottom: 6px;
        }

        .plan-price sup {
          font-size: 22px;
          font-weight: 600;
          vertical-align: top;
          margin-top: 10px;
          display: inline-block;
          letter-spacing: 0;
        }

        .plan-sub {
          font-size: 13px;
          color: var(--text-3);
          margin-bottom: 22px;
        }

        .plan-sub span {
          color: #fff;
          font-weight: 600;
        }

        .divider {
          height: 1px;
          background: var(--border-soft);
          margin: 0 0 20px;
        }

        .feats { list-style: none; margin: 0; padding: 0; }

        .feats li {
          font-size: 14px;
          color: var(--text-2);
          padding: 7px 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .check-wrap {
          width: 17px; height: 17px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #fff;
        }

        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 32px;
          border-radius: 9px;
          background: #fff;
          color: #09090B;
          font-size: 15px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          transition: all 0.15s;
          text-decoration: none;
          letter-spacing: -0.2px;
          margin-top: 24px;
        }
        .cta-btn:hover { opacity: 0.88; transform: translateY(-1px); }
        .cta-btn:hover svg { transform: translateX(3px); }

        .notify { text-align: center; margin-top: 48px; }

        .notify p {
          font-size: 13px;
          color: var(--text-3);
          margin-bottom: 12px;
        }

        .notify-row {
          display: flex;
          gap: 8px;
          justify-content: center;
          flex-wrap: wrap;
          max-width: 380px;
          margin: 0 auto;
        }

        .notify-input {
          flex: 1;
          min-width: 200px;
          padding: 10px 16px;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: var(--bg-3);
          font-family: var(--font);
          font-size: 14px;
          color: var(--text);
          outline: none;
          transition: border-color 0.15s;
        }
        .notify-input::placeholder { color: var(--text-3); }
        .notify-input:focus { border-color: #fff; }
        .notify-input.error { border-color: #ff5a7a; }

        .notify-btn {
          padding: 10px 20px;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: var(--bg-3);
          font-family: var(--font);
          font-size: 14px;
          font-weight: 500;
          color: var(--text-2);
          cursor: pointer;
          transition: all 0.15s;
          white-space: nowrap;
        }
        .notify-btn:hover { color: var(--text); border-color: var(--text-2); background: var(--bg-2); }

        .notified {
          font-size: 13px;
          color: #fff;
          margin-top: 12px;
          font-weight: 500;
        }

        footer {
          position: relative;
          z-index: 1;
          border-top: 1px solid var(--border-soft);
          padding: 32px 24px;
          text-align: center;
          margin-top: 40px;
        }

        footer p {
          font-size: 13px;
          color: var(--text-3);
        }

        footer a {
          color: var(--text-3);
          text-decoration: none;
          transition: color 0.15s;
        }
        footer a:hover { color: var(--text-2); }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          background: #fff;
          opacity: 0.2;
          animation: floatUp linear infinite;
        }

        @keyframes floatUp {
          0%   { transform: translateY(0) scale(1); opacity: 0.2; }
          100% { transform: translateY(-90px) scale(0); opacity: 0; }
        }

        @media (max-width: 600px) {
          .nav-links { display: none; }
          .free-card { padding: 24px 20px; }
          h1 { letter-spacing: -1.5px; }
        }
      `}</style>

      <Header 
        user={user} 
        currentView="coming-soon-pricing" 
        onNavigate={onNavigate} 
        onSignIn={onSignIn} 
        onSignOut={onSignOut} 
      />

      <main>
        <div className="glow glow-1" />
        
        <div className="orbit">
          <div className="ring ring-1">
            <div className="orbit-dot" />
          </div>
          <div className="ring ring-2">
            <div className="orbit-dot" />
          </div>
          <div className="core">
            <img src={logoIcon} alt="Logo" style={{ width: 32, height: 32, filter: 'grayscale(1) brightness(2)' }} />
          </div>
        </div>

        <div className="badge">
          <span className="blink" />
          Coming soon
        </div>

        <h1>Plans are on<br />their way.</h1>

        <p className="sub">We&apos;re still building out Pro and Team. Until launch, everything is completely free - no limits, no catch, no credit card.</p>

        <div className="plans-preview">
          <div className="plan-ghost">
            <LockIcon />
            <div className="plan-ghost-name">Pro</div>
            <div className="plan-ghost-price">₹399</div>
            <div className="plan-ghost-label">/ month</div>
          </div>
          <div className="plan-ghost">
            <LockIcon />
            <div className="plan-ghost-name">Team</div>
            <div className="plan-ghost-price">₹999</div>
            <div className="plan-ghost-label">/ month</div>
          </div>
        </div>

        <div className="free-card">
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius: 16 }}>
            {[...Array(14)].map((_, i) => (
              <div 
                key={i} 
                className="particle" 
                style={{ 
                  left: `${Math.random() * 100}%`, 
                  bottom: `${Math.random() * 20}%`, 
                  width: `${2 + Math.random() * 3}px`, 
                  height: `${2 + Math.random() * 3}px`,
                  animationDuration: `${3 + Math.random() * 5}s`,
                  animationDelay: `${Math.random() * 5}s`
                }} 
              />
            ))}
          </div>
          <div className="plan-label">Current plan - Everyone</div>
          <div className="plan-price"><sup>₹</sup>0</div>
          <p className="plan-sub">Free during beta &nbsp;·&nbsp; <span>Enjoy it while it lasts</span></p>
          <div className="divider" />
          <ul className="feats">
            <li><div className="check-wrap"><CheckIcon /></div> 5 summaries/month (beta)</li>
            <li><div className="check-wrap"><CheckIcon /></div> AI action item detection</li>
            <li><div className="check-wrap"><CheckIcon /></div> Smart tagging &amp; categories</li>
            <li><div className="check-wrap"><CheckIcon /></div> Copy &amp; export summaries</li>
            <li><div className="check-wrap"><CheckIcon /></div> No credit card needed</li>
          </ul>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <button className="cta-btn" onClick={() => onNavigate('app')}>
            Start for free - it&apos;s on us
            <ArrowIcon />
          </button>

          <div className="notify">
            {notified ? (
              <div className="notified">You&apos;re on the list - we&apos;ll ping you when Pro drops!</div>
            ) : (
              <>
                <p>Want early access to Pro? We&apos;ll let you know first.</p>
                <div className="notify-row">
                  <input 
                    type="email" 
                    className={`notify-input ${error ? 'error' : ''}`} 
                    placeholder="you@company.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button className="notify-btn" onClick={handleNotify}>Notify me</button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <footer>
        <p>
          <a onClick={() => onNavigate('landing')} style={{ cursor: 'pointer' }}>← Back to SyncScripts</a>
          &nbsp;·&nbsp;
          © 2026 SyncScripts. . Priyanshu Rawat. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
