import axios from 'axios'

const api = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_API_URL
})


api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})


api.interceptors.response.use((config) => {
    return config
}, async (error) => {

    const originalRequest = error.config;

    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        console.log('ПОДОЗРЕНИЕ НА ACCESS_TOKEN');
        try {
            originalRequest._isRetry = true

            const response = await axios.post(process.env.REACT_APP_API_URL + '/authentication/refreshToken', {}, { withCredentials: true })
            localStorage.setItem('token', response.data['accessToken'])
            console.log('ACCESS_TOKEN ОБНОВЛЁН');
            return api.request(originalRequest)
        } catch (error) {
            console.log('НЕ АВТОРИЗОВАН');
        }
    }
    throw error
})

export default api