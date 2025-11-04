// hooks/useFormState.js - Hook para consolidar estados de formularios
import { useState, useCallback } from "react";
import { getCurrentDate } from "../utils";
import {
  HEADER_DEFAULTS,
  BODY_DEFAULTS,
  FOOTER_DEFAULTS,
  CONSEJOS_DEFAULTS,
  TARJETA_INFO_DEFAULT,
  TARJETAS_INFO_DEFAULTS,
  BODY_FLAGS_DEFAULTS,
  DEFAULT_IMAGES,
  MAX_INFO_TARJETAS,
} from "../constants/defaults";

/**
 * Hook custom para manejar todos los estados de formularios del blog
 * Consolida 8 estados relacionados en una sola estructura
 *
 * @returns {Object} Estados y setters de todos los formularios
 */
export default function useFormState() {
  // ========== ESTADOS DE FORMULARIOS ==========

  // Header (formEncabezadoHeader + formImagenHeader)
  const [formEncabezadoHeader, setFormEncabezadoHeader] = useState({
    titulo: HEADER_DEFAULTS.titulo,
    texto_frase: HEADER_DEFAULTS.texto_frase,
    texto_descripcion: HEADER_DEFAULTS.texto_descripcion,
    meta_title: HEADER_DEFAULTS.meta_title,
    meta_descripcion: HEADER_DEFAULTS.meta_descripcion,
  });

  const [formImagenHeader, setFormImagenHeader] = useState({
    public_image: DEFAULT_IMAGES.header.image1,
    url_image: "",
    alt: HEADER_DEFAULTS.alt,
    title: HEADER_DEFAULTS.title,
  });

  // Body (formEncabezadoBody + formCommendBody + formGaleryBody + formInfoBody)
  const [formEncabezadoBody, setFormEncabezadoBody] = useState({
    titulo: BODY_DEFAULTS.titulo,
    descripcion: BODY_DEFAULTS.descripcion,
    fecha: getCurrentDate(),
    alt_image1: BODY_DEFAULTS.alt_image1,
    title_image1: BODY_DEFAULTS.title_image1,
    public_image1: DEFAULT_IMAGES.body.image1,
    url_image1: "",
    flag_galeria: BODY_FLAGS_DEFAULTS.flag_galeria,
    flag_consejos: BODY_FLAGS_DEFAULTS.flag_consejos,
    flag_informacion: BODY_FLAGS_DEFAULTS.flag_informacion,
    service_url: "",
  });

  const [formCommendBody, setFormCommendBody] = useState({
    titulo: CONSEJOS_DEFAULTS.titulo,
    texto1: CONSEJOS_DEFAULTS.texto1,
    texto2: CONSEJOS_DEFAULTS.texto2,
    texto3: CONSEJOS_DEFAULTS.texto3,
    texto4: CONSEJOS_DEFAULTS.texto4,
    texto5: CONSEJOS_DEFAULTS.texto5,
  });

  const [formGaleryBody, setFormGaleryBody] = useState({
    public_image2: DEFAULT_IMAGES.body.image2,
    public_image3: DEFAULT_IMAGES.body.image3,
    url_image2: "",
    url_image3: "",
    alt_image2: BODY_DEFAULTS.alt_image2,
    alt_image3: BODY_DEFAULTS.alt_image3,
    title_image2: BODY_DEFAULTS.title_image2,
    title_image3: BODY_DEFAULTS.title_image3,
  });

  const [formInfoBody, setFormInfoBody] = useState(
    // Usar las tarjetas con contenido por defecto
    TARJETAS_INFO_DEFAULTS.map(tarjeta => ({ ...tarjeta }))
  );

  // Footer (formEncabezadoFooter + formImagenFooter)
  const [formEncabezadoFooter, setFormEncabezadoFooter] = useState({
    titulo: FOOTER_DEFAULTS.titulo,
    descripcion: FOOTER_DEFAULTS.descripcion,
    estado: FOOTER_DEFAULTS.estado,
    alt_image1: FOOTER_DEFAULTS.alt_image1,
    title_image1: FOOTER_DEFAULTS.title_image1,
    alt_image2: FOOTER_DEFAULTS.alt_image2,
    title_image2: FOOTER_DEFAULTS.title_image2,
    alt_image3: FOOTER_DEFAULTS.alt_image3,
    title_image3: FOOTER_DEFAULTS.title_image3,
  });

  const [formImagenFooter, setFormImagenFooter] = useState({
    public_image1: DEFAULT_IMAGES.footer.image1,
    public_image2: DEFAULT_IMAGES.footer.image2,
    public_image3: DEFAULT_IMAGES.footer.image3,
  });

  // ========== FUNCIÓN DE RESET ==========
  const resetAllForms = useCallback(() => {
    setFormEncabezadoHeader({
      titulo: HEADER_DEFAULTS.titulo,
      texto_frase: HEADER_DEFAULTS.texto_frase,
      texto_descripcion: HEADER_DEFAULTS.texto_descripcion,
      meta_title: HEADER_DEFAULTS.meta_title,
      meta_descripcion: HEADER_DEFAULTS.meta_descripcion,
    });

    setFormImagenHeader({
      public_image: DEFAULT_IMAGES.header.image1,
      url_image: "",
      alt: HEADER_DEFAULTS.alt,
      title: HEADER_DEFAULTS.title,
    });

    setFormEncabezadoBody({
      titulo: BODY_DEFAULTS.titulo,
      descripcion: BODY_DEFAULTS.descripcion,
      fecha: getCurrentDate(),
      alt_image1: BODY_DEFAULTS.alt_image1,
      title_image1: BODY_DEFAULTS.title_image1,
      public_image1: DEFAULT_IMAGES.body.image1,
      url_image1: "",
      flag_galeria: BODY_FLAGS_DEFAULTS.flag_galeria,
      flag_consejos: BODY_FLAGS_DEFAULTS.flag_consejos,
      flag_informacion: BODY_FLAGS_DEFAULTS.flag_informacion,
      service_url: "",
    });

    setFormCommendBody({
      titulo: CONSEJOS_DEFAULTS.titulo,
      texto1: CONSEJOS_DEFAULTS.texto1,
      texto2: CONSEJOS_DEFAULTS.texto2,
      texto3: CONSEJOS_DEFAULTS.texto3,
      texto4: CONSEJOS_DEFAULTS.texto4,
      texto5: CONSEJOS_DEFAULTS.texto5,
    });

    setFormGaleryBody({
      public_image2: DEFAULT_IMAGES.body.image2,
      public_image3: DEFAULT_IMAGES.body.image3,
      url_image2: "",
      url_image3: "",
      alt_image2: BODY_DEFAULTS.alt_image2,
      alt_image3: BODY_DEFAULTS.alt_image3,
      title_image2: BODY_DEFAULTS.title_image2,
      title_image3: BODY_DEFAULTS.title_image3,
    });

    setFormInfoBody(
      // Usar las tarjetas con contenido por defecto
      TARJETAS_INFO_DEFAULTS.map(tarjeta => ({ ...tarjeta }))
    );

    setFormEncabezadoFooter({
      titulo: FOOTER_DEFAULTS.titulo,
      descripcion: FOOTER_DEFAULTS.descripcion,
      estado: FOOTER_DEFAULTS.estado,
      alt_image1: FOOTER_DEFAULTS.alt_image1,
      title_image1: FOOTER_DEFAULTS.title_image1,
      alt_image2: FOOTER_DEFAULTS.alt_image2,
      title_image2: FOOTER_DEFAULTS.title_image2,
      alt_image3: FOOTER_DEFAULTS.alt_image3,
      title_image3: FOOTER_DEFAULTS.title_image3,
    });

    setFormImagenFooter({
      public_image1: DEFAULT_IMAGES.footer.image1,
      public_image2: DEFAULT_IMAGES.footer.image2,
      public_image3: DEFAULT_IMAGES.footer.image3,
    });
  }, []);

  // ========== RETURN ==========
  return {
    // Estados Header
    formEncabezadoHeader,
    setFormEncabezadoHeader,
    formImagenHeader,
    setFormImagenHeader,

    // Estados Body
    formEncabezadoBody,
    setFormEncabezadoBody,
    formCommendBody,
    setFormCommendBody,
    formGaleryBody,
    setFormGaleryBody,
    formInfoBody,
    setFormInfoBody,

    // Estados Footer
    formEncabezadoFooter,
    setFormEncabezadoFooter,
    formImagenFooter,
    setFormImagenFooter,

    // Utilidades
    resetAllForms,
  };
}
