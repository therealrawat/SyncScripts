import logoIcon from '../assets/logo.svg';
import type { AppView } from '../navigation';
import '../landing.css';

const ArrowIcon = () => (
  <svg className="icon-arrow" viewBox="0 0 24 24" aria-hidden>
    <path d="M5 12h14" />
    <path d="M12 5l7 7-7 7" />
  </svg>
);

type Props = { onNavigate: (view: AppView) => void };

export default function LandingPage({ onNavigate }: Props) {
  return (
    <div className="landing-page">
      <nav>
        <div className="nav-inner">
          <a href="/" className="nav-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <img src={logoIcon} alt="" width={28} height={28} />
            SyncScript
          </a>
          <ul className="nav-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#how">How it works</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Blog</a></li>
          </ul>
          <div className="nav-actions">
            <button type="button" className="btn-ghost" onClick={() => onNavigate('auth')}>Sign in</button>
            <button type="button" className="btn-primary" onClick={() => onNavigate('app')}>
              Get started free
              <ArrowIcon />
            </button>
          </div>
        </div>
      </nav>

      <section style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="hero">
          <div className="glow-orb" />
          <div className="glow-orb" />

          <div className="badge">
            <span className="badge-dot" />
            Now with AI action item detection &nbsp;·&nbsp; New
          </div>

          <h1 className="hero-headline">
            Turn meetings into<br /><span>clear decisions.</span>
          </h1>

          <p className="hero-sub">
            SyncScript uses AI to summarize your meeting transcripts, extract action items, and surface what actually matters — in seconds.
          </p>

          <div className="hero-ctas">
            <button type="button" className="btn-primary btn-lg" onClick={() => onNavigate('app')}>
              Start for free
              <ArrowIcon />
            </button>
            <a href="#how" className="btn-outline btn-lg">See how it works</a>
          </div>

          <div className="hero-preview">
            <div className="preview-bar">
              <div className="dot dot-r" />
              <div className="dot dot-y" />
              <div className="dot dot-g" />
              <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 10 }}>Sprint Planning — April 5, 2026</span>
            </div>
            <div className="preview-body">
              <div>
                <div className="preview-label">Transcript</div>
                <div className="preview-text">
                  ...so we&apos;ve got the sprint capacity at 42 points. Rohan, can you pick up the auth refactor ticket? That&apos;s estimated at 8 points. Also, the API gateway work needs a review by Thursday — Priya, that&apos;s on you. Let&apos;s also move the billing fix up in priority, we&apos;ve had three client complaints this week...
                </div>
              </div>
              <div className="divider-v" />
              <div>
                <div className="preview-label">AI Summary</div>
                <div className="summary-item">
                  <div className="summary-bullet" />
                  <span>Sprint capacity set at 42 story points</span>
                </div>
                <div className="summary-item">
                  <div className="summary-bullet" />
                  <span>Rohan assigned auth refactor (8 pts)</span>
                </div>
                <div className="summary-item">
                  <div className="summary-bullet" />
                  <span>Priya to review API gateway by Thursday</span>
                </div>
                <div className="summary-item">
                  <div className="summary-bullet" />
                  <span>Billing fix escalated — 3 client complaints</span>
                </div>
                <div style={{ marginTop: 14 }}>
                  <div className="preview-label">Tags</div>
                  <span className="chip">Sprint Planning</span>
                  <span className="chip">Action Items</span>
                  <span className="chip">Escalation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="logos">
        <div className="logos-label">Trusted by teams at</div>
        <div className="logos-inner">
          <span>Atlassian</span>
          <span>Notion</span>
          <span>Linear</span>
          <span>Vercel</span>
          <span>Figma</span>
          <span>Stripe</span>
        </div>
      </div>

      <section id="features">
        <div className="section-inner">
          <div className="section-tag">Features</div>
          <h2 className="section-title">Everything your scrum team needs</h2>
          <p className="section-sub">Stop sifting through hour-long meeting recordings. SyncScript turns raw transcripts into structured intelligence.</p>

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
              <div className="feature-desc">Automatically extracts tasks, owners, and deadlines from unstructured conversation — no manual tagging needed.</div>
            </div>
            <div className="feature-card">
              <div className="feature-icon" aria-hidden>
                <svg viewBox="0 0 24 24"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.292-6.292a2.426 2.426 0 0 0 0-3.42z" /><path d="M7.5 7.5h.01" /></svg>
              </div>
              <div className="feature-title">Smart Tagging</div>
              <div className="feature-desc">Topics, decisions, and blockers are auto-labeled so you can filter and search across all your meetings instantly.</div>
            </div>
            <div className="feature-card">
              <div className="feature-icon" aria-hidden>
                <svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
              </div>
              <div className="feature-title">One-click Export</div>
              <div className="feature-desc">Export summaries to Notion, Confluence, Jira, or plain markdown. Your workflow, not ours.</div>
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
              <div className="step-desc">SyncScript extracts summaries, action items, decisions, and blockers — structured and ready to share.</div>
            </div>
            <div className="step">
              <div className="step-num">03 <div className="step-line" /></div>
              <div className="step-title">Share with your team</div>
              <div className="step-desc">Export directly to your project management tool or share a clean link with stakeholders in one click.</div>
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
              <div className="plan-tag">Free</div>
              <div className="plan-price"><sup>₹</sup>0</div>
              <div className="plan-period">forever</div>
              <div className="plan-divider" />
              <ul className="plan-features">
                <li>10 summaries / month</li>
                <li>Action item detection</li>
                <li>Copy &amp; paste export</li>
                <li>7-day history</li>
              </ul>
              <button type="button" className="plan-cta plan-cta-ghost" onClick={() => onNavigate('app')}>Get started free</button>
            </div>

            <div className="pricing-card featured">
              <div className="plan-tag featured-tag">Pro — Most popular</div>
              <div className="plan-price"><sup>₹</sup>499</div>
              <div className="plan-period">per month, billed monthly</div>
              <div className="plan-divider" />
              <ul className="plan-features">
                <li>Unlimited summaries</li>
                <li>Smart tagging &amp; search</li>
                <li>Notion / Jira export</li>
                <li>Priority AI processing</li>
                <li>30-day history</li>
              </ul>
              <button type="button" className="plan-cta plan-cta-accent" onClick={() => onNavigate('pricing')}>Start Pro — ₹499/mo</button>
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
              <button type="button" className="plan-cta plan-cta-ghost" onClick={() => onNavigate('pricing')}>Start Team plan</button>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-glow" />
        <div className="cta-inner">
          <h2 className="cta-title">Your meetings deserve better notes.</h2>
          <p className="cta-sub">Join 2,000+ teams already using SyncScript.</p>
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
                SyncScript
              </a>
              <p>AI-powered meeting intelligence for teams that value their time.</p>
            </div>
            <div className="footer-col">
              <h4>Product</h4>
              <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Changelog</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Roadmap</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Developers</h4>
              <ul>
                <li><a href="#" onClick={(e) => e.preventDefault()}>API Docs</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Integrations</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Status</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li><a href="#" onClick={(e) => e.preventDefault()}>About</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Blog</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Privacy</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 SyncScript. Made in India.</p>
            <p style={{ color: 'var(--text-3)' }}>syncscripts.netlify.app</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
