"use client";

import Image from 'next/image';
import React from 'react'

export const SocialMedia = () => {

    const socialMedia = [
        {
            href: "https://api.whatsapp.com/send/?phone=%2B51994078320&text=Hola%2C+quisiera+m%C3%A1s+informaci%C3%B3n+de+sus+productos&type=phone_number&app_absent=0",
            src: "/header_footer/Whatsapp.Neon.Led.Publicidad.webp",
            alt: "Logotipo oficial de la red social TikTok con diseño minimalista"
        },
       
         {
            href: "https://www.instagram.com/neonledpublicidad.peru?igsh=a3RseGpuYXM5ZnZo",
            src: "/header_footer/instagram.Neon.Led.Publicidad.webp",
            alt: "Icono colorido de la red social Instagram con diseño moderno"
        },
        {
            href: "https://www.facebook.com/ledneonpublicidad",
            src: "/header_footer/facebook.Neon.Led.Publicidad.webp",
            alt: "Logotipo de Facebook representado como icono social en línea"
        },
        {
            href: "https://www.linkedin.com/company/neonhouseled/about/",
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
                socialMedia.map(({ href, src, alt, title }, index) => (
                    <a
                        key={index}
                        href={href}
                        className="hover:opacity-75 transition-opacity">
                        <div className="rounded-full p-2 flex items-center justify-center">
                            <Image
                                src={src}
                                alt={alt}
                                width={44}
                                height={44}
                                className="text-white"
                            />
                        </div>
                    </a>
                ))
            }
        </>
    )
}