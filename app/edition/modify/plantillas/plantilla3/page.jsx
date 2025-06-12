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

  //data blog
  const [dataBlog, setDataBlog] = useState(null);

  // header
  const [dataHeader, setDataHeader] = useState(null);

  // body
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

  // footer
  const [dataFooter, setDataFooter] = useState(null);

  const searchParams = useSearchParams()
  const id_blog = searchParams.get("id_blog")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const id_empleado = getCookie("empleado") ? JSON.parse(getCookie("empleado")).id_empleado : -1;

  //desactivar boton

  const [validacionHeader, setValidacionHeader] = useState(false);
  const [validacionBody, setValidacionBody] = useState(false);
  const [validacionFooter, setValidacionFooter] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setIsDisabled((validacionHeader && validacionFooter && validacionBody));
  }, [validacionHeader, validacionFooter, validacionBody]);

  useEffect(() => {
    fetchDataTotal()
  }, [id_blog])

  {/* Aqui se obtiene toda la información del blog creado segun su id */ }
  async function fetchDataTotal() {
    try {
      setIsLoading(true)
      const response = await Fetch.fetchBlogById(id_blog);

      if (response) {
        setDataBlog(response);

        {/*Obtiene el header */ }
        const responseHeader = await Fetch.fetchBlogHead(response.id_blog_head);
        if (responseHeader) {
          setImageHeaderBefore(responseHeader.public_image);
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

        {/*Obtiene el body */ }
        const responseBody = await Fetch.fetchBlogBodyById(response.id_blog_body);
        if (responseBody) {
          setImageBodyHeaderBefore(responseBody.public_image1);
          setImageBodyFile1Before(responseBody.public_image2);
          setImageBodyFile2Before(responseBody.public_image3);
          setDataBody(responseBody);

          setFormEncabezadoBody({
            titulo: responseBody.titulo,
            descripcion: responseBody.descripcion,
            public_image1: responseBody.public_image1,
            url_image1: responseBody.url_image1,
          });

          // Cargar la información en los formularios
          setFormInfoBody(Array.isArray(responseBody.tarjetas) ? responseBody.tarjetas : []);

          setFormCommendBody({
            titulo: responseBody.commend_tarjeta.titulo || '',
            texto1: responseBody.commend_tarjeta.texto1 || '',
            texto2: responseBody.commend_tarjeta.texto2 || '',
            texto3: responseBody.commend_tarjeta.texto3 || '',
            texto4: responseBody.commend_tarjeta.texto4 || '',
            texto5: responseBody.commend_tarjeta.texto5 || ''
          });

          setFormGaleryBody({
            public_image2: responseBody.public_image2,
            public_image3: responseBody.public_image3,
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
        {/*Obtiene el footer */ }
        const responseFooter = await Fetch.fetchBlogFooter(response.id_blog_footer);
        if (responseFooter) {
          setImageFooterFile1Before(responseFooter.public_image1);
          setImageFooterFile2Before(responseFooter.public_image2);
          setImageFooterFile3Before(responseFooter.public_image3);
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
      console.log("Error al guardar: ", error);
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error inesperado.",
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
    setFormGaleryBody(prev => ({
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
    const id = await Fetch.updateHeader(dataHeader.id_blog_head, dataHeader);
    if (id && id > 0) {
      return id;
    }
    else {
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
    const id = await Fetch.updateFooter(dataFooter.id_blog_footer, dataFooter);
    if (id && id > 0) {
      return id;
    }
    else {
      Swal.fire({
        title: "Error",
        text: "No se pudo guardar el pie de página",
        icon: "error",
        confirmButtonText: "OK",
      });
      return "error";
    }
  }

  async function guardarBody() {
    const form = {
      titulo: formEncabezadoBody.titulo,
      descripcion: formEncabezadoBody.descripcion,
      id_commend_tarjeta: dataBody.id_commend_tarjeta,
      public_image1: formEncabezadoBody.public_image1,
      url_image1: formEncabezadoBody.url_image1,
      public_image2: formGaleryBody.public_image2,
      url_image2: formGaleryBody.url_image2,
      public_image3: formGaleryBody.public_image3,
      url_image3: formGaleryBody.url_image3,
    }

    const id = await Fetch.updateBody(dataBody.id_blog_body, form);
    if (id && id > 0) {
      return id;
    }
    else {
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

    const form = {
      titulo: formCommendBody.titulo,
      texto1: formCommendBody.texto1,
      texto2: formCommendBody.texto2,
      texto3: formCommendBody.texto3,
      texto4: formCommendBody.texto4,
      texto5: formCommendBody.texto5,
    }

    const id = await Fetch.updateCommendTarjeta(dataBody.id_commend_tarjeta, form);
    if (id && id > 0) {
      return id;
    }
    else {
      Swal.fire({
        title: "Error",
        text: "No se pudo guardar la tarjeta de comentarios",
        icon: "error",
        confirmButtonText: "OK",
      });
      return "error";
    }
  }

  async function guardarBlog() {
    const form = {
      id_blog_head: dataBlog.id_blog_head,
      id_blog_footer: dataBlog.id_blog_footer,
      id_blog_body: dataBlog.id_blog_body,
      fecha: dataBlog.fecha,
    }
    const id = await Fetch.updateBlog(dataBlog.id_blog, form);
    if (id && id > 0) {
      return id;
    }
    else {
      Swal.fire({
        title: "Error",
        text: "No se actualizar guardar el blog",
        icon: "error",
        confirmButtonText: "OK",
      });
      return "error";
    }
  }

  async function guardarCard(id_empleado) {
    const form = {
      id_blog: dataBlog.id_blog,
      titulo: dataHeader.titulo,
      descripcion: dataHeader.texto_descripcion,
      public_image: dataHeader.public_image,
      url_image: dataHeader.url_image,
      id_plantilla: 3,
      id_empleado: id_empleado,
    }

    console.log("Form Card: ", form);

    const id = await Fetch.updateCard(dataBlog.card.id_card, form);
    if (id && id > 0) {
      console.log("Id del card:", id);
      return id;
    }
    else {
      Swal.fire({
        title: "Error",
        text: "No se pudo guardar la tarjeta",
        icon: "error",
        confirmButtonText: "OK",
      });
      return "error";
    }
  }

  async function guardarTarjetas() {
    try {
      await Promise.all(
        formInfoBody.map(async (section) => {
          const form = {
            id_blog_body: dataBody.id_blog_body,
            titulo: section.titulo,
            descripcion: section.descripcion,
          };
          const id = await Fetch.updateTarjeta(section.id_tarjeta, form);
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

  /*async function deleteCarpetImages(){
    try {
      const response = await Fetch.deleteImagesCarpet(dataBlog.card.id_card);
      return response;
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se pudo guardar una o más tarjetas",
        icon: "error",
        confirmButtonText: "OK",
      });
      return "error";
    }
  }*/

  async function executionFunction(functionSave, mensajeError) {
    const resultado = await functionSave();
    if (!resultado || resultado === "error") {
      Swal.fire({
        title: "Error",
        text: mensajeError,
        icon: "error",
        confirmButtonText: "OK",
      });
      throw new Error(mensajeError);
    }
    return resultado;
  }

  /* 
    storage/app/public/images/templates/plantilla{id_plantilla}/blog{id_blog}/head/image.jpeg
    storage/app/public/images/templates/plantilla{id_plantilla}/blog{id_blog}/body/image.webp
    storage/app/public/images/templates/plantilla{id_plantilla}/blog{id_blog}/footer/image.webp
  */

  async function SaveImage(file, ruta, name = null) {
    try {

      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      if (name) {
        formData.append("name", name);
      }

      const response = await Fetch.saveImage(formData, ruta);
      if (response.status === 200 || response.status === 201) {
        setFileHeader(null)
        return "ok";
      } else {
        throw new Error("Error al subir la imagen");
      }

    } catch (error) {
      console.log(error);
    }
  }

  async function HandleSave() {
    try {

      setLoading(true);

      await executionFunction(guardarCommendTarjeta, "No se pudo guardar la tarjeta de comentarios");

      await executionFunction(guardarBody, "No se pudo guardar el contenido del blog");

      await executionFunction(guardarTarjetas, "No se pudo guardar las tarjetas informativas");

      await executionFunction(guardarHeader, "No se pudo guardar el encabezado");
      await executionFunction(guardarFooter, "No se pudo guardar el pie de página");

      await executionFunction(guardarBlog, "No se pudo guardar el blog");
      await executionFunction(() => guardarCard(id_empleado), "No se pudo guardar la card");

      //await executionFunction(deleteCarpetImages, "No se logro eliminar la carpeta de imagenes antigua");

      if (fileHeader) {
        await executionFunction(() => SaveImage(fileHeader, `card/blog/image_head/${dataBlog.card.id_card}`), "No se pudo guardar la imagen");
      }

      if (FileBodyHeader) {
        await executionFunction(() => SaveImage(FileBodyHeader, `card/blog/images_body/${dataBlog.card.id_card}`, "image1"), "No se pudo guardar la imagen");
      }

      if (FileBodyFile1) {
        await executionFunction(() => SaveImage(FileBodyFile1, `card/blog/images_body/${dataBlog.card.id_card}`, "image2"), "No se pudo guardar la imagen");
      }

      if (FileBodyFile2) {
        await executionFunction(() => SaveImage(FileBodyFile2, `card/blog/images_body/${dataBlog.card.id_card}`, "image3"), "No se pudo guardar la imagen");
      }

      if (FileFooterFile1) {
        await executionFunction(() => SaveImage(FileFooterFile1, `card/blog/images_footer/${dataBlog.card.id_card}`, "image1"), "No se pudo guardar la imagen");
      }

      if (FileFooterFile2) {
        await executionFunction(() => SaveImage(FileFooterFile2, `card/blog/images_footer/${dataBlog.card.id_card}`, "image2"), "No se pudo guardar la imagen");
      }

      if (FileFooterFile3) {
        await executionFunction(() => SaveImage(FileFooterFile3, `card/blog/images_footer/${dataBlog.card.id_card}`, "image3"), "No se pudo guardar la imagen");
      }

      Swal.fire({
        title: "Actualizado Correctamente",
        text: "¡Podrás ver tu blog en la sección de blogs de la página principal!",
        icon: "success"
      });

      router.push("/dashboard/blogs/")

      setImageBodyFile1Before("");
      setImageBodyFile2Before("");
      setImageFooterFile1Before("");
      setImageFooterFile2Before("");
      setImageFooterFile3Before("");
      setImageHeaderBefore("");
      setImageBodyHeaderBefore("");
      

      setDataBody(null);
      setDataFooter(null);
      setDataHeader(null);
      setDataBlog(null);

      setFileHeader(null);
      setFileBodyHeader(null);
      setFileBodyFile1(null);
      setFileBodyFile2(null);
      setFileFooterFile1(null);
      setFileFooterFile2(null);
      setFileFooterFile3(null);

    } catch (error) {
      console.error("Error al guardar:", error.message);
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
          className={`text-white rounded-xl flex items-center justify-center w-full transition-all duration-300 px-5 py-3 shadow-lg shadow-emerald-900/20 ${loading ? "bg-emerald-400 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-500"
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
