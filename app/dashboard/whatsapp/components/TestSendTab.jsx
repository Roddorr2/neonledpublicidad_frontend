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
        step_1_endpoint: '/api/whatsapp/campaign/create',
        step_2_endpoint: '/api/whatsapp/campaign/{id}/start',
        content_type: 'multipart/form-data',
        fase: 'FASE 2 - FIFO Campaign System',
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
      const previewRes = await apiRequest(
        `/api/whatsapp/campaign/preview/${service}`,
      );
      const totalDestinatarios = Number(previewRes?.data?.total_destinatarios);
      const estimatedDays =
        Number.isFinite(totalDestinatarios) && totalDestinatarios > 0
          ? Math.max(1, Math.ceil(totalDestinatarios / 50))
          : null;

      // Mostrar confirmación (aún no se envia nada al backend)
      const confirmStart = await Swal.fire({
        title: 'Confirmar campaña',
        html: `
          <p>Esta campaña tiene <strong>${totalDestinatarios > 0 ? totalDestinatarios : '?'}</strong> destinatarios.</p>
          <p class="mt-1">Duración estimada - Sin interrupciones: <strong>${estimatedDays ?? '?'} día(s)</strong> (50 envíos/día).</p>
        `,
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#1157D3',
      });

      if (!confirmStart.isConfirmed) {
        // El usuario canceló - no se crea nada
        return;
      }

      // Recién ahora crear la campaña como borrador
      const formData = new FormData();
      formData.append('service', service);
      formData.append('paragraph', paragraph);
      formData.append('image', imageFile);

      const createRes = await apiRequest('/api/whatsapp/campaign/create', {
        method: 'POST',
        body: formData,
      });

      if (!createRes?.success) {
        setLastResponse(createRes);
        Swal.fire(
          'Error al crear',
          createRes?.message || 'No se pudo crear la campaña en borrador.',
          'error',
        );
        return;
      }

      const campaniaId = createRes.data?.campania_id;

      // PASO 3: iniciar la campaña (FIFO)
      const startRes = await apiRequest(
        `/api/whatsapp/campaign/${campaniaId}/start`,
        {
          method: 'POST',
        },
      );

      setLastResponse({
        preview: previewRes,
        create: createRes,
        start: startRes,
      });

      if (startRes?.success) {
        Swal.fire({
          title: 'Campaña iniciada',
          html: `
            <p>Campaña #${campaniaId}</p>
            <p>Total destinatarios: ${createRes.data?.total_destinatarios ?? totalDestinatarios ?? '?'}</p>
            <p class="text-xs text-slate-500 mt-2">✅ Sistema FIFO activo - Solo una campaña a la vez</p>
          `,
          icon: 'success',
          confirmButtonColor: '#1157D3',
        });
      } else {
        // Si falló al iniciar, pero la campaña se creó
        if (startRes?.active_campaign) {
          Swal.fire({
            title: 'Campaña creada en borrador',
            html: `
              <p>La campaña #${campaniaId} se creó correctamente.</p>
              <p class="text-sm text-rose-600 mt-2">⚠️ No se pudo iniciar porque hay otra campaña activa:</p>
              <p class="text-xs mt-1">Campaña #${startRes.active_campaign?.id} - ${startRes.active_campaign?.estado} - ${startRes.active_campaign?.progreso}%</p>
            `,
            icon: 'info',
            confirmButtonColor: '#1157D3',
          });
        } else {
          Swal.fire(
            'Error al iniciar',
            startRes?.message || 'La campaña se creó pero no se pudo iniciar.',
            'error',
          );
        }
      }
    } catch (error) {
      console.error(error);
      Swal.fire(
        'Error',
        'No se pudo crear/iniciar la campaña. Revisa Network/Console.',
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

        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 dark:border-slate-700 dark:bg-slate-800/60">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Crear e Iniciar Campaña
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Crea campaña en borrador y luego la inicia (sistema FIFO).
              </p>
            </div>

            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
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
            <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">
              Servicio
            </label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-azul-principal focus:ring-4 focus:ring-azul-principal/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            >
              <option value="">--- Selecciona una opción ---</option>
              {services.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>

            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              El backend valida: service ∈ (p1,p2,p3,p4) y lo mapea a
              id_servicio.
            </p>
          </div>

          {/* Párrafo */}
          <div className="mt-6">
            <label className="block text-sm font-semibold text-slate-900 dark:text-slate-100">
              Párrafo (mínimo 10 caracteres)
            </label>
            <textarea
              value={paragraph}
              onChange={(e) => setParagraph(e.target.value)}
              rows={5}
              className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-azul-principal focus:ring-4 focus:ring-azul-principal/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
              placeholder="Escribe el mensaje común para la campaña..."
            />
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">
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
          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-6 dark:border-slate-700 dark:bg-slate-900/50">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Imagen <span className="text-rose-500">*</span>
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
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
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
                  >
                    Quitar
                  </button>
                </div>
              ) : (
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  Sin imagen
                </span>
              )}
            </div>

            <div
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDrop={handleDrop}
              className="mt-4 rounded-2xl border-2 border-dashed border-slate-200 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="mx-auto flex max-w-md flex-col items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-700">
                  <UploadIcon />
                </div>

                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Arrastra tu imagen aquí o{' '}
                  <label className="cursor-pointer font-semibold text-azul-principal hover:text-azul-cobalto">
                    haz click para subir
                    <input
                      type="file"
                      className="hidden"
                      accept=".webp,image/webp,.jpg,.jpeg,.png"
                      onChange={(e) => pickFile(e.target.files?.[0])}
                    />
                  </label>
                </p>

                <p className="text-xs text-slate-500 dark:text-slate-400">
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
                  ? 'bg-azul-principal hover:bg-azul-cobalto active:opacity-80'
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
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-8 py-3 text-sm font-semibold text-white hover:bg-slate-800 active:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 dark:active:bg-slate-700"
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
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/50">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Payload preview
              </p>
              <pre className="mt-3 overflow-auto rounded-xl bg-white p-3 text-xs text-slate-700 border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                {JSON.stringify(payloadPreview, null, 2)}
              </pre>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                Nota: el envío real es multipart/form-data (no JSON).
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/50">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Última respuesta
              </p>
              <pre className="mt-3 overflow-auto rounded-xl bg-white p-3 text-xs text-slate-700 border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
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
