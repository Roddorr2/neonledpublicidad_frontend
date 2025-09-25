import axios from "axios";
import url from "../../../../api/url";
import { getCookie } from "cookies-next";

const Fetch = {
  fetchBlogs: async function fetchBlogs() {
    try {
      const response = await axios.get(`${url}/api/blogs/`);
      console.log(response);
      if (response.status === 200) {
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  fetchBlogById: async function fetchBlogById(id) {
    try {
      const response = await axios.get(`${url}/api/blogs/${id}`);
      console.log(response);
      if (response.status === 200) {
        return response.data.data;
      } else {
        return null;
      }
    } catch (error) {
      console.log(response.data.error);
      return null;
    }
  },

  fetchCards: async function fetchCards() {
    try {
      const response = await axios.get(`${url}/api/cards`);
      if (response.status === 200) {
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  fetchBlogHead: async function fetchBlogHead(id) {
    try {
      const response = await axios.get(`${url}/api/blog_head/${id}`);
      if (response.status === 200) {
        return response.data.data;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  fetchBlogFooter: async function fetchBlogFooter(id) {
    try {
      const response = await axios.get(`${url}/api/blog_footer/${id}`);
      if (response.status === 200) {
        return response.data.data;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  fetchBlogBodyById: async function fetchBlogBodyById(id) {
    try {
      const response = await axios.get(`${url}/api/blog_body/${id}`);
      console.log(response.data);
      if (response.status === 200) {
        return response.data.data;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  updateHeader: async function updateHeader(id, formData) {
    try {
      console.log(formData);

      const response = await axios.put(`${url}/api/blog_head/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  updateFooter: async function updateFooter(id, formData) {
    try {
      const response = await axios.put(
        `${url}/api/blog_footer/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        return response.data.id;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  updateBody: async function updateBody(id, formData) {
    try {
      const response = await axios.put(`${url}/api/blog_body/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        return response.data.id;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  updateCommendTarjeta: async function updateCommendTarjeta(id, formData) {
    try {
      const response = await axios.put(
        `${url}/api/commend_tarjeta/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        return response.data.id;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  updateTarjeta: async function updateTarjeta(id, formData) {
    try {
      const response = await axios.put(`${url}/api/tarjeta/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        return response.data.id;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  updateBlog: async function updateBlog(id, formData) {
    try {
      const response = await axios.put(`${url}/api/blog/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        return response.data.id;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  updateCard: async function updateCard(id, formData) {
    try {
      const response = await axios.put(`${url}/api/card/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        return response.data.id;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  saveImage: async function saveImage(formData, ruta) {
    try {
      for (let pair of formData.entries()) {
        console.log(pair[0] + ":", pair[1]);
      }

      const response = await axios.post(`${url}/api/${ruta}`, formData, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      return response; // ✅ en vez de response.data
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  deleteImagesCarpet: async function deleteImagesCarpet(id) {
    try {
      const response = await axios.delete(`${url}/api/delete_carpet/${id}`, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      });
      if (response.status === 200) {
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};

export default Fetch;
