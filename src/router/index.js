import Vue from 'vue'
import Router from 'vue-router'
import FirstPage from '../pages/first-page'
import Login from '../pages/login'
import UpdateLog from '../pages/web-update-log'
import Add from '../pages/add'
import Detail from '../pages/detail'
import VisitorsWall from '../pages/visitors-wall'
import MyHomepage from '../pages/my-homepage'
import MyInfo from '../pages/my-info'
import MyMessage from '../pages/my-message'
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
    },{
      path: '/visitors-wall',
      name: 'visitors-wall',
      component: VisitorsWall
    },{
      path: '/myHomepage',
      name: 'my-homepage',
      component: MyHomepage
    },{
      path: '/myInfo',
      name: 'my-info',
      component: MyInfo
    },{
      path: '/myMessage',
      name: 'my-message',
      component: MyMessage
    }
  ]
})
