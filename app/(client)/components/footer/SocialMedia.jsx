"use client";

import Image from 'next/image';
import React from 'react'

export const SocialMedia = () => {

    const socialMedia = [
        {
            href: "https://www.tiktok.com/@neonled.publicidad",
            src: "/header_footer/tiktock.svg",
            alt: "TikTok"
        },
        {
            href: "https://www.youtube.com/@neonledpublicidad_2025",
            src: "/header_footer/youtube.svg",
            alt: "YouTube"
        },
        {
            href: "https://www.facebook.com/ledneonpublicidad",
            src: "/header_footer/facebook.svg",
            alt: "Facebook"
        },
        {
            href: "https://www.instagram.com/neonledpublicidad.oficial/",
            src: "/header_footer/instagram.svg",
            alt: "Instagram"
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
