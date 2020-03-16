import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userMsg: {}, //用户信息
        nowpageTitle: '首页',
        Cartcount: 0,  //购物车数量
        flag:1,
        DetailProductId:0,  //商品Id
        orderstatus:false,
        detailstatus:false,
        orderMsg:[],  //订单信息
        Seladdress:'', // 选择的收货地址
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
        changeorderMsg(state,msg){
            state.orderMsg=msg; //记录订单信息
            console.log(msg)
        },
        changeAddress(state,obj){ //修改用户的默认地址
            state.userMsg.address=obj
        },
        changeOrderMsg(state,msg){  //确认的订单信息
            state.orderMsg=msg 
        },
        changeProductId(state,Id){ //修改详细商品Id
            state.DetailProductId=Id
        },
        showOrder(state,status){ //是否渲染订单组件
            state.orderstatus=status
        },
        showDetail(state,status){   //是否渲染详情页组件
            console.log(status)
            state.detailstatus=status
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