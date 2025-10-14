import React from "react";
import styles from "./productsStyle.module.css";
import TextWithLinks from "./TextWithLinks";
import { getProductKeywords } from "./keywordsConfig";

const productosInfo = [
  {
    id: 1,
    title: "LETRAS DE ACRÍLICO",
    description:
      "Letras de acrílico son elementos decorativos y funcionales ideales para una amplia variedad de aplicaciones. Contamos con letras de acrílico para negocio, y empresas en versiones iluminadas para exteriores. Letras de acrílico con luz y {{letras de acrílico 3D}} que se adaptan a tus necesidades.",
    image: "letras_acrílico_ledneonpublicidad.webp",
    alt: "Letrero con letras de acrílico en un fondo de pantalla",
    // Funciona pero hace la redireccion hacia la misma página
    keywords: {
      "letras de acrílico 3D": {
        type: "external",
        url: "https://ledneonpublicidad.com/blog/plantilla2/?blog=letras-acrilicas-3d-moda",
      },
    },
  },
  {
    id: 2,
    title: "LETRAS DORADAS Y PLATEADAS",
    description:
      "Letras doradas y plateadas son las más utilizadas al momento de querer destacar. Letreros luminosos con un acabado más elegante y exclusivo en la calidad de un negocio. {{Letras corpóreas retroiluminadas}} son mayormente utilizadas en restaurantes, hoteles, joyerías o tiendas más exclusivas.",
    image: "LetrasDoradoLaptop.webp",
    keywords: {
      "Letras corpóreas retroiluminadas": {
        type: "external",
        url: "https://ledneonpublicidad.com/blog/plantilla2/?blog=letras-dyp-con-elegancia",
      },
    },
  },
  {
    id: 3,
    title: "LETREROS LUMINOSOS",
    description:
      "Los letreros luminosos son una de las formas más efectivas de publicidad para negocios, ya que combinan diseño personalizado y tecnología LED para destacar tu marca. Pueden ser cajas de luz, letreros acrílicos, letras corpóreas o incluso {{letreros luminosos 3D}}, ideales para restaurantes y todo tipo de comercios.",
    image: "LetrerosLuminososLaptop.webp",
    keywords: {
      "letreros luminosos 3D": {
        type: "external",
        url: "https://ledneonpublicidad.com/blog/plantilla2/?blog=discotecas-que-brillan",
      },
    },
  },
  {
    id: 4,
    title: "LETRAS DE NEÓN EN TUBOS DE VIDRIO",
    description:
      "Tubos de vidrio se adaptan cualquier forma, creando letras de neón que se pueden personalizar según las preferencias del cliente. Además estos letreros neón pueden ser elementos decorativos o publicitarios que se caracterizan por su luminosidad y estética definitiva.",
    image: "letras_neon_de_vidrio_ledneonpublicidad.webp",
    alt: "laptop con fondo de pantalla de letras neón en tubo de vidrio",
  },

  {
    id: 5,
    title: "LETRAS DE NEÓN LED",
    description:
      "Tubos con led se adaptan cualquier forma, creando {{letras de neón}} que se pueden personalizar según las preferencias del cliente. Además estos letreros neón pueden ser elementos decorativos o publicitarios que se caracterizan por su luminosidad y estética definitiva.",
    image: "letras_de_neon_ledneonpublicidad.webp",
    alt: "Diseño de letrero neón Burger proyectado en pantalla de laptop sobre pared de ladrillo",
    keywords: {
      "letras de neón": {
        type: "external",
        url: "https://ledneonpublicidad.com/blog/plantilla2/?blog=neon-led-para-bares-modernos",
      },
    },
  },
  {
    id: 6,
    title: "IMPRESIÓN EN VINILO",
    description:
      "Vinilos para pared es la solución perfecta para llevar tu mensaje, diseño o logotipo a cualquier superficie de forma creativa y resistente. Gracias a su versatilidad, {{vinilos decorativos}} permiten lograr acabados exactos y detallados que se adaptan a cualquier estilo.",
    image: "vinilo-decorativo-menu-para-restaurante.webp",
    alt: "Vinilo decorativo con menú ilustrado en pared de restaurante con temática de comida rápida",
    keywords: {
      "vinilos decorativos": {
        type: "external",
        url: "https://ledneonpublicidad.com/blog/plantilla2/?blog=neon-led-para-bares-modernos",
      },
    },
  },
  {
    id: 7,
    title: "MENÚ BOARDS",
    description:
      "Los letreros de menú en alta definición, con diseños coloridos y contenidos variados, atraen fácilmente la atención del público. Estos {{menú boards personalizados}} no solo destacan los productos, sino que, al estar fabricados con materiales resistentes, ofrecen gran durabilidad frente al uso constante y a las condiciones adversas.",
    image: "menu-digital-burgers-whopper-triple-pantalla.webp",
    alt: "Pantalla digital con menú de hamburguesas Whopper y promociones de triple combo",
    // Funciona pero hace la redireccion hacia la misma página
    keywords: {
      "menú boards personalizados": {
        type: "external",
        url: "https://ledneonpublicidad.com/blog/plantilla2/?blog=cafeterias-con-estilo",
      },
    },
  },
  {
    id: 8,
    title: "LETRAS PINTADAS EN MDF",
    description:
      "Letras en MDF ofrecen una solución ideal para decoración y señalización gracias a su alta personalización, permitiendo elegir formas, tamaños y colores. Con acabados premium, estas letras MDF personalizadas logran una apariencia impecable y elegante, destacando en cualquier entorno el pintado 3D.",
    image: "letrero-mdf-burnout-con-forma-de-camion.webp",
    alt: "Letrero pintado en MDF con diseño de camión y texto Burnout en color amarillo sobre muro gris",
    //  keywords: {
    //   "Letras en MDF": { type: "external", url: "/productos/letras-en-mdf" },
    //   "letras MDF personalizadas": { type: "external", url: "/productos/letras-en-mdf" },
    //   "pintado 3D": { type: "external", url: "/productos/letras-en-mdf" }
    // }
  },
  {
    id: 9,
    title: "MONITORES DE PUBLICIDAD DIGITAL",
    description:
      "Publicidad digital ofrece una tecnología innovadora que no solo transforma la forma en que presentas tu mensaje, sino que también contribuye a un impacto ambiental positivo. Monitores táctiles son más eficientes que las opciones tradicionales.",
    image: "monitores-publicidad-digital-autoservicio-fast-food.webp",
    alt: "Monitores de publicidad digital interactivos para autoservicio en restaurante de comida rápida",
  },
  {
    id: 10,
    title: "PANTALLAS LED",
    description:
      "{{Pantallas led para publicidad}} incluye opciones personalizadas como Pantallas LED a medida, perfectas para campañas publicitarias. Lo que genera que sean una herramienta efectiva para captar la atención y transmitir mensajes de manera clara y atractiva. Siendo ideales para convertirse en una opción más sostenible y económica a largo plazo.",
    image: "pantallas-publicitarias-digitales-exterior-de-todito.webp",
    alt: "Pantallas publicitarias digitales exteriores mostrando promociones de productos De Todito",
    keywords: {
      "Pantallas led para publicidad": {
        type: "external",
        url: "https://ledneonpublicidad.com/blog/plantilla2/?blog=pantallas-led-para-locales",
      },
    },
  },
  {
    id: 11,
    title: "HOLOGRÁFICOS",
    description:
      "Nuestra venta de ventilador holográfico incluye modelos de última generación, ideales para publicidad, entretenimiento y educación. Generando que nuestros proyectores 3D holográfico sean dispositivos innovadores que proyectan imágenes tridimensionales en el aire, creando un efecto visual de holograma 3D.",
    image: "pantalla-led-gigante-publicidad-20th-century-fox.webp",
    alt: "Proyector holográfico 3D mostrando una medusa flotando sobre escritorio moderno",
  },
  {
    id: 12,
    title: "LED PIXEL",
    description:
      "{{Pixel LED}} ofrecen una combinación de tecnología innovadora y personalización, ideales para eventos de entretenimiento o parques temáticos. Led túnel y su diseño hexagonal permite jugar con una amplia gama de colores LED RGB.",
    image: "pasillo-led-morado-hexagonal.webp",
    alt: "Pasillo iluminado con estructura de luces LED moradas en forma hexagonal",
    keywords: {
      "Pixel LED": {
        type: "external",
        url: "https://ledneonpublicidad.com/blog/plantilla2/?blog=led-pixel-para-discotecas",
      },
    },
  },
  {
    id: 13,
    title: "SILLAS LUMINOSAS",
    description:
      "Sillas led son una opción innovadora para quienes buscan un mobiliario LED que combine estética y funcionalidad. Estas {{sillas con luces LED}} ofrecen una experiencia visual única.",
    image: "mesa-led-luminosa-para-eventos.webp",
    alt: "Mesas LED iluminadas en salón elegante ideales para eventos nocturnos",
    keywords: {
      "sillas con luces LED": {
        type: "external",
        url: "https://ledneonpublicidad.com/blog/plantilla2/?blog=sillas-luminosas-para-eventos",
      },
    },
  },
  {
    id: 14,
    title: "TECHOS LED",
    description:
      "Techos con LED son una solución avanzada de iluminación LED, integrando tecnología de última generación para ofrecer luces led en techo eficiente y de alta calidad. Estos {{techos decorados con led}} no solo mejoran la estética de los espacios, sino que también garantizan iluminación eficiente.",
    image: "taller-autos-iluminacion-led.webp",
    alt: "Taller automotriz con iluminación LED hexagonal moderna en el techo",
    keywords: {
      "techos decorados con led": {
        type: "external",
        url: "https://ledneonpublicidad.com/blog/plantilla2/?blog=techos-led-para-gimnasios",
      },
    },
  },
];

export default function SquareRectangle({ idProducto }) {
  const producto = productosInfo.find((p) => p.id === idProducto);
  const globalKeywords = getProductKeywords(idProducto);

  // Combinar keywords locales del producto con las globales
  const keywords = {
    ...globalKeywords,
    ...(producto?.keywords || {}),
  };

  if (!producto) return <div>Producto no encontrado</div>;

  return (
    <div className={styles["square-info-container"]}>
      {/* Rectángulo con título y descripción */}
      <div className={styles["info-rectangle"]}>
        <h3 className={styles["info-title"]}>{producto.title}</h3>
        <p className={styles["info-description"]}>
          <TextWithLinks text={producto.description} keywords={keywords} />
        </p>
      </div>
    </div>
  );
}
