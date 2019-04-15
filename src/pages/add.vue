<template>
  <div>

    <div class="layui-container fly-marginTop">
      <div class="fly-panel" pad20 style="padding-top: 5px;">
        <!--<div class="fly-none">没有权限</div>-->
        <div class="layui-form layui-form-pane">
          <div class="layui-tab layui-tab-brief" lay-filter="user">
            <ul class="layui-tab-title">
              <li class="layui-this">发表新帖<!-- 编辑帖子 --></li>
            </ul>
            <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
              <div class="layui-tab-item layui-show">
                <form class="layui-form">
                  <div class="layui-row layui-col-space15 layui-form-item">
                    <div class="layui-col-md3">
                      <label class="layui-form-label">发表类型</label>
                      <div class="layui-input-block">
                        <select lay-filter="type" id="type">
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
                  <div class="layui-row layui-col-space15 layui-form-item">
                    <div class="layui-col-md3">
                      <label class="layui-form-label">是否公开</label>
                      <div class="layui-input-block">
                        <input type="checkbox" name="switch" lay-skin="switch" lay-filter="publicity" lay-text="是|否" checked>
                      </div>
                    </div>
                    <div class="layui-col-md3" v-if="userSession.authority =='ADMIN'">
                      <label class="layui-form-label">是否精帖</label>
                      <div class="layui-input-block">
                        <input type="checkbox" name="switch" lay-skin="switch" lay-filter="best" lay-text="是|否" >
                      </div>
                    </div>
                    <div class="layui-col-md3" v-if="userSession.authority =='ADMIN'">
                      <label class="layui-form-label">是否置顶</label>
                      <div class="layui-input-block">
                        <input type="checkbox" name="switch" lay-skin="switch" lay-filter="stick" lay-text="是|否" >
                      </div>
                    </div>
                    <div class="layui-col-md3" >
                      <label class="layui-form-label" for="endDate">截止日期</label>
                      <div class="layui-input-block">
                        <input type="text" name="endDate" id="endDate" lay-verify="date" placeholder="yyyy-MM-dd" autocomplete="off" class="layui-input">
                      </div>
                    </div>
                  </div>
                  <div class="layui-form-item layui-form-text">
                    <div class="layui-input-block">
                      <textarea id="L_content" v-model="formData.content" name="content"placeholder="详细描述" class="layui-textarea fly-editor" style="height: 260px;"></textarea>
                    </div>
                  </div>
                  <!--{{formData.content}}-->
                  <!--<div class="layui-form-item">
                    <div class="layui-inline">
                      <label class="layui-form-label">悬赏飞吻</label>
                      <div class="layui-input-inline" style="width: 190px;">
                        <select name="experience">
                          <option value="20">20</option>
                          <option value="30">30</option>
                          <option value="50">50</option>
                          <option value="60">60</option>
                          <option value="80">80</option>
                        </select>
                      </div>
                      <div class="layui-form-mid layui-word-aux">发表后无法更改飞吻</div>
                    </div>
                  </div>

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
                  <div class="layui-form-item" id="checkEvent"  @click = "add()">
                    <a class="layui-btn" @click.stop = "checkCode()">立即发布</a>
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
      name: "add",
      data: function() {
        return{
          userSession:JSON.parse(sessionStorage.getItem('user')),
          formData:{type:'',title:'',content:'',publicity:true,best:false,endTime:'',stick:false}
        }
      },
      methods:{
        checkCode:function(){
          if(!this.formData.type){
            layer.msg('请选择发表类型',{time:1000});
          }else if(!this.formData.title){
            layer.msg('请填写标题',{time:1000},function () {
              $('#L_title').focus();
            });
          }else if(!this.formData.content) {
            layer.msg('请填写内容', {time: 1000}, function () {
              $('#L_content').focus();
            });
          }else {
            validateCode.showDom(this)
          }

        },
        add:function(){
          var _this = this;
          _this.$http.post('user/saveNewArticle',_this.formData,layer,_this).then(result => {
            if(result){
              if(result.code == 1 && result.data){
                var _id = result.data;
                layer.msg('恭喜！添加成功',{time:1000},function(){
                  _this.$router.push({path: 'detail',query:{id:_id}})
                })
              }else{
                layer.msg(result.message,{time:1000})
              }
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

          layui.use(['form','laydate'],function(){
            var form = layui.form,laydate = layui.laydate;
            var nowDate = new Date();
            var nowStr = nowDate.getFullYear().toString()+(nowDate.getMonth()+1).toString()+nowDate.getDate().toString();
            console.info(nowStr)
            laydate.render({
              elem: '#endDate',
              min: nowStr,
              done: function(value, date){
                _this.formData.endTime = value
              }
            });
            form.on('select(type)', function(data){
              _this.formData.type = data.value;
            });
            form.on('switch(publicity)', function(data){
              _this.formData.publicity = this.checked?true:false;
            });
            form.on('switch(best)', function(data){
              _this.formData.best = this.checked?true:false;
            });
            form.on('switch(stick)', function(data){
              _this.formData.stick = this.checked?true:false;
            });
            form.render();
          })



      },
      created() {
        let _this = this
        layui.use('layer', function() {
          var layer = layui.layer
          _this.$http.get('user/checkUserStatus',layer,_this).then(result => {
            if(result && result.data){
              if(result.code == 1){
                _this.userSession = result.data.userTemp
                if(!_this.userSession){
                  _this.$router.push({path: 'firstPage'})
                }
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
