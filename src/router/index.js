import Vue from 'vue'
import Router from 'vue-router'
import FirstPage from '../pages/first-page'
import Login from '../pages/login'
import UpdateLog from '../pages/web-update-log'
import Add from '../pages/add'
import Detail from '../pages/detail'
import VisitorLeave from '../pages/visitors-leave'
import MyHomepage from '../pages/my-homepage'
import MyInfo from '../pages/my-info'
import MyMessage from '../pages/my-message'
import Edit from '../pages/edit'
import MyCollection from '../pages/my-collection'
import AddWebUpdate from '../pages/add-web-update'
import AdminRegister from '../pages/admin-register'
import VisitorsWall from '../pages/visitors-wall'
import MyPosting from '../pages/my-posting'
import UserRegister from  '../pages/user-register'
import NewEdit from  '../pages/mavon-editor'
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
      path: '/visitors-leave',
      name: 'visitors-leave',
      component: VisitorLeave
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
    },{
      path:'/edit',
      name: 'edit',
      component: Edit
    },{
      path: '/myCollection',
      name: 'my-collection',
      component: MyCollection
    },{
      path: '/myPosting',
      name: 'my-posting',
      component: MyPosting
    },{
      path: '/addWebUpdate',
      name: 'add-web-update',
      component: AddWebUpdate
    },{
      path: '/adminRegister',
      name: 'admin-register',
      component: AdminRegister
    },{
      path: '/visitorsWall',
      name: 'visitors-wall',
      component: VisitorsWall
    },{
      path:'/userRegister',
      name:'user-register',
      component:UserRegister
    },{
      path:'/newEdit',
      name:'new-edit',
      component:NewEdit
    }

  ]
})
