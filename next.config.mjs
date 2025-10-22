    // /** @type {import('next').NextConfig} */
    // const nextConfig = {
    //     output: "export",
    //     images: { unoptimized: true },
    //     trailingSlash : true,
    // };

    // export default nextConfig;


    /** @type {import('next').NextConfig} */
const nextConfig = {
    
    images: {
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 60,
        dangerouslyAllowSVG: true,
        contentDispositionType: 'attachment',
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
    
    
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
    

    experimental: {
        optimizePackageImports: [
            '@mui/material',
            '@mui/icons-material',
            'lucide-react',
            '@fortawesome/react-fontawesome',
        ],
    },
    

    compress: true,
    
  
    poweredByHeader: false,
    

    trailingSlash: true,
};

export default nextConfig;