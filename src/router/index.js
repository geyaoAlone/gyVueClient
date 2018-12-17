import Vue from 'vue'
import Router from 'vue-router'
import FirstPage from '../pages/first-page'
import Login from '../pages/login'
import UpdateLog from '../pages/web-update-log'
import Add from '../pages/add'
import Detail from '../pages/detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'first-page',
      component: FirstPage
    },{
      path: '/firstPage',
      name: 'first-page',
      component: FirstPage
    },{
      path: '/login',
      name: 'login',
      component: Login
    },{
      path: '/updateLog',
      name: 'web-update-log',
      component: UpdateLog
    },{
      path: '/add',
      name: 'add',
      component: Add

    },{
      path: '/detail',
      name: 'detail',
      component: Detail
    }
  ]
})
