import React from 'react';
import { Language } from '../globals.d';

interface FooterProps {
  lang: Language;
}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="footer">
      <div>
        <span className="en">© 2025 Allen Real Estate Team. All rights reserved.</span>
        <span className="zh">© 2025 艾倫房仲團隊 版權所有</span>
      </div>
      <div style={{ marginTop: '0.5rem' }}>
        <span className="en">Contact: 0988008124 | allen.kuo@astronx.ai</span>
        <span className="zh">聯絡電話: 0988008124 | allen.kuo@astronx.ai</span>
      </div>
    </footer>
  );
};

export default Footer;
