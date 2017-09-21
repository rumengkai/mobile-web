<template>
  <div id="order">
    <div class="content" v-if="showContent">
      <tab>
        <tab-item selected @on-item-click="onItemClick">全部</tab-item>
        <tab-item @on-item-click="onItemClick">待付款</tab-item>
        <tab-item @on-item-click="onItemClick">待发货</tab-item>
        <tab-item @on-item-click="onItemClick">待收货</tab-item>
      </tab>
      <swiper v-model="index" height="100px" :show-dots="false">
        <swiper-item v-for="(item, index) in list2" :key="index">
          <div class="tab-swiper vux-center">{{item}} Container</div>
        </swiper-item>
      </swiper>
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
  import { Tab, TabItem, Swiper, SwiperItem,Loading,AlertPlugin,cookie,querystring } from 'vux'
  import Vue from 'vue'
  const list = () => ['全部', '待付款', '待发货', '待收货'];
  Vue.use(AlertPlugin)
  // console.log(process.env.NODE_ENV);
  export default {
    name: 'member',
    data () {
      return {
        id:0,
        showContent:false,
        loadingshow: true,
        loadtext: '加载中...',
        dataInfo:{},
        index: 0,
        list2: list(),
      }
    },
    components: {
      Tab,
      TabItem,
      Loading,
      BackHome,
      Swiper,
      SwiperItem,
    },
    beforeCreate(){
      //授权
      if (isWeiXin()) {
        getAuth(cookie,querystring,"order.html");
      }
    },
    created () {
      this.fetchData();
    },
    methods: {
      fetchData(id){
        AjaxServer.httpGet(
          Vue,
          HOST+'/pay/orders/my',
          {},
          (data)=>{
            if (data.status==0) {
              this.loadingshow=false;
              this.showContent=true;
              this.dataInfo=data.items;
            }
          }),
          (err)=>{
            console.log(err);
          }
      },
      onItemClick (index) {
        this.index=index;
        console.log('on item click:', index)
      },
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
@import "../index/App.less";
@import './App.less';
</style>
