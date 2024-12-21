import axios, { type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import { getToken, setToken } from './auth'
import router from '@/router'
import { ElMessage } from 'element-plus'

const service: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL_API,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
})

// 请求拦截器
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = getToken()

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    error => Promise.reject(error)
)

// 响应拦截器
service.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data
    },
    error => {
        if (error.response && error.response.status == 401) {
            setToken('')
            router.push({
                name: 'Login'
            })
        } else {
            ElMessage.error(error.response.data.message)
        }
        return Promise.reject(error)
    }
)

export default service
