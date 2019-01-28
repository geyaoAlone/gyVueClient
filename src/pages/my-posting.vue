<template>
  <div>
    <div class="fly-panel fly-column small-title">
      <div class="layui-container">
        <ul class="layui-clear">
          <li class="layui-hide-xs "><a href="javascript:;" @click="myHomepage()">我的主页</a></li>
          <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block"><span class="fly-mid"></span></li>
          <li ><a href="javascript:;" @click="myInfo()">我的信息</a></li>
          <li><a href="javascript:;" @click="myMessage()">我的消息</a></li>
          <li class="layui-this"><a href="javascript:;" @click="myPosting()">我的帖子</a></li>
          <li v-if="JSON.stringify(userInfo) != '{}' && userInfo.authority =='ADMIN'"><a href="#/visitorsWall">查看留言</a></li>
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
    <div class="fly-panel fly-panel-user post_widt" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title" id="LAY_mine">
          <li data-type="mine-jie" lay-id="index" class="layui-this">我发的帖（<span>{{myCatalogueCount}}</span>）</li>
          <li data-type="collection" lay-id="collection" @click="myCollection()">我收藏的帖（<span>{{myCollectionCount}}</span>）</li>
        </ul>
        <div class="layui-tab-content" style="padding: 20px 0;">
          <div class="layui-tab-item layui-show">
            <ul class="mine-view jie-row">
              <li v-for="(item ,i) in myCatalogueList" :key="i">
                <a class="jie-title" href="javascript:;" @click="openDetail(item.serialNumber)">{{item.title}}</a>
                <i>{{item.createTime}}</i>
                <a class="mine-edit" href="javascript:;" @click="editThisDetail(item.serialNumber)">编辑</a>
                <em>{{item.seenTimes}}阅/{{item.commentTimes}}答</em>
              </li>
            </ul>
            <div id="LAY_page"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "my-posting",
      data:function () {
        return{
          userInfo:JSON.parse(sessionStorage.getItem('user')),
          myCatalogueList:[],
          myCatalogueCount:'0',
          myCollectionCount:'0'

        }
      },
      methods:{
        openDetail:function (id) {
          this.$router.push({path: 'detail',query:{id:id}})
        },
        editThisDetail:function (id) {
          this.$router.push({path: 'edit',query:{id:id}})
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
        myPosting:function(){
          this.$router.push({path: 'myPosting'})
        }
      },
      created(){
        var _this = this
        layui.use('layer', function() {
          layer = layui.layer;
          if(!_this.userInfo){
            layer.msg('抱歉，您无法访问',{time:1000},function () {
              _this.$router.push({path: 'firstPage'})
            })
          }else {
            _this.$http.get('user/queryMyArticle',layer,_this).then(result => {
              if(result){
                if(result.code == 1 && result.data){
                  _this.myCatalogueList = result.data.myCatalogue
                  _this.myCatalogueCount = result.data.statistics[0].cataCount
                  _this.myCollectionCount = result.data.statistics[0].favorCount
                }
              }
            })
          }
        })
      }
    }
</script>

<style scoped>

  .post_widt{
    width: 86%;
    margin: 0 auto;
  }
</style>
