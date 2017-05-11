<template>
  <div id="addcomment">
    <div class="content">
      <div class="title">
        <p>{{name}}</p>
      </div>
      <div class="comcontent">
        <textarea autocomplete="off" v-model="textdata" autocapitalize="off" autocorrect="off" spellcheck="false" :placeholder="placeholder" class="weui-textarea"></textarea>
      </div>
      <box gap="20px 20px" >
        <div v-if="sub">
          <x-button type="primary" @click.native="submit" :disabled="textdata&&writeAble?false:true">提交</x-button>
        </div>
        <div v-else>
          <x-button type="primary" disabled show-loading @click.native="submit">正在提交</x-button>
        </div>
      </box>
    </div>
  </div>
</template>

<script>
  import 'common/css/reset.css';
  import 'common/js/common.js';
  import geturlpara from 'common/js/geturlpara.js';
  import AjaxServer from 'common/js/ajaxServer.js';
  import Vue from 'vue'
  import {XButton,Box,Toast,ToastPlugin} from 'vux'
  Vue.use(ToastPlugin)
  Vue.prototype.$geturlpara=geturlpara

  export default {
    name: 'addcomment',
    mounted () {
      var name = this.$geturlpara.getUrlKey("name");
      var id = this.$geturlpara.getUrlKey("id");
      this.name=name;
      this.id=id;
    },
    data () {
      return {
        textdata:'',
        placeholder:"写下您想说的话",
        name:"",
        sub:true,
        id:0,
        writeAble:true
      }
    },
    components: {
      XButton,
      Box
    },
    created () {
      if (localStorage.getItem("gid")) {
      }else{
        this.$vux.toast.show({
         text: '请前往注册页面',
         width:'11em'
        })
      }
    },
    methods: {
      // 提交评论
      submit(){
        this.sub=false;
        var self=this;
        this.writeAble=false;
        //http
        AjaxServer.httpPost(
          Vue,
          HOST+'/api/comments/add',
          {
            from:3,
            gid:localStorage.getItem("gid"),
            token:localStorage.getItem("token"),
            item:self.id,
            content:self.textdata,
            origin_comment:""
          },(data)=>{
            self.sub=true;
            if (data.status!=0) {
              console.log('err');
              self.$vux.toast.show({
               text: data.error,
               type:'warn',
               width:'10em'
              })
            }else{
              self.$vux.toast.show({
                text: '评论成功',
              })
            }
            setTimeout(()=>{
              window.history.go(-1);
            },3000)
          },
          (err)=>{
            self.sub=true;
            console.log(err);
            self.$vux.toast.show({
             text: '评论失败，请稍后重试',
             type:'warn',
            })
          });
      },
    },
    filters: {

    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
body{
  background-color: #eee;
}
#addcomment{
  .content{
    overflow: hidden;
    height: 100%;
    .title{
      margin: 10px 0;
      p{
        padding: 0 10px;
        line-height: 28px;
        font-size: 16px;
        color:#000;
      }
    }
    .comcontent{
      padding:0 15px;
      background-color: #fff;
      position: relative;
      textarea{
        padding:10px 0px;
        line-height: 20px;
        height: 127px;
        width: 100%;
        overflow:hidden;
        resize:none;
        border:none;
      }
    }
  }
}

</style>
