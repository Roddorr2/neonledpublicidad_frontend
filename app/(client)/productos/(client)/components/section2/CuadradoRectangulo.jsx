import React from "react";
import "./productsStyle.css";

const productosInfo = [
  { id: 1, title: "LETRAS DE ACRÍLICO", description: "Las letras de acrílico personalizadas son elementos decorativos y funcionales ideales para una amplia variedad de aplicaciones. Disponibles en versiones iluminadas para exteriores, las letras personalizadas para negocios y empresas se adaptan a tus necesidades.", image: "AcrilicoLaptop.webp" },
  { id: 2, title: "LETRAS DORADAS Y PLATEADAS", description: "Las letras doradas y plateadas son las más utilizadas al momento de querer destacar un acabado más elegante y exclusivo en la calidad de un negocio. Son mayormente utilizadas en restaurantes, hoteles, joyerías o tiendas más exclusivas.", image: "LetrasDoradoLaptop.webp" },
  { id: 3, title: "LETREROS LUMINOSOS", description: "Los letreros luminosos son una poderosa herramienta publicitaria efectiva que combina tecnología innovadora y diseño personalizado para captar la atención de los consumidores. Los letreros luminosos pueden ser cajas de luz, letras y logotipos corpóreos o bandejas.", image: "LetrerosLuminososLaptop.webp" },
  { id: 4, title: "LETRAS DE NEÓN EN TUBOS DE VIDRIO", description: "Tubos de vidrio se adaptan cualquier forma, creando letras de neón que se pueden personalizar según las preferencias del cliente. Además estos letreros neón pueden ser elementos decorativos o publicitarios que se caracterizan por su luminosidad y estética definitiva.", image: "LetrasNeonLaptop.png" },
  { id: 5, title: "LETRAS DE NEÓN LED", description: "Tubos con led se adaptan cualquier forma, creando letras de neón que se pueden personalizar según las preferencias del cliente. Además estos letreros neón pueden ser elementos decorativos o publicitarios que se caracterizan por su luminosidad y estética definitiva.", image: "burguerLaptop.png" },
  { id: 6, title: "IMPRESIÓN EN VINILES DECORATIVOS", description: "Vinilos para pared es la solución perfecta para llevar tu mensaje, diseño o logotipo a cualquier superficie de forma creativa y resistente. Gracias a su versatilidad, vinilos decorativos permiten lograr acabados exactos y detallados que se adaptan a cualquier estilo.", image: "ViniloLaptop.webp" },
  { id: 7, title: "MENÚ BOARD", description: "Las imágenes en alta definición que usa los Menú Board, el colorido y la variedad de los contenidos atrapan a todo el tipo de público. Eso es debido a la capacidad de variar contenidos de adaptarlos a los horarios y a las características de los clientes.", image: "MenuLaptop.webp" },
  { id: 8, title: "LETRAS PINTADAS EN MDF", description: "Las letras en MDF ofrecen una solución ideal para decoración y señalizacion gracias a su alta personalización, permitiendo elegir formas, tamaños y colores. Y con acabados premium, estas logran una apariencia impecable y elegante, destacando en cualquier entorno.", image: "LetrasMDFLaptop.webp" },
  { id: 9, title: "DISPLAYS", description: "Los displays LED ofrecen una tecnología innovadora que no solo transforma la forma en que presentas tu mensaje, sino que tambien contribuye a un impacto ambiental positivo. Al ser más eficientes que las opciones tradicionales.", image: "DisplaysLaptop.webp" },
  { id: 10, title: "PANTALLAS LED", description: "Nuestra venta de pantallas LED incluye opciones personalizadas como pantallas LED a medida, perfectas para campañas publicitarias. Lo que genera que sean una herramienta efectiva para captar la atención y transmitir mensajes de manera clara y atractiva. Siendo ideales para convertirse en una opción más sostenible y económica a largo plazo.", image: "PantallasLedLaptop.png" },
  { id: 11, title: "HOLOGRÁFICO", description: "Nuestra venta de proyectores holográficos incluye modelos de última generación, ideales para publicidad, entretenimiento y educación. Generando que nuestros proyectores holográficos sean dispositivos innovadores que proyectan imágenes tridimensionales en el aire, creando un efecto visual único.", image: "HolograficoLaptop.webp" },
  { id: 12, title: "PIXEL LED", description: "Los píxeles LED ofrecen una combinación de tecnología innovadora y personalización, ideales para eventos de entretenimiento o parques temáticos. Su diseño hexagonal permite jugar con una amplia gama de colores y patrones, adaptándose a cualquier espacio o temática.", image: "PixelLedLaptop.png" },
  { id: 13, title: "SILLAS LUMINOSAS", description: "Las sillas luminosas son una opción innovadora para quienes buscan un mobiliario iluminado LED que combine estética y funcionalidad. Estas sillas con luces LED ofrecen una experiencia visual única.", image: "SillasLuminosasLaptop.png" },
  { id: 14, title: "TECHOS LED", description: "Los techos LED son una solución avanzada de iluminación LED, integrando tecnología de última generación para ofrecer un techo de luz eficiente y de alta calidad. Estos techos decorativos no solo mejoran la estética de los espacios, sino que también garantizan iluminación eficiente.", image: "TechosLedLaptop.png" },
];

export default function SquareRectangle({ idProducto }) {
  const producto = productosInfo.find((p) => p.id === idProducto);

  if (!producto) return <div>Producto no encontrado</div>;

  return (
    <div className="square-info-container">
      {/* Cuadrado sin contenido */}
      <div className="custom-square"></div>
   
      {/* Imagen entre el cuadrado y el rectángulo */}
      <img
        src={`/productosIndividuales/${producto.image}`}
        alt={producto.title}
        className="intermediate-image overflow-hidden"
      />

      {/* Rectángulo con título y descripción */}
      <div className="info-rectangle">
        <h3 className="info-title">{producto.title}</h3>
        <p className="info-description">{producto.description}</p>
      </div>
    </div>
  );
}
