"use client";

import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { popupApi } from "@/api/fetchApiWhatsApp";
import { Card, CardTitle, UploadIcon } from "./TabButton";
import { PopupPreview } from "./PopupPreview";

// ─── UI CONSTANTS ─────────────────────────────────────────────────────────────
const GRADIENT_DIRS = [
  { value: "to bottom",       label: "↓ Arriba → Abajo" },
  { value: "to top",          label: "↑ Abajo → Arriba" },
  { value: "to right",        label: "→ Izq → Der" },
  { value: "to left",         label: "← Der → Izq" },
  { value: "to bottom right", label: "↘ Diagonal" },
  { value: "to bottom left",  label: "↙ Diagonal" },
];

const DEFAULT_FORM = {
  // ── Desktop ────────────────────────────────────────────────────────────────
  title_text:         "",
  button_text:        "",
  title_color:        "#FFFFFF",
  button_color:       "#F97316",
  service_color:      "#5966f5",
  service_color_2:    "#854ff4",
  gradient_direction: "to bottom",
  trigger_time:       8,
  left_opacity:       85,
  right_opacity:      100,
  left_alt:           "",
  right_alt:          "",

  // ── Mobile ─────────────────────────────────────────────────────────────────
  mobile_title_text:         "",
  mobile_button_text:        "",
  mobile_title_color:        "#FFFFFF",
  mobile_button_color:       "#F97316",
  mobile_service_color:      "#5966f5",
  mobile_service_color_2:    "#854ff4",
  mobile_gradient_direction: "to bottom",
  mobile_trigger_time:       8,
  mobile_opacity:            100,
  mobile_alt:                "",
};

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────
export function PopupsTab() {
  const [productosList,      setProductosList]      = useState([]);
  const [selectedProductoId, setSelectedProductoId] = useState("");
  const [popupConfig,        setPopupConfig]        = useState(null);
  const [isNew,              setIsNew]              = useState(true);
  const [formData,           setFormData]           = useState({ ...DEFAULT_FORM });

  const [imageFiles,    setImageFiles]    = useState({ left: null, right: null, mobile: null });
  const [imagePreviews, setImagePreviews] = useState({ left: null, right: null, mobile: null });

  const [view,    setView]    = useState("desktop");
  const [loading, setLoading] = useState(false);
  const [saving,  setSaving]  = useState(false);

  // ─── CARGAR PRODUCTOS ────────────────────────────────────────────────────
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await popupApi.getProductos();
        if (res?.status === 200 && res?.data) {
          const productos = res.data.data && Array.isArray(res.data.data)
            ? res.data.data
            : Array.isArray(res.data) ? res.data : [];
          setProductosList(productos);
        } else {
          setProductosList([]);
        }
      } catch {
        setProductosList([]);
      }
    };
    fetchProductos();
  }, []);

  // ─── CARGAR CONFIGURACIÓN ────────────────────────────────────────────────
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
            // Desktop
            title_text:  d.title_text  || "",
            button_text: d.button_text || "",
            title_color:        d.title_color        || "#FFFFFF",
            button_color:       d.button_color        || "#F97316",
            service_color:      d.service_color       || "#5966f5",
            service_color_2:    d.service_color_2     || "#854ff4",
            gradient_direction: d.gradient_direction  || "to bottom",
            trigger_time:       d.trigger_time        ?? 8,
            left_opacity:       d.left_opacity        ?? 85,
            right_opacity:      d.right_opacity       ?? 100,
            left_alt:           d.left_alt            || "",
            right_alt:          d.right_alt           || "",

            // Mobile — usa campos propios con fallback a desktop si son null
            // (compatibilidad con registros anteriores a la migración)
            mobile_title_text:         d.mobile_title_text         || d.title_text         || "",
            mobile_button_text:        d.mobile_button_text        || d.button_text        || "",
            mobile_trigger_time:       d.mobile_trigger_time       ?? d.trigger_time        ?? 8,
            mobile_title_color:        d.mobile_title_color        || d.title_color         || "#FFFFFF",
            mobile_button_color:       d.mobile_button_color       || d.button_color        || "#F97316",
            mobile_service_color:      d.mobile_service_color      || d.service_color       || "#5966f5",
            mobile_service_color_2:    d.mobile_service_color_2    || d.service_color_2     || "#854ff4",
            mobile_gradient_direction: d.mobile_gradient_direction || d.gradient_direction  || "to bottom",
            mobile_opacity:            d.mobile_opacity            ?? 100,
            mobile_alt:                d.mobile_alt                || "",
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
      } catch {
        Swal.fire("Error", "No se pudo cargar la configuración", "error");
        resetForm();
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, [selectedProductoId]);

  // ─── LIMPIEZA DE BLOBS ───────────────────────────────────────────────────
  // Ref para acceder al valor actual de imagePreviews al desmontar
  // sin necesidad de [imagePreviews] como dependencia (lo que causaba
  // revocar blobs activos al cambiar de vista o tab).
  const imagePreviewsRef = useRef(imagePreviews);
  useEffect(() => { imagePreviewsRef.current = imagePreviews; }, [imagePreviews]);
  useEffect(() => {
    return () => {
      Object.values(imagePreviewsRef.current).forEach((url) => {
        if (url?.startsWith("blob:")) URL.revokeObjectURL(url);
      });
    };
  }, []);

  // ─── RESET ──────────────────────────────────────────────────────────────
  const resetForm = () => {
    setPopupConfig(null);
    setIsNew(true);
    setFormData({ ...DEFAULT_FORM });
    setImagePreviews({ left: null, right: null, mobile: null });
    setImageFiles({ left: null, right: null, mobile: null });
  };

  // ─── IMÁGENES ───────────────────────────────────────────────────────────
  const handleImageChange = (slot, file) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      Swal.fire("Imagen muy pesada", "Máximo 5 MB.", "warning"); return;
    }
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      Swal.fire("Formato no permitido", "Usa JPG, PNG o WEBP.", "warning"); return;
    }
    setImageFiles((p) => ({ ...p, [slot]: file }));
    const objectUrl = URL.createObjectURL(file);
    setImagePreviews((p) => {
      if (p[slot]?.startsWith("blob:")) URL.revokeObjectURL(p[slot]);
      return { ...p, [slot]: objectUrl };
    });
  };

  const handleRemoveImage = (slot) => {
    setImageFiles((p) => ({ ...p, [slot]: null }));
    setImagePreviews((p) => {
      if (p[slot]?.startsWith("blob:")) URL.revokeObjectURL(p[slot]);
      return { ...p, [slot]: null };
    });
  };

  const handleDrop = (slot, e) => {
    e.preventDefault(); e.stopPropagation();
    handleImageChange(slot, e.dataTransfer?.files?.[0]);
  };

  // Helper para actualizar un campo del form
  const setField = (field) => (e) =>
    setFormData((p) => ({ ...p, [field]: e.target.value }));

  // ─── ¿MOSTRAR SECCIÓN DE COLORES? ───────────────────────────────────────
  // Se oculta si hay imagen de fondo cargada en esa vista
  const showColorSection =
    view === "desktop" ? !imagePreviews.right : !imagePreviews.mobile;

  // ─── VALIDACIÓN ─────────────────────────────────────────────────────────
  const validate = () => {
    if (!selectedProductoId) {
      Swal.fire("Error", "Selecciona un producto", "warning"); return false;
    }
    if (!formData.title_text || formData.title_text.trim().length < 5) {
      Swal.fire("Error", "El texto principal (Desktop) debe tener al menos 5 caracteres", "warning"); return false;
    }
    if (!formData.button_text || formData.button_text.trim().length < 2) {
      Swal.fire("Error", "El texto del botón (Desktop) debe tener al menos 2 caracteres", "warning"); return false;
    }
    if (!formData.mobile_title_text || formData.mobile_title_text.trim().length < 5) {
      Swal.fire("Error", "El texto principal (Mobile) debe tener al menos 5 caracteres", "warning"); return false;
    }
    if (!formData.mobile_button_text || formData.mobile_button_text.trim().length < 2) {
      Swal.fire("Error", "El texto del botón (Mobile) debe tener al menos 2 caracteres", "warning"); return false;
    }
    if (!/^#[0-9A-Fa-f]{6}$/.test(formData.service_color)) {
      Swal.fire("Error", "Color hex de Desktop inválido", "warning"); return false;
    }
    if (!/^#[0-9A-Fa-f]{6}$/.test(formData.mobile_service_color)) {
      Swal.fire("Error", "Color hex de Mobile inválido", "warning"); return false;
    }
    return true;
  };

  // ─── GUARDAR ────────────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      const form = new FormData();
      if (isNew) form.append("id_producto", selectedProductoId);

      // Texto Desktop
      form.append("title_text",  formData.title_text);
      form.append("button_text", formData.button_text);

      // Texto Mobile
      form.append("mobile_title_text",  formData.mobile_title_text);
      form.append("mobile_button_text", formData.mobile_button_text);

      // Desktop
      form.append("title_color",        formData.title_color);
      form.append("button_color",       formData.button_color);
      form.append("service_color",      formData.service_color);
      form.append("service_color_2",    formData.service_color_2);
      form.append("gradient_direction", formData.gradient_direction);
      form.append("trigger_time",       formData.trigger_time);
      form.append("left_opacity",       formData.left_opacity);
      form.append("right_opacity",      formData.right_opacity);
      form.append("left_alt",           formData.left_alt);
      form.append("right_alt",          formData.right_alt);

      // Mobile
      form.append("mobile_trigger_time",       formData.mobile_trigger_time);
      form.append("mobile_title_color",        formData.mobile_title_color);
      form.append("mobile_button_color",       formData.mobile_button_color);
      form.append("mobile_service_color",      formData.mobile_service_color);
      form.append("mobile_service_color_2",    formData.mobile_service_color_2);
      form.append("mobile_gradient_direction", formData.mobile_gradient_direction);
      form.append("mobile_opacity",            formData.mobile_opacity);
      form.append("mobile_alt",                formData.mobile_alt);

      // Imágenes
      ["left", "right", "mobile"].forEach((slot) => {
        const file      = imageFiles[slot];
        const preview   = imagePreviews[slot];
        const urlEnBD   = !isNew ? (popupConfig?.[`${slot}_image_url`] ?? null) : null;

        if (file) {
          form.append(`${slot}_image`, file);
        } else if (urlEnBD && !preview) {
          form.append(`remove_${slot}_image`, "1");
        }
      });

      const res = isNew
        ? await popupApi.create(form)
        : await popupApi.update(popupConfig.id_popup_config, form);

      if (res?.success) {
        Swal.fire("¡Éxito!", isNew ? "Pop-Up creado correctamente" : "Pop-Up actualizado", "success");
        const fresh = await popupApi.getByProducto(selectedProductoId);
        if (fresh?.success && fresh?.data) {
          setPopupConfig(fresh.data);
          setIsNew(false);
        }
        setImageFiles({ left: null, right: null, mobile: null });
      } else {
        Swal.fire("Error", res?.message || "No se pudo guardar", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Error de conexión al guardar", "error");
    } finally {
      setSaving(false);
    }
  };

  // ─── ELIMINAR ───────────────────────────────────────────────────────────
  const handleDelete = async () => {
    if (!popupConfig) return;
    const { isConfirmed } = await Swal.fire({
      title: "¿Eliminar Pop-Up?",
      text: "Se eliminarán las imágenes en Cloudinary. Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sí, eliminar",
    });
    if (!isConfirmed) return;
    try {
      const res = await popupApi.destroy(popupConfig.id_popup_config);
      if (res?.success) {
        Swal.fire("Eliminado", "Pop-Up eliminado correctamente", "success");
        resetForm();
        setSelectedProductoId("");
      } else {
        Swal.fire("Error", res?.message || "No se pudo eliminar", "error");
      }
    } catch {
      Swal.fire("Error", "Error de conexión al eliminar", "error");
    }
  };

  // ─── CSS HELPERS ────────────────────────────────────────────────────────
  const inputCls =
    "w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-orange-400";
  const labelCls =
    "block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1";
  const counterCls = (len, max) =>
    `text-xs ${len > max * 0.9 ? "text-red-500" : "text-slate-400"}`;

  const productoName =
    productosList.find((p) => p.id_producto === Number(selectedProductoId))?.nombre || "";

  // ─── RENDER ─────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-12">

        {/* ── PANEL IZQUIERDO ───────────────────────────────────────────── */}
        <div className="lg:col-span-7 space-y-5 min-w-0">
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
                onChange={(e) => { setSelectedProductoId(e.target.value); }}
              >
                <option value="">— Selecciona un producto —</option>
                {productosList.map((p) => (
                  <option key={p.id_producto} value={p.id_producto}>{p.nombre}</option>
                ))}
              </select>
            </div>

            {selectedProductoId && !loading && (
              <div className="mt-3">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${isNew ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${isNew ? "bg-amber-500" : "bg-emerald-500"}`} />
                  {isNew ? "Sin configuración — se creará una nueva" : `Config existente · ID ${popupConfig?.id_popup_config}`}
                </span>
              </div>
            )}
          </Card>

          {selectedProductoId && (
            <Card>
              {loading ? (
                <div className="flex items-center justify-center py-12 gap-3">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
                  <p className="text-slate-500 text-sm">Cargando configuración...</p>
                </div>
              ) : (
                <div className="space-y-5">

                  {/* ── SELECTOR DE VISTA ────────────────────────────── */}
                  <div>
                    <label className={labelCls}>Configuración por Vista</label>
                    <div className="flex gap-2 mb-4">
                      {["desktop", "mobile"].map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setView(v)}
                          className={`rounded-full px-4 py-1.5 text-sm font-semibold transition border ${view === v ? "bg-orange-500 text-white border-orange-500" : "bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-600"}`}
                        >
                          {v === "desktop" ? "Desktop" : "Mobile"}
                        </button>
                      ))}
                    </div>

                    {/* ══════════ VISTA DESKTOP ═════════════════════════ */}
                    {view === "desktop" && (
                      <div className="space-y-5">

                        {/* Texto principal desktop */}
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <label className={labelCls.replace("mb-1","")}>Texto Principal</label>
                            <span className={counterCls(formData.title_text?.length ?? 0, 80)}>
                              {formData.title_text?.length ?? 0}/80
                            </span>
                          </div>
                          <input type="text" maxLength={80} value={formData.title_text}
                            onChange={setField("title_text")} className={inputCls}
                            placeholder="OBTÉN UNA COTIZACIÓN ¡GRATIS!" />
                        </div>

                        {/* Texto botón desktop */}
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <label className={labelCls.replace("mb-1","")}>Texto del Botón</label>
                            <span className={counterCls(formData.button_text?.length ?? 0, 25)}>
                              {formData.button_text?.length ?? 0}/25
                            </span>
                          </div>
                          <input type="text" maxLength={25} value={formData.button_text}
                            onChange={setField("button_text")} className={inputCls}
                            placeholder="HAZLO YA" />
                        </div>

                        {/* Color texto + botón */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <ColorPickerField
                            label="Color del Texto"
                            value={formData.title_color}
                            onChange={setField("title_color")}
                          />
                          <ColorPickerField
                            label="Color del Botón"
                            value={formData.button_color}
                            onChange={setField("button_color")}
                          />
                        </div>

                        {/* Colores de fondo */}
                        {showColorSection ? (
                          <GradientSection
                            color1={formData.service_color}
                            color2={formData.service_color_2}
                            direction={formData.gradient_direction}
                            onColor1={setField("service_color")}
                            onColor2={setField("service_color_2")}
                            onDirection={(val) =>
                              setFormData((p) => ({ ...p, gradient_direction: val }))
                            }
                            inputCls={inputCls}
                          />
                        ) : (
                          <BgImageNotice />
                        )}

                        {/* Tiempo de aparición */}
                        <TriggerTimeField
                          value={formData.trigger_time}
                          onChange={(val) => setFormData((p) => ({ ...p, trigger_time: val }))}
                          inputCls={inputCls}
                          labelCls={labelCls}
                        />

                        {/* Imágenes Desktop */}
                        <div className="grid gap-4 sm:grid-cols-2">
                          <ImageSlot
                            label="Imagen Izquierda (columna lateral)"
                            hint="Recomendado: 224×400 px · WebP"
                            preview={imagePreviews.left}
                            opacity={formData.left_opacity}
                            alt={formData.left_alt}
                            altMax={80}
                            onFile={(f) => handleImageChange("left", f)}
                            onDrop={(e) => handleDrop("left", e)}
                            onRemove={() => handleRemoveImage("left")}
                            onOpacity={(v) => setFormData((p) => ({ ...p, left_opacity: v }))}
                            onAlt={setField("left_alt")}
                          />
                          <ImageSlot
                            label="Imagen Derecha (fondo del popup)"
                            hint="Recomendado: 456×400 px · WebP"
                            preview={imagePreviews.right}
                            opacity={formData.right_opacity}
                            alt={formData.right_alt}
                            altMax={80}
                            onFile={(f) => handleImageChange("right", f)}
                            onDrop={(e) => handleDrop("right", e)}
                            onRemove={() => handleRemoveImage("right")}
                            onOpacity={(v) => setFormData((p) => ({ ...p, right_opacity: v }))}
                            onAlt={setField("right_alt")}
                          />
                        </div>
                      </div>
                    )}

                    {/* ══════════ VISTA MOBILE ══════════════════════════ */}
                    {view === "mobile" && (
                      <div className="space-y-5">

                        {/* Texto principal mobile */}
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <label className={labelCls.replace("mb-1","")}>Texto Principal</label>
                            <span className={counterCls(formData.mobile_title_text?.length ?? 0, 80)}>
                              {formData.mobile_title_text?.length ?? 0}/80
                            </span>
                          </div>
                          <input type="text" maxLength={80} value={formData.mobile_title_text}
                            onChange={setField("mobile_title_text")} className={inputCls}
                            placeholder="OBTÉN UNA COTIZACIÓN ¡GRATIS!" />
                        </div>

                        {/* Texto botón mobile */}
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <label className={labelCls.replace("mb-1","")}>Texto del Botón</label>
                            <span className={counterCls(formData.mobile_button_text?.length ?? 0, 25)}>
                              {formData.mobile_button_text?.length ?? 0}/25
                            </span>
                          </div>
                          <input type="text" maxLength={25} value={formData.mobile_button_text}
                            onChange={setField("mobile_button_text")} className={inputCls}
                            placeholder="HAZLO YA" />
                        </div>

                        {/* Color texto + botón */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <ColorPickerField
                            label="Color del Texto"
                            value={formData.mobile_title_color}
                            onChange={setField("mobile_title_color")}
                          />
                          <ColorPickerField
                            label="Color del Botón"
                            value={formData.mobile_button_color}
                            onChange={setField("mobile_button_color")}
                          />
                        </div>

                        {/* Colores de fondo */}
                        {showColorSection ? (
                          <GradientSection
                            color1={formData.mobile_service_color}
                            color2={formData.mobile_service_color_2}
                            direction={formData.mobile_gradient_direction}
                            onColor1={setField("mobile_service_color")}
                            onColor2={setField("mobile_service_color_2")}
                            onDirection={(val) =>
                              setFormData((p) => ({ ...p, mobile_gradient_direction: val }))
                            }
                            inputCls={inputCls}
                          />
                        ) : (
                          <BgImageNotice />
                        )}

                        {/* Tiempo de aparición */}
                        <TriggerTimeField
                          value={formData.mobile_trigger_time}
                          onChange={(val) =>
                            setFormData((p) => ({ ...p, mobile_trigger_time: val }))
                          }
                          inputCls={inputCls}
                          labelCls={labelCls}
                        />

                        {/* Imagen Mobile */}
                        <div className="max-w-xs">
                          <ImageSlot
                            label="Imagen Mobile (fondo)"
                            hint="Recomendado: 400×600 px · WebP"
                            preview={imagePreviews.mobile}
                            opacity={formData.mobile_opacity}
                            alt={formData.mobile_alt}
                            altMax={80}
                            onFile={(f) => handleImageChange("mobile", f)}
                            onDrop={(e) => handleDrop("mobile", e)}
                            onRemove={() => handleRemoveImage("mobile")}
                            onOpacity={(v) => setFormData((p) => ({ ...p, mobile_opacity: v }))}
                            onAlt={setField("mobile_alt")}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ── BOTONES DE ACCIÓN ────────────────────────────── */}
                  <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100 dark:border-slate-700">
                    <button
                      type="button"
                      onClick={handleSave}
                      disabled={saving}
                      className={`rounded-full px-6 py-2.5 text-sm font-semibold text-white transition ${saving ? "bg-slate-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600 active:bg-orange-700"}`}
                    >
                      {saving ? "Guardando..." : isNew ? "Crear Pop-Up" : "Guardar Cambios"}
                    </button>
                    {!isNew && (
                      <button
                        type="button"
                        onClick={handleDelete}
                        className="rounded-full px-5 py-2.5 text-sm font-semibold text-red-600 border border-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                      >
                        Eliminar
                      </button>
                    )}
                  </div>
                </div>
              )}
            </Card>
          )}
        </div>

        {/* ── PANEL DERECHO - PREVIEW ──────────────────────────────────────── */}
        <div className="lg:col-span-5 min-w-0">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <CardTitle>Preview</CardTitle>
              <div className="flex gap-2">
                {["desktop", "mobile"].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setView(v)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold transition border ${view === v ? "bg-orange-500 text-white border-orange-500" : "bg-white dark:bg-slate-700 text-slate-500 border-slate-300 dark:border-slate-600"}`}
                  >
                    {v === "desktop" ? "Desktop" : "Mobile"}
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
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

// ─── SUB-COMPONENTES ─────────────────────────────────────────────────────────

/** Campo de tiempo de aparición reutilizable */
function TriggerTimeField({ value, onChange, inputCls, labelCls }) {
  const num = Number(value);
  return (
    <div>
      <label className={labelCls}>Tiempo de Aparición (segundos)</label>
      <input
        type="number"
        min="1"
        max="100"
        step="1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputCls}
      />
      {value !== "" && num < 1   && <p className="mt-1 text-xs text-red-500">El tiempo mínimo permitido es 1 segundo.</p>}
      {value !== "" && num > 100 && <p className="mt-1 text-xs text-red-500">El tiempo máximo permitido es 100 segundos.</p>}
      {value !== "" && num >= 1 && num <= 100 && (
        <p className="mt-1 text-xs text-slate-500">Ingresa el tiempo en segundos antes de mostrar el pop-up.</p>
      )}
    </div>
  );
}

/** Picker de color con label */
function ColorPickerField({ label, value, onChange }) {
  return (
    <div className="min-w-0">
      <p className="text-xs text-slate-500 mb-1 truncate">{label}</p>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={onChange}
          className="h-9 w-10 rounded-lg border border-slate-200 dark:border-slate-600 cursor-pointer p-0.5 flex-shrink-0"
        />
        <input
          type="text"
          maxLength={7}
          value={value}
          onChange={onChange}
          className="flex-1 min-w-0 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-2 py-1.5 text-xs font-mono text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>
    </div>
  );
}

/** Sección de degradado de fondo */
function GradientSection({ color1, color2, direction, onColor1, onColor2, onDirection, inputCls }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
        Color de Fondo
      </label>
      <div
        className="w-full h-8 rounded-xl mb-3 border border-slate-200 dark:border-slate-600"
        style={{ background: `linear-gradient(${direction}, ${color1}, ${color2})` }}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <ColorPickerField label="Color 1" value={color1} onChange={onColor1} />
        <ColorPickerField label="Color 2 (degradado)" value={color2} onChange={onColor2} />
      </div>
      <div>
        <p className="text-xs text-slate-500 mb-1">Dirección del degradado</p>
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-1.5">
          {GRADIENT_DIRS.map((d) => (
            <button
              key={d.value}
              type="button"
              onClick={() => onDirection(d.value)}
              className={`rounded-full px-2.5 sm:px-3 py-1.5 sm:py-1 text-xs font-semibold transition border text-center truncate ${direction === d.value ? "bg-orange-500 text-white border-orange-500" : "bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-orange-400"}`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Aviso cuando los colores están desactivados por imagen de fondo */
function BgImageNotice() {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 px-4 py-3 text-sm text-blue-700 dark:text-blue-300">
      <span>🖼️</span>
      <span>Los colores de fondo están desactivados porque hay una imagen de fondo cargada.</span>
    </div>
  );
}

/**
 * Zona de imagen con opacidad y campo ALT text.
 * El campo ALT se deshabilita si no hay imagen cargada.
 */
function ImageSlot({ label, hint, preview, opacity, alt, altMax = 80, onFile, onDrop, onRemove, onOpacity, onAlt }) {
  const hasImage = !!preview;
  const altLen   = alt?.length ?? 0;

  return (
    <div className="space-y-3">
      <ImageUploadZone
        label={label}
        preview={preview}
        onFile={onFile}
        onDrop={onDrop}
        onRemove={onRemove}
      />

      {hint && <p className="text-xs text-slate-500">{hint}</p>}

      {/* Opacidad */}
      <div>
        <div className="flex justify-between text-xs text-slate-500 mb-0.5">
          <span>Opacidad</span>
          <span>{opacity}%</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={opacity}
          onChange={(e) => onOpacity(Number(e.target.value))}
          className="w-full accent-orange-500"
        />
      </div>

      {/* Alt Text */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <label className={`text-xs font-semibold ${hasImage ? "text-slate-600 dark:text-slate-400" : "text-slate-400 dark:text-slate-600"}`}>
            Texto Alt (SEO)
          </label>
          <span className={`text-xs ${altLen > altMax * 0.9 ? "text-red-500" : "text-slate-400"} ${!hasImage ? "opacity-40" : ""}`}>
            {altLen}/{altMax}
          </span>
        </div>
        <input
          type="text"
          maxLength={altMax}
          value={alt}
          onChange={onAlt}
          disabled={!hasImage}
          placeholder={hasImage ? "Describe la imagen para SEO…" : "Sube una imagen para habilitar"}
          className={`w-full rounded-xl border px-3 py-2 text-sm outline-none transition
            ${hasImage
              ? "border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-orange-400"
              : "border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
            }`}
        />
      </div>
    </div>
  );
}

/** Zona de drag & drop para subir imagen */
function ImageUploadZone({ label, preview, onFile, onDrop, onRemove }) {
  const [fileKey, setFileKey] = useState(0);

  const handleRemove = (e) => {
    e.preventDefault(); e.stopPropagation();
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
            <img
              src={preview}
              alt="preview"
              className="max-h-24 max-w-full object-contain rounded-xl"
              loading="lazy"
              decoding="async"
            />
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