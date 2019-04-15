
var  validateCode = {
  showDom:function (_this) {
      let imgBase64 =''
    _this.$http.simpleGet('gateway/identifyCode').then(result => {
      if (result && result.status == 200 && result.data.code ==1 && result.data.data) {
        imgBase64 = result.data.data
        //console.info(imgBase64.substring(imgBase64.length-9,imgBase64.length))
        var html = [
          '<div class="layui-layer-shade" id="layui-layer-shade2" times="2" style="z-index: 19891015; background-color: rgb(0, 0, 0); opacity: 0.3;"></div>'
          ,'<div class="layui-layer layui-layer-page" id="layui-layer2" times="2" showtime="0" contype="string" style="z-index: 19891016; width: 380px; top: 253.5px; left: 304.5px;">'
          ,'<div class="layui-layer-title" style="    height: 33px;line-height: 36px;border-bottom:none;">人类验证：</div>'
          ,'<div id="" class="layui-layer-content" style="height: 55px">'
          ,'<div class="layui-form-item vali" style="margin: 7px 0px 0px 10px">'
          ,'<div class="layui-form-mid" style="padding: 0px !important;">'
          ,'<img id="validateImg" type="refreshCode" alt="" title="算不出来？点击刷新" src="data:image/jpeg;base64,'+imgBase64+'"/>'
          ,'</div>'
          ,'<div class="layui-input-inline">'
          ,'<input id="L_vercode" name="vercode" placeholder="请输入正确答案" class="layui-input" style="width: 115px;float: left;margin-right:5px " oninput = "value=value.replace(/[^\\d]/g,\'\')">'
          ,'<button id="ok" class="layui-btn" >确定</button>'
          ,'</div>'
          ,'</div>'
          ,'</div>'
          ,'</div>'].join('')

        $('#app').after(html);
        $('#L_vercode').focus()
        $('#validateImg').on('click', function(event){
          _this.$http.simpleGet('gateway/identifyCode').then(result => {
            if (result && result.status == 200 && result.data.code ==1 && result.data.data) {
              imgBase64 = result.data.data
              document.getElementById('validateImg').setAttribute( 'src','data:image/jpeg;base64,'+imgBase64);
            }else{
              $('#layui-layer-shade2').remove()
              $('#layui-layer2').remove()
              layer.msg('网坏了.稍后验证...',{time:1500})
            }
          })
        });

        $("#layui-layer-shade2").on('click', function(event){
          $(this).remove()
          $('#layui-layer2').remove()
        });

        $("#ok").on('click', function(event){
          var code = $("#L_vercode").val();
          if(!code){
            $("#L_vercode").focus()
          }else{
            var str = validateCode.dealStr(imgBase64)
            //console.info(str)
            _this.$http.simpleGet('gateway/checkIdentifyCode?code=' + code + '&str=' + str).then(result => {
              if (result && result.status == 200 ) {
                if(result.data.code == 1){
                  $('#layui-layer-shade2').remove()
                  $('#layui-layer2').remove()
                  $('#checkEvent').click()
                }else{
                  _this.$http.simpleGet('gateway/identifyCode').then(result => {
                    if (result && result.status == 200 && result.data.code ==1 && result.data.data) {
                      imgBase64 = result.data.data
                      document.getElementById('validateImg').setAttribute( 'src','data:image/jpeg;base64,'+imgBase64);
                      $("#L_vercode").val('')
                      $("#L_vercode").focus()
                    }
                  })

                }

              }
            })
          }
        })
        $('body').on('keyup',function(e) {
          e.keyCode === 13 && $("#L_vercode").val() && $('#ok').click();
        })
      }else{
        layer.msg('人类验证坏了....',{time:1500})
      }
    })
  },
  dealStr:function (str) {
    return str.substring(str.length-9,str.length).replace("+","/")
  }
}
export {
  validateCode
}
