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
        //Obtener token desde cookies
        const token = getCookie("token");

        if (!token) {
            console.warn("No se encontró token en cookies");
            return { items: [], currentPage: 1, lastPage: 1 };
        }

        //Incluir el token en el header Authorization
        const response = await axios.get(`${url}/api/blogs_auditoria?page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            const paginator = response.data?.data;
            return { 
                items: paginator?.data ?? [],
                currentPage: paginator?.current_page ?? 1,
                lastPage: paginator?.last_page ?? 1
            }
        }
        return { items: [], currentPage: 1, lastPage: 1 };
    } catch (error) {
        console.error("❌ Error al obtener auditoría:", error.response?.status, error.message);
        return { items: [], currentPage: 1, lastPage: 1 };
    }
}
}

export default Fetch;
