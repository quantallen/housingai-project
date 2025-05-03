/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  // 添加图片域名配置
  images: {
    domains: ['imgur.com','i.imgur.com'],
    unoptimized: true, // 靜態匯出時需要設為 true
  },
  
  // 注意: 當使用 output: 'export' 時, rewrites 不會生效
  // 因為靜態匯出不支援伺服器端功能
  // API 請求將需要使用完整的 URL
};

module.exports = nextConfig;