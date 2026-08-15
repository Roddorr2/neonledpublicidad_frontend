/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    images: {
        unoptimized: true,
        formats: ['image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.githubusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'ui-avatars.com',
            },
            {
                protocol: 'https',
                hostname: ' avatars.google.com',
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