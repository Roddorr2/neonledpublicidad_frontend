import { Inter, League_Gothic } from "next/font/google";
import "./globals.css";
import { WhatsAppButton } from "./(client)/components/index";
import "swiper/css";
import Script from "next/script";
import { AuthProvider } from "./context/AutContext";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const leagueGothic = League_Gothic({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-league-gothic",
});

export const metadata = {
  metadataBase: new URL("https://ledneonpublicidad.com"),

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  applicationName: "LedNeonPublicidad",
  authors: [{ name: "LedNeonPublicidad" }],
  creator: "LedNeonPublicidad",
  publisher: "LedNeonPublicidad",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es-PE">
      <head>
        <meta 
        name="google-site-verification" 
        content="GmKy-G0PSdvQqMQB1OXQMRRR-MImNAtg1dkxxtvCUug" 
        />
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
        className={`${inter.variable} ${leagueGothic.variable} font-sans antialiased bg-[#05070D] min-h-screen m-0 p-0`}
      >
        <AuthProvider>{children}</AuthProvider>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TX8GKPRZ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <WhatsAppButton />
      </body>
    </html>
  );
}
