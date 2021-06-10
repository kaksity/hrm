import API from '@/api';
import * as types from './types';

const state = {
    token: localStorage.getItem('authentication-token') || null,
    me: {},
};

const getters = {};

const actions = {
    login({ commit }, params) {
        return API.login(params).then((value) => {
            commit(types.LOGIN, { value });
            // const token = value.data.token;
            localStorage.setItem('authentication-token', value.data.token);
            return value;
        }, res => Promise.reject(res));
    },
    logout({ commit }) {
        commit(types.LOGOUT);
    },
};

const mutations = {
    [types.LOGIN](state, { value }) {
        state.token = value.data.token;
    },
    [types.LOGOUT](state) {
        localStorage.removeItem('authentication-token');
        state.token = null;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};