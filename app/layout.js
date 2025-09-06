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

export const metadata = {
  verification: {
    google: "P1NTc2OJ31NE64GqClSYHEu7vi53wbTxv8zAjbgXlpE",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} antialiased`}
      >
        {children}
         <WhatsAppButton />
      </body>
    </html>
  );
}
