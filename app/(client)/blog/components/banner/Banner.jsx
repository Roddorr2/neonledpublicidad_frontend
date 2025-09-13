import { red } from '@mui/material/colors';
import { color } from 'framer-motion';
import React from 'react';

const Banner = () => {
    return (
        <div className="relative w-full h-[600px] sm:h-[600px] bg-black overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 w-full h-full"
                
                style={{
                    backgroundImage: "url('/blog/banner/Fondo.web.Neon.Led.Publicidad.webp')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
      
                <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* 4 líneas según la imagen */}
            
            <div className="absolute top-[50px] right-[100px] w-[2px] h-[350px] bg-blue-400"></div>
           <div className="absolute top-[120px] left-[995px] w-[550px] h-[2px] bg-yellow-400"></div>
            <div className="absolute top-[180px] left-[80px] w-[2px] h-[380px] bg-blue-400"></div>
            <div className="absolute bottom-[120px] left-[100px] w-[350px] h-[2px] bg-yellow-400"></div>

            <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-blue-400/30 blur-2xl"></div>
<div className="absolute top-0 right-0 w-[500px] h-[200px] bg-blue-500/15 blur-3xl"></div>
<div className="absolute top-0 right-[100px] w-[400px] h-[150px] bg-blue-400/20 blur-2xl"></div>
<div className="absolute top-[50px] right-[50px] w-[350px] h-[100px] bg-blue-600/25 blur-xl"></div>
        
            <div className="absolute top-[500px] right-0 w-[350px] sm:w-[500px] h-[200px] sm:h-[300px]">
                
            </div>
            <div className="absolute bottom-0 left-0 w-[350px] sm:w-[500px] h-[200px] sm:h-[300px]">
                
            </div>

     
            <div className="relative h-full flex flex-col items-center justify-center text-white px-4 z-10 ">
             
                <span
                    className={"text-[18px] sm:text-4xl font-extrabold uppercase tracking-wider mb-4 "}
                    style={{color:"rgba(228, 86, 250, 0.69)"}}
                > 

                    BLOG
                </span>
             
                <h1
                    className={"text-[30px] sm:text-[40px] md:text-[50px] lg:text-[60px] font-bold mb-6 text-center font-bold neon-textov2 mt-[-20px]"}
                >
                   
                    <span style={{color:"#3abed2ff"}} >¿Quieres conocer más?</span>

              
                    
                </h1>
               
                <p1
                    className={"text-[16px] sm:text-[24px] text-center max-w-[300px] sm:max-w-[500px] md:max-w-[700px] lg:max-w-2xl mt-[-30px]"}
                >
                    Mira cómo trabajamos cada uno de nuestros productos.
                </p1>
                 
                 
            </div>

 
            <div className="absolute top-1/4 left-1/4 w-16 sm:w-24 h-16 sm:h-24 bg-pink-500/30 blur-xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-16 sm:w-24 h-16 sm:h-24 bg-blue-500/30 blur-xl animate-pulse" />
            <div className="absolute top-1/2 right-1/3 w-12 sm:w-16 h-12 sm:h-16 bg-purple-500/20 blur-xl animate-pulse" />
            <div className="absolute bottom-1/3 left-1/3 w-12 sm:w-16 h-12 sm:h-16 bg-cyan-500/20 blur-xl animate-pulse" />
            
        </div>
    );
};

export default Banner;