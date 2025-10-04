import Script from "next/script";

export const metadata = {
  title:
    "Marca de letreros neón led y publicidad visual en Perú  | Personaliza tu Marca",
  description:
    "Descubre productos LED publicitarios en Lima: pantallas LED a medida, neón LED flexible, impresión en vinil decorativo, letreros y sillas luminosas. Personaliza tu marca con estilo.",
  openGraph: {
    title:
      "Marca de letreros neón led y publicidad visual en Perú  | Personaliza tu Marca",
    description:
      "Descubre productos LED publicitarios en Lima: pantallas LED a medida, neón LED flexible, impresión en vinil decorativo, letreros y sillas luminosas. Personaliza tu marca con estilo.",
    url: "https://ledneonpublicidad.com/productos",
    siteName: "Neon Led Publicidad",
    images: [], // puedes agregar una imagen destacada más adelante
    locale: "es_PE",
    type: "website",
  },
  alternates: {
    canonical: "https://ledneonpublicidad.com/productos",
  },

  keywords: [
    "neón LED",
    "letras de acrílico",
    "letreros luminosos",
    "productos personalizados",
    "iluminación LED",
    "letreros personalizados",
    "letreros de neón",
    "letras luminosas",
    "decoración con neón",
    "letreros para eventos",
    "letreros publicitarios",
    "letreros LED personalizados",
    "decoración para negocios",
    "decoración para oficinas",
    "decoración para el hogar",
    "diseño en acrílico",
    "tecnología LED avanzada",
    "regalos personalizados",
    "ideas de iluminación personalizada",
    "iluminación artística",
    "letreros modernos",
    "decoración minimalista",
    "diseño único en acrílico",
    "decoración estética",
    "decoración para bodas",
  ],
};

export default function ProductosLayout({ children }) {
const productSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Productos LedNeonPublicidad",
  "url": "https://ledneonpublicidad.com/productos",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Product",
        "name": "Letreros de Acrílico",
        "url": "https://ledneonpublicidad.com/productos/letras-acrilico",
        "image": "https://ledneonpublicidad.com/productosPrincipal/Letrero-Crocs-Acrilico-Mobile.webp",
        "description": "Dale estilo a tu marca con letras de acrílico: resistentes, modernas y perfectas para destacar en interiores o exteriores",
        "brand": {
          "@type": "Brand",
          "name": "LedNeonPublicidad"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Product",
        "name": "Letreros Doradas y Plateadas",
        "url": "https://ledneonpublicidad.com/productos/letras-doradas",
        "image": "https://ledneonpublicidad.com/productosPrincipal/Letras-acrilicas-Lux-Nails-Neon-Led-Publicidad-Mobile.webp",
        "description": "Dale elegancia a tu espacio con letras doradas o plateadas. Perfectas para marcas, oficinas y vitrinas. ¡Cotiza ahora!",
        "brand": {
          "@type": "Brand",
          "name": "LedNeonPublicidad"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "Product",
        "name": "Letreros Luminosos",
        "url": "https://ledneonpublicidad.com/productos/letreros-luminosos",
        "image": "https://ledneonpublicidad.com/productosPrincipal/Letras-Acrilicas-Farmacia-Mobile.webp",
        "description": "Letreros luminosos personalizados en Lima, Perú. Ideal para destacar marcas con iluminación impactante, moderna y de alta durabilidad.",
        "brand": {
          "@type": "Brand",
          "name": "LedNeonPublicidad"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 4,
      "item": {
        "@type": "Product",
        "name": "Letreros de Neon en Tubos de Vidrio",
        "url": "https://ledneonpublicidad.com/productos/letras-neon",
        "image": "https://ledneonpublicidad.com/productosPrincipal/Letrero-Works-licoreria-led-neo-led-publicidad-Mobile.webp",
        "description": "Las letras neón en tubos de vidrio, son fáciles para poder llamar la atención y cautivar al público, permite destacar tu marca, ideal para eventos y decoraciones especiales.",
        "brand": {
          "@type": "Brand",
          "name": "LedNeonPublicidad"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 5,
      "item": {
        "@type": "Product",
        "name": "Letreros de Neón LED",
        "url": "https://ledneonpublicidad.com/productos/neon-led",
        "image": "https://ledneonpublicidad.com/productosPrincipal/5letrasDeNeon.png",
        "description": "Descubre nuestros Neones LED personalizados: diseños atractivos, alta visibilidad y bajo consumo. Ideales para negocios, eventos y decoración.",
        "brand": {
          "@type": "Brand",
          "name": "LedNeonPublicidad"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 6,
      "item": {
        "@type": "Product",
        "name": "Impresión en Vinilo",
        "url": "https://ledneonpublicidad.com/productos/impresion-vinilo",
        "image": "https://ledneonpublicidad.com/productosPrincipal/6impresionEnVinilo.png",
        "description": "Los vinilos son la mejor opción para mostrar tu mensaje, logotipo o marca. Tenemos gran variedad de diseños y estilos disponibles.",
        "brand": {
          "@type": "Brand",
          "name": "LedNeonPublicidad"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 7,
      "item": {
        "@type": "Product",
        "name": "Menú Board",
        "url": "https://ledneonpublicidad.com/productos/menu-board",
        "image": "https://ledneonpublicidad.com/productosPrincipal/7hamburguesa.webp",
        "description": "Los Menú Boards son pantallas o paneles visuales en establecimientos de comida que muestran productos, precios e imágenes. Su objetivo es que los clientes elijan fácilmente qué ordenar.",
        "brand": {
          "@type": "Brand",
          "name": "LedNeonPublicidad"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 8,
      "item": {
        "@type": "Product",
        "name": "Letras Pintadas en MDF",
        "url": "https://ledneonpublicidad.com/productos/letras-pintadas",
        "image": "https://ledneonpublicidad.com/productosPrincipal/8burnout.jpg",
        "description": "Letras en MDF pintadas a medida para negocios que quieren destacar su identidad visual sin gastar de más. Ideales para decorar paredes, stands y vitrinas.",
        "brand": {
          "@type": "Brand",
          "name": "LedNeonPublicidad"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 9,
      "item": {
        "@type": "Product",
        "name": "Monitores de Publicidad",
        "url": "https://ledneonpublicidad.com/productos/displays",
        "image": "https://ledneonpublicidad.com/productosPrincipal/monitores_tactiles.jpg",
        "description": "Destaca tu marca con monitores de publicidad digital modernos, sostenibles y versátiles. Comunica con impacto.",
        "brand": {
          "@type": "Brand",
          "name": "LedNeonPublicidad"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 10,
      "item": {
        "@type": "Product",
        "name": "Pantallas Led",
        "url": "https://ledneonpublicidad.com/productos/pantalla-led",
        "image": "https://ledneonpublicidad.com/productosPrincipal/Pantallas_led.jpg",
        "description": "Las pantallas LED son una muy buena herramienta visual para mostrar diseños, destacar con dinamismo y transmitir videos, promociones y mensajes en alta resolución.",
        "brand": {
          "@type": "Brand",
          "name": "LedNeonPublicidad"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 11,
      "item": {
        "@type": "Product",
        "name": "Holográfico",
        "url": "https://ledneonpublicidad.com/productos/holografico",
        "image": "https://ledneonpublicidad.com/productosPrincipal/holograma_3d_1.png",
        "description": "Descubre los mejores productos holográficos en Lima, Perú. Tecnología innovadora para publicidad y decoración.",
        "brand": {
          "@type": "Brand",
          "name": "LedNeonPublicidad"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 12,
      "item": {
        "@type": "Product",
        "name": "Pixel Led",
        "url": "https://ledneonpublicidad.com/productos/pixel-led",
        "image": "https://ledneonpublicidad.com/productosPrincipal/pixel_led_1.png",
        "description": "Descubre los mejores productos de iluminación Pixel LED en Lima, Perú. Tecnología innovadora ideal para publicidad y decoración.",
        "brand": {
          "@type": "Brand",
          "name": "LedNeonPublicidad"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 13,
      "item": {
        "@type": "Product",
        "name": "Sillas Luminosas",
        "url": "https://ledneonpublicidad.com/productos/sillas-luminosas",
        "image": "https://ledneonpublicidad.com/productosPrincipal/sillas_luminosas_1.png",
        "description": "Transforma tus eventos y espacios con nuestras sillas luminosas en Lima, Perú. Diseño innovador y personalizable.",
        "brand": {
          "@type": "Brand",
          "name": "LedNeonPublicidad"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 14,
      "item": {
        "@type": "Product",
        "name": "Techos Led",
        "url": "https://ledneonpublicidad.com/productos/techos-led",
        "image": "https://ledneonpublicidad.com/productosPrincipal/luces_led_techo_1.png",
        "description": "Su diseño moderno y opciones de personalización lo convierten en una solución ideal para negocios que buscan destacar con elegancia y alto impacto.",
        "brand": {
          "@type": "Brand",
          "name": "LedNeonPublicidad"
        }
      }
    }
  ]
};


   return (
    <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
        {children}
    
    </>
  );
}
