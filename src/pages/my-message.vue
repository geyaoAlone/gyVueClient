<template>
  <div>


    <div class="fly-panel fly-column small-title">
      <div class="layui-container">
        <ul class="layui-clear">
          <li class="layui-hide-xs "><a href="javascript:;" @click="myHomepage()">我的主页</a></li>
          <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block"><span class="fly-mid"></span></li>
          <li ><a href="javascript:;" @click="myInfo()">我的信息</a></li>
          <li class="layui-this"><a href="javascript:;" @click="myMessage()">我的消息</a></li>
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

    <div class="layui-row">
      <div class="layui-col-xs12 layui-col-sm6 message_chunk" v-for="(item ,i) in messageList" :key="i">
        <div class="message_interior">
          <img src="http://120.79.240.9:8080/headImg/8.jpg"/>
          <a>死老丁</a>
          <p>2018-12-12 12:12:12</p>
          <div class="message_content">
            这个好办，把啥啥啥弄到啥啥哈上就行了
          </div>
          <div>
            回复了<a href="javascript:;"> 这个怎么办？</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "my-message",
        data:function () {
          return{
            userInfo:{},
            messageList:[{},{},{},{},{},{},{},{}]
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
        },
        created(){
          this.userInfo = this.$store.state.session;
        }

    }
</script>

<style scoped>
  .layui-row{
    padding-left:9%;
    padding-right:9%;
  }
  .message_chunk{
    padding: 7px;
  }
  .message_interior{
    padding: 10px;
    background: #fff;
  }
  .message_interior img{
    display: block;
    width: 45px;
    height: 45px;
    margin: 0;
    border-radius: 2px;
  }
  .message_content{
    margin-top: 10px;
    padding: 10px 15px;
    background-color: #F2F2F5;
    border-radius: 5px;
    word-wrap: break-word;
  }
</style>
