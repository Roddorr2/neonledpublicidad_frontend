"use client";

import Image from "next/image";

export const SocialMedia = () => {
    const socialMedia = [
        {
            href: "https://api.whatsapp.com/send/?phone=%2B51994078320",
            src: "/header_footer/WhatsApp_icon.webp",
            alt: "WhatsApp",
            title: "WhatsApp",
        },
        {
            href: "https://www.instagram.com/neonledpublicidad.peru",
            src: "/header_footer/Instagram_icon.webp",
            alt: "Instagram",
            title: "Instagram",
        },
        {
            href: "https://www.facebook.com/ledneonpublicidad",
            src: "/header_footer/Facebook_icon.webp",
            alt: "Facebook",
            title: "Facebook",
        },
        {
            href: "https://www.linkedin.com/company/neonhouseled/about/",
            src: "/header_footer/LinkedIn_icon.webp",
            alt: "LinkedIn",
            title: "LinkedIn",
        },
        {
            href: "https://www.tiktok.com/@neonled.publicidad",
            src: "/header_footer/icono-tiktok.webp",
            alt: "TikTok",
            title: "TikTok",
        },
        {
            href: "https://www.youtube.com/@neonledpublicidadpe",
            src: "/header_footer/youtube_icon.webp",
            alt: "YouTube",
            title: "YouTube",
        },
    ];

    return (
        <div className="flex flex-wrap gap-3 sm:gap-4 justify-start items-center">
            {socialMedia.map(({ href, src, alt, title }, index) => (
                <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-all"
                >
                    <div className="w-[28px] h-[28px] sm:w-[32px] sm:h-[32px] flex items-center justify-center">
                        <Image
                            src={src}
                            alt={alt}
                            title={title}
                            width={28}
                            height={28}
                            className="object-contain"
                        />
                    </div>
                </a>
            ))}
        </div>
    );
};
