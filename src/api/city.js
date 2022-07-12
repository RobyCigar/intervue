import api from './index'

export default {
    getAll() {
        return api.get('cities')
    }
}