<template>
  <div id="app">

    <div class="fly-header layui-bg-black">
      <div class="layui-container">
        <a class="fly-logo" href="">
          <img src="http://120.79.240.9:8080/gyLogo.png" alt="layui">
        </a>
        <ul class="layui-nav fly-nav layui-hide-xs">
          <li class="layui-nav-item layui-this">
            <a href="javascript:;" @click="firstPage()"><i class="iconfont icon-jiaoliu"></i>小站大厅</a>
          </li>
          <li class="layui-nav-item">
            <a href="#/updateLog"><i class="iconfont icon-ui"></i>小站更新</a>
          </li>
          <li class="layui-nav-item">
            <a href="#/visitors-leave"><i class="iconfont icon-ui"></i>小站留言</a>
          </li>
        </ul>

        <ul class="layui-nav fly-nav-user">
          <!-- 未登入的状态 -->
          <li class="layui-nav-item" v-if="JSON.stringify(userSession) == '{}'">
            <a class="iconfont icon-touxiang layui-hide-xs" href="javascript:;" @click="goLogin()"></a>
          </li>
          <li class="layui-nav-item" v-if="JSON.stringify(userSession) == '{}'">
            <a href="javascript:;" @click="goLogin()">登入</a>
          </li>
          <li class="layui-nav-item" v-if="JSON.stringify(userSession) == '{}'">
            <a href="javascript:;" @click="goRegister()">注册</a>
          </li>
          <!-- 登入后的状态 -->
          <li class="layui-nav-item" v-if="JSON.stringify(userSession) != '{}'">
            <a class="fly-nav-avatar" href="javascript:;">
              <cite class="layui-hide-xs">{{userSession.nickname}}</cite>
              <i class="iconfont icon-renzheng layui-hide-xs"></i>
              <img :src="userSession.headPortraitUrl">
            </a>
            <dl class="layui-nav-child">
              <dd><a href="javascript:;" @click="myHomepage()"><i class="layui-icon" style="margin-left: 2px; font-size: 22px;">&#xe68e;</i>我的主页</a></dd>
              <dd><a href="javascript:;" @click="myInfo()"><i class="layui-icon">&#xe620;</i>我的信息</a></dd>
              <dd><a href="javascript:;" @click="myMessage()"><i class="iconfont icon-tongzhi" style="top: 4px;"></i>我的消息</a></dd>
              <hr style="margin: 5px 0;">
              <dd><a href="javascript:;" style="text-align: center;" @click="logout()">退出</a></dd>
            </dl>
          </li>
        </ul>
      </div>
    </div>

    <router-view/>
    <div class="fly-footer">
      <p><a href="http://www.geyaoln.xin/" target="_blank">葛耀的小站</a> 2018 &copy; <a href="http://www.geyaoln.xin/" target="_blank">geyaoln.xin 出品</a></p>
      <p>
        感谢Layui
        感谢大官人
        感谢老丁
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: function() {
    return{
      userSession:{}
    }
  },
  methods: {
    firstPage: function () {
      this.$router.push({path: 'firstPage'})
    },
    goLogin:function () {
      this.$router.push({path: 'login'})
    },
    logout:function () {
      var _this = this
      layer.confirm('您确定想退出登陆了？', {
        btn: ['确定','算了']
      }, function(){
        //_this.$store.commit('clearSession',this.userSession)
        _this.$http.get('user/logout',layer,_this).then(result => {
          if(result){
            layer.msg('退出成功',{time:1000},function(){
              sessionStorage.removeItem('user')
              localStorage.removeItem('token')
              this.userSession = {}
              window.location.reload();
            })
          }
        });

      }, function(){
        layer.close('confirm')
      });

    },myHomepage:function(){
      this.$router.push({path: 'myHomepage'})
    },myInfo:function(){
      this.$router.push({path: 'myInfo'})
    },myMessage:function(){
      this.$router.push({path: 'myMessage'})
    },goRegister:function(){
      this.$router.push({path: 'userRegister'})
    }
  },
  mounted() {
    var _this = this
    layui.use(['element','layer'], function() {
      var element = layui.element,layer = layui.layer
      if(localStorage.getItem('token')){
        _this.$http.get('user/checkUserStatus',layer,_this).then(result => {
          if(result && result.code === 1){
            _this.userSession = result.data.userTemp
            sessionStorage.setItem("user",JSON.stringify(result.data.userTemp))
          }else{
            if(result.message){
              layer.msg(result.message,{time:1500})
            }else{
              layer.msg('网站好像又有毛病了。葛耀修复中。。。',{time:1500})
            }
          }
        })
      }
    })
  }
}
</script>

<style>
</style>
