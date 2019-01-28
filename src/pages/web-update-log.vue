<template>
<div class="blog_body update_box">
  <fieldset class="layui-elem-field layui-field-title update_topTitle" style="margin-top: 30px;">
    <legend>网站更新版本线</legend>
  </fieldset>
  <ul class="layui-timeline">
    <li class="layui-timeline-item" v-for="(item ,i) in data" :key="i">
      <i class="layui-icon layui-timeline-axis"></i>
      <div class="layui-timeline-content layui-text">
        <h3 class="layui-timeline-title">{{item.updateDate}}</h3>
        <p><span>v.&nbsp;{{item.version}}</span></p>
        <p v-html="item.updateContent"></p>
        <div class="update_label">
          <span :class="'update_label'+i" v-for="(c ,i) in item.technology">
            #<i>{{c}}</i>
          </span>
        </div>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
  import {fly} from '../util/editUtil.js';
    export default {
        name: "web-update-log",
        data: function() {
          return {
            data:[]
          }
        },
        created(){
          var _this = this
          layui.use('layer', function() {
            var layer = layui.layer
            _this.$http.get('gateway/queryUpdateBlogs',layer,_this).then(result => {
              console.info(result)
              if(result && result.data){
                result.data.forEach(content=>{
                  var technologyStr = content.technology
                  var technology = []
                  if(technologyStr){
                    technology = technologyStr.split('；')
                  }
                  content.updateContent = fly.content(content.updateContent)
                  content.technology = technology
                })
                _this.data= result.data;
              }
            })
          })

        }
    }
</script>

<style scoped>
  .blog_body{
    background: #fff;
  }
  .update_box{
    width: 80%;
    margin: 0 auto;
    padding: 20px;
  }
  .update_topTitle legend{
    text-align: center;
    margin-bottom: 20px;
  }
  .update_label span{
    padding: 2px 4px;
    line-height: 20px;
    border-radius: 0px;
    background: #007DDB;
    color: #ffffff;
    font-size: 12px;
    margin-right: 4px;
  }
  /*颜色开始*/
  .update_label1{
    background: #ff2d55 !important;
  }
  .update_label2{
    background: #ff3b30 !important;
  }
  .update_label3{
    background: #4cd964 !important;
  }
  .update_label4{
    background: #5ac8fa !important;
  }
  .update_label5{
    background: #5856d6 !important;
  }
  .update_label6{
    background: #ff9500 !important;
  }
  .update_label7{
    background: #ffcc00 !important;
  }
  .update_label8{
    background: #e67950 !important;
  }
  .update_label9{
    background: #7d8e9a !important;
  }
</style>
