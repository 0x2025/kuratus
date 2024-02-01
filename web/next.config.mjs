/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: () => {
    return [
        {
            source: "/blog",
            destination: "https://blog.kuratus.com/blog",
        }
    ];
}
};

export default nextConfig;
