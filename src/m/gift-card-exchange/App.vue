<template>
  <div id="gift-card-exchange">
    <div class="content" v-if="showContent">
      <div class="header" v-if="personinfo.name">
        <div class="head-img">
          <img :src="personinfo.photo" alt="头像">
        </div>
        <p class="p-0">{{personinfo.name}}</p>
        <p class="p-1">赠送您一张专栏兑换卡</p>
        <p class="p-2">您可兑换以下专栏</p>
      </div>
      <div class="channel">
        <div class="channels-item vux-1px-t" @click="toChannel(channelinfo.id)">
          <div class="headimg">
            <img :src="channelinfo.thumb" alt="" onerror="this.src='http://m.kofuf.com/static/img/default.png'">
          </div>
          <div class="channels-info">
            <p class="name">{{channelinfo.name}}</p>
            <p class="author_name"><span>{{channelinfo.author_name}}</span><span>{{channelinfo.author_field}}</span></p>
            <p class="brief">{{channelinfo.brief}}</p>
            <p class="price-co">
              <span class="price">¥ <span>{{channelinfo.price}}</span>
              </span>
            </p>
          </div>
        </div>
      </div>
      <div class="btn" v-if="state==0||state==1">
        <x-button type="primary" class="primary" @click.native="confireBtn">确认兑换</x-button>
      </div>
      <div class="btn" v-if="state==2">
        <x-button type="" class="btn-none" >已兑换</x-button>
      </div>
      <div class="btn" v-if="state==3">
        <x-button type="" class="btn-none" >已失效</x-button>
      </div>
    </div>
    <div class="text" v-if="showContent">
      <p>收听方法一：兑换后下载功夫财经App，微信登录后进入“讲武堂”页面收听</p>
      <p>收听方法二：兑换后关注“功夫财经”微信公众号，点击微信听课菜单收听</p>
    </div>
    <div class="btn-fiexd" v-if="showContent">
      <dev class="btn-1" @click="toWeixin">关注公众号</dev>
      <dev class="btn-2" @click="toApp">下载APP</dev>
    </div>
    <!-- <BackHome></BackHome> -->
    <Loading v-model="loadingshow" :text="loadtext" ></Loading>
  </div>
</template>

<script>
  import 'common/css/reset.css';
  import 'common/js/config.js';
  // import BackHome from "components/BackHome/BackHome"
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
        showContent:false,
        dataInfo:{},
        loadingshow: true,
        loadtext: '加载中...',
        codevalue:'',
        personinfo:{},
        channelinfo:{}
      }
    },
    components: {
      Group,
      Cell,
      Loading,
      XButton,
      // BackHome
    },
    beforeCreate(){
    },
    created () {
      try {
        this.id = this.$geturlpara.getUrlKey("id");
      } catch (e) {
        this.id = 0;
      }
      this.codevalue = this.$geturlpara.getUrlKey("code");
      // 授权
      // if (isWeiXin()) {
        getAuth(cookie,querystring,"gift-card-exchange.html?code="+this.codevalue);
      // }
      this.fetchData(this.id);
    },
    methods: {
      fetchData(id){
        AjaxServer.httpGet(
          Vue,
          HOST+'/api/codes/show',
          {
            code:this.codevalue
          },
          (data)=>{
            if (data.status==0) {
              this.personinfo=data.person;
              this.channelinfo=data.channel;
              this.state=data.state;
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
      confireBtn(){
        AjaxServer.httpPost(
          Vue,
          HOST+'/api/codes/exchange.json',
          {
            code:this.codevalue
          },
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
                window.location.href="/m/channel.html?id="+this.channelinfo.id
              },2000)
            }else{
              this.$vux.toast.show({
                 text: data.error,
                 position:'bottom',
                 time:5000,
                 width:'auto',
                 type:'text'
              })
            }
          },
          (err)=>{
            console.log(err);
          }
        )
      },
      toChannel(id){
        window.location.href=HOST+"/m/channel.html?id="+id;
      },
      toWeixin(){
        window.location.href=HOST+"/m";
      },
      toApp(){
        window.location.href="https://ah88dj.mlinks.cc/AK8j";
      },
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
@import "../index/App.less";
@import './App.less';
</style>
