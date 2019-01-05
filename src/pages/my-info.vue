<template>
  <div>
    <div class="fly-panel fly-column small-title">
      <div class="layui-container">
        <ul class="layui-clear">
          <li class="layui-hide-xs "><a href="javascript:;" @click="myHomepage()">我的主页</a></li>
          <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block"><span class="fly-mid"></span></li>
          <li class="layui-this"><a href="javascript:;" @click="myInfo()">我的信息</a></li>
          <li><a href="javascript:;" @click="myMessage()">我的消息</a></li>
          <li><a href="javascript:;" @click="myCollection()">我的收藏</a></li>
          <li v-if="userInfo != null && userInfo.authorities[0] =='ADMIN'"><a href="#/visitorsWall">查看留言</a></li>
          <li v-if="userInfo != null && userInfo.authorities[0] =='ADMIN'"><a href="#/addWebUpdate">添加更新</a></li>
          <li v-if="userInfo != null && userInfo.authorities[0] =='ADMIN'"><a href="#/adminRegister">会员注册</a></li>
        </ul>

        <div v-if='userInfo != null' class="fly-column-right layui-hide-xs">
          <!--<span class="fly-search"><i class="layui-icon"></i></span>-->
          <a href="javascript:;" @click="add()" class="layui-btn">发表新帖</a>
        </div>
        <div v-if='userInfo != null' class="layui-hide-sm layui-show-xs-block" style="margin-top: -10px; padding-bottom: 10px; text-align: center;">
          <a href="javascript:;" @click="add()" class="layui-btn">发表新帖</a>
        </div>
      </div>
    </div>
    <div class="fly-panel fly-panel-user myInfo_box" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title" id="LAY_mine">
          <li class="layui-this" lay-id="info">我的资料</li>
          <li lay-id="avatar">头像</li>
          <li lay-id="pass">密码</li>
         <!-- <li lay-id="bind">帐号绑定</li>-->
        </ul>
        <div class="layui-tab-content" style="padding: 20px 0;">

          <div class="layui-form layui-form-pane layui-tab-item layui-show" lay-filter="modify">
            <div class="layui-form-item info_personalBox">
              <label class="layui-form-label">用户名</label>
              <div class="layui-input-inline">
                <span>{{userInfo.username}}</span>
              </div>
            </div>
            <div class="layui-form-item">
              <label for="L_username" class="layui-form-label">昵称</label>
              <div class="layui-input-inline">
                <input v-model="modifyInfo.nickname" type="text" id="L_username" name="username" value="" class="layui-input">
              </div>
              <div class="info_role">
                <span v-if="userInfo.authorities[0] =='USER'">(小站会员)</span>
                <span v-if="userInfo.authorities[0] =='ADMIN'">(小站管理员)</span>
              </div>
            </div>
            <div class="layui-form-item">
              <label class="layui-form-label">性别</label>
              <div class="layui-input-inline">
                <!--<input type="radio" name="sex" value="1" title="男" lay-filter="sex">-->
                <!--<input type="radio" name="sex" value="2" title="女" lay-filter="sex">-->
                <select>
                  <option name="sex" lay-filter="sex">男</option>
                  <option name="sex" lay-filter="sex">女</option>
                </select>
              </div>
            </div>
            <div class="layui-form-item">
              <label for="L_email" class="layui-form-label">邮箱</label>
              <div class="layui-input-inline">
                <input v-model="modifyInfo.email" type="text" id="L_email" name="email" class="layui-input">
              </div>
              <div class="layui-form-mid layui-word-aux">如果您在邮箱已激活的情况下，变更了邮箱，需 <a href="javascript:;" style="color: #4f99cf;">重新验证邮箱</a>。</div>
            </div>
            <div class="layui-form-item">
              <label for="L_city" class="layui-form-label">城市</label>
              <div class="layui-input-inline">
                <input v-model="modifyInfo.city" type="text" id="L_city" name="city" class="layui-input">
              </div>
            </div>
            <div class="layui-form-item layui-form-text">
              <label for="L_sign" class="layui-form-label">签名</label>
              <div class="layui-input-block">
                <textarea v-model="modifyInfo.description" placeholder="随便写些什么刷下存在感" id="L_sign"  name="sign" class="layui-textarea" style="height: 80px;"></textarea>
              </div>
            </div>
            <div class="layui-form-item">
              <button class="layui-btn" @click="modifyBasicInfo()">确认修改</button>
            </div>
          </div>

          <div class="layui-form layui-form-pane layui-tab-item info_photoBox">
            <div class="layui-form-item">
              <div class="avatar-add">

                <img :src="userInfo.headPortraitUrl" id="showImg" />
                <!--<span class="loading"></span>-->
                <!--<p>建议尺寸168*168，支持jpg、png、gif，最大不能超过50KB</p>-->
                <p>温馨提示：暂不支持上传头像，请点击"选择头像"选择系统头像，上传功能后续开通</p>
                <button type="button" class="layui-btn upload-img" @click="openSelectImg()">
                 <!-- <i class="layui-icon">&#xe67c;</i>上传头像-->
                  选择头像
                </button>
              </div>
            </div>
          </div>

          <div class="layui-form layui-form-pane layui-tab-item">
            <div class="layui-form-item">
              <label for="L_nowpass" class="layui-form-label">当前密码</label>
              <div class="layui-input-inline">
                <input type="password" id="L_nowpass" name="nowpass" class="layui-input" v-model="passwords.oldPassword">
              </div>
            </div>
            <div class="layui-form-item">
              <label for="L_pass" class="layui-form-label">新密码</label>
              <div class="layui-input-inline">
                <input type="password" id="L_pass" name="pass" class="layui-input" v-model="passwords.newPassword">
              </div>
              <div class="layui-form-mid layui-word-aux">6到16个字符</div>
            </div>
            <div class="layui-form-item">
              <label for="L_repass" class="layui-form-label">确认密码</label>
              <div class="layui-input-inline">
                <input type="password" id="L_repass" name="repass" class="layui-input" v-model="passwords.newPassword1">
              </div>
            </div>
            <div class="layui-form-item">
              <button class="layui-btn" @click="modifyPassword()">确认修改</button>
            </div>
          </div>

          <!--
          <div class="layui-form layui-form-pane layui-tab-item">
            <ul class="app-bind">
              <li class="fly-msg app-havebind">
                <i class="iconfont icon-qq"></i>
                <span>已成功绑定，您可以使用QQ帐号直接登录Fly社区，当然，您也可以</span>
                <a href="javascript:;" class="acc-unbind" type="qq_id">解除绑定</a>

                <!-- <a href="" onclick="layer.msg('正在绑定微博QQ', {icon:16, shade: 0.1, time:0})" class="acc-bind" type="qq_id">立即绑定</a>
                <span>，即可使用QQ帐号登录Fly社区</span>
              </li>
              <li class="fly-msg">
                <i class="iconfont icon-weibo"></i>
                <!-- <span>已成功绑定，您可以使用微博直接登录Fly社区，当然，您也可以</span>
                <a href="javascript:;" class="acc-unbind" type="weibo_id">解除绑定</a>

                <a href="" class="acc-weibo" type="weibo_id"  onclick="layer.msg('正在绑定微博', {icon:16, shade: 0.1, time:0})" >立即绑定</a>
                <span>，即可使用微博帐号登录Fly社区</span>
              </li>
            </ul>
          </div>
            -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  function selectThis() {
    alert('123')
  }
    export default {
      name: "my-info",
      data:function(){
        return{
          userInfo:{},
          modifyInfo:{},
          passwords:{oldPassword:'',newPassword:'',newPassword1:''}
        }
      },
      methods:{
        add:function(){
          this.$router.push({path: 'add'})
        },
        modifyBasicInfo:function(){
          var isModify = false
          if(!this.modifyInfo.nickname){
            layer.msg('昵称必填的哦',{time:1000},function () {
              $('#L_username').focus()
            })
          }else if(this.userInfo.nickname != this.modifyInfo.nickname){
            isModify = true
          }

          if(this.userInfo.sex != this.modifyInfo.sex){
            isModify = true
          }

          if(this.userInfo.email != this.modifyInfo.email){
            isModify = true
          }

          if(this.userInfo.city != this.modifyInfo.city){
            isModify = true
          }

          if(this.userInfo.description != this.modifyInfo.description){
            isModify = true
          }
          var _this = this
          _this.modifyInfo.username = _this.userInfo.username
          if(isModify){
            _this.$http.post('api/user/updateUserBasicInfo',_this.modifyInfo,_this.userInfo.token).then(result => {
              if(result) {
                if (result.code == 1 && result.data) {
                  var user = result.data;
                  layer.msg('更新成功', {time: 1000}, function () {
                    _this.$store.commit('clearSession', _this.userInfo)
                    _this.$http.get("api/gateway/refreshToken", _this.userInfo.token).then(result => {
                      if (result.code == 1) {
                        user.token = result.data
                        _this.userInfo = user
                        _this.$store.commit('setSession', user);
                      }else{
                        layer.msg('请重新登陆', {time: 1000}, function () {
                          this.$router.push({path: '/'})
                        })
                      }
                    });
                  })
                } else {
                  layer.msg(result.message, {time: 1500})
                }
              }
            });
          }else{
            layer.msg('你没做信息更新，无需确认',{time:1000})
          }

        },
        myHomepage:function(){
          this.$router.push({path: 'myHomepage'})
        },myInfo:function(){
          this.$router.push({path: 'myInfo'})
        },myMessage:function(){
          this.$router.push({path: 'myMessage'})
        },myCollection:function(){
          this.$router.push({path: 'myMessage'})
        },
        modifyPassword:function () {
          var _this = this
          if(!_this.passwords.oldPassword){
            layer.msg('当前密码得填啊',{time:1000},function () {
              $('#L_nowpass').focus();
            });
          }else
          if(!_this.passwords.newPassword){
            layer.msg('新密码得填啊',{time:1000},function () {
              $('#L_pass').focus();
            });
          }else
          if(!_this.passwords.newPassword1){
            layer.msg('请再确认密码',{time:1000},function () {
              $('#L_repass').focus();
            });
          }else
          if(_this.passwords.newPassword != _this.passwords.newPassword1){
            layer.msg('两遍密码输的不一致啊！',{time:1000},function () {
              $('#L_repass').focus();
            });
          }else{
            _this.passwords.username = _this.userInfo.username
            _this.$http.post('api/user/updateUserPassword',_this.passwords,_this.userInfo.token).then(result => {
              if(result) {
                if (result.code == 1) {
                  layer.msg('密码修改成功，请牢记新密码', {time: 1000}, function () {
                    _this.passwords = {}
                    _this.$store.commit('clearSession', _this.userInfo)
                    _this.$http.get("api/gateway/refreshToken", _this.userInfo.token).then(result => {
                      if (result.code == 1) {
                        _this.userInfo.token = result.data
                        _this.$store.commit('setSession', _this.userInfo);
                      }else{
                        layer.msg('请重新登陆', {time: 1000}, function () {
                          this.$router.push({path: '/'})
                        })
                      }
                    });
                  })
                } else {
                  layer.msg(result.message, {time: 1500})
                }
              }
            })
          }
        },
        openSelectImg:function () {
          var html = '  <div class="layui-row info_photo"> ' +
                     '    <div class="layui-col-xs6 layui-col-sm6 layui-col-md4 info_photoSelect"> ' +
                     '      <a href="javascript:;"><img src="http://120.79.240.9:8080/headImg/1.jpg"></a>   ' +
                     '    </div> ' +
                     '    <div class="layui-col-xs6 layui-col-sm6 layui-col-md4 info_photoSelect">' +
                     '      <a href="javascript:;"><img src="http://120.79.240.9:8080/headImg/2.jpg"></a>' +
                     '    </div>' +
                     '    <div class="layui-col-xs6 layui-col-sm6 layui-col-md4 info_photoSelect">' +
                     '      <a href="javascript:;"><img src="http://120.79.240.9:8080/headImg/3.jpg"></a>' +
                     '    </div>' +
                     '    <div class="layui-col-xs6 layui-col-sm6 layui-col-md4 info_photoSelect"> ' +
                     '      <a href="javascript:;"><img src="http://120.79.240.9:8080/headImg/4.jpg"></a>   ' +
                     '    </div> ' +
                     '    <div class="layui-col-xs6 layui-col-sm6 layui-col-md4 info_photoSelect">' +
                     '      <a href="javascript:;"><img src="http://120.79.240.9:8080/headImg/5.jpg"></a>' +
                     '    </div>' +
                     '    <div class="layui-col-xs6 layui-col-sm6 layui-col-md4 info_photoSelect">' +
                     '      <a href="javascript:;"><img src="http://120.79.240.9:8080/headImg/6.jpg"></a>' +
                     '      <div class="info_test"><i class="layui-icon layui-icon-ok"></i></div>' +
                     '    </div>' +
                     '    <div class="layui-col-xs6 layui-col-sm6 layui-col-md4 info_photoSelect"> ' +
                     '      <a href="javascript:;"><img src="http://120.79.240.9:8080/headImg/7.jpg"></a>   ' +
                     '    </div> ' +
                     '    <div class="layui-col-xs6 layui-col-sm6 layui-col-md4 info_photoSelect">' +
                     '      <a href="javascript:;"><img src="http://120.79.240.9:8080/headImg/8.jpg"></a>' +
                     '    </div>' +
                     '    <div class="layui-col-xs6 layui-col-sm6 layui-col-md4 info_photoSelect">' +
                     '      <a href="javascript:;"><img src="http://120.79.240.9:8080/headImg/9.jpg"></a>' +
                     '    </div>' +
                     '  </div>'
            ,_this = this
            ,selectedSrc  ='';
          layer.open({
              type: 1
              ,title:'请选择系统头像'
              ,area:['400px','500px']
              ,btn: ['选好了']
              ,btnAlign: 'c'
              ,shadeClose:true
              ,content: html
              ,yes: function(index, layero){
              _this.$http.post('api/user/updateUserHeadImg',{username:_this.userInfo.username,imgUrl:selectedSrc},_this.userInfo.token).then(result => {
                  if(result.code ==1){
                    layer.msg('头像修改成功',{time:1000},function () {
                      var user = result.data
                      _this.$store.commit('clearSession', _this.userInfo)
                      _this.$http.get("api/gateway/refreshToken", _this.userInfo.token).then(result => {
                        if (result.code == 1) {
                          user.token = result.data
                          _this.userInfo = user
                          _this.$store.commit('setSession', user);
                          $('#showImg').attr('src',selectedSrc)
                          layer.close(index)
                        }else{
                          layer.msg('请重新登陆', {time: 1000}, function () {
                            this.$router.push({path: '/'})
                          })
                        }
                      });

                    })
                  }else{
                    layer.msg(result.message,{time:1500})
                  }
              })
              }
          })
          $('.layui-col-md4 a').on('click', function () {
            selectedSrc = $(this).find('img').eq(0).attr('src');
          })

        },

      },
      mounted(){
        var _this = this
        layui.use('form',function(){
          var form = layui.form
          form.val("modify",{"sex": _this.modifyInfo.sex})
          form.on('radio(sex)', function(data){
            _this.modifyInfo.sex = data.value
          });
        })
      },
      created(){
        this.userInfo = this.$store.state.session;

        if(!this.userInfo){
          layer.msg('抱歉，您无法访问',{time:1000},function () {
            this.$router.push({path: 'firstPage'})
          })
        }else{
          this.modifyInfo = {
            nickname:this.userInfo.nickname,
            sex:this.userInfo.sex,
            email:this.userInfo.email,
            city:this.userInfo.city,
            description:this.userInfo.description
          }
        }
       /* this.$http.get(url).then(result => {

        });*/
      }
    }
</script>

<style>
  .layui-col-md4 a img{
    margin: 2px 2px 2px 3px;
    max-height: 125px;
  }
  .myInfo_box{
    width: 80%;
    margin: 0 auto;
  }
  .info_personalBox .layui-input-inline span{
    display: block;
    border: 1px solid #e6e6e6;
    padding: 8px 15px;
    line-height: 20px;
    border-width: 1px;
    background: #efefef;
  }
  .info_role span{
    display: block;
    padding: 8px 15px;
    line-height: 20px;
    border-width: 1px;
  }
  .info_photoBox .layui-form-item{
    margin: 0 auto;
  }
  .info_photoBox .layui-form-item .avatar-add{
    width: auto;
    background: #ffffff;
  }
  .info_photo{
    padding: 14px;
  }
  .info_photo .layui-col-xs6 a{
    display: block;
  }
  .info_photo .layui-col-xs6 a img{
    margin: 4px;
    width: 116px;
    height: 116px;
  }
  .info_photoSelect{
    position: relative;
  }
  .info_photoSelect .info_test{
    width: 116px;
    height: 116px;
    background: rgba(0,0,0,0.5);
    position: absolute;
    top: 4px;
    left: 4px;
  }
  .info_photoSelect .info_test i{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #ffffff;
    font-size: 40px;
  }
</style>
