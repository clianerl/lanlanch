import Vue from 'vue'
import Router from 'vue-router'
import NodejsIndex from '@/page/nodejsindex'
import Index from '@/page/index'
import Content from '@/page/content'
import Mainpage from '@/page/main'
import PCLogin from '@/page/login'
import PCRegist from '@/page/regist'

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
      path: '/nodejsindex',
      component: NodejsIndex
    },
    {
      path: '/main',
      component: Mainpage
    },
    {
      path: '/login',
      component: PCLogin
    },
    {
      path: '/regist',
      component: PCRegist
    }
  ]
})
