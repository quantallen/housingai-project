import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// 初始化OpenAI客戶端
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 房地產專業知識的系統提示詞
// 更開放的系統提示詞
const getSystemPrompt = (language: string) => {
  return language === 'en'
    ? `You are an AI assistant for Allen Real Estate Team, with knowledge about real estate especially in Taipei.
      
      About Allen Real Estate Team:
      - They have over 15 years of experience in Beitou and Shilin districts
      - They combine local knowledge with AI technology for property analysis
      - They offer services including property information, AI analysis, and market prediction
      
      While you specialize in real estate, you can answer questions on any topic and provide helpful, 
      comprehensive responses. Be conversational, friendly, and direct in your answers.
      
      The current year is 2025.`
    
    : `您是艾倫房仲團隊的AI助理，對房地產尤其是台北地區有專業知識。
      
      關於艾倫房仲團隊：
      - 在北投和士林區擁有超過15年的經驗
      - 結合當地知識與AI技術進行房產分析
      - 提供房屋資訊、AI分析和市場預測等服務
      
      除了房地產專業知識外，您可以回答各種主題的問題，並提供有幫助、全面的回應。
      請以對話、友善和直接的方式回答。
      
      當前年份是2025年。`;
};

// 在 src/app/api/chat/route.ts 中
export async function POST(req: NextRequest) {
  try {
    // 解析請求
    const { message, language = 'zh' } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // 檢查API金鑰是否存在
    if (!process.env.OPENAI_API_KEY) {
      console.error('API key is missing');
      return NextResponse.json({ 
        response: language === 'en' 
          ? "I'm sorry, but our AI service is currently unavailable. Please try again later or contact our team for assistance."
          : "抱歉，我們的AI服務目前無法使用。請稍後再試或聯繫我們的團隊尋求幫助。"
      });
    }

    try {
      // 使用ChatGPT API
      const completion = await openai.chat.completions.create({
        model: "gpt-4.1", // 使用最新模型，這裡可以根據需求調整
        messages: [
          { role: "system", content: getSystemPrompt(language) },
          { role: "user", content: message }
        ],
        temperature: 0.7,
        max_tokens: 500,
      });

      // 返回回應
      return NextResponse.json({
        response: completion.choices[0].message.content
      });
    } catch (apiError: any) {
      console.error('OpenAI API error:', apiError);
      
      // 特別處理配額限制錯誤
      if (apiError.status === 429 || (apiError.error && apiError.error.code === 'insufficient_quota')) {
        return NextResponse.json({ 
          response: language === 'en' 
            ? "I'm sorry, our AI service is temporarily at capacity. Please try again later or contact our team directly."
            : "抱歉，我們的AI服務暫時達到容量限制。請稍後再試或直接聯繫我們的團隊。"
        });
      }
      
      // 處理其他API錯誤
      return NextResponse.json({ 
        response: language === 'en' 
          ? "I'm sorry, there was an error processing your request. Please try again later."
          : "抱歉，處理您的請求時出錯。請稍後再試。"
      });
    }
  } catch (error: any) {
    console.error('Chat request error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while processing your request.' },
      { status: 500 }
    );
  }
}