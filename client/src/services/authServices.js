import api from "../http";


export default class AuthServices {
    static async login(username, password) {
        return api.post('/authentication/login', { username, password })
    }

    static async registration(username, email, password) {
        return api.post('/authentication/registration', { username, email, password })
    }

    static async logout() {
        return api.get('/authentication/logout')
    }
}