<template>
  <div>
    <div class="layui-hide-xs">

      <div class="fly-panel fly-column">
        <div class="layui-container">
          <ul class="layui-clear">
            <li class="layui-hide-xs layui-this"><a href="/">最新<span class="layui-badge-dot"></span></a></li>
            <li><a href="javascript:;">问题</a></li>
            <li><a href="javascript:;">话题</a></li>
            <li><a href="javascript:;">分享</a></li>
            <li><a href="javascript:;">原创</a></li>
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
            <h1 class="detail_lableTip"><span class="layui-badge layui-bg-green fly-detail-column">{{detail.typeName}}</span>{{detail.title}}<span class="layui-badge layui-bg-red" v-if="detail.best">精</span></h1>
            <div class="fly-detail-info">
              <!-- <span class="layui-badge">审核中</span> -->


              <!--<span class="layui-badge" style="background-color: #999;" v-if="detail.status=='0'">未结</span>-->
               <!--<span class="layui-badge" style="background-color: #5FB878;" v-if="detail.status=='1'">已结</span>-->

              <!--<span class="layui-badge layui-bg-black" v-if="detail.stick">置顶</span>-->


              <div class="fly-admin-box detail_time_operation" data-id="123">
                <div class="detail_time">
                  <a href="javascript:;" class="fly-link">
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

                  <div class="detail_dst_operation" v-if='userSession != null'>
                    <span class="layui-btn layui-btn-xs jie-admin" type="del">删帖</span>

                    <span class="layui-btn layui-btn-xs jie-admin" type="set" field="stick" rank="1">置顶</span>
                    <!-- <span class="layui-btn layui-btn-xs jie-admin" type="set" field="stick" rank="0" style="background-color:#ccc;">取消置顶</span> -->

                    <span class="layui-btn layui-btn-xs jie-admin" type="set" field="status" rank="1">加精</span>
                    <!-- <span class="layui-btn layui-btn-xs jie-admin" type="set" field="status" rank="0" style="background-color:#ccc;">取消加精</span> -->
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

          </div>

          <div class="fly-panel detail-box" id="flyReply">
            <fieldset class="layui-elem-field layui-field-title" style="text-align: center;">
              <legend>回帖</legend>
            </fieldset>

            <ul class="jieda" id="jieda">
              <li data-id="111" class="jieda-daan">
                <a name="item-1111111111"></a>
                <div class="detail-about detail-about-reply">
                  <a class="fly-avatar" href="">
                    <img src="https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg" alt=" ">
                  </a>
                  <div class="fly-detail-user">
                    <a href="" class="fly-link">
                      <cite>贤心</cite>
                      <i class="iconfont icon-renzheng" title="认证信息：XXX"></i>
                      <i class="layui-badge fly-badge-vip">VIP3</i>
                    </a>

                    <span>(楼主)</span>
                    <!--
                    <span style="color:#5FB878">(管理员)</span>
                    <span style="color:#FF9E3F">（社区之光）</span>
                    <span style="color:#999">（该号已被封）</span>
                    -->
                  </div>

                  <div class="detail-hits">
                    <span>2017-11-30</span>
                  </div>

                  <i class="iconfont icon-caina" title="最佳答案"></i>
                </div>
                <div class="detail-body jieda-body photos">
                  <p>香菇那个蓝瘦，这是一条被采纳的回帖</p>
                </div>
                <div class="jieda-reply">
              <span class="jieda-zan zanok" type="zan">
                <i class="iconfont icon-zan"></i>
                <em>66</em>
              </span>
                  <span type="reply">
                <i class="iconfont icon-svgmoban53"></i>
                回复
              </span>
                  <div class="jieda-admin">
                    <span type="edit">编辑</span>
                    <span type="del">删除</span>
                    <!-- <span class="jieda-accept" type="accept">采纳</span> -->
                  </div>
                </div>
              </li>

              <li data-id="111">
                <a name="item-1111111111"></a>
                <div class="detail-about detail-about-reply">
                  <a class="fly-avatar" href="">
                    <img src="https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg" alt=" ">
                  </a>
                  <div class="fly-detail-user">
                    <a href="" class="fly-link">
                      <cite>贤心</cite>
                    </a>
                  </div>
                  <div class="detail-hits">
                    <span>2017-11-30</span>
                  </div>
                </div>
                <div class="detail-body jieda-body photos">
                  <p>蓝瘦那个香菇，这是一条没被采纳的回帖</p>
                </div>
                <div class="jieda-reply">
              <span class="jieda-zan" type="zan">
                <i class="iconfont icon-zan"></i>
                <em>0</em>
              </span>
                  <span type="reply">
                <i class="iconfont icon-svgmoban53"></i>
                回复
              </span>
                  <div class="jieda-admin">
                    <span type="edit">编辑</span>
                    <span type="del">删除</span>
                    <span class="jieda-accept" type="accept">采纳</span>
                  </div>
                </div>
              </li>

              <!-- 无数据时 -->
              <!-- <li class="fly-none">消灭零回复</li> -->
            </ul>

            <div class="layui-form layui-form-pane">
              <form action="/jie/reply/" method="post">
                <div class="layui-form-item layui-form-text">
                  <a name="comment"></a>
                  <div class="layui-input-block">
                    <textarea id="L_content" name="content" required lay-verify="required" placeholder="请输入内容"  class="layui-textarea fly-editor" style="height: 150px;"></textarea>
                  </div>
                </div>
                <div class="layui-form-item">
                  <input type="hidden" name="jid" value="123">
                  <button class="layui-btn" lay-filter="*" lay-submit>提交回复</button>
                </div>
              </form>
            </div>
          </div>
        </div>


        <div class="layui-col-md4">
          <dl class="fly-panel fly-list-one">
            <dt class="fly-panel-title">本周热议</dt>
            <dd>
              <a href="">基于 layui 的极简社区页面模版</a>
              <span><i class="iconfont icon-pinglun1"></i> 16</span>
            </dd>
            <dd>
              <a href="">基于 layui 的极简社区页面模版</a>
              <span><i class="iconfont icon-pinglun1"></i> 16</span>
            </dd>
            <dd>
              <a href="">基于 layui 的极简社区页面模版</a>
              <span><i class="iconfont icon-pinglun1"></i> 16</span>
            </dd>
            <dd>
              <a href="">基于 layui 的极简社区页面模版</a>
              <span><i class="iconfont icon-pinglun1"></i> 16</span>
            </dd>
            <dd>
              <a href="">基于 layui 的极简社区页面模版</a>
              <span><i class="iconfont icon-pinglun1"></i> 16</span>
            </dd>
            <dd>
              <a href="">基于 layui 的极简社区页面模版</a>
              <span><i class="iconfont icon-pinglun1"></i> 16</span>
            </dd>
            <dd>
              <a href="">基于 layui 的极简社区页面模版</a>
              <span><i class="iconfont icon-pinglun1"></i> 16</span>
            </dd>
            <dd>
              <a href="">基于 layui 的极简社区页面模版</a>
              <span><i class="iconfont icon-pinglun1"></i> 16</span>
            </dd>
            <dd>
              <a href="">基于 layui 的极简社区页面模版</a>
              <span><i class="iconfont icon-pinglun1"></i> 16</span>
            </dd>
            <dd>
              <a href="">基于 layui 的极简社区页面模版</a>
              <span><i class="iconfont icon-pinglun1"></i> 16</span>
            </dd>

            <!-- 无数据时 -->
            <!--
            <div class="fly-none">没有相关数据</div>
            -->
          </dl>

          <div class="fly-panel">
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
          </div>

        </div>

      </div>
    </div>

  </div>
</template>

<script>
    import {fly} from '../util/editUtil.js';
    export default {
        name: "detail",
        data: function() {
          return {
            userSession: this.$store.state.session,
            detail:{}
          }
        },
        created(){
          let _this = this
          this.$http.get('/api/lobby/queryConnotationDetail?serialNumber='+this.$route.query.id).then(result => {
            console.info(result)
            if(!result){
              layer.msg('查看明细异常！',{time:1500},function(){
                _this.$router.push({path: 'firstPage'})
              })
            }else{
              result.content = fly.content(result.content)
              this.detail = result
            }
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

</style>
<style>
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
