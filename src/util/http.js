'use strict'

import axios from 'axios'
//import { Indicator } from 'mint-ui';

const BASE_URL = 'http://39.108.221.60:9500/api/' //''// 'http://localhost:9500/api/';
axios.interceptors.request.use(config => {
    // loading opend
    //Indicator.open('加载中...');
    return config
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(response => {
    return response
}, error => {
    return Promise.resolve(error.response)
})


function checkStatus (response,layer,_this,waiting) {
    // loading close
    //Indicator.close();
    try {
      if(response.headers.authorization){
        localStorage.token = response.headers.authorization
      }
      var status = response.status
      var _layer
      //token过期或者校验异常：重新登陆
      if(status === 401) {
        _layer = layer.alert('抱歉！您的会员信息已过期或出现异常。</br>请您重新登陆'
          , {icon: 0}
          , function () {
            localStorage.removeItem( 'token');
            sessionStorage.removeItem( 'user');
            layer.close(_layer)
            _this.$router.push({path: 'login'})
          });
        return
      }

      //权限问题---无权访问的功能
      if(status === 403) {
        _layer = layer.alert('抱歉！您无权访问此功能'
          , {icon: 2}
          , function () {
            layer.close(_layer)
            _this.$router.push({path: 'firstPage'})
          });
        return
      }

      if(status === 500 || status === 400) {
        _layer = layer.alert('系统抛锚了！赶紧去留言区告诉葛耀！他立马去修'
          , {icon: 2}
          , function () {
            layer.close(_layer)
          });
        return
      }
      if(response.data){
        if(response.data.code === -1){
          _layer = layer.alert(response.data.message
            ,{icon:2}
            ,function(){
              layer.close(_layer)
              return
            });
        }else{
          return response.data;
        }
      }
    } catch (e) {
      return layer.alert('该死的网好像又出问题了...', {icon: 0})
    }finally {
      setTimeout(()=> {
        layer.close(waiting)
      },100)
    }

}

export default {
    post (url,data,layer,_this) {
      layer.close('msg')
      var waiting = layer.msg('Lodding...', {shade: [0.5, '#393D49'],icon: 16,time: 3600*1000})
      return axios({
          method: 'post',
          baseURL: BASE_URL,
          url,
          data,
          timeout: 15000,
          headers:{
            "Authorization":'Bearer '+ localStorage.getItem('token')
          }

      }).then( response => checkStatus(response,layer,_this,waiting) )
    },
    get(url,layer,_this){
      var waiting = layer.msg('Lodding...', {shade: [0.5, '#393D49'],icon: 16,time: 3600*1000})
      return axios({
        method: 'get',
        baseURL: BASE_URL,
        url,
        timeout: 15000,
        headers:{
          "Authorization":'Bearer '+ localStorage.getItem('token')
        }
      }).then( response => checkStatus(response,layer,_this,waiting))
    }
}
