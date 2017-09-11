<template>
  <div id="member-center">
    <div class="content" v-if="showContent">
      <group class="header">
        <cell title="年中盛典门票" is-link @click.native="activeTicket"><span>已过期</span></cell>
      </group>
      <TitleBar title="专栏折扣价" more="查看更多" line="" url="/m/channels.html"></TitleBar>
      <div class="channels-list">
        <ul>
          <li v-for="(item,index) in channelsList" v-if="index<3" @click="toChannel(item)">
            <div class="img">
              <img :src="item.thumb" alt="">
              <p class="channel-name" v-html="item.name"></p>
            </div>
            <p>
              <span class="price" v-if="!item.followed">已订阅</span>
              <span class="price" v-if="item.followed">¥{{item.channel_price}}</span>
              <s class="proprice" v-if="item.followed">¥{{item.price}}</s>
            </p>
          </li>
        </ul>
        <ul>
          <li v-for="(item,index) in channelsList" v-if="index>=3&&index<6" @click="toChannel(item)">
            <div class="img">
              <img :src="item.thumb" alt="">
              <p class="channel-name" v-html="item.name"></p>
            </div>
            <p>
              <span class="price" v-if="!item.followed">已订阅</span>
              <span class="price" v-if="item.followed">¥{{item.channel_price}}</span><s class="proprice" v-if="item.followed">¥{{item.price}}</s>
            </p>
          </li>
        </ul>
      </div>
      <div class="goods-list">
        <group class="header" v-for="item in goodsList">
          <cell :title="item.name" is-link @click.native="toGood(item)">
            <span v-if="item.state==0">未开始</span>
            <span v-if="item.state==1">未兑换</span>
            <span v-if="item.state==2">已兑换</span>
            <span v-if="item.state==3">已过期</span>
          </cell>
        </group>
      </div>
    </div>
    <Loading v-model="loadingshow" :text="loadtext" ></Loading>
  </div>
</template>

<script>
  import 'common/css/reset.css';
  import 'common/js/config.js';
  import AjaxServer from 'common/js/ajaxServer.js';
  import {isWeiXin} from 'common/js/common.js';
  import { toPay } from 'common/js/pay.js';
  import TitleBar from "components/TitleBar/TitleBar"
  import { Group,Cell,Loading,AlertPlugin,cookie,querystring } from 'vux'
  import Vue from 'vue'
  Vue.use(AlertPlugin)
  export default {
    name: 'member-center',
    data () {
      return {
        id:0,
        showContent:false,
        loadingshow: true,
        loadtext: '加载中...',
        dataInfo:{},
        channelsList:[],
        goodsList:[]
      }
    },
    components: {
      Group,
      Cell,
      Loading,
      TitleBar
    },
    created () {
      if (isWeiXin()) {
      }
      this.fetchData();
    },
    methods: {
      fetchData(id){
        AjaxServer.httpGet(
          Vue,
          HOST+'/api/users/my_privileges',
          {},
          (data)=>{
            if (data.status==0) {
              this.loadingshow=false;
              this.showContent=true;
              this.dataInfo=data;
              data.items.map((item)=>{
                if (item.type=="channel") {
                  this.channelsList=item.items;
                }
                if(item.type=="goods") {
                  this.goodsList=item.items;
                }
              });
            }
          }),
          (err)=>{
            console.log(err);
          }
      },
      toChannel(data){
        window.location.href="/m/channel.html?id="+data.id;
      },
      activeTicket(){
        console.log("年终盛典门票");
      },
      toGood(data){
        window.location.href="/m/privilege-detail.html?id="+data.id;
      }
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
@import "../index/App.less";
@import './App.less';
</style>
