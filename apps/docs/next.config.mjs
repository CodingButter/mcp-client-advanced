/** @type {import('next').NextConfig} */

import nextra from 'nextra';

const nextConfig = {
  transpilePackages: ['@mcp/ui'],
  reactStrictMode: true,
  output: 'export',
  distDir: '../../docs',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  defaultShowCopyCode: true,
});

export default withNextra(nextConfig);
