import React, { useEffect, useRef } from 'react';
interface ServicesSectionProps {
  fadeIn: boolean;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ fadeIn }) => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (fadeIn && sectionRef.current) {
      setTimeout(() => {
        if (sectionRef.current) {
          sectionRef.current.classList.add('visible');
        }
      }, 600);
    }
  }, [fadeIn]);
  
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>, url?: string) => {
    const card = e.currentTarget;
    card.classList.add('active');
    
    // 添加点击效果
    setTimeout(() => card.classList.remove('active'), 500);
    
    // 如果提供了URL，则在激活效果后导航
    if (url) {
      setTimeout(() => {
        window.open(url, '_blank');
      }, 500);
    }
  };
  
  return (
    <section id="services" className="fade-in-section" ref={sectionRef}>
      <h2 className="section-title">
        <span className="en">Our Services</span>
        <span className="zh">服務項目</span>
      </h2>

      <div className="grid-container">
        <div className="glass-card" onClick={handleCardClick}>
          <div className="service-icon">🏠</div>
          <h2 className="card-title">
            <span className="en">Property Information</span>
            <span className="zh">房屋資訊</span>
          </h2>
          <div className="card-content">
            <p className="en">
              Access comprehensive property details with our advanced database system. We provide in-depth information about neighborhoods, building history, amenities, and nearby facilities to help you make informed decisions.
            </p>
            <p className="zh">
              透過我們的先進數據庫系統獲取全面的房產詳情。我們提供關於社區、建築歷史、設施以及附近便利設施的深入信息，幫助您做出明智的決策。
            </p>
          </div>
        </div>

        {/* AI分析卡片 - 添加点击链接 */}
        <div 
          className="glass-card" 
          onClick={(e) => handleCardClick(e, 'https://allen-housingai.com:8443')}
          style={{ cursor: 'pointer' }}
        >
          <div className="service-icon">🤖</div>
          <h2 className="card-title">
            <span className="en">AI Analysis</span>
            <span className="zh">AI分析</span>
          </h2>
          <div className="card-content">
            <p className="en">
              Our proprietary AI algorithms analyze thousands of property transactions to identify patterns and opportunities. Get personalized property recommendations based on your preferences, lifestyle needs, and investment goals.
            </p>
            <p className="zh">
              我們專有的AI算法分析數千筆房產交易以識別模式和機會。根據您的偏好、生活方式需求和投資目標獲取個性化的房產推薦。
            </p>
            <div className="card-link">
              <span className="en">Visit our AI Platform →</span>
              <span className="zh">訪問我們的AI平台 →</span>
            </div>
          </div>
        </div>

        <div className="glass-card" onClick={handleCardClick}>
          <div className="service-icon">📊</div>
          <h2 className="card-title">
            <span className="en">Market Prediction</span>
            <span className="zh">房市預測</span>
          </h2>
          <div className="card-content">
            <p className="en">
              Stay ahead of market trends with our AI-powered predictive analytics. Our models accurately forecast price movements in specific neighborhoods and property types, helping you time your buying or selling decisions perfectly.
            </p>
            <p className="zh">
              透過我們的AI預測分析領先市場趨勢。我們的模型準確預測特定社區和房產類型的價格走勢，幫助您完美把握購買或出售的時機。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;