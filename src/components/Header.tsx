import React from 'react';
import type { AppView } from '../navigation';
import logoIcon from '../assets/logo.svg';
import { IconArrowRight, IconArrowLeft } from './ui-icons';
import { useState, useEffect, useRef } from 'react';
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isLanding = currentView === 'landing';
  const isApp = currentView === 'app';
  const isPrivacy = currentView === 'privacy';
  const isPricing = currentView === 'pricing' || currentView === 'coming-soon-pricing';

  const metadata = user?.user_metadata || {};
  const fullName = metadata.full_name || 'User';
  const email = user?.email || '';
  const avatarUrl = metadata.avatar_url;
  const initials = fullName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
          <img src={logoIcon} alt="SyncScripts Logo" />
          <span>SyncScripts</span>
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

        {/* Actions */}
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
                  <button type="button" className="nav-btn-primary nav-desktop-only" onClick={() => onNavigate('app')}>
                    {isApp ? 'New Sync' : 'Go to App'}
                    <IconArrowRight size={16} />
                  </button>

                  <div className="nav-user-container" ref={dropdownRef}>
                    <button
                      className="nav-avatar-btn"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      {avatarUrl ? (
                        <img src={avatarUrl} alt={fullName} className="nav-avatar-img" />
                      ) : (
                        <span className="nav-initials">{initials}</span>
                      )}
                    </button>

                    {isDropdownOpen && (
                      <div className="nav-user-dropdown">
                        <div className="dropdown-header">
                          <span className="dropdown-username">{fullName}</span>
                          <span className="dropdown-email">{email}</span>
                        </div>
                        {/* 

                        <div className="dropdown-section">
                          <div className="dropdown-label">Theme</div>
                          <div className="theme-selector">
                            <button className="theme-option active">
                              <span className="theme-dot"></span>
                              Dark
                            </button>
                            <button className="theme-option">Light</button>
                            <button className="theme-option">Classic Dark</button>
                            <button className="theme-option">System</button>
                          </div>
                        </div> */}

                        <div className="dropdown-section">
                          <button className="dropdown-logout" onClick={() => {
                            setIsDropdownOpen(false);
                            onSignOut();
                          }}>
                            Log out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
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
