"use client";
import FormFooter from '../../components/FormFooter'
import FormHeader from '../../components/FormHeader'
import { useState, useEffect, Suspense } from 'react';
import { Save } from "lucide-react"
import Swal from 'sweetalert2';
import { useRouter } from "next/navigation";
import { getCookie } from 'cookies-next';
import { useSearchParams } from "next/navigation"
import Fetch from "../../services/fetch"
import { Loader2 } from "lucide-react"
import FormBody3 from '../../components/FormBody3';

const Page = () => {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen text-gray-700">Cargando...</div>}>
      <PageContent />
    </Suspense>
  )
}

const PageContent = () => {

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [imageHeaderBefore, setImageHeaderBefore] = useState("");
  const [imageBodyHeaderBefore, setImageBodyHeaderBefore] = useState("");
  const [imageBodyFile1Before, setImageBodyFile1Before] = useState("");
  const [imageBodyFile2Before, setImageBodyFile2Before] = useState("");
  const [imageFooterFile1Before, setImageFooterFile1Before] = useState("");
  const [imageFooterFile2Before, setImageFooterFile2Before] = useState("");
  const [imageFooterFile3Before, setImageFooterFile3Before] = useState("");

  const [fileHeader, setFileHeader] = useState(null);
  const [FileBodyHeader, setFileBodyHeader] = useState(null);
  const [FileBodyFile1, setFileBodyFile1] = useState(null);
  const [FileBodyFile2, setFileBodyFile2] = useState(null);
  const [FileFooterFile1, setFileFooterFile1] = useState(null);
  const [FileFooterFile2, setFileFooterFile2] = useState(null);
  const [FileFooterFile3, setFileFooterFile3] = useState(null);

  const [blogAuthor, setBlogAuthor] = useState(null);


  const [dataBlog, setDataBlog] = useState(null);


  const [dataHeader, setDataHeader] = useState(null);

  
  const [dataBody, setDataBody] = useState(null);
  const [formCommendBody, setFormCommendBody] = useState({
    titulo: '',
    texto1: '',
    texto2: '',
    texto3: '',
    texto4: '',
    texto5: ''
  });
  const [formInfoBody, setFormInfoBody] = useState([]);
  const [formGaleryBody, setFormGaleryBody] = useState({});
  const [formEncabezadoBody, setFormEncabezadoBody] = useState({});


  const [dataFooter, setDataFooter] = useState(null);

  const searchParams = useSearchParams()
  const id_blog = searchParams.get("id_blog")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const id_empleado = getCookie("empleado") ? JSON.parse(getCookie("empleado")).id_empleado : -1;

  
  const [validacionHeader, setValidacionHeader] = useState(true); 
  const [validacionBody, setValidacionBody] = useState(true);
  const [validacionFooter, setValidacionFooter] = useState(true); 
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setIsDisabled(!(validacionHeader && validacionFooter && validacionBody));
  }, [validacionHeader, validacionFooter, validacionBody]);

  useEffect(() => {
    if (id_blog) {
      fetchDataTotal()
    }
  }, [id_blog])


  async function fetchDataTotal() {
    try {
      setIsLoading(true)
      const response = await Fetch.fetchBlogById(id_blog);

      if (response) {
        setDataBlog(response);
        setBlogAuthor(response.card.id_empleado);

    
        const responseHeader = await Fetch.fetchBlogHead(response.id_blog_head);
        if (responseHeader) {
          setImageHeaderBefore(responseHeader.public_image || "");
          setDataHeader(responseHeader);
        }
        else {
          setError("No se pudo cargar la informacion del encabezado");
          await Swal.fire({
            title: "Error",
            text: "No se pudo cargar la informacion del encabezado",
            icon: "error",
            confirmButtonText: "OK",
          });
          return;
        }

      
        const responseBody = await Fetch.fetchBlogBodyById(response.id_blog_body);
        if (responseBody) {
          setImageBodyHeaderBefore(responseBody.public_image1 || "");
          setImageBodyFile1Before(responseBody.public_image2 || "");
          setImageBodyFile2Before(responseBody.public_image3 || "");
          setDataBody(responseBody);

          setFormEncabezadoBody({
            titulo: responseBody.titulo || '',
            descripcion: responseBody.descripcion || '',
            public_image1: responseBody.public_image1 || '',
            url_image1: responseBody.url_image1 || '',
            alt_image1: responseBody.alt_image1 || '',
            title_image1: responseBody.title_image1 || ''
          });

   
          setFormInfoBody(Array.isArray(responseBody.tarjetas) ? responseBody.tarjetas : []);

          setFormCommendBody({
            titulo: responseBody.commend_tarjeta?.titulo || '',
            texto1: responseBody.commend_tarjeta?.texto1 || '',
            texto2: responseBody.commend_tarjeta?.texto2 || '',
            texto3: responseBody.commend_tarjeta?.texto3 || '',
            texto4: responseBody.commend_tarjeta?.texto4 || '',
            texto5: responseBody.commend_tarjeta?.texto5 || ''
          });

          setFormGaleryBody({
            public_image2: responseBody.public_image2 || '',
            url_image2: responseBody.url_image2 || '',
            alt_image2: responseBody.alt_image2 || '',
            title_image2: responseBody.title_image2 || '',
            public_image3: responseBody.public_image3 || '',
            url_image3: responseBody.url_image3 || '',
            alt_image3: responseBody.alt_image3 || '',
            title_image3: responseBody.title_image3 || '',
          });
        } else {
          setError("No se pudo cargar la informacion del body");
          await Swal.fire({
            title: "Error",
            text: "No se pudo cargar la informacion del body",
            icon: "error",
            confirmButtonText: "OK",
          });
          return;
        }

  
        const responseFooter = await Fetch.fetchBlogFooter(response.id_blog_footer);
        if (responseFooter) {
          setImageFooterFile1Before(responseFooter.public_image1 || "");
          setImageFooterFile2Before(responseFooter.public_image2 || "");
          setImageFooterFile3Before(responseFooter.public_image3 || "");
          setDataFooter(responseFooter);

          console.log("Footer: ", responseFooter);
          console.log("Data: ", dataFooter);
        }
        else {
          setError("No se pudo cargar la informacion del footer");
          await Swal.fire({
            title: "Error",
            text: "No se pudo cargar la informacion del footer",
            icon: "error",
            confirmButtonText: "OK",
          });
          return;
        }

        console.log("DataFooter: ", dataFooter);
        console.log("Header: ", dataHeader);
        console.log("Body: ", dataBody);
        console.log("Commend Tarjeta: ", formCommendBody)
        console.log("Info Body: ", formInfoBody)
        console.log("Encabezado Body: ", formEncabezadoBody)

      } else {
        setError("No se pudo cargar el contenido principal del blog");
        console.log("No hay contenido en nada :v")
        await Swal.fire({
          title: "Error",
          text: "Ocurrió un error inesperado.",
          icon: "error",
          confirmButtonText: "OK",
        })
        return
      }

    } catch (error) {
      console.log("Error al cargar datos: ", error);
      setError("Error al cargar los datos del blog");
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error inesperado al cargar los datos.",
        icon: "error",
        confirmButtonText: "OK",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const deleteFooterFile1 = () => {
    setFileFooterFile1(null);
    setDataFooter(prev => ({
      ...prev,
      public_image1: imageFooterFile1Before,
      url_image1: ""
    }));
  };
  
  const deleteFooterFile2 = () => {
    setFileFooterFile2(null);
    setDataFooter(prev => ({
      ...prev,
      public_image2: imageFooterFile2Before,
      url_image2: ""
    }));
  };
  
  const deleteFooterFile3 = () => {
    setFileFooterFile3(null);
    setDataFooter(prev => ({
      ...prev,
      public_image3: imageFooterFile3Before,
      url_image3: ""
    }));
  };

  const deleteHeaderImage = () => {
    setFileHeader(null);
    setDataHeader(prev => ({
      ...prev,
      public_image: imageHeaderBefore,
      url_image: ""
    }));
  };

  const deleteBodyHeaderImage = () => {
    setFileBodyHeader(null);
    setFormEncabezadoBody(prev => ({
      ...prev,
      public_image1: imageBodyHeaderBefore,
      url_image1: ""
    }));
  };

  const deleteBodyFile1 = () => {
    setFileBodyFile1(null);
    setFormGaleryBody(prev => ({
      ...prev,
      public_image2: imageBodyFile1Before,
      url_image2: ""
    }));
  };

  const deleteBodyFile2 = () => {
    setFileBodyFile2(null);
    setFormGaleryBody(prev => ({
      ...prev,
      public_image3: imageBodyFile2Before,
      url_image3: ""
    }));
  };

  useEffect(() => {
    const sections = document.querySelectorAll("#header, #body, #footer");
    sections.forEach(section => {
      section.style.scrollMargin = "50px";
      if (section.id === "body" && section.clientHeight < 300) {
        section.style.minHeight = "300px";
      }
    });
  }, []);

  async function guardarHeader() {
    try {
      console.log("Guardando header con datos:", dataHeader);
      const id = await Fetch.updateHeader(dataHeader.id_blog_head, dataHeader);
      console.log("Resultado guardar header:", id);
      
      if (id && id > 0) {
        return id;
      } else {
        throw new Error("ID inválido retornado del servidor");
      }
    } catch (error) {
      console.error("Error al guardar header:", error);
      throw new Error(`Error al guardar header: ${error.message}`);
    }
  }

  async function guardarFooter() {
    try {
      console.log("Guardando footer con datos:", dataFooter);
      const id = await Fetch.updateFooter(dataFooter.id_blog_footer, dataFooter);
      console.log("Resultado guardar footer:", id);
      
      if (id && id > 0) {
        return id;
      } else {
        throw new Error("ID inválido retornado del servidor");
      }
    } catch (error) {
      console.error("Error al guardar footer:", error);
      throw new Error(`Error al guardar footer: ${error.message}`);
    }
  }

  async function guardarBody() {
    try {
      const form = {
        titulo: formEncabezadoBody.titulo,
        descripcion: formEncabezadoBody.descripcion,
        id_commend_tarjeta: dataBody.id_commend_tarjeta,
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
      }

      console.log("Guardando body con datos:", form);
      const id = await Fetch.updateBody(dataBody.id_blog_body, form);
      console.log("Resultado guardar body:", id);
      
      if (id && id > 0) {
        return id;
      } else {
        throw new Error("ID inválido retornado del servidor");
      }
    } catch (error) {
      console.error("Error al guardar body:", error);
      throw new Error(`Error al guardar body: ${error.message}`);
    }
  }

  async function guardarCommendTarjeta() {
    try {
      const form = {
        titulo: formCommendBody.titulo,
        texto1: formCommendBody.texto1,
        texto2: formCommendBody.texto2,
        texto3: formCommendBody.texto3,
        texto4: formCommendBody.texto4,
        texto5: formCommendBody.texto5,
      }

      console.log("Guardando commend tarjeta con datos:", form);
      const id = await Fetch.updateCommendTarjeta(dataBody.id_commend_tarjeta, form);
      console.log("Resultado guardar commend tarjeta:", id);
      
      if (id && id > 0) {
        return id;
      } else {
        throw new Error("ID inválido retornado del servidor");
      }
    } catch (error) {
      console.error("Error al guardar commend tarjeta:", error);
      throw new Error(`Error al guardar commend tarjeta: ${error.message}`);
    }
  }

  async function guardarBlog() {
    try {
      const form = {
        id_blog_head: dataBlog.id_blog_head,
        id_blog_footer: dataBlog.id_blog_footer,
        id_blog_body: dataBlog.id_blog_body,
        fecha: dataBlog.fecha,
      }
      
      console.log("Guardando blog con datos:", form);
      const id = await Fetch.updateBlog(dataBlog.id_blog, form);
      console.log("Resultado guardar blog:", id);
      
      if (id && id > 0) {
        return id;
      } else {
        throw new Error("ID inválido retornado del servidor");
      }
    } catch (error) {
      console.error("Error al guardar blog:", error);
      throw new Error(`Error al guardar blog: ${error.message}`);
    }
  }

  async function guardarCard() {
    try {
      const form = {
        id_blog: dataBlog.id_blog,
        titulo: dataHeader.titulo,
        descripcion: dataHeader.texto_descripcion,
        public_image: dataHeader.public_image,
        url_image: dataHeader.url_image,
        id_plantilla: 3,
        id_empleado: blogAuthor
      }

      console.log("Guardando card con datos:", form);
      const id = await Fetch.updateCard(dataBlog.card.id_card, form);
      console.log("Resultado guardar card:", id);
      
      if (id && id > 0) {
        return id;
      } else {
        throw new Error("ID inválido retornado del servidor");
      }
    } catch (error) {
      console.error("Error al guardar card:", error);
      throw new Error(`Error al guardar card: ${error.message}`);
    }
  }

  async function guardarTarjetas() {
    try {
      if (!formInfoBody || formInfoBody.length === 0) {
        console.log("No hay tarjetas para guardar");
        return "success";
      }

      const results = await Promise.allSettled(
        formInfoBody.map(async (section) => {
          const form = {
            id_blog_body: dataBody.id_blog_body,
            titulo: section.titulo,
            descripcion: section.descripcion,
            keyword: section.keyword,
            link: section.link
          };
          
          console.log("Guardando tarjeta:", form);
          const id = await Fetch.updateTarjeta(section.id_tarjeta, form);
          console.log("Resultado guardar tarjeta:", id);
          
          if (!id || id <= 0) throw new Error("Error al guardar tarjeta");
          return id;
        })
      );

      const errors = results.filter(result => result.status === 'rejected');
      if (errors.length > 0) {
        console.error("Errores al guardar tarjetas:", errors);
        throw new Error(`${errors.length} tarjetas no se pudieron guardar`);
      }

      return "success";
    } catch (error) {
      console.error("Error al guardar tarjetas:", error);
      throw new Error(`Error al guardar tarjetas: ${error.message}`);
    }
  }


  async function SaveImage(file, ruta, name = null) {
    try {
      if (!file) {
        console.log("No hay archivo para guardar, saltando...");
        return true; 
      }

      console.log(`Intentando guardar imagen: ${file.name} en ruta: ${ruta}`);

      const formData = new FormData();
      formData.append("file", file);
      
      if (name) {
        formData.append("name", name);
      }

      const response = await Fetch.saveImage(formData, ruta);
      
      console.log("Respuesta completa de saveImage:", response);

      
      if (response) {
    
        if (response.status && (response.status === 200 || response.status === 201)) {
          console.log("Imagen guardada exitosamente (con status)");
          return true;
        }
        
      
        if (response.success === true || response.ok === true) {
          console.log("Imagen guardada exitosamente (success/ok)");
          return true;
        }
        
    
        if (!response.error && !response.message) {
          console.log("Imagen guardada exitosamente (respuesta truthy)");
          return true;
        }
      }

      

    } catch (error) {
      console.error("Error en SaveImage:", error);
      throw new Error(`Error al guardar imagen: ${error.message}`);
    }
  }

  async function HandleSave() {
    try {
      setLoading(true);
      console.log("=== INICIANDO PROCESO DE GUARDADO ===");


      if (!dataBlog || !dataHeader || !dataBody || !dataFooter) {
        throw new Error("Faltan datos necesarios para guardar el blog");
      }

      console.log("Datos disponibles:", {
        dataBlog: !!dataBlog,
        dataHeader: !!dataHeader,
        dataBody: !!dataBody,
        dataFooter: !!dataFooter,
      });

 
      console.log("1. Guardando tarjeta de comentarios...");
      await guardarCommendTarjeta();

      console.log("2. Guardando contenido del blog...");
      await guardarBody();

      console.log("3. Guardando tarjetas informativas...");
      await guardarTarjetas();

      console.log("4. Guardando encabezado...");
      await guardarHeader();
      
      console.log("5. Guardando pie de página...");
      await guardarFooter();

      console.log("6. Guardando blog...");
      await guardarBlog();
      
      console.log("7. Guardando card...");
      await guardarCard();

      console.log("=== DATOS GUARDADOS EXITOSAMENTE ===");


      console.log("=== INICIANDO GUARDADO DE IMÁGENES ===");
      
      const imagePromises = [];

      if (fileHeader) {
        console.log("Agregando imagen del header a la cola...");
        imagePromises.push(
          SaveImage(fileHeader, `card/blog/image_head/${dataBlog.card.id_card}`)
            .catch(error => {
              console.error("Error al guardar imagen del header:", error);
              return false; 
            })
        );
      }

      if (FileBodyHeader) {
        console.log("Agregando imagen del body header a la cola...");
        imagePromises.push(
          SaveImage(FileBodyHeader, `card/blog/images_body/${dataBlog.card.id_card}`, "image1")
            .catch(error => {
              console.error("Error al guardar imagen del body header:", error);
              return false;
            })
        );
      }

      if (FileBodyFile1) {
        console.log("Agregando imagen body file 1 a la cola...");
        imagePromises.push(
          SaveImage(FileBodyFile1, `card/blog/images_body/${dataBlog.card.id_card}`, "image2")
            .catch(error => {
              console.error("Error al guardar imagen body file 1:", error);
              return false;
            })
        );
      }

      if (FileBodyFile2) {
        console.log("Agregando imagen body file 2 a la cola...");
        imagePromises.push(
          SaveImage(FileBodyFile2, `card/blog/images_body/${dataBlog.card.id_card}`, "image3")
            .catch(error => {
              console.error("Error al guardar imagen body file 2:", error);
              return false;
            })
        );
      }

      if (FileFooterFile1) {
        console.log("Agregando imagen footer file 1 a la cola...");
        imagePromises.push(
          SaveImage(FileFooterFile1, `card/blog/images_footer/${dataBlog.card.id_card}`, "image1")
            .catch(error => {
              console.error("Error al guardar imagen footer file 1:", error);
              return false;
            })
        );
      }

      if (FileFooterFile2) {
        console.log("Agregando imagen footer file 2 a la cola...");
        imagePromises.push(
          SaveImage(FileFooterFile2, `card/blog/images_footer/${dataBlog.card.id_card}`, "image2")
            .catch(error => {
              console.error("Error al guardar imagen footer file 2:", error);
              return false;
            })
        );
      }

      if (FileFooterFile3) {
        console.log("Agregando imagen footer file 3 a la cola...");
        imagePromises.push(
          SaveImage(FileFooterFile3, `card/blog/images_footer/${dataBlog.card.id_card}`, "image3")
            .catch(error => {
              console.error("Error al guardar imagen footer file 3:", error);
              return false;
            })
        );
      }

   
      if (imagePromises.length > 0) {
        console.log(`Guardando ${imagePromises.length} imágenes...`);
        const imageResults = await Promise.all(imagePromises);
        
        const failedImages = imageResults.filter(result => result === false).length;
        
        if (failedImages > 0) {
          console.warn(`${failedImages} imágenes no se pudieron guardar, pero los datos se guardaron correctamente`);
      
        } else {
          console.log("Todas las imágenes se guardaron correctamente");
        }
      } else {
        console.log("No hay imágenes nuevas para guardar");
      }

      console.log("=== PROCESO COMPLETADO EXITOSAMENTE ===");

  
      const result = await Swal.fire({
        title: "Actualizado Correctamente",
        text: "Tu blog ha sido actualizado exitosamente",
        icon: "success",
        showCancelButton: true,
        showDenyButton: true,
        showConfirmButton: false,
        cancelButtonText: "Cerrar",
        denyButtonText: "Ver Blog",
        cancelButtonColor: "#6b7280",
        denyButtonColor: "#3b82f6"
      });

    
      if (result.isDenied) {

        router.push("/dashboard/blogs/");
      } else {
       
        
      }

     
      setFileHeader(null);
      setFileBodyHeader(null);
      setFileBodyFile1(null);
      setFileBodyFile2(null);
      setFileFooterFile1(null);
      setFileFooterFile2(null);
      setFileFooterFile3(null);

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
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">{error}</h1>
          <p className="text-gray-600 mb-6">No pudimos cargar el contenido del blog. Por favor, intenta nuevamente.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
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
    
      <div id="body" className="section-container my-8 bg-gradient-to-r text-black w-full">
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
        />
      </div>

      <div id="footer" className="section-container mt-8">
        <FormFooter
          formFooter={dataFooter}
          setFormData={setDataFooter}
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
            loading ? "bg-emerald-400 cursor-not-allowed" : 
            isDisabled ? "bg-gray-400 cursor-not-allowed" : 
            "bg-emerald-600 hover:bg-emerald-500"
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
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
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