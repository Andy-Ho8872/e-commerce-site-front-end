import axios from 'axios'

let base = 'http://localhost:8000/api' // base URL
// User register and login APIs
const userRequest = axios.create({
    baseURL: `${ base }/auth`
});
// 註冊 API
export const apiUserRegister = data => userRequest.post('/register', data);
// 登入 API
export const apiUserlogin = data => userRequest.post('/login', data);


