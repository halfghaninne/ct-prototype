import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    }
  },
  async redirects() {
    return [
      {
        source: '/instruments',
        missing: [
          {
            type: 'cookie',
            key: 'user'
          }
        ],
        permanent: false, // TODO: understand this flag better
        destination: '/'
      },
      {
        source: '/upload',
        missing: [
          {
            type: 'cookie',
            key: 'user'
          }
        ],
        permanent: false, // TODO: understand this flag better
        destination: '/'
      }
    ]
  }
};

export default nextConfig;
