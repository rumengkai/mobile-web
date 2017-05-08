<template>
  <div id="channels">
    <Loading v-model="loadingshow" :text="loadtext"></Loading>
    <!-- <x-header v-if="showContent" class="vux-1px-b" :left-options="{showBack: false}"><a slot="right" @click="loginout">退出</a></x-header> -->
    <scroller v-if="showContent" lock-x ref="scrollerEvent">
      <div class="content">
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
    </scroller>
    <Failed v-if="failedshow" :msg="failedmsg"></Failed>
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
          subs:[]
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
        // Vue.http.interceptors.push(function(request, next) {
        //   // modify headers
        //   request.headers.set('from', '3');
        //   request.headers.set('gid', localStorage.getItem("gid"));
        //   request.headers.set('token', localStorage.getItem("gid"));
        //   request.headers.set('version', VERSION);
        //   next();
        // });
        // this.$http.get(HOST+'/api/channels.json', {params:{}})
        // .then((data)=>{
        //   this.channels=JSON.parse(data.bodyText);
        //   if(this.channels.status!=0){
        //     this.failedmsg=this.channels.error;
        //     this.failedshow=true;
        //   } else{
        //     if(this.channels.subs!=0){
        //       this.showsub=true;
        //     }
        //     this.showContent=true;
        //     this.loadingshow=false;
        //     this.$nextTick(() => {
        //       this.$refs.scrollerEvent.reset()
        //     })
        //   }
        // }, (err)=>{
        //   console.log(err);
        //   this.loadingshow=false;
        //   this.failedshow=true;
        // });

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
        console.log(0);
        localStorage.clear();
        cookie.remove('gid');
        cookie.remove('token');
        console.log(1);
        console.log(cookie.remove('gid'));
        console.log(cookie);
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
  .vux-header{
    height: 40px;
    background-color: #fff;
    color: #000;
    position: fixed;
    width: 100%;
    z-index: 99;
    overflow: hidden;
    .vux-header-title{
      color: #ccc;
    }
    .vux-header-right{
      line-height: 14px
    }
    max-width: 680px;
  }
  .content{
    // padding-top: 46px;
    padding-bottom: 50px;
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
