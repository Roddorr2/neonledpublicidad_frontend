import { Montserrat } from 'next/font/google';
import "./globals.css";
import { WhatsAppButton } from "./(client)/components/index";

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
    variable: '--font-montserrat',
});

export const metadata = {
  title: "Neon Led Publicidad _ Inicio",
   description: "Transforma tu marca con Neones LED, Pantallas publicitarias, vinilos personalizados y más. Diseños innovadores, instalación profesional y atención local.",
  
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
