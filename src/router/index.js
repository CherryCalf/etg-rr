import Vue from 'vue'
import VueRouter from 'vue-router'


import User from '@/views/user/index.vue'
import Dept from '@/views/dept/index.vue'
import Anno from '@/views/anno/index.vue'
import Dict from '@/views/dict/index.vue'
import Role from '@/views/role/index.vue'
import Menu from '@/views/menu/index.vue'
import Para from '@/views/para/index.vue'
import Post from '@/views/post/index.vue'
import request from '@/utils/request'


Vue.use(VueRouter)
Vue.prototype.$http = request


const router = new VueRouter({
    mode: "hash",
    routes: [
        {
            path: '/user',
            component: User
        },
        {
            path: '/dept',
            component: Dept
        },
        {
            path: '/anno',
            component: Anno
        },
        {
            path: '/dict',
            component: Dict
        },
        {
            path: '/role',
            component: Role
        },
        {
            path: '/menu',
            component: Menu
        }, 
        {
            path: '/para',
            component: Para
        },
        {
            path: '/post',
            component: Post
        }
    ]
})

export default router