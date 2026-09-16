<<<<<<< Updated upstream
import BlogShellClient from "../../components/content/BlogShellClient";
=======
                              import { notFound } from "next/navigation";
import BlogContentClient from "../../components/content/BlogContentClient";
import Fetch from "../../services/fetch";
>>>>>>> Stashed changes

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
