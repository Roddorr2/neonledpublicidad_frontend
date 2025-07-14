import { useEffect } from 'react';

/**
 * Hook personalizado para mejorar SEO con enlaces internos
 * @param {object} keywords - Keywords del producto actual
 * @param {string} productTitle - Título del producto
 */
export const useProductSEO = (keywords, productTitle) => {
  useEffect(() => {
    // Agregar schema markup para producto
    const productSchema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": productTitle,
      "description": `Productos de ${productTitle} de alta calidad`,
      "brand": {
        "@type": "Brand",
        "name": "NeonLed Publicidad"
      },
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock",
        "priceCurrency": "PEN"
      }
    };

    // Crear y agregar script de schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(productSchema);
    document.head.appendChild(script);

    // Cleanup
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [keywords, productTitle]);

  // Generar breadcrumbs dinámicos
  const generateBreadcrumbs = () => {
    return [
      { name: 'Inicio', url: '/' },
      { name: 'Productos', url: '/productos' },
      { name: productTitle, url: '#', active: true }
    ];
  };

  return {
    breadcrumbs: generateBreadcrumbs()
  };
};
