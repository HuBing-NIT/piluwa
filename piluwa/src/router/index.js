import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const my = () =>
    import ('components/My/my.vue')
const home = () =>
    import ('components/Home/home.vue')
const cart = () =>
    import ('components/Cart/cart.vue')
const classify = () =>
    import ('components/Classify/classify.vue')
const tologin = () =>
    import ('components/User/tologin.vue')
const register = () =>
    import ('components/User/register.vue')
const login = () =>
    import ('components/User/login.vue')
const typeDetail = () =>
    import ('components/Detail/typeDetail.vue')
const shopDetail = () =>
    import ('components/Detail/shopDetail.vue')
const mymsg = () =>
    import ('components/My/mymsg.vue')
const myaddress = () =>
    import ('components/My/myaddress.vue')
const addressManage = () =>
    import ('components/My/addressManage.vue')


import { Dialog } from 'vant';
import IsLogin from '../untils/IsLogin.js'
// const router = new VueRouter()


// Vue.component({ tologin })
const routes = [{
        path: '/my',
        component: my,

        children: [{
            path: 'mymsg',
            component: mymsg,
            children: [{
                    path: 'myaddress',
                    component: myaddress,
                }, {
                    path: 'addressManage/:addressId',
                    component: addressManage,
                }

            ]
        }]
    },
    {
        path: '/detail/:productId',
        component: shopDetail,
    },
    {
        path: '/tologin',
        component: tologin,
        children: [{
            path: 'login',
            component: login,
        }, {
            path: 'register',
            component: register,
        }]
    },
    {
        path: '/home',
        component: home,
        children: [{
            // path: ':name',
            path: '/home/:name',
            component: typeDetail,
        }]
    },
    { path: '/cart', component: cart },
    { path: '/classify', component: classify },
    { path: '/', component: home },
]

const router = new VueRouter({
        mode: 'history',
        base: process.env.BASE_URL,
        routes
    })
    // router.beforeEach((to, from, next) => {
    //     // 检查本地的user记录
    //     IsLogin(Dialog);
    //     next()
    // })

export default router