"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import {
  Save,
  RefreshCw,
  Eye,
  AlertCircle,
  CheckCircle,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import useBlogData from "../../hooks/useBlogData";
import FormHeader from "./FormHeader";
import FormBody from "./FormBody";
import FormFooter from "./FormFooter";

// Configuración de plantillas
import {
  PLANTILLA_IDS,
  DEFAULT_HEADER_VALIDATION_CONFIG,
  DEFAULT_FOOTER_VALIDATION_CONFIG,
  DEFAULT_BODY_VALIDATION_CONFIG,
} from "../../config/index";

// Componentes de preview
import TemplateSelector from "../preview/TemplateSelector";
import TemplateRenderer from "../preview/TemplateRenderer";

/** REFERENCIA GLOBAL PARA ACCIONAR BOTÓN DESDE FUERA */
export const externalSaveRef = { current: null };

/**
 * FormMain - Componente orquestador del workflow completo de blogs
 */
export default function FormMain({
  plantillaId = PLANTILLA_IDS.CLASICA,
  blogId = null,
  mode = "create",

  // Props de callbacks
  onSuccess,
  onCancel,
  onPreview,
  onPlantillaChange,

  // Props de UI
  showPreview = true,
  showCancel = true,
  showTemplateSelector: showTemplateSelectorProp = false, // Mostrar selector de plantillas
  className = "",

  // Props adicionales
  autoSave = false,
  autoSaveInterval = 30000, // 30 segundos
}) {
  const {
    // Configuración
    plantillaConfig,
    isCreateMode,
    isEditMode,

    // Estados principales
    loading,
    error,
    isDirty,
    isFormValid,

    // Estados de formularios (compatibilidad completa)
    formEncabezadoHeader,
    setFormEncabezadoHeader,
    formImagenHeader,
    setFormImagenHeader,

    formEncabezadoBody,
    setFormEncabezadoBody,
    formCommendBody,
    setFormCommendBody,
    formGaleryBody,
    setFormGaleryBody,
    formInfoBody,
    setFormInfoBody,

    formEncabezadoFooter,
    setFormEncabezadoFooter,
    formImagenFooter,
    setFormImagenFooter,

    setFileHeader,
    setFileBodyHeader,
    setFileBodyFile1,
    setFileBodyFile2,
    setFileFooterFile1,
    setFileFooterFile2,
    setFileFooterFile3,

    setValidacionHeader,
    setValidacionBody,
    setValidacionFooter,

    // Servicios (solo para enlaces en tarjetas)
    servicios,

    // Acciones
    saveBlog,
    resetForm,

    // Utilidades
    setError,
    clearError,
    setLoading,
  } = useBlogData(plantillaId, blogId, mode);

  // Estados locales del componente
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [autoSaveTimer, setAutoSaveTimer] = useState(null);
  // Estado del switch de publicación
  const [isPublicado, setIsPublicado] = useState(
    formEncabezadoFooter?.estado_publicacion === 1
  );

  // Sincroniza el switch con los datos del blog cuando formEncabezadoFooter cambia
useEffect(() => {
  if (formEncabezadoFooter) {
    setIsPublicado(formEncabezadoFooter.estado_publicacion === 1);
  }
}, [formEncabezadoFooter]);






  // Estados para el sistema de preview
  const [viewMode, setViewMode] = useState("edit"); // 'edit' | 'preview' | 'template-select'
  const [selectedPlantilla, setSelectedPlantilla] = useState(plantillaId);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);

  useEffect(()=>{
    setSelectedPlantilla(plantillaId);
  }, [plantillaId]);
  
  // Referencias
  const headerRef = useRef(null);
  const bodyRef = useRef(null);
  const footerRef = useRef(null);

  /** REFERENCIA LOCAL DEL BOTÓN GUARDAR */
  const saveButtonRef = useRef(null);

  // Generar datos para preview
  const getBlogDataForPreview = useCallback(() => {
    return {
      header: {
        ...formEncabezadoHeader,
        ...formImagenHeader,
      },
      body: {
        header: {
          ...formEncabezadoBody,
          flag_consejos: formEncabezadoBody?.flag_consejos ?? true,
          flag_galeria: formEncabezadoBody?.flag_galeria ?? true,
          flag_informacion: formEncabezadoBody?.flag_informacion ?? true,
        },
        consejos: formCommendBody || {},
        galeria: formGaleryBody || {},
        informacion: formInfoBody || [],
      },
      footer: {
        ...formEncabezadoFooter,
        ...formImagenFooter,
        estado_publicacion: formEncabezadoFooter?.estado_publicacion ?? (isPublicado ? 1 : 0),
      },
    };
  }, [
    formEncabezadoHeader,
    formImagenHeader,
    formEncabezadoBody,
    formCommendBody,
    formGaleryBody,
    formInfoBody,
    formEncabezadoFooter,
    formImagenFooter,
  ]);

  // Auto-guardado
  useEffect(() => {
    if (!autoSave || !isDirty || !isFormValid) return;

    const timer = setTimeout(async () => {
      try {
        await saveBlog();
      } catch (err) {}
    }, autoSaveInterval);

    setAutoSaveTimer(timer);
    return () => timer && clearTimeout(timer);
  }, [autoSave, isDirty, isFormValid, autoSaveInterval, saveBlog]);

  useEffect(() => {
    return () => {
      if (autoSaveTimer) clearTimeout(autoSaveTimer);
    };
  }, [autoSaveTimer]);

  // Scroll
  useEffect(() => {
    const handleNavClick = (event) => {
      const target = event.target.closest("[data-scroll-to]");
      if (!target) return;

      const section = target.getAttribute("data-scroll-to");
      event.preventDefault();

      const sectionRef =
        section === "header"
          ? headerRef
          : section === "body"
            ? bodyRef
            : section === "footer"
              ? footerRef
              : null;

      if (sectionRef?.current) {
        sectionRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };

    document.addEventListener("click", handleNavClick);
    return () => document.removeEventListener("click", handleNavClick);
  }, []);

  // Header handlers
  const handleHeaderChange = useCallback(
    ({ name, value }) => {
      if (["public_image", "url_image", "alt", "title"].includes(name)) {
        setFormImagenHeader((prev) => ({ ...prev, [name]: value }));
      } else {
        setFormEncabezadoHeader((prev) => ({ ...prev, [name]: value }));
      }
    },
    [setFormEncabezadoHeader, setFormImagenHeader]
  );

  const handleHeaderImageChange = useCallback(
    async (imageData) => {
      try {
        setLoading(true);

        setFormImagenHeader((prev) => ({
          ...prev,
          public_image: imageData.tempUrl,
          alt: imageData.alt || "",
          title: imageData.title || "",
        }));

        setFileHeader(imageData.file);
      } catch (err) {
        setError("Error al procesar imagen del header");
      } finally {
        setLoading(false);
      }
    },
    [setFormImagenHeader, setFileHeader, setLoading, setError]
  );

  const handleHeaderImageDelete = useCallback(async () => {
    try {
      setFormImagenHeader((prev) => ({
        ...prev,
        public_image: "/blog/fondo_blog_extend.png",
        alt: "",
        title: "",
      }));

      setFileHeader(null);
    } catch (err) {
      setError("Error al limpiar imagen del header");
    }
  }, [setFormImagenHeader, setFileHeader, setError]);

  const handleFooterChange = useCallback(
    ({ name, value }) => {
      if (["public_image1", "public_image2", "public_image3"].includes(name)) {
        setFormImagenFooter((prev) => ({ ...prev, [name]: value }));
      } else {
        setFormEncabezadoFooter((prev) => ({ ...prev, [name]: value }));
      }
    },
    [setFormEncabezadoFooter, setFormImagenFooter]
  );

  const handleFooterValidation = useCallback(
    (isValid) => {
      setValidacionFooter(isValid);
    },
    [setValidacionFooter]
  );

  // Guardar
  const handleSave = useCallback(async () => {
  if (!isFormValid) {
    setError("Por favor completa todos los campos obligatorios");
    return;
  }

  try {
    setIsSaving(true);
    clearError();

    const result = await saveBlog({
      ...formEncabezadoFooter,
      estado_publicacion: isPublicado ? 1 : 0,
    });

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);

    onSuccess?.(result);
  } catch (err) {
    setError("No se pudo guardar el blog. Intenta nuevamente.");
  } finally {
    setIsSaving(false);
  }
}, [isFormValid, saveBlog, onSuccess, isPublicado, formEncabezadoFooter, setError, clearError]);



  const handleCancel = useCallback(() => {
    if (isDirty) {
      const confirm = window.confirm(
        "¿Estás seguro? Los cambios no guardados se perderán."
      );
      if (!confirm) return;
    }
    resetForm();
    onCancel?.();
  }, [isDirty, resetForm, onCancel]);

  const handlePreview = useCallback(() => {
    setViewMode((prev) => (prev === "preview" ? "edit" : "preview"));
  }, []);

  const handlePlantillaChange = useCallback(
    (newPlantillaId) => {
      if (newPlantillaId !== selectedPlantilla) {
        setSelectedPlantilla(newPlantillaId);
        if (isCreateMode && onPlantillaChange) {
          onPlantillaChange(newPlantillaId);
        }
      }
      setShowTemplateSelector(false);
      setViewMode("edit");
    },
    [selectedPlantilla, isCreateMode, onPlantillaChange]
  );

  const handleShowTemplateSelector = useCallback(() => {
    setShowTemplateSelector(true);
    setViewMode("template-select");
  }, []);

  const handleCancelTemplateSelection = useCallback(() => {
    setShowTemplateSelector(false);
    setViewMode("edit");
  }, []);

  // Loading estado
  if (loading && isEditMode) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-3 text-gray-600">Cargando blog...</span>
      </div>
    );
  }

  return (
    <div className={`max-w-7xl mx-auto mt-8 ${className}`}>
      {/* Panel superior */}
      <div className="mb-8 bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">
              {isCreateMode ? "Crear Nuevo Blog" : "Editar Blog"}
            </h1>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Plantilla:</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">
                {plantillaConfig.name}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Switch de Publicación */}
            <div className="flex items-center gap-3 px-4 py-2 bg-white border rounded-xl shadow-sm">
              <span
                className={`text-sm font-medium transition-colors ${isPublicado ? "text-green-600" : "text-orange-500"
                  }`}
              >
                {isPublicado ? "Publicar" : "Borrador"}
              </span>

              <label className="cursor-pointer select-none">
                <div className="relative w-14 h-7">
                  {/* INPUT (el peer) */}
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={isPublicado}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setIsPublicado(checked);
                      setFormEncabezadoFooter(prev => ({
                        ...prev,
                        estado_publicacion: checked ? 1 : 0
                      }));
                    }}
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-gray-300 rounded-full shadow-inner transition-colors duration-300 peer-checked:bg-green-500">
                  </div>
                  <div
                    className="
          absolute top-0.5 left-0.5 
          w-6 h-6 bg-white rounded-full shadow 
          transition-all duration-300 ease-out
          peer-checked:translate-x-7
        "
                  ></div>
                </div>
              </label>
            </div>
            {/* Estado de validación */}
            <div className="flex items-center space-x-2">
              {isFormValid ? (
                <>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-green-600">
                    Formulario válido
                  </span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                  <span className="text-sm text-orange-500">
                    Completa los campos
                  </span>
                </>
              )}
            </div>

            {isDirty && (
              <div className="flex items-center space-x-1 text-sm text-blue-600">
                <RefreshCw className="w-4 h-4" />
                <span>Cambios sin guardar</span>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              <span>{error}</span>
              <button
                onClick={clearError}
                className="ml-auto text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {saveSuccess && (
          <div className="mt-4 p-3 bg-green-50 border-l-4 border-green-500 text-green-700">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>Blog guardado exitosamente</span>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="mb-8 bg-white rounded-lg shadow-sm border">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setViewMode("edit")}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${viewMode === "edit"
              ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <span>✏️ Editar Blog</span>
            </div>
          </button>

          <button
            onClick={handlePreview}
            disabled={!isFormValid}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${viewMode === "preview"
              ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
              : !isFormValid
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>Vista Previa</span>
            </div>
          </button>

          {isCreateMode && showTemplateSelectorProp && (
            <button
              onClick={handleShowTemplateSelector}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${viewMode === "template-select"
                ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <span>🎨 Cambiar Plantilla</span>
              </div>
            </button>
          )}
        </div>
      </div>

      {viewMode === "edit" && (
        <div className="space-y-8">
          <div id="header" ref={headerRef}>
            <FormHeader
              data={{ ...formEncabezadoHeader, ...formImagenHeader }}
              mode={mode}
              onChange={handleHeaderChange}
              onImageChange={handleHeaderImageChange}
              onImageDelete={handleHeaderImageDelete}
              onValidationChange={setValidacionHeader}
              validationConfig={DEFAULT_HEADER_VALIDATION_CONFIG}
              isUploading={loading}
              showValidationMessages={true}
            />
          </div>

          <div id="body" ref={bodyRef}>
            <FormBody
              formCommendBody={formCommendBody}
              formInfoBody={formInfoBody}
              formEncabezadoBody={formEncabezadoBody}
              formGaleryBody={formGaleryBody}
              setFormCommendBody={setFormCommendBody}
              setFormInfoBody={setFormInfoBody}
              setFormEncabezadoBody={setFormEncabezadoBody}
              setFormGaleryBody={setFormGaleryBody}
              setValidacionBody={setValidacionBody}
              setFileBodyHeader={setFileBodyHeader}
              setFileBodyFile1={setFileBodyFile1}
              setFileBodyFile2={setFileBodyFile2}
              servicios={servicios}
              plantillaId={plantillaId}
              mode={mode}
              isUploading={loading}
              showValidationMessages={true}
            />
          </div>

          <div id="footer" ref={footerRef}>
            <FormFooter
              data={{ ...formEncabezadoFooter, ...formImagenFooter }}
              mode={mode}
              onChange={handleFooterChange}
              onValidationChange={handleFooterValidation}
              validationConfig={DEFAULT_FOOTER_VALIDATION_CONFIG}
              isUploading={loading}
              showValidationMessages={true}
              setFileFooterFile1={setFileFooterFile1}
              setFileFooterFile2={setFileFooterFile2}
              setFileFooterFile3={setFileFooterFile3}
            />
          </div>
        </div>
      )}

      {viewMode === "preview" && (
        <div className="bg-gray-50 rounded-lg p-6 min-h-screen">
          <TemplateRenderer
            plantillaId={selectedPlantilla}
            blogData={getBlogDataForPreview()}
            mode="preview"
            showPlaceholders={true}
            className="shadow-lg bg-white rounded-lg"
          />
        </div>
      )}

      {viewMode === "template-select" && isCreateMode && (
        <div className="bg-gray-50 rounded-lg p-6">
          <TemplateSelector
            currentPlantilla={selectedPlantilla}
            onTemplateSelect={handlePlantillaChange}
            onCancel={handleCancelTemplateSelection}
            showComparison={true}
            mode="selection"
          />
        </div>
      )}

      {/* PANEL FINAL DE ACCIONES */}
      <div className="mt-12 bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {showCancel && (
              <button
                onClick={handleCancel}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={loading || isSaving}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Cancelar</span>
              </button>
            )}

            {showPreview && (
              <button
                onClick={handlePreview}
                className={`flex items-center space-x-2 px-4 py-2 border rounded-lg transition-colors ${viewMode === "preview"
                  ? "text-blue-700 border-blue-300 bg-blue-50"
                  : "text-blue-700 border-blue-300 hover:bg-blue-50"
                  }`}
                disabled={loading || isSaving || !isFormValid}
              >
                <Eye className="w-4 h-4" />
                <span>
                  {viewMode === "preview" ? "Ocultar Preview" : "Vista Previa"}
                </span>
              </button>
            )}

            {isCreateMode && showTemplateSelectorProp && (
              <button
                onClick={handleShowTemplateSelector}
                className="flex items-center space-x-2 px-4 py-2 text-purple-700 border border-purple-300 rounded-lg hover:bg-purple-50 transition-colors"
                disabled={loading || isSaving}
              >
                <span>🎨</span>
                <span>Cambiar Plantilla</span>
              </button>
            )}
          </div>

          <div className="flex items-center space-x-3">
            {autoSave && isDirty && (
              <span className="text-sm text-gray-500">
                Auto-guardado en {Math.round(autoSaveInterval / 1000)}s
              </span>
            )}

            {/* BOTÓN GUARDAR — REFERENCIA AÑADIDA */}
            <button
              ref={(el) => {
                saveButtonRef.current = el;
                externalSaveRef.current = el; // <<--- REFERENCIA GLOBAL
              }}
              onClick={handleSave}
              disabled={loading || isSaving || !isFormValid}
              className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-medium transition-all ${isFormValid && !loading && !isSaving
                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Guardando...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{isCreateMode ? "Crear Blog" : "Actualizar Blog"}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}