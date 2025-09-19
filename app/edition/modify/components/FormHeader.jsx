"use client"
import { Type, AlignLeft, Quote, Image as IconImage, Loader2, Trash2, Eye} from "lucide-react";
import { useState, useEffect } from "react";

export default function FormHeader({ dataHeader, setFormData, setFile, onDeleteImage, setIsDisabled, setValidacionHeader }) {

  const [uploading, setUploading] = useState(false);
  const [isValid_titulo, setIsValid_titulo] = useState(true);
  const [isValid_texto_frase, setIsValid_texto_frase] = useState(true);
  const [isValid_texto_descripcion, setIsValid_texto_descripcion] = useState(true);
  const [isValid_image_alt, setIsValid_image_alt] = useState(true);
  const [isValid_image_title, setIsValid_image_title] = useState(true);
  const [showImagePreview, setShowImagePreview] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    let isValid = true;
    
    switch (name) {
      case 'titulo':
        isValid = value.trim() !== '' && value.length <= 80 && value.length >= 10;
        setIsValid_titulo(isValid);
        setErrors(prev => ({
          ...prev,
          [name]: {
            ...prev[name],
            isValid: isValid
          }
        }));
        break;

      case 'texto_frase':
        isValid = value.trim() !== '' && value.length <= 50 && value.length >= 10;
        setIsValid_texto_frase(isValid);
        setErrors(prev => ({
          ...prev,
          [name]: {
            ...prev[name],
            isValid: isValid
          }
        }));
        break;

      case 'texto_descripcion':
        isValid = value.trim() !== '' && value.length <= 80 && value.length >= 10;
        setIsValid_texto_descripcion(isValid);
        setErrors(prev => ({
          ...prev,
          [name]: {
            ...prev[name],
            isValid: isValid
          }
        }));
        break;

      case 'image_alt':
        isValid = value.trim() !== '' && value.length <= 100 && value.length >= 5;
        setIsValid_image_alt(isValid);
        setErrors(prev => ({
          ...prev,
          [name]: {
            ...prev[name],
            isValid: isValid
          }
        }));
        break;

      case 'image_title':
        isValid = value.trim() !== '' && value.length <= 100 && value.length >= 5;
        setIsValid_image_title(isValid);
        setErrors(prev => ({
          ...prev,
          [name]: {
            ...prev[name],
            isValid: isValid
          }
        }));
        break;

      default:
        break;
    }

    // Actualizar el estado de validación general
    updateValidation();

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Función para actualizar la validación general
  const updateValidation = () => {
    const allFieldsValid = isValid_titulo && isValid_texto_frase && isValid_texto_descripcion;
    const hasImage = dataHeader.public_image && dataHeader.public_image !== "/blog/fondo_blog_extend.webp";
    const imageFieldsValid = hasImage ? (isValid_image_alt && isValid_image_title) : true;
    
    if (allFieldsValid && (!hasImage || imageFieldsValid)) {
      setValidacionHeader(true);
    } else {
      setValidacionHeader(false);
    }
  };

  const ValidationMessage = ({ error }) => (
    <span className={`text-xs mt-1 ml-3 ${error.isValid === null ? 'text-gray-500' :
      error.isValid ? 'text-green-500' : 'text-red-500'
      }`}>
      {error.message}
    </span>
  );

  const [errors, setErrors] = useState({
    titulo: { message: 'Entre 10-80 caracteres', isValid: null },
    texto_frase: { message: 'Entre 10-50 caracteres', isValid: null },
    texto_descripcion: { message: 'Entre 10-80 caracteres', isValid: null },
    image_alt: { message: 'Entre 5-100 caracteres', isValid: null },
    image_title: { message: 'Entre 5-100 caracteres', isValid: null },
  });

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido');
      return;
    }

    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen es muy grande. Máximo 5MB');
      return;
    }

    try {
      setUploading(true);

      const tempUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        public_image: tempUrl,
      }));

      setFile(file);  
      
      // Actualizar validación después de seleccionar imagen
      setTimeout(updateValidation, 100);

    } catch (error) {
      console.error("Error al subir imagen:", error);
      alert("Ocurrió un error al subir la imagen");
    } finally {
      setUploading(false);
    }
  }

  const handleDeleteImage = () => {
    setFormData((prev) => ({
      ...prev,
      public_image: "/blog/fondo_blog_extend.webp",
      image_alt: "",
      image_title: ""
    }));
    
    if (onDeleteImage) {
      onDeleteImage();
    }
    
    // Resetear campos de imagen
    setErrors(prev => ({
      ...prev,
      image_alt: { ...prev.image_alt, isValid: null },
      image_title: { ...prev.image_title, isValid: null }
    }));
    
    setIsValid_image_alt(true);
    setIsValid_image_title(true);
    updateValidation();
  };

  const hasCustomImage = dataHeader.public_image && dataHeader.public_image !== "/blog/fondo_blog_extend.webp";

  useEffect(() => {
    updateValidation();
  }, [isValid_titulo, isValid_texto_frase, isValid_texto_descripcion, isValid_image_alt, isValid_image_title, dataHeader.public_image]);

  useEffect(() => {
    const textFieldsValid = isValid_titulo && isValid_texto_frase && isValid_texto_descripcion;
    const imageFieldsValid = hasCustomImage ? (isValid_image_alt && isValid_image_title) : true;
    const allValid = textFieldsValid && imageFieldsValid;
    
    setIsDisabled && setIsDisabled(!allValid);
  }, [isValid_titulo, isValid_texto_frase, isValid_texto_descripcion, isValid_image_alt, isValid_image_title, hasCustomImage]);

  return (
    <div
      className="w-full h-[120vh] md:h-[93vh] relative flex items-center justify-center text-center px-6 sm:px-12 bg-cover bg-center bg-no-repeat"  
      id="file-name"                                                                                           
      style={{
        backgroundImage: `url(${dataHeader.public_image})`,
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative max-w-7xl text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center max-w-xl">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 neon-textov4">
            {dataHeader.titulo || "Título del Blog"}
          </h1>
          <h2 className="text-2xl md:text-xl font-bold mb-4">
            {dataHeader.texto_frase || "Frase destacada"}
          </h2>
          <p className="text-lg text-gray-300 font-light">
            {dataHeader.texto_descripcion || "Descripción del blog"}
          </p>
        </div>

        <div className="w-full md:w-auto flex justify-center md:justify-end">
          <div className="bg-black/5 backdrop-blur-md ml-8 rounded-2xl p-8 shadow-lg w-[450px] max-w-lg overflow-auto max-h-[80vh]">
            <form className="space-y-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Editar Encabezado
              </h3>
              
              <div>
                <label className="flex items-center text-white text-sm font-medium mb-2">
                  <Type className="w-5 h-5 mr-2 text-purple-400" /> Título
                  <ValidationMessage error={errors.titulo} />
                </label>
                <input
                  type="text"
                  name="titulo"
                  value={dataHeader.titulo || ""}
                  onChange={handleChange}
                  maxLength={80}
                  minLength={10}
                  autoComplete="off"
                  className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Título principal"
                  required
                />
              </div>

              <div>
                <label className="flex items-center text-white text-sm font-medium mb-2">
                  <Quote className="w-5 h-5 mr-2 text-purple-400" /> Frase Destacada
                  <ValidationMessage error={errors.texto_frase} />
                </label>
                <input
                  type="text"
                  name="texto_frase"
                  value={dataHeader.texto_frase || ""}
                  onChange={handleChange}
                  maxLength={50}
                  minLength={10}
                  autoComplete="off"
                  className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Frase destacada"
                  required
                />
              </div>
              
              <div>
                <label className="flex items-center text-white text-sm font-medium mb-2">
                  <AlignLeft className="w-5 h-5 mr-2 text-purple-400" /> Frase Secundaria
                  <ValidationMessage error={errors.texto_descripcion} />
                </label>
                <input
                  name="texto_descripcion"
                  value={dataHeader.texto_descripcion || ""}
                  onChange={handleChange}
                  maxLength={80}
                  minLength={10}
                  autoComplete="off"
                  className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                  placeholder="Frase Secundaria"
                  required
                />
              </div>
              
              <div>
                <label className="flex items-center text-white text-sm font-medium mb-2">
                  <IconImage className="w-5 h-5 mr-2 text-purple-400" /> Imagen Principal
                  <span className="ml-3 text-xs text-gray-400">1080x520 píxeles</span>
                </label>
                <div className="relative flex flex-row gap-2">
                  <label
                    className={`flex items-center justify-center flex-1 p-3 border-2 border-dashed rounded-lg text-white transition-all cursor-pointer ${uploading
                      ? "border-gray-700 bg-gray-900 opacity-50 cursor-not-allowed"
                      : "border-gray-700 bg-gray-900 hover:border-purple-500 hover:bg-gray-800"
                      }`}
                  >
                    {uploading ? (
                      <Loader2 className="w-5 h-5 animate-spin text-purple-400 mr-2" />
                    ) : (
                      <>
                        <IconImage className="w-5 h-5 mr-2 text-purple-400" />
                        <span className="text-sm">
                          {hasCustomImage ? "Cambiar imagen" : "Seleccionar imagen"}
                        </span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      name="image"
                      className="hidden"
                      onChange={handleImage}
                      disabled={uploading}
                    />
                  </label>
                  
                  {hasCustomImage && (
                    <>
                      <button
                        type="button"
                        onClick={() => setShowImagePreview(!showImagePreview)}
                        title="Ver imagen"
                        className="p-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors"
                      >
                        <Eye className="w-5 h-5 text-white" />
                      </button>
                      <button
                        type="button"
                        onClick={handleDeleteImage}
                        title="Eliminar imagen"
                        className="p-3 rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
                      >
                        <Trash2 className="w-5 h-5 text-white" />
                      </button>
                    </>
                  )}
                </div>

                {/* Vista previa de la imagen */}
                {showImagePreview && hasCustomImage && (
                  <div className="mt-3 p-2 bg-gray-800 rounded-lg">
                    <img 
                      src={dataHeader.public_image} 
                      alt="Vista previa" 
                      className="w-full h-24 object-cover rounded"
                    />
                  </div>
                )}

                {/* CAMPOS PARA ALT Y TÍTULO DE IMAGEN - Siempre visibles cuando hay imagen personalizada */}
                {hasCustomImage && (
                  <div className="mt-4 space-y-3 p-3 bg-purple-900/20 rounded-lg border border-purple-500/30">
                    <h4 className="text-sm font-semibold text-purple-300 mb-2">📸 Información SEO de la Imagen</h4>
                    
                    <div>
                      <label className="flex items-center text-white text-sm font-medium mb-2">
                        Texto Alternativo (Alt) *
                        <ValidationMessage error={errors.image_alt} />
                      </label>
                      <input
                        type="text"
                        name="image_alt"
                        value={dataHeader.image_alt || ""}
                        onChange={handleChange}
                        maxLength={100}
                        minLength={5}
                        autoComplete="off"
                        className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="Descripción de la imagen para accesibilidad"
                        required
                      />
                      <p className="text-xs text-gray-400 mt-1">Describe brevemente qué se ve en la imagen</p>
                    </div>
                    
                    <div>
                      <label className="flex items-center text-white text-sm font-medium mb-2">
                        Título de la Imagen *
                        <ValidationMessage error={errors.image_title} />
                      </label>
                      <input
                        type="text"
                        name="image_title"
                        value={dataHeader.image_title || ""}
                        onChange={handleChange}
                        maxLength={100}
                        minLength={5}
                        autoComplete="off"
                        className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="Título que aparece al pasar el mouse"
                        required
                      />
                      <p className="text-xs text-gray-400 mt-1">Información adicional que se muestra al hacer hover</p>
                    </div>
                  </div>
                )}

                {/* Mostrar información actual cuando están completos los campos */}
                {hasCustomImage && dataHeader.image_alt && dataHeader.image_title && (
                  <div className="mt-3 p-3 bg-green-900/20 rounded-lg border border-green-500/30">
                    <h5 className="text-xs font-semibold text-green-300 mb-2">✅ Información guardada:</h5>
                    <p className="text-xs text-green-200"><strong>Alt:</strong> {dataHeader.image_alt}</p>
                    <p className="text-xs text-green-200"><strong>Título:</strong> {dataHeader.image_title}</p>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}