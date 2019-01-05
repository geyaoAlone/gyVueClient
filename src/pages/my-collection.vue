<template>
  <div>
    <div class="fly-panel fly-column small-title">
      <div class="layui-container">
        <ul class="layui-clear">
          <li class="layui-hide-xs "><a href="javascript:;" @click="myHomepage()">我的主页</a></li>
          <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block"><span class="fly-mid"></span></li>
          <li ><a href="javascript:;" @click="myInfo()">我的信息</a></li>
          <li><a href="javascript:;" @click="myMessage()">我的消息</a></li>
          <li class="layui-this"><a href="javascript:;" @click="myCollection()">我的收藏</a></li>
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
    <h1>暂无功能！等待开发</h1>
  </div>
</template>

<script>
  export default {
    name: "my-collection",
    data:function () {
      return{
        userInfo:{}
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

</style>
