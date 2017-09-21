<template>
  <div id="order-detail">
    <div class="content" v-if="showContent">
      我的订单详情
    </div>
    <BackHome></BackHome>
    <Loading v-model="loadingshow" :text="loadtext" ></Loading>
  </div>
</template>

<script>
  import 'common/css/reset.css';
  import 'common/js/config.js';
  import BackHome from "components/BackHome/BackHome"
  import AjaxServer from 'common/js/ajaxServer.js';
  import {isWeiXin,weixinShare} from 'common/js/common.js';
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
      Loading,
      BackHome
    },
    beforeCreate(){
      //授权
      if (isWeiXin()) {
        getAuth(cookie,querystring,"member.html");
      }
    },
    created () {
      this.fetchData();
    },
    methods: {
      fetchData(id){
        AjaxServer.httpGet(
          Vue,
          HOST+'/api/items/member',
          {},
          (data)=>{
            if (data.status==0) {
              console.log(data.user);
              console.log(!data.user);
              if (!data.user) {
                localStorage.setItem("gid","");
                localStorage.clear();
                clearcookie(cookie);
                getAuth(cookie,querystring,"member.html");
              }else{
                this.loadingshow=false;
                this.showContent=true;
                this.id=data.id;
                this.dataInfo=data;
                this.level_id=this.dataInfo.category_prices[0].id;
                this.price=this.dataInfo.category_prices[0].price;
              }
            }
            window.shareData={
            	title:'功夫财经英雄招募令',
            	link:HOSTM+'/m/member.html',
            	imgUrl:'http://m.kofuf.com/static/img_h5/h5_logo.png',
            	desc:"订阅专栏折扣、功夫佳酿、功夫盛典现场门票、超值课程礼包、全国各地线下活动与大咖零距离交流~现在就来加伙吧！"
            }
            weixinShare(Vue);
          }),
          (err)=>{
            console.log(err);
          }
      },
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
@import "../index/App.less";
@import './App.less';
</style>
