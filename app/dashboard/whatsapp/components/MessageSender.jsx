'use client';
import { useState, useRef, useEffect } from 'react';
// import "./MessageSender.css"; // We'll create a new CSS file with prefixed classes
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';

const MessageSender = ({ isConnected, onMessageSent, apiBaseUrl, token }) => {
  const [formData, setFormData] = useState({
    telefono: '',
    templateOption: '',
    messageType: '1',
    nombre: '',
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [messagePreview, setMessagePreview] = useState('');

  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/templates`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Error al cargar plantillas');

        const data = await response.json();
        setTemplates(data);

        if (data.length > 0) {
          setFormData((prev) => ({
            ...prev,
            templateOption: data[0].id,
          }));
        }
      } catch (err) {
        setError('No se pudieron cargar las plantillas');
      }
    };

    if (token) {
      fetchTemplates();
    }
  }, [apiBaseUrl, token]);

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const updatedData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedData);

    if (
      name === 'nombre' ||
      name === 'templateOption' ||
      name === 'messageType'
    ) {
      generateMessagePreview(
        updatedData.templateOption,
        updatedData.nombre,
        updatedData.messageType,
      );
    }
  };

  // Generar preview del mensaje de texto
  const generateMessagePreview = (templateId, nombre, messageType) => {
    if (!templateId || !nombre) {
      setMessagePreview('');
      return;
    }

    const template = templates.find((t) => t.id == templateId);
    if (!template) return;

    const message = template.messages?.[messageType];
    if (!message?.text) {
      setMessagePreview('');
      return;
    }

    const finalText = message.text.replace('{nombre}', nombre);
    setMessagePreview(finalText);
  };

  // Manejar cambio de archivo
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setFile(null);
      setPreview(null);
    }
  };

  // Validar formulario
  const validateForm = () => {
    if (!formData.telefono.trim()) {
      setError('El número de teléfono es requerido');
      return false;
    }

    if (!formData.nombre.trim()) {
      setError('El nombre del cliente es requerido');
      return false;
    }

    // Validar formato de teléfono
    const cleantelefono = formData.telefono.replace(/\D/g, '');
    if (cleantelefono.length < 10 || cleantelefono.length > 15) {
      setError('El número de teléfono debe tener entre 10 y 15 dígitos');
      return false;
    }

    return true;
  };

  // Enviar mensaje
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isConnected) {
      setError('Debes estar conectado a WhatsApp para enviar mensajes');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const bodyToSend = new FormData();

      bodyToSend.append('telefono', formData.telefono);
      bodyToSend.append('templateOption', formData.templateOption);
      bodyToSend.append('messageType', formData.messageType);
      bodyToSend.append('nombre', formData.nombre);

      if (file) {
        bodyToSend.append('image', file);
      }

      const response = await fetch(`${apiBaseUrl}/api/send-message-image`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: bodyToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          const errorMessages = data.errors
            .map((err) => `${err.field}: ${err.message}`)
            .join(', ');
          throw new Error(errorMessages);
        }
        throw new Error(data.message || 'Error al enviar mensaje');
      }

      setSuccess(`Mensaje enviado exitosamente a ${formData.telefono}`);

      // Limpiar formulario
      setFormData({
        telefono: '51',
        templateOption: templates.length > 0 ? templates[0].id : '',
        messageType: '1',
        nombre: '',
      });

      setFile(null);
      setPreview(null);
      setMessagePreview('');

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      onMessageSent(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Limpiar mensajes
  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  return (
    <div className="wa-message-sender">
      <h2>📱 Enviar Mensaje WhatsApp con Imagen</h2>

      {!isConnected && (
        <div className="wa-warning-message">
          ⚠️ Debes estar conectado a WhatsApp para enviar mensajes
        </div>
      )}

      {error && (
        <div className="wa-error-message" onClick={clearMessages}>
          ❌ {error}
          <span className="wa-close-btn">×</span>
        </div>
      )}

      {success && (
        <div className="wa-success-message" onClick={clearMessages}>
          ✅ {success}
          <span className="wa-close-btn">×</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="wa-message-form">
        <div className="wa-form-group">
          <label htmlFor="telefono">📞 Número de Teléfono *</label>

          <PhoneInput
            country={'pe'}
            value={formData.telefono}
            onChange={(value) => setFormData({ ...formData, telefono: value })}
            inputProps={{
              name: 'telefono',
              required: true,
              disabled: loading || !isConnected,
            }}
            enableSearch={true}
            containerClass="wa-phone-input-container"
            inputClass="wa-phone-input"
            buttonClass="wa-phone-flag"
          />

          <small>Selecciona país y escribe solo números</small>
        </div>

        <div className="wa-form-group">
          <label htmlFor="templateOption">📝 Tipo de mensaje *</label>

          <select
            id="templateOption"
            name="templateOption"
            value={formData.templateOption}
            onChange={handleInputChange}
            disabled={loading || !isConnected}
            required
          >
            <option value="">-- Selecciona un tipo --</option>

            {templates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            ))}
          </select>

          {templates.length === 0 && <small>Cargando plantillas...</small>}
        </div>

        <div className="wa-form-group">
          <label htmlFor="nombre">👨‍⚕️ Nombre del Cliente *</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            placeholder="Nombre completo del cliente"
            disabled={loading || !isConnected}
            required
          />
        </div>

        <div className="wa-form-group">
          <label htmlFor="image">🖼️ Subir Imagen</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            disabled={loading || !isConnected}
            ref={fileInputRef}
          />

          {/* Preview con botón X */}
          {preview && (
            <div
              className="wa-image-preview"
              style={{ position: 'relative', display: 'inline-block' }}
            >
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  setPreview(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                  }
                }}
                style={{
                  position: 'absolute',
                  top: '5px',
                  right: '5px',
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  lineHeight: '22px',
                  textAlign: 'center',
                }}
              >
                ✖
              </button>
              <img
                src={preview}
                alt="Vista previa de la imagen"
                style={{
                  maxWidth: '250px',
                  margin: '10px auto',
                  borderRadius: '8px',
                  display: 'block',
                }}
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="wa-btn wa-btn-primary"
          disabled={loading || !isConnected}
        >
          {loading ? '⏳ Enviando...' : '📤 Enviar Mensaje'}
        </button>
      </form>

      {messagePreview && (
        <div className="wa-message-preview">
          <h3>👀 Vista Previa del Mensaje</h3>
          <div className="wa-preview-content">
            <pre>{messagePreview}</pre>
          </div>
          <div className="wa-preview-info">
            <span>
              📱 Destinatario: {formData.telefono || 'No especificado'}
            </span>
            <span>📊 Caracteres: {messagePreview.length}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageSender;