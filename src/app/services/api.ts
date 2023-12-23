import axios from 'axios'
import { getData } from '../utils/storage'

export const api = axios.create({
    baseURL: 'https://hmg-api.travelmoon.com.br/api/'
})

api.interceptors.request.use(
    async (config) => {
        const data = await getData('@user')
        
        const token = data?.access_token;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    async (error) => {
        Promise.reject(error)
    },
)