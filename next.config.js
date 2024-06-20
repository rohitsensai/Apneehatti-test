/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["react-draft-wysiwyg"]);

const nextConfig = withTM({
  reactStrictMode: true,
  images: {
    domains: [
      "apneehatti.s3.ap-south-1.amazonaws.com",
      "apneehatti.s3.amazonaws.com",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
});

module.exports = nextConfig;
