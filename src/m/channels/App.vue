<template>
  <div id="channels">
    <Loading v-model="loadingshow" :text="loadtext"></Loading>
    <!-- <x-header v-if="showContent" class="vux-1px-b" :left-options="{showBack: false}">订阅</x-header> -->
    <scroller v-if="showContent" lock-x ref="scrollerEvent">
      <div class="content">
        <div class="channels-title vux-1px-t vux-1px-b">
          <span></span>
          已订阅
        </div>
        <Channels :subs="channels.subs"></Channels>
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
  import geturlpara from 'common/js/geturlpara.js';
  import Channels from "components/Channels/Channels"
  import Failed from "components/Failed/Failed"
  import Vue from 'vue'
  import {Loading,XHeader,Icon,Scroller} from 'vux'
  import VueResource from 'vue-resource'
  import { AlertPlugin} from 'vux'
  Vue.use(AlertPlugin)
  Vue.use(VueResource)
  Vue.prototype.$geturlpara=geturlpara

  Vue.http.interceptors.push(function(request, next) {
    // modify headers
    var gid=localStorage.getItem("gid");
    var token=localStorage.getItem("token");
    request.headers.set('from', '2');
    request.headers.set('gid', gid);
    request.headers.set('token', token);
    next();
  });

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
        failedshow:false,
        failedmsg:"请在网络环境下访问"
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
      localStorage.setItem("gid","1047500131");
      localStorage.setItem("token","9a5795f406b94f3192a61d683327c550");
    },
    created () {
      this.fetchData();
      // this.getAjax();
    },
    methods: {
      //获取专栏数据数据
      fetchData(cid){
        this.$http.post(HOST+'/api/channels.json', {params:{}})
        .then((data)=>{
          this.channels=JSON.parse(data.bodyText);
          if(this.channels.status!=0){
            this.failedmsg=this.channels.error;
            this.failedshow=true;
          } else{
            this.showContent=true;
            this.loadingshow=false;
            this.$nextTick(() => {
              this.$refs.scrollerEvent.reset()
            })
          }
        }, (err)=>{
          console.log(err);
          this.loadingshow=false;
          this.failedshow=true;
        });
        var self=this;
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
    // height: .92rem;
    background-color: #fff;
    color: #000;
    position: fixed;
    width: 100%;
    z-index: 99;
    overflow: hidden;
    .vux-header-title{
      color: #000;
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
