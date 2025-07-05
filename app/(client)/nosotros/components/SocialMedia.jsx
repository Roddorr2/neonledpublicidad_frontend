export const SocialMedia = () => {
  return (
    <div className="bg-white text-center py-6 px-4">
      <h3 className="text-sm md:text-base mb-4 text-gray-900 font-medium">Síguenos en nuestras redes</h3>
      <div className="flex justify-center space-x-6">
        {/* TikTok */}
        <a href="https://www.tiktok.com/@neonled.publicidad" className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 12a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
            <path d="M19 10v4a5 5 0 0 1-5 5h-4a5 5 0 0 1-5-5v-4a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5z" />
            <path d="M12 12v-8" />
            <path d="M16 8h-4" />
          </svg>
        </a>

        {/* YouTube */}
        <a href="https://www.youtube.com/@neonledpublicidad_2025" className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
            <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
          </svg>
        </a>

        {/* Facebook */}
        <a href="https://www.facebook.com/ledneonpublicidad" className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
        </a>

        {/* Instagram */}
        <a href="https://www.instagram.com/neonledpublicidad.oficial/" className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </a>
      </div>
    </div>
  )
}
