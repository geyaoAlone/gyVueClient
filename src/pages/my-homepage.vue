<template>
  <div>
    <!--老版开始-->
    <!--<div class="fly-home fly-panel">-->
      <!--<img :src="userInfo.headPortraitUrl">-->
      <!--<i class="iconfont icon-renzheng" title="小站认证"></i>-->
      <!--<h1>-->
        <!--{{userInfo.nickname}}-->
        <!--<i class="iconfont icon-nan" v-if="userInfo.sex =='1'"></i>-->
        <!--<i class="iconfont icon-nv" v-if="userInfo.sex =='2'"></i>-->
        <!--&lt;!&ndash;<i class="layui-badge fly-badge-vip">VIP3</i>&ndash;&gt;-->
<!--&lt;!&ndash;-->
        <!--<span style="color:#c00;">（管理员）</span>-->
        <!--<span style="color:#5FB878;">（社区之光）</span>-->
        <!--<span>（该号已被封）</span>-->
<!--&ndash;&gt;-->
      <!--</h1>-->

      <!--&lt;!&ndash;<p style="padding: 10px 0; color: #5FB878;">认证信息：layui 作者</p>&ndash;&gt;-->

      <!--<p class="fly-home-info">-->
        <!--&lt;!&ndash;<i class="iconfont icon-kiss" title="飞吻"></i><span style="color: #FF7200;">66666 飞吻</span>&ndash;&gt;-->
        <!--<i class="iconfont icon-shijian"></i><span>{{userInfo.createDate}} 加入</span>-->
        <!--<i class="iconfont icon-chengshi"></i><span>来自{{userInfo.city}}</span>-->
      <!--</p>-->

      <!--<p class="fly-home-sign">（{{userInfo.description}}）</p>-->

      <!--&lt;!&ndash;<div class="fly-sns" data-user="">-->
        <!--<a href="javascript:;" class="layui-btn layui-btn-primary fly-imActive" data-type="addFriend">加为好友</a>-->
        <!--<a href="javascript:;" class="layui-btn layui-btn-normal fly-imActive" data-type="chat">发起会话</a>-->
      <!--</div>&ndash;&gt;-->

    <!--</div>-->
    <!--老版结束-->

    <!--新版开始-->
    <div class="fly-home fly-panel personal_top">

      <div class="personal_topBg">
        <div class="personal_topNumber">
          <ul>
            <li>
              <i>1081</i>总阅读
            </li>
            <li>
              <i>1081</i>总阅读
            </li>
          </ul>
        </div>
      </div>

      <div class="personal_topInfo">
        <img :src="userInfo.headPortraitUrl">
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
        <p class="fly-home-info myHome_time">
          <span>{{userInfo.createDate}}加入</span>
          <span>来自{{userInfo.city}}</span>
        </p>
        <p class="fly-home-sign myHome_signature">{{userInfo.description}}</p>
      </div>
    </div>
    <!--新版结束-->


    <div class="layui-container">
      <div class="layui-row layui-col-space15">
        <div class="layui-col-md6 fly-home-jie">
          <div class="fly-panel myHome_conTitle">
            <h3 class="fly-panel-title"><i class="layui-icon layui-icon-read"></i>贤心 最近的发帖</h3>
            <ul class="jie-row">
              <li v-for="(item ,i) in ownCatalogue" :key="i" class="myHome_articleTitle">
                <!--<span class="fly-jing" v-if="item.best">精</span>-->
                <span class="layui-badge layui-bg-red" v-if="item.best">精</span>
                <span class="layui-badge layui-bg-red" v-if="!item.publicity">私</span>
                <!--<span class="fly-jing" v-if="!item.publicity">私</span>-->
                <a href="javascript:;" class="jie-title" @click="getDetail(item.serialNumber)">{{item.title}}</a>
                <i>{{item.createTime}}</i>
                <em class="layui-hide-xs">{{item.seenTimes}}阅/{{item.commentTimes}}答</em>
              </li>
              <div v-if="ownCatalogue == []" class="fly-none" style="min-height: 50px; padding:30px 0; height:auto;"><i style="font-size:14px;">没有发表任何求解</i></div>
            </ul>
          </div>
        </div>

        <div class="layui-col-md6 fly-home-da">
          <div class="fly-panel myHome_conTitle">
            <h3 class="fly-panel-title"><i class="layui-icon layui-icon-survey"></i>贤心 最近的回答</h3>
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

  .personal_top{
    padding: 0;
  }
  .personal_topBg{
    background: url("http://120.79.240.9:8080/personal_banner.png");
    width: 100%;
    height: 220px;
    background-size: cover;
    background-position: 50%;
    position: relative;
  }
  .personal_topNumber{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 65px;
    background: rgba(0,0,0,0.3);
  }
  .personal_topNumber ul{
    width: 40%;
    height: 65px;
    margin: 0 auto;
    color: #ffffff;
  }
  .personal_topNumber ul li{
    width: 100px;
    height: 45px;
    text-align: center;
    font-size: 12px;
    padding: 10px 0;
    float: left;
  }
  .personal_topNumber ul li:last-child{
    float: right;
  }
  .personal_topNumber ul li i{
    display: block;
    font-size: 20px;
    padding: 1px 0 4px 0;
  }
  .personal_topInfo{
    width: 100%;
  }
  .personal_topInfo img{
    width: 100px;
    height: 100px;
    border: 5px solid #ffffff;
    position: relative;
    margin-top: -40px;
  }
  .personal_topInfo h1{
    font-size: 20px;
    vertical-align: text-top;
  }
  .personal_topInfo h1 i{
    font-size: 12px;
  }
  .myHome_time i,.myHome_time span{
    font-size: 12px;
    color: #bbbbbb;
    padding-right: 8px;
  }
  .myHome_time span:last-child{
    border-left: 1px solid #dddddd;
    padding-left: 12px;
  }
  .myHome_signature{
    padding-bottom: 30px;
    color: #6666666;
    font-size: 14px;
    margin-top: 18px;
  }
  .myHome_conTitle h3{
    font-size: 16px;
  }
  .myHome_conTitle h3 i{
    font-size: 18px;
    margin-right: 8px;
    color: #000;
    vertical-align: middle;
  }
  .myHome_articleTitle span{
    max-width: 4%;
  }
  .myHome_articleTitle a{
    max-width: 50%;
    padding-right: 8px !important;
  }
  .myHome_articleTitle i{
    max-width: 28%;
  }
  .myHome_articleTitle em{
    max-width: 16%;
  }
</style>
