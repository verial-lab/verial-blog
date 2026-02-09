import { createMDX } from 'fumadocs-mdx/next';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: resolve(__dirname, '../../'),
};

export default withMDX(nextConfig);
