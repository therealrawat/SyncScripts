import type { AppView } from '../navigation';
import Header from './Header';

const ShieldIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

const InfoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

const WarningIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

type Props = { 
  user: any;
  onNavigate: (view: AppView) => void;
  onSignIn: () => void;
  onSignOut: () => void;
};

export default function PrivacyPage({ user, onNavigate, onSignIn, onSignOut }: Props) {
  return (
    <div className="privacy-page">
      <style>{`
        .privacy-page {
          --bg: #09090B;
          --bg-2: #111113;
          --bg-3: #18181B;
          --border: #27272A;
          --border-soft: #1F1F23;
          --text: #FAFAFA;
          --text-2: #A1A1AA;
          --text-3: #52525B;
          --accent: #FFFFFF;
          --accent-dim: rgba(255, 255, 255, 0.1);
          --font: 'Figtree', sans-serif;
          
          background: var(--bg);
          color: var(--text);
          font-family: var(--font);
          min-height: 100vh;
          line-height: 1.7;
          -webkit-font-smoothing: antialiased;
        }

        .privacy-page::before {
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

        .nav-back {
          font-size: 14px;
          color: var(--text-3);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: color 0.15s;
          cursor: pointer;
        }
        .nav-back:hover { color: var(--text-2); }

        .page {
          max-width: 760px;
          margin: 0 auto;
          padding: 120px 24px 96px;
          position: relative;
          z-index: 1;
        }

        .page-header {
          margin-bottom: 56px;
          padding-bottom: 40px;
          border-bottom: 1px solid var(--border-soft);
          animation: fadeUp 0.5s ease both;
        }

        .page-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-2);
          margin-bottom: 14px;
        }

        h1 {
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 800;
          letter-spacing: -2px;
          line-height: 1.05;
          color: #fff;
          margin-bottom: 14px;
        }

        .page-meta {
          font-size: 13px;
          color: var(--text-3);
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .page-meta span { display: flex; align-items: center; gap: 5px; }

        .summary-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 12px;
          margin-bottom: 56px;
          animation: fadeUp 0.5s 0.08s ease both;
        }

        .summary-card {
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 18px 20px;
          background: var(--bg-2);
        }

        .summary-card-icon {
          width: 32px; height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
          background: rgba(255, 255, 255, 0.05);
          color: #FAFAFA;
        }

        .summary-card-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--text);
          margin-bottom: 4px;
        }

        .summary-card-desc {
          font-size: 12px;
          color: var(--text-3);
          line-height: 1.5;
        }

        .toc {
          border: 1px solid var(--border-soft);
          border-radius: 12px;
          background: var(--bg-2);
          padding: 20px 24px;
          margin-bottom: 48px;
          animation: fadeUp 0.5s 0.12s ease both;
        }

        .toc-title {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-3);
          margin-bottom: 14px;
        }

        .toc-list {
          list-style: none;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 4px 24px;
          margin: 0; padding: 0;
        }

        .toc-list li a {
          font-size: 13px;
          color: var(--text-2);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 0;
          transition: color 0.15s;
        }
        .toc-list li a:hover { color: #fff; }

        .toc-num {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-3);
          min-width: 18px;
        }

        .section {
          margin-bottom: 52px;
          scroll-margin-top: 80px;
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .section-num {
          width: 28px; height: 28px;
          border-radius: 7px;
          background: var(--accent-dim);
          border: 1px solid rgba(255, 255, 255, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          color: #fff;
          flex-shrink: 0;
        }

        h2 {
          font-size: 20px;
          font-weight: 700;
          letter-spacing: -0.5px;
          color: var(--text);
        }

        h3 {
          font-size: 15px;
          font-weight: 600;
          color: var(--text);
          margin: 24px 0 10px;
        }

        p {
          font-size: 15px;
          color: var(--text-2);
          line-height: 1.75;
          margin-bottom: 14px;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
          border: 1px solid var(--border);
          border-radius: 10px;
          overflow: hidden;
          margin: 20px 0;
          font-size: 13px;
        }

        .data-table thead tr { background: var(--bg-3); border-bottom: 1px solid var(--border); }

        .data-table th {
          padding: 10px 16px;
          text-align: left;
          font-weight: 600;
          color: var(--text-2);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .data-table td {
          padding: 12px 16px;
          color: var(--text-2);
          border-bottom: 1px solid var(--border-soft);
          vertical-align: top;
          line-height: 1.55;
        }

        .highlight {
          border-radius: 10px;
          padding: 16px 20px;
          margin: 20px 0;
          display: flex;
          gap: 12px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          align-items: flex-start;
        }

        .highlight p { font-size: 14px; margin-bottom: 0; color: #D1D1D1; }

        ul.styled { list-style: none; padding: 0; margin: 12px 0; }

        ul.styled li {
          font-size: 14px;
          color: var(--text-2);
          padding: 5px 0;
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }

        ul.styled li::before {
          content: '';
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #fff;
          margin-top: 8px;
          flex-shrink: 0;
        }

        .section-divider {
          height: 1px;
          background: var(--border-soft);
          margin: 0 0 52px;
        }

        .contact-card {
          border: 1px solid var(--border);
          border-radius: 12px;
          background: var(--bg-2);
          padding: 24px 28px;
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
          margin-top: 20px;
        }

        .contact-avatar {
          width: 44px; height: 44px;
          border-radius: 50%;
          background: var(--accent-dim);
          border: 1px solid rgba(255, 255, 255, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 15px;
          color: #fff;
          flex-shrink: 0;
        }

        footer {
          border-top: 1px solid var(--border-soft);
          padding: 28px 24px;
          text-align: center;
        }

        footer p { font-size: 13px; color: var(--text-3); margin-bottom: 0; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 600px) {
          .nav-inner { padding: 0 16px; }
          .page { padding: 100px 16px 64px; }
          .summary-grid { grid-template-columns: 1fr; }
          .toc-list { grid-template-columns: 1fr; }
          .contact-card { flex-direction: column; text-align: center; }
        }
      `}</style>

      <Header 
        user={user} 
        currentView="privacy" 
        onNavigate={onNavigate} 
        onSignIn={onSignIn} 
        onSignOut={onSignOut} 
      />

      <div className="page">
        <div className="page-header">
          <div className="page-tag">
            <ShieldIcon />
            Legal
          </div>
          <h1>Privacy Policy</h1>
          <div className="page-meta">
            <span><CalendarIcon /> Effective: April 5, 2026</span>
            <span><ClockIcon /> Last updated: April 5, 2026</span>
          </div>
        </div>

        <div className="summary-grid">
          <div className="summary-card">
            <div className="summary-card-icon"><ShieldIcon /></div>
            <div className="summary-card-title">Your transcripts are safe</div>
            <div className="summary-card-desc">Processed in memory, never stored without your action.</div>
          </div>
          <div className="summary-card">
            <div className="summary-card-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
              </svg>
            </div>
            <div className="summary-card-title">No data selling</div>
            <div className="summary-card-desc">We never sell or share your data with advertisers.</div>
          </div>
          <div className="summary-card">
            <div className="summary-card-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/><line x1="12" y1="12" x2="12" y2="12"/>
              </svg>
            </div>
            <div className="summary-card-title">Payments via Razorpay</div>
            <div className="summary-card-desc">We never see or store your card details directly.</div>
          </div>
          <div className="summary-card">
            <div className="summary-card-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <div className="summary-card-title">You&apos;re in control</div>
            <div className="summary-card-desc">Request deletion of your data anytime, no questions asked.</div>
          </div>
        </div>

        <div className="toc">
          <div className="toc-title">Contents</div>
          <ul className="toc-list">
            <li><a href="#s1"><span className="toc-num">01</span> Who we are</a></li>
            <li><a href="#s2"><span className="toc-num">02</span> What we collect</a></li>
            <li><a href="#s3"><span className="toc-num">03</span> How we use your data</a></li>
            <li><a href="#s4"><span className="toc-num">04</span> Meeting transcripts</a></li>
            <li><a href="#s5"><span className="toc-num">05</span> Payments</a></li>
            <li><a href="#s6"><span className="toc-num">06</span> Data sharing</a></li>
            <li><a href="#s7"><span className="toc-num">07</span> Data retention</a></li>
            <li><a href="#s8"><span className="toc-num">08</span> Your rights</a></li>
            <li><a href="#s9"><span className="toc-num">09</span> Cookies</a></li>
            <li><a href="#s10"><span className="toc-num">10</span> Contact us</a></li>
          </ul>
        </div>

        <div className="content">
          <div className="section" id="s1">
            <div className="section-header">
              <div className="section-num">01</div>
              <h2>Who we are</h2>
            </div>
            <p>SyncScript (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is an AI-powered meeting summarization tool available at <strong style={{ color: 'var(--text)' }}>syncscripts.netlify.app</strong>. We help teams - especially scrum masters and managers - turn raw meeting transcripts into structured summaries, action items, and decisions.</p>
            <p>This Privacy Policy explains what personal data we collect, why we collect it, and how we handle it when you use SyncScript.</p>
          </div>

          <div className="section-divider"></div>

          <div className="section" id="s2">
            <div className="section-header">
              <div className="section-num">02</div>
              <h2>What we collect</h2>
            </div>
            <p>We only collect what is necessary to provide and improve the service.</p>

            <table className="data-table">
              <thead>
                <tr>
                  <th>Data type</th>
                  <th>What exactly</th>
                  <th>Why</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Email address</strong></td>
                  <td>Your email used to sign in or subscribe to updates</td>
                  <td>Authentication, account communication, plan notifications</td>
                </tr>
                <tr>
                  <td><strong>Profile info</strong></td>
                  <td>Display name, profile photo (if provided via Google sign-in)</td>
                  <td>Personalise your dashboard experience</td>
                </tr>
                <tr>
                  <td><strong>Meeting transcripts</strong></td>
                  <td>Text you paste or upload into the summarizer</td>
                  <td>Processed by AI to generate summaries - not stored by default</td>
                </tr>
                <tr>
                  <td><strong>Payment info</strong></td>
                  <td>Subscription status, plan tier, transaction ID</td>
                  <td>Manage your billing - actual card data handled by Razorpay</td>
                </tr>
                <tr>
                  <td><strong>Usage data</strong></td>
                  <td>Pages visited, summaries generated, feature interactions</td>
                  <td>Improve the product and fix bugs</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="section-divider"></div>

          <div className="section" id="s3">
            <div className="section-header">
              <div className="section-num">03</div>
              <h2>How we use your data</h2>
            </div>
            <p>We use the information we collect for the following purposes:</p>
            <ul className="styled">
              <li>To create and manage your account securely via Supabase Auth</li>
              <li>To process meeting transcripts and return AI-generated summaries</li>
              <li>To manage your subscription and billing through Razorpay</li>
              <li>To send you account-related emails (plan updates, usage alerts)</li>
              <li>To notify you when new features or paid plans become available - only if you opted in</li>
              <li>To understand how the product is used so we can improve it</li>
            </ul>
            <div className="highlight">
              <InfoIcon />
              <p>We do not use your data for advertising, profiling, or any purpose beyond what is listed above.</p>
            </div>
          </div>

          <div className="section-divider"></div>

          <div className="section" id="s4">
            <div className="section-header">
              <div className="section-num">04</div>
              <h2>Meeting transcripts</h2>
            </div>
            <p>Your meeting transcripts are the most sensitive data you share with us. Here is exactly how they are handled:</p>

            <h3>Processing</h3>
            <p>When you paste a transcript, it is sent to our AI provider (Google Gemini, Anthropic Claude) to generate a summary. This transmission is encrypted in transit. The transcript is processed in memory and is not stored on our servers after the response is returned.</p>

            <h3>Saved summaries</h3>
            <p>If you choose to save a summary to your history, only the AI-generated output is stored - not your original transcript - unless you explicitly save both.</p>

            <div className="highlight">
              <WarningIcon />
              <p>Avoid pasting transcripts that contain sensitive personal information, confidential business data, or anything your organisation restricts from third-party tools.</p>
            </div>

            <h3>Third-party AI processing</h3>
            <p>Transcript data is processed by Google Gemini and Anthropic Claude API. Google&apos;s data processing terms apply to this step. We recommend reviewing <a href="https://ai.google.dev/terms" style={{ color: 'var(--text)' }}>Google&apos;s AI terms</a> if your organisation has specific compliance requirements.</p>
          </div>

          <div className="section-divider"></div>

          <div className="section" id="s5">
            <div className="section-header">
              <div className="section-num">05</div>
              <h2>Payments</h2>
            </div>
            <p>All payment processing is handled by <strong style={{ color: 'var(--text)' }}>Razorpay</strong>, a PCI-DSS compliant payment gateway. We do not collect, see, or store your credit or debit card numbers.</p>
            <p>What we do store on our end is your subscription status (Free, Pro, Team), your plan start date, and your Razorpay customer/subscription ID for billing management.</p>
            <div className="highlight">
              <InfoIcon />
              <p>For any billing disputes or card-related queries, please contact Razorpay support directly or reach us at the email below and we will assist you.</p>
            </div>
          </div>

          <div className="section-divider"></div>

          <div className="section" id="s6">
            <div className="section-header">
              <div className="section-num">06</div>
              <h2>Data sharing</h2>
            </div>
            <p>We do not sell, rent, or trade your personal data. We only share data with the following trusted service providers, strictly to operate the product:</p>

            <table className="data-table">
              <thead>
                <tr>
                  <th>Provider</th>
                  <th>Purpose</th>
                  <th>Data shared</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Supabase</strong></td>
                  <td>Authentication, database, user management</td>
                  <td>Email, profile info, subscription status</td>
                </tr>
                <tr>
                  <td><strong>Google Gemini, Anthropic Claude</strong></td>
                  <td>AI transcript processing</td>
                  <td>Meeting transcript text (not linked to your identity)</td>
                </tr>
                <tr>
                  <td><strong>Razorpay</strong></td>
                  <td>Payment processing</td>
                  <td>Email, billing details for subscription</td>
                </tr>
                <tr>
                  <td><strong>Netlify</strong></td>
                  <td>Website hosting</td>
                  <td>Standard web request logs (IP, browser)</td>
                </tr>
              </tbody>
            </table>

            <p>We may disclose your data if required by law or to protect the safety, rights, or property of SyncScript and its users.</p>
          </div>

          <div className="section-divider"></div>

          <div className="section" id="s7">
            <div className="section-header">
              <div className="section-num">07</div>
              <h2>Data retention</h2>
            </div>
            <p>We retain your data only as long as necessary:</p>
            <ul className="styled">
              <li><strong style={{ color: 'var(--text)' }}>Account data</strong> - retained while your account is active. Deleted within 30 days of account deletion request.</li>
              <li><strong style={{ color: 'var(--text)' }}>Transcript data</strong> - not stored by default. If saved, retained until you delete it or your account.</li>
              <li><strong style={{ color: 'var(--text)' }}>Billing records</strong> - retained for 7 years as required by Indian financial regulations.</li>
              <li><strong style={{ color: 'var(--text)' }}>Usage logs</strong> - anonymised and retained for up to 90 days for analytics.</li>
            </ul>
          </div>

          <div className="section-divider"></div>

          <div className="section" id="s8">
            <div className="section-header">
              <div className="section-num">08</div>
              <h2>Your rights</h2>
            </div>
            <p>You have the following rights over your personal data at any time:</p>
            <ul className="styled">
              <li><strong style={{ color: 'var(--text)' }}>Access</strong> - request a copy of the data we hold about you</li>
              <li><strong style={{ color: 'var(--text)' }}>Correction</strong> - ask us to fix any inaccurate information</li>
              <li><strong style={{ color: 'var(--text)' }}>Deletion</strong> - request full deletion of your account and associated data</li>
              <li><strong style={{ color: 'var(--text)' }}>Portability</strong> - receive your saved summaries in a machine-readable format</li>
              <li><strong style={{ color: 'var(--text)' }}>Opt-out</strong> - unsubscribe from marketing emails at any time via the link in any email</li>
            </ul>
            <p>To exercise any of these rights, email us at the address in Section 10. We will respond within 7 business days.</p>
          </div>

          <div className="section-divider"></div>

          <div className="section" id="s9">
            <div className="section-header">
              <div className="section-num">09</div>
              <h2>Cookies</h2>
            </div>
            <p>SyncScript uses minimal cookies. We use session cookies to keep you signed in, and Supabase may set cookies as part of the authentication flow. We do not use advertising or tracking cookies.</p>
            <p>You can clear cookies at any time from your browser settings. Doing so will sign you out of your account.</p>
          </div>

          <div className="section-divider"></div>

          <div className="section" id="s10">
            <div className="section-header">
              <div className="section-num">10</div>
              <h2>Contact us</h2>
            </div>
            <p>If you have any questions about this Privacy Policy, want to exercise your data rights, or have a concern about how we handle your information, please reach out:</p>

            <div className="contact-card">
              <div className="contact-avatar">PR</div>
              <div className="contact-info">
                <p style={{ fontWeight: 600, color: 'var(--text)', marginBottom: '4px' }}>Priyanshu Rawat</p>
                <p style={{ fontSize: '14px', color: 'var(--text-3)', marginBottom: '4px' }}>Founder, SyncScript</p>
                <a href="mailto:mapandrum@gmail.com" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500 }}>mapandrum@gmail.com</a>
              </div>
            </div>

            <p style={{ marginTop: '20px' }}>We take privacy seriously and will always respond promptly and transparently.</p>
          </div>
        </div>
      </div>

      <footer>
        <p>© 2026 SyncScript. . Priyanshu Rawat. All rights reserved.</p>
      </footer>
    </div>
  );
}
