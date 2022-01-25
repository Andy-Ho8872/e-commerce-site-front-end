import axios from 'axios';
axios.defaults.withCredentials = true;

//* URL 與 設定
const base = process.env.apiUrl; //? 從 nuxt.config.js 獲取後端 API 的 URL 

//* 產品請求-------------------------------------------------------------------Start
const productRequest = axios.create({
    baseURL: `${ base }/products`
});
productRequest.interceptors.response.use(
    (response) => {
        return response
    }, 
    (error) => {
        if(error && error.response) {
            switch (error.response.status) {
                case 404:
                    $nuxt._router.push({ name: 'error' })
                default:
                    console.log("axios 錯誤。");
            }
        }
    }
)
//* 產品請求-------------------------------------------------------------------End


//* 使用者請求------------------------------------------------------------------Start
const userRequest = axios.create({
    baseURL: `${ base }/user`
});
//* 使用者請求------------------------------------------------------------------End
    


//* 管理者請求-------------------------------------------------------------------Start
const adminRequest = axios.create({
    baseURL: `${ base }/admin`
})
//? 設置攔截器 (interceptors)
adminRequest.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('Token')
        if (token) {
            config.headers.authorization = token
        }
        return config
    }, 
    (error) => Promise.reject(error)
)
//* 異常(錯誤)處理 
adminRequest.interceptors.response.use(
    (response) => {
        return response
    }, 
    (error) => {
        if(error && error.response) {
            switch (error.response.status) {
                case 401:
                    //* 重新導向
                    $nuxt._router.push({ name: 'auth-login' })
                    break; 
                default:
                    console.log("axios 錯誤。");
            }
        }
    }
)
//* 管理者請求-------------------------------------------------------------------End



//* 驗證請求-------------------------------------------------------------------Start
const authRequest = axios.create({
    baseURL: `${ base }/auth/user`
});
//? 設置攔截器 (interceptors)
authRequest.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('Token')
        if (token) {
            config.headers.authorization = token
        }
        return config
    }, 
    (error) => Promise.reject(error)
)
//* 異常(錯誤)處理 
authRequest.interceptors.response.use(
    (response) => {
        return response
    }, 
    (error) => {
        if(error && error.response) {
            switch (error.response.status) {
                case 401:
                    //* 重新導向
                    $nuxt._router.push({ name: 'auth-login' })
                    break; 
                default:
                    console.log("axios 錯誤。");
            }
        }
    }
)
//* 驗證請求-------------------------------------------------------------------End

export default { 
    userRequest,
    adminRequest,
    productRequest,
    authRequest
}