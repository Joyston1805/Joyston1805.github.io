/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  // This repo is a GitHub "user site" (Joyston1805.github.io), which is
  // served from the domain root. Do NOT set a basePath here — that's only
  // needed for project repos like username.github.io/repo-name.
};

module.exports = nextConfig;
