<template>
  <div>


    <div class="fly-panel fly-column small-title">
      <div class="layui-container">
        <ul class="layui-clear">
          <li class="layui-hide-xs "><a href="javascript:;" @click="myHomepage()">我的主页</a></li>
          <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block"><span class="fly-mid"></span></li>
          <li ><a href="javascript:;" @click="myInfo()">我的信息</a></li>
          <li class="layui-this"><a href="javascript:;" @click="myMessage()">我的消息</a></li>
          <li><a href="javascript:;" @click="myPosting()">我的帖子</a></li>
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

    <div class="layui-row">
      <div class="layui-col-xs12 layui-col-sm6 message_chunk" v-for="(item ,i) in messageList" :key="i">
        <div class="message_interior">
          <div class="mess_personalBox">
            <!--{{item}}-->
            <img :src="item.headPortraitUrl" @click="otherHomepage(item.username)"/>
            <div class="mess_name">
              <a href="javascript:;" @click="otherHomepage(item.username)">{{item.nickname}}</a>
              <p>{{item.createTime}}</p>
            </div>
            <div class="mess_operate">
              <span class="layui-btn layui-btn-xs jie-admin" @click="goDetail(item.serialNumber,item.nickname)">回复</span>
            </div>
          </div>
          <div class="message_content" v-html="item.replyContent">

          </div>
          <div class="mess_text">
            回复了<a href="javascript:;" @click="goDetail(item.serialNumber)"> {{item.title}}</a>
          </div>
        </div>
      </div>
      <div v-if="messageList.length == 0" class="fly-none" style="min-height: 50px; padding:30px 0; height:auto;"><i style="font-size:14px;">您暂无任何消息</i></div>
    </div>
  </div>
</template>

<script>
  import {fly} from '../util/editUtil.js';
    export default {
        name: "my-message",
        data:function () {
          return{
            userInfo:{},
            messageList:[]
          }
        },
        methods:{
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
          myPosting:function(){
            this.$router.push({path: 'myPosting'})
          },
          goDetail:function (id,name) {
            this.$router.push({path: 'detail',query:{id:id,name:name}})
          },
          otherHomepage:function (username) {
            this.$router.push({name: 'my-homepage', params: {username: username}})
          }
        },
        created(){
          var _this = this
          this.userInfo = this.$store.state.session;
          if(!this.userInfo){
            layer.msg('抱歉，您无权访问',{time:1000},function () {
              _this.$router.push({path: 'firstPage'})
            })
          }else {
            _this.$http.get("api/user/queryUserSelfReciveMessage?username="+this.userInfo.username, this.userInfo.token).then(result => {
              console.info(result)
              if(result){
                if(result.code == 1 && result.data){
                  result.data.forEach(content=>{
                    content.replyContent = fly.content(content.replyContent)
                  })
                  _this.messageList = result.data
                }
              }
            })
          }
        }

    }
</script>

<style scoped>
  .layui-col-sm6{
    width: 100%;
  }
  .layui-row{
    padding-left:9%;
    padding-right:9%;
  }
  .message_chunk{
    /*padding: 7px;*/
    border-bottom: 2px dotted #fff;
    overflow: hidden;
  }
  .message_chunk:last-child{
    border: none;
  }
  .message_interior{
    padding: 10px;
    background: #fff;
    padding-top: 16px;
  }
  .message_interior img{
    display: block;
    width: 46px;
    height: 46px;
    margin: 0;
    border-radius: 2px;
  }
  .message_content{
    margin-top: 10px;
    padding: 10px 15px;
    background-color: #F2F2F5;
    line-height: 24px;
    border-radius: 2px;
    word-wrap: break-word;
  }
  .mess_personalBox{
    height: 46px;
  }
  .mess_personalBox img{
    float: left;
  }
  .mess_name{
    height: 46px;
    float: left;
    margin-left: 14px;
  }
  .mess_name a{
    line-height: 28px;
  }
  .mess_name p{
    font-size: 12px;
    color: #9f9f9f;
  }
  .mess_text{
    font-size: 12px;
    color: #666;
    line-height: 30px;
    margin-top: 6px;
  }
  .mess_operate{
    float: right;
  }
  .mess_operate span{
    background: #ffffff;
    color: #999;
  }
</style>
