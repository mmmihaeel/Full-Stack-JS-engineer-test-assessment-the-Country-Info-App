/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: false,
    compress: true,
    env: {
        API_URL: String(process.env.API_URL),
    },
};

export default nextConfig;
