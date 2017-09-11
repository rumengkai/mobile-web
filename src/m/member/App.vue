<template>
  <div id="member">
    <div class="content" v-if="showContent">
      <div class="header">
        <div class="headimg" @click="toProfile">
          <img :src="dataInfo.user.photo" alt="">
        </div>
        <div class="name-title">
          <p class="name" v-html="dataInfo.user.name"></p>
          <p class="t">您正在为当前用户开通会员</p>
        </div>
      </div>
      <div class="memberlist">
        <p>申请成为</p>
        <ul>
          <li v-for="(item,index) in dataInfo.category_prices" v-bind:class="{active:item.id==level_id}" @click="memberActive(item)">
            <img :src="item.photo" alt="">
            <span class="name" v-html="item.name"></span>
            <span class="price">¥{{item.price}}</span>
          </li>
        </ul>
      </div>
      <group class="group">
        <cell title="会员卡激活" is-link @click.native="toCardActive"></cell>
      </group>
      <div class="memberprivilege">
        <p>会员特权</p>
        <p class="detail" v-html="dataInfo.detail"></p>
      </div>
    </div>
    <footer v-if="showContent">
      <div class="price">
        <span>价格： <span> ¥{{price}}</span></span>
      </div>
      <div class="buy" @click="buy">
        <a>
          <span>确认支付</span>
        </a>
      </div>
    </footer>
    <Loading v-model="loadingshow" :text="loadtext" ></Loading>
  </div>
</template>

<script>
  import 'common/css/reset.css';
  import 'common/js/config.js';
  import AjaxServer from 'common/js/ajaxServer.js';
  import {isWeiXin} from 'common/js/common.js';
  import { toPay } from 'common/js/pay.js';
  import { Group,Cell,Loading,AlertPlugin,cookie,querystring } from 'vux'
  import Vue from 'vue'
  Vue.use(AlertPlugin)
  export default {
    name: 'member',
    data () {
      return {
        id:0,
        dataInfo:{},
        showContent:false,
        price:0,
        loadingshow: true,
        loadtext: '加载中...',
        level_id:0,
      }
    },
    components: {
      Group,
      Cell,
      Loading
    },
    created () {
      if (isWeiXin()) {
        this.fetchData();
      }
    },
    methods: {
      fetchData(id){
        AjaxServer.httpGet(
          Vue,
          HOST+'/api/items/member',
          {},
          (data)=>{
            if (data.status==0) {
              this.loadingshow=false;
              this.showContent=true;
              this.id=data.id;
              this.dataInfo=data;
              this.level_id=this.dataInfo.category_prices[0].id;
              this.price=this.dataInfo.category_prices[0].price;
            }
          }),
          (err)=>{
            console.log(err);
          }
      },
      memberActive(item){
        this.price=item.price;
        this.level_id=item.id;
      },
      toProfile(){
        window.location.href="/m/profile.html"
      },
      toCardActive(){
        window.location.href="/m/code-active.html"
      },
      buy(){
        var self=this;
        //已登陆情况
        if (localStorage.getItem("gid")) {
          self.loadtext="加载中..."
          self.loadingshow=true;
          //发起订单请求
          AjaxServer.httpPost(
            Vue,
            HOST+"/pay/weixin/create_order",
            {
              type: config['paytype'],
              items: self.id+":"+this.level_id,
              order_type:""
            },
            (data)=>{
              self.loadingshow=false;
              if (data.status!=0) {
                this.$vux.alert.show({
                  title: '提示',
                  content: data.error,
                  dialogTransition:"",
                  maskTransition:"",
                  onHide (){
                    console.log("订单创建失败");
                    if(data.status==5){
                      console.log(0);
                      localStorage.clear();
                      clearcookie(cookie);
                      getAuth(cookie,querystring,"member",0);
                    }
                  }
                });
              }else{
                console.log("订单创建成功。。");
                self.orderInfo=data;
                toPay(data,self.callback,self);
              }
            },
            (err)=>{
              self.disable=true;
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
          getAuth(cookie,querystring,"member",0);
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
              self.$vux.alert.show({
                title: '恭喜您成为会员',
                content: "您可在会员中心查看您的特权",
                dialogTransition:"",
                maskTransition:"",
              });
              location.href="/m/my.html";
            }
          }
        );
      },
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
@import "../index/App.less";
@import './App.less';
</style>
