import axios from 'axios'

export const mockApiGetProducts = () =>
    axios.get('http://localhost:8000/api/products')

export const mockApiGetUserInfo = () =>
    axios
        .get('http://localhost:8000/api/user/getUser')
        .then(res => res.data)
        .catch(err => console.error(err))