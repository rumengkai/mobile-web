<template>
  <div id="order">
    <div class="content" v-if="showContent">
      <tab style="position:fiexd;">
        <tab-item :selected="index=== 0" @on-item-click="onItemClick">全部</tab-item>
        <tab-item :selected="index=== 1" @on-item-click="onItemClick">待付款</tab-item>
        <tab-item :selected="index=== 2" @on-item-click="onItemClick">待发货</tab-item>
        <tab-item :selected="index=== 3" @on-item-click="onItemClick">待收货</tab-item>
      </tab>
      <div class="ht"></div>
      <dev v-for="(item, i) in dataInfo" :key="i">
        <div v-if="i==index">
          <div v-if="item.length!=0">
            <OrderList :datalist="item" v-on:updateDate="onUpdate"></OrderList>
          </div>
          <div v-if="item.length==0" class="empty">
            <p><img src="./images/order_empty.png" alt=""></p>
            <p>暂无{{orderempaty[i]}}订单</p>
          </div>
        </div>
      </dev>
    </div>
    <BackHome></BackHome>
    <Loading v-model="loadingshow" :text="loadtext" ></Loading>
  </div>
</template>

<script>
  import 'common/css/reset.css';
  import 'common/js/config.js';
  import BackHome from "components/BackHome/BackHome"
  import OrderList from "components/OrderList/OrderList"
  import AjaxServer from 'common/js/ajaxServer.js';
  import {isWeiXin,weixinShare} from 'common/js/common.js';
  import { toPay } from 'common/js/pay.js';
  import { Tab, TabItem,Loading,AlertPlugin,cookie,querystring } from 'vux'
  import Vue from 'vue'
  const list = () => [[], [], [], []];
  Vue.use(AlertPlugin)
  // console.log(process.env.NODE_ENV);
  export default {
    name: 'order',
    data () {
      return {
        id:0,
        showContent:false,
        loadingshow: true,
        loadtext: '加载中...',
        dataInfo:list(),
        index: 0,
        statelist:['','p','s','L'],
        orderempaty:['','待付款','待发货','待收货']
      }
    },
    components: {
      Loading,
      Tab,
      TabItem,
      Loading,
      BackHome,
      OrderList,
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
      onUpdate(obj){
        console.log(obj);
        if (obj.type===1) {
          this.fetchData();
        }else{
          //弹出订单详情
          console.log(obj.item);
        }
      },
      fetchData(id){
        AjaxServer.httpGet(
          Vue,
          HOST+'/pay/orders/my',
          {},
          (data)=>{
            if (data.status==0) {
              Vue.set(this.dataInfo, 0, data.items)
              this.loadingshow=false;
              this.showContent=true;
              this.index=0;
            }
          },
          (err)=>{
            console.log(err);
          }
        );
      },
      onItemClick (index) {
        this.index=index;
        this.loadingshow=true;
        AjaxServer.httpGet(
          Vue,
          HOST+'/pay/orders/my',
          {
            state:this.statelist[index]
          },
          (data)=>{
            if (data.status==0) {
              this.loadingshow=false;
              this.showContent=true;
              Vue.set(this.dataInfo, index, data.items)
              // this.dataInfo[index]=data.items;
            }
          },
          (err)=>{
            console.log(err);
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
