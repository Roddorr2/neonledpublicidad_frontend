/**
 * Configuración centralizada de palabras clave y enlaces
 * Este archivo permite gestionar todos los enlaces de forma centralizada
 */

export const globalKeywords = {
  // Letras de Acrílico 
 
  "letras de acrílico 3D": { 
    type: "external", 
    url: "https://ledneonpublicidad.com/blog/plantilla2/?blog=letras-acrilicas-3d-moda" 
  },


  // Letras Doradas  
  "Letras corpóreas retroiluminadas": { 
    type: "external", 
    url: "https://ledneonpublicidad.com/blog/plantilla2/?blog=letras-dyp-con-elegancia" 
  },

  // Letreros Luminosos
  "letreros luminosos 3D": {     
    url: "https://ledneonpublicidad.com/blog/plantilla2/?blog=discotecas-que-brillan" 
  },

  // Letras Neón en Tubos de Vidrio
  

  // Letras de Neón LED
  "letras de neón": { 
    type: "external", 
    url: "https://www.youtube.com/watch?v=lt7BVc6ENHQ" 
  },  

  // Impresión en Vinilo  
  "vinilos decorativos": { 
    type: "external", 
    url: "https://ledneonpublicidad.com/blog/plantilla2/?blog=neon-led-para-bares-modernos" 
  },

  // Menu Board
  "menú boards personalizados": { 
    type: "external", 
    url: "https://ledneonpublicidad.com/blog/plantilla2/?blog=cafeterias-con-estilo" 
  },  

  // // Letras Pintadas en MDF
  // "Letras en MDF": {
  //   type: "external",
  //   url: "/productos/letras-en-mdf"
  // },
  // "letras MDF personalizadas": {
  //   type: "external",
  //   url: "/productos/letras-en-mdf"
  // },
  // "pintado 3D": {
  //   type: "external",
  //   url: "/productos/letras-en-mdf"
  // },

  // Monitores de Publicidad Digital  

  // Pantallas LED
  "Pantallas led para publicidad": { 
    type: "external", 
    url: "https://ledneonpublicidad.com/blog/plantilla2/?blog=pantallas-led-para-locales" 
  },

  // Holográficos
  
  // Pixel LED
  "Pixel LED": { 
    type: "external", 
    url: "https://ledneonpublicidad.com/blog/plantilla2/?blog=led-pixel-para-discotecas" 
  },
  
  //Sillas Luminosas  
  "sillas con luces LED": {
    type: "external", 
    url: "https://ledneonpublicidad.com/blog/plantilla2/?blog=sillas-luminosas-para-eventos" 
  },

  // Techos LED  
  "techos decorados con led": {
    type: "external",
    url: "https://ledneonpublicidad.com/blog/plantilla2/?blog=techos-led-para-gimnasios"
  },

  "menú digital": { 
    type: "internal", 
    url: "/productos/menu-board" 
  },
  "pantallas LED": { 
    type: "internal", 
    url: "/productos/pantalla-led" 
  },
  "holográfico": { 
    type: "internal", 
    url: "/productos/holografico" 
  },

  // Enlaces externos (ejemplos)
  "más información": { 
    type: "external", 
    url: "https://ledneonpublicidad.com/contacto" 
  },
  "WhatsApp": { 
    type: "external", 
    url: "https://wa.me/51123456789" 
  }
};

/**
 * Función para obtener keywords específicas de un producto
 * @param {number} productId - ID del producto
 * @returns {object} - Keywords específicas del producto
 */
export const getProductKeywords = (productId) => {
  const productSpecificKeywords = {
    1: { // Letras de Acrílico
      ...globalKeywords,
      // Agregar keywords específicas si es necesario
    },
    2: { // Letras Doradas
      ...globalKeywords,
    },
    // Agregar más productos según sea necesario
  };

  return productSpecificKeywords[productId] || globalKeywords;
};

/**
 * Función para validar y procesar URLs
 * @param {object} linkConfig - Configuración del enlace
 * @returns {object} - Configuración procesada
 */
export const processLinkConfig = (linkConfig) => {
  if (linkConfig.type === 'internal') {
    // Agregar tracking o parámetros adicionales si es necesario
    return {
      ...linkConfig,
      url: linkConfig.url + '?ref=producto'
    };
  }
  
  return linkConfig;
};
