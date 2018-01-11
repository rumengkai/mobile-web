<template>
  <div id="home">
    <div v-if="showContent">
      <Banner :bannerlist="indexdata.carousels"></Banner>
      <div v-if="indexdata.activities">
        <TitleBar :title="indexdata.activities.name" more="查看全部" :img="indexdata.activities.image" line="line" url="/mengqi/#/activity/list"></TitleBar>
        <activities-list :dataList="indexdata.activities.items"></activities-list>
      </div>
      <TitleBar :title="indexdata.daily.name" more="查看全部" :img="indexdata.daily.image" url="/m/daily.html"></TitleBar>
      <AudioList :audiolist="indexdata.daily.items"></AudioList>
      <TitleBar :title="indexdata.big_channels.name" more="查看全部" :img="indexdata.big_channels.image" line="line" url="/m/channels.html"></TitleBar>
      <div class="channels">
        <div class="warp">
          <div class="box1" ref="box1">
            <div class="box1-item" v-for="(item,index) in indexdata.big_channels.items" @click="toChannel(item.id)" :key="index">
              <img :src="item.thumb" alt="">
              <p class="title" v-html="item.name"></p>
              <p class="brief ell-2" v-html="item.brief"></p>
            </div>
          </div>
        </div>
      </div>
      <!-- 学者书房 -->
      <TitleBar v-if="!!indexdata.teacher_books" :title="indexdata.teacher_books.name" more="查看全部" :img="indexdata.teacher_books.image" line="line" url="/m/books-list-teacher.html"></TitleBar>
      <books-list-teacher v-if="!!indexdata.teacher_books" :dataList="indexdata.teacher_books.items"></books-list-teacher>
      <!-- 书房 -->
      <TitleBar v-if="!!indexdata.books" :title="indexdata.books.name" more="查看全部" :img="indexdata.books.image" line="line" url="/m/books.html"></TitleBar>
      <books-list v-if="!!indexdata.books" :dataList="indexdata.books.items"></books-list>
      <TitleBar :title="indexdata.small_channels.name" more="查看全部" :img="indexdata.small_channels.image" line="line" url="/m/channels-small.html"></TitleBar>
      <Channels :subs="indexdata.small_channels.items" type="small"></Channels>
      <TitleBar :title="indexdata.goods.name" more="查看全部" :img="indexdata.goods.image" url="/m/goods.html"></TitleBar>
      <AudioList :audiolist="indexdata.goods.items"></AudioList>
      <TitleBar :title="indexdata.articles.name" line="line" :img="indexdata.articles.image"></TitleBar>
      <Article :articlelist="indexdata.articles.items"></Article>
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
  import BooksList from "components/Books/BooksList"
  import BooksListTeacher from "components/Books/BooksListTeacher"
  import AudioList from "components/AudioList/AudioList"
  import LoadingMore from "components/LoadingMore/LoadingMore"
  import LazyLoadingMore from "components/LazyLoadingMore/LazyLoadingMore"
  import Failed from "components/Failed/Failed"
  import ActivitiesList from "components/ActivitiesList/ActivitiesList"
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
        indexdata:{small_channels:{items:[]}},
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
      Failed,
      BooksList,
      BooksListTeacher,
      ActivitiesList
    },
    beforeCreate(){
      //授权
      if(isWeiXin()){
        // getAuth(cookie,querystring);
      }
    },
    created () {
      this.fetchData();
    },
    methods: {
      //获取首页数据
      fetchData(){
        var url=HOST+'/api/index2.json';
        var data={};
        AjaxServer.httpGet(Vue,url,data,this.fetchResult);
      },
      fetchResult(res){
        var self=this;
        if (res.status==0) {
          this.loadingshow=false;
          this.showContent=true;
          self.indexdata=res;
          setTimeout(()=>{
            self.$refs.box1.style.width=120*self.indexdata.big_channels.items.length+20+"px"
          },0);
        }
        setTimeout(()=>{
          self.loadingshow=false;
        },10000);
      },
      toChannel(id){
        window.location.href="/m/channel.html?id="+id;
      },
      loadList(data){
        this.indexdata.articles.items=this.indexdata.articles.items.concat(data);
      }
    }
  }
</script>
<style lang="less">
@import '~vux/src/styles/1px.less';
@import "../index/App.less";
@import './App.less';
</style>
