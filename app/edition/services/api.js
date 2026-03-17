import apiClient from "./apiClient";

const Api = {
  getBlogs: () => apiClient.get("/blogs").then((r) => r.data),
  getBlogById: (id) => apiClient.get(`/blogs/${id}`).then((r) => r.data?.data),
  createBlog: (formData) =>
    apiClient.post("/blog", formData).then((r) => r.data),
  updateBlog: (id, formData) =>
    apiClient.put(`/blog/${id}`, formData).then((r) => r.data),
  deleteBlog: (id) => apiClient.delete(`/blog/${id}`).then((r) => r.data),

  getHeader: (id) =>
    apiClient.get(`/blog_head/${id}`).then((r) => r.data?.data),
  createHeader: (formData) =>
    apiClient.post("/blog_head", formData).then((r) => r.data),
  updateHeader: (id, formData) =>
    apiClient.put(`/blog_head/${id}`, formData).then((r) => r.data),
  deleteHeader: (id) =>
    apiClient.delete(`/blog_head/${id}`).then((r) => r.data),

  getFooter: (id) =>
    apiClient.get(`/blog_footer/${id}`).then((r) => r.data?.data),
  createFooter: (formData) =>
    apiClient.post("/blog_footer", formData).then((r) => r.data),
  updateFooter: (id, formData) =>
    apiClient.put(`/blog_footer/${id}`, formData).then((r) => r.data),
  deleteFooter: (id) =>
    apiClient.delete(`/blog_footer/${id}`).then((r) => r.data),

  getBody: (id) => apiClient.get(`/blog_body/${id}`).then((r) => r.data?.data),
  createBody: (formData) =>
    apiClient.post("/blog_body", formData).then((r) => r.data),
  updateBody: (id, formData) =>
    apiClient.put(`/blog_body/${id}`, formData).then((r) => r.data),
  deleteBody: (id) => apiClient.delete(`/blog_body/${id}`).then((r) => r.data),

  getCommendTarjeta: (id) =>
    apiClient.get(`/commend_tarjeta/${id}`).then((r) => r.data?.data),
  createCommendTarjeta: (formData) =>
    apiClient.post("/commend_tarjeta", formData).then((r) => r.data),
  updateCommendTarjeta: (id, formData) =>
    apiClient.put(`/commend_tarjeta/${id}`, formData).then((r) => r.data),
  deleteCommendTarjeta: (id) =>
    apiClient.delete(`/commend_tarjeta/${id}`).then((r) => r.data),

  getTarjetas: () => apiClient.get("/tarjetas").then((r) => r.data),
  getTarjetaById: (id) =>
    apiClient.get(`/tarjeta/${id}`).then((r) => r.data?.data),
  createTarjeta: (formData) =>
    apiClient.post("/tarjeta", formData).then((r) => r.data),
  updateTarjeta: (id, formData) =>
    apiClient.put(`/tarjeta/${id}`, formData).then((r) => r.data),
  deleteTarjeta: (id) => apiClient.delete(`/tarjeta/${id}`).then((r) => r.data),

  getCards: () => apiClient.get("/cards").then((r) => r.data),
  createCard: (formData) =>
    apiClient.post("/card", formData).then((r) => r.data),
  updateCard: (id, formData) =>
    apiClient.put(`/card/${id}`, formData).then((r) => r.data),
  deleteCard: (id) => apiClient.delete(`/card/${id}`).then((r) => r.data),
};

export default Api;
