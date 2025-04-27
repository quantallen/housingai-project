/** @type {import('next').NextConfig} */
const nextConfig = {
  // 您现有的配置
  allowedDevOrigins: [
    '140.113.87.82',
    'http://140.113.87.82'
  ],
  
  // 添加图片域名配置
  images: {
    domains: ['imgur.com'],
    // 或者使用 remotePatterns 进行更精细的控制
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