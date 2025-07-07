import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "./(client)/components/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Neon Led Publicidad _ Inicio",
   description: "Transforma tu marca con Neones LED, Pantallas publicitarias, vinilos personalizados y más. Diseños innovadores, instalación profesional y atención local.",
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
         <WhatsAppButton />
      </body>
    </html>
  );
}
