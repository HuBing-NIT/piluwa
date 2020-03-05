import Vue from 'vue'
import VueRouter from 'vue-router'

import my from 'components/My/my.vue'
import home from 'components/Home/home.vue'
import cart from 'components/Cart/cart.vue'
import classify from 'components/Classify/classify.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/my', component: my },
    { path: '/home', component: home },
    { path: '/cart', component: cart },
    { path: '/classify', component: classify },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router