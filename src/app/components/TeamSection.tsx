import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

interface TeamSectionProps {
  fadeIn: boolean;
}

const TeamSection: React.FC<TeamSectionProps> = ({ fadeIn }) => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (fadeIn && sectionRef.current) {
      setTimeout(() => {
        if (sectionRef.current) {
          sectionRef.current.classList.add('visible');
        }
      }, 800);
    }
  }, [fadeIn]);
  
  return (
    <section id="team" className="fade-in-section" ref={sectionRef}>
      <h2 className="section-title">
        <span className="en">Our Team</span>
        <span className="zh">專業團隊</span>
      </h2>
      
      <div className="ceo-profile">
        <div className="ceo-img">
          <Image 
            src="https://imgur.com/otD7l78.png" 
            alt="Allen" 
            width={180}
            height={180}
            className="team-image"
            style={{ 
              borderRadius: '50%', 
              objectFit: 'cover' 
            }}
          />
        </div>
        <h3 className="ceo-name">Allen</h3>
        <p className="ceo-title">
          <span className="en">Founder & AI Analytics Director</span>
          <span className="zh">創辦人 & AI分析顧問</span>
        </p>
        <p className="ceo-education">
          <span className="en">MS in Computer Science, National Yang Ming Chiao Tung University</span>
          <span className="zh">國立陽明交通大學資訊工程碩士</span>
        </p>
        <p className="member-experience">
          <span className="en">5+ years of Ai analysis experience and 3+ years quantitative research</span>
          <span className="zh">5年以上AI分析經驗及3年以上量化經驗</span>
        </p>
      </div>
    </section>
  );
};

export default TeamSection;