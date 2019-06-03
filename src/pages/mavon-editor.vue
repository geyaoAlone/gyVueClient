<template>
  <div class="layui-container fly-marginTop">
    <div class="title_div">
      <input class="title" type="text" v-model="atr.title" placeholder="这里填标题。。。"/>
    </div>
    <div id="editor" class="fly-panel">
      <mavon-editor style="height: 100%;" v-model="atr.contentOriginal" @imgAdd="$imgAdd" ref=md @save="$save"></mavon-editor>
    </div>
  </div>


</template>

<script>
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  export default {
    name: 'mavon-editor-test',
    data(){
      return{
        userSession:JSON.parse(sessionStorage.getItem('user')),
        atr:{type:'original',title:'',content:'',publicity:true,best:false,endTime:'',stick:false,contentOriginal:''}
      }
    },
    components: {
      mavonEditor
    },
    methods:{
      $imgAdd(pos,$file){
        // 第一步.将图片上传到服务器.
        var formdata = new FormData();
        formdata.append('file', $file);
        formdata.append('name',this.userSession.username);
        this.$http.upload('user/uploadBlogImg',formdata,layer,this).then((result) => {
          if(result.result == '1'){
            console.info(result)
            this.$refs.md.$img2Url(pos, result.imgUrl);
          }else{
            layer.msg(result.message,{time:1000})
          }
        })

      },
      goHistory(){
        this.$router.push("history")
      },
      $save(value,render){
        var _this = this;
        if(!_this.atr.title) {
          layer.msg('请填写标题', {time: 1000}, function () {
            $('.title').focus();
            return;
          });
        }
        if(!value) {
          layer.msg('请填写内容', {time: 1000}, function () {
            return;
          });
        }
        _this.atr.contentOriginal = value
        _this.atr.content = render
        var url = 'user/saveNewArticle';
        if(_this.atr.serialNumber){
          url = 'user/updateArticle';
        }
        _this.$http.post(url,_this.atr,layer,_this).then(result => {
          if(result){
            if(result.code == 1 && result.data){
              var _id = result.data;
              layer.msg('恭喜！操作成功',{time:1000},function(){
                _this.$router.push({path: 'detail',query:{id:_id}})
              })
            }else{
              layer.msg(result.message,{time:1000})
            }
          }
        })
      }
    },
    created() {
      let id = this.$route.query.id;
      var url = 'user/checkUserStatus';
      if(id){
        url = 'user/queryEditArticle?id='+id;
      }
      let _this = this
      layui.use('layer', function() {
        var layer = layui.layer
        _this.$http.get(url,layer,_this).then(result => {
          if(result && result.data){
            if(result.code == 1){
              _this.userSession = result.data.userTemp
              if(!_this.userSession){
                _this.$router.push({path: 'firstPage'})
              }
              if(result.data.article){
                _this.atr = result.data.article
                if(!_this.atr.contentOriginal){
                  layer.msg("由于编辑器的更新，老的文章已不支持修改！非常的抱歉！", {time: 2000},function(){
                    _this.$router.push({path: 'myPosting'})
                  })

                }
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
  .title_div{
    text-align: center;

  }
  #editor {
    margin: auto;
    width: 100%;
    height: 600px;
  }
  .title{
    padding-left: 7px;
    width: 60%;
    min-width: 40%;
    height: 43px;
    line-height: 80%;
    font-size: 25px;
    margin-bottom: 15px;
    border: 1px solid #EAEAEA;
    border-radius: 4px;
    box-shadow: 3px 3px 2px #888888;
  }
</style>
