import apiClient from "./apiClient";

const Cloud = {
  // Eliminar imagen de Cloudinary
  deleteImage: (public_id) =>
    apiClient.post("/delete_image", { public_id }).then((r) => r.data),

  // Eliminar múltiples imágenes
  deleteImages: (public_ids) =>
    apiClient.post("/delete_images", { public_ids }).then((r) => r.data),

  // Eliminar carpeta de imágenes
  deleteImagesCarpet: (id) =>
    apiClient.delete(`/delete_carpet/${id}`).then((r) => r.data),

  // Upload genérico de imagen con ruta dinámica
  uploadImage: (formData, ruta) =>
    apiClient
      .post(`/${ruta}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((r) => r.data),

  // ========== ENDPOINTS DEL CARDCONTROLLER ==========
  uploadCardHeaderImage: (cardId, formData) =>
    apiClient
      .post(`/card/blog/image_head/${cardId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((r) => r.data),

  uploadCardBodyImage: (cardId, formData) =>
    apiClient
      .post(`/card/blog/images_body/${cardId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((r) => r.data),

  uploadCardFooterImage: (cardId, formData) =>
    apiClient
      .post(`/card/blog/images_footer/${cardId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((r) => r.data),
};

export default Cloud;
