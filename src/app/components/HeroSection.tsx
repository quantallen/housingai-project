import React, { useEffect, useRef } from 'react';

interface HeroSectionProps {
  fadeIn: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ fadeIn }) => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (fadeIn && sectionRef.current) {
      // 添加一个短延迟，确保DOM已完全加载
      setTimeout(() => {
        if (sectionRef.current) {
          sectionRef.current.classList.add('visible');
        }
      }, 200);
    }
  }, [fadeIn]);
  
  return (
    <section className="hero-section fade-in-section" ref={sectionRef}>
      <div className="hero-content">
        <h1 className="title">
          <span className="en">AI Innovation Solutions Hub</span>
          <span className="zh">AI創新解決方案中心</span>
        </h1>
        <p className="subtitle">
          <span className="en">Empowering businesses through innovative AI solutions across multiple domains</span>
          <span className="zh">通過創新的AI解決方案賦能各行各業</span>
        </p>
      </div>
    </section>
  );
};

export default HeroSection;