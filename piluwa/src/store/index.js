import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // nowPage: '首页', //当前页面title
    },
    mutations: {
        // 改变页面title
        // changePage(state, str) {
        //     state.nowPage = str;
        // }
    },
    actions: {},
    modules: {}
})