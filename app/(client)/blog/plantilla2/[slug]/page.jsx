import BlogShellClient from "../../components/content/BlogShellClient";

export function generateStaticParams() {
  return [{ slug: "_shell" }];
}

export const metadata = {
  title: "Blog de Diseño Publicitario LED | Neón Led Publicidad",
  description:
    "Inspira tu marca con ideas creativas en diseño publicitario. Ilumina tus espacios, rompe lo convencional y marca tendencia con soluciones visuales.",
};

export default function Page() {
  return <BlogShellClient />;
}
