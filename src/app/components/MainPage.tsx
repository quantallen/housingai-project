import React, { useEffect, useRef } from 'react';
import { Language } from '../globals.d';

interface MainPageProps {
  lang: Language;
  fadeIn: boolean;
  onServiceClick?: (service: string) => void; // 設為可選
}

// 房地產外部連結
const REAL_ESTATE_URL = 'https://allen-housingai.com';

const MainPage: React.FC<MainPageProps> = ({ lang, fadeIn, onServiceClick }) => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (fadeIn && sectionRef.current) {
      // 添加延迟使得元素能够可见
      setTimeout(() => {
        if (sectionRef.current) {
          sectionRef.current.classList.add('visible');
          
          // 确保所有卡片可见
          const cards = sectionRef.current.querySelectorAll('.solution-card');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('visible');
            }, 200 * (index + 1)); // 延迟显示每张卡片
          });
        }
      }, 400);
    }
  }, [fadeIn]);
  
  // 处理卡片點擊 - 區分內部服務和外部連結
  const handleCardClick = (service: string) => {
    if (service === 'realEstate') {
      // 房地產指向外部連結
      window.open(REAL_ESTATE_URL, '_blank');
    } else if (onServiceClick) {
      // 如果提供了 onServiceClick 處理程序，調用它
      onServiceClick(service);
    }
  };
  
  return (
    <section id="solutions" className="fade-in-section" ref={sectionRef}>
      <div className="solutions-grid">
        {/* 金融 Finance */}
        <div 
          className="solution-card"
          onClick={() => handleCardClick('finance')}
        >
          <div className="corner-decoration"></div>
          
          <div className="card-icon">
            <i className="fas fa-chart-line"></i>
          </div>
          <h3 className="card-title">
            <span className="en">Finance</span>
            <span className="zh">金融</span>
          </h3>
          <div className="card-content">
            <p className="en">
              AI-powered financial analysis and investment strategies. Unlock market insights and optimize portfolio performance with cutting-edge algorithms.
            </p>
            <p className="zh">
              AI驅動的金融分析和投資策略。透過尖端算法解鎖市場洞察並優化投資組合表現。
            </p>
            <div className="card-link">
              <span className="en">Explore Finance Solutions</span>
              <span className="zh">探索金融解決方案</span>
              <span className="link-arrow">→</span>
            </div>
          </div>
        </div>

        {/* 法律 Legal */}
        <div 
          className="solution-card"
          onClick={() => handleCardClick('legal')}
        >
          <div className="corner-decoration"></div>
          
          <div className="card-icon">
            <i className="fas fa-gavel"></i>
          </div>
          <h3 className="card-title">
            <span className="en">Legal</span>
            <span className="zh">法律</span>
          </h3>
          <div className="card-content">
            <p className="en">
              Smart legal document analysis and contract optimization. Leverage AI to streamline compliance and reduce legal complexities.
            </p>
            <p className="zh">
              智能法律文件分析和合約優化。利用AI簡化合規流程並降低法律複雜性。
            </p>
            <div className="card-link">
              <span className="en">Explore Legal Solutions</span>
              <span className="zh">探索法律解決方案</span>
              <span className="link-arrow">→</span>
            </div>
          </div>
        </div>

        {/* 醫療 Healthcare */}
        <div 
          className="solution-card"
          onClick={() => handleCardClick('healthcare')}
        >
          <div className="corner-decoration"></div>
          
          <div className="card-icon">
            <i className="fas fa-stethoscope"></i>
          </div>
          <h3 className="card-title">
            <span className="en">Healthcare</span>
            <span className="zh">醫療</span>
          </h3>
          <div className="card-content">
            <p className="en">
              Advanced medical data analysis and personalized health recommendations. Transform healthcare delivery with AI-driven insights.
            </p>
            <p className="zh">
              先進的醫療數據分析和個性化健康建議。透過AI驅動的洞察力改變醫療服務。
            </p>
            <div className="card-link">
              <span className="en">Explore Healthcare Solutions</span>
              <span className="zh">探索醫療解決方案</span>
              <span className="link-arrow">→</span>
            </div>
          </div>
        </div>

        {/* 房地產 Real Estate - 指向外部网站 */}
        <div 
          className="solution-card external-link"
          onClick={() => handleCardClick('realEstate')}
        >
          <div className="corner-decoration"></div>
          
          <div className="card-icon">
            <i className="fas fa-building"></i>
          </div>
          <h3 className="card-title">
            <span className="en">Real Estate</span>
            <span className="zh">房地產</span>
          </h3>
          <div className="card-content">
            <p className="en">
              Intelligent property valuation and market trend analysis. Make informed real estate decisions with our AI-powered insights.
            </p>
            <p className="zh">
              智能房產估值和市場趨勢分析。利用我們的AI驅動見解做出明智的房地產決策。
            </p>
            <div className="card-link">
              <span className="en">Visit Housing AI Platform</span>
              <span className="zh">訪問房產AI平台</span>
              <span className="link-arrow">↗</span>
            </div>
          </div>
        </div>

        {/* AI Prompt */}
        <div 
          className="solution-card"
          onClick={() => handleCardClick('ai-prompt')}
        >
          <div className="corner-decoration"></div>
          
          <div className="card-icon">
            <i className="fas fa-brain"></i>
          </div>
          <h3 className="card-title">
            <span className="en">AI Prompt</span>
            <span className="zh">AI Prompt</span>
          </h3>
          <div className="card-content">
            <p className="en">
              Craft powerful AI prompts for optimal results. Unleash the full potential of AI language models with expert-designed prompting techniques.
            </p>
            <p className="zh">
              創建強大的AI提示以獲得最佳結果。通過專家設計的提示技術釋放AI語言模型的全部潛力。
            </p>
            <div className="card-link">
              <span className="en">Explore AI Prompt Solutions</span>
              <span className="zh">探索AI Prompt解決方案</span>
              <span className="link-arrow">→</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainPage;