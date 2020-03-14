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
// const shopDetail = () =>
//     import ('components/Detail/shopDetail.vue')
const mymsg = () =>
    import ('components/My/mymsg.vue')
const myaddress = () =>
    import ('components/My/myaddress.vue')
const addressManage = () =>
    import ('components/My/addressManage.vue')
const passManage = () =>
    import ('components/My/passManage.vue')
// const checkOrder = () =>
//     import ('components/My/passManage.vue')
// const router = new VueRouter()


// Vue.component({ tologin })
const routes = [
    {
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
                },{
                    path: 'passManage',
                    component: passManage,
                    
                }

            ]
        }]
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

    // { path:'/checkorder',component:checkOrder,name:'checkorder'},
    // {
    //     path: '/detail/:productId',
    //     component: shopDetail,
    //     name:'detail'
    // },
]

const router = new VueRouter({
        mode: 'history',
        base: process.env.BASE_URL,
        routes
    })


export default router