<template>
  <div>

    <div class="layui-container fly-marginTop">
      <div class="fly-panel fly-panel-user" pad20>
        <div class="layui-tab layui-tab-brief" lay-filter="user">
          <ul class="layui-tab-title">
            <li class="layui-this">登入</li>
            <!--<li><a href="reg.html">注册</a></li>-->
          </ul>
          <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
            <div class="layui-tab-item layui-show">
              <div class="layui-form layui-form-pane">
                  <div class="layui-form-item">
                    <label for="username" class="layui-form-label">用户名</label>
                    <div class="layui-input-inline">
                      <input type="text" class="layui-input" v-model="loginInfo.username" id="username">
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label for="password" class="layui-form-label">密码</label>
                    <div class="layui-input-inline">
                      <input type="password" v-model="loginInfo.password" class="layui-input" id="password">
                    </div>
                  </div>

                  <div class="layui-form-item ">
                    <label for="L_vercode" class="layui-form-label">人类验证</label>
                    <div class="layui-input-inline">
                      <input type="text" v-model="loginInfo.identifyCode" @click="takecheckimg()" id="L_vercode" name="vercode" placeholder="请写出后面的答案" class="layui-input">
                    </div>
                    <div class="login_img">
                      <img id="identifyCodeImg" @click="refreshImg()" alt="" title="算不出来？点击刷新"/>
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <button class="layui-btn" @click="login()">立即登录</button>
                    <!--<span style="padding-left:20px;">
                      <a href="forget.html">忘记密码？</a>
                    </span>-->
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>



  </div>
</template>

<script>
    export default {
        name: "login",
        data:function(){
            return {
              loginInfo:{username:"",password:"",identifyCode:''}
            }
        },
        methods:{
          goLogin:function () {
            this.$router.push({path: 'login'})
          },
          takecheckimg:function(){
            var username = this.loginInfo.username;
            console.info(username)
            if(!username){
              layer.msg('你倒是填用户名啊！',{time:1500},function(){
                $('#username').focus();
              })
              return
            }
            this.$http.get('/api/gateway/identifyCode?username='+username).then(result => {
                document.getElementById('identifyCodeImg').setAttribute( 'src','data:image/jpeg;base64,'+result.data);
            })

          },
          refreshImg:function(){
            var username = this.loginInfo.username;
            if(username){
              this.$http.get('/api/gateway/identifyCode?username='+username).then(result => {
                console.info(result)
                if(result.result =='0'){
                  layer.msg(result.failReason,{time:1500},function(){
                    $('#username').focus();
                  })
                }else{
                  document.getElementById('identifyCodeImg').setAttribute( 'src','data:image/jpeg;base64,'+result.data);
                }
              })
            }
          },
          login:function(){
            let _this = this
            if(!this.loginInfo.username){
              layer.msg('用户名都不填就想登陆！逗我玩呢',{time:1500},function(){
                $('#username').focus();
              })
              return
            }
            if(!this.loginInfo.password){
              layer.msg('密码都不填就想登陆！逗我玩呢',{time:1500},function(){
                $('#password').focus();
              })
              return
            }
            if(!this.loginInfo.identifyCode){
              layer.msg('你确定自己不是人类？',{time:1500},function(){
                $('#L_vercode').focus();
              })
              return
            }
            this.$http.post('/api/gateway/login',this.loginInfo).then(result => {
              console.info(result)
              if(result.code === 1){
                let token = result.data;
                layer.msg('登陆成功！',{time:1000},function(){
                  _this.$http.get('/api/user/getUserInfo?username='+_this.loginInfo.username,token).then(result => {
                    if(result.code == 0){
                      layer.msg('拉取客户信息失败！请重新登录'
                        ,{time:1500}
                        ,function () {
                          _this.$http.get('/api/gateway/identifyCode?username='+_this.loginInfo.username).then(result => {
                              document.getElementById('identifyCodeImg').setAttribute( 'src','data:image/jpeg;base64,'+result.data);
                          })
                        }
                      );
                    }else{
                      let session = result.data;
                      console.info(session)
                      session.token = token
                      _this.$store.commit('setSession',session);
                      window.location.reload();
                      _this.$router.push({path: '/'})
                    }
                  })
                })
              }else{
                layer.msg(result.message,{time:2000},function () {
                  this.$http.get('/api/gateway/identifyCode?username='+_this.loginInfo.username).then(result => {
                    document.getElementById('identifyCodeImg').setAttribute( 'src','data:image/jpeg;base64,'+result.data);
                  })
                });
              }
            })
          }
        }
    }
</script>

<style scoped>

</style>
