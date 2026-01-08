import axios from 'axios'
import url from '../../../../api/url'
import { getCookie } from "cookies-next";

const Fetch = {
    fetchBlogs: async function fetchBlogs(){
        try{
            const response = await axios.get(`${url}/api/blogs/`);

            if(response.status === 200){
                return response.data;
            }
            else{
                return null;
            }
        }
        catch(error){
            console.log(error);
            return error;
        }
    },

    fetchBlogById: async function fetchBlogById(id){
        try{
            const response = await axios.get(`${url}/api/blogs/${id}`);
            
            if(response.status === 200){
                return response.data.data;
            }
            else{
                return null;
            }
        }
        catch(error){
            console.log(response.data.error);
            return error;
        }
    },

    fetchBlogByLink: async function fetchBlogByLink(link) {
        let data;
        const response = await axios.get(`${url}/api/blogs/links/${link}`);
        response.status === 200 ? data = response.data.blog : data = null
        console.log(data)
        return data
    },

    fetchCards: async function fetchCards(){
        try{
            const response = await axios.get(`${url}/api/cards_public`);
            if(response.status === 200){
                return response.data;
            }
            else{
                return null;
            }
        }catch(error){
            console.log(error);
            return error;
        }
    },

    fetchBlogHead: async function fetchBlogHead(id){
        try{
            const response = await axios.get(`${url}/api/blog_head/${id}`);
            if(response.status === 200){
                return response.data.data;
            }
            else{
                return null;
            }
        }catch(error){
            console.log(error);
            return error;
        }
    },

    fetchBlogFooter: async function fetchBlogFooter(id){
        try{
            const response = await axios.get(`${url}/api/blog_footer/${id}`);
            if(response.status === 200){
                return response.data.data;
            }
            else{
                return null;
            }
        }catch(error){
            console.log(error);
            return error;
        }
    },

    fetchBlogBodyById: async function fetchBlogBodyById(id){
        try{
            const response = await axios.get(`${url}/api/blog_body/${id}`);
            if(response.status === 200){
                return response.data.data;
            }
            else{
                return null;
            }
        }catch(error){
            console.log(error);
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

}

export default Fetch;