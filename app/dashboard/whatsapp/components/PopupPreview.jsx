'use client';

/**
 * PopupPreview — Preview en vivo del editor de pop-ups NLP
 * Debe ser lo más fiel posible al ServicePopup.jsx del cliente.
 */

const getBg = (f) =>
  f.service_color_2 && f.service_color_2 !== f.service_color
    ? `linear-gradient(${f.gradient_direction}, ${f.service_color}, ${f.service_color_2})`
    : f.service_color;

export function PopupPreview({ formData, imagePreviews, view, productoName }) {
  const bg          = getBg(formData);
  const hasRightBg  = !!imagePreviews.right;
  const hasMobileBg = !!imagePreviews.mobile;

  // ── MOBILE ────────────────────────────────────────────────────────────────
  if (view === 'mobile') {
    return (
      <div className="flex justify-center">
        <div
          className="relative w-[210px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-600 shadow-lg flex flex-col"
          style={{ background: hasMobileBg ? 'transparent' : bg, minHeight: 310 }}
        >
          {hasMobileBg && (
            <div className="absolute inset-0 z-0">
              <img
                src={imagePreviews.mobile}
                alt={formData.mobile_alt || productoName || 'popup mobile'}
                className="w-full h-full object-cover"
                style={{ opacity: formData.mobile_opacity / 100 }}
              />
            </div>
          )}

          {/* ── Botón cerrar — igual posición que en ServicePopup ── */}
          <button className="absolute top-2 right-2 z-50 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xs">
            ✕
          </button>

          <div className="relative z-10 flex flex-col justify-center gap-3 px-4 py-5 flex-1">
            <p
              className="text-sm font-extrabold text-center leading-tight pt-2"
              style={{ color: formData.title_color }}
            >
              {formData.title_text || 'TÍTULO DEL POP-UP'}
            </p>

            <div className="flex flex-col gap-2">
              {[
                { label: 'Nombre',   placeholder: 'Tu nombre completo' },
                { label: 'Teléfono', placeholder: '9 dígitos' },
                { label: 'Correo',   placeholder: 'tu@correo.com' },
              ].map(({ label, placeholder }) => (
                <div key={label} className="flex flex-col gap-0.5">
                  {/* ── Label — igual que en ServicePopup ── */}
                  <span className="text-[10px] font-semibold" style={{ color: formData.title_color }}>
                    {label}
                  </span>
                  <input
                    readOnly
                    placeholder={placeholder}
                    className="w-full rounded-full bg-white px-3 py-1.5 text-[10px] text-slate-700 outline-none"
                  />
                </div>
              ))}
            </div>

            <button
              className="w-full rounded-full py-1.5 text-xs font-extrabold text-white"
              style={{ backgroundColor: formData.button_color }}
            >
              {formData.button_text || 'HAZLO YA'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── DESKTOP ───────────────────────────────────────────────────────────────
  return (
    <div className="w-full">
      <div
        className="relative w-full rounded-2xl overflow-hidden shadow-xl border border-white/10 flex items-stretch"
        style={{ background: hasRightBg ? 'transparent' : bg, minHeight: 240 }}
      >
        {/* Imagen derecha = fondo completo */}
        {hasRightBg && (
          <div className="absolute inset-0 z-0">
            <img
              src={imagePreviews.right}
              alt={formData.right_alt || productoName || 'fondo popup'}
              className="w-full h-full object-cover"
              style={{ opacity: formData.right_opacity / 100 }}
            />
          </div>
        )}

        {/* Imagen izquierda = columna lateral con nombre del producto */}
        {imagePreviews.left && (
          <div className="relative z-10 w-[38%] flex-shrink-0 overflow-hidden" style={{ minHeight: 240 }}>
            <img
              src={imagePreviews.left}
              alt={formData.left_alt || productoName || 'columna lateral popup'}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ opacity: formData.left_opacity / 100 }}
            />
            {/* Degradado oscuro igual que en ServicePopup */}
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)' }}
            />
            {/* ── Nombre del producto abajo izquierda — igual que en ServicePopup ── */}
            {productoName && (
              <div className="absolute bottom-0 left-0 right-0 px-3 pb-3 z-10">
                <p
                  className="text-white font-extrabold uppercase leading-tight"
                  style={{
                    fontSize: '0.7rem',
                    letterSpacing: '0.04em',
                    textShadow: '0 2px 8px rgba(0,0,0,0.9)',
                    lineHeight: 1.2,
                  }}
                >
                  {productoName}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Panel central: formulario */}
        <div className="relative z-10 flex-1 flex flex-col justify-center gap-3 px-5 py-6">

          {/* ── Botón cerrar — separado del título con margen suficiente ── */}
          <button className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold">
            ✕
          </button>

          {/* Espacio para que el título no quede debajo del botón ✕ */}
          <div className="pr-6">
            <p
              className="text-sm font-extrabold text-center leading-tight"
              style={{ color: formData.title_color }}
            >
              {formData.title_text || 'TÍTULO DEL POP-UP'}
            </p>
          </div>

          {/* ── Campos con label — igual que en ServicePopup ── */}
          <div className="flex flex-col gap-2 w-full">
            {[
              { label: 'Nombre',   placeholder: 'Tu nombre completo' },
              { label: 'Teléfono', placeholder: '9 dígitos' },
              { label: 'Correo',   placeholder: 'tu@correo.com' },
            ].map(({ label, placeholder }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span className="text-[10px] font-semibold" style={{ color: formData.title_color }}>
                  {label}
                </span>
                <input
                  readOnly
                  placeholder={placeholder}
                  className="w-full rounded-full bg-white px-3 py-1.5 text-[10px] text-slate-700 outline-none border border-white/50"
                />
              </div>
            ))}
          </div>

          <button
            className="w-full rounded-full py-2 text-xs font-extrabold text-white"
            style={{ backgroundColor: formData.button_color }}
          >
            {formData.button_text || 'HAZLO YA'}
          </button>
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-slate-400 dark:text-slate-500">
        ⏱️ Aparece a los <strong>{formData.trigger_time}s</strong> de que el usuario entra a la página
      </p>
    </div>
  );
}