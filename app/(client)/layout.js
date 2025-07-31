import { Header, Footer } from "./components/index"


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
