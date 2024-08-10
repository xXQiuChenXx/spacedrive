/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Basic redirect
      {
        source: "/setup",
        destination: "/setup/step-1",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
