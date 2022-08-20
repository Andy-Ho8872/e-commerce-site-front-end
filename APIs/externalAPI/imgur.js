import axios from 'axios';

const apiUrl = process.env.imgur_api_url // 從 nuxt.config.js 中讀取
const clientId = process.env.imgur_client_id

const imgurRequest = axios.create({
    withCredentials: false,
    baseURL: apiUrl
});

imgurRequest.interceptors.request.use(
    (config) => {
        if (clientId) {
            config.headers.authorization = `Client-ID ${clientId}`
        }
        return config
    }, 
    (error) => Promise.reject(error)
)

export const apiUploadImage = (data) => imgurRequest.post(apiUrl, data)