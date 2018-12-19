<template>
  <div id="app">

    <div class="fly-header layui-bg-black">
      <div class="layui-container">
        <a class="fly-logo" href="">
          <img src="http://120.79.240.9:8080/geyao_logoNew.png" alt="layui">
        </a>
        <ul class="layui-nav fly-nav layui-hide-xs">
          <li class="layui-nav-item layui-this">
            <a href="javascript:;" @click="firstPage()"><i class="iconfont icon-jiaoliu"></i>小站大厅</a>
          </li>
          <li class="layui-nav-item">
            <a href="#/updateLog"><i class="iconfont icon-ui"></i>小站更新</a>
          </li>
        </ul>

        <ul class="layui-nav fly-nav-user">
          <!-- 未登入的状态 -->
          <li class="layui-nav-item" v-if='userSession == null'>
            <a class="iconfont icon-touxiang layui-hide-xs" href="user/login.html"></a>
          </li>
          <li class="layui-nav-item" v-if='userSession == null'>
            <a href="javascript:;" @click="goLogin()">登入</a>
          </li>
          <!-- 登入后的状态 -->
          <li class="layui-nav-item" v-if='userSession != null'>
            <a class="fly-nav-avatar" href="javascript:;">
              <cite class="layui-hide-xs">{{userSession.nickname}}</cite>
              <i class="iconfont icon-renzheng layui-hide-xs"></i>
              <img src="http://120.79.240.9:8080/180.jpg">
            </a>
            <dl class="layui-nav-child">
              <dd><a href="user/set.html"><i class="layui-icon">&#xe620;</i>基本设置</a></dd>
              <dd><a href="user/message.html"><i class="iconfont icon-tongzhi" style="top: 4px;"></i>我的消息</a></dd>
              <dd><a href="user/home.html"><i class="layui-icon" style="margin-left: 2px; font-size: 22px;">&#xe68e;</i>我的主页</a></dd>
              <hr style="margin: 5px 0;">
              <dd><a href="javascript:;" style="text-align: center;" @click="logout()">退出</a></dd>
            </dl>
          </li>
        </ul>
      </div>
    </div>

    <router-view/>
    <div class="fly-footer">
      <p><a href="http://fly.layui.com/" target="_blank">网站的名字</a> 2018 &copy; <a href="http://www.layui.com/" target="_blank">geyaoln.xin 出品</a></p>
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
      userSession:this.$store.state.session
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
        _this.$http.get('/api/user/logout?username='+_this.userSession.username,_this.userSession.token).then(result => {
          if(result.code == '0'){
            layer.msg('退出成功',{time:1000},function(){
              _this.$store.commit('clearSession',this.userSession)
              window.location.reload()
              _this.$router.push({path: '/'})
            })

          }else{
            layer.msg('退出失败')
          }
        });

      }, function(){
        layer.close('confirm')
      });

    },add:function(){
      this.$router.push({path: 'add'})
    }
  },
  mounted() {
    layui.use('element', function() {
      var element = layui.element;
    });
  }
}
</script>

<style>
</style>
