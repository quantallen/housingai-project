import React from 'react';
import Image from 'next/image'; // Add Image import
import { Language } from '../globals.d';
import '../header.css';

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
      // Use type assertion to tell TypeScript this is an HTMLElement
      const htmlElement = targetElement as HTMLElement;
      
      // Create type-safe style method
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
          <Image 
            src="https://imgur.com/RCJfv2m.png" 
            alt="艾倫房仲團隊" 
            className="company-logo"
            width={150}
            height={35}
            priority
          />
        </div>

        <button 
          className={`nav-toggle ${navActive ? 'active' : ''}`} 
          onClick={toggleNav} 
          aria-label="Toggle navigation"
        >
          ☰
        </button>

        {/* Navigation menu - matching test.html layout */}
        <nav className={`navigation ${navActive ? 'active' : ''}`}>
          <a 
            href="#about" 
            className="nav-link" 
            onClick={(e) => handleNavClick(e, '#about')}
          >
            <span className="en">About Us</span>
            <span className="zh">關於我們</span>
          </a>
          <a 
            href="#services" 
            className="nav-link" 
            onClick={(e) => handleNavClick(e, '#services')}
          >
            <span className="en">Services</span>
            <span className="zh">服務項目</span>
          </a>
          <a 
            href="#team" 
            className="nav-link" 
            onClick={(e) => handleNavClick(e, '#team')}
          >
            <span className="en">Our Team</span>
            <span className="zh">專業團隊</span>
          </a>
          <a 
            href="#properties" 
            className="nav-link" 
            onClick={(e) => handleNavClick(e, '#properties')}
          >
            <span className="en">Properties</span>
            <span className="zh">精選房源</span>
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
      
      {/* Menu overlay */}
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