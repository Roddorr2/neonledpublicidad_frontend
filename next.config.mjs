    /** @type {import('next').NextConfig} */
    const nextConfig = {
        output: "export",
        images: { unoptimized: true },
        trailingSlash : true,
        experimental: {
            optimizeCss: true,
        },
        optimizeFonts: true,
    };

    export default nextConfig;