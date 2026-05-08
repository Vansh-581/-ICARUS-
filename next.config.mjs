/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three'],
  experimental: {
    optimizePackageImports: ['@react-three/fiber', '@react-three/drei'],
  },
};

export default nextConfig;
