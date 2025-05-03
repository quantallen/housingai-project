import React, { useState, useRef, useEffect } from 'react';

interface ContactSectionProps {
  fadeIn: boolean;
}

const ContactSection: React.FC<ContactSectionProps> = ({ fadeIn }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  // 更新 API 基本 URL 指向 GoDaddy 主機
  // 請替換為您的實際網域名稱
  const API_BASE_URL = 'https://orbitron-ai.com/api';
  
  useEffect(() => {
    if (fadeIn && sectionRef.current) {
      setTimeout(() => {
        if (sectionRef.current) {
          sectionRef.current.classList.add('visible');
        }
      }, 1000);
    }
  }, [fadeIn]);
  
  // 表單提交處理
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // 設置提交狀態
    setIsSubmitting(true);
    setError('');
    
    // 簡單的驗證
    if (!name || !email || !message) {
      setError('請填寫所有必填欄位');
      setIsSubmitting(false);
      return;
    }
    
    try {
      // 發送數據到 PHP 後端
      const response = await fetch(`${API_BASE_URL}/simple-save-contact.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          timestamp: new Date().getTime()
        })
      });
      
      const responseText = await response.text();
      
      // 嘗試解析 JSON
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        throw new Error(`服務器響應無法解析: ${responseText.substring(0, 100)}...`);
      }
      
      if (!response.ok) {
        throw new Error(result.message || '提交表單時出錯');
      }
      
      // 顯示成功訊息
      setSubmitted(true);
      
      // 重置表單
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      
      // 5秒后重置提交狀態
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
      
    } catch (err) {
      // 處理錯誤
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('提交表單時發生未知錯誤');
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section id="contact" className="fade-in-section" ref={sectionRef}>
      <h2 className="section-title">
        <span className="en">Contact Us</span>
        <span className="zh">聯絡我們</span>
      </h2>
      
      <div className="contact-container">
        <div className="contact-info">
          <div className="contact-item">
            <i className="fas fa-map-marker-alt"></i>
            <div>
              <h3 className="en">Address</h3>
              <h3 className="zh">地址</h3>
              <p className="en">Taipei, Taiwan</p>
              <p className="zh">台北市</p>
            </div>
          </div>
          
          <div className="contact-item">
            <i className="fas fa-phone"></i>
            <div>
              <h3 className="en">Phone</h3>
              <h3 className="zh">電話</h3>
              <p>0988-008-124</p>
            </div>
          </div>
          
          <div className="contact-item">
            <i className="fas fa-envelope"></i>
            <div>
              <h3 className="en">Email</h3>
              <h3 className="zh">電子郵件</h3>
              <p>quantallen0613@gmail.com</p>
            </div>
          </div>
        </div>
        
        <div className="contact-form-container">
          {submitted ? (
            <div className="success-message">
              <i className="fas fa-check-circle"></i>
              <p className="en">Thank you for your message! We will get back to you soon.</p>
              <p className="zh">感謝您的訊息！我們將盡快回覆您。</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              {error && <div className="error-message">{error}</div>}
              
              <div className="form-group">
                <label htmlFor="name">
                  <span className="en">Name</span>
                  <span className="zh">姓名</span>
                  <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">
                  <span className="en">Email</span>
                  <span className="zh">電子郵件</span>
                  <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">
                  <span className="en">Subject</span>
                  <span className="zh">主題</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">
                  <span className="en">Message</span>
                  <span className="zh">訊息</span>
                  <span className="required">*</span>
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  required
                  disabled={isSubmitting}
                ></textarea>
              </div>
              
              <button type="submit" className="submit-button" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className="en">Sending...</span>
                    <span className="zh">發送中...</span>
                  </>
                ) : (
                  <>
                    <span className="en">Send Message</span>
                    <span className="zh">發送訊息</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;