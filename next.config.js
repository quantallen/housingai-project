/** @type {import('next').NextConfig} */
const nextConfig = {
  // 移除了無效的 allowedDevOrigins 配置
  output: 'export',
  // 保留圖片域名配置
  images: {
    domains: ['imgur.com'],
    // 使用 remotePatterns 進行更精細的控制
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imgur.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;