<template>
  <div>
    <div class="layui-container fly-marginTop">
      <div class="fly-panel fly-panel-user" pad20>
        <div class="layui-tab layui-tab-brief" lay-filter="user">
          <ul class="layui-tab-title">
            <li class="layui-this">注册</li>
          </ul>
          <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
            <div class="layui-tab-item layui-show">
              <div class="layui-form layui-form-pane">
                <div class="layui-form-item">
                  <label for="L_username" class="layui-form-label">用户名</label>
                  <div class="layui-input-inline">
                    <input type="text" id="L_username" name="username" class="layui-input" v-model="registerInfo.username" @blur="validate($event)">
                  </div>
                  <p class="layui-form-mid layui-word-aux">将会成为唯一的登入名</p>
                </div>
                <div class="layui-form-item">
                  <label for="L_email" class="layui-form-label">邮箱</label>
                  <div class="layui-input-inline">
                    <input type="text" id="L_email" name="email" class="layui-input" v-model="registerInfo.email" @blur="validate($event)">
                  </div>
                  <p class="layui-form-mid layui-word-aux">一个邮箱只支持注册一次</p>
                </div>
                <div class="layui-form-item">
                  <label for="L_nickname" class="layui-form-label">昵称</label>
                  <div class="layui-input-inline">
                    <input type="text" id="L_nickname" name="nickname"class="layui-input" v-model="registerInfo.nickname">
                  </div>
                </div>
                <div class="layui-form-item">
                  <label class="layui-form-label">性别</label>
                  <div class="layui-input-inline">
                    <input type="radio" name="sex" value="1" title="男" lay-filter="sex" checked>
                    <input type="radio" name="sex" value="2" title="女" lay-filter="sex">
                  </div>
                </div>
                <div class="layui-form-item" id="checkEvent"  @click = "register()">
                  <a class="layui-btn" @click.stop = "checkCode()">立即注册</a>
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
    name: "user-register",
    data:function(){
      return {
        registerInfo:{sex:"1"},
        subUrl:'user/adminSignUp'
      }
    },
    methods:{
      validate:function(e){
        if(!this.registerInfo[e.target.name]){
          $('#'+e.target.id).parent().parent().find('p').text('必填')
         // $('#'+e.target.id).focus()
          return
        }
        this.$http.get('gateway/registerValidate?'+e.target.name+'='+this.registerInfo[e.target.name],layer,this).then(result => {
          if(result.code == 1) {
            $('#'+e.target.id).parent().parent().find('p').text('可以使用')
          }else{
            $('#'+e.target.id).parent().parent().find('p').text(result.message)
            $('#'+e.target.id).focus()
          }
        })

      },
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
      register:function () {
        let _this = this
        this.$http.post('gateway/register',this.registerInfo,layer,this).then(result => {
          if(result){
            if(result.code == 1 && result.data){
              layer.msg('恭喜！注册成功。请收取邮件。密码在邮件中',{time:1000},function () {
                _this.$router.push({path: 'login'})
              })
            }else{
              layer.msg(result.message,{time:1300},function () {
                layer.closeAll()
              })
            }
          }
        })

      },
      checkCode:function(){
        if(!this.registerInfo.username){
          return layer.msg("用户名还是要填的",{time:1300})
        }
        if(!this.registerInfo.nickname){
          return layer.msg("昵称还是要填的",{time:1300})
        }
        if(!this.registerInfo.email){
          return layer.msg("不填邮箱咋注册",{time:1300})
        }
        validateCode.showDom(this);
      }
    },
    mounted(){
      var _this = this
      layui.use('form',function(){
        var form = layui.form
        form.on('radio(sex)', function(data){
          _this.registerInfo.sex = data.value
        });
        form.render();

      })
    },
    created(){
    }
  }
  function test(){
    alert(123)
  }
</script>

<style scoped>

</style>
