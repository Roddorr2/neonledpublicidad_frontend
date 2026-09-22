import axios from "axios";
import url from "../../../../api/url";
import { getCookie } from "cookies-next";

const isBlogMockMode = process.env.NEXT_PUBLIC_BLOG_MOCK === "true";

const mockCards = [
  {
    id_card: 1,
    id_plantilla: 1,
    titulo: "Techos LED para Gimnasios",
    public_image: "/blog/blog-4.webp",
    blog: {
      link: "mock-techos-led-gimnasios",
      head: {
        alt: "Techos LED para gimnasios",
        title: "Techos LED para gimnasios",
      },
    },
  },
  {
    id_card: 2,
    id_plantilla: 2,
    titulo: "Sillas luminosas para eventos",
    public_image: "/blog/blog-8.webp",
    blog: {
      link: "mock-sillas-luminosas-eventos",
      head: {
        alt: "Sillas luminosas para eventos",
        title: "Sillas luminosas para eventos",
      },
    },
  },
  {
    id_card: 3,
    id_plantilla: 3,
    titulo: "LED Pixel para Discotecas",
    public_image: "/blog/blog-10.webp",
    blog: {
      link: "mock-led-pixel-discotecas",
      head: {
        alt: "LED Pixel para discotecas",
        title: "LED Pixel para discotecas",
      },
    },
  },
  {
    id_card: 4,
    id_plantilla: 1,
    titulo: "Letras DyP de Lujo Dorado y Plateado",
    public_image: "/blog/blog-1.webp",
    blog: {
      link: "mock-letras-dyp-lujo",
      head: {
        alt: "Letras de lujo doradas y plateadas",
        title: "Letras de lujo doradas y plateadas",
      },
    },
  },
  {
    id_card: 5,
    id_plantilla: 2,
    titulo: "Letreros luminosos para marcas",
    public_image: "/blog/blog-14.webp",
    blog: {
      link: "mock-letreros-luminosos-marcas",
      head: {
        alt: "Letreros luminosos para marcas",
        title: "Letreros luminosos para marcas",
      },
    },
  },
  {
    id_card: 6,
    id_plantilla: 3,
    titulo: "Neon LED para restaurantes",
    public_image: "/blog/blog-12.webp",
    blog: {
      link: "mock-neon-led-restaurantes",
      head: {
        alt: "Neon LED para restaurantes",
        title: "Neon LED para restaurantes",
      },
    },
  },
];

const Fetch = {
  fetchBlogs: async function fetchBlogs() {
    try {
      const response = await axios.get(`${url}/api/blogs/`);

      if (response.status === 200) {
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      //console.log(error);
      return error;
    }
  },

  fetchBlogById: async function fetchBlogById(id) {
    try {
      const response = await axios.get(`${url}/api/blogs/${id}`);

      if (response.status === 200) {
        return response.data.data;
      } else {
        return null;
      }
    } catch (error) {
      //console.log(error.response?.data?.error || error.message);
      return error;
    }
  },

  fetchBlogByLink: async function fetchBlogByLink(link) {
    try {
      const response = await axios.get(`${url}/api/blogs/links/${link}`);
      if (response.status === 200 && response.data?.blog) {
        return response.data.blog;
      }

      return null;
    } catch (err) {
      console.error(`Error fetching blog ${link}: `, err.message);
      return null;
    }
  },

  fetchCards: async function fetchCards() {
    if (isBlogMockMode) {
      return mockCards;
    }

    try {
      const response = await axios.get(`${url}/api/cards_public`);
      if (response.status === 200) {
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      //console.log(error);
      return error;
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
      //console.log(error);
      return error;
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
      //console.log(error);
      return error;
    }
  },

  fetchBlogBodyById: async function fetchBlogBodyById(id) {
    try {
      const response = await axios.get(`${url}/api/blog_body/${id}`);
      if (response.status === 200) {
        return response.data.data;
      } else {
        return null;
      }
    } catch (error) {
      //console.log(error);
      return error;
    }
  },

  //Nueva función para obtener el historial de blogs

  fetchBlogAuditoria: async function fetchBlogAuditoria(page = 1) {
    try {
      const token = getCookie("token");

      if (!token) {
        console.warn("No se encontró token en cookies");
        // Devolvemos un paginator vacío para que el UI no se rompa
        return {
          data: [],
          current_page: 1,
          last_page: 1,
          total: 0,
          per_page: 20,
          from: null,
          to: null,
        };
      }

      const response = await axios.get(`${url}/api/blogs_auditoria`, {
        params: { page }, // <-- aquí va la magia
        headers: { Authorization: `Bearer ${token}` },
      });

      // Tu controller retorna: { status: 200, data: $auditorias }
      if (response.status === 200) {
        return response.data.data; // <-- esto es el paginator
      }

      return {
        data: [],
        current_page: 1,
        last_page: 1,
        total: 0,
        per_page: 20,
        from: null,
        to: null,
      };
    } catch (error) {
      const status = error.response?.status;

      // OJO: tu backend devuelve 404 si está vacío. Lo tratamos como "sin data".
      if (status === 404) {
        return {
          data: [],
          current_page: 1,
          last_page: 1,
          total: 0,
          per_page: 20,
          from: null,
          to: null,
        };
      }

      console.error("❌ Error al obtener auditoría:", status, error.message);

      return {
        data: [],
        current_page: 1,
        last_page: 1,
        total: 0,
        per_page: 20,
        from: null,
        to: null,
      };
    }
  },

  searchCards: async function searchCards(query, type = "public") {
    if (isBlogMockMode) {
      if (!query || !query.trim()) {
        return [];
      }

      const term = query.trim().toLowerCase();
      return mockCards.filter((card) =>
        card.titulo.toLowerCase().includes(term),
      );
    }

    try {
      if (!query || !query.trim()) {
        return [];
      }

      const response = await axios.get(`${url}/api/cards/search`, {
        params: {
          q: query.trim(),
          type: type,
        },
      });

      if (response.status === 200) {
        return response.data;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error searching cards:", error);
      return [];
    }
  },
};

export default Fetch;
