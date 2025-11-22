"use client";
import { useMemo } from "react";
import {
  Clock,
  ArrowRight,
  ExternalLink,
  Image as ImageIcon,
} from "lucide-react";

// Configuración de plantillas
import { getPlantillaConfig } from "../../config/index";

/**
 * TemplateRenderer - Renderizador dinámico de blogs según plantilla y datos
 * 
 * Este componente toma los datos del blog y la plantilla seleccionada para
 * renderizar una vista previa en tiempo real del blog final.
 *
 * @param {number} plantillaId - ID de la plantilla a usar (1, 2, 3)
 * @param {object} blogData - Datos completos del blog
 * @param {object} blogData.header - Datos del header (formEncabezadoHeader + formImagenHeader)
 * @param {object} blogData.body - Datos del body con todas las sub-secciones
 * @param {object} blogData.footer - Datos del footer (formEncabezadoFooter + formImagenFooter)
 * @param {string} mode - Modo de renderizado: 'preview' | 'published'
 * @param {boolean} showPlaceholders - Si mostrar placeholders para datos vacíos
 * @param {string} className - Clases CSS adicionales
 */
export default function TemplateRenderer({
  plantillaId = 1,
  blogData = {},
  mode = "preview",
  showPlaceholders = true,
  className = "",
  renderAfterHeader = null,
  activeTab = "informacion",
  onTabChange = null,
  sectionsVisibility: externalSectionsVisibility = null,
}) {


  const plantillaConfig = getPlantillaConfig(plantillaId);
  const { layoutType, styles = {}, sectionsConfig = {} } = plantillaConfig;


  const {
    header = {},
    body = {},
    footer = {},
  } = blogData;


  const {
    header: bodyHeader = {},
    consejos = {},
    galeria = {},
    informacion = [],
  } = body;

  const sectionsVisibility = useMemo(() => {
  if (externalSectionsVisibility) {
    return {
      header: true,
      consejos: externalSectionsVisibility.consejos,
      galeria: externalSectionsVisibility.galeria,
      informacion: externalSectionsVisibility.informacion,
      footer: footer.estado ?? false,
    };
  }
  return {
    header: true,
    consejos: bodyHeader.flag_consejos ?? true,
    galeria: bodyHeader.flag_galeria ?? true,
    informacion: bodyHeader.flag_informacion ?? true,
    footer: footer.estado ?? false,
  };
}, [bodyHeader.flag_consejos, bodyHeader.flag_galeria, bodyHeader.flag_informacion, footer.estado, externalSectionsVisibility]);

  // Renderizar sección del header principal
  const renderHeaderSection = () => {
    const headerData = header || {};
    const imageUrl = headerData.public_image || "/blog/blog-4.webp";
    
    return (
      <div className="relative h-[500px] overflow-hidden rounded-lg shadow-2xl">
        <img
          src={imageUrl}
          alt={headerData.alt || headerData.titulo || "Imagen principal"}
          title={headerData.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            {headerData.titulo || (showPlaceholders ? "Título Principal del Blog" : "")}
          </h1>
          <p className="text-xl text-gray-200 mb-4 leading-relaxed max-w-3xl">
            {headerData.texto_frase || (showPlaceholders ? "Una frase impactante que capte la atención del lector" : "")}
          </p>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed max-w-4xl">
            {headerData.texto_descripcion || (showPlaceholders ? "Descripción más detallada del contenido del blog que explique de qué se trata" : "")}
          </p>
          <div className="w-16 h-1 bg-yellow-400 mb-4"></div>
          
          {/* Metadata */}
          {layoutType === "tabs" && (
            <div className="flex items-center space-x-4 text-gray-300 text-sm">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>{bodyHeader.fecha || "Fecha de publicación"}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Renderizar sección del header del body
  const renderBodyHeaderSection = () => {
    if (!bodyHeader.titulo && !showPlaceholders) return null;

    return (
      <div className="relative h-[400px] overflow-hidden rounded-lg shadow-lg mb-8">
        <img
          src={bodyHeader.public_image1 || "/blog/blog-4.webp"}
          alt={bodyHeader.alt_image1 || bodyHeader.titulo || "Imagen del cuerpo"}
          title={bodyHeader.title_image1}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {bodyHeader.titulo || (showPlaceholders ? "Título del Cuerpo" : "")}
          </h2>
          <p className="text-lg text-gray-200 leading-relaxed">
            {bodyHeader.descripcion || (showPlaceholders ? "Descripción del contenido principal" : "")}
          </p>
          {layoutType !== "tabs" && (
            <div className="flex items-center mt-4 text-gray-300 text-sm">
              <Clock className="w-4 h-4 mr-2" />
              <span>{bodyHeader.fecha || "Fecha de publicación"}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Renderizar sección de consejos
  const renderConsejosSection = () => {
    if (!sectionsVisibility.consejos) return null;

    const maxConsejos = plantillaConfig.features?.consejos?.maxItems || 3;
    const consejosData = [];
    
    // Recopilar consejos disponibles
    for (let i = 1; i <= maxConsejos; i++) {
      const texto = consejos[`texto${i}`];
      if (texto || showPlaceholders) {
        consejosData.push({
          id: i,
          texto: texto || (showPlaceholders ? `Consejo número ${i} - Contenido útil para el lector` : "")
        });
      }
    }

    if (consejosData.length === 0) return null;

    return (
      <div className="mb-16">
        {consejos.titulo && (
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">
            {consejos.titulo}
          </h3>
        )}
        
        {layoutType === "tabs" ? (
          // Plantilla 2: Grid moderno
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {consejosData.map((consejo) => (
              <div key={consejo.id} className="bg-green-400/60 rounded-xl shadow-sm p-8 border border-slate-100">
                <div className="flex items-start">
                  <span className="flex items-center justify-center w-8 h-8 bg-white rounded-full text-green-700 font-bold text-sm mr-4 mt-1">
                    {consejo.id}
                  </span>
                  <p className="text-gray-800 leading-relaxed">{consejo.texto}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Plantilla 1 y 3: Layout lineal
          <div className="mb-16 p-10 px-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-2xl text-center text-gray-100 max-w-4xl mx-auto">
            <div className="space-y-6">
              {consejosData.map((consejo) => (
                <div key={consejo.id} className="flex items-start text-left">
                  <span className="flex items-center justify-center w-10 h-10 bg-yellow-500 rounded-full text-gray-900 font-bold text-sm mr-6 mt-1 flex-shrink-0">
                    {consejo.id}
                  </span>
                  <p className="text-gray-100 leading-relaxed text-lg">{consejo.texto}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Renderizar sección de galería
  const renderGaleriaSection = () => {
    if (!sectionsVisibility.galeria) return null;

    const imagenes = [];
    
    // Recopilar imágenes disponibles
    for (let i = 2; i <= 3; i++) {
      const imageUrl = galeria[`public_image${i}`];
      if (imageUrl || showPlaceholders) {
        imagenes.push({
          id: i,
          url: imageUrl || "/blog/blog-4.webp",
          alt: galeria[`alt_image${i}`] || `Imagen ${i}`,
          title: galeria[`title_image${i}`] || ""
        });
      }
    }

    if (imagenes.length === 0) return null;

    return (
      <div className="mb-16">
        {layoutType === "tabs" ? (
          // Plantilla 2: Cards modernas
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {imagenes.map((imagen) => (
                <div key={imagen.id} className="bg-white rounded-lg shadow-sm overflow-hidden group">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={imagen.url}
                      alt={imagen.alt}
                      title={imagen.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Plantilla 1 y 3: Grid simple
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16 max-w-4xl mx-auto">
            {imagenes.map((imagen) => (
              <div key={imagen.id} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-blue-500 rounded-lg opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300"></div>
                <div className="relative h-64 overflow-hidden rounded-lg">
                  <img
                    src={imagen.url}
                    alt={imagen.alt}
                    title={imagen.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Renderizar sección de información
  const renderInformacionSection = () => {
    if (!sectionsVisibility.informacion) return null;

    const infoData = informacion.filter((item) => 
      item.titulo || item.descripcion || showPlaceholders
    );

    if (infoData.length === 0 && !showPlaceholders) return null;

    // Si no hay datos pero se deben mostrar placeholders
    const displayData = infoData.length > 0 ? infoData : [
      { titulo: "Información 1", descripcion: "Descripción detallada del primer punto importante", keyword: "Más info", link: "#" },
      { titulo: "Información 2", descripcion: "Descripción detallada del segundo punto importante", keyword: "Ver más", link: "#" },
      { titulo: "Información 3", descripcion: "Descripción detallada del tercer punto importante", keyword: "Leer más", link: "#" },
      { titulo: "Información 4", descripcion: "Descripción detallada del cuarto punto importante", keyword: "Descubrir", link: "#" }
    ];

    return (
      <div className="mb-16">
        {layoutType === "tabs" ? (
          // Plantilla 2: Cards con gradientes
          <div className="space-y-6 max-w-4xl mx-auto">
            {displayData.map((item, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-r from-teal-50 to-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-8">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">
                        {item.titulo || `Información ${index + 1}`}
                      </h4>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {item.descripcion || "Descripción detallada del contenido"}
                      </p>
                    </div>
                  </div>
                  {item.link && item.keyword && (
                    <div className="flex justify-end">
                      <a
                        href={item.link}
                        className="inline-flex items-center text-teal-600 hover:text-teal-700 font-semibold transition-colors"
                      >
                        {item.keyword}
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Plantilla 1 y 3: Cards alternadas
          <div className="grid grid-cols-1 gap-28 pt-8 max-w-5xl mx-auto">
            {displayData.map((item, index) => (
              <div key={index} className="group">
                <div className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} gap-12`}>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-gray-900 mb-4">
                      {item.titulo || `Información ${index + 1}`}
                    </h4>
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">
                      {item.descripcion || "Descripción detallada del contenido importante"}
                    </p>
                    {item.link && item.keyword && (
                      <a
                        href={item.link}
                        className="inline-flex items-center bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-yellow-600 hover:to-yellow-700 transition-all"
                      >
                        {item.keyword}
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </a>
                    )}
                  </div>
                  <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                    {index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Renderizar sección del footer
  const renderFooterSection = () => {
    if (!sectionsVisibility.footer) return null;

    const footerImages = [];
    
    // Recopilar imágenes del footer
    for (let i = 1; i <= 3; i++) {
      const imageUrl = footer[`public_image${i}`];
      if (imageUrl || showPlaceholders) {
        footerImages.push({
          id: i,
          url: imageUrl || "/blog/blog-4.webp",
          alt: footer[`alt_image${i}`] || `Imagen footer ${i}`,
          title: footer[`title_image${i}`] || ""
        });
      }
    }

    return (
      <div className="mt-16 p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg text-white">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold mb-4">
            {footer.titulo || (showPlaceholders ? "Título del Footer" : "")}
          </h3>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            {footer.descripcion || (showPlaceholders ? "Descripción del pie de página con información adicional" : "")}
          </p>
        </div>

        {footerImages.length > 0 && (
          <div className="flex flex-wrap justify-center gap-16 mt-8">
            {footerImages.map((image) => (
              <div key={image.id} className="relative group">
                <div className="w-48 h-36 overflow-hidden rounded-lg">
                  <img
                    src={image.url}
                    alt={image.alt}
                    title={image.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };


const renderTabsNavigation = () => {
  if (!onTabChange) return null;

  const tabs = [
    { id: "informacion", label: "Información", visible: sectionsVisibility.informacion },
    { id: "consejos", label: "Consejos", visible: sectionsVisibility.consejos },
    { id: "galeria", label: "Galería", visible: sectionsVisibility.galeria },
  ].filter(tab => tab.visible);

  if (tabs.length === 0) return null;

  return (
    <div className="border-b border-gray-200 mb-8">
      <nav className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === tab.id
                ? "border-teal-500 text-teal-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};


 const renderMainContent = () => {

  if (onTabChange) {
    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-8 md:p-12">
          {renderBodyHeaderSection()}
          {renderTabsNavigation()}
          
          <div>
            {activeTab === "informacion" && sectionsVisibility.informacion && renderInformacionSection()}
            {activeTab === "consejos" && sectionsVisibility.consejos && renderConsejosSection()}
            {activeTab === "galeria" && sectionsVisibility.galeria && renderGaleriaSection()}
          </div>
        </div>
      </div>
    );
  }

  if (layoutType === "tabs") {
    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-8 md:p-12">
          {renderBodyHeaderSection()}
          
          <div className="space-y-16">
            {renderConsejosSection()}
            {renderGaleriaSection()}
            {renderInformacionSection()}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="space-y-16">
        {renderBodyHeaderSection()}
        {renderConsejosSection()}
        {renderGaleriaSection()}
        {renderInformacionSection()}
      </div>
    );
  }
};

  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <div className="container mx-auto px-6 py-12">
        {/* Preview Badge */}
        {mode === "preview" && (
          <div className="fixed top-4 right-4 z-50">
            <span className="bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              Vista Previa
            </span>
          </div>
        )}

      {/* Header Principal */}
      <div className="mb-16">
     {renderHeaderSection()}
     </div>

     {/* Control de Secciones (si se pasa) */}
     {renderAfterHeader && (
     <div className="mb-8">
      {renderAfterHeader}
     </div>
    )}



        {/* Contenido Principal */}
        <div className="mb-16">
          {renderMainContent()}
        </div>

        {/* Footer */}
        {renderFooterSection()}
      </div>
    </div>
  );
}
