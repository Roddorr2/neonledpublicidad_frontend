import { Card, CardTitle, UploadIcon } from './TabButton';
import RichTextEditor from './RichTextEditor';

export function PlantillaEditor({
  tipo,
  selectedPlantilla,
  saving,
  handleSave,
  formData,
  handleInputChange,
  insertPlaceholder,
  hasNombrePlaceholder,
  handleDrop,
  handleImageChange,
  imagePreview,
  imageFile,
  getNombreServicio,
  getTiempoEnvio,
}) {
  if (!selectedPlantilla) {
    return (
      <div className="lg:col-span-5">
        <Card>
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <svg
              className="h-16 w-16 text-slate-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="mt-4 text-lg font-semibold text-slate-700">
              Selecciona una plantilla
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Elige una plantilla de la lista para editarla
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="lg:col-span-5">
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>
              {getNombreServicio(selectedPlantilla.id_servicio)}
            </CardTitle>
            <p className="mt-1 text-sm text-slate-500">
              {getTiempoEnvio(selectedPlantilla.numero_plantilla)} · ID:{' '}
              {selectedPlantilla.id}
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className={`rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition ${
              saving
                ? 'bg-slate-400 cursor-not-allowed'
                : 'bg-azul-principal hover:bg-azul-cobalto active:opacity-80'
            }`}
          >
            {saving ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {tipo === 'whatsapp' && (
            <>
              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Mensaje
                  </label>
                  <button
                    type="button"
                    onClick={() => insertPlaceholder('mensaje')}
                    className="rounded-lg bg-slate-100 dark:bg-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 active:bg-slate-300 dark:active:bg-slate-800"
                  >
                    + Insertar {'{nombre}'}
                  </button>
                </div>
                <textarea
                  id="mensaje"
                  value={formData.mensaje || ''}
                  onChange={(e) => handleInputChange('mensaje', e.target.value)}
                  rows={12}
                  className="mt-2 w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-700 dark:text-slate-200 focus:border-azul-principal focus:outline-none focus:ring-2 focus:ring-azul-principal/20"
                  placeholder="Escribe el mensaje aquí... Usa {nombre} para personalizar. Puedes usar *negrita* y _cursiva_."
                />
                <div className="mt-2 flex items-start justify-between gap-3">
                  <p className="text-xs text-slate-500 dark:text-slate-100">
                    <strong className="text-slate-700 dark:text-slate-300">
                      Importante:
                    </strong>{' '}
                    <code className="rounded bg-azul-claro/20 border border-azul-claro px-1.5 py-0.5 font-semibold text-azul-principal">
                      {'{nombre}'}
                    </code>{' '}
                    es un placeholder del sistema que se reemplaza
                    automáticamente con el nombre del cliente desde la base de
                    datos.
                  </p>
                  {!hasNombrePlaceholder(formData.mensaje) &&
                    formData.mensaje && (
                      <p className="text-xs font-medium text-amber-600 flex items-center gap-1 whitespace-nowrap">
                        <svg
                          className="h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Sin personalización
                      </p>
                    )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Imagen
                </label>

                <div className="mt-2 grid gap-4 sm:grid-cols-2">
                  {/* ZONA DRAG & CLICK */}
                  <label
                    htmlFor="imageUpload"
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-6 hover:border-azul-principal hover:bg-azul-claro/10 cursor-pointer transition active:scale-[0.99]"
                  >
                    <UploadIcon />
                    <p className="mt-2 text-sm font-semibold text-slate-700">
                      Arrastra una imagen
                    </p>
                    <p className="text-xs text-slate-500">
                      o haz clic para buscar
                    </p>

                    {/* INPUT OCULTO */}
                    <input
                      id="imageUpload"
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(e) => handleImageChange(e.target.files[0])}
                      className="hidden"
                    />
                  </label>

                  {/* PREVIEW */}
                  {imagePreview && (
                    <div className="relative overflow-hidden rounded-lg border border-slate-200">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />

                      {imageFile && (
                        <div className="absolute bottom-2 left-2 rounded bg-azul-principal px-2 py-1 text-xs font-semibold text-white">
                          Nueva imagen
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {tipo === 'email' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Asunto del correo
                </label>
                <input
                  type="text"
                  value={formData.asunto || ''}
                  onChange={(e) => handleInputChange('asunto', e.target.value)}
                  className="mt-2 w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                  placeholder="Asunto del email"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Encabezado
                </label>
                <input
                  type="text"
                  value={formData.encabezado || ''}
                  onChange={(e) =>
                    handleInputChange('encabezado', e.target.value)
                  }
                  className="mt-2 w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                  placeholder="Título principal del correo"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Mensaje
                  </label>
                  <button
                    type="button"
                    onClick={() => insertPlaceholder('mensaje')}
                    className="rounded-lg bg-slate-100 dark:bg-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 active:bg-slate-300 dark:active:bg-slate-800"
                  >
                    + Insertar {'{nombre}'}
                  </button>
                </div>
                <RichTextEditor
                  value={formData.mensaje || ''}
                  onChange={(value) => handleInputChange('mensaje', value)}
                />
                <div className="mt-2 flex items-start justify-between gap-3">
                  <p className="text-xs text-slate-500 dark:text-slate-100">
                    <strong className="text-slate-700 dark:text-slate-300">
                      Importante:
                    </strong>{' '}
                    <code className="rounded bg-cyan-50 border border-cyan-200 px-1.5 py-0.5 font-semibold text-cyan-700">
                      {'{nombre}'}
                    </code>{' '}
                    es un placeholder del sistema que se reemplaza
                    automáticamente con el nombre del cliente desde la base de
                    datos.
                  </p>
                  {!hasNombrePlaceholder(formData.mensaje) &&
                    formData.mensaje && (
                      <p className="text-xs font-medium text-amber-600 flex items-center gap-1 whitespace-nowrap">
                        <svg
                          className="h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Sin personalización
                      </p>
                    )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Imagen
                </label>
                <div className="mt-2 grid gap-4 sm:grid-cols-2">
                  <label
                    htmlFor="imageUpload"
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-6 hover:border-cyan-400 hover:bg-cyan-50/30 cursor-pointer transition active:scale-[0.99]"
                  >
                    <UploadIcon />
                    <p className="mt-2 text-sm font-semibold text-slate-700">
                      Arrastra una imagen
                    </p>
                    <p className="text-xs text-slate-500">
                      o haz clic para buscar
                    </p>

                    {/* INPUT OCULTO */}
                    <input
                      id="imageUpload"
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(e) => handleImageChange(e.target.files[0])}
                      className="hidden"
                    />
                  </label>

                  {imagePreview && (
                    <div className="relative overflow-hidden rounded-lg border border-slate-200">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                      {imageFile && (
                        <div className="absolute bottom-2 left-2 rounded bg-cyan-500 px-2 py-1 text-xs font-semibold text-white">
                          Nueva imagen
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Texto del botón
                  </label>
                  <input
                    type="text"
                    value={formData.mensaje_boton || ''}
                    onChange={(e) =>
                      handleInputChange('mensaje_boton', e.target.value)
                    }
                    className="mt-2 w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                    placeholder="Ej: Ver más información"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    URL del botón
                  </label>
                  <input
                    type="url"
                    value={formData.url_boton || ''}
                    onChange={(e) =>
                      handleInputChange('url_boton', e.target.value)
                    }
                    className="mt-2 w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Footer
                </label>
                <RichTextEditor
                  value={formData.footer}
                  onChange={(value) => handleInputChange('footer', value)}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Redes Sociales
                </label>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">
                      Facebook
                    </label>
                    <input
                      type="url"
                      value={formData.red_facebook || ''}
                      onChange={(e) =>
                        handleInputChange('red_facebook', e.target.value)
                      }
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                      placeholder="https://facebook.com/..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">
                      Instagram
                    </label>
                    <input
                      type="url"
                      value={formData.red_instagram || ''}
                      onChange={(e) =>
                        handleInputChange('red_instagram', e.target.value)
                      }
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                      placeholder="https://instagram.com/..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">
                      LinkedIn
                    </label>
                    <input
                      type="url"
                      value={formData.red_linkedin || ''}
                      onChange={(e) =>
                        handleInputChange('red_linkedin', e.target.value)
                      }
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                      placeholder="https://linkedin.com/..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">
                      TikTok
                    </label>
                    <input
                      type="url"
                      value={formData.red_tiktok || ''}
                      onChange={(e) =>
                        handleInputChange('red_tiktok', e.target.value)
                      }
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                      placeholder="https://tiktok.com/@..."
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
