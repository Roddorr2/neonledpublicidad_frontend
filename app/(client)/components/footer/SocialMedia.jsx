"use client";

import Image from 'next/image';
import React from 'react'

export const SocialMedia = () => {

    const socialMedia = [
        {
            href: "https://www.tiktok.com/@neonled.publicidad",
            src: "/header_footer/tiktok_ledneonpublicidad.webp",
            alt: "Logotipo oficial de la red social TikTok con diseño minimalista"
        },
        {
            href: "https://www.youtube.com/@neonledpublicidad_2025",
            src: "/header_footer/youtube_ledneonpublicidad.webp",
            alt: "Icono de la red social YouTube en formato simplificado"
        },
        {
            href: "https://www.facebook.com/ledneonpublicidad",
            src: "/header_footer/facebook_ledneonpublicidad.webp",
            alt: "Logotipo de Facebook representado como icono social en línea"
        },
        {
            href: "https://www.instagram.com/neonledpublicidad.oficial/",
            src: "/header_footer/instagram_ledneonpublicidad.webp",
            alt: "Icono colorido de la red social Instagram con diseño moderno"
        },
    ]

    return (
        <>
            {
                socialMedia.map(({ href, src, alt }, index) => (
                    <a
                        key={index}
                        href={href}
                        className="hover:opacity-75 transition-opacity">
                        <div className="rounded-full p-3">
                            <Image
                                src={src}
                                alt={alt}
                                width={44}
                                height={44}
                                className="text-white"
                                unoptimized
                            />
                        </div>
                    </a>
                ))
            }
        </>
    )
}
