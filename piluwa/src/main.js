import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import axios from './untils/axios'

// 引入公共样式
import 'style/common.css'
import 'style/flexble.js' //100px = 1rem

// 引入icon图标库
import './assets/icon/iconfont.css'

// 引入动画库
import 'animate.css/animate.css'



// 导入vant组件库
import Vant from 'vant';
import { Dialog } from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
// import { Toast } from 'vant';
// Vue.use(Toast);

// 图片懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
    preLoad: 1.3,
    loading: '/load.gif',
    attempt: 1
})


Vue.config.productionTip = false



router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    let path = to.path.split('/');
    let title = path[1]
    store.commit('changeTitle', title) //更新title
        // let obj = JSON.parse(localStorage.getItem('loginMsg'))
    try {
        // 获取本地用户信息
        console.log('获取')
        let obj = JSON.parse(localStorage.getItem('loginMsg'))
    } catch (error) {
        console.log(path.length)
        if (path.length <= 2) {
            Dialog.confirm({
                title: '当前未登录',
                message: '点击确定跳转'
            }).then(() => {
                router.push('/tologin/login')
            }).catch(() => {

            });
        }
    }


    // this.$store.commit('changeTitle', to.path)
    // console.log(to.path)
    next()
})




new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')