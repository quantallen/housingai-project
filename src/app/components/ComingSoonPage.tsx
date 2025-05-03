import React, { useState, useEffect } from 'react';
import { Language } from '../globals.d';

interface ComingSoonPageProps {
  service: string;
  onBackClick?: () => void; // 添加可選的返回函數
  lang?: Language; // 設為可選
}

const ComingSoonPage: React.FC<ComingSoonPageProps> = ({ 
  service, 
  onBackClick, 
  lang = 'zh' // 設置默認值
}) => {
  const [progress, setProgress] = useState(0);
  const [commandsTyped, setCommandsTyped] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typingComplete, setTypingComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  
  // 定義服務名稱基於服務類型
  const getServiceInfo = () => {
    switch(service) {
      case 'finance':
        return {
          en: 'Finance',
          zh: '金融',
          icon: 'fas fa-chart-line'
        };
      case 'legal':
        return {
          en: 'Legal',
          zh: '法律',
          icon: 'fas fa-gavel'
        };
      case 'healthcare':
        return {
          en: 'Healthcare',
          zh: '醫療',
          icon: 'fas fa-stethoscope'
        };
      case 'ai-prompt':
        return {
          en: 'AI Prompt',
          zh: 'AI Prompt',
          icon: 'fas fa-brain'
        };
      default:
        return {
          en: 'Service',
          zh: '服務',
          icon: 'fas fa-cog'
        };
    }
  };
  
  const serviceInfo = getServiceInfo();
  
  const commands = [
    `initialize ${serviceInfo.en.toLowerCase()}_module.ai`,
    `check ${serviceInfo.en.toLowerCase()}_dependencies.pkg`,
    `verify server_status --service="${serviceInfo.en}"`,
    `load development_timeline.json`
  ];
  
  const responses = [
    `> Module initialization started...\n> Loading core components...\n> Configuring AI engine...\n\n[WARNING]: ${serviceInfo.en} service is currently under development.`,
    `> Checking dependencies...\n> Required packages: ai-core, neural-engine, data-processor\n> Optional packages: analytics-suite, prediction-model\n\n[STATUS]: Some dependencies not yet implemented.`,
    `> Verifying server status...\n> Checking cloud deployment...\n> Scanning infrastructure...\n\n[RESULT]: Service not yet deployed to production environment.`,
    `> Loading development timeline...\n> Parsing JSON data...\n> Analyzing project milestones...\n\n[INFO]: ${serviceInfo.en} service is scheduled for release in Q3 2025.\n\n[MESSAGE]: We're working hard to bring you our innovative ${serviceInfo.en.toLowerCase()} solutions. Please check back soon!`
  ];
  
  // 進度條動畫
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev < 100) {
          return prev + 1;
        }
        clearInterval(timer);
        return 100;
      });
    }, 50);
    
    return () => clearInterval(timer);
  }, []);
  
  // 閃爍游標
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);
  
  // 打字動畫 - 僅執行一次
  useEffect(() => {
    if (typingComplete) return;
    
    // 目前正在處理的命令
    const command = commands[currentIndex];
    
    // 如果還有命令要處理
    if (currentIndex < commands.length) {
      let charIndex = 0;
      let typedCommand = '';
      
      // 打字動畫
      const typingInterval = setInterval(() => {
        if (charIndex < command.length) {
          typedCommand += command[charIndex];
          setCurrentCommand(typedCommand);
          charIndex++;
        } else {
          clearInterval(typingInterval);
          
          // 延遲後添加到已完成命令列表
          setTimeout(() => {
            setCommandsTyped(prev => [...prev, command]);
            setCurrentCommand('');
            
            // 更新索引到下一條命令
            setCurrentIndex(prev => prev + 1);
          }, 1000);
        }
      }, 50);
      
      return () => clearInterval(typingInterval);
    } else {
      // 所有命令都已處理完
      setTypingComplete(true);
    }
  }, [commands, currentIndex, typingComplete]);
  
  // 處理返回按鈕點擊
  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      // 如果沒有提供 onBackClick 函數，默認返回首頁
      window.location.href = '/';
    }
  };
  
  return (
    <div className="coming-soon-container">
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="dot red"></div>
          <div className="dot yellow"></div>
          <div className="dot green"></div>
          <div className="title-bar">
            <i className={serviceInfo.icon}></i> {lang === 'en' ? serviceInfo.en : serviceInfo.zh} - Terminal
          </div>
        </div>
        
        <div className="terminal-content">
          {/* 已完成的命令和響應 */}
          {commandsTyped.map((cmd, index) => (
            <React.Fragment key={index}>
              <div className="command-line">
                <span className="prompt">astronx@ai:~$</span>
                <span className="command">{cmd}</span>
              </div>
              {index < responses.length && (
                <div className="response">
                  {responses[index]}
                </div>
              )}
            </React.Fragment>
          ))}
          
          {/* 當前正在輸入的命令 */}
          {!typingComplete && (
            <div className="command-line">
              <span className="prompt">astronx@ai:~$</span>
              <span className="command">{currentCommand}</span>
              {showCursor && <span className="typing-cursor"></span>}
            </div>
          )}
          
          {/* 進度條區域 - 在所有命令完成後顯示 */}
          <div className="progress-section">
            <div className="command-line">
              <span className="prompt">astronx@ai:~$</span>
              <span className="command">
                {lang === 'en' ? 'Development progress:' : '開發進度:'}
              </span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="command-line">
              <span className="prompt">status:</span>
              <span className="command">
                {lang === 'en' ? 'Coming Soon' : '即將推出'} - {progress}%
              </span>
            </div>
          </div>
        </div>
        
        <div className="button-container">
          <button className="terminal-button" onClick={handleBackClick}>
            <span className={lang === 'en' ? '' : 'hidden'}>Return to Home</span>
            <span className={lang === 'zh' ? '' : 'hidden'}>返回首頁</span>
          </button>
          <button className="terminal-button">
            <span className={lang === 'en' ? '' : 'hidden'}>Subscribe for Updates</span>
            <span className={lang === 'zh' ? '' : 'hidden'}>訂閱更新</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;