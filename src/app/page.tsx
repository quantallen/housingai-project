'use client';

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MatrixCanvas from './components/MatrixCanvas';
import BootScreen from './components/BootScreen';
import MainPage from './components/MainPage';
import HeroSection from './components/HeroSection';
import TeamSection from './components/TeamSection';
import ContactSection from './components/ContactSection';
import ComingSoonPage from './components/ComingSoonPage';

// Import style files
import './globals.css';
import './bootscreen.css';
import './header.css';
import './hero-section.css';
import './solutions.css';
import './team.css';
import './contact.css';
import './footer.css';
import './coming-soon.css'; // 確保添加這個文件
import { Language } from './globals.d';

// Ensure TypeScript can recognize window.matrixInterval
declare global {
  interface Window {
    matrixInterval: number | null;
  }
}

export default function Home() {
  const [currentLang, setCurrentLang] = useState<Language>('zh');
  const [bootComplete, setBootComplete] = useState<boolean>(false);
  const [contentFaded, setContentFaded] = useState<boolean>(false);
  const [navActive, setNavActive] = useState<boolean>(false);
  const [showComingSoon, setShowComingSoon] = useState<boolean>(false);
  const [comingSoonService, setComingSoonService] = useState<string>('');

  // 處理服務點擊事件
  const handleServiceClick = (service: string) => {
    setComingSoonService(service);
    setShowComingSoon(true);
    // 將頁面滾動到頂部
    window.scrollTo(0, 0);
    // 防止背景滾動
    document.body.style.overflow = 'hidden';
  };

  // 返回主頁
  const handleBackToHome = () => {
    setShowComingSoon(false);
    document.body.style.overflow = '';
  };

  // Handle language change
  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    
    // Update body class for language-specific styling
    document.body.className = `lang-${lang}`;
    
    // Fix language display for elements
    fixLanguageDisplay(lang);
  };

  // Fix language display for elements
  const fixLanguageDisplay = (lang: Language) => {
    // Hide all language elements
    document.querySelectorAll('.en, .zh').forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.display = 'none';
      }
    });
    
    // Show current language elements
    document.querySelectorAll(`.${lang}`).forEach((el) => {
      if (el instanceof HTMLElement) {
        if (el.tagName === 'SPAN') {
          el.style.display = 'inline';
        } else if (el.tagName === 'LI') {
          el.style.display = 'list-item';
        } else {
          el.style.display = 'block';
        }
      }
    });
  };
  
  // Toggle mobile navigation
  const toggleNav = () => {
    setNavActive(!navActive);
    
    if (!navActive) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('menu-open');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('menu-open');
    }
  };

  // Complete boot sequence
  const completeBootSequence = () => {
    // Set boot complete
    setBootComplete(true);
    
    // Fade in content after a short delay
    setTimeout(() => {
      setContentFaded(true);
      
      // Ensure correct language display after boot
      fixLanguageDisplay(currentLang);
    }, 100);
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && navActive) {
        setNavActive(false);
        document.body.style.overflow = '';
        document.body.classList.remove('menu-open');
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [navActive]);

  // Initialize language display as soon as component mounts
  useEffect(() => {
    if (bootComplete) {
      fixLanguageDisplay(currentLang);
    }
  }, [bootComplete, currentLang]);

  // Initialize MatrixCanvas
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        if (window.matrixInterval === undefined) {
          window.matrixInterval = null;
        }
      }
    } catch (error) {
      console.error("Error initializing matrixInterval:", error);
    }
    
    return () => {
      try {
        if (typeof window !== 'undefined' && window.matrixInterval !== null) {
          clearInterval(window.matrixInterval);
          window.matrixInterval = null;
        }
      } catch (error) {
        console.error("Error cleaning up matrixInterval:", error);
      }
    };
  }, []);

  // Add language persistence
  useEffect(() => {
    // Check if language preference is stored in localStorage
    const savedLang = localStorage.getItem('site-language');
    if (savedLang && (savedLang === 'zh' || savedLang === 'en')) {
      setCurrentLang(savedLang as Language);
    }
  }, []);

  // Save language preference when changed
  useEffect(() => {
    localStorage.setItem('site-language', currentLang);
  }, [currentLang]);

  // Add CSS variables to document root
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--glow-color', 'rgba(0, 255, 140, 0.4)');
    root.style.setProperty('--glass-bg', 'rgba(0, 10, 2, 0.7)');
    root.style.setProperty('--glass-border', 'rgba(0, 255, 140, 0.2)');
    root.style.setProperty('--primary-text', 'rgba(255, 255, 255, 0.9)');
    root.style.setProperty('--language-active', '#00ff8c');
    
    // Add a gradient background to body
    document.body.style.background = 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)';
    document.body.style.minHeight = '100vh';
    document.body.style.margin = '0';
    document.body.style.fontFamily = "'Exo 2', 'Noto Sans TC', sans-serif";
    document.body.style.color = 'white';
  }, []);

  // Render with error boundary
  try {
    // 如果顯示 ComingSoon 頁面
    if (showComingSoon) {
      return (
        <div className={`lang-${currentLang}`}>
          {bootComplete && <MatrixCanvas />}
          <ComingSoonPage 
            service={comingSoonService} 
            onBackClick={handleBackToHome}
            lang={currentLang}
          />
        </div>
      );
    }

    // 否則顯示主頁
    return (
      <div className={`lang-${currentLang}`}>
        {/* Conditionally render MatrixCanvas to prevent resource consumption during boot */}
        {bootComplete && <MatrixCanvas />}
        
        {/* Boot screen component */}
        {!bootComplete && (
          <BootScreen onComplete={completeBootSequence} />
        )}

        <Header 
          currentLang={currentLang} 
          onLanguageChange={handleLanguageChange} 
          navActive={navActive}
          toggleNav={toggleNav}
        />

        <main>
          {/* Hero Section */}
          <HeroSection fadeIn={contentFaded} />
          
          {/* Main Page with solution cards */}
          <MainPage 
            lang={currentLang} 
            fadeIn={contentFaded} 
            onServiceClick={handleServiceClick}
          />
          
          {/* Team Section */}
          <TeamSection fadeIn={contentFaded} />
          
          {/* Contact Section */}
          <ContactSection fadeIn={contentFaded} />
        </main>
        
        <Footer lang={currentLang} />
      </div>
    );
  } catch (error) {
    // Display basic content if rendering fails
    console.error("Error rendering page:", error);
    return (
      <div>
        <h1>AI解決方案中心</h1>
        <p>抱歉，頁面載入出現問題。請刷新頁面重試。</p>
        <button onClick={() => window.location.reload()}>重新載入</button>
      </div>
    );
  }
}