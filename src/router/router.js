import Vue from 'vue'
import Router from 'vue-router'
import NodejsIndex from '@/page/nodejsindex'
import Index from '@/page/index'
import Mainpage from '@/page/main'
import PCLogin from '@/page/login'
import PCRegist from '@/page/regist'
import Add from '@/page/add'
import Update from '@/page/update'
import Mylist from '@/page/mylist'
import Classifymanage from '@/page/classifymanage'
import Listcontent from '@/page/listcontent'
import question from '@/page/question'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
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
    },
    {
      path: '/question',
      component: question
    },
    {
      path: '/add',
      component: Add
    },
    {
      path: '/update/:id',
      component: Update
    },
    {
      path: '/mylist',
      component: Mylist
    },
    {
      path: '/classifymanage',
      component: Classifymanage
    },
    {
      path: '/listcontent/:id',
      component: Listcontent
    }

  ]
})
