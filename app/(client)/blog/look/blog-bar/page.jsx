
import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Body1 from '../components/Body1'

export default function Page() {
    return (
        <div>
            <Header url_image = {"/blog/Blog4_header.webp"}/>

            <div className="container mx-auto px-4 py-12 relative bg-gradient-to-r text-black min-h-screen w-full">
                <div className="hidden lg:block w-20 xl:w-24 2xl:w-32 bg-gradient-to-b from-red-700 via-sky to-blue-800 fixed left-0 top-0 h-full -z-10"></div>

                <Body1/>

                <Footer  
                url_image1={"/blog/blog-5.webp"} 
                url_image2={"/blog/blog-8.webp"} 
                url_image3={"/blog/blog-2.webp"}
                descripcion={"El letrero de neón LED es una herramienta de marketing poderosa, capaz de captar la atención y aumentar la visibilidad de tu local. Un letrero de neón LED bien diseñado es una herramienta de marketing poderosa, capaz de captar la atención y aumentar la visibilidad de tu local."}/>
            </div>
        </div>
    )
}
