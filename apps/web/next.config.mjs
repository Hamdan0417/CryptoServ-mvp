import { fileURLToPath } from 'node:url';

const stubPath = fileURLToPath(new URL('./stubs/empty.js', import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true
  },
  webpack: (config) => {
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      '@react-native-async-storage/async-storage': stubPath,
      'pino-pretty': stubPath
    };
    return config;
  }
};

export default nextConfig;
