/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    images: { 
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ui-avatars.com',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
    },
    trailingSlash : true,
    experimental: {
        optimizeCss: true,
    },
};

export default nextConfig;