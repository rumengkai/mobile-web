<template>
  <div id="gift-card-list">
    <div class="content" v-if="showContent">
      <div class="card-2">
        <img class="code-bg" src="./images/code-bg.png" alt="">
        <div class="name">
          大笑说A股
        </div>
        <p class="price">¥ 150</p>
        <p class="text">已兑换</p>
      </div>
      <div class="card">
        <img class="code-bg" src="./images/code-bg.png" alt="">
        <div class="name">
          大笑说A股
        </div>
        <p class="price">¥ 150</p>
        <p class="code">NJCNKSBHJMKJN</p>
        <div class="line"></div>
        <div class="s-btn" @click.stop="sendFriends(item)">
          <img src="./images/wx.png" alt=""><span>点此赠送给微信好友</span>
        </div>
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
      this.fetchData();
    },
    methods: {
      fetchData(id){
        AjaxServer.httpGet(
          Vue,
          HOST+'/api/codes/my_gift_cards',
          {},
          (data)=>{
            console.log(data.status==5&&isWeiXin());
            if (data.status==0) {
              this.channelinfo=data.channel;
              this.showContent=true;
              this.loadingshow=false;
            }else if(data.status==5&&isWeiXin()){
              localStorage.setItem("gid","");
              localStorage.clear();
              clearcookie(cookie);
              getAuth(cookie,querystring,"gift-card-list.html");
            }
          },
          (err)=>{
            console.log(err);
          });
      },
      sendFriends(item){
        // 复制兼容性问题
        window.shareData={
          title:'赠送给您一张专栏兑换卡',
          link:item.url,
          imgUrl:item.image,
          desc:item.name
        }
        weixinShare(Vue);
        this.$vux.alert.show({
          title: '提示',
          content: "已选择当前礼品卡，点击右上角分享给朋友！",
          dialogTransition:"",
          maskTransition:"",
        });
      }
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
@import "../index/App.less";
@import './App.less';
</style>
