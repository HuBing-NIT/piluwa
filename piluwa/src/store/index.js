import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userMsg: {},
        nowpageTitle: '首页',
        Cartcount: 0,
        flag:1,
        DetailProductId:0,
        rendermodule:'', //渲染组件
        orderMsg:[],  //订单信息
    },
    getters: {
        Title(state) {
            if (state.nowpageTitle == '购物车') {
                return state.nowpageTitle + `(${state.Cartcount})`
            } else {
                return state.nowpageTitle
            }
        }
    },
    mutations: {
        changeOrderMsg(state,msg){  //确认的订单信息
            state.orderMsg=msg 
        },
        changeProductId(state,Id){ //修改详细商品Id
            state.DetailProductId=Id
        },
        changeRender(state,module){ //改变组件渲染
            state.rendermodule=module;
        },
        changeLoginState(state, obj) {
            if (obj) { //登录
                console.log('登录')
                state.userMsg = obj
                state.flag++;
            } else { //注销
                console.log('注销')
                state.userMsg = {}
                state.flag--;
            }
        },
        changeCartcount(state, count) { //改变购物车数量
            console.log(count)
            state.Cartcount = count
        },
        changeTitle(state, title) { //改变titile
            if (title == 'home') {
                state.nowpageTitle = '主页'
            } else if (title == 'my') {
                state.nowpageTitle = '我的'
            } else if (title == 'cart') {
                state.nowpageTitle = '购物车'
            } else if (title == 'classify') {
                state.nowpageTitle = '分类'
            }

        }
    },
    actions: {},
    modules: {}
})