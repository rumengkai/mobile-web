<template>
  <div id="gift-card-buy">
    <div class="content" v-if="showContent">
      <div class="card">
        <div class="name">
          {{dataInfo.name}}
        </div>
        <p class="price">¥ {{dataInfo.price}}</p>
      </div>
      <x-button @click.native="buyBtn">点击购买礼品卡</x-button>
      <div class="readme vux-1px-t">
        <p class="title">礼品卡说明</p>
        1、您可以通过点击上方按钮购买礼品卡</br>
        2、礼品卡只适用于当前专栏的兑换</br>
        3、购买成功后您可以把礼品卡通过微信分享的方式赠送给好友</br>
        4、购买成功后无法退款</br>
      </div>
    </div>
    <BackHome></BackHome>
    <Loading v-model="loadingshow" :text="loadtext" ></Loading>
  </div>
</template>

<script>
  import 'common/css/reset.css';
  import 'common/js/config.js';
  import BackHome from "components/BackHome/BackHome"
  import Vue from 'vue'
  import AjaxServer from 'common/js/ajaxServer.js';
  import geturlpara from 'common/js/geturlpara.js';
  import {isWeiXin,weixinShare} from 'common/js/common.js';
  import { toPay } from 'common/js/pay.js';
  import { Group,Cell,Loading,AlertPlugin,cookie,querystring,XButton,ToastPlugin } from 'vux'
  Vue.prototype.$geturlpara=geturlpara
  Vue.use(AlertPlugin)
  Vue.use(ToastPlugin)
  export default {
    data () {
      return {
        id:0,
        state:0,
        showContent:true,
        loadingshow: false,
        loadtext: '加载中...',
        dataInfo:{},
      }
    },
    components: {
      Group,
      Cell,
      Loading,
      XButton,
      BackHome
    },
    beforeCreate(){
    },
    created () {
      try {
        this.id = this.$geturlpara.getUrlKey("id");
      } catch (e) {
        this.id = 0;
      }
      //授权
      // getAuth(cookie,querystring,"gift-card-exchange.html?code="+this.codevalue);
      if (this.id) {
        this.fetchData(this.id);
      }
    },
    methods: {
      fetchData(id){
        AjaxServer.httpGet(
          Vue,
          HOST+'/api/channels/gift_info',
          {
            id:this.id
          },
          (data)=>{
            if (data.status==0) {
              this.dataInfo=data;
              this.showContent=true;
              this.loadingshow=false;
            }else if(data.status==5&&isWeiXin()){
              localStorage.setItem("gid","");
              localStorage.clear();
              clearcookie(cookie);
              var id = this.$geturlpara.getUrlKey("id");
              getAuth(cookie,querystring,"gift-card-exchange.html?id="+this.id+"&code="+this.codevalue);
            }
          },
          (err)=>{
            console.log(err);
          });
      },
      buyBtn(){
        var self=this;
        //已登陆情况
        if (localStorage.getItem("gid")) {
          self.loadtext="加载中..."
          self.loadingshow=true;
          //发起订单请求
          var url="/pay/weixin/create_order"
          AjaxServer.httpPost(
            Vue,
            HOST+url,
            {
              type: config()['paytype'],
              items: self.id,
              order_type:10
            },
            (data)=>{
              self.loadingshow=false;
              if (data.status!=0) {
                this.$vux.alert.show({
                  title: '提示',
                  content:data.error,
                  dialogTransition:"",
                  maskTransition:"",
                  onHide (){
                    console.log("订单创建失败");
                    if(data.status==5){
                      localStorage.clear();
                      clearcookie(cookie);
                      getAuth(cookie,querystring,"channel",id);
                    }
                  }
                });
              }else{
                self.loadingshow=false;
                console.log("订单创建成功。。");
                self.orderInfo=data;
                toPay(data,self.callback,self);
              }
            },
            (err)=>{
              console.log(err);
              console.log("订单创建失败");
              this.$vux.alert.show({
                title: '提示',
                content: "网络异常，请稍后重试",
                dialogTransition:"",
                maskTransition:"",
              });
              self.loadingshow=false;
            }
          );

        }else{
          //未登陆情况，跳转到授权
          getAuth(cookie,querystring,"channel",this.id);
        }
      },
      //支付成功回调
      callback(data){
        var self=this;
        AjaxServer.httpPost(
          Vue,
          HOST+"/pay/weixin/check",
          {
            id:data.id
          },
          (data)=>{
            if (data.status!=0) {
              self.$vux.alert.show({
                title: '提示',
                content: "服务器维护中，您的订单已支付成功，请勿重复支付。如有疑问请联系客服：400-966-7718",
                dialogTransition:"",
                maskTransition:"",
              });
            }else{
              // alert("购买成功")
              // location.reload();
              location.href="/m/gift-card-list.html";
            }
          }
        );
      }
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
@import "../index/App.less";
@import './App.less';
</style>
