import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index'
import Content from '@/page/content'
import Mainpage from '@/page/main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/content/:id',
      component: Content
    },
    {
      path: '/',
      component: Index
    },
    {
      path: '/main',
      component: Mainpage
    }
  ]
})
