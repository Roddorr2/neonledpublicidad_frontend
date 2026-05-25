'use client';

import { useState, useEffect, useMemo } from 'react';
import Swal from 'sweetalert2';
import { popupApi } from '@/api/fetchApiWhatsApp';
import { Card, CardTitle, UploadIcon } from './TabButton';
import { PopupPreview } from './PopupPreview';
//Antes: import servicesList from '../data/servicesList';
import servicesList from '../data/servicesListPopups';

// ─── Constantes ───────────────────────────────────────────────────────────────
const TIEMPOS = [
  { value: 3,  label: '3s - Muy inmediato' },
  { value: 5,  label: '5s - Rápido' },
  { value: 8,  label: '8s - Normal' },
  { value: 12, label: '12s - Usuario explorando' },
  { value: 20, label: '20s - Lectura en progreso' },
  { value: 30, label: '30s - Alta intención' },
  { value: 60, label: '60s - Usuario muy activo' },
];

const GRADIENT_DIRS = [
  { value: 'to bottom',       label: '↓ Arriba → Abajo' },
  { value: 'to top',          label: '↑ Abajo → Arriba' },
  { value: 'to right',        label: '→ Izq → Der' },
  { value: 'to left',         label: '← Der → Izq' },
  { value: 'to bottom right', label: '↘ Diagonal' },
  { value: 'to bottom left',  label: '↙ Diagonal' },
];

const MAX_ALT = 80;

const DEFAULT_FORM = {
  title_text:         'OBTÉN UNA COTIZACIÓN ¡GRATIS!',
  title_color:        '#FFFFFF',
  button_text:        'HAZLO YA',
  button_color:       '#F97316',   // naranja NLP
  service_color:      '#1E3A5F',   // azul oscuro NLP
  service_color_2:    '#1E3A5F',
  gradient_direction: 'to bottom',
  trigger_time:       8,
  left_opacity:       85,
  right_opacity:      100,
  mobile_opacity:     100,
  left_alt:           '',
  right_alt:          '',
  mobile_alt:         '',
};

// Helper: fondo sólido o degradado
const getBg = (f) =>
  f.service_color_2 && f.service_color_2 !== f.service_color
    ? `linear-gradient(${f.gradient_direction}, ${f.service_color}, ${f.service_color_2})`
    : f.service_color;

// ─── ImageUploadZone ─────────────────────────────────────────────────────────
// fileKey cambia cuando se elimina → React destruye y recrea el <input> → permite re-seleccionar
function ImageUploadZone({ label, preview, onFile, onDrop, onRemove }) {
  const [fileKey, setFileKey] = useState(0);

  const handleRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFileKey((k) => k + 1);
    onRemove();
  };

  return (
    <div>
      <p className="mb-1 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
        {label}
      </p>
      <div className="relative">
        <label
          className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 p-4 cursor-pointer hover:border-orange-400 transition min-h-[110px]"
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
        >
          {preview ? (
            <img src={preview} alt="preview" className="max-h-24 max-w-full object-contain rounded-xl" />
          ) : (
            <>
              <UploadIcon />
              <span className="text-xs text-slate-500 dark:text-slate-400">Arrastra o haz clic</span>
            </>
          )}
          <input
            key={fileKey}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => onFile(e.target.files?.[0])}
          />
        </label>
        {preview && (
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 z-10 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 text-white text-xs font-bold flex items-center justify-center shadow-md transition"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────
export function PopupsTab() {
  const [selectedProductoId, setSelectedProductoId] = useState('');
  const [popupConfig,   setPopupConfig]   = useState(null);
  const [isNew,         setIsNew]         = useState(true);
  const [formData,      setFormData]      = useState({ ...DEFAULT_FORM });
  const [imageFiles,    setImageFiles]    = useState({ left: null, right: null, mobile: null });
  const [imagePreviews, setImagePreviews] = useState({ left: null, right: null, mobile: null });
  const [view,    setView]    = useState('desktop'); // 'desktop' | 'mobile'
  const [loading, setLoading] = useState(false);
  const [saving,  setSaving]  = useState(false);
  const [seoOpen, setSeoOpen] = useState(false);

  // ── Cargar config al seleccionar producto ────────────────────────────────
  useEffect(() => {
    if (!selectedProductoId) { resetForm(); return; }
    const cargar = async () => {
      setLoading(true);
      try {
        const res = await popupApi.getByProducto(selectedProductoId);
        if (res?.success && res?.data) {
          const d = res.data;
          setPopupConfig(d);
          setIsNew(false);
          setFormData({
            title_text:         d.title_text         || DEFAULT_FORM.title_text,
            title_color:        d.title_color        || DEFAULT_FORM.title_color,
            button_text:        d.button_text        || DEFAULT_FORM.button_text,
            button_color:       d.button_color       || DEFAULT_FORM.button_color,
            service_color:      d.service_color      || DEFAULT_FORM.service_color,
            service_color_2:    d.service_color_2    || d.service_color || DEFAULT_FORM.service_color_2,
            gradient_direction: d.gradient_direction || DEFAULT_FORM.gradient_direction,
            trigger_time:       d.trigger_time       || DEFAULT_FORM.trigger_time,
            left_opacity:       d.left_opacity       ?? DEFAULT_FORM.left_opacity,
            right_opacity:      d.right_opacity      ?? DEFAULT_FORM.right_opacity,
            mobile_opacity:     d.mobile_opacity     ?? DEFAULT_FORM.mobile_opacity,
            left_alt:           d.left_alt           || '',
            right_alt:          d.right_alt          || '',
            mobile_alt:         d.mobile_alt         || '',
          });
          setImagePreviews({
            left:   d.left_image_url   || null,
            right:  d.right_image_url  || null,
            mobile: d.mobile_image_url || null,
          });
          setImageFiles({ left: null, right: null, mobile: null });
        } else {
          resetForm();
        }
      } catch { resetForm(); }
      finally  { setLoading(false); }
    };
    cargar();
  }, [selectedProductoId]);

  const resetForm = () => {
    setPopupConfig(null);
    setIsNew(true);
    setFormData({ ...DEFAULT_FORM });
    setImagePreviews({ left: null, right: null, mobile: null });
    setImageFiles({ left: null, right: null, mobile: null });
  };

  // ── Imágenes ─────────────────────────────────────────────────────────────
  const handleImageChange = (slot, file) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { Swal.fire('Imagen muy pesada', 'Máximo 5 MB.', 'warning'); return; }
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      Swal.fire('Formato no permitido', 'Usa JPG, PNG o WEBP.', 'warning'); return;
    }
    setImageFiles((p) => ({ ...p, [slot]: file }));
    const reader = new FileReader();
    reader.onloadend = () => setImagePreviews((p) => ({ ...p, [slot]: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (slot) => {
    setImageFiles((p)    => ({ ...p, [slot]: null }));
    setImagePreviews((p) => ({ ...p, [slot]: null }));
  };

  const handleDrop = (slot, e) => {
    e.preventDefault(); e.stopPropagation();
    handleImageChange(slot, e.dataTransfer?.files?.[0]);
  };

  const setField = (field) => (e) => setFormData((p) => ({ ...p, [field]: e.target.value }));

  // ── Lógica de visibilidad de colores de fondo ─────────────────────────────
  // Desktop: se oculta si hay imagen derecha (= fondo completo)
  // Mobile:  se oculta si hay imagen mobile
  const showColorSection =
    view === 'desktop' ? !imagePreviews.right : !imagePreviews.mobile;

  // ── Validación ────────────────────────────────────────────────────────────
  const validate = () => {
    if (!selectedProductoId) { Swal.fire('Error', 'Selecciona un producto', 'warning'); return false; }
    if (!formData.title_text || formData.title_text.trim().length < 5) { Swal.fire('Error', 'El texto principal debe tener al menos 5 caracteres', 'warning'); return false; }
    if (!formData.button_text || formData.button_text.trim().length < 2) { Swal.fire('Error', 'El texto del botón debe tener al menos 2 caracteres', 'warning'); return false; }
    if (!/^#[0-9A-Fa-f]{6}$/.test(formData.service_color)) { Swal.fire('Error', 'Color hex inválido', 'warning'); return false; }
    return true;
  };

  // ── Guardar ───────────────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      const form = new FormData();
      if (isNew) form.append('id_producto', selectedProductoId);
      form.append('title_text',         formData.title_text);
      form.append('title_color',        formData.title_color);
      form.append('button_text',        formData.button_text);
      form.append('button_color',       formData.button_color);
      form.append('service_color',      formData.service_color);
      form.append('service_color_2',    formData.service_color_2);
      form.append('gradient_direction', formData.gradient_direction);
      form.append('trigger_time',       formData.trigger_time);
      form.append('left_opacity',       formData.left_opacity);
      form.append('right_opacity',      formData.right_opacity);
      form.append('mobile_opacity',     formData.mobile_opacity);
      form.append('left_alt',           formData.left_alt);
      form.append('right_alt',          formData.right_alt);
      form.append('mobile_alt',         formData.mobile_alt);

      // ANTES (solo subía imágenes nuevas):
      // if (imageFiles.left)   form.append('left_image',   imageFiles.left);
      // if (imageFiles.right)  form.append('right_image',  imageFiles.right);
      // if (imageFiles.mobile) form.append('mobile_image', imageFiles.mobile);

      //
// DESPUÉS (también indica al backend cuándo se eliminó una imagen):
 
    // ── Imágenes: subir nuevas o indicar eliminadas ──
    ['left', 'right', 'mobile'].forEach((slot) => {
      const fileKey    = `${slot}`;           // 'left' | 'right' | 'mobile'
      const imageFile  = imageFiles[fileKey]; // File | null
      const previewNow = imagePreviews[fileKey]; // URL actual (null si fue eliminada)
 
      // URL que tenía guardada en BD al cargar el editor
      const urlEnBD = !isNew ? (popupConfig?.[`${slot}_image_url`] ?? null) : null;
 
      if (imageFile) {
        // Usuario cargó imagen nueva → subirla
        form.append(`${slot}_image`, imageFile);
      } else if (urlEnBD && !previewNow) {
        // Había imagen en BD, el usuario la eliminó (preview = null) y no cargó otra
        form.append(`remove_${slot}_image`, '1');
      }
      // Si previewNow === urlEnBD → sin cambios, no se manda nada
    });

      const res = isNew
        ? await popupApi.create(form)
        : await popupApi.update(popupConfig.id_popup_config, form);

      if (res?.success) {
        Swal.fire('¡Éxito!', isNew ? 'Pop-Up creado correctamente' : 'Pop-Up actualizado', 'success');
        const fresh = await popupApi.getByProducto(selectedProductoId);
        if (fresh?.success && fresh?.data) { setPopupConfig(fresh.data); setIsNew(false); }
        setImageFiles({ left: null, right: null, mobile: null });
      } else {
        Swal.fire('Error', res?.message || 'No se pudo guardar', 'error');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Error de conexión al guardar', 'error');
    } finally { setSaving(false); }
  };

  // ── Eliminar ──────────────────────────────────────────────────────────────
  const handleDelete = async () => {
    if (!popupConfig) return;
    const { isConfirmed } = await Swal.fire({
      title: '¿Eliminar Pop-Up?',
      text: 'Se eliminarán las imágenes en Cloudinary. Esta acción no se puede deshacer.',
      icon: 'warning', showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, eliminar',
    });
    if (!isConfirmed) return;
    try {
      const res = await popupApi.destroy(popupConfig.id_popup_config);
      if (res?.success) {
        Swal.fire('Eliminado', 'Pop-Up eliminado correctamente', 'success');
        resetForm(); setSelectedProductoId('');
      } else Swal.fire('Error', res?.message || 'No se pudo eliminar', 'error');
    } catch { Swal.fire('Error', 'Error de conexión al eliminar', 'error'); }
  };

  // ── UI helpers ────────────────────────────────────────────────────────────
  const inputCls = "w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-orange-400";
  const labelCls = "block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1";
  const counterCls = (len, max) => `text-xs ${len > max * 0.9 ? 'text-red-500' : 'text-slate-400'}`;
  const productoName = servicesList.find((s) => s.id === Number(selectedProductoId))?.name || '';


  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-12">

        {/* ══ PANEL IZQUIERDO: Editor ══ */}
        <div className="lg:col-span-7 space-y-5">

          {/* Selector de producto */}
          <Card>
            <CardTitle>Editor de Pop-Ups</CardTitle>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Configura el pop-up de captación para cada producto.
            </p>
            <div className="mt-5">
              <label className={labelCls}>Producto</label>
              <select
                className={inputCls}
                value={selectedProductoId}
                onChange={(e) => { setSelectedProductoId(e.target.value); setSeoOpen(false); }}
              >
                <option value="">— Selecciona un producto —</option>
                {servicesList.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            {selectedProductoId && !loading && (
              <div className="mt-3">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                  isNew
                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                    : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                }`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${isNew ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                  {isNew ? 'Sin configuración — se creará una nueva' : `Config existente · ID ${popupConfig?.id_popup_config}`}
                </span>
              </div>
            )}
          </Card>

          {/* Editor (solo si hay producto seleccionado) */}
          {selectedProductoId && (
            <Card>
              {loading ? (
                <div className="flex items-center justify-center py-12 gap-3">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
                  <p className="text-slate-500 text-sm">Cargando configuración...</p>
                </div>
              ) : (
                <div className="space-y-5">

                  {/* ── Texto Principal + Color texto ── */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className={labelCls.replace('mb-1','')}>Texto Principal</label>
                      <span className={counterCls(formData.title_text?.length ?? 0, 80)}>
                        {formData.title_text?.length ?? 0}/80
                      </span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <input type="text" maxLength={80} value={formData.title_text}
                        onChange={setField('title_text')}
                        className={`${inputCls} flex-1`}
                        placeholder="OBTÉN UNA COTIZACIÓN ¡GRATIS!" />
                      <div className="flex flex-col items-center gap-0.5 flex-shrink-0">
                        <span className="text-[10px] text-slate-500">Color texto</span>
                        <input type="color" value={formData.title_color}
                          onChange={setField('title_color')}
                          className="h-9 w-10 rounded-lg border border-slate-200 dark:border-slate-600 cursor-pointer p-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* ── Texto Botón + Color botón ── */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className={labelCls.replace('mb-1','')}>Texto del Botón</label>
                      <span className={counterCls(formData.button_text?.length ?? 0, 25)}>
                        {formData.button_text?.length ?? 0}/25
                      </span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <input type="text" maxLength={25} value={formData.button_text}
                        onChange={setField('button_text')}
                        className={`${inputCls} flex-1`}
                        placeholder="HAZLO YA" />
                      <div className="flex flex-col items-center gap-0.5 flex-shrink-0">
                        <span className="text-[10px] text-slate-500">Color botón</span>
                        <input type="color" value={formData.button_color}
                          onChange={setField('button_color')}
                          className="h-9 w-10 rounded-lg border border-slate-200 dark:border-slate-600 cursor-pointer p-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* ── Color de Servicio (fondo) ──
                       Desktop: ocultar si hay imagen derecha (= fondo completo)
                       Mobile:  ocultar si hay imagen mobile                    ── */}
                  {showColorSection && (
                    <div>
                      <label className={labelCls}>Color de Servicio (fondo)</label>

                      {/* Preview degradado */}
                      <div className="w-full h-8 rounded-xl mb-3 border border-slate-200 dark:border-slate-600"
                        style={{ background: getBg(formData) }} />

                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Color 1</p>
                          <div className="flex items-center gap-2">
                            <input type="color" value={formData.service_color}
                              onChange={setField('service_color')}
                              className="h-9 w-10 rounded-lg border border-slate-200 dark:border-slate-600 cursor-pointer p-0.5 flex-shrink-0" />
                            <input type="text" maxLength={7} value={formData.service_color}
                              onChange={setField('service_color')}
                              className="flex-1 min-w-0 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-2 py-1.5 text-xs font-mono text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-orange-400" />
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Color 2 (degradado)</p>
                          <div className="flex items-center gap-2">
                            <input type="color" value={formData.service_color_2}
                              onChange={setField('service_color_2')}
                              className="h-9 w-10 rounded-lg border border-slate-200 dark:border-slate-600 cursor-pointer p-0.5 flex-shrink-0" />
                            <input type="text" maxLength={7} value={formData.service_color_2}
                              onChange={setField('service_color_2')}
                              className="flex-1 min-w-0 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-2 py-1.5 text-xs font-mono text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-orange-400" />
                          </div>
                        </div>
                      </div>

                      {/* Dirección degradado */}
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Dirección del degradado</p>
                        <div className="flex flex-wrap gap-1.5">
                          {GRADIENT_DIRS.map((d) => (
                            <button key={d.value} type="button"
                              onClick={() => setFormData((p) => ({ ...p, gradient_direction: d.value }))}
                              className={`rounded-full px-3 py-1 text-xs font-semibold transition border ${
                                formData.gradient_direction === d.value
                                  ? 'bg-orange-500 text-white border-orange-500'
                                  : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-orange-400'
                              }`}>
                              {d.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Aviso cuando se ocultan los colores */}
                  {!showColorSection && (
                    <div className="flex items-center gap-2 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 px-4 py-3 text-sm text-blue-700 dark:text-blue-300">
                      <span>🖼️</span>
                      <span>Los colores de fondo están desactivados porque hay una imagen de fondo cargada.</span>
                    </div>
                  )}

                  {/* ── Tiempo de Aparición ── */}
                  <div>
                    <label className={labelCls}>Tiempo de Aparición</label>
                    <select className={inputCls} value={formData.trigger_time}
                      onChange={(e) => setFormData((p) => ({ ...p, trigger_time: Number(e.target.value) }))}>
                      {TIEMPOS.map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* ── Imágenes ── */}
                  <div>
                    <label className={labelCls}>Imágenes</label>

                    {/* Toggle Desktop / Mobile */}
                    <div className="flex gap-2 mb-4">
                      {['desktop', 'mobile'].map((v) => (
                        <button key={v} type="button"
                          onClick={() => { setView(v); setSeoOpen(false); }}
                          className={`rounded-full px-4 py-1.5 text-sm font-semibold transition border ${
                            view === v
                              ? 'bg-orange-500 text-white border-orange-500'
                              : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-600'
                          }`}>
                          {v === 'desktop' ? 'Desktop' : 'Mobile'}
                        </button>
                      ))}
                    </div>

                    {/* Desktop: izq (columna lateral) + der (fondo) */}
                    {view === 'desktop' && (
                      <div className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          {/* Izquierda — columna con nombre del producto */}
                          <div className="space-y-2">
                            <ImageUploadZone
                              label="Imagen Izquierda (columna lateral)"
                              preview={imagePreviews.left}
                              onFile={(f) => handleImageChange('left', f)}
                              onDrop={(e) => handleDrop('left', e)}
                              onRemove={() => handleRemoveImage('left')}
                            />
                            <div>
                              <div className="flex justify-between text-xs text-slate-500 mb-0.5">
                                <span>Opacidad</span><span>{formData.left_opacity}%</span>
                              </div>
                              <input type="range" min={0} max={100} value={formData.left_opacity}
                                onChange={(e) => setFormData((p) => ({ ...p, left_opacity: Number(e.target.value) }))}
                                className="w-full accent-orange-500" />
                            </div>
                          </div>

                          {/* Derecha — fondo completo */}
                          <div className="space-y-2">
                            <ImageUploadZone
                              label="Imagen Derecha (fondo del popup)"
                              preview={imagePreviews.right}
                              onFile={(f) => handleImageChange('right', f)}
                              onDrop={(e) => handleDrop('right', e)}
                              onRemove={() => handleRemoveImage('right')}
                            />
                            <div>
                              <div className="flex justify-between text-xs text-slate-500 mb-0.5">
                                <span>Opacidad</span><span>{formData.right_opacity}%</span>
                              </div>
                              <input type="range" min={0} max={100} value={formData.right_opacity}
                                onChange={(e) => setFormData((p) => ({ ...p, right_opacity: Number(e.target.value) }))}
                                className="w-full accent-orange-500" />
                            </div>
                          </div>
                        </div>

                        {/* SEO — Texto Alt Desktop */}
                        <AltAccordion open={seoOpen} onToggle={() => setSeoOpen((p) => !p)}>
                          <AltField label="Texto Alt — Imagen Izquierda" field="left_alt"
                            value={formData.left_alt} onChange={setField('left_alt')}
                            hasImage={!!imagePreviews.left} counterCls={counterCls}
                            inputCls={inputCls} placeholder="Ej: letras de neón led personalizadas" />
                          <AltField label="Texto Alt — Imagen Derecha" field="right_alt"
                            value={formData.right_alt} onChange={setField('right_alt')}
                            hasImage={!!imagePreviews.right} counterCls={counterCls}
                            inputCls={inputCls} placeholder="Ej: letreros luminosos para negocios" />
                        </AltAccordion>
                      </div>
                    )}

                    {/* Mobile */}
                    {view === 'mobile' && (
                      <div className="space-y-4">
                        <div className="max-w-xs space-y-2">
                          <ImageUploadZone
                            label="Imagen Mobile (fondo)"
                            preview={imagePreviews.mobile}
                            onFile={(f) => handleImageChange('mobile', f)}
                            onDrop={(e) => handleDrop('mobile', e)}
                            onRemove={() => handleRemoveImage('mobile')}
                          />
                          <div>
                            <div className="flex justify-between text-xs text-slate-500 mb-0.5">
                              <span>Opacidad</span><span>{formData.mobile_opacity}%</span>
                            </div>
                            <input type="range" min={0} max={100} value={formData.mobile_opacity}
                              onChange={(e) => setFormData((p) => ({ ...p, mobile_opacity: Number(e.target.value) }))}
                              className="w-full accent-orange-500" />
                          </div>
                        </div>

                        {/* SEO — Texto Alt Mobile */}
                        <AltAccordion open={seoOpen} onToggle={() => setSeoOpen((p) => !p)} label="Texto Alt de Imagen (SEO)">
                          <AltField label="Texto Alt — Imagen Mobile" field="mobile_alt"
                            value={formData.mobile_alt} onChange={setField('mobile_alt')}
                            hasImage={!!imagePreviews.mobile} counterCls={counterCls}
                            inputCls={inputCls} placeholder="Ej: neon led publicidad lima peru" />
                        </AltAccordion>
                      </div>
                    )}
                  </div>

                  {/* ── Botones ── */}
                  <div className="flex items-center gap-3 pt-2 border-t border-slate-100 dark:border-slate-700">
                    <button type="button" onClick={handleSave} disabled={saving}
                      className={`rounded-full px-6 py-2.5 text-sm font-semibold text-white transition ${
                        saving ? 'bg-slate-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 active:bg-orange-700'
                      }`}>
                      {saving ? 'Guardando...' : isNew ? 'Crear Pop-Up' : 'Guardar Cambios'}
                    </button>
                    {!isNew && (
                      <button type="button" onClick={handleDelete}
                        className="rounded-full px-5 py-2.5 text-sm font-semibold text-red-600 border border-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 transition">
                        Eliminar
                      </button>
                    )}
                  </div>

                </div>
              )}
            </Card>
          )}
        </div>

        {/* ══ PANEL DERECHO: Preview ══ */}
        <div className="lg:col-span-5">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <CardTitle>Preview</CardTitle>
              <div className="flex gap-2">
                {['desktop', 'mobile'].map((v) => (
                  <button key={v} type="button" onClick={() => setView(v)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold transition border ${
                      view === v
                        ? 'bg-orange-500 text-white border-orange-500'
                        : 'bg-white dark:bg-slate-700 text-slate-500 border-slate-300 dark:border-slate-600'
                    }`}>
                    {v === 'desktop' ? 'Desktop' : 'Mobile'}
                  </button>
                ))}
              </div>
            </div>

            {selectedProductoId ? (
              <PopupPreview
                formData={formData}
                imagePreviews={imagePreviews}
                view={view}
                productoName={productoName}
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center text-slate-400">
                <svg className="h-14 w-14 mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
                </svg>
                <p className="text-sm font-medium">Selecciona un producto</p>
                <p className="text-xs mt-1">para ver el preview del pop-up</p>
              </div>
            )}
          </Card>
        </div>

      </div>
    </div>
  );
}

// ─── Sub-componente: Acordeón SEO ─────────────────────────────────────────────
function AltAccordion({ open, onToggle, label = 'Texto Alt de Imágenes (SEO)', children }) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-600 overflow-hidden">
      <button type="button" onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-50 dark:bg-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 transition">
        <span>{label}</span>
        <span className="text-slate-400 text-xs">{open ? '▲' : '▶'}</span>
      </button>
      {open && (
        <div className="px-4 py-3 space-y-3 bg-white dark:bg-slate-800">
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Sub-componente: Campo Alt con aviso si no hay imagen ─────────────────────
function AltField({ label, field, value, onChange, hasImage, counterCls, inputCls, placeholder }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">{label}</label>
        <span className={counterCls(value?.length ?? 0, MAX_ALT)}>{value?.length ?? 0}/{MAX_ALT}</span>
      </div>
      {!hasImage ? (
        <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-700 px-3 py-2">
          <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          <span className="text-xs text-amber-700 dark:text-amber-400">No se ha subido imagen</span>
        </div>
      ) : (
        <input type="text" maxLength={MAX_ALT} value={value} onChange={onChange}
          placeholder={placeholder} className={inputCls} />
      )}
    </div>
  );
}