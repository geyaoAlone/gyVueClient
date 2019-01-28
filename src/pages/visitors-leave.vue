<template>
<div>
  <div class="visi_body">
    <fieldset class="layui-elem-field layui-field-title">
      <legend>留言说明</legend>
    </fieldset>
    <div class="visi_tip">
      <ul>
        <li>希望来到小站的游客或会员留下您对小站评价或者意见。我将万分感谢</li>
        <li>如果你你在小站中发现了不合理的操作或者bug，希望您能给小站留言。我会虚心听从您的建议，把小站越做越好</li>
        <li>小站暂无注册功能。如果你想成为小站的会员。请留下你的信息。我们将把登陆信息通过邮件发送给你</li>
        <li>想成为小站会员，请您留下一些注册信息，比如：用户名，昵称等等。千万别忘了填上电子邮件。我第一时间给您发会员信息</li>
      </ul>
    </div>
    <div class="visi_box">
      <ul>
        <li>
          <p>留言：</p>
          <textarea rows="4" v-model="sbData.content"></textarea>
        </li>
        <li v-if="userSession == null">
          <p>电子邮箱：</p>
          <input type="text" value="" v-model="sbData.email"/>
        </li>
      </ul>
    </div>
    <div class="layui-form-item visi_bottomBut">
      <input type="hidden" name="jid" value="123">
      <button class="layui-btn" @click="submitmMessage()">提交回复</button>
    </div>

  </div>
</div>
</template>

<script>
    export default {
        name: "visitors-leave",
        data:function() {
          return {
            userSession: {},
            sbData:{dealStatus:'0',content:''}
          }
        },
        methods:{
          submitmMessage:function () {
              let _this = this
              if(!_this.sbData.content){
                layer.msg("请先留言再提交",{time:1500})
              }else{
                _this.$http.post('lobby/saveGuestReply',_this.sbData,layer,_this).then(result => {
                  if(result.code ==1){
                    layer.msg('提交成功！谢谢留言',{time:2000,icon:1},function(){
                      _this.$router.push({path: 'firstPage'})
                    })
                  }

                })
              }
          }
        },
      created(){
          if(this.userSession){
            this.sbData.username = this.userSession.username
          }
      }
    }
</script>

<style scoped>
  .visi_body{
    width: 90%;
    /*height: 300px;*/
    background: #ffffff;
    margin: 0 auto;
    /*overflow: hidden;*/
    padding: 30px 0;
  }
  .visi_box{
    /*width: 760px;*/
    /*height: 200px;*/
    /*background: #1E9FFF;*/
    margin: 0 auto;
    /*margin-top: 80px;*/
  }
  .visi_box ul{
    /*width: 500px;*/
    /*height: 40px;*/
    margin: 0 auto;
    /*background: red;*/
  }
  .visi_box ul li{
    /*width: 500px;*/
    height: 40px;
    margin-top: 30px;
  }
  .visi_box ul li p{
    width: 30%;
    font-size: 14px;
    float: left;
    height: 40px;
    line-height: 40px;
    text-align: right;
    display: inline-block;
    vertical-align: top;
  }
  .visi_box ul li input, .visi_box ul li textarea{
    font-size: 14px;
    float: left;
    width: 50%;
    height: 30px;
    margin-top: 4px;
    border: none;
    padding: 0 16px;
    border: 1px solid #eeeeee;
    display: inline-block;
  }
  .visi_box ul li textarea{
    line-height: 30px;
    height: 200px;
  }
  .visi_box ul li:last-child{
    height: 220px;
  }
  .visi_bottomBut{
    text-align: center;
    margin-top: 14px;
  }
  .visi_body fieldset{
    /*border-top: 1px dashed #e6e6e6;*/
    margin-top: 20px;
  }

  .visi_body fieldset legend{
    text-align: center;
    /*font-size: 14px;*/
    /*color: #666;*/
    padding: 0 12px;
  }
  .visi_tip{
    width: 70%;
    margin: 0 auto;
  }
  .visi_tip ul{
    margin-bottom: 30px;
  }
  .visi_tip ul li{
    font-size: 12px;
    line-height: 20px;
    margin-top: 4px;
    color: #999;
    font-family: Helvetica Neue,Helvetica,PingFang SC,Tahoma,Arial,sans-serif;
    list-style: disc;
    /*none不使用项目符号；disc实心圆，默认值；circle空心圆；square实心方块；decimal阿拉伯数字；lower-roman小写罗马数字；upper-roman大写罗马数字；lower-alpha小写英文字母；upper-alpha大写英文字母*/

  }
</style>
