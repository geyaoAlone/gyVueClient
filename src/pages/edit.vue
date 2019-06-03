<template>
  <div>

    <div class="layui-container fly-marginTop">
      <div class="fly-panel" pad20 style="padding-top: 5px;">
        <!--<div class="fly-none">没有权限</div>-->
        <div class="layui-form layui-form-pane">
          <div class="layui-tab layui-tab-brief" lay-filter="user">
            <ul class="layui-tab-title">
              <li class="layui-this">编辑帖子</li>
            </ul>
            <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
              <div class="layui-tab-item layui-show">
                <form class="layui-form" lay-filter="edit">
                  <div class="layui-row layui-col-space15 layui-form-item">
                    <div class="layui-col-md3">
                      <label class="layui-form-label">发表类型</label>
                      <div class="layui-input-block">
                        <select lay-filter="type" id="type" name="type">
                          <option></option>
                          <option value="question">问题</option>
                          <option value="gambit">话题</option>
                          <option value="share">分享</option>
                          <option value="original">原创</option>
                        </select>
                      </div>
                    </div>
                    <div class="layui-col-md9">
                      <label for="L_title" class="layui-form-label">标题</label>
                      <div class="layui-input-block">
                        <input type="text" v-model="formData.title" id="L_title" name="title" autocomplete="off" class="layui-input">
                        <!-- <input type="hidden" name="id" value="{{d.edit.id}}"> -->
                      </div>
                    </div>
                  </div>
                  <div class="layui-form-item layui-form-text">
                    <div class="layui-input-block">
                      <textarea id="L_content" v-model="formData.content" name="content"placeholder="详细描述" class="layui-textarea fly-editor" style="height: 260px;"></textarea>
                    </div>
                  </div>
                  <!--
                  <div class="layui-form-item login_img">
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
                    <a class="layui-btn" @click.stop = "checkCode()">确认修改</a>
                  </div>
                </form>
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
    name: "edit",
    data: function() {
      return{
        userSession:JSON.parse(sessionStorage.getItem('user')),
        formData:{}
      }
    },
    methods:{
      add:function(){
        this.$router.push({path: 'newEdit'})
      },
      checkCode:function(){
        if(!this.formData.type){
          layer.msg('请选择发表类型',{time:1000});
        }else if(!this.formData.title){
          layer.msg('请填写标题',{time:1000},function () {
            $('#L_title').focus();
          });
        }else if(!this.formData.content){
          layer.msg('请填写内容',{time:1000},function () {
            $('#L_content').focus();
          });
        }else {
          validateCode.showDom(this)
        }
      },
      update:function(){
        var _this = this;
        _this.$http.post('user/updateArticle',_this.formData,layer,_this).then(result => {
          if(result.code == 1){
            layer.msg('恭喜！修改成功',{time:1000},function(){
              _this.$router.push({path: 'detail',query:{id:_this.formData.serialNumber}})
            })
          }else{
            layer.msg(result.message,{time:1000},function(){
            })
          }

        })
      }
    },
    mounted(){
      var _this = this;
      fly.vue(this);//把参数传入控件
      fly.layEditor({
        elem: '.fly-editor'
      });
    },
    created() {
      let _this = this
      layui.use(['layer','form'], function () {
        var layer = layui.layer,form = layui.form

        _this.$http.get('user/checkUserStatus',layer,_this).then(result => {
          if (result && result.data) {
            if (result.code == 1) {
              _this.userSession = result.data.userTemp
              if (!_this.userSession) {
                _this.$router.push({path: 'firstPage'})
              }
              //document.getElementById('identifyCodeImg').setAttribute('src', 'data:image/jpeg;base64,' + result.data.img);
            } else {
              layer.msg(result.message, {time: 1500}, function () {
                _this.$router.push({path: 'firstPage'})
              })
            }
          }
        })

        var id = _this.$route.query.id;
        if(id){
          _this.$http.get('user/queryEditArticle?id='+id,layer,_this).then(result => {
            if (result && result.data) {
              _this.formData = result.data
              var type = _this.formData.type
              form.val("edit", {"type": type})
              form.on('select(type)', function (data) {
                _this.formData.type = data.value
              });
            }
          })
        }

      })
    }
  }
</script>

<style scoped>

</style>
