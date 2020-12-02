import axios from 'axios';
axios.defaults.withCredentials = true;

// URL 與 設定
let base = 'http://localhost:8000/api'; // 後端 API 的 URL
let config = { 
    headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000' } // 前端 URL
}; 

// User register and login APIs
const userRequest = axios.create({
    baseURL: `${ base }/auth`
});
// CSRF Protection API 使用者第一次登入時要先取得 CSRF 憑證
const userCsrfRequest = axios.create({
    baseURL: 'http://localhost:8000'
});
// 註冊 API
export const apiUserRegister = data => userRequest.post('/register', data);
// 登入 API
export const apiUserLogin = data => userRequest.post('/login', data);
// CSRF API
export const apiCsrfLogin = () => userCsrfRequest.get('/sanctum/csrf-cookie', config);
// 取得 User API
export const apiGetUserInfo = id => userRequest.get(`/user/${id}`);


