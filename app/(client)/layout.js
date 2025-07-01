import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Header, Footer } from "./components/index"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NeonLedStore",
    description: "Descubre luces LED personalizadas y decorativas. Ilumina tus espacios con estilo único, calidad premium y diseños modernos.",
};

export default function RootLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
