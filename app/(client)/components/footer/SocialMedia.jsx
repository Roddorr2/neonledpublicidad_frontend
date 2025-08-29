"use client";

import Image from 'next/image';
import React from 'react'

export const SocialMedia = () => {

    const socialMedia = [
         {
            href: "https://wa.me/+51994078320?text=Hola,%20quisiera%20más%20información%20de%20sus%20productos",
            src: "/header_footer/Whatsapp.Neon.Led.Publicidad.webp",
            alt: "Logotipo oficial de la red social whatsapp como icono en linea"
        },
          {
            href: "https://www.instagram.com/neonledpublicidad.oficial/",
            src: "/header_footer/instagram.Neon.Led.Publicidad.webp",
            alt: "Icono colorido de la red social Instagram con diseño moderno"
        },
         {
            href: "https://www.facebook.com/ledneonpublicidad",
            src: "/header_footer/facebook.Neon.Led.Publicidad.webp",
            alt: "Logotipo de Facebook representado como icono social en línea"
        },
         {
            href: "https://www.linkedln.com/@neonledpublicidad_2025",
            src: "/header_footer/Linkedin.Neon.Led.Publicidad.webp",
            alt: "Icono de la red social YouTube en formato simplificado"
        },
        {
            href: "https://www.tiktok.com/@neonled.publicidad",
            src: "/header_footer/tiktok.Neon.Led.Publicidad.webp",
            alt: "Logotipo oficial de la red social TikTok con diseño minimalista"
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
                        <div className="rounded-full p-2 flex items-center justify-center">
                            <Image
                                src={src}
                                alt={alt}
                                width={128}
                                height={128}
                                className="text-white"
                            />
                        </div>
                    </a>
                ))
            }
        </>
    )
}