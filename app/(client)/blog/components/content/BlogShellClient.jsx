"use client"

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import BlogContentClient from "./BlogContentClient";
import NotFound from "../not-found/not-found";
import Fetch from "../../services/fetch";

export default function BlogShellClient() {
    const pathname = usePathname();
    const slug = pathname.split("/").filter(Boolean).pop();

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [notFoundFlag, setNotFoundFlag] = useState(false);

    useEffect(() => {
        let isActive = true;

        async function loadBlog() {
            setIsLoading(true);
            setNotFoundFlag(false);

            const result = await Fetch.fetchBlogByLink(slug);

            if (!isActive) return;

            if (!result) {
                setNotFoundFlag(true);
                setData(null);
            } else {
                setData(result);
                const title = result?.head?.titulo || result?.card?.titulo;
                if (title) {
                    document.title = `${title} | Neon Led Publicidad`;
                }
            }
            setIsLoading(false);
        }

        if (slug && slug !== "_shell") {
            loadBlog();
        } else {
            setIsLoading(false);
            setNotFoundFlag(true);
        }

        return () => {
            isActive = false;
        };
    }, [slug]);

    if (isLoading) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-gray-900">
                <Loader2 className="h-12 w-12 text-white animate-spin" />
            </div>
        );
    }

    if (notFoundFlag || !data) {
        return <NotFound />;
    }

    return <BlogContentClient data={data} />;
}
