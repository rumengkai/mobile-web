<template>
  <div id="channels-index">
    <div class="content vux-1px-b" v-if="showContent">
      <TitleBar :title="dataInfo.updated_channels.name" more="查看全部" :img="dataInfo.updated_channels.image" line="line" url="/m/channels-sub.html"></TitleBar>
      <div class="channels-sub">
        <div class="warp">
          <div class="box1" ref="box1">
            <div class="box1-item" v-for="item in dataInfo.updated_channels.items" @click="toChannel(item)">
              <img :src="item.thumb" alt=""><span v-if="item.unread_num">{{item.unread_num}}</span>
            </div>
          </div>
        </div>
      </div>
      <TitleBar :title="dataInfo.small_channels.name" more="查看全部" :img="dataInfo.small_channels.image" line="line" url="/m/channels-small.html"></TitleBar>
      <Channels :subs="dataInfo.small_channels.items" type="small"></Channels>
      <TitleBar :title="dataInfo.big_channels.name" :img="dataInfo.big_channels.image" line="line"></TitleBar>
      <Channels :subs="dataInfo.big_channels.items"></Channels>
    </div>
    <TabBar active="sub"></TabBar>
    <Failed v-if="failedshow" :msg="failedmsg"></Failed>
    <Loading v-model="loadingshow" :text="loadtext"></Loading>
  </div>
</template>

<script>
  import 'common/css/reset.css';
  import 'common/js/config.js';
  import {isWeiXin} from 'common/js/common.js';
  import TitleBar from "components/TitleBar/TitleBar"
  import AjaxServer from 'common/js/ajaxServer.js';
  import geturlpara from 'common/js/geturlpara.js';
  import Channels from "components/Channels/Channels"
  import TabBar from "components/TabBar/TabBar"
  import Failed from "components/Failed/Failed"
  import Vue from 'vue'
  import {Loading,XHeader,Icon,Scroller} from 'vux'
  import VueResource from 'vue-resource'
  import { AlertPlugin,querystring,cookie} from 'vux'
  Vue.use(AlertPlugin)
  Vue.use(VueResource)
  Vue.prototype.$geturlpara=geturlpara

  export default {
    data () {
      return {
        loadingshow: true,
        loadtext: 'loading...',
        dataInfo:{},
        showContent:false,
        showsub:false,
        failedshow:false,
        failedmsg:"服务请求失败，请刷新重试"
      }
    },
    components: {
      TitleBar,
      Icon,
      XHeader,
      Loading,
      Channels,
      TabBar,
      Scroller,
      Failed
    },
    beforeCreate(){
      //授权
      if(isWeiXin()){
        getAuth(cookie,querystring);
      }
    },
    created () {
      this.fetchData();
    },
    methods: {
      fetchData(){
        var url=HOST+'/api/channels/index.json';
        var data={};
        AjaxServer.httpGet(Vue,url,data,this.fetchResult);
      },
      fetchResult(res){
        var self=this;
        if (!res.is_login&&isWeiXin()) {
          localStorage.setItem("gid","");
          localStorage.clear();
          clearcookie(cookie);
          getAuth(cookie,querystring);
        }else{
          if(res.status!=0){
            self.failedmsg=self.channels.error;
            self.failedshow=true;
          } else{
            self.dataInfo=res;
            self.showContent=true;
            self.loadingshow=false;
            setTimeout(()=>{
              self.$refs.box1.style.width=100*res.updated_channels.items.length+20+"px"
            },0);
          }
        }
      },
      toChannel(item){
        if (item.type==0) {
          window.location.href="/m/channel.html?id="+item.id;
        }else{
          window.location.href="/m/channel-small.html?id="+item.id;
        }
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
      }
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
#channels-index{
  background-color: #eee;
  padding: 1px 0 1.4rem;
  .content{
    background: #eee;
  }
  .channels-sub{
    background: #fff;
  }
}
.warp{
  width: 100%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}
.wrap::-webkit-scrollbar {
    display: none;
}
.box1 {
  min-width: 7.5rem;
  height: 100px;
  box-sizing: border-box;
  background-color: #fff;
  position: relative;
  margin: 0 10px;
}
.box1-item {
  width: 100px;
  height: 110px;
  background-color: #fff;
  display:inline-block;
  float: left;
  box-sizing: border-box;
  padding:12px 7px;
  position: relative;
  span{
    width: 15px;
    height: 15px;
    border-radius: 8px;
    background: #f00;
    text-align: center;
    color: #fff;
    font-size: 12px;
    line-height: 15px;
    top: 13px;
    right: 15px;
    position: absolute;
    display: block;
    border: 1px #fff solid;
  }
  img{
    width: 80px;
    height: 80px;
    border-radius: 40px;
  }
}



</style>
