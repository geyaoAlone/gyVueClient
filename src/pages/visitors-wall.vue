<template>
<div>
  <div class="visi_body">
    <fieldset class="layui-elem-field layui-field-title">
      <legend>留言说明</legend>
    </fieldset>
    <div class="visi_tip">
      <ul>
        <li>整体的布局声明：文字大小12px，边距与填充均为零。边框为一象素的蓝色#06c虚线。 </li>
        <li>fieldset方框的设置：填充与边距都是10px。设置宽度为270px。文字颜色深灰色#333。</li>
        <li>legend域标题的设置：文字颜色为蓝色#06c，文字加粗，背景色为白色#fff。 </li>
        <li>对无序列表ul及列表项li进行相关的一些设置。</li>
      </ul>
    </div>
    <div class="visi_box">
      <ul>
        <li>
          <p>昵称：</p>
          <input type="text" value=""/>
        </li>
        <li>
          <p>留言内容：</p>
          <textarea rows="4"></textarea>
        </li>
      </ul>
    </div>
    <div class="layui-form-item visi_bottomBut">
      <input type="hidden" name="jid" value="123">
      <button class="layui-btn" lay-filter="*" lay-submit>提交回复</button>
    </div>

  </div>
</div>
</template>

<script>
    export default {
        name: "visitors-wall"
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
    list-style: decimal;
    /*none不使用项目符号；disc实心圆，默认值；circle空心圆；square实心方块；decimal阿拉伯数字；lower-roman小写罗马数字；upper-roman大写罗马数字；lower-alpha小写英文字母；upper-alpha大写英文字母*/

  }
</style>
