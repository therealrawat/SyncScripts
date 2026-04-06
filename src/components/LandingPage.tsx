import { useState, useEffect } from 'react';
import logoIcon from '../assets/logo.svg';
import type { AppView } from '../navigation';
import Header from './Header';
import '../landing.css';

const ArrowIcon = () => (
  <svg className="icon-arrow" viewBox="0 0 24 24" aria-hidden>
    <path d="M5 12h14" />
    <path d="M12 5l7 7-7 7" />
  </svg>
);

const HeroSlideshow = () => {
  const [activeSlide, setActiveSlide] = useState(0); // 0: Input, 1: Summary, 2: Actions, 3: Tasks
  const transcript = "so we've got the sprint capacity at 42 points. Rohan, can you pick up the auth refactor ticket? That's estimated at 8 points. Also, the API gateway work needs a review by Thursday - Priya, that's on you. Let's also move the billing fix up in priority, we've had three client complaints this week.";

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 4);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const renderInput = () => (
    <div className="slide-content animate-slide">
      <div className="mock-input-area">
        {transcript}
      </div>
      <div className="mock-bottom">
        <div className="mock-indicators">
          <div className="mock-indicator">EXECUTIVE SUMMARY</div>
          <div className="mock-indicator">ACTION ITEMS</div>
          <div className="mock-indicator">TECH TASKS</div>
        </div>
        <div className="mock-generate">
          Generate
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
        </div>
      </div>
    </div>
  );

  const renderSummary = () => (
    <div className="slide-content animate-slide">
      <div className="mock-sub-tabs">
        <div className="mock-sub-tab active">Summary</div>
        <div className="mock-sub-tab">Actions (2)</div>
        <div className="mock-sub-tab">Tasks (1)</div>
        <div className="mock-export">EXPORT JSON</div>
      </div>
      <div className="mock-output-box">
        <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--text)', marginBottom: 20 }}>
          The team discussed sprint capacity (42 points) and assigned the auth refactor to Rohan. Priya will review the API gateway by Thursday. The billing fix was prioritized due to increasing client complaints.
        </p>
        <div className="mock-meta" style={{ marginTop: 'auto' }}>
          <span className="mock-output-tag">Sprint Planning</span>
          <span className="mock-output-tag">Prioritization</span>
        </div>
      </div>
    </div>
  );

  const renderActions = () => (
    <div className="slide-content animate-slide">
      <div className="mock-sub-tabs">
        <div className="mock-sub-tab">Summary</div>
        <div className="mock-sub-tab active">Actions (2)</div>
        <div className="mock-sub-tab">Tasks (1)</div>
        <div className="mock-export">EXPORT JSON</div>
      </div>
      <div className="mock-output-box" style={{ padding: 20 }}>
        <div className="mock-output-header">
          <span className="mock-output-tag">ACTION ITEMS</span>
          <span className="mock-progress">0/2 Completed</span>
        </div>
        <div className="mock-checklist">
          <div className="mock-check-item">
            <div className="mock-checkbox" />
            <div className="mock-check-content">
              <div className="mock-check-text">Elevate priority of billing fix due to recent client complaints.</div>
              <div className="mock-meta">
                <span className="mock-owner">@N/A</span>
                <span className="mock-prio prio-critical">CRITICAL</span>
              </div>
            </div>
          </div>
          <div style={{ height: 1, background: 'var(--border)', margin: '4px 0' }} />
          <div className="mock-check-item">
            <div className="mock-checkbox" />
            <div className="mock-check-content">
              <div className="mock-check-text">Review API gateway work by Thursday.</div>
              <div className="mock-meta">
                <span className="mock-owner">@Priya</span>
                <span className="mock-prio prio-high">HIGH</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTasks = () => (
    <div className="slide-content animate-slide">
      <div className="mock-sub-tabs">
        <div className="mock-sub-tab">Summary</div>
        <div className="mock-sub-tab">Actions (2)</div>
        <div className="mock-sub-tab active">Tasks (1)</div>
        <div className="mock-export">EXPORT JSON</div>
      </div>
      <div className="mock-output-box" style={{ padding: 20, display: 'flex', alignItems: 'center' }}>
        <div style={{ width: '100%', padding: '16px 20px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 10 }} className="mock-task-card">
           <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span className="mock-output-tag" style={{ background: 'rgba(255,255,255,0.08)' }}>FEATURE</span>
              <span className="mock-task-title">Auth Refactor</span>
           </div>
           <div className="mock-task-meta">
              <span className="mock-owner" style={{ color: 'var(--text-2)' }}>@Rohan</span>
              <span className="mock-estimate">4d</span>
           </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="hero-preview">
      <div className="preview-bar">
        <div className="mock-tabs">
          <div className={`mock-tab ${activeSlide === 0 ? 'active' : ''}`}>Input</div>
          <div className={`mock-tab ${activeSlide !== 0 ? 'active output-active' : ''}`}>Output</div>
        </div>
        <div className="mock-indicators">
           {activeSlide === 0 && <span style={{ fontSize: 11, color: 'var(--text-3)' }}>296 chars</span>}
           <div style={{ display: 'flex', gap: 6, marginLeft: 12 }}>
              <div className="dot dot-r" />
              <div className="dot dot-y" />
              <div className="dot dot-g" />
           </div>
        </div>
      </div>
      <div className="preview-body">
        {activeSlide === 0 && renderInput()}
        {activeSlide === 1 && renderSummary()}
        {activeSlide === 2 && renderActions()}
        {activeSlide === 3 && renderTasks()}
      </div>
    </div>
  );
};

type Props = {
  user: any;
  onNavigate: (view: AppView) => void;
  onSignIn: () => void;
  onSignOut: () => void;
};

export default function LandingPage({ user, onNavigate, onSignIn, onSignOut }: Props) {
  return (
    <div className="landing-page">
      <Header 
        user={user} 
        currentView="landing" 
        onNavigate={onNavigate} 
        onSignIn={onSignIn} 
        onSignOut={onSignOut} 
      />

      <section style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="hero">
          <div className="glow-orb" />
          <div className="glow-orb" />

          <h1 className="hero-headline">
            Turn meetings into<br /><span>clear decisions.</span>
          </h1>

          <p className="hero-sub">
            SyncScripts uses AI to summarize your meeting transcripts, extract action items, and surface what actually matters - in seconds.
          </p>

          <div className="hero-ctas">
            <button type="button" className="btn-primary btn-lg" onClick={() => onNavigate('app')}>
              {user ? 'Go to App' : 'Start for free'}
              <ArrowIcon />
            </button>
            <a href="#how" className="btn-outline btn-lg">See how it works</a>
          </div>

          <HeroSlideshow />
        </div>
      </section>



      <section id="features">
        <div className="section-inner">
          <div className="section-tag">Features</div>
          <h2 className="section-title">Everything your scrum team needs</h2>
          <p className="section-sub">Stop sifting through hour-long meeting recordings. SyncScripts turns raw transcripts into structured intelligence.</p>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon" aria-hidden>
                <svg viewBox="0 0 24 24"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" /></svg>
              </div>
              <div className="feature-title">AI Summarization</div>
              <div className="feature-desc">Paste any transcript and get a crisp, structured summary with context preserved. Powered by Gemini Pro.</div>
            </div>
            <div className="feature-card">
              <div className="feature-icon" aria-hidden>
                <svg viewBox="0 0 24 24"><path d="M8 6h13" /><path d="M8 12h13" /><path d="M8 18h13" /><path d="M3 6h.01" /><path d="M3 12h.01" /><path d="M3 18h.01" /></svg>
              </div>
              <div className="feature-title">Action Item Detection</div>
              <div className="feature-desc">Automatically extracts tasks, owners, and deadlines from unstructured conversation - no manual tagging needed.</div>
            </div>
            <div className="feature-card">
              <div className="feature-icon" aria-hidden>
                <svg viewBox="0 0 24 24"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.292-6.292a2.426 2.426 0 0 0 0-3.42z" /><path d="M7.5 7.5h.01" /></svg>
              </div>
              <div className="feature-title">Engineering task detection</div>
              <div className="feature-desc">AI identifies technical tasks, assigns them to contributors, and provides standard story-point estimations automatically.</div>
            </div>
            <div className="feature-card">
              <div className="feature-icon" aria-hidden>
                <svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
              </div>
              <div className="feature-title">Zero-config Export</div>
              <div className="feature-desc">Instantly copy formatted JSON or plain text for Notion, Confluence, and Jira. No integration wait-times or OAuth setups.</div>
            </div>
            <div className="feature-card">
              <div className="feature-icon" aria-hidden>
                <svg viewBox="0 0 24 24"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
              </div>
              <div className="feature-title">Private by Default</div>
              <div className="feature-desc">Your transcripts are never stored unless you choose to save them. Zero-retention mode available on all plans.</div>
            </div>
            <div className="feature-card">
              <div className="feature-icon" aria-hidden>
                <svg viewBox="0 0 24 24"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" /></svg>
              </div>
              <div className="feature-title">Instant Results</div>
              <div className="feature-desc">Average processing time under 4 seconds. No queues, no waiting. Built for teams moving fast.</div>
            </div>
          </div>
        </div>
      </section>

      <section id="how" style={{ borderTop: '1px solid var(--border-soft)' }}>
        <div className="section-inner">
          <div className="section-tag">How it works</div>
          <h2 className="section-title">From raw transcript to team clarity</h2>
          <p className="section-sub">Three steps. Under a minute.</p>

          <div className="steps">
            <div className="step">
              <div className="step-num">01 <div className="step-line" /></div>
              <div className="step-title">Paste your transcript</div>
              <div className="step-desc">Copy the meeting transcript from Zoom, Google Meet, Teams, or any other platform. No integration required.</div>
            </div>
            <div className="step">
              <div className="step-num">02 <div className="step-line" /></div>
              <div className="step-title">AI does the work</div>
              <div className="step-desc">SyncScripts creates high-level summaries, assignee-linked action items, and estimated engineering tasks - in seconds.</div>
            </div>
            <div className="step">
              <div className="step-num">03 <div className="step-line" /></div>
              <div className="step-title">Paste to your workflow</div>
              <div className="step-desc">Quick-copy formatted output for JIRA, Notion, or Confluence. Zero manual data entry or integration required.</div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" style={{ borderTop: '1px solid var(--border-soft)' }}>
        <div className="section-inner">
          <div className="section-tag">Pricing</div>
          <h2 className="section-title" style={{ textAlign: 'center', margin: '0 auto 12px' }}>Simple, honest pricing</h2>
          <p className="section-sub" style={{ textAlign: 'center', margin: '0 auto 56px' }}>Start free. Upgrade when your team grows.</p>

          <div className="pricing-grid">
            <div className="pricing-card">
              <div className="plan-tag featured-tag">Free - Beta</div>
              <div className="plan-price"><sup>₹</sup>0</div>
              <div className="plan-period">forever</div>
              <div className="plan-divider" />
              <ul className="plan-features">
                <li>3 summaries / month</li>
                <li>Action item detection</li>
                <li>Engineering task estimation</li>
                <li>Quick copy exports</li>
              </ul>
              <button type="button" className="plan-cta plan-cta-ghost" onClick={() => onNavigate('app')}>Get started free</button>
            </div>

            <div className="pricing-card featured">
              <div className="plan-tag">Pro</div>
              <div className="plan-price"><sup>₹</sup>399</div>
              <div className="plan-period">per month, billed monthly</div>
              <div className="plan-divider" />
              <ul className="plan-features">
                <li>Unlimited summaries</li>
                <li>Smart tagging &amp; search</li>
                <li>Notion / Jira export</li>
                <li>Priority AI processing</li>
                <li>30-day history</li>
              </ul>
              <button type="button" className="plan-cta plan-cta-accent" onClick={() => onNavigate('coming-soon-pricing')}>Start Pro - ₹399/mo</button>
            </div>

            <div className="pricing-card">
              <div className="plan-tag">Team</div>
              <div className="plan-price"><sup>₹</sup>999</div>
              <div className="plan-period">per month, up to 5 seats</div>
              <div className="plan-divider" />
              <ul className="plan-features">
                <li>Everything in Pro</li>
                <li>Shared team workspace</li>
                <li>Admin controls</li>
                <li>Unlimited history</li>
                <li>Priority support</li>
              </ul>
              <button type="button" className="plan-cta plan-cta-ghost" onClick={() => onNavigate('coming-soon-pricing')}>Start Team plan</button>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-glow" />
        <div className="cta-inner">
          <h2 className="cta-title">Your meetings deserve better notes.</h2>
          <p className="cta-sub">Join teams already using SyncScripts.</p>
          <div className="input-row">
            <input type="email" className="email-input" placeholder="you@company.com" aria-label="Work email" />
            <button type="button" className="btn-primary btn-lg" onClick={() => onNavigate('app')}>
              Get started
              <ArrowIcon />
            </button>
          </div>
          <p style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 14 }}>Free plan available. No credit card needed.</p>
        </div>
      </section>

      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <a href="/" className="nav-logo" style={{ textDecoration: 'none' }} onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                <img src={logoIcon} alt="" width={28} height={28} />
                SyncScripts
              </a>
              <p>AI-powered meeting intelligence for teams that value their time.</p>
            </div>
            <div className="footer-links-simple">
              <a href="/" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Home</a>
              <a href="https://priyanshurawat.co.in" target="_blank" rel="noopener noreferrer">Founder</a>
              <a onClick={() => onNavigate('privacy')} style={{ cursor: 'pointer' }}>Privacy</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 SyncScripts. Priyanshu Rawat. All rights reserved.</p>
            <p style={{ color: 'var(--text-3)' }}>syncscripts.netlify.app</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
