import React, { useState, useEffect } from 'react';
import { Language } from '../globals.d';

interface FooterProps {
  lang: Language;
}

const Footer: React.FC<FooterProps> = ({ lang }) => {
  const [visitorCount, setVisitorCount] = useState<number>(0);
  
  useEffect(() => {
    // 检查本地存储中是否存在访问计数
    const storedCount = localStorage.getItem('visitorCount');
    let count = 0;
    
    if (storedCount) {
      count = parseInt(storedCount, 10);
    } else {
      // 如果不存在，初始化为一个随机数，模拟已有访问量
      count = Math.floor(Math.random() * 1000) + 500;
    }
    
    // 增加计数
    count += 1;
    
    // 更新状态和本地存储
    setVisitorCount(count);
    localStorage.setItem('visitorCount', count.toString());
  }, []);
  
  return (
    <footer className="footer">
      <div className="footer-main">
        <div>
          <span className="en" style={{ display: lang === 'en' ? 'inline' : 'none' }}>
            © 2025 AI Innovation Solutions Hub. All rights reserved.
          </span>
          <span className="zh" style={{ display: lang === 'zh' ? 'inline' : 'none' }}>
            © 2025 AI創新解決方案中心 版權所有
          </span>
        </div>
        <div style={{ marginTop: '0.5rem' }}>
          <span className="en" style={{ display: lang === 'en' ? 'inline' : 'none' }}>
            Contact: 0988008124 | innovation@astronx.ai
          </span>
          <span className="zh" style={{ display: lang === 'zh' ? 'inline' : 'none' }}>
            聯絡電話: 0988008124 | innovation@astronx.ai
          </span>
        </div>
      </div>
      
      <div className="visitor-counter">
        <i className="fas fa-eye"></i>
        <div>
          <span className="en" style={{ display: lang === 'en' ? 'inline' : 'none' }}>
            Total Visitors: {visitorCount.toLocaleString()}
          </span>
          <span className="zh" style={{ display: lang === 'zh' ? 'inline' : 'none' }}>
            總訪問人數: {visitorCount.toLocaleString()}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;