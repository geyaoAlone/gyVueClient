<template>
  <div>
    <div class="fly-home fly-panel">
      <img :src="userInfo.headPortraitUrl">
      <i class="iconfont icon-renzheng" title="小站认证"></i>
      <h1>
        {{userInfo.nickname}}
        <i class="iconfont icon-nan" v-if="userInfo.sex =='1'"></i>
        <i class="iconfont icon-nv" v-if="userInfo.sex =='2'"></i>
        <!--<i class="layui-badge fly-badge-vip">VIP3</i>-->
<!--
        <span style="color:#c00;">（管理员）</span>
        <span style="color:#5FB878;">（社区之光）</span>
        <span>（该号已被封）</span>
-->
      </h1>

      <!--<p style="padding: 10px 0; color: #5FB878;">认证信息：layui 作者</p>-->

      <p class="fly-home-info">
        <!--<i class="iconfont icon-kiss" title="飞吻"></i><span style="color: #FF7200;">66666 飞吻</span>-->
        <i class="iconfont icon-shijian"></i><span>{{userInfo.createDate}} 加入</span>
        <i class="iconfont icon-chengshi"></i><span>来自{{userInfo.city}}</span>
      </p>

      <p class="fly-home-sign">（{{userInfo.description}}）</p>

      <!--<div class="fly-sns" data-user="">
        <a href="javascript:;" class="layui-btn layui-btn-primary fly-imActive" data-type="addFriend">加为好友</a>
        <a href="javascript:;" class="layui-btn layui-btn-normal fly-imActive" data-type="chat">发起会话</a>
      </div>-->

    </div>

    <div class="layui-container">
      <div class="layui-row layui-col-space15">
        <div class="layui-col-md6 fly-home-jie">
          <div class="fly-panel">
            <h3 class="fly-panel-title">贤心 最近的发帖</h3>
            <ul class="jie-row">
              <li v-for="(item ,i) in ownCatalogue" :key="i" >
                <span class="fly-jing" v-if="item.best">精</span>
                <span class="fly-jing" v-if="!item.publicity">私</span>
                <a href="javascript:;" class="jie-title" @click="getDetail(item.serialNumber)">{{item.title}}</a>
                <i>{{item.createTime}}</i>
                <em class="layui-hide-xs">{{item.seenTimes}}阅/{{item.commentTimes}}答</em>
              </li>
              <div v-if="ownCatalogue == []" class="fly-none" style="min-height: 50px; padding:30px 0; height:auto;"><i style="font-size:14px;">没有发表任何求解</i></div>
            </ul>
          </div>
        </div>

        <div class="layui-col-md6 fly-home-da">
          <div class="fly-panel">
            <h3 class="fly-panel-title">贤心 最近的回答</h3>
            <ul class="home-jieda">
              <li>
                <p>
                  <span>1分钟前</span>
                  在<a href="" target="_blank">tips能同时渲染多个吗?</a>中回答：
                </p>
                <div class="home-dacontent">
                  尝试给layer.photos加上这个属性试试：
                  <pre>
full: true
</pre>
                  文档没有提及
                </div>
              </li>
              <li>
                <p>
                  <span>5分钟前</span>
                  在<a href="" target="_blank">在Fly社区用的是什么系统啊?</a>中回答：
                </p>
                <div class="home-dacontent">
                  Fly社区采用的是NodeJS。分享出来的只是前端模版
                </div>
              </li>

              <!-- <div class="fly-none" style="min-height: 50px; padding:30px 0; height:auto;"><span>没有回答任何问题</span></div> -->
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "my-homepage",
        data:function(){
          return{
            userInfo:{},
            ownCatalogue:[]
          }
        },
        created(){
          var username = this.$route.params.username
          var _this = this
          var url = "/api/lobby/getOwnCatalogue?"

          if(username){
            url+="username="+username
          }else{
            _this.userInfo = _this.$store.state.session;
            if(!_this.userInfo){
              _this.$router.push({path: 'firstPage'})
            }
            var username = this.userInfo.username
            url+="username="+username
          }

          this.$http.get(url).then(result => {
            if(result != null){
              this.ownCatalogue = result.data.ownCatalogue
              this.userInfo = result.data.user
            }

          });



        }
    }
</script>

<style scoped>

</style>
