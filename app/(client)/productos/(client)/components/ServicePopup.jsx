'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { getCookie } from 'cookies-next';
import { Loader2 } from 'lucide-react';
import url from '@/api/url';

const URL_API = `${url}/api/modales`;

// ─── MOCK temporal ────────────────────────────────────────────────────────────
const MOCK_CONFIG = {
  title_text:         'OBTÉN UNA COTIZACIÓN ¡GRATIS!',
  title_color:        '#FFFFFF',
  button_text:        'HAZLO YA',
  button_color:       '#F97316',
  service_color:      '#1E3A5F',
  service_color_2:    '#0F2340',
  gradient_direction: 'to bottom',
  trigger_time:       8,
  left_image_url:     null,
  left_opacity:       85,
  left_alt:           '',
  right_image_url:    null,
  right_opacity:      100,
  right_alt:          '',
  mobile_image_url:   null,
  mobile_opacity:     100,
  mobile_alt:         '',
};

const getBg = (c) =>
  c.service_color_2 && c.service_color_2 !== c.service_color
    ? `linear-gradient(${c.gradient_direction || 'to bottom'}, ${c.service_color}, ${c.service_color_2})`
    : c.service_color;

/**
 * ServicePopup — Pop-up público de captación para páginas de producto NLP
 *
 * Props:
 *   idProducto   number  ID numérico del producto (ej: 8) — se usa para
 *                        llamar al endpoint /api/modales como id_producto
 *   productoName string  Nombre del producto para mostrar en la columna lateral
 */
export default function ServicePopup({ idProducto, productoName }) {
  const [open,     setOpen]     = useState(false);
  const [config,   setConfig]   = useState(null);
  const [loading,  setLoading]  = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // ── FIX: formData usa id_producto (integer) en lugar de id_servicio (string) ──
  const [formData, setFormData] = useState({
    nombre:      '',
    telefono:    '',
    correo:      '',
    id_producto: idProducto,   // ← número entero, coincide con lo que valida el backend
  });

  // ── Detectar mobile ────────────────────────────────────────────────────────
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // ── Cargar config ──────────────────────────────────────────────────────────
  useEffect(() => {
    // TODO BACKEND: cuando el endpoint público esté listo, reemplazar por (ya se descomento las lineas 71 a 76):
     fetch(`${url}/api/public/popup-configs/producto/${idProducto}`)
       .then(r => r.json())
       .then(d => { if (d.success) setConfig(d.data); else setConfig(MOCK_CONFIG); })
       .catch(() => setConfig(MOCK_CONFIG));
    //setConfig(MOCK_CONFIG);  ← ← ← ESTA LÍNEA PISA AL FETCH (es síncrona)
  }, [idProducto]);

  // ── Timer de aparición ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!config) return;
    const timer = setTimeout(() => setOpen(true), config.trigger_time * 1000);
    return () => clearTimeout(timer);
  }, [config]);

  // ── Handlers formulario ────────────────────────────────────────────────────
  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === 'telefono') {
      value = value.replace(/\D/g, '');
      if (value.length > 9) value = value.slice(0, 9);
    }
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.telefono.length !== 9) {
      setOpen(false);
      Swal.fire({ title: 'Error', text: 'El número de teléfono debe tener 9 dígitos.', icon: 'error', confirmButtonText: 'OK' });
      return;
    }
    setLoading(true);
    try {
      // ── FIX: enviamos id_producto como número, sin Authorization (ruta pública) ──
      const response = await axios.post(URL_API, {
        nombre:      formData.nombre,
        telefono:    formData.telefono,
        correo:      formData.correo,
        id_producto: Number(idProducto),  // ← integer requerido por el backend
      }, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      setOpen(false);
      if (response.status === 201) {
        Swal.fire({ title: '¡Enviado!', text: 'Nos pondremos en contacto contigo pronto.', icon: 'success', confirmButtonText: 'OK' });
      } else {
        Swal.fire({ title: 'Error', text: 'No se pudo enviar el contacto.', icon: 'error', confirmButtonText: 'OK' });
      }
    } catch (err) {
      setOpen(false);
      Swal.fire({ title: 'Error', text: 'Ocurrió un error inesperado.', icon: 'error', confirmButtonText: 'OK' });
      console.error(err);
    } finally {
      setLoading(false);
      setFormData({ nombre: '', telefono: '', correo: '', id_producto: idProducto });
    }
  };

  if (!config || !open) return null;

  const bg          = getBg(config);
  const leftImg     = config.left_image_url;
  const rightImg    = config.right_image_url;
  const mobileImg   = config.mobile_image_url;
  const hasRightBg  = !!rightImg && !isMobile;
  const hasMobileBg = !!mobileImg && isMobile;

  const leftAlt   = config.left_alt   || productoName || '';
  const rightAlt  = config.right_alt  || productoName || '';
  const mobileAlt = config.mobile_alt || productoName || '';

  return (
    <div
      onClick={() => setOpen(false)}
      className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex w-[92%] md:w-[680px] rounded-2xl overflow-hidden shadow-2xl text-white"
        style={{ background: (hasRightBg || hasMobileBg) ? 'transparent' : bg, minHeight: 300 }}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 z-50 w-8 h-8 rounded-full bg-white/20 hover:bg-white/35 flex items-center justify-center text-white font-bold text-sm transition"
          aria-label="Cerrar"
        >
          ✕
        </button>

        {hasRightBg && (
          <div className="absolute inset-0 z-0">
            <img src={rightImg} alt={rightAlt} title={config.right_alt || ''}
              className="w-full h-full object-cover"
              style={{ opacity: config.right_opacity / 100 }} />
          </div>
        )}

        {hasMobileBg && (
          <div className="absolute inset-0 z-0">
            <img src={mobileImg} alt={mobileAlt} title={config.mobile_alt || ''}
              className="w-full h-full object-cover"
              style={{ opacity: config.mobile_opacity / 100 }} />
          </div>
        )}

        {leftImg && !isMobile && (
          <div className="hidden md:flex relative w-56 flex-shrink-0 overflow-hidden z-10">
            <img src={leftImg} alt={leftAlt} title={config.left_alt || ''}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ opacity: config.left_opacity / 100 }} />
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.25) 55%, transparent 100%)' }} />
            {productoName && (
              <div className="absolute bottom-0 left-0 right-0 px-4 pb-5 z-10">
                <p className="text-white font-extrabold uppercase leading-tight"
                  style={{ fontSize: '0.9rem', letterSpacing: '0.05em', textShadow: '0 2px 10px rgba(0,0,0,0.95)', lineHeight: 1.2 }}>
                  {productoName}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="relative z-10 flex-1 flex flex-col justify-center gap-5 p-7">
          <p className="text-2xl sm:text-3xl font-extrabold text-center leading-tight"
            style={{ color: config.title_color }}>
            {config.title_text}
          </p>

          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            {[
              { name: 'nombre',   label: 'Nombre',   type: 'text',  placeholder: 'Tu nombre completo' },
              { name: 'telefono', label: 'Teléfono', type: 'tel',   placeholder: '9 dígitos' },
              { name: 'correo',   label: 'Correo',   type: 'email', placeholder: 'tu@correo.com' },
            ].map(({ name, label, type, placeholder }) => (
              <div key={name} className="flex flex-col gap-1">
                <label className="font-semibold text-sm" style={{ color: config.title_color }}>
                  {label}
                </label>
                <input
                  name={name} type={type} value={formData[name]}
                  onChange={handleChange} required placeholder={placeholder}
                  className="w-full rounded-full bg-white text-slate-800 text-sm px-4 py-2.5 outline-none focus:ring-2 focus:ring-white/50 placeholder-slate-400"
                />
              </div>
            ))}

            {/* ── FIX: campo oculto con id_producto (número) en lugar de id_servicio ── */}
            <input type="hidden" name="id_producto" value={idProducto} readOnly />

            <button
              type="submit" disabled={loading}
              className="mt-1 w-full rounded-full py-3 text-base font-extrabold text-white transition hover:brightness-110 active:scale-95"
              style={{ backgroundColor: config.button_color }}
            >
              {loading
                ? <Loader2 className="animate-spin h-5 w-5 mx-auto" />
                : config.button_text
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}