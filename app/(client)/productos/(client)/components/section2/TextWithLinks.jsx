import React from 'react';
import Link from 'next/link';

/**
 * Componente que procesa texto con tokens de enlaces
 * @param {string} text - Texto con tokens en formato {{palabra clave}}
 * @param {object} keywords - Objeto con configuración de enlaces
 * @param {string} className - Clases CSS para el contenedor
 */
const TextWithLinks = ({ text, keywords = {}, className = "" }) => {
  const processText = (text) => {
    // Regex para encontrar tokens del formato {{palabra clave}}
    const tokenRegex = /\{\{([^}]+)\}\}/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = tokenRegex.exec(text)) !== null) {
      // Agregar texto antes del token
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: text.slice(lastIndex, match.index),
          key: `text-${lastIndex}`
        });
      }

      // Procesar el token
      const keyword = match[1];
      const linkConfig = keywords[keyword];

      if (linkConfig && linkConfig.url) {
        parts.push({
          type: 'link',
          content: keyword,
          config: linkConfig,
          key: `link-${match.index}`
        });
      } else {
        // Si no hay configuración o URL, renderizar como texto resaltado
        parts.push({
          type: 'highlight',
          content: keyword,
          key: `highlight-${match.index}`
        });
      }

      lastIndex = match.index + match[0].length;
    }

    // Agregar texto restante
    if (lastIndex < text.length) {
      parts.push({
        type: 'text',
        content: text.slice(lastIndex),
        key: `text-${lastIndex}`
      });
    }

    return parts;
  };

  const renderPart = (part) => {
    if (part.type === 'text') {
      return part.content;
    }

    if (part.type === 'highlight') {
      // Texto resaltado para keywords sin URL
      return <span className="font-semibold">{part.content}</span>;
    }

    if (part.type === 'link') {
      const { config, content } = part;
      
      // Verificar que existe la URL
      if (!config.url) {
        return <span className="font-semibold">{content}</span>;
      }

      // Estilos para los enlaces - usar clases CSS personalizadas
      const linkStyles = "description-link";

      if (config.type === 'internal') {
        return (
          <Link href={config.url} className={linkStyles}>
            {content}
          </Link>
        );
      }

      if (config.type === 'external') {
        return (
          <a 
            href={config.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className={linkStyles}
            aria-label={`${content} (se abre en nueva ventana)`}
          >
            {content}
          </a>
        );
      }

      // Si hay otros tipos de enlaces en el futuro
      return <span className="font-semibold">{content}</span>;
    }

    return null;
  };

  const processedParts = processText(text);

  return (
    <span className={className}>
      {processedParts.map((part) => (
        <React.Fragment key={part.key}>
          {renderPart(part)}
        </React.Fragment>
      ))}
    </span>
  );
};

export default TextWithLinks;
