import axios from 'axios'
axios.defaults.withCredentials = true;

// URL 與 設定
let base = 'http://localhost:8000/api' // 後端 API 的 URL
// 前端 URL
let config = { headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000' } }

// User register and login APIs
const userRequest = axios.create({
    baseURL: `${ base }/auth`
});
// CSRF Protection API
const userCsrfRequest = axios.create({
    baseURL: 'http://localhost:8000'
}); //
// 註冊 API
export const apiUserRegister = data => userRequest.post('/register', data);
// 登入 API
export const apiUserLogin = data => userRequest.post('/login', data);
// CSRF API
export const apiCsrfLogin = () => userCsrfRequest.get('/sanctum/csrf-cookie', config)


