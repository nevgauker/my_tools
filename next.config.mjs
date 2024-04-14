/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'localhost',
            port: '3000',
            pathname: '/api/images/**',
          },
          {
            protocol: 'https',
            hostname: 'my-tools-76308h3sj-nevgaukers-projects.vercel.app',
            port: '',
            pathname: '/api/images/**',
          }
        ],
      },
};

export default nextConfig;
