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
                        <input type="text" v-model="article.title" id="L_title" name="title" autocomplete="off" class="layui-input">
                        <!-- <input type="hidden" name="id" value="{{d.edit.id}}"> -->
                      </div>
                    </div>
                  </div>
                  <div class="layui-form-item layui-form-text">
                    <div class="layui-input-block">
                      <textarea id="L_content" v-model="article.content" name="content"placeholder="详细描述" class="layui-textarea fly-editor" style="height: 260px;"></textarea>
                    </div>
                  </div>

                  <div class="layui-form-item login_img">
                    <label for="L_vercode" class="layui-form-label">人类验证</label>
                    <div class="layui-input-inline">
                      <input type="text" id="L_vercode" v-model="article.vercode" name="vercode" placeholder="请回答后面的问题" autocomplete="off" class="layui-input">
                    </div>
                    <div class="layui-form-mid">
                      <img id="identifyCodeImg" @click="refreshImg()" alt="" title="算不出来？点击刷新"/>
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <a class="layui-btn" @click="update()">确认修改</a>
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
  export default {
    name: "add",
    data: function() {
      return{
        userSession:this.$store.state.session,
        article:{}
      }
    },
    methods:{
      add:function(){
        this.$router.push({path: 'add'})
      },
      refreshImg:function(){
        var username = this.userSession.username;
        if(username){
          this.$http.get('/api/gateway/identifyCode?username='+username).then(result => {
            document.getElementById('identifyCodeImg').setAttribute( 'src','data:image/jpeg;base64,'+result.data);
          })
        }
      },
      update:function(){
        if(!this.article.type){
          layer.msg('请选择发表类型',{time:1000});
        }else if(!this.article.title){
          layer.msg('请填写标题',{time:1000},function () {
            $('#L_title').focus();
          });
        }else if(!this.article.content){
          layer.msg('请填写内容',{time:1000},function () {
            $('#L_content').focus();
          });
        }else if(!this.article.vercode){
          layer.msg('请填写验证',{time:1000},function () {
            $('#L_vercode').focus();
          });
        }else{
          var _this = this;
          _this.$http.post('api/user/updateArticle',_this.article,_this.userSession.token).then(result => {
            if(result.code == 1){
              layer.msg('恭喜！修改成功',{time:1000},function(){
                _this.$router.push({path: 'detail',query:{id:_this.article.serialNumber}})
              })
            }else{
              layer.msg(result.message,{time:1000},function(){
                _this.$http.get('/api/gateway/identifyCode?username='+_this.article.author).then(result => {
                  document.getElementById('identifyCodeImg').setAttribute( 'src','data:image/jpeg;base64,'+result.data);
                })
              })
            }

          })

        }
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
      let info = this.$store.state.session
      if(info == null){
        this.$router.push({path: '/'})
      }
      var id = this.$route.query.id;
      if(id){
        this.$http.get('/api/user/queryEditArticle?id='+id,info.token).then(result => {
          console.info(result.data)
          this.article = result.data
          var type = this.article.type,_this = this
          layui.use('form',function(){
            var form = layui.form
            form.val("edit",{"type": type})
            form.on('select(type)', function(data){
              _this.article.type = data.value
            });
          })
        })
      }
      this.$http.get('/api/gateway/identifyCode?username='+info.username).then(result => {
        document.getElementById('identifyCodeImg').setAttribute('src','data:image/jpeg;base64,'+result.data);
      })
    }
  }
</script>

<style scoped>

</style>
