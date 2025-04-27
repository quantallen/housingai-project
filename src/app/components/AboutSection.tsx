import React, { useEffect, useRef } from 'react';

interface AboutSectionProps {
  fadeIn: boolean;
}

const AboutSection: React.FC<AboutSectionProps> = ({ fadeIn }) => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (fadeIn && sectionRef.current) {
      setTimeout(() => {
        if (sectionRef.current) {
          sectionRef.current.classList.add('visible');
        }
      }, 400);
    }
  }, [fadeIn]);
  
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.classList.add('active');
    setTimeout(() => card.classList.remove('active'), 500);
  };
  
  return (
    <section id="about" className="fade-in-section" ref={sectionRef}>
      <h2 className="section-title">
        <span className="en">About Us</span>
        <span className="zh">關於我們</span>
      </h2>

      <div 
        className="glass-card" 
        style={{ maxWidth: '800px', margin: '0 auto' }}
        onClick={handleCardClick}
      >
        <div className="card-content">
          <p className="en">
            Allen Real Estate Team has been deeply rooted in the Beitou and Shilin districts of Taipei for over 15 years. As local property experts, we combine our intimate knowledge of these neighborhoods with cutting-edge AI technology to provide unparalleled real estate services.
          </p>
          <p className="zh">
            艾倫房仲團隊在台北北投和士林區深耕超過15年。作為在地房產專家，我們結合對這些社區的深入了解以及尖端AI技術，提供無與倫比的房地產服務。
          </p>

          <p className="en">
            Our commitment to the community goes beyond transactions - we&apos;ve helped hundreds of families find their perfect homes in these vibrant neighborhoods. We understand the unique character of each street and building, from historic hot spring properties in Beitou to modern high-rises near Shilin Night Market.
          </p>
          <p className="zh">
            我們對社區的承諾不僅限於交易 - 我們已幫助數百個家庭在這些充滿活力的社區找到理想的家。我們了解每條街道和每棟建築的獨特特性，從北投的歷史溫泉物業到士林夜市附近的現代高樓。
          </p>
          
          <p className="en">
            By integrating proprietary AI analytics with our local expertise, we offer insights and opportunities that other agencies simply cannot match, ensuring you make informed decisions with confidence.
          </p>
          <p className="zh">
            通過將專有的AI分析與我們的本地專業知識相結合，我們提供其他房仲無法比擬的見解和機會，確保您能夠自信地做出明智的決定。
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;