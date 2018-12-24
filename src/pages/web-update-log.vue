<template>
<div class="blog_body update_box">
  <fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">
    <legend>网站更新版本线</legend>
  </fieldset>
  <ul class="layui-timeline">
    <li class="layui-timeline-item" v-for="(item ,i) in data" :key="i">
      <i class="layui-icon layui-timeline-axis"></i>
      <div class="layui-timeline-content layui-text">
        <h3 class="layui-timeline-title">{{item.version}}<span>（{{item.updateDate}}）</span></h3>
        <p v-html="item.updateContent"></p>
        <span></span>
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
</style>
