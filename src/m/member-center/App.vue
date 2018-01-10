<template>
  <div id="member-center">
    <div class="content" v-if="showContent">
      <div v-for="i in dataInfo.items">
        <div v-if="i.type=='goods'">
          <group class="header" v-for="item in i.items">
            <cell :title="item.name" is-link @click.native="toGood(item)">
              <span v-if="item.state==0">未开始</span>
              <span v-if="item.state==1">未兑换</span>
              <span v-if="item.state==2">已兑换</span>
              <span v-if="item.state==3">已过期</span>
            </cell>
          </group>
        </div>
        <div v-if="i.type=='channel'">
          <TitleBar title="专栏折扣价" more="查看更多" line="" url="/m/channels.html"></TitleBar>
          <div class="channels-list">
            <ul>
              <li v-for="(item,index) in i.items" v-if="index<3" @click="toChannel(item)">
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
              <li v-for="(item,index) in i.items" v-if="index>=3&&index<6" @click="toChannel(item)">
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
        </div>
      </div>
      <div class="" v-if="dataInfo.items.length==0">
        <p class="over">权益已兑换</p>
      </div>
    </div>
    <BackHome></BackHome>
    <Loading v-model="loadingshow" :text="loadtext" ></Loading>
  </div>
</template>

<script>
  import 'common/css/reset.css';
  import 'common/js/config.js';
  import AjaxServer from 'common/js/ajaxServer.js';
  import {isWeiXin,weixinShare} from 'common/js/common.js';
  import { toPay } from 'common/js/pay.js';
  import BackHome from "components/BackHome/BackHome"
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
      }
    },
    components: {
      Group,
      Cell,
      Loading,
      TitleBar,
      BackHome
    },
    beforeCreate(){
      //授权
      window.shareData={
        title:'功夫财经英雄招募令',
        link:HOSTM+'/m/member-center.html',
        imgUrl:'https://m.kofuf.com/static/img_h5/h5_logo.png',
        desc:"订阅专栏折扣、功夫佳酿、功夫盛典现场门票、超值课程礼包、全国各地线下活动与大咖零距离交流~现在就来加伙吧！"
      }
      if (isWeiXin()) {
        getAuth(cookie,querystring,"member-center.html");
        weixinShare(Vue);
      }
    },
    created () {
      this.fetchData();
      // 操作history
      // console.log(history);
      // history.replaceState({},'','/m/channels.html')
      // history.replaceState({},'','/m/member-center.html')
      // window.onpopstate=function () {
      //   window.location.href="/m/channels.html"
      // }
      // console.log(history);
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
              if (isWeiXin()) {
                weixinShare(Vue);
              }
              //第一批会员
              if (this.dataInfo.items.length==0) {
                window.location.href="/m/my.html"
              }
            }
            if (data.status==5) {
              localStorage.setItem("gid","");
              localStorage.clear();
              clearcookie(cookie);
              getAuth(cookie,querystring,"my.html");
            }
            //权限无效
            if (data.status==4) {
              this.loadingshow=false;
              this.showContent=true;
              window.location.href="/m/member.html";
            }
          }),
          (err)=>{
            console.log(err);
          }
      },
      toChannel(data){
        window.location.href="/m/channel.html?id="+data.id;
      },
      toGood(data){
        if (data.state!=2&&data.state!=3) {
          window.location.href="/m/privilege-detail.html?id="+data.id;
        }else{

        }
      }
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
@import "../index/App.less";
@import './App.less';
</style>
