/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**',
        },
      ],
    },
    async redirects() {
      return [
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'krishikavyas.site',
            },
          ],
          destination: 'https://krishikavyas.site/:path*',
          permanent: true,
        },
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'www.krishikavyas.site',
            },
          ],
          destination: 'https://krishikavyas.site/:path*',
          permanent: true,
        },
      ];
    },
  };
  
  export default nextConfig;
  