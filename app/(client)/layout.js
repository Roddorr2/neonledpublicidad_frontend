import { Header, Footer } from "./components/index"


export const metadata = {
  title: "Neon Led Publicidad _ Inicio",
  description: "Transforma tu marca con Neones LED, Pantallas publicitarias, vinilos personalizados y más. Diseños innovadores, instalación profesional y atención local.",
  alternates: {
    canonical: "https://ledneonpublicidad.com",
  },
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
