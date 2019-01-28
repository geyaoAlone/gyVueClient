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
                      <input type="text" v-model="loginInfo.identifyCode" id="L_vercode" name="vercode" placeholder="请写出后面的答案" class="layui-input">
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
          refreshImg:function(){
            this.$http.get('gateway/identifyCode',layer,this).then(result => {
              if(result && result.data){
                document.getElementById('identifyCodeImg').setAttribute( 'src','data:image/jpeg;base64,'+result.data);
              }
            })
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
            this.$http.post('gateway/login',this.loginInfo,layer,this).then(result => {
              if(result.code === 1){
                localStorage.setItem('token',result.data)
                layer.msg('登陆成功！',{time:1000},function(){
                  _this.$http.get('user/checkUserStatus',layer,_this).then(result => {
                    if(result){
                      if(result.code != 1){
                        layer.msg('拉取客户信息失败！请重新登录'
                          ,{time:1500}
                          ,function () {
                            _this.$http.get('user/identifyCode',layer,_this).then(result => {
                              if(result && result.data) {
                                document.getElementById('identifyCodeImg').setAttribute('src', 'data:image/jpeg;base64,' + result.data);
                              }
                            })
                          }
                        );
                      }else{
                        sessionStorage.setItem("user",JSON.stringify(result.data.userTemp))
                        window.location.reload();
                        _this.$router.push({path: 'firstPage'})
                      }
                    }
                  })
                })
              }else{
                layer.msg(result.message,{time:1500},function () {
                  _this.$http.get('gateway/identifyCode',layer,_this).then(result => {
                    _this.loginInfo.identifyCode = ''
                    if(result && result.data){
                      document.getElementById('identifyCodeImg').setAttribute( 'src','data:image/jpeg;base64,'+result.data);
                    }
                  })
                });
              }
            })
          }
        },
        created(){
          let _this = this
          layui.use('layer', function() {
            var layer = layui.layer, info = sessionStorage.getItem('user'), token = localStorage.getItem('token'),
              waiting = layer.msg('Lodding...', {shade: [0.5, '#393D49'],icon: 16,time: 3600*1000})
            if(info){
              sessionStorage.removeItem('user')
            }
            if(token){
              localStorage.removeItem('token')
            }
            if(info && token){
              window.location.reload();
            }
            _this.$http.get('gateway/identifyCode',layer,_this).then(result => {
              if(result && result.data){
                document.getElementById('identifyCodeImg').setAttribute( 'src','data:image/jpeg;base64,'+result.data);
              }
            })
            layer.close(waiting)
          })
        }
    }
</script>

<style scoped>

</style>
