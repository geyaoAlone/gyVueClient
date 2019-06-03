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
                  <div class="layui-form-item" id="checkEvent"  @click = "login()">
                    <button class="layui-btn" @click.stop = "checkCode()">立即登录</button>
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
    import {validateCode} from '../util/validateCode.js';
    export default {
        name: "login",
        data:function(){
            return {
              loginInfo:{username:"",password:""}
            }
        },
        methods:{
          goLogin:function () {
            this.$router.push({path: 'login'})
          },
          checkCode:function(){
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
            validateCode.showDom(this);
          },
          login:function(){
            let _this = this
            this.$http.post('gateway/login',this.loginInfo,layer,this).then(result => {
              if(result.code === 1){
                localStorage.setItem('token',result.data)
                layer.msg('登陆成功！',{time:1000},function(){
                  window.location.href = "/";
                  /*
                  _this.$http.get('user/checkUserStatus',layer,_this).then(result => {
                    if(result){
                      console.info(result)
                      if(result.code != 1){
                        layer.msg('拉取客户信息失败！请重新登录'
                          ,{time:1500});
                      }else{
                        sessionStorage.setItem("user",JSON.stringify(result.data.userTemp))
                       //"http://www.geyaoln.xin";//
                        //_this.$router.push({path: 'firstPage'})
                      }
                    }
                  })
                  */
                })
              }else{
                layer.msg(result.message,{time:1500});
              }
            })
          }
        },
        created(){
          var info = sessionStorage.getItem('user'), token = localStorage.getItem('token')
          if(info){
            sessionStorage.removeItem('user')
          }
          if(token){
            localStorage.removeItem('token')
          }
          if(info && token){
            window.location.reload();
          }



        }
    }
</script>

<style scoped>

</style>
