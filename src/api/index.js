import axios from 'axios'
import router from '../routes'
import { API_URL } from '../utils'

const api = axios.create({
    baseURL: API_URL
})

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if(token) config.headers.Authorization = `Bearer ${token}`
    config.headers["Content-Type"] = "application/vnd.api+json"
    config.headers["Accept"] = "application/vnd.api+json"
    return config
}, error => {
    Promise.reject(error)
})

api.interceptors.response.use(response => {
    return response
}, async (error) => {
    const originalRequest = error.config
    if(error.response.status === 401 && !originalRequest._retry) {
        localStorage.removeItem('token')
        router.push('/login')
    }
})

export default api;