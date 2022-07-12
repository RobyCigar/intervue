
import { createStore } from 'vuex'
import { sleep, checkObjValue } from '../utils'
import login from '../api/login';
import offices from '../api/offices';
import router from '../routes';
import province from '../api/province';
import city from '../api/city';

import { SUBMIT_LOGIN, CHANGE_ALERT, GET_USER, GET_PROVINCES, GET_CITIES, GET_OFFICES, POST_OFFICES } from "./mutation-types";

const store = createStore({
    state() {
        return {
            user: null,
            alert: "",
            offices: [],
            provinces: [],
            cities: []
        }
    },
    mutations: {
        [CHANGE_ALERT](state, data) {
            state.alert = data
        },
        [GET_USER](state, data) {
            state.user = data
        },
        [GET_OFFICES](state, data) {
            state.offices = data
        },
        [GET_PROVINCES](state, data) {
            state.provinces = data
        },
        [GET_CITIES](state, data) {
            state.cities = data
        }
    },
    actions: {
        async [SUBMIT_LOGIN]({ commit }, payload) {
            try {
                const { data: { data } } = await login.post(payload)

                console.log(data)

                commit(CHANGE_ALERT, "")
                commit(GET_USER, data.user)

                // localStorage.setItem
                localStorage.setItem('token', data.token)
                router.push('/')
            } catch (error) {
                commit(CHANGE_ALERT, error.message)
            }
        },
        async [GET_OFFICES]({ commit }) {
            try {
                const {data: { data }} = await offices.getAllMember();
                commit(GET_OFFICES, data)
            } catch (error) {
                commit(CHANGE_ALERT, error.message)
            }
        },
        async [GET_PROVINCES]({ commit }) {
            try {
                const { data: { data } } = await province.getAll();
                commit(GET_PROVINCES, data)
            } catch (error) {
                commit(CHANGE_ALERT, error.message)
            }
        },
        async [GET_CITIES]({ commit }) {
            try {
                const { data: { data } } = await city.getAll();
                commit(GET_CITIES, data)
            } catch (error) {
                commit(CHANGE_ALERT, error.message)
            }
        },
        async [POST_OFFICES]({ commit }, payload) {
            try {
                const data  = await offices.store(payload)
                if(!data) throw new Error("Data gagal ditambahkan"
                )
                commit(CHANGE_ALERT, "Data berhasil ditambahkan...")
            } catch (err) {
                // console.error(err)
                const isEmpty = checkObjValue(payload.data)

                if (isEmpty || err) {
                    commit(CHANGE_ALERT, isEmpty || err)
                }

            } finally {
                await sleep(5000)

                commit(CHANGE_ALERT, "")

            }
        },
    }   
})

export default store;