/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    rewrites: () => {
        return [
            {
                source: "/blog",
                destination: "https://blog.kuratus.com",
            },
            {
                source: '/blog/:path*',
                destination: 'https://blog.kuratus.com/:path*',
            }
        ];
    }
};

export default nextConfig;
