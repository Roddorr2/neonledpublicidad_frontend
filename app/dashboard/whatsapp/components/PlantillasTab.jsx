'use client';

import { useState, useEffect, useMemo } from 'react';
import Swal from 'sweetalert2';
import { apiRequest } from '@/api/fetchApiWhatsApp';
import { PlantillasTipoSelector } from './PlantillasTipoSelector';
import { PlantillasList } from './PlantillasList';
import { PlantillaEditor } from './PlantillaEditor';
import { PlantillaPreview } from './PlantillaPreview';
import servicesList from '../data/servicesList';

export function PlantillasTab() {
  const [tipo, setTipo] = useState('whatsapp'); // "whatsapp" | "email"
  const [plantillas, setPlantillas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPlantilla, setSelectedPlantilla] = useState(null);
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [saving, setSaving] = useState(false);

  const servicios = useMemo(
    () =>
      servicesList.map((s) => ({
        ...s,
        id: parseInt(s.id.replace('p', '')),
        nombre: s.name,
      })),
    [],
  );

  // Cargar plantillas cuando cambia el tipo
  useEffect(() => {
    loadPlantillas();
  }, [tipo]);

  // Actualizar formData cuando cambia la plantilla seleccionada
  useEffect(() => {
    if (selectedPlantilla) {
      setFormData({
        id: getPlantillaId(selectedPlantilla),
        id_servicio: selectedPlantilla.id_servicio,
        numero_plantilla: selectedPlantilla.numero_plantilla,
        ...(tipo === 'whatsapp'
          ? {
              mensaje: selectedPlantilla.mensaje || '',
              imagen_url: selectedPlantilla.imagen_url || '',
            }
          : {
              asunto: selectedPlantilla.asunto || '',
              encabezado: selectedPlantilla.encabezado || '',
              mensaje: selectedPlantilla.mensaje || '',
              imagen_url: selectedPlantilla.imagen_url || '',
              mensaje_boton: selectedPlantilla.mensaje_boton || '',
              url_boton: selectedPlantilla.url_boton || '',
              footer: selectedPlantilla.footer || '',
              red_facebook: selectedPlantilla.red_facebook || '',
              red_instagram: selectedPlantilla.red_instagram || '',
              red_linkedin: selectedPlantilla.red_linkedin || '',
              red_tiktok: selectedPlantilla.red_tiktok || '',
            }),
      });
      setImagePreview(selectedPlantilla.imagen_url || null);
      setImageFile(null);
    } else {
      setFormData({});
      setImagePreview(null);
      setImageFile(null);
    }
  }, [selectedPlantilla, tipo]);

  const loadPlantillas = async () => {
    setLoading(true);
    try {
      const res = await apiRequest(`/api/plantillas/${tipo}`, {
        method: 'GET',
      });

      if (res.success && res.data) {
        setPlantillas(res.data);
      } else {
        console.error('Error cargando plantillas:', res.message);
        Swal.fire(
          'Error',
          res.message || 'No se pudieron cargar las plantillas',
          'error',
        );
      }
    } catch (error) {
      console.error('Error en loadPlantillas:', error);
      Swal.fire('Error', 'Error de conexión al cargar plantillas', 'error');
    } finally {
      setLoading(false);
    }
  };

  const getPlantillaId = (plantilla) => {
    if (!plantilla) return null;
    return tipo === 'whatsapp'
      ? plantilla.id_plantilla_whatsapp
      : plantilla.id_plantilla_email;
  };

  const handleSelectPlantilla = (plantilla) => {
    setSelectedPlantilla(plantilla);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const insertPlaceholder = (field) => {
    const currentValue = formData[field] || '';
    handleInputChange(field, currentValue + ' {nombre}');
  };

  const hasNombrePlaceholder = (text) => {
    return text && text.includes('{nombre}');
  };

  const handleImageChange = (file) => {
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

    // Preview local
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleImageChange(e.dataTransfer?.files?.[0]);
  };

  const handleSave = async () => {
    if (!selectedPlantilla) {
      Swal.fire('Error', 'Selecciona una plantilla para editar', 'warning');
      return;
    }

    // Validaciones básicas
    if (tipo === 'whatsapp') {
      if (!formData.mensaje || formData.mensaje.trim().length < 10) {
        Swal.fire(
          'Error',
          'El mensaje debe tener al menos 10 caracteres',
          'warning',
        );
        return;
      }
    } else {
      if (!formData.asunto || formData.asunto.trim().length < 3) {
        Swal.fire(
          'Error',
          'El asunto debe tener al menos 3 caracteres',
          'warning',
        );
        return;
      }
      if (!formData.encabezado || formData.encabezado.trim().length < 5) {
        Swal.fire(
          'Error',
          'El encabezado debe tener al menos 5 caracteres',
          'warning',
        );
        return;
      }
      if (!formData.mensaje || formData.mensaje.trim().length < 10) {
        Swal.fire(
          'Error',
          'El mensaje debe tener al menos 10 caracteres',
          'warning',
        );
        return;
      }
    }

    setSaving(true);

    try {
      const form = new FormData();

      // Campos comunes
      if (tipo === 'whatsapp') {
        form.append('mensaje', formData.mensaje);
        if (!imageFile && formData.imagen_url) {
          form.append('imagen_url_actual', formData.imagen_url);
        }
      } else {
        form.append('asunto', formData.asunto);
        form.append('encabezado', formData.encabezado);
        form.append('mensaje', formData.mensaje);
        form.append('mensaje_boton', formData.mensaje_boton || '');
        form.append('url_boton', formData.url_boton || '');
        form.append('footer', formData.footer || '');
        form.append('red_facebook', formData.red_facebook || '');
        form.append('red_instagram', formData.red_instagram || '');
        form.append('red_linkedin', formData.red_linkedin || '');
        form.append('red_tiktok', formData.red_tiktok || '');
        if (!imageFile && formData.imagen_url) {
          form.append('imagen_url_actual', formData.imagen_url);
        }
      }

      // Imagen (si se cambió)
      if (imageFile) {
        form.append('imagen', imageFile);
      }

      const plantillaId = getPlantillaId(selectedPlantilla);
      const res = await apiRequest(
        `/api/plantillas/${tipo}/${plantillaId}/actualizar`,
        {
          method: 'POST',
          body: form,
        },
      );

      if (res.success) {
        Swal.fire('¡Éxito!', 'Plantilla actualizada correctamente', 'success');
        await loadPlantillas();

        // Actualizar la plantilla seleccionada con los nuevos datos
        const selectedId = getPlantillaId(selectedPlantilla);
        const updatedPlantilla = plantillas.find(
          (p) => getPlantillaId(p) === selectedId,
        );
        if (updatedPlantilla) {
          setSelectedPlantilla({ ...updatedPlantilla, ...res.data });
        }
      } else {
        Swal.fire(
          'Error',
          res.message || 'No se pudo actualizar la plantilla',
          'error',
        );
      }
    } catch (error) {
      console.error('Error en handleSave:', error);
      Swal.fire('Error', 'Error de conexión al guardar', 'error');
    } finally {
      setSaving(false);
    }
  };

  const getNombreServicio = (id_servicio) => {
    const servicio = servicios.find((s) => s.id === id_servicio);
    return servicio ? servicio.nombre : `Servicio ${id_servicio}`;
  };

  const getTiempoEnvio = (numero_plantilla) => {
    switch (numero_plantilla) {
      case 1:
        return 'Inmediato';
      case 2:
        return '+30 minutos';
      case 3:
        return '+1 horas';
      default:
        return `Plantilla ${numero_plantilla}`;
    }
  };

  return (
    <div className="space-y-6">
      <PlantillasTipoSelector
        tipo={tipo}
        setTipo={setTipo}
        setSelectedPlantilla={setSelectedPlantilla}
      />

      <div className="grid gap-6 lg:grid-cols-12">
        <PlantillasList
          tipo={tipo}
          loading={loading}
          servicios={servicios}
          plantillas={plantillas}
          selectedPlantilla={selectedPlantilla}
          handleSelectPlantilla={handleSelectPlantilla}
          getPlantillaId={getPlantillaId}
          getTiempoEnvio={getTiempoEnvio}
        />

        <PlantillaEditor
          tipo={tipo}
          selectedPlantilla={selectedPlantilla}
          saving={saving}
          handleSave={handleSave}
          formData={formData}
          handleInputChange={handleInputChange}
          insertPlaceholder={insertPlaceholder}
          hasNombrePlaceholder={hasNombrePlaceholder}
          handleDrop={handleDrop}
          handleImageChange={handleImageChange}
          imagePreview={imagePreview}
          imageFile={imageFile}
          getNombreServicio={getNombreServicio}
          getTiempoEnvio={getTiempoEnvio}
        />

        <PlantillaPreview
          tipo={tipo}
          selectedPlantilla={selectedPlantilla}
          formData={formData}
          imagePreview={imagePreview}
        />
      </div>
    </div>
  );
}
