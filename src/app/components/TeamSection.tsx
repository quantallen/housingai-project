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
    <section id="about" className="fade-in-section" ref={sectionRef}>
      <h2 className="section-title">
        <span className="en">Our Team</span>
        <span className="zh">專業團隊</span>
      </h2>
      
      <div className="team-members">
        {/* Allen */}
        <div className="team-member">
          {/* 添加装饰元素保持角落效果 */}
          <div className="corner-decoration"></div>
          
          <div className="member-img">
            <Image 
              src="https://i.imgur.com/TBYH9kO.png" 
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
          <h3 className="member-name">Allen</h3>
          <p className="member-title">
            <span className="en">Founder & AI quantitative Consultant</span>
            <span className="zh">創辦人 & AI量化顧問</span>
          </p>
          <p className="member-education">
            <span className="en">MS in Computer Science, National Yang Ming Chiao Tung University</span>
            <span className="zh">國立陽明交通大學資訊工程碩士</span>
          </p>
          <p className="member-experience">
            <span className="en">5+ years of AI analysis experience and 3+ years quantitative research</span>
            <span className="zh">5年以上AI分析經驗及3年以上量化經驗</span>
          </p>
        </div>
        
        {/* LinShing */}
        <div className="team-member">
          {/* 添加装饰元素保持角落效果 */}
          <div className="corner-decoration"></div>
          
          <div className="member-img">
            <Image 
              src="https://i.imgur.com/BavFVrA.jpeg" 
              alt="LinShing" 
              width={180}
              height={180}
              className="team-image"
              style={{ 
                borderRadius: '50%', 
                objectFit: 'cover' 
              }}
            />
          </div>
          <h3 className="member-name">LinShing</h3>
          <p className="member-title">
            <span className="en">Founder & AI Solution Architect</span>
            <span className="zh">創辦人 & AI解決方案架構師</span>
          </p>
          <p className="member-education">
            <span className="en">Ph.D in Artificial Intelligence, National Taiwan University</span>
            <span className="zh">國立台灣大學人工智能博士</span>
          </p>
          <p className="member-experience">
            <span className="en">8+ years of AI development and 4+ years enterprise solution design</span>
            <span className="zh">8年以上AI開發經驗及4年以上企業解決方案設計經驗</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;