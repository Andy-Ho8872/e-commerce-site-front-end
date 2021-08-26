import axios from 'axios'

export const mockApiGetProducts = () =>
    axios.get('http://localhost:8000/api/products')

export const mockApiGetUserInfo = () =>
    axios
        .get('http://localhost:8000/api/user/getUser')
        .then(res => res.data)
        .catch(err => console.error(err))

export const mockApiDeleteSingleOrder = (orderId) =>
    axios
        .delete(`http://localhost:8000/api/auth/user/order/${orderId}/delete`)
        .then(res => res.data)
        .catch(err => console.error(err))