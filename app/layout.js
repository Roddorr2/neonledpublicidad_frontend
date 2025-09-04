import { Montserrat } from 'next/font/google';
import "./globals.css";
import { WhatsAppButton } from "./(client)/components/index";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"], 
  variable: "--font-montserrat", 
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <head>
        <meta name="google-site-verification" content="GmKy-G0PSdvQqMQB1OXQMRRR-MImNAtg1dkxxtvCUug" />
  
      </head>
<body
  className={`${montserrat.variable} antialiased bg-[#05070D] min-h-screen m-0 p-0`}
>

        {children}
         <WhatsAppButton />
      </body>
    </html>
  );
}
 