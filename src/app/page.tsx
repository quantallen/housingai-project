'use client';

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import TeamSection from './components/TeamSection';
import PropertiesSection from './components/PropertiesSection';
import ChatbotSection from './components/ChatbotSection'; // 新增聊天機器人部分
import Footer from './components/Footer';
import MatrixCanvas from './components/MatrixCanvas';
import BootScreen from './components/BootScreen';
// Import style files
import './properties.css';
import './header.css';
import './services.css';
import './bootscreen.css';
import './chatbot.css'; // 新增聊天機器人樣式
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

  // Add language persistence (optional)
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

  // Render with error boundary
  try {
    return (
      <div className={`lang-${currentLang}`}>
        <div className="gradient-bg"></div>
        
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
          <HeroSection fadeIn={contentFaded} />
          <AboutSection fadeIn={contentFaded} />
          <ServicesSection fadeIn={contentFaded} />
          <TeamSection fadeIn={contentFaded} />
          <PropertiesSection lang={currentLang} fadeIn={contentFaded} />
          <ChatbotSection lang={currentLang} fadeIn={contentFaded} /> {/* 新增聊天機器人部分 */}
        </main>
        <Footer lang={currentLang} />
      </div>
    );
  } catch (error) {
    // Display basic content if rendering fails
    console.error("Error rendering page:", error);
    return (
      <div>
        <h1>艾倫房仲團隊</h1>
        <p>抱歉，頁面載入出現問題。請刷新頁面重試。</p>
        <button onClick={() => window.location.reload()}>重新載入</button>
      </div>
    );
  }
}