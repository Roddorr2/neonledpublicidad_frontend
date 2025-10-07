"use client";
import FormFooter from "../../components/FormFooter";
import FormHeader from "../../components/FormHeader";
import { useState, useEffect, Suspense } from "react";
import { Save } from "lucide-react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { useSearchParams } from "next/navigation";
import Fetch from "../../services/fetch";
import { Loader2 } from "lucide-react";
import FormBody3 from "../../components/FormBody3";

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen text-gray-700">
          Cargando...
        </div>
      }
    >
      <PageContent />
    </Suspense>
  );
};

const PageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id_blog = searchParams.get("id_blog");
  const id_empleado = getCookie("empleado")
    ? JSON.parse(getCookie("empleado")).id_empleado
    : -1;

  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [fileHeader, setFileHeader] = useState(null);
  const [FileBodyHeader, setFileBodyHeader] = useState(null);
  const [FileBodyFile1, setFileBodyFile1] = useState(null);
  const [FileBodyFile2, setFileBodyFile2] = useState(null);
  const [FileFooterFile1, setFileFooterFile1] = useState(null);
  const [FileFooterFile2, setFileFooterFile2] = useState(null);
  const [FileFooterFile3, setFileFooterFile3] = useState(null);

  const [validacionHeader, setValidacionHeader] = useState(true);
  const [validacionBody, setValidacionBody] = useState(true);
  const [validacionFooter, setValidacionFooter] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);

  const [serviceRedirectUrl, setServiceRedirectUrl] = useState("");

  // Estados de datos originales (para mantener referencia)
  const [originalData, setOriginalData] = useState({
    blog: null,
    header: null,
    body: null,
    footer: null,
  });

  // Estados de formularios (igual que en creación)
  const [formFooter, setFormFooter] = useState({
    titulo: "",
    descripcion:
      "",
    public_image1: "/blog/blog-10.jpg",
    url_image1: "",
    alt_image1: "",
    title_image1: "",
    public_image2: "/blog/blog-10.jpg",
    url_image2: "",
    alt_image2: "",
    title_image2: "",
    public_image3: "/blog/blog-10.jpg",
    url_image3: "",
    alt_image3: "",
    title_image3: "",
    estado: 1,
  });

  const [dataHeader, setDataHeader] = useState({
    titulo: "",
    texto_frase: "",
    texto_descripcion: "",
    public_image: "/blog/fondo_blog_extend.png",
    url_image: "",
    alt: "",
    title: "",
    meta_title: "",
    meta_descripcion: "",
  });

  const [formEncabezadoBody, setFormEncabezadoBody] = useState({
    titulo: "Titulo del Blog",
    descripcion:
      "Las luces neón LED se han convertido en un elemento diferenciador en el mundo de la hospitalidad. No solo son visualmente atractivos, sino que también refuerzan la identidad de tu negocio. En este artículo, exploraremos cómo las letras luminosas pueden marcar la diferencia en la experiencia de tus clientes.",
    fecha: "2025-03-31",
    public_image1: "/blog/blog-4.jpg",
    url_image1: "",
    alt_image1: "",
    title_image1: "",
  });

  const [formInfoBody, setFormInfoBody] = useState([
    {
      titulo: "El Factor Sorpresa y Distinción",
      descripcion:
        "Las letras de neón LED permiten personalizar la imagen de tu local, haciendo que el nombre de tu bar sea visible desde lejos. Un diseño llamativo puede convertirse en un sello distintivo y en un punto de referencia para los clientes.",
      keyword: "",
      link: "",
    },
    {
      titulo: "Ambiente y Experiencia Visual",
      descripcion:
        "La iluminación juega un papel crucial en la atmósfera de un bar. Los colores vibrantes y cálidos del neón LED pueden transformar un espacio ordinario en un entorno acogedor e instagrameable.",
      keyword: "",
      link: "",
    },
    {
      titulo: "Eficiencia Energética y Durabilidad",
      descripcion:
        "A diferencia del neón tradicional, las luces LED son más eficientes, consumen menos energía y tienen una vida útil más prolongada.",
      keyword: "",
      link: "",
    },
    {
      titulo: "Marketing y Atracción de Clientes",
      descripcion:
        "Un letrero de neón LED bien diseñado es una herramienta de marketing poderosa, capaz de captar la atención y aumentar la visibilidad de tu local.",
      keyword: "",
      link: "",
    },
  ]);

  const [formCommendBody, setFormCommendBody] = useState({
    titulo: "Consejos para Elegir el Letrero Perfecto",
    texto1: "Opta por colores que reflejen la personalidad de tu bar.",
    texto2: "Elige un diseño legible y atractivo.",
    texto3: "Considera el lugar de instalación para maximizar su impacto.",
    texto4: "",
    texto5: "",
  });

  const [formGaleryBody, setFormGaleryBody] = useState({
    public_image2: "/blog/blog-2.jpg",
    url_image2: "",
    alt_image2: "",
    title_image2: "",
    public_image3: "/blog/blog-2.jpg",
    url_image3: "",
    alt_image3: "",
    title_image3: "",
    flag_galeria: 1,
    flag_consejos: 1,
    flag_informacion: 1,
    service_url: "",
  });

  // Funciones de eliminación de imágenes
  const deleteFooterFile1 = () => {
    setFileFooterFile1(null);
    setFormFooter((prev) => ({
      ...prev,
      public_image1: originalData.footer?.public_image1 || "/blog/blog-10.jpg",
      url_image1: "",
    }));
  };

  const deleteFooterFile2 = () => {
    setFileFooterFile2(null);
    setFormFooter((prev) => ({
      ...prev,
      public_image2: originalData.footer?.public_image2 || "/blog/blog-10.jpg",
      url_image2: "",
    }));
  };

  const deleteFooterFile3 = () => {
    setFileFooterFile3(null);
    setFormFooter((prev) => ({
      ...prev,
      public_image3: originalData.footer?.public_image3 || "/blog/blog-10.jpg",
      url_image3: "",
    }));
  };

  const deleteHeaderImage = () => {
    setFileHeader(null);
    setDataHeader((prev) => ({
      ...prev,
      public_image:
        originalData.header?.public_image || "/blog/fondo_blog_extend.png",
      url_image: "",
    }));
  };

  const deleteBodyHeaderImage = () => {
    setFileBodyHeader(null);
    setFormEncabezadoBody((prev) => ({
      ...prev,
      public_image1: originalData.body?.public_image1 || "/blog/blog-4.jpg",
      url_image1: "",
    }));
  };

  const deleteBodyFile1 = () => {
    setFileBodyFile1(null);
    setFormGaleryBody((prev) => ({
      ...prev,
      public_image2: originalData.body?.public_image2 || "/blog/blog-2.jpg",
      url_image2: "",
    }));
  };

  const deleteBodyFile2 = () => {
    setFileBodyFile2(null);
    setFormGaleryBody((prev) => ({
      ...prev,
      public_image3: originalData.body?.public_image3 || "/blog/blog-2.jpg",
      url_image3: "",
    }));
  };

  // Effect para validaciones
  useEffect(() => {
    setIsDisabled(!(validacionHeader && validacionFooter && validacionBody));
  }, [validacionHeader, validacionFooter, validacionBody]);

  // Effect para estilos
  useEffect(() => {
    const sections = document.querySelectorAll("#header, #body, #footer");
    sections.forEach((section) => {
      section.style.scrollMargin = "50px";
      if (section.id === "body" && section.clientHeight < 300) {
        section.style.minHeight = "300px";
      }
    });
  }, []);

  // Effect para cargar datos
  useEffect(() => {
    if (id_blog) {
      fetchDataTotal();
    }
  }, [id_blog]);

  {
    /* Aqui se obtiene toda la información del blog creado segun su id */
  }
  async function fetchDataTotal() {
    try {
      setIsLoading(true);
      setError(null);

      const response = await Fetch.fetchBlogById(id_blog);
      if (!response) {
        throw new Error("No se pudo cargar el blog");
      }

      // Cargar header
      const responseHeader = await Fetch.fetchBlogHead(response.id_blog_head);
      if (!responseHeader) {
        throw new Error("No se pudo cargar el encabezado");
      }

      // Cargar body
      const responseBody = await Fetch.fetchBlogBodyById(response.id_blog_body);
      if (!responseBody) {
        throw new Error("No se pudo cargar el contenido");
      }

      // Cargar footer
      const responseFooter = await Fetch.fetchBlogFooter(
        response.id_blog_footer
      );
      if (!responseFooter) {
        throw new Error("No se pudo cargar el pie de página");
      }

      // Guardar datos originales
      setOriginalData({
        blog: response,
        header: responseHeader,
        body: responseBody,
        footer: responseFooter,
      });

      // Setear datos en formularios
      setDataHeader({
        ...responseHeader,
        titulo: responseHeader.titulo || "",
        texto_frase: responseHeader.texto_frase || "",
        texto_descripcion: responseHeader.texto_descripcion || "",
        public_image:
          responseHeader.public_image || "/blog/fondo_blog_extend.png",
        url_image: responseHeader.url_image || "",
        alt: responseHeader.alt || "",
        title: responseHeader.title || "",
        meta_title: responseHeader.meta_title || "",
        meta_descripcion: responseHeader.meta_descripcion || "",
      });

      setFormFooter({
        ...responseFooter,
        titulo: responseFooter.titulo || "",
        descripcion:
          responseFooter.descripcion ||
          "",
        public_image1: responseFooter.public_image1 || "/blog/blog-10.jpg",
        url_image1: responseFooter.url_image1 || "",
        alt_image1: responseFooter.alt_image1 || "",
        title_image1: responseFooter.title_image1 || "",
        public_image2: responseFooter.public_image2 || "/blog/blog-10.jpg",
        url_image2: responseFooter.url_image2 || "",
        alt_image2: responseFooter.alt_image2 || "",
        title_image2: responseFooter.title_image2 || "",
        public_image3: responseFooter.public_image3 || "/blog/blog-10.jpg",
        url_image3: responseFooter.url_image3 || "",
        alt_image3: responseFooter.alt_image3 || "",
        title_image3: responseFooter.title_image3 || "",
        estado: responseFooter.estado || 1,
      });

      // Formatear fecha correctamente
      const fechaFormateada = responseBody.fecha
        ? new Date(responseBody.fecha).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0];

      setFormEncabezadoBody({
        titulo: responseBody.titulo || "Titulo del Blog",
        descripcion: responseBody.descripcion || "",
        fecha: fechaFormateada,
        public_image1: responseBody.public_image1 || "/blog/blog-4.jpg",
        url_image1: responseBody.url_image1 || "",
        alt_image1: responseBody.alt_image1 || "",
        title_image1: responseBody.title_image1 || "",
      });

      setFormGaleryBody({
        public_image2: responseBody.public_image2 || "/blog/blog-2.jpg",
        url_image2: responseBody.url_image2 || "",
        alt_image2: responseBody.alt_image2 || "",
        title_image2: responseBody.title_image2 || "",
        public_image3: responseBody.public_image3 || "/blog/blog-2.jpg",
        url_image3: responseBody.url_image3 || "",
        alt_image3: responseBody.alt_image3 || "",
        title_image3: responseBody.title_image3 || "",
        flag_galeria: responseBody.flag_galeria || 1,
        flag_consejos: responseBody.flag_consejos || 1,
        flag_informacion: responseBody.flag_informacion || 1,
        service_url: responseBody.service_url || "",
      });

      // Cargar tarjetas de información
      const tarjetas = Array.isArray(responseBody.tarjetas)
        ? responseBody.tarjetas
        : [];
      if (tarjetas.length > 0) {
        setFormInfoBody(
          tarjetas.map((tarjeta) => ({
            id_tarjeta: tarjeta.id_tarjeta || null,
            titulo: tarjeta.titulo || "",
            descripcion: tarjeta.descripcion || "",
            keyword: tarjeta.keyword || "",
            link: tarjeta.link || "",
          }))
        );
      }

      // Cargar tarjeta de comentarios
      const commendTarjeta = responseBody.commend_tarjeta || {};
      setFormCommendBody({
        titulo:
          commendTarjeta.titulo || "Consejos para Elegir el Letrero Perfecto",
        texto1: commendTarjeta.texto1 || "",
        texto2: commendTarjeta.texto2 || "",
        texto3: commendTarjeta.texto3 || "",
        texto4: commendTarjeta.texto4 || "",
        texto5: commendTarjeta.texto5 || "",
      });

      // Setear service URL si existe
      setServiceRedirectUrl(responseBody.service_url || "");
    } catch (error) {
      console.error("Error al cargar datos:", error);
      setError(error.message);
      await Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function guardarHeader() {
    console.log("🔄 Enviando datos:", dataHeader);
    console.log("🔄 ID a actualizar:", originalData.header.id_blog_head);

    const response = await Fetch.updateHeader(
      originalData.header.id_blog_head,
      dataHeader
    );

    console.log("📥 RESPUESTA COMPLETA:", {
      response,
      type: typeof response,
      isNull: response === null,
      isUndefined: response === undefined,
      isTruthy: !!response,
      greaterThanZero: response > 0,
      equals1: response === 1,
      equalsTrue: response === true,
      hasStatus: response?.status,
      hasSuccess: response?.success,
    });

    // Tu validación actual
    if (
      response.status &&
      (response.status === 200 || response.status === 201)
    ) {
      return response.id;
    } else {
      return "error";
    }
  }

  async function guardarFooter() {
    const id = await Fetch.updateFooter(
      originalData.footer.id_blog_footer,
      formFooter
    );
    if (id && id > 0) {
      return id;
    } else {
      Swal.fire({
        title: "Error",
        text: "No se pudo guardar el pie de página",
        icon: "error",
        confirmButtonText: "OK",
      });
      return "error";
    }
  }

  async function guardarBody(id_commend_tarjeta) {
    const formBody = {
      titulo: formEncabezadoBody.titulo,
      descripcion: formEncabezadoBody.descripcion,
      id_commend_tarjeta: id_commend_tarjeta,
      public_image1: formEncabezadoBody.public_image1,
      url_image1: formEncabezadoBody.url_image1,
      alt_image1: formEncabezadoBody.alt_image1,
      title_image1: formEncabezadoBody.title_image1,
      public_image2: formGaleryBody.public_image2,
      url_image2: formGaleryBody.url_image2,
      alt_image2: formGaleryBody.alt_image2,
      title_image2: formGaleryBody.title_image2,
      public_image3: formGaleryBody.public_image3,
      url_image3: formGaleryBody.url_image3,
      alt_image3: formGaleryBody.alt_image3,
      title_image3: formGaleryBody.title_image3,
      service_url: serviceRedirectUrl,
    };

    const id = await Fetch.updateBody(originalData.body.id_blog_body, formBody);
    if (id && id > 0) {
      return id;
    } else {
      Swal.fire({
        title: "Error",
        text: "No se pudo actualizar el contenido",
        icon: "error",
        confirmButtonText: "OK",
      });
      return "error";
    }
  }

  async function guardarCommendTarjeta() {
    const id = await Fetch.updateCommendTarjeta(
      originalData.body.id_commend_tarjeta,
      formCommendBody
    );
    if (id && id > 0) {
      return id;
    } else {
      Swal.fire({
        title: "Error",
        text: "No se pudo actualizar la tarjeta de comentarios",
        icon: "error",
        confirmButtonText: "OK",
      });
      return "error";
    }
  }

  async function guardarBlog(id_blog_head, id_blog_footer, id_blog_body) {
    const formBlog = {
      id_blog_head: id_blog_head,
      id_blog_footer: id_blog_footer,
      id_blog_body: id_blog_body,
      fecha: formEncabezadoBody.fecha,
    };

    const id = await Fetch.updateBlog(originalData.blog.id_blog, formBlog);
    console.log("🔄 ID del blog actualizado:", id);
    if (id && id > 0) {
      return id;
    } else {
      Swal.fire({
        title: "Error",
        text: "No se pudo actualizar el blog",
        icon: "error",
        confirmButtonText: "OK",
      });
      return "error";
    }
  }

  async function guardarCard(id_blog, id_empleado) {
    const formCard = {
      id_blog: id_blog,
      titulo: dataHeader.titulo,
      descripcion: formEncabezadoBody.descripcion,
      public_image: dataHeader.public_image,
      url_image: dataHeader.url_image,
      id_plantilla: 3,
      id_empleado: id_empleado,
    };

    const id = await Fetch.updateCard(originalData.blog.card.id_card, formCard);
    if (id && id > 0) {
      return id;
    } else {
      Swal.fire({
        title: "Error",
        text: "No se pudo actualizar la tarjeta",
        icon: "error",
        confirmButtonText: "OK",
      });
      return "error";
    }
  }

  async function guardarTarjetas(id_blog_body) {
    try {
      const resultados = await Promise.all(
        formInfoBody.map(async (section) => {
          const formTarjeta = {
            id_blog_body: id_blog_body,
            titulo: section.titulo,
            descripcion: section.descripcion,
            keyword: section.keyword,
            link: section.link,
          };

          // Si tiene id_tarjeta, actualizar; si no, crear nueva
          let id;
          if (section.id_tarjeta) {
            id = await Fetch.updateTarjeta(section.id_tarjeta, formTarjeta);
          } else {
            id = await Fetch.saveTarjeta(formTarjeta);
          }

          if (!id || id <= 0) throw new Error("Error al guardar tarjeta");
          return id;
        })
      );
      return "success";
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se pudo guardar una o más tarjetas",
        icon: "error",
        confirmButtonText: "OK",
      });
      return "error";
    }
  }

  async function executionFunction(functionSave, mensajeError) {
    try {
      const resultado = await functionSave();

      if (!resultado || resultado === "error") {
        throw new Error(mensajeError);
      }
      return resultado;
    } catch (error) {
      console.error(`❌ Error en executionFunction:`, {
        error: error.message,
        mensajeError,
      });

      Swal.fire({
        title: "Error",
        text: mensajeError,
        icon: "error",
        confirmButtonText: "OK",
      });
      throw error;
    }
  }

  /* 
    storage/app/public/images/templates/plantilla{id_plantilla}/blog{id_blog}/head/image.jpeg
    storage/app/public/images/templates/plantilla{id_plantilla}/blog{id_blog}/body/image.jpg
    storage/app/public/images/templates/plantilla{id_plantilla}/blog{id_blog}/footer/image.jpg
  */
  async function SaveImage(file, ruta, name = null) {
    try {
      if (!file) return "ok";

      const formData = new FormData();
      formData.append("file", file);
      if (name) formData.append("name", name);

      const response = await Fetch.saveImage(formData, ruta);

      if (!response) {
        throw new Error("No se recibió respuesta del servidor");
      }

      // Manejo simplificado de respuestas
      if (
        response.status &&
        (response.status === 200 || response.status === 201)
      ) {
        return "ok";
      }

      if (typeof response === "object" && !response.status) {
        return "ok";
      }

      throw new Error("Error al subir imagen");
    } catch (error) {
      console.error("❌ Error en SaveImage:", error.message);
      throw error;
    }
  }

  async function HandleSave() {
    let headerDataToUse = dataHeader;
    try {
      setLoading(true);

      const id_commend_tarjeta = await executionFunction(
        guardarCommendTarjeta,
        "No se pudo guardar la tarjeta de comentarios"
      );

      const id_blog_body = await executionFunction(
        () => guardarBody(id_commend_tarjeta),
        "No se pudo guardar el contenido del blog"
      );

      await executionFunction(
        () => guardarTarjetas(id_blog_body),
        "No se pudo guardar las tarjetas informativas"
      );

      const id_blog_head = await executionFunction(
        () => guardarHeader(),
        "No se pudo guardar el encabezado"
      );
      const id_blog_footer = await executionFunction(
        () => guardarFooter(),
        "No se pudo guardar el pie de página"
      );

      const id_blog = await executionFunction(
        () => guardarBlog(id_blog_head, id_blog_footer, id_blog_body),
        "No se pudo guardar el blog"
      );
      const id_card = await executionFunction(
        () => guardarCard(id_blog, id_empleado),
        "No se pudo guardar la card"
      );

      // Rompe la actualizacion de imagenes
      // if (fileHeader) {
      //   await executionFunction(
      //     () => SaveImage(fileHeader, `card/blog/image_head/${id_card}`),
      //     "No se pudo guardar la imagen head"
      //   );
      // }

      // if (FileBodyHeader) {
      //   await executionFunction(
      //     () =>
      //       SaveImage(
      //         FileBodyHeader,
      //         `card/blog/images_body/${id_card}`,
      //         "image1"
      //       ),
      //     "No se pudo guardar la imagen body1"
      //   );
      // }

      // if (FileBodyFile1) {
      //   await executionFunction(
      //     () =>
      //       SaveImage(
      //         FileBodyFile1,
      //         `card/blog/images_body/${id_card}`,
      //         "image2"
      //       ),
      //     "No se pudo guardar la imagen body2"
      //   );
      // }

      // if (FileBodyFile2) {
      //   await executionFunction(
      //     () =>
      //       SaveImage(
      //         FileBodyFile2,
      //         `card/blog/images_body/${id_card}`,
      //         "image3"
      //       ),
      //     "No se pudo guardar la imagen body3"
      //   );
      // }

      // if (FileFooterFile1) {
      //   await executionFunction(
      //     () =>
      //       SaveImage(
      //         FileFooterFile1,
      //         `card/blog/images_footer/${id_card}`,
      //         "image1"
      //       ),
      //     "No se pudo guardar la imagen footer1"
      //   );
      // }

      // if (FileFooterFile2) {
      //   await executionFunction(
      //     () =>
      //       SaveImage(
      //         FileFooterFile2,
      //         `card/blog/images_footer/${id_card}`,
      //         "image2"
      //       ),
      //     "No se pudo guardar la imagen footer2"
      //   );
      // }

      // if (FileFooterFile3) {
      //   await executionFunction(
      //     () =>
      //       SaveImage(
      //         FileFooterFile3,
      //         `card/blog/images_footer/${id_card}`,
      //         "image3"
      //       ),
      //     "No se pudo guardar la imagen footer3"
      //   );
      // }
      await Swal.fire({
        title: "Actualizado Correctamente",
        text: "Tu blog ha sido actualizado exitosamente",
        icon: "success",
        showCancelButton: true,
        showDenyButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cerrar",
        denyButtonText: "Ver Blog",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/dashboard/blogs/");
        } else if (result.isDenied) {
          router.push("/blog/");
        }
      });
    } catch (error) {
      console.error("=== ERROR EN EL PROCESO DE GUARDADO ===");
      console.error("Error completo:", error);
      console.error("Stack trace:", error.stack);
      
      await Swal.fire({
        title: "Error al Guardar",
        text: `Ocurrió un error: ${error.message}. Por favor, revisa la consola para más detalles.`,
        icon: "error",
        confirmButtonText: "Entendido"
      });
    } finally {
      setLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-gray-700 animate-spin" />
        <p className="text-gray-700 ml-3">Cargando blog...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">{error}</h1>
          <p className="text-gray-600 mb-6">
            No pudimos cargar el contenido del blog. Por favor, intenta
            nuevamente.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div id="header" className="section-container mb-8">
        <FormHeader
          dataHeader={dataHeader}
          setFormData={setDataHeader}
          setFile={setFileHeader}
          onDeleteImage={deleteHeaderImage}
          setValidacionHeader={setValidacionHeader}
        />
      </div>

      <div
        id="body"
        className="section-container my-8 bg-gradient-to-r text-black w-full"
      >
        <FormBody3
          formCommendBody={formCommendBody}
          setFormCommendBody={setFormCommendBody}
          formInfoBody={formInfoBody}
          setFormInfoBody={setFormInfoBody}
          formGaleryBody={formGaleryBody}
          setFormGaleryBody={setFormGaleryBody}
          setFileBodyHeader={setFileBodyHeader}
          onDeleteBodyHeaderImage={deleteBodyHeaderImage}
          setFileBodyFile1={setFileBodyFile1}
          onDeleteBodyFile1={deleteBodyFile1}
          setFileBodyFile2={setFileBodyFile2}
          onDeleteBodyFile2={deleteBodyFile2}
          formEncabezadoBody={formEncabezadoBody}
          setFormEncabezadoBody={setFormEncabezadoBody}
          setValidacionBody={setValidacionBody}
          serviceRedirectUrl={serviceRedirectUrl}
          setServiceRedirectUrl={setServiceRedirectUrl}
        />
      </div>

      <div id="footer" className="section-container mt-8">
        <FormFooter
          formFooter={formFooter}
          setFormData={setFormFooter}
          setFileFooterFile1={setFileFooterFile1}
          onDeleteFooterFile1={deleteFooterFile1}
          setFileFooterFile2={setFileFooterFile2}
          onDeleteFooterFile2={deleteFooterFile2}
          setFileFooterFile3={setFileFooterFile3}
          onDeleteFooterFile3={deleteFooterFile3}
          setValidacionFooter={setValidacionFooter}
        />
      </div>
      
      <div className="bottom-0 left-0 fixed p-6 border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <button
          onClick={HandleSave}
          disabled={loading || isDisabled}
          className={`text-white rounded-xl flex items-center justify-center w-full transition-all duration-300 px-5 py-3 shadow-lg shadow-emerald-900/20 ${
            loading
              ? "bg-emerald-400 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-500"
          }`}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
              Guardando...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4 text-blue-950" />
              Guardar Cambios
            </>
          )}
        </button>
      </div>
    </>
  );
};

export default Page;