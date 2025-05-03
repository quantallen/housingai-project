import type { Metadata } from 'next';
import { Suspense } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI智能解決方案中心',
  description: '提供金融、法律、醫療、房地產及AI提示等多領域的AI驅動解決方案，透過尖端技術處理複雜問題。',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <head>
        {/* 添加 Font Awesome */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" 
          integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ==" 
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer" 
        />
        {/* 添加科技感字体 */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Noto+Sans+TC:wght@100;300;400;500;700;900&family=Barlow:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet"
        />
      </head>
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}