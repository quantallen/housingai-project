import type { Metadata } from 'next';
import './globals.css';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: '艾倫房仲團隊 | AI房屋顧問',
  description: 'AI驅動的房地產顧問服務，專注於台北北投和士林區域的房產服務。',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
