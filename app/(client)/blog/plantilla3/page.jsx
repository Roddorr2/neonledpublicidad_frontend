"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Swal from "sweetalert2"
import Header from "../components/templates/Header"
import Body3 from "../components/templates/Body3"
import Footer from "../components/templates/Footer"
import Fetch from "../services/fetch"
import { Loader2 } from "lucide-react"

const Loading = () => (
  <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
    <div className="bg-black/70 p-8 rounded-xl backdrop-blur-sm flex flex-col items-center">
      <Loader2 className="h-12 w-12 text-white animate-spin mb-4" />
      <p className="text-white font-medium">Cargando blog...</p>
    </div>
  </div>
)

const PageContent = () => {
  const [data, setDataResponse] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const searchParams = useSearchParams()
  const blogLink = searchParams.get("blog")

  useEffect(() => {
    const fetchBlogData = async () => {
      if (!blogLink || blogLink === "null") {
        setError("Link de blog no proporcionado")
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setError(null)
        const response = await Fetch.fetchBlogByLink(blogLink)
        setDataResponse(response)
      } catch (error) {
        console.error("Error fetching blog data:", error)
        setError("No se pudo cargar el contenido del blog")
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

    fetchBlogData()
  }, [blogLink])

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

  if (isLoading) return <Loading />

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full text-center">
          <div className="text-gray-400 text-6xl mb-4">📄</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">Blog no encontrado</h1>
          <p className="text-gray-600 mb-6">El blog que estás buscando no existe o no está disponible.</p>
          <a
            href="/blog"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors inline-block"
          >
            Volver a blogs
          </a>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Header id_blog_head={data.id_blog_head} />
      <div className="container mx-auto px-4 py-12 relative bg-gradient-to-r text-black min-h-screen w-full">
        <div className="hidden lg:block w-20 xl:w-24 2xl:w-32 bg-gradient-to-b from-red-700 via-sky to-blue-800 fixed left-0 top-0 h-full -z-10"></div>
        <Body3 id_blog_body={data.id_blog_body} fecha={data.fecha} />
        <Footer id_blog_footer={data.id_blog_footer} />
      </div>
    </div>
  )
}

const Page = () => (
  <Suspense fallback={<Loading />}>
    <PageContent />
  </Suspense>
)

export default Page
