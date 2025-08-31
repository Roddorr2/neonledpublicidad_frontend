'use client';
import NeonBackground from '../../components/Luz';
import React, { useState } from "react";
import Card from './card';
const data = [
  {
    id: 5,
    producto: "NEÓN LED",
    caracteristica: "Consisten en una manguera que contiene el circuito LED y se ofrecen en diseños de uno o dos hilos. Sumado a ello, son una excelente opción para diseñar rótulos de neón LED a medida.",
    ventaja: "El material con el que está fabricado ofrece una ventaja en cuanto a peso, siendo más ligero que el vidrio.",
    consumo_energetico: "Los neones LED consumen hasta un 80% menos de energía que los neones tradicionales, consumiendo desde 30W en adelante.",
    iluminacion: "Su luz LED es flexible, ya que utiliza tiras LED SMD de alto brillo como fuente de luz interna.",
    durabilidad: "Están fabricadas con materiales de alta calidad, lo que les otorga una gran resistencia y una larga vida útil.",
  },
  {
    id: 1,
    producto: "LETRAS DE ACRÍLICO",
    caracteristica: "Elaborados en acrílico. Cuentan con un diseño tridimensional y un acabado brillante, haciendo que estén disponibles en una amplia gama de colores y diseños.",
    ventaja: "Su superficie se limpia con facilidad y vuelve a su estado original con poco esfuerzo. Además, gracias a su material duradero, se mantiene intacto con el paso del tiempo.",
    consumo_energetico: "El consumo energético de los letreros iluminados con tecnología LED puede variar de 30W a más dependiendo del uso.",
    iluminacion: "Incorpora iluminación lateral o frontal, según el efecto de luz que se quiera lograr. También se ajusta al estilo y preferencia de cada persona.",
    durabilidad: "Cuenta con una alta resistencia a las condiciones climáticas, lo que lo convierte en la opción ideal para espacios al aire libre.",
  },
  {
    id: 4,
    producto: "LETRAS DE NEÓN EN TUBOS DE VIDRIO",
    caracteristica: "Construidos a partir de tubos de vidrio, su estructura puede ser de un solo hilo o doble hilo. Gracias a esta versatilidad, son aptos para ser utilizados en interiores y exteriores.",
    ventaja: "Permiten a negocios y eventos fortalecer su presencia en redes sociales y su visibilidad para ganar más clientes, actuando así como una herramienta clave e importante de marketing.",
    consumo_energetico: "Las letras en tubos de neón led utilizan tecnología LED lo cual hace que consuman desde 30W en adelante dependiendo de su uso.",
    iluminacion: "La intensidad luminosa varía según el gas utilizado, el grosor del tubo y el voltaje aplicado; estos factores determinan que el neón sea particularmente brillante.",
    durabilidad: "Pueden instalarse tanto fuera como dentro, ya que su alta resistencia a la intemperie los hace aptos para cualquier estación durante todo el año.",
  },
  {
    id: 3,
    producto: "LETREROS LUMINOSOS",
    caracteristica: "Los letreros luminosos cuentan con una estructura de fierro disponible en diversos colores y diseños, lo que permite adaptarlos a distintos estilos visuales. Están diseñados para iluminar amplias zonas, lo que los hace ideales para exteriores.",
    ventaja: "Se ajustan perfectamente a la identidad corporativa de la marca, ofreciendo la posibilidad de personalizar colores, sistemas de iluminación y estilos de diseño según las necesidades de cada uno. Estos pueden ser de una o dos caras.",
    consumo_energetico: "Su consumo puede variar dependiendo del porpósito que se le de, sin embargo, su rango va desde los 30W en adelante.",
    iluminacion: "Se emplea tecnología LED como fuente de iluminación, lo que permite obtener un brillo uniforme, intenso, de calidad y de alta eficiencia energética.",
    durabilidad: " Están diseñados con materiales resistentes que soportan diversas condiciones climáticas. Su durabilidad garantiza un rendimiento óptimo a lo largo del tiempo.",
  },
  {
    id: 2,
    producto: "LETRAS DORADAS Y PLATEADAS",
    caracteristica: "Fabricadas en aluminio anodizado en tonos dorado y plateado. Estas piezas se pueden personalizar en distintos tamaños y estilos, ajustándose a la identidad visual de la marca. Además, son ideales para interiores como para exteriores.",
    ventaja: "Las letras en dorado y plateado tienen un destacado visual, lo que contribuye a llamar la atención de posibles futuros clientes.",
    consumo_energetico: "Se utilizan LEDS incrustados que permiten una iluminación uniforme y con un consumo de 30W a más dependiendo del uso.",
    iluminacion: "La iluminación de estas letras se proyecta a través de sus bordes, creando un efecto visual suave y elegante, lo que realza su presencia, especialmente en entornos con poca luz.",
    durabilidad: "Las letras se fabrican con materiales duraderos y de alta resistencia, lo que garantiza su estabilidad y prolongada su vida útil, incluso en condiciones climáticas adversas.",
  },
  {
    id: 6,
    producto: "IMPRESIÓN EN VINILES DECORATIVOS",
    caracteristica: "Imprimir en vinilo es una opción económica que posibilita a negocios y hogares decorar sin que esto represente un alto costo.",
    ventaja: "Gracias a la gran variedad de diseños y estilos existentes, los clientes pueden personalizar sus espacios a su gusto y con las especificaciones que lo requieran.",
    consumo_energetico: "La impresión en vinilos decorativos no consume energía eléctrica.",
    iluminacion: "El principal atrativo de los vinilos retroiluminados radica en su propiedad de permitir el paso de la luz, lo que resulta en efectos visuales llamativos.",
    durabilidad: "Fabricados con materiales de alta calidad, los vinilos decorativos son muy duraderos y resistentes a la decoloración, incluso con exposición constante al sol.",
  },
  {
    id: 7,
    producto: "MENÚ BOARD",
    caracteristica: "Hechos de acero y aluminio, para uso interno y con diseños variados, estos elementos permiten actualizar el menú al momento, lo que es perfecto para mostrar cambios en ingredientes o promociones especiales.",
    ventaja: "Si bien la inversión inicial puede ser significativa, a largo plazo, optar por menús digitales resulta en una disminución de los gastos asociados a la impresión.",
    consumo_energetico: "Los tableros de menú digitales utilizan tecnología LED, que es energéticamente más eficiente en comparación con las fuentes de luz tradicionales, llegando a consumir 30W a más.",
    iluminacion: "La iluminación LED en un menú board le da la capacidad de realzar el contenido, garantizando una visualización clara y llamativa en cualquier ambiente.",
    durabilidad: "Su fabricación con materiales resistentes garantiza su durabilidad frente al uso diario y condiciones ambientales adversas.",
  },
  {
    id: 8,
    producto: "LETRAS PINTADAS EN MDF",
    caracteristica: "Se utilizan para crear letras en diversos espesores y diseños para interiores, además de contar con una superficie lisa que simplifica la aplicación de pintura y barniz, logrando así acabados personalizados y de alta calidad.",
    ventaja: "Su diseño funcional, sumado a la notable ligereza del MDF en comparación con la madera maciza, asegura un proceso de instalación fácil y eficiente.",
    consumo_energetico: "Los letreros en MDF no consumen energía eléctrica.",
    iluminacion: "La iluminación de las letras puede lograrse mediante retroiluminación o a través de luces incorporadas en su diseño.",
    durabilidad: "Son robustos y duraderos, lo que les permite resistir diversas condiciones ambientales sin que se deterioren con facilidad.",
  },
  {
    id: 9,
    producto: "MONITORES DE PUBLICIDAD DIGITAL",
    caracteristica: "Las pantallas táctiles publicitarias son muy flexibles, lo que implica variaciones en su diseño y materiales de construcción. Esto permite mostrar diversos tipos de contenido como imágenes, videos y texto, y además pueden ubicarse tanto en el interior como en el exterior del local.",
    ventaja: "Su facilidad de montaje y transporte convierte a los monitores en una solución práctica para eventos y establecimientos comerciales.",
    consumo_energetico: "Los formatos de los Monitores táctiles generan un consumo de alrededor de 150W por metro cuadrado.",
    iluminacion: "El uso de luces LED dentro de un diseño novedoso asegura que los displays publicitarios se destaquen con elegancia un y atractivo visual.",
    durabilidad: "Un monitor de publicidad digital para celular dura, en promedio y en condiciones normales, entre 2 y 3 años.",
  },
  {
    id: 10,
    producto: "PANTALLAS LED",
    caracteristica: "Ideales para su uso en interiores y disponibles en varios formatos. Por otro lado, las pantallas LED para exteriores se construyen con módulos de diferentes dimensiones, adaptándose a la resolución deseada y permitiendo configurar cada pantalla según los requerimientos del cliente.",
    ventaja: "Su diseño está pensado para una instalación y reubicación rápidas y sencillas, eliminando la necesidad de herramientas complejas.",
    consumo_energetico: "Una pantalla LED de pared puede consumir entre 150W y 300W por metros cuadrados para interiores.",
    iluminacion: "Las pantallas LED ofrecen un brillo que supera entre cuatro y cinco veces al de los proyectores convencionales, lo que garantiza una visualización nítida.",
    durabilidad: "Están construidas con tecnología avanzada, lo que asegura su alta durabilidad y resistencia al desgaste. Son perfectas para ofrecer un rendimiento prolongado en diversos entornos.",
  },
  {
    id: 11,
    producto: "HOLOGRÁFICO",
    caracteristica: " Estos innovadores dispositivos proyectan imágenes en 3D en el aire, creando un efecto visual único. Su capacidad para ofrecer una experiencia futurista y captar la atención del público los hace perfectos para eventos, tiendas y espacios interactivos.",
    ventaja: "Posibilitan la interacción a distancia, rompiendo barreras físicas y promoviendo una comunicación más sencilla.",
    consumo_energetico: "Los dispositivos holográficos tienen un consumo de alrededor de 100W, siendo muy energéticos y amigables con el medio ambiente.",
    iluminacion: "El efecto brillante de los hologramas hace que su color y brillo varíen en función del punto de vista del observador.",
    durabilidad: "Si bien la durabilidad de los hologramas es variable y depende de su aplicación, los hologramas destinados a la seguridad tienen una alta resistencia.",
  },
  {
    id: 12,
    producto: "PIXEL LED",
    caracteristica: "Fabricados con paneles de acrílico y metal, estos elementos son aptos para interiores y exteriores, ofreciendo un diseño adaptable a tus preferencias. Los túneles hexagonales brindan la posibilidad de personalizar colores y patrones dejando que experimentes hasta donde la creatividad te lleve.",
    ventaja: "Gracias a la extensa variedad de colores disponibles, la iluminación del túnel puede personalizarse completamente al gusto del cliente.",
    consumo_energetico: "El uso de LEDs de alta calidad asegura un bajo consumo de energía, reduciendo el impacto ambiental.",
    iluminacion: "Se emplea tecnología de iluminación de vanguardia para generar un ambiente visualmente atractivo y dinámico.",
    durabilidad: "La durabilidad de los LED pixel y los LED RGB puede variar según del tipo de uso que se le puede dar.",
  },
  {
    id: 13,
    producto: "SILLAS LUMINOSAS",
    caracteristica: "Elaborados en polietileno o aluminio para uso tanto interior como exterior, numerosos modelos ofrecen la posibilidad de elegir entre al menos 16 colores RGB y distintos modos de iluminación, que incluyen luz fija, parpadeo con diferentes velocidades y secuencias de cambio de color.",
    ventaja: "Son ideales para eventos de cualquier índole, tanto en exteriores como en espacios interiores modernos como terrazas, bares y lounges.",
    consumo_energetico: "Las sillas luminosas son recargables y utilizan tecnologías de bajo consumo, generando un uso mínimo de 30W.",
    iluminacion: "La incorporación de tecnología de iluminación LED facilita el cambio de colores y la creación de diversos efectos de luz.",
    durabilidad: "Se caracterizan por su excelente calidad, gracias al uso de materiales resistentes y translúcidos que aseguran una larga durabilidad.",
  },
  {
    id: 14,
    producto: "TECHOS LED",
    caracteristica: "Integrados por un sistema LED y diseñados para uso tanto en interiores como exteriores, ofrecen características personalizables como la regulación de la intensidad y el control del parpadeo de color para ajustarse a tus necesidades específicas.",
    ventaja: "Gracias a los accesorios de instalación incluidos, estas luces LED pueden montarse fácilmente en el techo o en la pared.",
    consumo_energetico: "La tecnología LED utilizada en estos sistemas asegura un ahorro energético significativo, ya que consumen de 2W a 40W por metro.",
    iluminacion: "Se puede ajustar la iluminación según el momento del día o la actividad, lo que se traduce en una mejora del confort y una mayor eficiencia energética del espacio.",
    durabilidad: "Gracias a la tecnología LED utilizada, el resultado es una vida útil superior a la de las opciones tradicionales.",
  },
];

export default function Datos({ idProducto }) {
  const item = data.find((item) => item.id === idProducto);
  const [activeIndex, setActiveIndex] = useState(0);
  const totalCards = 5;

  const goNext = () => {
    setActiveIndex(prev => Math.min(prev + 1, totalCards - 1));
  };

  const goPrev = () => {
    setActiveIndex(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#02101d] mb-20">
      <NeonBackground className="absolute inset-0 z-0" />

      <div className="relative min-h-screen z-10 text-white flex flex-col items-center justify-center p-6">
        <div className='mb-16'>
        <h1 className="text-4xl font-bold mb-8 text-center">Datos sobre: </h1>
        <h1 className="text-4xl font-bold mb-8 text-center text-cyan-400 neon-text">{item.producto}</h1></div>

        {/* Versión móvil - Carrusel */}
        <div className="sm:hidden relative w-full max-w-6xl">
          <button
            onClick={goPrev}
            disabled={activeIndex === 0}
            className="absolute  left-2 top-1/2 -translate-y-1/2 z-10 p-2 flex justify-center text-9xl  text-[--azul_brillante] bg-transparent hover:bg-transparent disabled:opacity-50"
          >
           <img src="/productos/vector-left.png" alt="" className='h-20' />
          </button>
          <button
            onClick={goNext}
            disabled={activeIndex === totalCards - 1}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 flex justify-center  text-9xl   text-[--azul_brillante] bg-transparent hover:bg-transparent disabled:opacity-50"
          >
         <img src="/productos/vector-right.png" alt="" className='h-20' />
          </button>

          <div 
            className="flex transition-transform duration-300"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            <div className="w-full flex justify-center flex-shrink-0 p-2">
              <Card numero={1} title="Característica" descripcion={item.caracteristica} />
            </div>
             <div className="w-full flex justify-center flex-shrink-0 p-2">
              <Card numero={2} title="Ventaja" descripcion={item.ventaja} />
            </div>
             <div className="w-full flex justify-center flex-shrink-0 p-2">
              <Card numero={3} title="Consumo Energético" descripcion={item.consumo_energetico} />
            </div>
             <div className="w-full flex justify-center flex-shrink-0 p-2">
              <Card numero={4} title="Iluminación" descripcion={item.iluminacion} />
            </div>
             <div className="w-full flex justify-center flex-shrink-0 p-2">
              <Card numero={5} title="Durabilidad" descripcion={item.durabilidad} />
            </div>
          </div>
        </div>

        {/* Versión escritorio - Grid normal */}
        <div className="hidden sm:flex flex-wrap justify-center gap-6 max-w-6xl w-full">
          <Card numero={1} title="Característica" descripcion={item.caracteristica} />
          <Card numero={2} title="Ventaja" descripcion={item.ventaja} />
          <Card numero={3} title="Consumo Energético" descripcion={item.consumo_energetico} />
          <Card numero={4} title="Iluminación" descripcion={item.iluminacion} />
          <Card numero={5} title="Durabilidad" descripcion={item.durabilidad} />
        </div>
      </div>
    </div>
  );
}