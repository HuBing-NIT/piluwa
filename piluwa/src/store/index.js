import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userMsg: {},
    },
    mutations: {
        changeLoginState(state, obj) {
            if (obj) { //登录
                console.log('登录')
                state.userMsg = obj
            } else { //注销
                console.log('注销')
                state.userMsg = {}
            }
        }
    },
    actions: {},
    modules: {}
})