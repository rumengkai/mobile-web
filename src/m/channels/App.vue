<template>
  <div id="channels">
    <Loading v-model="loadingshow" :text="loadtext"></Loading>
    <x-header class="vux-1px-b" :left-options="{showBack: false}">订阅</x-header>
    <scroller lock-x ref="scrollerEvent">
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
  </div>
</template>

<script>
  import 'common/css/reset.css';
  import 'common/js/common.js';
  import geturlpara from 'common/js/geturlpara.js';
  import Channels from "components/Channels/Channels"
  import Vue from 'vue'
  import {Loading,XHeader,Icon,Scroller} from 'vux'
  import VueResource from 'vue-resource'
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
      }
    },
    components: {
      Icon,
      XHeader,
      Loading,
      Channels,
      Scroller
    },
    created () {
      this.fetchData();
    },

    methods: {
      //获取专栏数据数据
      fetchData(cid){
        this.$http.get('/api/channels.json', [])
        .then((data)=>{
          this.loadingshow=false;
          this.channels=JSON.parse(data.bodyText);
          console.log(this.articles);
          console.log(this);
          this.$nextTick(() => {
            this.$refs.scrollerEvent.reset()
          })
        }, (err)=>{console.log(err);});
      },
      search(){
        console.log("search");
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
    padding-top: 46px;
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
