<template>
  <div id="moments">
    <div v-if="showContent" class="content">
      <div class="profile">
        <div class="headimg">
          <img :src="dataInfo.user.photo" alt="头像" class="head">
          <img class="level" v-if="dataInfo.user.level!=0||dataInfo.user.gender=='S'" :src="dataInfo.user.vip_icon" alt="会员">
          <p v-html="dataInfo.user.name"></p>
        </div>
      </div>
      <div v-if="dataInfo.small_channels.items.length">
        <TitleBar :title="dataInfo.small_channels.name" :img="dataInfo.small_channels.image"></TitleBar>
        <group class="author-info">
          <cell value="" is-link v-for="item in dataInfo.small_channels.items" @click.native="toChannelSmall(item)">
            <p class="p-1">{{item.name}}</p>
            <p class="p-2">{{item.brief}}</p>
            <img slot="icon" :src="item.thumb" alt="头像">
          </cell>
        </group>
      </div>
      <div v-if="dataInfo.big_channels.items.length">
        <TitleBar :title="dataInfo.big_channels.name" :img="dataInfo.big_channels.image"></TitleBar>
        <group class="author-info">
          <cell value="" is-link v-for="item in dataInfo.big_channels.items" @click.native="toChannel(item)">
            <p class="p-1">{{item.name}}</p>
            <p class="p-2">{{item.brief}}</p>
            <img slot="icon" :src="item.thumb" alt="头像">
          </cell>
        </group>
      </div>
      <div v-if="dataInfo.timeline.items.length">
        <TitleBar :title="dataInfo.timeline.name" :img="dataInfo.timeline.image"></TitleBar>
        <group class="author-timeline">
          <cell value="" v-for="item in dataInfo.timeline.items" @click.native="toDetail(item.item)">
            <img class="heard-img" :src="dataInfo.user.photo" alt="头像">
            <div class="div">
              <p class="p-1">{{dataInfo.user.name}}</p>
              <p class="p-2">{{item.time | formatDate}}
                <span v-if="item.type==1">发表文章</span>
                <span v-if="item.type==2">发表评论</span>
                <span v-if="item.type==3">点赞文章</span>
                <span v-if="item.type==4">点赞文章</span>
              </p>
            </div>
            <p class="comment">
              {{item.content}}
            </p>
            <div class="box">
              <img :src="item.item.thumb" alt="">
              <span class="cankao"></span>
              <span class="text">{{item.item.name}}</span>
            </div>
          </cell>
        </group>
      </div>
      <LazyLoadingMore url="/api/users/timeline.json" v-on:getData="loadList" params="items" :pid="dataInfo.user.id"></LazyLoadingMore>
    </div>
    <Failed v-if="failedshow" :msg="failedmsg"></Failed>
    <Loading v-model="loadingshow" :text="loadtext"></Loading>
  </div>
</template>

<script>
  import 'common/css/reset.css';
  import 'common/js/config.js';
  import {isWeiXin} from 'common/js/common.js';
  import TitleBar from "components/TitleBar/TitleBar"
  import LazyLoadingMore from 'components/LazyLoadingMore/LazyLoadingMore';
  import geturlpara from 'common/js/geturlpara.js';
  import AjaxServer from 'common/js/ajaxServer.js';
  import {Loading} from 'vux'
  import Failed from "components/Failed/Failed"
  import Vue from 'vue'
  import VueResource from 'vue-resource'
  import {formatedDate} from 'common/js/date.js';
  import { Group,Cell,querystring,cookie} from 'vux'
  Vue.use(VueResource)
  Vue.prototype.$geturlpara=geturlpara
  export default {
    data () {
      return {
        id:0,
        loadingshow: true,
        loadtext: 'loading...',
        showContent:false,
        failedshow:false,
        failedmsg:"服务请求失败，请刷新重试",
        dataInfo:{},
      }
    },
    components: {
      LazyLoadingMore,
      TitleBar,
      Group,
      Cell,
      Loading,
      Failed
    },
    beforeCreate(){
      //授权
      getAuth(cookie,querystring);
    },
    created () {
    },
    mounted(){
      this.id = this.$geturlpara.getUrlKey("id");
      this.fetchData(this.id);
    },
    methods: {
      //获取专栏数据数据
      fetchData(){
        try {
          var mid = this.$geturlpara.getUrlKey("type");
        } catch (e) {
          var mid = 0;
        }
        if (mid=='mid') {
          var data={mid:this.id};
        }else{
          var data={pid:this.id};
        }
        var url=HOST+'/api/users/user_center2.json';
        AjaxServer.httpGet(Vue,url,data,this.fetchResult);
      },
      fetchResult(res){
        if (res.status==0) {
          this.dataInfo=res;
          this.loadingshow=false;
          this.showContent=true;
        }
        if(res.status==5){
          localStorage.clear();
          clearcookie(cookie);
          getAuth(cookie,querystring);
        }
      },
      toSkip(data){
        window.location.href="/m/"+data;
      },
      toChannelSmall(item){
        window.location.href="/m/channel-small.html?id="+item.id;
      },
      toChannel(item){
        window.location.href="/m/channel.html?id="+item.id;
      },
      toDetail(item){
        window.location.href="/m/detail.html?id="+item.id;
      },
      loadList(data){
        this.dataInfo.timeline.items=this.dataInfo.timeline.items.concat(data);
      }
    },
    filters: {
      formatDate:formatedDate
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
@import "../index/App.less";
body{
  background-color: #eee;
}
#moments{
  height: 100%;
  .content{
    margin-bottom: 50px;
    .author-info{
      .weui-cell__ft{
        width: 100%;
        text-align: left;
        padding-left: 15px;
        .p-1{
          color: #000;
          font-size: 12px;
          margin-top: -18px;
          line-height: 50px;
        }
        .p-2{
          font-size: 12px;
        }
      }
      img{
        width: 50px;
        height: 50px;
        border-radius: 3px;
        display: block;
      }
    }
    .author-timeline{
      .weui-cell__ft{
        width: 100%;
        text-align: left;
        padding-top: 5px;
        .p-1{
          color: #000;
          font-size: 12px;
          margin-top: -2px;
          line-height: 20px;
        }
        .p-2{
          font-size: 12px;
          span{
            margin-left: 10px;
          }
        }
      }
      .div{
        margin-left: 40px;
      }
      .heard-img{
        display: block;
        float: left;
        width: 30px;
        height: 30px;
        border-radius: 15px;
      }
      .comment{
        line-height: 20px;
        margin: 10px 0;
        color: #333;
        font-size: 12px;
      }
      .box{
        width: 100%;
        background: #eee;
        overflow: hidden;
        margin-top: 10px;
        height: 50px;
        position: relative;
        img{
          width: 50px;
          height: 50px;
          overflow: hidden;
          display: block;
          float: left;
        }
        .cankao{
          width: 0px;
          background: #f00;
          height: 100%;
          vertical-align:middle;
          display: inline-block;
        }
        .text{
          // position: absolute;
          // top: 50%;
          // margin-top: -25px;
          font-size: 12px;
          margin-left: 5px;
          display: inline-block;
          width: 5.2rem;
        }
      }
    }
  }
  .profile{
    height: 4.24rem;
    width: 100%;
    text-align: center;
    background: url(http://image.51xy8.com/1505881780454.png);
    background-size: 100% auto;
    overflow: hidden;
    position: relative;
    .privilege{
      color: #eee;
      font-size: 14px;
      position: absolute;
      top: 10px;
      left: 20px;
      line-height: 18px;
      .mark{
        float: left;
        width: 18px;
      }
    }
    .headimg{
      position: relative;
      width: 70px;
      height: 70px;
      margin-bottom: 10px;
      margin:1.4rem auto;
      .head{
        width: 70px;
        height: 70px;
        border-radius: 35px;
      }
      .level{
        width: 20px;
        height: 20px;
        position: absolute;
        right: 0px;
        bottom: 0px;
      }
      p{
        font-size: 14px;
      }
    }
    p{
      color: #666;
      font-size: 18px;
      margin-top: 10px;
    }
  }
  .weui-cells{
    margin-top: 0;
  }
}
</style>
