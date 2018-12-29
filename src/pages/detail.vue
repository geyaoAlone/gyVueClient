<template>
  <div>
    <div class="layui-hide-xs">

      <div class="fly-panel fly-column">
        <div class="layui-container">
          <ul class="layui-clear">
            <li class="layui-hide-xs layui-this"><a href="/">最新<span class="layui-badge-dot"></span></a></li>
            <li><a href="javascript:;" @click="queryType($event,'question')">问题</a></li>
            <li><a href="javascript:;" @click="queryType($event,'gambit')">话题</a></li>
            <li><a href="javascript:;" @click="queryType($event,'share')">分享</a></li>
            <li><a href="javascript:;" @click="queryType($event,'original')">原创</a></li>
            <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block"><span class="fly-mid"></span></li>

            <!-- 用户登入后显示 -->
            <li v-if='userSession != null' class="layui-hide-xs layui-hide-sm layui-show-md-inline-block"><a href="user/index.html">我的发表</a></li>
            <li v-if='userSession != null' class="layui-hide-xs layui-hide-sm layui-show-md-inline-block"><a href="user/index.html#collection">我的收藏</a></li>
          </ul>

          <div v-if='userSession != null' class="fly-column-right layui-hide-xs">
            <a href="javascript:;" @click="add()" class="layui-btn">发表新帖</a>
          </div>
          <div v-if='userSession != null' class="layui-hide-sm layui-show-xs-block" style="margin-top: -10px; padding-bottom: 10px; text-align: center;">
            <a href="javascript:;" @click="add()" class="layui-btn">发表新帖</a>
          </div>
        </div>
      </div>

    </div>

    <div class="layui-container">
      <div class="layui-row layui-col-space15">

        <div class="layui-col-md8 content detail">
          <div class="fly-panel detail-box">
            <h1 class="detail_lableTip">
              <span class="layui-badge fly-detail-column layui-bg-green">{{detail.typeName}}</span>
              {{detail.title}}
              <span class="layui-badge layui-bg-red" v-if="detail.best">精</span>
              <span class="layui-badge layui-bg-green" v-if="detail.stick">顶</span>
              <span class="layui-badge layui-bg-red" v-if="!detail.publicity">密</span>
            </h1>
            <div class="fly-detail-info">
              <!-- <span class="layui-badge">审核中</span> -->


              <!--<span class="layui-badge" style="background-color: #999;" v-if="detail.status=='0'">未结</span>-->
               <!--<span class="layui-badge" style="background-color: #5FB878;" v-if="detail.status=='1'">已结</span>-->

              <!--<span class="layui-badge layui-bg-black" v-if="detail.stick">置顶</span>-->


              <div class="fly-admin-box detail_time_operation" data-id="123">
                <div class="detail_time">
                  <a href="javascript:;" class="fly-link" @click="authorInfo(detail.author)">
                    <cite>{{detail.nickName}}</cite>
                    <i class="iconfont icon-renzheng" title=""></i>
                    <!--<i class="layui-badge fly-badge-vip">VIP3</i>-->
                  </a>
                  <span>{{detail.createTime}}</span>
                </div>
                <div class="detail_operation">

                  <span class="fly-list-nums detail_read">
                    <a href="#comment"><i class="iconfont" title="回答">&#xe60c;</i>{{detail.commentTimes}}</a>
                    <a><i class="iconfont" title="人气">&#xe60b;</i> {{detail.seenTimes}}</a>
                  </span>

                  <div class="detail_dst_operation" v-if='userSession != null && userSession.username == detail.author'>
                    <span class="layui-btn layui-btn-xs jie-admin" @click="dealThisDetail(detail.serialNumber,'del',true)">删帖</span>

                    <span class="layui-btn layui-btn-xs jie-admin" @click="dealThisDetail(detail.serialNumber,'stick',true)" v-if="userSession.authorities[0] =='ADMIN' && !detail.stick">置顶</span>
                    <span class="layui-btn layui-btn-xs jie-admin" @click="dealThisDetail(detail.serialNumber,'stick',false)" v-if="userSession.authorities[0] =='ADMIN' && detail.stick">置顶个屁</span>

                    <span class="layui-btn layui-btn-xs jie-admin" @click="dealThisDetail(detail.serialNumber,'best',true)" v-if="!detail.best">加精</span>
                    <span class="layui-btn layui-btn-xs jie-admin" @click="dealThisDetail(detail.serialNumber,'best',false)" v-if="detail.best">加鸡毛精</span>

                    <span class="layui-btn layui-btn-xs jie-admin" @click="dealThisDetail(detail.serialNumber,'publicity',true)" v-if="!detail.publicity">公开</span>
                    <span class="layui-btn layui-btn-xs jie-admin" @click="dealThisDetail(detail.serialNumber,'publicity',false)" v-if="detail.publicity">藏起来</span>

                  </div>
                </div>
              </div>
              <!--<span class="fly-list-nums">-->
                <!--<a href="#comment"><i class="iconfont" title="回答">&#xe60c;</i>{{detail.commentTimes}}</a>-->
                <!--<i class="iconfont" title="人气">&#xe60b;</i> {{detail.seenTimes}}-->
              <!--</span>-->
            </div>

            <!--<div class="detail-about">-->
              <!--<a class="fly-avatar" href="javascript:;">-->
                <!--<img :src="detail.headPortraitUrl" alt="贤心">-->
              <!--</a>-->
              <!--<div class="fly-detail-user">-->
                <!--<a href="javascript:;" class="fly-link">-->
                  <!--<cite>{{detail.nickName}}</cite>-->
                  <!--<i class="iconfont icon-renzheng" title=""></i>-->
                  <!--&lt;!&ndash;<i class="layui-badge fly-badge-vip">VIP3</i>&ndash;&gt;-->
                <!--</a>-->
                <!--&lt;!&ndash;<span>{{detail.createTime}}</span>&ndash;&gt;-->
              <!--</div>-->
              <!--<div class="detail-hits" id="LAY_jieAdmin" data-id="123" v-if='userSession != null'>-->
                <!--<span style="padding-right: 10px; color: #FF7200">悬赏：60飞吻</span>-->
                <!--&lt;!&ndash;<span class="layui-btn layui-btn-xs jie-admin" type="edit"><a href="add.html">编辑此贴</a></span>&ndash;&gt;-->
              <!--</div>-->
            <!--</div>-->
            <div class="detail-body photos" v-html="detail.content"></div>


            <!--用户头像/信息开始-->
            <!--<div class="detail-about detail_aboutAuthor">-->
              <!--<a class="fly-avatar" href="javascript:;">-->
                <!--<img :src="detail.headPortraitUrl" alt="贤心">-->
              <!--</a>-->
              <!--<div class="fly-detail-user">-->
                <!--<a href="javascript:;" class="fly-link">-->
                  <!--<cite>{{detail.nickName}}</cite>-->
                  <!--<i class="iconfont icon-renzheng" title=""></i>-->
                  <!--&lt;!&ndash;<i class="layui-badge fly-badge-vip">VIP3</i>&ndash;&gt;-->
                <!--</a>-->
                <!--&lt;!&ndash;<span>{{detail.createTime}}</span>&ndash;&gt;-->
              <!--</div>-->
            <!--</div>-->
            <!--用户头像/信息开始-->


          </div>

          <div class="fly-panel detail-box" id="flyReply">
            <fieldset class="layui-elem-field layui-field-title" style="text-align: center;">
              <legend>回帖</legend>
            </fieldset>

            <ul class="jieda" id="jieda" >
              <li class="jieda-daan" v-for="(item ,i) in commentList">
                <div class="detail-about detail-about-reply">
                  <a class="fly-avatar" href="">
                    <img :src="item.authorHeadUrl" alt=" ">
                  </a>
                  <div class="fly-detail-user">
                    <a href="" class="fly-link">
                      <cite>{{item.author}}</cite>
                      <i class="iconfont icon-renzheng" title="VIP"></i>
                      <!--<i class="layui-badge fly-badge-vip">VIP3</i>-->
                    </a>

                    <span v-if="item.username == detail.author">(楼主)</span>
                    <!--
                    <span style="color:#5FB878">(管理员)</span>
                    <span style="color:#FF9E3F">（社区之光）</span>
                    <span style="color:#999">（该号已被封）</span>
                    -->
                  </div>

                  <div class="detail-hits">
                    <span>{{item.createTime}}</span>
                  </div>

                  <!--<i class="iconfont icon-caina" title="最佳答案"></i>-->
                </div>
                <div class="detail-body jieda-body photos" v-html="item.replyContent">

                </div>
                <div class="jieda-reply">
                <span class="jieda-zan" type="zan" @click="thumbUp($event,item.id,i)">
                  <i class="iconfont icon-zan"></i>
                  <em>{{item.thumbUpTimes}}</em>
                </span>
                <span type="reply" @click="reply(item.author)">
                  <i class="iconfont icon-svgmoban53"></i>回复
                </span>
                  <div class="jieda-admin" v-if="userSession != null && userSession.username == item.username">
                    <span type="del" @click="del(item.id)">删除</span>
                    <!-- <span class="jieda-accept" type="accept">采纳</span> -->
                  </div>
                </div>
              </li>


              <!-- 无数据时 -->
               <li class="fly-none" v-if="commentList == []">消灭零回复</li>
            </ul>

            <div class="layui-form layui-form-pane">
              <div class="layui-form-item layui-form-text">
                <a name="comment"></a>
                <div class="layui-input-block">
                  <textarea id="L_content" v-model="content" name="content" placeholder="请输入内容"  class="layui-textarea fly-editor" style="height: 150px;"></textarea>
                </div>
              </div>
              <div class="layui-form-item">
                <button class="layui-btn" @click="sbReply()">提交回复</button>
              </div>
            </div>
          </div>
        </div>


        <div class="layui-col-md4">
          <dl class="fly-panel fly-list-one">
            <dt class="fly-panel-title">本周热议</dt>
            <dd v-for="(item ,i) in heatData">
              <a href="javascript:;" @click="otherDetail(item.serialNumber)">{{item.title}}</a>
              <span><i class="iconfont icon-pinglun1"></i> {{item.commentTimes}}</span>
            </dd>


            <div class="fly-none" v-if="heatData == []">没有相关数据</div>
          </dl>

         <!-- <div class="fly-panel">
            <div class="fly-panel-title">
              这里可作为广告区域
            </div>
            <div class="fly-panel-main">
              <a href="http://layim.layui.com/?from=fly" target="_blank" class="fly-zanzhu" time-limit="2017.09.25-2099.01.01" style="background-color: #5FB878;">LayIM 3.0 - layui 旗舰之作</a>
            </div>
          </div>

          <div class="fly-panel" style="padding: 20px 0; text-align: center;">
            <img src="" style="max-width: 100%;" alt="layui">
            <p style="position: relative; color: #666;">微信扫码关注 layui 公众号</p>
          </div>-->

        </div>

      </div>
    </div>

  </div>
</template>

<script>
    import {fly} from '../util/detailUtils.js';
    export default {
        name: "detail",
        data: function() {
          return {
            userSession: this.$store.state.session,
            detail:{},
            heatData:[],
            content:'',
            commentList:[]
          }
        },
        methods:{
          otherDetail:function(id){
            this.$http.get('/api/lobby/queryConnotationDetail?serialNumber='+id).then(result => {
              console.info(result)
              var data = result.data
              data.detailData.content = fly.content(data.detailData.content)
              this.detail = data.detailData
              this.heatData = data.heatData
              data.commentList.forEach(comment=>{
                comment.replyContent = fly.content(comment.replyContent)
              });
              this.commentList = data.commentList;

            });
          },
          queryType:function (e,type) {
            var dom = $(e.srcElement).parent();
            if(!dom.hasClass('layui-this')){
              dom.parent().find('.layui-this').removeClass('layui-this');
              dom.addClass('layui-this');
            }
            this.$router.push({name: 'first-page', params: {type: type}})

          },
          sbReply:function(){

            if(this.userSession){
              var comment = {serialNumber : this.detail.serialNumber,
                                   author : this.userSession.nickname,
                                 username : this.userSession.username,
                             replyContent : this.content,
                            authorHeadUrl : this.userSession.headPortraitUrl,
                             thumbUpTimes : 0
              }
              var _this = this
              this.$http.post('api/user/saveComment',comment,this.userSession.token).then(result => {
                result.data.forEach(comment=>{
                  comment.replyContent = fly.content(comment.replyContent)
                });
                this.commentList =result.data
                layer.msg("评论成功",{time:1000},function(){
                  _this.content = ''
                  _this.detail.commentTimes += 1
                })
              });
            }else{
              layer.msg("请先登陆",{time:1000})
            }
          },
          thumbUp:function (e,id,i) {
            var dom = $(e.srcElement);
            if(dom.hasClass('zanok')){
              layer.msg("您已点过赞",{time:1000})
            }else{
              var URL = "/api/lobby/updateThumbUp?id="+id+"&serialNumber="+this.detail.serialNumber
              if(this.userSession){
                URL += "&username="+this.userSession.username
              }
              this.$http.get(URL).then(result => {
                if(result.code ==1){
                  dom.addClass('zanok');
                  this.commentList[i].thumbUpTimes += 1
                  layer.msg("点赞成功",{time:1000})
                }
                if(result.code ==0){
                  dom.addClass('zanok');
                  layer.msg("您已点过赞",{time:1000})
                }
              })
            }
          },
          reply:function (replyer) {
            if(this.userSession){
              this.content += "@"+replyer
            }else{
              layer.msg("请先登陆",{time:1000})
            }
          },
          del:function(id){
            if(this.userSession){
              let _this = this
              layer.confirm("确定删除此回帖？",{icon:3},function () {
                _this.$http.get('/api/user/delComment?id='+id+'&serialNumber='+_this.detail.serialNumber,_this.userSession.token).then(result => {
                  if(result.data != null){
                    layer.msg("删除成功",{time:1000})
                    _this.commentList = result.data
                    _this.detail.commentTimes -= 1
                  }
                })
              })
            }else{
              layer.msg("请先登陆",{time:1000})
            }
          },
          dealThisDetail:function(id,type,value){
            var _this = this
            if(this.userSession) {
              var str = '确定操作？'
              if('del' == type) {
                str = '确定删除此帖吗？'
              }
              layer.confirm(str,{icon:3},function () {
                _this.$http.get('/api/user/dealArticle?id=' + id + '&type=' + type + '&val=' + value,_this.userSession.token).then(result => {
                  if (result.code == 1) {
                    if('del' == type) {
                      layer.msg('删除成功',{time:1000},function(){
                        _this.$router.push({path: '/'})
                      })
                    }else{
                      _this.detail[type] = value
                      layer.close('confirm')
                    }
                  }
                })
              });
            }else{
              layer.msg("请先登陆", {time: 1000})
            }
          },
          authorInfo:function (username) {
            //this.$router.push({path: 'myHomepage',query:{nickname:username}})
            this.$router.push({name: 'my-homepage', params: {username: username}})
          }
        },
        mounted(){
          fly.vue(this);//把参数传入控件
          fly.layEditor({
            elem: '.fly-editor'
          });
        },
        created(){
          let _this = this
          var URL = '/api/lobby/queryConnotationDetail?serialNumber='+_this.$route.query.id
          if(_this.userSession){
            URL +='&username='+_this.userSession.username
          }
          _this.$http.get(URL).then(result => {
            var data = result.data
            console.info(data)
            data.detailData.content = fly.content(data.detailData.content)
            _this.detail = data.detailData
            _this.heatData = data.heatData
            data.commentList.forEach(comment=>{
              comment.replyContent = fly.content(comment.replyContent)
            });
            _this.commentList = data.commentList;
            //zanok
          });

        }
    }
</script>

<style scoped>
  .detail_lableTip span:first-child{
     background: rgba(0,0,0,0) !important;
     color: #bbbbbb !important;
     border: 1px solid #bbbbbb;
     border-radius: 4px;
     margin-right: 10px;
     top: -4px;
     margin-left: 0;
   }
  .detail_lableTip span{
    border-radius: 4px;
    margin-left: 10px;
    top: -4px;
  }
  .detail_time_operation{
    width: 100%;
    height: 30px;
    /*background: #eeeeee;*/
    margin-left: 0;
    border-bottom: 1px dotted #dfdfdf;
    padding-bottom: 10px;
  }
  .detail_time{
    line-height: 30px;
    width: 40%;
    float: left;
    font-size: 12px;
    color: #999999;
  }
  .detail_time a{
    margin-right: 10px;
  }
  .detail_time a i{
    font-size: 12px;
  }

  .detail_operation{
    min-width: 10%;
    float: right;
    height: 30px;
    /*background: red;*/
  }
  .detail_read{
    position: static;
    float: left;
    width: auto;
  }
  .detail_read a{
    font-size: 12px;
  }
  .detail_read a i{
    font-size: 14px;
    color: #999;
    line-height: 30px;
  }
  .detail_read a:last-child{
  }
  .detail_dst_operation{
    float: left;
    margin-left: 10px;
    border-left: 1px solid #eeeeee;
    padding-right: 20px;
    margin-top: 6px;
  }
  .detail_dst_operation span{
    background: rgba(0,0,0,0);
    color: #999;
    /*line-height: 30px;*/
  }
  .detail_dst_operation span:first-child{
    padding-left: 10px;
  }
  .detail-body{
    font-size: 14px;
  }

  .detail_aboutAuthor{
    margin-top: 30px;
    height: 30px;
  }
  .detail_aboutAuthor img{
    width: 26px;
    height: 26px;
  }
  .detail-body hr,hr{
    background-color: #ffffff !important;
  }
  pre{
    /*background-color: #e7dfc7;*/
    /*color: #3769b0;*/
    font-size: 14px;
    border-left: 6px solid #468a85;
  }
</style>
