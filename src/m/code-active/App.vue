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
      <group class="group">
        <cell title="礼品卡" is-link @click.native="toSkip('gift-card-list.html')">
          <img slot="icon" width="20" style="display:block;margin-right:5px;" src="./images/gift-icon.png">
          <span class="tp" v-if="dataCount.gift_count!=0">
            <span class="tp1">{{dataCount.gift_count}}</span>
          </span>
        </cell>
        <cell title="优惠券" is-link @click.native="toSkip('coupons.html')">
          <img slot="icon" width="20" style="display:block;margin-right:5px;" src="./images/coupons-icon.png">
          <span class="tp" v-if="dataCount.coupon_count!=0">
            <span class="tp1">{{dataCount.coupon_count}}</span>
          </span>
        </cell>
      </group>
    </div>
    <Loading v-model="loadingshow" :text="loadtext" ></Loading>
  </div>
</template>

<script>
  import 'common/css/reset.css';
  import 'common/js/config.js';
  import AjaxServer from 'common/js/ajaxServer.js';
  import {isWeiXin} from 'common/js/common.js';
  import { Group,Cell,Loading,cookie,querystring,XButton,XInput,ToastPlugin } from 'vux'
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
        codevalue:"",
        dataCount:{}
      }
    },
    components: {
      Group,
      Cell,
      Loading,
      XButton,
      XInput
    },
    created () {
      getAuth(cookie,querystring);
      this.feachData();
    },
    methods: {
      fetchData(){
        var url=HOST+'/api/users/coupon_center';
        var data={};
        AjaxServer.httpGet(Vue,url,data,this.fetchResult);
      },
      fetchResult(res){
        if (res.status==0) {
          this.dataCount=res;
        }
      },
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
              setTimeout(()=>{
                window.location.href="/m/my.html"
              },2000)
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
      },
      toSkip(data){
        window.location.href="/m/"+data;
      },
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
@import "../index/App.less";
@import './App.less';
</style>
