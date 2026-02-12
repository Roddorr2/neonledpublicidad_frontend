'use client';

import { useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import { apiRequest } from '@/api/fetchApiWhatsApp';
import { Card, CardTitle, UploadIcon } from './TabButton';

export function TestSendTab({ services, isConnected, connectedNumber }) {
  const [service, setService] = useState('');
  const [paragraph, setParagraph] = useState(
    'Hola 👋 Esta es una campaña de prueba con payload común.',
  );
  const [imageFile, setImageFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [lastResponse, setLastResponse] = useState(null);

  const serviceIdAsNumber = useMemo(() => {
    // p1/p2/p3/p4 => 1/2/3/4 (solo para preview)
    if (!service) return null;
    const n = Number(String(service).replace('p', ''));
    return Number.isFinite(n) ? n : null;
  }, [service]);

  const canSend = Boolean(
    isConnected &&
    service &&
    paragraph.trim().length >= 10 &&
    imageFile &&
    !loading,
  );

  const payloadPreview = useMemo(() => {
    return {
      service,
      id_servicio_preview: serviceIdAsNumber,
      paragraph,
      image: imageFile
        ? { name: imageFile.name, size: imageFile.size, type: imageFile.type }
        : null,
      meta: {
        connected_as: connectedNumber || null,
        endpoint: '/api/whatsapp/campaign/activate',
        content_type: 'multipart/form-data',
      },
    };
  }, [service, serviceIdAsNumber, paragraph, imageFile, connectedNumber]);

  const pickFile = (file) => {
    if (!file) return;

    const max2mb = 2 * 1024 * 1024;
    if (file.size > max2mb) {
      Swal.fire('Imagen muy pesada', 'Debe ser menor a 2MB.', 'warning');
      return;
    }

    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.type)) {
      Swal.fire('Formato no permitido', 'Usa JPG, PNG o WEBP.', 'warning');
      return;
    }

    setImageFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    pickFile(e.dataTransfer?.files?.[0]);
  };

  const handleActivateReal = async () => {
    if (!isConnected) {
      Swal.fire('Sin conexión', 'Conecta WhatsApp antes de probar.', 'warning');
      return;
    }
    if (!service) {
      Swal.fire(
        'Falta servicio',
        'Selecciona un servicio (p1..p4).',
        'warning',
      );
      return;
    }
    if (paragraph.trim().length < 10) {
      Swal.fire(
        'Texto corto',
        'El párrafo debe tener al menos 10 caracteres.',
        'warning',
      );
      return;
    }
    if (!imageFile) {
      Swal.fire(
        'Falta imagen',
        'Sube una imagen para la campaña (<=2MB).',
        'warning',
      );
      return;
    }

    setLoading(true);
    setLastResponse(null);

    try {
      const formData = new FormData();
      formData.append('service', service);
      formData.append('paragraph', paragraph);
      formData.append('image', imageFile);

      // IMPORTANTE: no seteamos Content-Type manualmente
      const res = await apiRequest('/api/whatsapp/campaign/activate', {
        method: 'POST',
        body: formData,
      });

      setLastResponse(res);

      if (res?.success) {
        Swal.fire({
          title: 'Campaña iniciada',
          text: `Campaña #${res.data?.campania_id} - Total: ${res.data?.total_destinatarios ?? '?'}`,
          icon: 'success',
          confirmButtonColor: 'rgba(140,82,255,1)',
        });
      } else {
        Swal.fire(
          'Error',
          res?.message || 'No se pudo iniciar la campaña.',
          'error',
        );
      }
    } catch (error) {
      console.error(error);
      Swal.fire(
        'Error',
        'No se pudo iniciar la campaña. Revisa Network/Console.',
        'error',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-6">
      <Card>
        <CardTitle>Prueba</CardTitle>

        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Activar campaña (real)
              </p>
              <p className="text-xs text-slate-500">
                Este tab llama al backend y crea la campaña (Cloudinary + Job
                Queue).
              </p>
            </div>

            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-600">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  isConnected ? 'bg-emerald-500' : 'bg-rose-500'
                }`}
              />
              {isConnected
                ? `Conectado${connectedNumber ? ` (${connectedNumber})` : ''}`
                : 'Desconectado'}
            </span>
          </div>

          {/* Servicio */}
          <div className="mt-6">
            <label className="mb-2 block text-sm font-semibold text-slate-800">
              Servicio
            </label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-[rgba(140,82,255,1)] focus:ring-4 focus:ring-[rgba(140,82,255,0.18)]"
            >
              <option value="">--- Selecciona una opción ---</option>
              {services.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>

            <p className="mt-2 text-xs text-slate-500">
              El backend valida: service ∈ (p1,p2,p3,p4) y lo mapea a
              id_servicio.
            </p>
          </div>

          {/* Párrafo */}
          <div className="mt-6">
            <label className="block text-sm font-semibold text-slate-900">
              Párrafo (mínimo 10 caracteres)
            </label>
            <textarea
              value={paragraph}
              onChange={(e) => setParagraph(e.target.value)}
              rows={5}
              className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-[rgba(140,82,255,1)] focus:ring-4 focus:ring-[rgba(140,82,255,0.18)]"
              placeholder="Escribe el mensaje común para la campaña..."
            />
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-slate-500">
                Se enviará como “paragraph”.
              </span>
              <span
                className={
                  paragraph.trim().length >= 10
                    ? 'text-emerald-600'
                    : 'text-rose-600'
                }
              >
                {paragraph.trim().length}/10
              </span>
            </div>
          </div>

          {/* Upload Imagen */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Imagen <span className="text-rose-500">*</span>
                </p>
                <p className="text-xs text-slate-500">
                  JPG/PNG/WEBP - máximo 2MB.
                </p>
              </div>

              {imageFile ? (
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    {imageFile.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => setImageFile(null)}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    Quitar
                  </button>
                </div>
              ) : (
                <span className="text-xs text-slate-400">Sin imagen</span>
              )}
            </div>

            <div
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDrop={handleDrop}
              className="mt-4 rounded-2xl border-2 border-dashed border-slate-200 bg-white p-8 text-center"
            >
              <div className="mx-auto flex max-w-md flex-col items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
                  <UploadIcon />
                </div>

                <p className="text-sm text-slate-700">
                  Arrastra tu imagen aquí o{' '}
                  <label className="cursor-pointer font-semibold text-[rgba(140,82,255,1)] hover:text-[rgba(140,82,255,0.9)]">
                    haz click para subir
                    <input
                      type="file"
                      className="hidden"
                      accept=".webp,image/webp,.jpg,.jpeg,.png"
                      onChange={(e) => pickFile(e.target.files?.[0])}
                    />
                  </label>
                </p>

                <p className="text-xs text-slate-500">
                  El backend valida:
                  image|required|mimes:jpg,jpeg,png,webp|max:2048
                </p>
              </div>
            </div>
          </div>

          {/* Acciones */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              onClick={handleActivateReal}
              disabled={!canSend}
              className={[
                'inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-semibold text-white',
                canSend
                  ? 'bg-[rgba(140,82,255,1)] hover:bg-[rgba(140,82,255,0.9)] active:bg-[rgba(140,82,255,0.8)]'
                  : 'bg-slate-300 cursor-not-allowed',
              ].join(' ')}
            >
              {loading ? 'Activando...' : 'Activar Campaña'}
            </button>

            <button
              type="button"
              onClick={() => {
                setService('');
                setParagraph(
                  'Hola 👋 Esta es una campaña de prueba con payload común.',
                );
                setImageFile(null);
                setLastResponse(null);
              }}
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-8 py-3 text-sm font-semibold text-white hover:bg-slate-800 active:bg-slate-900"
            >
              Reset
            </button>
          </div>

          {!isConnected && (
            <p className="mt-4 text-xs text-rose-600">
              Conecta WhatsApp primero (tab “Conexión”).
            </p>
          )}

          {/* Debug: payload + response */}
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">
                Payload preview
              </p>
              <pre className="mt-3 overflow-auto rounded-xl bg-white p-3 text-xs text-slate-700 border border-slate-200">
                {JSON.stringify(payloadPreview, null, 2)}
              </pre>
              <p className="mt-2 text-xs text-slate-500">
                Nota: el envío real es multipart/form-data (no JSON).
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">
                Última respuesta
              </p>
              <pre className="mt-3 overflow-auto rounded-xl bg-white p-3 text-xs text-slate-700 border border-slate-200">
                {lastResponse
                  ? JSON.stringify(lastResponse, null, 2)
                  : '// Sin respuesta aún'}
              </pre>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}
