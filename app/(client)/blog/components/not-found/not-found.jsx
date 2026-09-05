export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full text-center">
                <div className="text-gray-400 text-6xl mb-4">📄</div>
                <h1 className="text-2xl font-bold text-gray-800 mb-3">
                    Blog no encontrado
                </h1>
                <p className="text-gray-600 mb-6">
                    El blog que estás buscando no existe o no está disponible.
                </p>
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