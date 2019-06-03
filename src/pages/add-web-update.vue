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
          <li v-if="JSON.stringify(userInfo) != '{}' && userInfo.authority =='ADMIN'"><a href="#/visitorsWall">查看留言</a></li>
          <li class="layui-this" v-if="JSON.stringify(userInfo) != '{}' && userInfo.authority =='ADMIN'"><a href="#/addWebUpdate">添加更新</a></li>
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
    <div class="layui-container fly-marginTop">
      <div class="fly-panel" pad20 style="padding-top: 5px;">
        <div class="layui-form layui-form-pane">
          <div class="layui-tab layui-tab-brief" lay-filter="user">
            <ul class="layui-tab-title">
              <li class="layui-this">添加更新记录</li>
            </ul>
            <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
              <div class="layui-form-item">
                <label for="version" class="layui-form-label">版本号</label>
                <div class="layui-input-inline">
                  <input type="text" id="version" v-model="formData.version" name="version" placeholder="本次更新的版本号" class="layui-input">
                </div>
                <div class="layui-form-mid layui-word-aux">版本规则：从0.0.0开始。正式版之前后面加-0 beta</div>
              </div>
              <div class="layui-tab-item layui-show">
                  <div class="layui-form-item layui-form-text">
                    <div class="layui-input-block">
                      <textarea id="L_content" v-model="formData.content" name="content"placeholder="详细描述" class="layui-textarea fly-editor" style="height: 260px;"></textarea>
                    </div>
                  </div>
<!--{{formData.content}}-->
                <div class="layui-form-item">
                  <label for="technology" class="layui-form-label">新技术点</label>
                  <div class="layui-input-inline">
                    <input type="text" id="technology" v-model="formData.technology" name="technology" placeholder="请填写本次更新所使用技术点用;隔开" class="layui-input" style="width: 500px">
                  </div>
                </div>
                <!--
                  <div class="layui-form-item">
                    <label for="L_vercode" class="layui-form-label">人类验证</label>
                    <div class="layui-input-inline">
                      <input type="text" id="L_vercode" v-model="formData.vercode" name="vercode" placeholder="请回答后面的问题" autocomplete="off" class="layui-input">
                    </div>
                    <div class="layui-form-mid">
                      <img id="identifyCodeImg" @click="refreshImg()" alt="" title="算不出来？点击刷新"/>
                    </div>
                  </div>
                -->
                  <div class="layui-form-item" id="checkEvent"  @click = "update()">
                    <a class="layui-btn" @click.stop = "checkCode()">确认提交</a>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import {fly} from '../util/editUtil.js';
    import {validateCode} from '../util/validateCode.js';
    export default {
      name: "add-web-update",
      data:function () {
        return{
          userInfo:{},
          formData:{content:'',}

        }
      },
      mounted() {
        var _this = this;
        fly.vue(this);//把参数传入控件
        fly.layEditor({
          elem: '.fly-editor'
        });
      },
      methods:{
        checkCode:function(){
          validateCode.showDom(this)
        },
        myPosting:function(){
          this.$router.push({path: 'myPosting'})
        },
        add:function(){
          this.$router.push({path: 'newEdit'})
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
        update:function(){
          this.formData.updateContent =  this.formData.content
          this.$http.post('user/saveUpdateBlogs',this.formData,layer,this).then(result => {
            if(result){
              if(result.code == 1){
                var _this = this
                layer.msg('提交成功',{time:1200},function(){
                  _this.$router.push({path: 'updateLog'})
                })
              }else{
                layer.msg(result.message,{time:1500})
              }
            }
          })
        }
      },
      created(){
        let _this = this
        layui.use('layer', function() {
          var layer = layui.layer
          _this.$http.get('user/checkUserStatus',layer,_this).then(result => {
            if(result && result.data){
              if(result.code == 1){
                _this.userInfo = result.data.userTemp
                if(JSON.stringify(_this.userInfo) == '{}'){
                  _this.$router.push({path: 'firstPage'})
                }
                //document.getElementById('identifyCodeImg').setAttribute('src', 'data:image/jpeg;base64,' + result.data.img);
              }else{
                layer.msg(result.message,{time:1500},function () {
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

</style>
