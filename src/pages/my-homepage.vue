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
    <div class="fly-home fly-panel fly-home1">



      <div class="personal_topBg">


        <div class="fly-column small-title personal_top" v-if="!isVisitor">
          <div class="layui-container layui-container1">
            <ul class="layui-clear homepage_top">
              <li class="layui-hide-xs layui-this"><a href="javascript:;" @click="homePage()">我的主页</a></li>
              <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block"><span class="fly-mid"></span></li>
              <li><a href="javascript:;" @click="myInfo()">我的信息</a></li>
              <li><a href="javascript:;" @click="myMessage()">我的消息</a></li>
              <li><a href="javascript:;" @click="myCollection()">我的收藏</a></li>
              <li v-if="userInfo != null && userInfo.authorities[0] =='ADMIN'"><a href="#/visitorsWall">查看留言</a></li>
              <li v-if="userInfo != null && userInfo.authorities[0] =='ADMIN'"><a href="#/addWebUpdate">添加更新</a></li>
              <li v-if="userInfo != null && userInfo.authorities[0] =='ADMIN'"><a href="#/adminRegister">会员管理</a></li>
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


        <div class="personal_topNumber">
          <ul>
          <li>
            <i>{{countByAuthor.zongshu}}</i>发帖量
          </li>
          <li>
            <i>{{ownCommentInfoList.length}}</i>回帖量
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
            <h3 class="fly-panel-title"><i class="layui-icon layui-icon-read"></i>{{userInfo.nickname}} 最近的发帖</h3>
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
            <h3 class="fly-panel-title"><i class="layui-icon layui-icon-survey"></i>{{userInfo.nickname}} 最近的回答</h3>
            <ul class="home-jieda">
              <li v-for="comment in ownCommentInfoList">
                <p>
                  <span>{{comment.createTime}}</span>
                  在<a href="javascript:;" @click="getDetail(comment.serialNumber)">{{comment.title}}</a>中回答：
                </p>
                <div class="home-dacontent" v-html="comment.replyContent"></div>
              </li>
              <div v-if="ownCommentInfoList ==[]" class="fly-none" style="min-height: 50px; padding:30px 0; height:auto;"><span>没有回答任何问题</span></div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import {fly} from '../util/editUtil.js';
    export default {
        name: "my-homepage",
        data:function(){
          return{
            isVisitor:true,
            userInfo:{},
            ownCatalogue:[],
            ownCommentInfoList:[],
            countByAuthor:{zongshu:0}
          }
        },
        methods:{
          add:function(){
            this.$router.push({path: 'add'})
          },
          getDetail:function(id){
            this.$router.push({path: 'detail',query:{id:id}})
          },homePage:function(){
            this.$router.push({path: 'myHomepage'})
          },myInfo:function(){
            this.$router.push({path: 'myInfo'})
          },myMessage:function(){
            this.$router.push({path: 'myMessage'})
          },myCollection:function(){
            this.$router.push({path: 'myMessage'})
          }
        },
        created(){
          var _this = this,
              username = _this.$route.params.username,
              url = "/api/lobby/getOwnCatalogue?",
              visitorSession = _this.$store.state.session
          console.info(username)
          console.info(visitorSession)
          //错误进入
          if(!username && !visitorSession){
            _this.$router.push({path: 'firstPage'})
          }

          //访客进入
          if(username && (!visitorSession || username != visitorSession.username)){
            url+="username="+username
          }

          //自己进入自己主页
          if((!username && visitorSession)
              ||(username == visitorSession.username)){
            this.isVisitor = false
            _this.userInfo = visitorSession;
            var username = this.userInfo.username
            url+="username="+username
          }

          _this.$http.get(url).then(result => {
            if(result != null){
              _this.ownCatalogue = result.data.ownCatalogue
              _this.userInfo = result.data.user
              if(result.data.countByAuthor){
                _this.countByAuthor = result.data.countByAuthor
              }

              var list = result.data.ownCommentInfoList
              list.forEach(comment=>{
                var content = fly.content(comment.replyContent)
                comment.replyContent = content
              })
              _this.ownCommentInfoList = list
            }

          });
        }
    }
</script>

<style scoped>
  .small-title{
    margin-bottom: 0px;
  }
  .personal_top{
    padding: 0;
  }
  .fly-home1{
    padding: 0 !important;
  }
  .personal_topBg{
    background: url("http://120.79.240.9:8080/personal_banner.png");
    width: 100%;
    height: 120px;
    background-size: cover;
    background-position: 50%;
    position: relative;
  }
  .personal_topNumber{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background: rgba(0,0,0,0.3);
  }
  .personal_topNumber ul{
    width: 40%;
    height: 60px;
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
    padding: 1px 0 2px 0;
  }
  .personal_topInfo{
    width: 100%;
  }
  .personal_topInfo img{
    width: 88px;
    height: 88px;
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
    /*margin-top: 18px;*/
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
  .personal_top{
    padding: 0;
    padding-top: 4px;
  }
  .homepage_top li a{
    color: #ffffff;
  }
  .layui-container1{
    height: 50px;
  }
  .homepage_top{
    float: left;
  }
</style>
