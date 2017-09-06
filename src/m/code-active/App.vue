<template>
  <div id="code-active">
    <div class="content" v-if="showContent">
      <group class="header">
        <x-input title="" v-model="codevalue" placeholder="请输入兑换码"></x-input>
      </group>
      <div style="padding:20px 15px;">
        <x-button type="primary" @click.native="code" class="primary">兑换</x-button>
      </div>
      <p class="coderule" @click="coderule"><img src="./images/question_mark.png" alt="">兑换规则</p>
    </div>
    <Loading v-model="loadingshow" :text="loadtext" ></Loading>
  </div>
</template>

<script>
  import 'common/css/reset.css';
  import 'common/js/config.js';
  import AjaxServer from 'common/js/ajaxServer.js';
  import {isWeiXin} from 'common/js/common.js';
  import { Group,Loading,cookie,querystring,XButton,XInput,ToastPlugin } from 'vux'
  import Vue from 'vue'
  Vue.use(ToastPlugin)
  export default {
    name: 'code-active',
    data () {
      return {
        id:0,
        showContent:true,
        loadingshow: false,
        loadtext: '加载中...',
        codevalue:""
      }
    },
    components: {
      Group,
      Loading,
      XButton,
      XInput
    },
    created () {
      if(isWeiXin()){
        getAuth(cookie,querystring);
      }
    },
    methods: {
      code(){
        var self=this;
        this.loadingshow=true;
        AjaxServer.httpPost(
          Vue,
          HOST+'/api/codes/exchange.json',
          {code:this.codevalue},
          (data)=>{
            this.loadingshow=false;
            if (data.status==0) {
              this.$vux.toast.show({
                 text: data.message,
                 position:'bottom',
                 time:3000,
                 width:'10em',
                 type:'text'
              })
            }else{
              this.$vux.toast.show({
                 text: data.error,
                 position:'bottom',
                 time:3000,
                 width:'10em',
                 type:'text'
              })
            }
          },
          (err)=>{
            console.log(err);
          }
        )
      },
      coderule(){
        window.location.href="/m/code-rule.html"
      }
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
@import "../index/App.less";
@import './App.less';
</style>
