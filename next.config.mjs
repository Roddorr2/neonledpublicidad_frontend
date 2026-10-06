/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    poweredByHeader: false,
    images: {
        unoptimized: true,
        formats: ['image/webp'],
        remotePatterns: [
            {
                source: '/blog/letras-acrilicas-3d-moda',
                destination: '/productos/letras-acrilico',
                permanent: true,
            },
            {
                source: '/blog/cafeterias-con-estilo',
                destination: '/productos/menu-board',
                permanent: true,
            },
            {
                protocol: 'https',
                hostname: 'avatars.google.com',
            },
            {
                source: '/blog/neon-led-para-bares-modernos',
                destination: '/productos/neon-led',
                permanent: true,
            },
        ],
    },
    trailingSlash: true,
    experimental: {
        optimizeCss: true,
    },
};

export default nextConfig;
