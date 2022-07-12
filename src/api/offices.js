import api from './index'

export default {
    getAllMember() {
        return api.get('offices?filter[office_type]=member')
    },
    store(data) {
        return api.post('offices/-actions/createMember', data)
    },
}