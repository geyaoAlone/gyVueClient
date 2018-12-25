<template>
<div class="blog_body update_box">
  <fieldset class="layui-elem-field layui-field-title update_topTitle" style="margin-top: 30px;">
    <legend>网站更新版本线</legend>
  </fieldset>
  <ul class="layui-timeline">
    <li class="layui-timeline-item" v-for="(item ,i) in data" :key="i">
      <i class="layui-icon layui-timeline-axis"></i>
      <div class="layui-timeline-content layui-text">
        <h3 class="layui-timeline-title">{{item.version}}<span>（{{item.updateDate}}）</span></h3>
        <p v-html="item.updateContent"></p>
        <div class="update_label">
          <span class="update_label1">#<i>vue</i></span>
          <span class="update_label7">#<i>layer</i></span>
          <span class="update_label3">#<i>ionic</i></span>
          <span class="update_label5">#<i>bootstrap</i></span>
          <span class="update_label9">#<i>vue</i></span>
          <span class="update_label6">#<i>vue</i></span>
          <span class="update_label4">#<i>vue</i></span>
          <span class="update_label8">#<i>vue</i></span>
        </div>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
    export default {
        name: "web-update-log",
        data: function() {
          return {
            data:[]
          }
        },
        created(){
          this.$http.get('/api/gateway/queryUpdateBlogs').then(result => {
            this.data= result.data;

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
