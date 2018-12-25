// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// vuex.store 这个不用管，是组件之间数据共享的插件
import store from './store'
import http from './util/http'
Vue.config.productionTip = false
Vue.prototype.$http = http;
/* eslint-disable no-new */
// 把jQuery 设置为全局
//window.$ = window.jQuery = layui.jquery;
var layer;
layui.use('layer', function() {
  layer = layui.layer;
});
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

