import React from 'react';
import { Language } from '../globals.d';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  navActive: boolean;
  toggleNav: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  currentLang, 
  onLanguageChange, 
  navActive,
  toggleNav 
}) => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      // Type assertion to HTMLElement
      const htmlElement = targetElement as HTMLElement;
      
      // Set scroll margin top for better positioning
      htmlElement.setAttribute('style', `scroll-margin-top: 80px`);
      
      window.scrollTo({
        top: htmlElement.offsetTop - 50, // Reduce offset to fit smaller header
        behavior: 'smooth'
      });
      
      // Close navigation menu if it's open on mobile
      if (navActive) {
        toggleNav();
      }
    }
  };

  return (
    <>
      <header>
        <div className="logo">
          <img 
            src="https://imgur.com/RCJfv2m.png" 
            alt="AI創新解決方案" 
            className="company-logo"
            width={150}
            height={35}
          />
        </div>

        <button 
          className={`nav-toggle ${navActive ? 'active' : ''}`} 
          onClick={toggleNav} 
          aria-label="Toggle navigation"
        >
          ☰
        </button>

        {/* Navigation menu - updated with new sections */}
        <nav className={`navigation ${navActive ? 'active' : ''}`}>
          <a 
            href="#solutions" 
            className="nav-link" 
            onClick={(e) => handleNavClick(e, '#solutions')}
          >
            <span className="en" style={{ display: currentLang === 'en' ? 'inline' : 'none' }}>Solutions</span>
            <span className="zh" style={{ display: currentLang === 'zh' ? 'inline' : 'none' }}>解決方案</span>
          </a>
          <a 
            href="#about" 
            className="nav-link" 
            onClick={(e) => handleNavClick(e, '#about')}
          >
            <span className="en" style={{ display: currentLang === 'en' ? 'inline' : 'none' }}>About Us</span>
            <span className="zh" style={{ display: currentLang === 'zh' ? 'inline' : 'none' }}>關於我們</span>
          </a>
          <a 
            href="#contact" 
            className="nav-link" 
            onClick={(e) => handleNavClick(e, '#contact')}
          >
            <span className="en" style={{ display: currentLang === 'en' ? 'inline' : 'none' }}>Contact</span>
            <span className="zh" style={{ display: currentLang === 'zh' ? 'inline' : 'none' }}>聯絡我們</span>
          </a>
        </nav>

        {/* Language selector */}
        <div className="language-selector">
          <button 
            className={`language-btn ${currentLang === 'zh' ? 'active' : ''}`}
            onClick={() => onLanguageChange('zh')}
            aria-label="中文"
          >
            中文
          </button>
          <button 
            className={`language-btn ${currentLang === 'en' ? 'active' : ''}`}
            onClick={() => onLanguageChange('en')}
            aria-label="English"
          >
            EN
          </button>
        </div>
      </header>
      
      {/* Menu overlay for mobile */}
      {navActive && (
        <div 
          className={`menu-overlay ${navActive ? 'active' : ''}`} 
          onClick={toggleNav}
        />
      )}
    </>
  );
};

export default Header;