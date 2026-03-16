export function PlantillaPreview({
  tipo,
  selectedPlantilla,
  formData,
  imagePreview,
}) {
  return (
    <div className="lg:col-span-4 sticky top-6">
      {selectedPlantilla ? (
        <div className="rounded-xl border border-slate-200 bg-slate-100 p-4 shadow-sm">
          <p className="mb-2 text-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Vista Previa Final
          </p>

          {tipo === 'whatsapp' ? (
            <div className="mx-auto max-w-[350px] overflow-hidden rounded-xl bg-[#efeae2] shadow-lg relative border border-slate-200 flex flex-col h-[850px]">
              {/* Header WhatsApp */}
              <div className="bg-[#075e54] px-4 py-3 flex items-center gap-3 shrink-0 z-10">
                <div className="h-8 w-8 rounded-full bg-slate-300 flex items-center justify-center shrink-0">
                  <svg
                    className="h-5 w-5 text-slate-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <div className="text-white font-semibold text-sm">Cliente</div>
              </div>

              {/* Content WhatsApp */}
              <div
                className="p-4 overflow-y-auto flex-1 flex flex-col bg-[#efeae2] relative"
                style={{
                  backgroundImage:
                    "url('https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')",
                  backgroundSize: 'cover',
                }}
              >
                <div className="bg-[#dcf8c6] rounded-lg p-2 max-w-[95%] shadow-sm relative ml-auto mr-0 mb-4 whitespace-pre-wrap text-[13px] text-slate-800 break-words">
                  <div className="absolute top-0 -right-2 w-0 h-0 border-solid border-t-[#dcf8c6] border-t-[10px] border-r-transparent border-r-[10px] border-b-transparent border-b-[10px] border-l-[#dcf8c6] border-l-[10px]"></div>

                  {imagePreview && (
                    <div className="mb-2">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full rounded-md object-cover"
                      />
                    </div>
                  )}

                  <div
                    className="px-1 relative"
                    dangerouslySetInnerHTML={{
                      __html: (formData.mensaje || 'Escribe un mensaje...')
                        .replace(/\*(.*?)\*/g, '<strong>$1</strong>')
                        .replace(/_(.*?)_/g, '<em>$1</em>')
                        .replace(/~(.*?)~/g, '<del>$1</del>')
                        .replace(
                          /{nombre}/g,
                          '<b class="text-[#075e54]">[Nombre]</b>',
                        ),
                    }}
                  />

                  {/* Date time placeholder */}
                  <div className="text-[10px] text-slate-500 text-right mt-1 pr-1 flex justify-end items-center gap-1">
                    12:00
                    <svg viewBox="0 0 16 15" width="16" height="15">
                      <path
                        fill="#53bdeb"
                        d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-[350px] overflow-hidden bg-white shadow-lg">
              {/* Encabezado Púrpura (Igual a tu imagen) */}
              <div className="bg-[#9333ea] p-4 text-center">
                <h2 className="text-sm font-bold text-white leading-tight">
                  {formData.encabezado || '¿Listo para incrementar el valor?'}
                </h2>
              </div>

              {/* Imagen */}
              <div className="bg-white">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Header"
                    className="w-full object-cover"
                  />
                ) : (
                  <div className="flex h-32 items-center justify-center bg-slate-100 text-[10px] text-slate-400 italic">
                    Sin imagen seleccionada
                  </div>
                )}
              </div>

              {/* Mensaje */}
              <div className="p-6">
                <div
                  className="prose prose-sm prose-slate max-w-none text-[13px] leading-relaxed text-slate-700 whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{
                    __html: (formData.mensaje || 'Escribe un mensaje...')
                      .replace(/\*(.*?)\*/g, '<strong>$1</strong>')
                      .replace(/_(.*?)_/g, '<em>$1</em>')
                      .replace(/~(.*?)~/g, '<del>$1</del>')
                      .replace(
                        /{nombre}/g,
                        '<b class="text-[#9333ea]">[Nombre]</b>',
                      ),
                  }}
                />

                {/* Botón dinámico */}
                {formData.mensaje_boton && (
                  <div className="mt-6 text-center">
                    <div className="inline-block rounded-md bg-[#9333ea] px-6 py-2.5 text-[11px] font-bold text-white uppercase tracking-wider">
                      {formData.mensaje_boton}
                    </div>
                  </div>
                )}

                {/* Footer con Rich Text */}
                <div
                  className="mt-6 border-t pt-4 text-[11px] text-slate-500"
                  dangerouslySetInnerHTML={{
                    __html: (formData.footer || '').replace(
                      /{nombre}/g,
                      '<b>[Nombre]</b>',
                    ),
                  }}
                />
              </div>

              {/* Redes Sociales (Simuladas) */}
              <div className="bg-slate-50 p-4 text-center">
                <div className="mb-2 flex justify-center gap-3 grayscale opacity-70">
                  {formData.red_facebook && (
                    <div className="h-4 w-4 bg-blue-600 rounded-full" />
                  )}
                  {formData.red_instagram && (
                    <div className="h-4 w-4 bg-pink-500 rounded-full" />
                  )}
                  {formData.red_linkedin && (
                    <div className="h-4 w-4 bg-blue-800 rounded-full" />
                  )}
                  {formData.red_tiktok && (
                    <div className="h-4 w-4 bg-black rounded-full" />
                  )}
                </div>
                <p className="text-[8px] text-slate-400">
                  © 2026 DigiMedia Marketing
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-xl border-2 border-dashed border-slate-200 p-12 text-center text-slate-400 text-sm italic">
          Selecciona una plantilla para ver la previsualización
        </div>
      )}
    </div>
  );
}
