<template>
  <div>
    <div class="fly-panel fly-column small-title">
      <div class="layui-container">
        <ul class="layui-clear">
          <li class="layui-hide-xs "><a href="javascript:;" @click="myHomepage()">我的主页</a></li>
          <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block"><span class="fly-mid"></span></li>
          <li ><a href="javascript:;" @click="myInfo()">我的信息</a></li>
          <li><a href="javascript:;" @click="myMessage()">我的消息</a></li>
          <li><a href="javascript:;" @click="myPosting()">我的帖子</a></li>
          <li v-if="userInfo != null && userInfo.authorities[0] =='ADMIN'"><a href="#/visitorsWall">查看留言</a></li>
          <li v-if="userInfo != null && userInfo.authorities[0] =='ADMIN'"><a href="#/addWebUpdate">添加更新</a></li>
          <li class="layui-this" v-if="userInfo != null && userInfo.authorities[0] =='ADMIN'"><a href="#/adminRegister">会员管理</a></li>
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
    <div class="layui-container fly-marginTop">
      <div class="fly-panel fly-panel-user" pad20>
        <div class="layui-tab layui-tab-brief" lay-filter="user">
          <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
            <div class="layui-tab-item layui-show">
              <div class="layui-form layui-form-pane">
                <div class="layui-form-item">
                  <label for="L_username" class="layui-form-label">用户名</label>
                  <div class="layui-input-inline">
                    <input type="text" id="L_username" name="username" class="layui-input" v-model="registerInfo.username">
                  </div>
                  <div class="layui-form-mid layui-word-aux">将会成为唯一的登入名</div>
                </div>
                <div class="layui-form-item">
                  <label for="L_nickname" class="layui-form-label">昵称</label>
                  <div class="layui-input-inline">
                    <input type="text" id="L_nickname" name="username"class="layui-input" v-model="registerInfo.nickname">
                  </div>
                </div>
                <div class="layui-form-item">
                  <label class="layui-form-label">性别</label>
                  <div class="layui-input-inline">
                    <input type="radio" name="sex" value="1" title="男" lay-filter="sex" checked>
                    <input type="radio" name="sex" value="2" title="女" lay-filter="sex">
                  </div>
                </div>
                <div class="layui-form-item">
                  <label for="L_email" class="layui-form-label">邮箱</label>
                  <div class="layui-input-inline">
                    <input type="text" id="L_email" name="email" class="layui-input" v-model="registerInfo.email">
                  </div>
                </div>
                <div class="layui-form-item">
                  <label for="L_vercode" class="layui-form-label">人类验证</label>
                  <div class="layui-input-inline">
                    <input type="text" id="L_vercode" name="vercode" placeholder="请回答后面的问题" @click="takecheckimg()" v-model="registerInfo.vercode" class="layui-input">
                  </div>
                  <div class="layui-form-mid login_img">
                    <img id="identifyCodeImg" @click="refreshImg()" alt="" title="算不出来？点击刷新"/>
                  </div>
                </div>
                <div class="layui-form-item">
                  <!--<button class="layui-btn" @click="register()">立即注册</button>-->
                  <button class="layui-btn" id="register">立即注册</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="fly-panel fly-panel-user" pad20 ref="user">
        <table lay-filter="user-table" id="userTable">
          <thead>
            <tr>
              <th lay-data="{field:'headPortraitUrl', width:'10%'}">头像</th>
              <th lay-data="{field:'username', width:'10%'}">用户名</th>
              <th lay-data="{field:'nickname', width:'15%'}">昵称</th>
              <th lay-data="{field:'userStatus', width:'8%'}">用户状态</th>
              <th lay-data="{field:'loginTimes', width:'9%', sort:true}">登陆次数</th>
              <th lay-data="{field:'createDate', width:'10%'}">注册时间</th>
              <th lay-data="{field:'sex', width:'6%'}">性别</th>
              <th lay-data="{field:'city', width:'8%'}">城市</th>
              <th lay-data="{field:'email'}">邮箱</th>
              <!--<th lay-data="{field:'right'}">操作</th>-->
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item ,i) in userList" :key="i" >
              <td><img :src="item.headPortraitUrl"/></td>
              <td>{{item.username}}</td>
              <td>{{item.nickname}}</td>
              <td >
                <span style="color:green" v-if="item.userStatus == '1'">正常</span>
                <span style="color:red" v-if="item.userStatus == '0'">禁用</span>
              </td>
              <td>{{item.loginTimes}}</td>
              <td>{{item.createDate}}</td>
              <td>
                <span v-if="item.sex == '1'">男</span>
                <span v-if="item.sex == '2'">女</span>
              </td>
              <td>{{item.city}}</td>
              <td>{{item.email}}</td>
              <!--<td class="sss">
                &lt;!&ndash;<a  v-if="item.userStatus == '0'" @click="updateUserStatus(item.username,'1',i)" >解禁</a>&ndash;&gt;
                  <a href="javascript:;" v-if="item.userStatus == '1'" @click="updateUserStatus(item.username,'0',i)">禁用</a>
              </td>-->
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

</template>

<script>
    export default {
        name: "admin-register",
      data:function () {
        return{
          userInfo:this.$store.state.session,
          registerInfo:{sex:"1"},
          userList:[]
        }
      },
      methods:{
        myPosting:function(){
          this.$router.push({path: 'myPosting'})
        },
        takecheckimg:function(){
          var username = this.registerInfo.username;
          if(!username){
            layer.msg('先填用户名',{time:1500},function(){
              $('#L_username').focus();
            })
            return
          }else{
            this.$http.get('/api/gateway/identifyCode?username='+username).then(result => {
              document.getElementById('identifyCodeImg').setAttribute( 'src','data:image/jpeg;base64,'+result.data);
            })
          }
        },
        refreshImg:function(){
          var username = this.registerInfo.username;
          if(username){
            this.$http.get('/api/gateway/identifyCode?username='+username).then(result => {
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
        add:function(){
          this.$router.push({path: 'add'})
        },
        myHomepage:function(){
          this.$router.push({path: 'myHomepage'})
        },
        myInfo:function(){
          this.$router.push({path: 'myInfo'})
        },
        myMessage:function(){
          this.$router.push({path: 'myMessage'})
        },
        myCollection:function(){
          this.$router.push({path: 'myCollection'})
        },
        register:function(){
          var _this = this
          layer.confirm("确定注册吗？",{icon:1},function(){
            var data = _this.registerInfo
            _this.$http.post('api/user/adminSignUp',data,_this.userInfo.token).then(result => {
              console.info(result)
              if(result){
                if(result.code == 1 && result.data){
                  layer.msg('恭喜！注册成功',{time:1000},function () {
                    _this.registerInfo = {}
                    _this.userList = _this.userList.unshift(result.data)
                    console.info(_this.userList)
                    var gao = _this.$refs.user.offsetTop
                    window.scrollTo({"behavior": "smooth", "top": gao})
                  })

                }else{
                  layer.msg(result.message,{time:1300})
                }
              }
          });

        })
        },
        updateUserStatus:function (username,status,i) {
          var _this = this
          _this.$http.get('api/user/updateUserStatus?operator='+_this.userInfo.username+'&username='+username+'&status='+status,_this.userInfo.token).then(result => {
            if(result) {
              if (result.code == 1) {
                layer.msg('操作成功',{time:1000},function () {
                  _this.userList[i].userStatus = status
                })
              }else{
                layer.msg(result.message,{time:2000})
              }
            }
          })
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
        let _this = this,table
        layui.use(['layer','table'], function() {
          var layer = layui.layer
          table = layui.table;
          var waiting = layer.msg('Lodding...', {shade: [0.5, '#393D49'],icon: 16,time: 3600*1000});
          if((!_this.userInfo) || _this.userInfo.authorities[0] !='ADMIN'){
            layer.msg('抱歉！您无权访问或账户已退出，请重新登陆',{time:2000},function(){
              _this.$router.push({path: 'login'})
            })
          }
          _this.$http.get("api/user/getAllUserInfo?username="+_this.userInfo.username,_this.userInfo.token).then(result => {
            if(result){
              if(result.code == 1 && result.data){
                _this.userList = result.data
                setTimeout(()=> {
                  table.init('user-table', {
                    page: true //开启分页
                    //height: 330 //设置高度
                    ,limit: 10 //注意：请务必确保 limit 参数（默认：10）是与你服务端限定的数据条数一致
                    //支持所有基础参数
                  })
                },100)
              }
            }
          })
          layer.close(waiting)
          $('#register').on('click', function () {
            layer.confirm("确定注册吗？",{icon:1},function(){
              var data = _this.registerInfo
              _this.$http.post('api/user/adminSignUp',data,_this.userInfo.token).then(result => {
                console.info(result)
                if(result){
                  if(result.code == 1 && result.data){
                    layer.msg('恭喜！注册成功',{time:1000},function () {
                      _this.registerInfo = {}
                      var newUser = result.data
                      _this.userList.unshift(newUser)
                      console.info(_this.userList)
                      var gao = _this.$refs.user.offsetTop
                      window.scrollTo({"behavior": "smooth", "top": gao})
                      setTimeout(()=> {
                        table.init('user-table', {page: true,limit: 10})
                      },100)
                    })

                  }else{
                    layer.msg(result.message,{time:1300})
                  }
                }
              });

            })
          })

        })

      }

    }
</script>

<style scoped>

</style>
