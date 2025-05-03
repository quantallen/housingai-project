import React, { useState, useEffect, useCallback, useRef } from 'react';

interface BootScreenProps {
  onComplete: () => void;
}

interface BootMessage {
  message: string;
  delay: number;
  visible: boolean;
}

const BOOT_MESSAGES: Omit<BootMessage, 'visible'>[] = [
  { message: "啟動AI智能核心系統...", delay: 300 },
  { message: "建立多領域知識圖譜連接...", delay: 500 },
  { message: "載入深度學習模型架構...", delay: 700 },
  { message: "初始化跨領域智能分析引擎...", delay: 900 },
  { message: "校準領域專家神經網絡...", delay: 1100 },
  { message: "優化自然語言處理模組...", delay: 1300 },
  { message: "系統準備就緒。歡迎使用AI創新解決方案中心。", delay: 1500 }
];

const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
  const [opacity, setOpacity] = useState<number>(0);
  const [showSkipButton, setShowSkipButton] = useState<boolean>(false);
  const [bootMessages, setBootMessages] = useState<BootMessage[]>(
    BOOT_MESSAGES.map(m => ({ ...m, visible: false }))
  );

  const currentIndexRef = useRef(0); // 追蹤現在在哪一條
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const handleSkip = useCallback(() => {
    setOpacity(0);
    setTimeout(onComplete, 500);
  }, [onComplete]);

  useEffect(() => {
    setOpacity(1);
    const skipBtnTimer = setTimeout(() => setShowSkipButton(true), 2000);
    const safetyTimer = setTimeout(handleSkip, 15000);
    timersRef.current.push(skipBtnTimer, safetyTimer);

    return () => timersRef.current.forEach(clearTimeout);
  }, [handleSkip]);

  useEffect(() => {
    const showNext = () => {
      const index = currentIndexRef.current;

      if (index >= BOOT_MESSAGES.length) {
        const finalTimer = setTimeout(() => {
          setOpacity(0);
          setTimeout(onComplete, 1000);
        }, 1500);
        timersRef.current.push(finalTimer);
        return;
      }

      setBootMessages(prev => {
        const updated = [...prev];
        updated[index].visible = true;
        return updated;
      });

      currentIndexRef.current += 1;

      const nextDelay = BOOT_MESSAGES[currentIndexRef.current]?.delay ?? 500;
      const timer = setTimeout(showNext, nextDelay);
      timersRef.current.push(timer);
    };

    // 啟動第一句
    const initTimer = setTimeout(showNext, BOOT_MESSAGES[0].delay);
    timersRef.current.push(initTimer);

    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, [onComplete]);

  const renderBootLog = () => {
    return bootMessages.map((item, index) => (
      <div key={index} className={`boot-log-line ${item.visible ? 'visible' : ''}`}>
        <span style={{ color: '#00ff8c' }}>&gt;</span>{' '}
        <span style={{ color: '#ccffcc' }}>{item.message}</span>
        {index === bootMessages.length - 1 && item.visible && (
          <span className="terminal-cursor"></span>
        )}
      </div>
    ));
  };

  return (
    <div id="boot-screen" style={{ opacity }}>
      <div className="boot-terminal">
        {renderBootLog()}
      </div>
      {showSkipButton && (
        <button className="skip-button" onClick={handleSkip}>
          跳過 / Skip
        </button>
      )}
    </div>
  );
};

export default BootScreen;
