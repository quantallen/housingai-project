import React, { useEffect, useRef } from 'react';

interface HeroSectionProps {
  fadeIn: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ fadeIn }) => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (fadeIn && sectionRef.current) {
      setTimeout(() => {
        if (sectionRef.current) {
          sectionRef.current.classList.add('visible');
        }
      }, 200);
    }
  }, [fadeIn]);
  
  return (
    <section className="hero-section fade-in-section" ref={sectionRef}>
      <h1 className="title">
        <span className="en">AI-Powered Real Estate Solutions</span>
        <span className="zh">AI驅動的房地產顧問服務</span>
      </h1>
      <p className="subtitle">
        <span className="en">Discover your dream home with our AI-powered property analysis and market predictions.</span>
        <span className="zh">透過我們的AI房產分析和市場預測，找到您理想的家。</span>
      </p>
    </section>
  );
};

export default HeroSection;

