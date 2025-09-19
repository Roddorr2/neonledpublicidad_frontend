"use client";
import FormBody3 from "../components/FormBody3";
import FormFooter from "../components/FormFooter";
import FormHeader from "../components/FormHeader";
import { useState, useEffect } from "react";
import Service from "../../services/Service";
import { Save } from "lucide-react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

const PageContent = () => {
  const [validacionHeader, setValidacionHeader] = useState(true);
  const [validacionBody, setValidacionBody] = useState(true);
  const [validacionFooter, setValidacionFooter] = useState(true);

  const [isDisabled, setIsDisabled] = useState(true);

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [fileHeader, setFileHeader] = useState(null);

  const [FileBodyHeader, setFileBodyHeader] = useState(null);
  const [FileBodyFile1, setFileBodyFile1] = useState(null);
  const [FileBodyFile2, setFileBodyFile2] = useState(null);

  const [FileFooterFile1, setFileFooterFile1] = useState(null);
  const [FileFooterFile2, setFileFooterFile2] = useState(null);
  const [FileFooterFile3, setFileFooterFile3] = useState(null);

  const [serviceRedirectUrl, setServiceRedirectUrl] = useState("");

  const deleteFooterFile1 = () => {
    setFileFooterFile1(null);
    setFormFooter((prev) => ({
      ...prev,
      public_image1: "/blog/blog-10.jpg",
      url_image1: "",
    }));
  };
  const deleteFooterFile2 = () => {
    setFileFooterFile2(null);
    setFormFooter((prev) => ({
      ...prev,
      public_image2: "/blog/blog-10.jpg",
      url_image2: "",
    }));
  };
  const deleteFooterFile3 = () => {
    setFileFooterFile3(null);
    setFormFooter((prev) => ({
      ...prev,
      public_image3: "/blog/blog-10.jpg",
      url_image3: "",
    }));
  };

  const deleteHeaderImage = () => {
    setFileHeader(null);
    setDataHeader((prev) => ({
      ...prev,
      public_image: "/blog/fondo_blog_extend.png",
      url_image: "",
    }));
  };

  const deleteBodyHeaderImage = () => {
    setFileBodyHeader(null);
    setFormEncabezadoBody((prev) => ({
      ...prev,
      public_image1: "/blog/blog-4.jpg",
      url_image1: "",
    }));
  };

  const deleteBodyFile1 = () => {
    setFileBodyFile1(null);
    setFormGaleryBody((prev) => ({
      ...prev,
      public_image2: "/blog/blog-2.jpg",
      url_image2: "",
    }));
  };

  const deleteBodyFile2 = () => {
    setFileBodyFile2(null);
    setFormGaleryBody((prev) => ({
      ...prev,
      public_image3: "/blog/blog-2.jpg",
      url_image3: "",
    }));
  };

  const id_empleado = getCookie("empleado")
    ? JSON.parse(getCookie("empleado")).id_empleado
    : -1;

  const [formFooter, setFormFooter] = useState({
    titulo: "Titulo Footer",
    descripcion:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, voluptate.",
    public_image1: "/blog/blog-10.jpg",
    url_image1: "",
    public_image2: "/blog/blog-10.jpg",
    url_image2: "",
    public_image3: "/blog/blog-10.jpg",
    url_image3: "",
  });

  const [dataHeader, setDataHeader] = useState({
    titulo: "Titulo Header",
    texto_frase: "Texto atractivo y llamativo para el cliente",
    texto_descripcion: "Texto destacado y secundario para el titulo",
    public_image: "/blog/fondo_blog_extend.png",
    url_image: "",
  });

  const [formEncabezadoBody, setFormEncabezadoBody] = useState({
    titulo: "Titulo del Blog",
    descripcion:
      "Las luces neón LED se han convertido en un elemento diferenciador en el mundo de la hospitalidad. No solo son visualmente atractivos, sino que también refuerzan la identidad de tu negocio.",
    fecha: "2025-03-31",
    public_image1: "/blog/blog-4.jpg",
    url_image1: "",
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
      titulo: "Marketing y Atracción de Clientess",
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
    public_image3: "/blog/blog-2.jpg",
    url_image3: "",
  });

  useEffect(() => {
    const sections = document.querySelectorAll("#header, #body, #footer");
    sections.forEach((section) => {
      section.style.scrollMargin = "50px";
      if (section.id === "body" && section.clientHeight < 300) {
        section.style.minHeight = "300px";
      }
    });
  }, []);

  useEffect(() => {
    setIsDisabled(validacionHeader && validacionFooter && validacionBody);
  }, [validacionHeader, validacionFooter, validacionBody]);

  async function guardarHeader() {
    const id = await Service.saveHeader(dataHeader);
    if (id && id > 0) {
      return id;
    } else {
      Swal.fire({
        title: "Error",
        text: "No se pudo guardar el encabezado",
        icon: "error",
        confirmButtonText: "OK",
      });
      return "error";
    }
  }

  async function guardarFooter() {
    const id = await Service.saveFooter(formFooter);
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
      image1_alt: formEncabezadoBody.image1_alt,
      image1_title: formEncabezadoBody.image1_title,
      public_image2: formGaleryBody.public_image2,
      url_image2: formGaleryBody.url_image2,
      image2_alt: formGaleryBody.image2_alt,
      image2_title: formGaleryBody.image2_title,
      public_image3: formGaleryBody.public_image3,
      url_image3: formGaleryBody.url_image3,
      image3_alt: formGaleryBody.image3_alt,
      image3_title: formGaleryBody.image3_title,
      service_url: serviceRedirectUrl,
    };

    const id = await Service.saveBody(formBody);
    if (id && id > 0) {
      return id;
    } else {
      Swal.fire({
        title: "Error",
        text: "No se pudo guardar el contenido",
        icon: "error",
        confirmButtonText: "OK",
      });
      return "error";
    }
  }

  async function guardarCommendTarjeta() {
    const id = await Service.saveCommendTarjeta(formCommendBody);
    if (id && id > 0) {
      return id;
    } else {
      Swal.fire({
        title: "Error",
        text: "No se pudo guardar la tarjeta de comentarios",
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
    const id = await Service.saveBlog(formBlog);
    if (id && id > 0) {
      return id;
    } else {
      Swal.fire({
        title: "Error",
        text: "No se pudo guardar el blog",
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
      image_alt: dataHeader.image_alt,
      image_title: dataHeader.image_title,
      id_plantilla: 3,
      id_empleado: id_empleado,
    };

    const id = await Service.saveCard(formCard);
    if (id && id > 0) {
      return id;
    } else {
      Swal.fire({
        title: "Error",
        text: "No se pudo guardar la tarjeta",
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
            palabra: section.palabra,
            enlace: section.enlace,
          };
          const id = await Service.saveTarjeta(formTarjeta);
          if (!id || id <= 0) throw new Error("Error al guardar tarjeta");
          return id;
        })
      );
      return "succes";
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
    storage/app/public/images/templates/plantilla{id_plantilla}/blog{id_blog}/body/image.webp
    storage/app/public/images/templates/plantilla{id_plantilla}/blog{id_blog}/footer/image.webp
  */

  async function SaveImage(file, ruta, name = null) {
    try {
      if (!file) return "ok";

      const formData = new FormData();
      formData.append("file", file);
      if (name) formData.append("name", name);

      const response = await Service.saveImage(formData, ruta);

      // si la respuesta es undefined pero no hay error, consideramos éxito
      if (response === undefined) {
        return "ok";
      }

      // si la respuesta es null, también lo consideramos éxito
      if (response === null) {
        return "ok";
      }

      let jsonData = null;

      if (typeof response === "string") {
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          try {
            jsonData = JSON.parse(jsonMatch[0]);
          } catch (parseError) {
            console.warn("⚠️ Error al parsear JSON.");

            if (
              response.toLowerCase().includes("success") ||
              response.includes("200")
            ) {
              return "ok";
            }
          }
        } else {
          if (
            response.toLowerCase().includes("success") ||
            response.includes("200")
          ) {
            return "ok";
          }
        }
      } else if (response?.data) {
        if (typeof response.data === "string") {
          const jsonMatch = response.data.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            try {
              jsonData = JSON.parse(jsonMatch[0]);
            } catch (parseError) {
              console.warn("⚠️ Error al parsear JSON de data.");
            }
          }
        } else {
          jsonData = response.data;
        }
      } else if (typeof response === "object") {
        jsonData = response;
      }

      const isSuccess =
        jsonData?.status === 200 ||
        jsonData?.status === "200" ||
        jsonData?.success === true ||
        jsonData?.message?.toLowerCase().includes("success") ||
        jsonData?.message?.includes("guardado") ||
        jsonData?.message?.includes("subido") ||
        (response && typeof response === "object" && !jsonData?.error);

      if (isSuccess) {
        return "ok";
      }

      if (
        !jsonData?.error &&
        !jsonData?.message?.toLowerCase().includes("error")
      ) {
        return "ok";
      }

      const errorMessage =
        jsonData?.message ||
        jsonData?.error ||
        "Error desconocido en el servidor";
      throw new Error(`Error al subir imagen: ${errorMessage}`);
    } catch (error) {
      console.error("❌ Error en SaveImage:", {
        error: error.message,
        ruta,
        name,
        file: file ? file.name : "no file",
      });

      if (
        error.message.includes("JSON") ||
        error.message.includes("undefined")
      ) {
        return "ok";
      }

      throw error;
    }
  }

  function getCurrentDate() {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  async function HandleSave() {
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

      if (fileHeader) {
        await executionFunction(
          () => SaveImage(fileHeader, `card/blog/image_head/${id_card}`),
          "No se pudo guardar la imagen"
        );
      }

      if (FileBodyHeader) {
        await executionFunction(
          () =>
            SaveImage(
              FileBodyHeader,
              `card/blog/images_body/${id_card}`,
              "image1"
            ),
          "No se pudo guardar la imagen"
        );
      }

      if (FileBodyFile1) {
        await executionFunction(
          () =>
            SaveImage(
              FileBodyFile1,
              `card/blog/images_body/${id_card}`,
              "image2"
            ),
          "No se pudo guardar la imagen"
        );
      }

      if (FileBodyFile2) {
        await executionFunction(
          () =>
            SaveImage(
              FileBodyFile2,
              `card/blog/images_body/${id_card}`,
              "image3"
            ),
          "No se pudo guardar la imagen"
        );
      }

      if (FileFooterFile1) {
        await executionFunction(
          () =>
            SaveImage(
              FileFooterFile1,
              `card/blog/images_footer/${id_card}`,
              "image1"
            ),
          "No se pudo guardar la imagen"
        );
      }

      if (FileFooterFile2) {
        await executionFunction(
          () =>
            SaveImage(
              FileFooterFile2,
              `card/blog/images_footer/${id_card}`,
              "image2"
            ),
          "No se pudo guardar la imagen"
        );
      }

      if (FileFooterFile3) {
        await executionFunction(
          () =>
            SaveImage(
              FileFooterFile3,
              `card/blog/images_footer/${id_card}`,
              "image3"
            ),
          "No se pudo guardar la imagen"
        );
      }

      const imageInfo =
        dataHeader.image_title && dataHeader.image_alt
          ? `\n\n📸 Información de la imagen:\n• Título: ${dataHeader.image_title}\n• Texto alternativo: ${dataHeader.image_alt}`
          : "";

      const result = await Swal.fire({
        title: "¡Blog Guardado Correctamente! 🎉",
        html: `
        <div style="text-align: left; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px; border-radius: 10px; margin-bottom: 20px;">
            <h3 style="margin: 0; font-size: 18px; font-weight: bold;">📝 ${
              dataHeader.titulo
            }</h3>
          </div>
          
          ${
            dataHeader.image_title && dataHeader.image_alt
              ? `
          <div style="background: #f8f9ff; border-left: 4px solid #667eea; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
            <h4 style="margin: 0 0 10px 0; color: #4c51bf; font-size: 14px; font-weight: 600;">📸 Información de la Imagen:</h4>
            <p style="margin: 5px 0; color: #555; font-size: 13px;"><strong>Título:</strong> ${dataHeader.image_title}</p>
            <p style="margin: 5px 0; color: #555; font-size: 13px;"><strong>Texto alternativo:</strong> ${dataHeader.image_alt}</p>
          </div>
          `
              : ""
          }
          
          <div style="background: #f0fff4; border: 1px solid #9ae6b4; padding: 12px; border-radius: 5px; color: #2f855a;">
            <p style="margin: 0; font-size: 13px;">✅ Tu blog ya está disponible en la sección de blogs de la página principal</p>
          </div>
        </div>
      `,
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "¡Ver Blog!",
        cancelButtonText: "Cerrar",
        confirmButtonColor: "#667eea",
        cancelButtonColor: "#6b7280",

        width: "500px",
        customClass: {
          htmlContainer: "swal-html-container",
        },
      });

      if (result.isConfirmed) {
        setFormFooter({
          titulo: "Titulo Footer",
          descripcion:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, voluptate.",
          public_image1: "/blog/blog-10.webp",
          url_image1: "",
          image1_alt: "",
          image1_title: "",
          public_image2: "/blog/blog-10.webp",
          url_image2: "",
          image2_alt: "",
          image2_title: "",
          public_image3: "/blog/blog-10.webp",
          url_image3: "",
          image3_alt: "",
          image3_title: "",
        });

        setDataHeader({
          titulo: "Titulo Header",
          texto_frase: "Texto atractivo y llamativo para el cliente",
          texto_descripcion: "Texto destacado y secundario para el titulo",
          public_image: "/blog/fondo_blog_extend.webp",
          url_image: "",
          image_alt: "",
          image_title: "",
        });

        setFormEncabezadoBody({
          titulo: "Titulo del Blog",
          descripcion:
            "Las luces neón LED se han convertido en un elemento diferenciador en el mundo de la hospitalidad. No solo son visualmente atractivos, sino que también refuerzan la identidad de tu negocio.",
          fecha: getCurrentDate(),
          public_image1: "/blog/blog-4.webp",
          url_image1: "",
          image1_alt: "",
          image1_title: "",
        });

        setFormInfoBody([
          {
            titulo: "El Factor Sorpresa y Distinción",
            descripcion:
              "Las letras de neón LED permiten personalizar la imagen de tu local, haciendo que el nombre de tu bar sea visible desde lejos. Un diseño llamativo puede convertirse en un sello distintivo y en un punto de referencia para los clientes.",
            palabra: "",
            enlace: "",
          },
          {
            titulo: "Ambiente y Experiencia Visual",
            descripcion:
              "La iluminación juega un papel crucial en la atmósfera de un bar. Los colores vibrantes y cálidos del neón LED pueden transformar un espacio ordinario en un entorno acogedor e instagrameable.",
            palabra: "",
            enlace: "",
          },
          {
            titulo: "Eficiencia Energética y Durabilidad",
            descripcion:
              "A diferencia del neón tradicional, las luces LED son más eficientes, consumen menos energía y tienen una vida útil más prolongada.",
            palabra: "",
            enlace: "",
          },
          {
            titulo: "Marketing y Atracción de Clientes",
            descripcion:
              "Un letrero de neón LED bien diseñado es una herramienta de marketing poderosa, capaz de captar la atención y aumentar la visibilidad de tu local.",
            palabra: "",
            enlace: "",
          },
        ]);

        setFormCommendBody({
          titulo: "Consejos para Elegir el Letrero Perfecto",
          texto1: "Opta por colores que reflejen la personalidad de tu bar.",
          texto2: "Elige un diseño legible y atractivo.",
          texto3:
            "Considera el lugar de instalación para maximizar su impacto.",
          texto4: "",
          texto5: "",
        });

        setFormGaleryBody({
          public_image2: "/blog/blog-2.webp",
          url_image2: "",
          image2_alt: "",
          image2_title: "",
          public_image3: "/blog/blog-2.webp",
          url_image3: "",
          image3_alt: "",
          image3_title: "",
        });

        setFileHeader(null);
        setFileBodyHeader(null);
        setFileBodyFile1(null);
        setFileBodyFile2(null);
        setFileFooterFile1(null);
        setFileFooterFile2(null);
        setFileFooterFile3(null);

        router.push("/dashboard/blogs/");
      }
    } catch (error) {
      console.error("Error al guardar:", error.message);
    } finally {
      setLoading(false);
    }
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

      <div id="body" className="section-container my-8">
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
        {isDisabled ? (
          <button
            onClick={HandleSave}
            disabled={loading}
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
        ) : (
          <button
            disabled
            className="flex items-center px-4 py-2 bg-gray-300 text-gray-500 cursor-not-allowed rounded"
          >
            <>
              <Save className="mr-2 h-4 w-4 text-blue-950" />
              Guardar Cambios
            </>
          </button>
        )}
      </div>
    </>
  );
};

export default PageContent;
