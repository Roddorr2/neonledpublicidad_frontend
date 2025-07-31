import React from "react";
import "./productsStyle.css";
import TextWithLinks from "./TextWithLinks";
import { getProductKeywords } from "./keywordsConfig";

const productosInfo = [
  { id: 1, 
    title: "LETRAS DE ACRÍLICO", 
    description: "{{Letras de acrílico}} son elementos decorativos y funcionales ideales para una amplia variedad de aplicaciones. Contamos con {{letras de acrílico para negocio}}, y empresas en versiones iluminadas para exteriores. {{Letras de acrílico con luz}} y {{letras de acrílico 3D}} que se adaptan a tus necesidades.", 
    image: "letras_acrílico_ledneonpublicidad.webp",
    alt: "Letrero con letras de acrílico en un fondo de pantalla",
    keywords: {
      "Letras de acrílico": { type: "external", url: "/productos/letras-acrilico" },
      "letras de acrílico para negocio": { type: "external", url: "/productos/letras-acrilico#negocios" },
      "Letras de acrílico con luz": { type: "external", url: "/productos/letras-acrilico#iluminadas" },
      "letras de acrílico 3D": { type: "external", url: "/productos/letras-acrilico#3d" }
    }
  },
  { id: 2, 
    title: "LETRAS DORADAS Y PLATEADAS", 
    description: "{{Letras doradas y plateadas}} son las más utilizadas al momento de querer destacar. {{Letreros luminosos}} con un acabado más elegante y exclusivo en la calidad de un negocio. {{Letras corpóreas retroiluminadas}} son mayormente utilizadas en restaurantes, hoteles, joyerías o tiendas más exclusivas.", 
    image: "LetrasDoradoLaptop.webp",
    keywords: {
      "letras doradas y plateadas": { type: "external", url: "https://www.tiktok.com/@neonled.publicidad/video/7485514244406906118?_d=secCgYIASAHKAESPgo8wzf0vPe0lAR45RRxMR3IPM2NXrsByKP2oTlqhHEcVB%2Bwo4Np%2F0jZYIaJoRVQCFQDSCyeAJ6hOOepEwLtGgA%3D&_r=1&share_app_id=1233&share_item_id=7485514244406906118&timestamp=1742857119&u_code=dmbhh0g8335e9g&utm_campaign=client_share&utm_source=short_fallback" },
      "Letreros luminosos": { type: "external", url: "https://www.tiktok.com/@neonled.publicidad/video/7485514244406906118?_d=secCgYIASAHKAESPgo8wzf0vPe0lAR45RRxMR3IPM2NXrsByKP2oTlqhHEcVB%2Bwo4Np%2F0jZYIaJoRVQCFQDSCyeAJ6hOOepEwLtGgA%3D&_r=1&share_app_id=1233&share_item_id=7485514244406906118&timestamp=1742857119&u_code=dmbhh0g8335e9g&utm_campaign=client_share&utm_source=short_fallback" },
      "Letras corpóreas retroiluminadas": { type: "external", url: "https://www.tiktok.com/@neonled.publicidad/video/7485514244406906118?_d=secCgYIASAHKAESPgo8wzf0vPe0lAR45RRxMR3IPM2NXrsByKP2oTlqhHEcVB%2Bwo4Np%2F0jZYIaJoRVQCFQDSCyeAJ6hOOepEwLtGgA%3D&_r=1&share_app_id=1233&share_item_id=7485514244406906118&timestamp=1742857119&u_code=dmbhh0g8335e9g&utm_campaign=client_share&utm_source=short_fallback" }
    }
    
  },
  { id: 3, 
    title: "LETREROS LUMINOSOS", 
    description: "{{Letreros luminosos para negocios}} son una poderosa herramienta publicitaria efectiva que combina tecnología innovadora y diseño personalizado para captar la atención de los consumidores. {{Letreros luminosos}} pueden ser cajas de luz, {{letreros luminosos led para negocio}}, letras y logotipos corpóreos o bandejas.", 
    image: "LetrerosLuminososLaptop.webp",
    keywords: {
      "Letreros luminosos para negocios": { type: "external", url: "https://www.youtube.com/watch?v=czpLh7XW21E" },
      "Letreros luminosos": { type: "external", url: "https://www.youtube.com/watch?v=czpLh7XW21E" },
      "letreros luminosos led para negocio": { type: "external", url: "https://www.youtube.com/watch?v=czpLh7XW21E" }
    }
    
  },
  { id: 4, 
    title: "LETRAS DE NEÓN EN TUBOS DE VIDRIO", 
    description: "{{Tubos de vidrio}} se adaptan cualquier forma, creando {{letras de neón}} que se pueden personalizar según las preferencias del cliente. Además estos {{letreros neón}} pueden ser elementos decorativos o publicitarios que se caracterizan por su luminosidad y estética definitiva.", 
    image: "letras_neon_de_vidrio_ledneonpublicidad.webp",
    alt: "laptop con fondo de pantalla de letras neón en tubo de vidrio",
    keywords: {
      "Tubos de vidrio": { type: "external", url: "https://www.youtube.com/shorts/EIO79BjNCqY" },
      "letras de neón": { type: "external", url: "https://www.youtube.com/shorts/EIO79BjNCqY" },
      "letreros neón": { type: "external", url: "https://www.youtube.com/shorts/EIO79BjNCqY" }
    }
  },

  { id: 5, 
    title: "LETRAS DE NEÓN LED", 
    description: "{{Tubos con led}} se adaptan cualquier forma, creando {{letras de neón}} que se pueden personalizar según las preferencias del cliente. Además estos {{letreros neón}} pueden ser elementos decorativos o publicitarios que se caracterizan por su luminosidad y estética definitiva.", 
    image: "letras_de_neon_ledneonpublicidad.webp",
    alt: "Diseño de letrero neón Burger proyectado en pantalla de laptop sobre pared de ladrillo",
    keywords: {
      "Tubos con led": { type: "external", url: "https://www.youtube.com/watch?v=lt7BVc6ENHQ" },
      "letras de neón": { type: "external", url: "https://www.youtube.com/watch?v=lt7BVc6ENHQ" },
      "letreros neón": { type: "external", url: "https://www.youtube.com/watch?v=lt7BVc6ENHQ" }
    }
  },
  { id: 6, 
    title: "IMPRESIÓN EN VINILO", 
    description: "{{Vinilos para pared}} es la solución perfecta para llevar tu mensaje, diseño o logotipo a cualquier superficie de forma creativa y resistente. Gracias a su versatilidad, {{vinilos decorativos}} permiten lograr acabados exactos y detallados que se adaptan a cualquier estilo.", 
    image: "vinilo-decorativo-menu-para-restaurante.webp",
    alt: "Vinilo decorativo con menú ilustrado en pared de restaurante con temática de comida rápida",
    keywords: {
      "Vinilos para pared": { type: "external", url: "https://www.youtube.com/shorts/dwzdjUjt0ys" },
      "vinilos decorativos": { type: "external", url: "https://www.youtube.com/shorts/dwzdjUjt0ys" }
    }
  },
  { id: 7, 
    title: "MENÚ BOARDS", 
    description: "Las imágenes en alta definición que usa los {{menú boards personalizados}}, el colorido y la variedad de los contenidos atrapan a todo el tipo de público a ver los {{menú boards fast food}}. Elaborado con materiales resistentes, los restaurantes {{menú boards}} asegura durabilidad al descate y condiciones adversas.", 
    image: "menu-digital-burgers-whopper-triple-pantalla.webp",
    alt: "Pantalla digital con menú de hamburguesas Whopper y promociones de triple combo",
    keywords: {
      "menú boards personalizados": { type: "external", url: "/productos/menu-board" },
      "menú boards fast food": { type: "external", url: "/productos/menu-board" },
      "menú boards": { type: "external", url: "/productos/menu-board" }
    }
  },
  { id: 8, 
    title: "LETRAS PINTADAS EN MDF", 
    description: "{{Letras en MDF}} ofrecen una solución ideal para decoración y señalización gracias a su alta personalización, permitiendo elegir formas, tamaños y colores. Con acabados premium, estas {{letras MDF personalizadas}} logran una apariencia impecable y elegante, destacando en cualquier entorno el {{pintado 3D}}.", 
    image: "letrero-mdf-burnout-con-forma-de-camion.webp",
    alt: "Letrero pintado en MDF con diseño de camión y texto Burnout en color amarillo sobre muro gris",
     keywords: {
      "Letras en MDF": { type: "external", url: "/productos/letras-en-mdf" },
      "letras MDF personalizadas": { type: "external", url: "/productos/letras-en-mdf" },
      "pintado 3D": { type: "external", url: "/productos/letras-en-mdf" }
    }
  },
  { id: 9, 
    title: "MONITORES DE PUBLICIDAD DIGITAL", 
    description: "{{Publicidad digital}} ofrece una tecnología innovadora que no solo transforma la forma en que presentas tu mensaje, sino que también contribuye a un impacto ambiental positivo. {{Monitores táctiles}} son más eficientes que las opciones tradicionales.", 
    image: "monitores-publicidad-digital-autoservicio-fast-food.webp",
    alt: "Monitores de publicidad digital interactivos para autoservicio en restaurante de comida rápida",
    keywords: {
      "Publicidad digital": { type: "external", url: "https://www.youtube.com/shorts/UoyMgkSAyXE" },
      "Monitores táctiles": { type: "external", url: "https://www.youtube.com/shorts/UoyMgkSAyXE" },
    }
  },
  { id: 10, 
    title: "PANTALLAS LED", 
    description: "{{Pantallas led para publicidad}} incluye opciones personalizadas como {{Pantallas LED}} a medida, perfectas para campañas publicitarias. Lo que genera que sean una herramienta efectiva para captar la atención y transmitir mensajes de manera clara y atractiva. Siendo ideales para convertirse en una opción más sostenible y económica a largo plazo.", 
    image: "pantallas-publicitarias-digitales-exterior-de-todito.webp",
    alt: "Pantallas publicitarias digitales exteriores mostrando promociones de productos De Todito",
    keywords: {
      "Pantallas led para publicidad": { type: "external", url: "productos/pantalla-led" },
      "Pantallas LED": { type: "external", url: "productos/pantalla-led" },
    }
  },
  { id: 11, 
    title: "HOLOGRÁFICOS", 
    description: "Nuestra venta de {{ventilador holográfico}} incluye modelos de última generación, ideales para publicidad, entretenimiento y educación. Generando que nuestros {{proyectores 3D holográfico}} sean dispositivos innovadores que proyectan imágenes tridimensionales en el aire, creando un efecto visual de {{holograma 3D}}.", 
    image: "pantalla-led-gigante-publicidad-20th-century-fox.webp",
    alt: "Proyector holográfico 3D mostrando una medusa flotando sobre escritorio moderno",
    keywords: {
      "ventilador holográfico": { type: "external", url: "https://www.youtube.com/shorts/KIFvX2q0rC8" },
      "proyectores 3D holográfico": { type: "external", url: "https://www.youtube.com/shorts/KIFvX2q0rC8" },
      "holograma 3D": { type: "external", url: "https://www.youtube.com/shorts/KIFvX2q0rC8" },
    }
  },
  { id: 12, 
    title: "LED PIXEL", 
    description: "Pixel LED ofrecen una combinación de tecnología innovadora y personalización, ideales para eventos de entretenimiento o parques temáticos. Led túnel y su diseño hexagonal permite jugar con una amplia gama de colores LED RGB.", 
    image: "pasillo-led-morado-hexagonal.webp",
    alt: "Pasillo iluminado con estructura de luces LED moradas en forma hexagonal"
  },
  { id: 13, 
    title: "SILLAS LUMINOSAS", 
    description: "{{Sillas led}} son una opción innovadora para quienes buscan un {{mobiliario LED}} que combine estética y funcionalidad. Estas {{sillas con luces LED}} ofrecen una experiencia visual única.", 
    image: "mesa-led-luminosa-para-eventos.webp",
    alt: "Mesas LED iluminadas en salón elegante ideales para eventos nocturnos",
    keywords: {
      "Sillas led": { type: "external", url: "https://www.youtube.com/watch?v=C6YtUCgjW-I" },
      "mobiliario LED": { type: "external", url: "https://www.youtube.com/watch?v=C6YtUCgjW-I" },
      "sillas con luces LED": { type: "external", url: "https://www.youtube.com/watch?v=C6YtUCgjW-I" }
    }

  },
  { id: 14, 
    title: "TECHOS LED", 
    description: "{{Techos con LED}} son una solución avanzada de iluminación LED, integrando tecnología de última generación para ofrecer {{luces led en techo}} eficiente y de alta calidad. Estos {{techos decorados con led}} no solo mejoran la estética de los espacios, sino que también garantizan iluminación eficiente.", 
    image: "taller-autos-iluminacion-led.webp",
    alt: "Taller automotriz con iluminación LED hexagonal moderna en el techo",
    keywords: {
      "Techos con LED": { type: "external", url: "https://www.youtube.com/shorts/zNNT7lo7P7E" },
      "luces led en techo": { type: "external", url: "https://www.youtube.com/shorts/zNNT7lo7P7E" },
      "techos decorados con led": { type: "external", url: "https://www.youtube.com/shorts/zNNT7lo7P7E" }
    }
  },
];

export default function SquareRectangle({ idProducto }) {
  const producto = productosInfo.find((p) => p.id === idProducto);
  const globalKeywords = getProductKeywords(idProducto);
  
  // Combinar keywords locales del producto con las globales
  const keywords = {
    ...globalKeywords,
    ...(producto?.keywords || {})
  };

  if (!producto) return <div>Producto no encontrado</div>;

  return (
    <div className="square-info-container">
      {/* Cuadrado sin contenido */}
      <div className="custom-square"></div>
   
      {/* Imagen entre el cuadrado y el rectángulo */}
      <img
        src={`/productosIndividuales/${producto.image}`}
        alt={producto.alt ? producto.alt : producto.title}
        className="intermediate-image overflow-hidden"
      />

      {/* Rectángulo con título y descripción */}
      <div className="info-rectangle">
        <h3 className="info-title">{producto.title}</h3>
        <p className="info-description">
          <TextWithLinks 
            text={producto.description} 
            keywords={keywords}
          />
        </p>
      </div>
    </div>
  );
}
