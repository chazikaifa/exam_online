import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/components/index.vue'
import Login from '@/components/login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',   
      name: 'index',
      component: Index,
      meta:{
        keepAlive:false
      }
    },
    {
      path: '/login',   
      name: 'login',
      component: Login,
      meta:{
        keepAlive:false
      }
    },
  ]
})