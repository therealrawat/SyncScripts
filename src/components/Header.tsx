import React from 'react';
import type { AppView } from '../navigation';
import logoIcon from '../assets/logo.svg';
import { IconArrowRight, IconArrowLeft } from './ui-icons';
import '../header.css';

interface HeaderProps {
  user: any;
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  onSignIn: () => void;
  onSignOut: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  user, 
  currentView, 
  onNavigate, 
  onSignIn, 
  onSignOut 
}) => {
  const isLanding = currentView === 'landing';
  const isApp = currentView === 'app';
  const isPrivacy = currentView === 'privacy';
  const isPricing = currentView === 'pricing' || currentView === 'coming-soon-pricing';

  return (
    <nav className="nav-header">
      <div className="nav-inner">
        {/* Logo Section */}
        <div 
          className="nav-logo" 
          onClick={() => onNavigate('landing')}
          role="button"
          tabIndex={0}
        >
          <img src={logoIcon} alt="SyncScript Logo" />
          <span>SyncScript</span>
          <span className="nav-beta-badge">Beta</span>
        </div>

        {/* Navigation Links */}
        <ul className="nav-links nav-desktop-only">
          {isLanding && (
            <>
              <li><a href="#features">Features</a></li>
              <li><a href="#how">How it works</a></li>
              <li><a onClick={() => onNavigate('coming-soon-pricing')}>Pricing</a></li>
              <li><a onClick={() => onNavigate('privacy')}>Privacy</a></li>
            </>
          )}
          {isApp && (
            <>
              <li><a onClick={() => onNavigate('landing')}>How it works</a></li>
              <li><a onClick={() => onNavigate('landing')}>Docs</a></li>
            </>
          )}
          {isPricing && (
            <>
              <li><a onClick={() => onNavigate('landing')}>Features</a></li>
              <li><a onClick={() => onNavigate('landing')}>How it works</a></li>
              {currentView === 'coming-soon-pricing' && <li><a className="active">Pricing</a></li>}
            </>
          )}
        </ul>

        {/* Search / Back / Actions */}
        <div className="nav-actions">
          {isPrivacy ? (
            <div className="nav-back" onClick={() => onNavigate('landing')}>
              <IconArrowLeft size={14} />
              Back to home
            </div>
          ) : (
            <>
              {user ? (
                <>
                  <button type="button" className="nav-btn-ghost" onClick={onSignOut}>Sign out</button>
                  <button type="button" className="nav-btn-primary nav-desktop-only" onClick={() => onNavigate('app')}>
                    {isApp ? 'New Sync' : 'Go to App'}
                    <IconArrowRight size={16} />
                  </button>
                </>
              ) : (
                <>
                  <button type="button" className="nav-btn-ghost" onClick={onSignIn}>Sign in</button>
                  <button type="button" className="nav-btn-primary nav-desktop-only" onClick={() => onNavigate('app')}>
                    Get started free
                    <IconArrowRight size={16} />
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
