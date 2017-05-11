<template>
  <div id="channels">
    <!-- <x-header v-if="showContent" class="vux-1px-b" :left-options="{showBack: false}"><a slot="right" @click="loginout">退出</a> </x-header> -->
    <scroller v-if="showContent" lock-x ref="scrollerEvent">
      <div class="wriper">
        <div class="header" v-if="channels.user">
          <div class="headimg">
            <img :src="channels.user.profile" alt="">
          </div>
          <span class="name">{{channels.user.name}}</span>
        </div>
        <div class="content vux-1px-b">
          <div v-if="showsub" class="channels-title vux-1px-t vux-1px-b">
            <span></span>
            已订阅
          </div>
          <Channels v-if="showsub" :subs="channels.subs"></Channels>
          <div class="channels-title vux-1px-t vux-1px-b">
            <span></span>
            推荐订阅
          </div>
          <Channels :subs="channels.unsubs"></Channels>
        </div>
      </div>
    </scroller>
    <Failed v-if="failedshow" :msg="failedmsg"></Failed>
    <Loading v-model="loadingshow" :text="loadtext"></Loading>
  </div>
</template>

<script>
  import 'common/css/reset.css';
  import 'common/js/common.js';
  import AjaxServer from 'common/js/ajaxServer.js';
  import geturlpara from 'common/js/geturlpara.js';
  import Channels from "components/Channels/Channels"
  import Failed from "components/Failed/Failed"
  import Vue from 'vue'
  import {Loading,XHeader,Icon,Scroller} from 'vux'
  import VueResource from 'vue-resource'
  import { AlertPlugin,querystring,cookie} from 'vux'
  Vue.use(AlertPlugin)
  Vue.use(VueResource)
  Vue.prototype.$geturlpara=geturlpara

  export default {
    name: 'channels',
    data () {
      return {
        loadingshow: true,
        loadtext: 'loading...',
        channels:{
          unsubs:[],
          subs:[],
          user:{
            name:"功夫财经",
            profile:"https://mwimg.mlinks.cc/ms_image_18938_6d17d71962adfbf579928a0a49704002.jpg?imageMogr/v2/thumbnail/300x300",
          }
        },
        showContent:false,
        showsub:false,
        failedshow:false,
        failedmsg:"服务请求失败，请刷新重试"
      }
    },
    components: {
      Icon,
      XHeader,
      Loading,
      Channels,
      Scroller,
      Failed
    },
    beforeCreate(){
      //授权
      getAuth(cookie,querystring);
    },
    created () {
      this.fetchData();
      // this.getAjax();
    },
    methods: {
      //获取专栏数据数据
      fetchData(cid){
        var self=this;
        AjaxServer.httpGet(
          Vue,
          HOST+'/api/channels.json',
          {},
          (data)=>{
            self.channels=data;
            if(self.channels.status!=0){
              self.failedmsg=self.channels.error;
              self.failedshow=true;
            } else{
              if(self.channels.subs!=0){
                self.showsub=true;
              }
              self.showContent=true;
              self.loadingshow=false;
              self.$nextTick(() => {
                self.$refs.scrollerEvent.reset()
              })
            }
          },
          (err)=>{
            console.log(err);
            self.loadingshow=false;
            self.failedshow=true;
          }
        );
        setTimeout(()=>{
          self.loadingshow=false;
        },10000);
      },
      logErr(err){
        this.$vux.alert.show({
          title: '提示',
          content: err,
          dialogTransition:"",
          maskTransition:"",
          onShow () {},
          onHide () {}
        })
      },
      loginout(){
        localStorage.clear();
        cookie.set('gid', 0,{
            domain: '.kofuf.com',
            path: '/',
            expires: -1
          });
        cookie.set('token', 0,{
            domain: '.kofuf.com',
            path: '/',
            expires: -1
          });
        WeixinJSBridge.invoke('closeWindow',{},function(res){});
        // location.reload();
      }
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
body{
  background-color: #eee;
}
#channels{
  height: 100%;
  background-color: #fff;
  .header{
    width: 100%;
    height: 37px;
    overflow: hidden;
    display: flex;
    align-items: center;
    background-color: #333;
    .headimg{
      margin-left: .3rem;
      width: 30px;
      height: 30px;
      border-radius: 15px;
      background-color: #f00;
      overflow: hidden;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .name{
      font-size: 12px;
      color: #ccc;
      margin-left: .3rem;
      font-weight: 200;
    }
  }
  .wriper{
    height: auto;
    overflow: hidden;
    .content{
      margin-bottom: 100px;
    }
  }

  .channels-title{
    width: 100%;
    height: 46px;
    background-color: #f0f0f0;
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #666;
    span{
      display: block;
      height: 16px;
      width: 4px;
      background-color: #fdd000;
      margin-left: .3rem;
      margin-right: .15rem;
    }

  }
}
.weui-icon-search:before{
    font-size:20px;
    color: #666666;
}


</style>
