import { Header, Footer } from "./components/index"


export const metadata = {
  title: "Empresa que realiza letreros neón led personalizados para negocios | Publicidad Impactante",
  description: "Transforma tu marca con Neones LED, Pantallas publicitarias, vinilos personalizados y más. Diseños innovadores, instalación profesional y atención local. Letreros neón LED, vinilos decorativos y pantallas publicitarias para tu negocio.",
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
