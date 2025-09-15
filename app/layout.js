import { Inter } from 'next/font/google';
import "./globals.css";
import { WhatsAppButton } from "./(client)/components/index";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Script from 'next/script';

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], 
  variable: "--font-inter", 
  display: "swap",
});

export const metadata = {
  verification: {
    google: "P1NTc2OJ31NE64GqClSYHEu7vi53wbTxv8zAjbgXlpE",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <head>
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-TX8GKPRZ');
          `}
        </Script>
        {/* End Google Tag Manager */}
      </head>
      <body
        className={`${inter.variable} antialiased bg-[#05070D] min-h-screen m-0 p-0`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MR2MC9SB"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {children}
         <WhatsAppButton />
      </body>
    </html>
  );
}
 