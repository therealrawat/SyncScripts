import React from 'react';
import type { AppView } from '../navigation';
import logoIcon from '../assets/logo.svg';
import '../footer.css';

interface FooterProps {
  onNavigate: (view: AppView) => void;
  variant?: 'detailed' | 'minimal';
}

const Footer: React.FC<FooterProps> = ({ 
  onNavigate, 
  variant = 'detailed' 
}) => {
  const currentYear = new Date().getFullYear();

  if (variant === 'minimal') {
    return (
      <footer className="footer-container">
        <div className="footer-inner--minimal">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src={logoIcon} alt="SyncScripts Logo" width={24} height={24} />
            <span style={{ fontWeight: 700, color: 'var(--text-muted)' }}>SyncScripts</span>
          </div>
          <span style={{ fontSize: 13, color: 'var(--text-3)' }}>© {currentYear} Priyanshu Rawat</span>
          <div className="footer-minimal-links">
            <a onClick={() => onNavigate('privacy')}>Privacy</a>
            <a onClick={() => onNavigate('landing')}>Terms</a>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="footer-container">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <a 
              className="nav-logo" 
              onClick={(e) => { e.preventDefault(); onNavigate('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              role="button"
              tabIndex={0}
              style={{ padding: 0, background: 'none', marginBottom: 16 }}
            >
              <img src={logoIcon} alt="SyncScripts Logo" width={28} height={28} />
              SyncScripts
            </a>
            <p>AI-powered meeting intelligence for teams that value their time.</p>
          </div>
          
          <div className="footer-links-simple">
            <a onClick={(e) => { e.preventDefault(); onNavigate('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Home</a>
            <a href="https://priyanshurawat.co.in" target="_blank" rel="noopener noreferrer">Founder</a>
            <a onClick={() => onNavigate('privacy')}>Privacy</a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-copyright">
            © {currentYear} SyncScripts. Priyanshu Rawat. All rights reserved.
          </div>
          <div className="footer-domain">
            syncscripts.netlify.app
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
