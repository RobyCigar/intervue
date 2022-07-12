import api from './index'

export default {
    post(data) {
        return api.post('login', data)
    }
}