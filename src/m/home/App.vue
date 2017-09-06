<template>
  <div id="home">
    <div v-if="showContent">
       <Banner :bannerlist="indexdata.carousels"></Banner>
      <TitleBar :title="indexdata.daily_head.title" more="查看全部" img="http://static2.kofuf.com/1504608671349.png" url="/m/daily.html"></TitleBar>
      <AudioList :audiolist="indexdata.daily"></AudioList>
      <TitleBar :title="indexdata.channel_head.title" more="查看全部" img="http://static2.kofuf.com/1504608671349.png" line="line" url="/m/channels.html"></TitleBar>
      <div class="channels">
        <div class="warp">
          <div class="box1" ref="box1">
            <div class="box1-item" v-for="item in indexdata.channels" @click="toChannel(item.id)">
              <img :src="item.thumb" alt="">
              <p class="title" v-html="item.name"></p>
              <p class="brief" v-html="item.brief"></p>
            </div>
          </div>
        </div>
      </div>
      <TitleBar :title="indexdata.goods_head.title" more="查看全部" img="http://static2.kofuf.com/1504608671349.png" url="/m/goods.html"></TitleBar>
      <AudioList :audiolist="indexdata.goods"></AudioList>
      <TitleBar :title="indexdata.article_head.title" line="line" img="http://static2.kofuf.com/1504608671349.png"></TitleBar>
      <Article :articlelist="indexdata.articles"></Article>
      <div class="load">
        <LazyLoadingMore url="/api/articles/list.json" v-on:getData="loadList" params="articles"></LazyLoadingMore>
      </div>
    </div>
    <TabBar active="home"></TabBar>
    <Failed v-if="failedshow" :msg="failedmsg"></Failed>
    <Loading v-model="loadingshow" :text="loadtext"></Loading>
  </div>
</template>

<script>
  import 'common/css/reset.css';
  import 'common/js/config.js';
  import {isWeiXin,getClient,getSubClient} from 'common/js/common.js';
  import AjaxServer from 'common/js/ajaxServer.js';
  import geturlpara from 'common/js/geturlpara.js';
  import Channels from "components/Channels/Channels"
  import TabBar from "components/TabBar/TabBar"
  import Banner from "components/Banner/Banner"
  import TitleBar from "components/TitleBar/TitleBar"
  import Article from "components/Article/Article"
  import AudioList from "components/AudioList/AudioList"
  import LoadingMore from "components/LoadingMore/LoadingMore"
  import LazyLoadingMore from "components/LazyLoadingMore/LazyLoadingMore"
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
        sc:false,
        loadingshow: true,
        loadtext: 'loading...',
        showContent:false,
        failedshow:false,
        failedmsg:"服务请求失败，请刷新重试",
        indexdata:{},
      }
    },
    components: {
      Icon,
      XHeader,
      Loading,
      Channels,
      TabBar,
      Banner,
      TitleBar,
      Article,
      AudioList,
      LoadingMore,
      LazyLoadingMore,
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
      //获取首页数据
      fetchData(){
        var self=this;
        AjaxServer.httpGet(
          Vue,
          HOST+'/api/index.json',
          {},
          (data)=>{
            if (data.status==0) {
              this.loadingshow=false;
              this.showContent=true;
              self.indexdata=data;
              setTimeout(()=>{
                self.$refs.box1.style.width=150*self.indexdata.channels.length+20+"px"
              },0);
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
      toChannel(id){
        window.location.href="/m/channel.html?id="+id;
      },
      loadList(data){
        this.indexdata.articles=this.indexdata.articles.concat(data);
      }
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
body{
  background-color: #eee;
}
#home{
  height: 100%;
}
.channels{
  background: #fff;
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
  width: 1000px;
  min-width: 800px;
  height: 222px;
  box-sizing: border-box;
  background-color: #fff;
  position: relative;
  margin: 0 10px;
}
.box1-item {
  width: 150px;
  height: 200px;
  background-color: #fff;
  display:inline-block;
  float: left;
  box-sizing: border-box;
  padding:12px 7px;
  position: relative;
  img{
    width: 136px;
    height: 136px;
  }
  .title{
    margin-top: 8px;
    height: 20px;
    line-height: 20px;
    white-space:nowrap;
    overflow: hidden;
    text-overflow:ellipsis;
    color: #333;
    font-size: 14px;
  }
  .brief{
    margin-top: 4px;
    line-height: 14px;
    color: #999;
  }
}
.load{
  height: 120px;
  width: 100%;
}
.vux-scroller{
  background: #fff;
}





</style>
