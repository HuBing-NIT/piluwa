import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import my from 'components/My/my.vue'
import home from 'components/Home/home.vue'
import cart from 'components/Cart/cart.vue'
import classify from 'components/Classify/classify.vue'
import tologin from 'components/User/tologin.vue'
import register from 'components/User/register.vue'
import login from 'components/User/login.vue'
import typeDetail from 'components/Detail/typeDetail.vue'
import shopDetail from 'components/Detail/shopDetail.vue'
import mymsg from 'components/My/mymsg.vue'
import myaddress from 'components/My/myaddress.vue'
import address from 'components/My/address.vue'

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
                children: [{
                    path: ':address',
                    component: address,
                }]
            }]
        }]
    },
    {
        path: '/detail/:shopname',
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

export default router