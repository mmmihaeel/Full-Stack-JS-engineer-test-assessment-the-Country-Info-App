/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: false,
    compress: true,
    env: {
        NEXT_PUBLIC_API_BASE_URL: String(process.env.NEXT_PUBLIC_API_BASE_URL),
    },
};

export default nextConfig;
