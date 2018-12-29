//表情初始化
var faces = {"[微笑]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/5c/huanglianwx_thumb.gif","[嘻嘻]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/0b/tootha_thumb.gif","[哈哈]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6a/laugh.gif","[可爱]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/14/tza_thumb.gif","[可怜]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/af/kl_thumb.gif","[挖鼻]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/0b/wabi_thumb.gif","[吃惊]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/f4/cj_thumb.gif","[害羞]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6e/shamea_thumb.gif","[挤眼]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/c3/zy_thumb.gif","[闭嘴]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/29/bz_thumb.gif","[鄙视]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/71/bs2_thumb.gif","[爱你]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6d/lovea_thumb.gif","[泪]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/9d/sada_thumb.gif","[偷笑]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/19/heia_thumb.gif","[亲亲]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/8f/qq_thumb.gif","[生病]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/b6/sb_thumb.gif","[太开心]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/58/mb_thumb.gif","[白眼]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d9/landeln_thumb.gif","[右哼哼]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/98/yhh_thumb.gif","[左哼哼]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6d/zhh_thumb.gif","[嘘]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/a6/x_thumb.gif","[衰]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/af/cry.gif","[委屈]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/73/wq_thumb.gif","[吐]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/9e/t_thumb.gif","[哈欠]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/cc/haqianv2_thumb.gif","[抱抱]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/27/bba_thumb.gif","[怒]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/7c/angrya_thumb.gif","[疑问]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/5c/yw_thumb.gif","[馋嘴]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/a5/cza_thumb.gif","[拜拜]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/70/88_thumb.gif","[思考]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/e9/sk_thumb.gif","[汗]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/24/sweata_thumb.gif","[困]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/40/kunv2_thumb.gif","[睡]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/96/huangliansj_thumb.gif","[钱]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/90/money_thumb.gif","[失望]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/0c/sw_thumb.gif","[酷]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/40/cool_thumb.gif","[色]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/20/huanglianse_thumb.gif","[哼]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/49/hatea_thumb.gif","[鼓掌]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/36/gza_thumb.gif","[晕]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d9/dizzya_thumb.gif","[悲伤]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/1a/bs_thumb.gif","[抓狂]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/62/crazya_thumb.gif","[黑线]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/91/h_thumb.gif","[阴险]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6d/yx_thumb.gif","[怒骂]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/60/numav2_thumb.gif","[互粉]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/89/hufen_thumb.gif","[心]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/40/hearta_thumb.gif","[伤心]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/ea/unheart.gif","[猪头]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/58/pig.gif","[熊猫]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6e/panda_thumb.gif","[兔子]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/81/rabbit_thumb.gif","[ok]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d6/ok_thumb.gif","[耶]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d9/ye_thumb.gif","[good]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d8/good_thumb.gif","[NO]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/ae/buyao_org.gif","[赞]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d0/z2_thumb.gif","[来]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/40/come_thumb.gif","[弱]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d8/sad_thumb.gif","[草泥马]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/7a/shenshou_thumb.gif","[神马]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/60/horse2_thumb.gif","[囧]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/15/j_thumb.gif","[浮云]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/bc/fuyun_thumb.gif","[给力]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/1e/geiliv2_thumb.gif","[围观]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/f2/wg_thumb.gif","[威武]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/70/vw_thumb.gif","[奥特曼]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/bc/otm_thumb.gif","[礼物]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/c4/liwu_thumb.gif","[钟]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d3/clock_thumb.gif","[话筒]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/9f/huatongv2_thumb.gif","[蜡烛]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d9/lazhuv2_thumb.gif","[蛋糕]":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/3a/cakev2_thumb.gif"};
//插入功能
var _this={};
var focusInsert = function(obj, str){
  var result, val = obj.value;
  obj.focus();
  if(document.selection){ //ie
    result = document.selection.createRange();
    document.selection.empty();
    result.text = str;
  } else {
    result = [val.substring(0, obj.selectionStart), str, val.substr(obj.selectionEnd)];
    var text = result.join('');
    _this.content = text;
    obj.focus();
    obj.value = text


  }
};


var fly = {

  vue:function(obj){
    _this = obj
  },
  //计算字符长度
  charLen: function(val){
    var arr = val.split(''), len = 0;
    for(var i = 0; i <  val.length ; i++){
      arr[i].charCodeAt(0) < 299 ? len++ : len += 2;
    }
    return len;
  }
  //简易编辑器
  ,layEditor: function(options){
    var html = ['<div class="layui-unselect fly-edit">'
      ,'<span type="face" title="插入表情"><i class="iconfont icon-yxj-expression" style="top: 1px;"></i></span>'
      ,'<span type="href" title="超链接格式：a(href)[text]"><i class="iconfont icon-lianjie"></i></span>'
      ,'<span type="code" title="插入代码或引用"><i class="iconfont icon-emwdaima" style="top: 1px;"></i></span>'
      ,'<span type="yulan" title="预览"><i class="iconfont icon-yulan1"></i></span>'
      ,'</div>'].join('');

    var log = {}, mod = {
      face: function(editor, self){ //插入表情
        var str = '', ul, face = faces;
        for(var key in face){
          str += '<li title="'+ key +'"><img src="'+ face[key] +'"></li>';
        }
        str = '<ul id="LAY-editface" class="layui-clear">'+ str +'</ul>';
        layer.tips(str, self, {
          tips: 3
          ,time: 0
          ,skin: 'layui-edit-face'
        });
        $(document).on('click', function(){
          layer.closeAll('tips');
        });
        $('#LAY-editface li').on('click', function(){
          var title = $(this).attr('title') + ' ';
          focusInsert(editor[0], 'face' + title);
        });
      }
      ,href: function(editor){ //超链接
        layer.prompt({
          title: '请输入合法链接'
          ,shade: false
          ,fixed: false
          ,id: 'LAY_flyedit_href'
          ,offset: [
            editor.offset().top - $(window).scrollTop() + 'px'
            ,editor.offset().left + 'px'
          ]
        }, function(val, index, elem){
          if(!/^http(s*):\/\/[\S]/.test(val)){
            layer.tips('这根本不是个链接，不要骗我。', elem, {tips:1})
            return;
          }
          focusInsert(editor[0], ' a('+ val +')['+ val + '] ');
          layer.close(index);
        });
      }
      ,code: function(editor){ //插入代码
        layer.prompt({
          title: '请贴入代码或任意文本'
          ,formType: 2
          ,maxlength: 10000
          ,shade: false
          ,id: 'LAY_flyedit_code'
          ,area: ['800px', '360px']
        }, function(val, index, elem){
          focusInsert(editor[0], '[pre]\n'+ val + '\n[/pre]');
          layer.close(index);
        });
      }
      ,hr: function(editor){ //插入水平分割线
        focusInsert(editor[0], '[hr]');
      }
      ,yulan: function(editor){ //预览
        var content = editor.val();

        content = /^\{html\}/.test(content)
          ? content.replace(/^\{html\}/, '')
          : fly.content(content);

        layer.open({
          type: 1
          ,title: '预览'
          ,shade: false
          ,area: ['100%', '100%']
          ,scrollbar: false
          ,content: '<div class="detail-body" style="margin:20px;">'+ content +'</div>'
        });
      }

    };

    options = options || {};
    $(options.elem).each(function(index){
      var that = this, othis = $(that), parent = othis.parent();
      parent.prepend(html);
      parent.find('.fly-edit span').on('click', function(event){
        var type = $(this).attr('type');
        mod[type].call(that, othis, this);
        if(type === 'face'){
          event.stopPropagation()
        }
      });
    });



  }

  ,escape: function(html){
    return String(html||'').replace(/&(?!#?[a-zA-Z0-9]+;)/g, '&amp;')
      .replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&#39;').replace(/"/g, '&quot;');
  }

  //内容转义
  ,content: function(content){
    //支持的html标签
    var html = function(end){
      return new RegExp('\\n*\\['+ (end||'') +'(pre|hr|div|span|p|table|thead|th|tbody|tr|td|ul|li|ol|li|dl|dt|dd|h2|h3|h4|h5)([\\s\\S]*?)\\]\\n*', 'g');
    };
    content = fly.escape(content||'') //XSS
      .replace(/img\[([^\s]+?)\]/g, function(img){  //转义图片
        return '<img src="' + img.replace(/(^img\[)|(\]$)/g, '') + '">';
      }).replace(/@(\S+)(\s+?|$)/g, '@<a href="javascript:;" class="fly-aite">$1</a>$2') //转义@
      .replace(/face\[([^\s\[\]]+?)\]/g, function(face){  //转义表情
        var alt = face.replace(/^face/g, '');
        return '<img alt="'+ alt +'" title="'+ alt +'" src="' + faces[alt] + '">';
      }).replace(/a\([\s\S]+?\)\[[\s\S]*?\]/g, function(str){ //转义链接
        var href = (str.match(/a\(([\s\S]+?)\)\[/)||[])[1];
        var text = (str.match(/\)\[([\s\S]*?)\]/)||[])[1];
        if(!href) return str;
        var rel =  /^(http(s)*:\/\/)\b(?!(\w+\.)*(sentsin.com|layui.com))\b/.test(href.replace(/\s/g, ''));
        return '<a href="'+ href +'" target="_blank"'+ (rel ? ' rel="nofollow"' : '') +'>'+ (text||href) +'</a>';
      }).replace(html(), '\<$1 $2\>').replace(html('/'), '\</$1\>') //转移HTML代码
      .replace(/\n/g, '<br>') //转义换行
    return content;
  }



}
export {
  fly
}
