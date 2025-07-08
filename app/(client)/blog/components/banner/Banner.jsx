import React from 'react';

const Banner = () => {
    return (
        <div className="relative w-full h-[600px] sm:h-[600px] bg-black overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 w-full h-full"
                style={{
                    backgroundImage: "url('/blog/banner/banner.webp')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Curved edges */}
            <div className="absolute top-0 right-0 w-[350px] sm:w-[500px] h-[200px] sm:h-[300px]">
                <img
                    src="/blog/banner/vector_2_ledneonpublicidad.webp"
                    alt="Imagen superior derecha"
                    className="w-full h-full object-cover rounded-bl-[50px] opacity-70"
                />
            </div>
            <div className="absolute bottom-0 left-0 w-[350px] sm:w-[500px] h-[200px] sm:h-[300px]">
                <img
                    src="/blog/banner/vector_1_ledneonpublicidad.webp"
                    alt="Imagen inferior izquierda"
                    className="w-full h-full object-cover rounded-tr-[50px] opacity-70"
                />
            </div>

            {/* Content container */}
            <div className="relative h-full flex flex-col items-center justify-center text-white px-4 z-10">
                {/* Small text */}
                <span
                    className={"text-[18px] sm:text-5xl font-extrabold uppercase tracking-wider mb-4"}
                >
                    BLOG
                </span>
                {/* Main heading */}
                <h1
                    className={"text-[40px] sm:text-[50px] md:text-[60px] lg:text-[70px] font-bold mb-6 text-center font-title neon-textov2"}
                >
                    ¿Quieres conocer más?
                </h1>
                {/* Subtitle */}
                <p
                    className={"text-[16px] sm:text-[30px] text-center max-w-[300px] sm:max-w-[500px] md:max-w-[700px] lg:max-w-2xl"}
                >
                    Mira cómo trabajamos cada uno de nuestros productos.
                </p>
            </div>

            {/* Glowing effect overlays */}
            <div className="absolute top-1/4 left-1/4 w-16 sm:w-24 h-16 sm:h-24 bg-pink-500/30 blur-xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-16 sm:w-24 h-16 sm:h-24 bg-blue-500/30 blur-xl animate-pulse" />
            <div className="absolute top-1/2 right-1/3 w-12 sm:w-16 h-12 sm:h-16 bg-purple-500/20 blur-xl animate-pulse" />
            <div className="absolute bottom-1/3 left-1/3 w-12 sm:w-16 h-12 sm:h-16 bg-cyan-500/20 blur-xl animate-pulse" />
        </div>
    );
};

export default Banner;