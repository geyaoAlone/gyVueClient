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
          <li class="layui-this" v-if="JSON.stringify(userInfo) != '{}' && userInfo.authority =='ADMIN'"><a href="#/visitorsWall">查看留言</a></li>
          <li v-if="JSON.stringify(userInfo) != '{}' && userInfo.authority =='ADMIN'"><a href="#/addWebUpdate">添加更新</a></li>
          <li v-if="JSON.stringify(userInfo) != '{}' && userInfo.authority =='ADMIN'"><a href="#/adminRegister">会员注册</a></li>
        </ul>

        <div v-if="JSON.stringify(userInfo) != '{}'" class="fly-column-right layui-hide-xs">
          <!--<span class="fly-search"><i class="layui-icon"></i></span>-->
          <a href="javascript:;" @click="add()" class="layui-btn">发表新帖</a>
        </div>
        <div v-if="JSON.stringify(userInfo) != '{}'" class="layui-hide-sm layui-show-xs-block" style="margin-top: -10px; padding-bottom: 10px; text-align: center;">
          <a href="javascript:;" @click="add()" class="layui-btn">发表新帖</a>
        </div>
      </div>
    </div>
    <div class="layui-row">
      <div class="layui-col-xs12 message_chunk" v-for="(item ,i) in guestReplyList" :key="i">
        <div class="message_interior">
          <ul class="">
            <!--时间：{{item.createTime}}<br>-->
            <!--内容：{{item.content}}<br>-->
            <!--邮箱：{{item.email}}<br>-->
            <!--会员：{{item.username}}<br>-->
            <!--状态：{{item.dealStatus}}<br>-->
            <li>
              <i class="layui-icon layui-icon-date"></i>
              <p>{{item.createTime}}</p>
            </li>
            <li>
              <i class="layui-icon layui-icon-fonts-code"></i>
              <p>{{item.content}}</p>
            </li>
            <li v-if="item.email">
              <i class="layui-icon layui-icon-user"></i>
              <p>{{item.email}}</p>
            </li>
            <li v-if="item.username">
              <i class="layui-icon layui-icon-user"></i>
              <p>{{item.username}}</p>
            </li>
          </ul>
          <div class="visi_but" v-if="item.dealStatus =='0'">
            <a href="javascript:;" @click="sign(item.id)">标记为已处理</a>
          </div>
          <div class="visi_img" v-if="item.dealStatus =='1'">
            <img src="http://120.79.240.9:8080/gz.png" style="max-width: 80px"/>
          </div>
        </div>
      </div>
      <div v-if="guestReplyList.length == 0" class="fly-none" style="min-height: 50px; padding:30px 0; height:auto;"><i style="font-size:14px;">暂无任何留言</i></div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "visitors-wall",
      data:function () {
        return{
          userInfo:{},
          guestReplyList:{}
        }
      },
      methods:{
        myPosting:function(){
          this.$router.push({path: 'myPosting'})
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
        sign:function(id){
          var _this = this
          _this.$http.post("user/updateGuestReplyStatus",{id:id},layer,_this).then(result => {
            if(result){
              if(result.code == 1 && result.data.modifiedCountAvailable){
                layer.msg('标记成功',{time:1000},function () {
                  window.location.reload()
                })
              }
            }
          })
        }
      },
      created(){
        var _this = this
        _this.userInfo = JSON.parse(sessionStorage.getItem('user'))
        layui.use('layer', function() {
          var layer = layui.layer;
          _this.$http.get("user/queryGuestReply", layer, _this).then(result => {
            if (result) {
              if (result.code == 1) {
                _this.guestReplyList = result.data
              } else {
                layer.msg(result.message, {time: 1500}, function () {
                  _this.$router.push({path: 'firstPage'})
                })
              }
            }
          })
        })
      }

    }
</script>

<style scoped>
  .message_chunk{
    padding: 7px;
  }
  .message_interior{
    padding: 10px;
    background: #fff;
  }
  .message_interior{
    width: 90%;
    margin: 0 auto;
    padding: 20px;
    line-height: 24px;
    position: relative;
  }
  .message_interior ul li{
    height: 30px;
  }
  .message_interior ul li i{
    float: left;
    /*width: 1%;*/
    line-height: 30px;
    margin-right: 10px;
  }
  .message_interior ul li p{
    float: left;
    font-size: 16px;
    width: 90%;
    line-height: 30px;
  }
  .message_interior a{
    background: #009688;
    padding: 3px 10px;
    color: #FFFFFF;
    float: right;
    border-radius: 2px;
    font-size: 12px;
  }
  .visi_but{
    width: 100%;
    height: 40px;
  }
  .visi_img{
    position: absolute;
    right: 16px;
    top: 16px;
  }
  .visi_img i{
    font-size: 80px;
    line-height: 60px;
  }
</style>
