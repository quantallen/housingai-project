import React, { useState, useRef, useEffect } from 'react';
import { Language } from '../globals.d';
import '../chatbot.css';

interface ChatbotSectionProps {
  lang: Language;
  fadeIn: boolean;
}

interface Message {
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatbotSection: React.FC<ChatbotSectionProps> = ({ lang, fadeIn }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // 檢測是否為移動設備
  const isMobileDevice = () => {
    return typeof window !== 'undefined' && window.innerWidth <= 768;
  };

  // 加入漸入效果，與其他區塊保持一致
  useEffect(() => {
    if (fadeIn && sectionRef.current) {
      setTimeout(() => {
        if (sectionRef.current) {
          sectionRef.current.classList.add('visible');
        }
      }, 1200);
    }
  }, [fadeIn]);

  // 檢測移動設備
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(isMobileDevice());
    };
    
    // 初始檢查
    if (typeof window !== 'undefined') {
      checkMobile();
      
      // 添加窗口大小變化監聽器
      window.addEventListener('resize', checkMobile);
      
      return () => {
        window.removeEventListener('resize', checkMobile);
      };
    }
  }, []);

  // 自動滾動到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 初始歡迎訊息
  useEffect(() => {
    // 只有在第一次開啟聊天時加入歡迎訊息
    if (isOpen && messages.length === 0) {
      const welcomeMessage = {
        content: lang === 'en' 
          ? "Hello! I'm your AI real estate assistant. How can I help you with your property questions today?" 
          : "您好！我是您的AI房產助理。今天我可以回答您哪些房地產相關問題？",
        sender: 'bot' as const,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, lang, messages.length]);

  // 處理移動設備上的滾動鎖定
  useEffect(() => {
    if (isMobile && isMaximized) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobile, isMaximized]);

  // 當關閉聊天窗口時，也關閉最大化狀態
  useEffect(() => {
    if (!isOpen && isMaximized) {
      setIsMaximized(false);
    }
  }, [isOpen, isMaximized]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const toggleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation(); // 防止觸發toggleChat
    setIsMaximized(!isMaximized);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      sendMessage();
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    // 添加用戶消息
    const userMessage: Message = {
      content: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // 呼叫ChatGPT API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: input,
          language: lang 
        }),
      });

      if (!response.ok) {
        throw new Error('API請求失敗');
      }

      const data = await response.json();
      
      // 添加機器人回覆
      const botMessage: Message = {
        content: data.response || (lang === 'en' 
          ? "I'm sorry, I couldn't process your request at the moment. Please try again later." 
          : "很抱歉，我暫時無法處理您的請求。請稍後再試。"),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Chat API error:', error);
      
      // 錯誤訊息
      const errorMessage: Message = {
        content: lang === 'en'
          ? "Sorry, there was an error connecting to the assistant. Please try again later."
          : "抱歉，連接助理時出現錯誤。請稍後再試。",
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // 格式化時間
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(lang === 'en' ? 'en-US' : 'zh-TW', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  return (
    <section id="chatbot" className="fade-in-section" ref={sectionRef}>
      <h2 className="section-title">
        <span className="en">AI Real Estate Assistant</span>
        <span className="zh">AI房產助理</span>
      </h2>

      <div className="chatbot-container">
        <div className="chatbot-description">
          <p className="en">
            Have questions about real estate in Taipei? Our AI assistant is here to help!
            Ask about neighborhoods, property types, market trends, or specific listings.
          </p>
          <p className="zh">
            對台北的房地產有疑問嗎？我們的AI助理隨時為您服務！
            詢問關於社區、房產類型、市場趨勢，或特定房源的問題。
          </p>
        </div>
        
        <div className={`chat-widget ${isOpen ? 'open' : ''} ${isMaximized ? 'maximized' : ''} ${isMobile ? 'mobile' : ''}`}>
          <div className="chat-header" onClick={toggleChat}>
            <span className="chat-title">
              <span className="en">AI Real Estate Assistant</span>
              <span className="zh">AI房產助理</span>
            </span>
            {isOpen && (
              <span className="chat-maximize" onClick={toggleMaximize}>
                {isMaximized ? '⤓' : '⤢'}
              </span>
            )}
            <span className="chat-toggle">{isOpen ? '−' : '+'}</span>
          </div>
          
          {isOpen && (
            <div className="chat-body">
              <div className="chat-messages">
                {messages.map((message, index) => (
                  <div key={index} className={`message ${message.sender}`}>
                    <div className="message-content">{message.content}</div>
                    <div className="message-time">{formatTime(message.timestamp)}</div>
                  </div>
                ))}
                {isLoading && (
                  <div className="message bot">
                    <div className="message-content loading-dots">
                      <span></span><span></span><span></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              
              <div className="chat-input-container">
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder={lang === 'en' ? "Type your question here..." : "在此輸入您的問題..."}
                  disabled={isLoading}
                />
                <button 
                  onClick={sendMessage} 
                  disabled={!input.trim() || isLoading}
                  className="send-button"
                >
                  {isLoading ? (
                    <span className="loading-spinner"></span>
                  ) : (
                    <span>➤</span>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ChatbotSection;