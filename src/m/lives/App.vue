<template>
  <div id="lives">
    <div v-if="showContent" class="content vux-1px-t">
			<lives-item :datalist="dataInfo.items"></lives-item>
			<div class="load">
        <LazyLoadingMore url="/api/live/list.json" v-on:getData="loadList" params="items"></LazyLoadingMore>
      </div>
    </div>
    <Failed v-if="failedshow" :msg="failedmsg"></Failed>
    <Loading v-model="loadingshow" :text="loadtext"></Loading>
  </div>
</template>

<script>
  import 'common/css/reset.css';
  import 'common/js/config.js';
	import {isWeiXin,weixinShare} from 'common/js/common.js';
	import {
    shareData
  } from 'src/common/js/assembly';
  import AjaxServer from 'common/js/ajaxServer.js';
  import geturlpara from 'common/js/geturlpara.js';
  import LivesItem from 'components/LivesItem/LivesItem'
  import LazyLoadingMore from "components/LazyLoadingMore/LazyLoadingMore"
  import Failed from "components/Failed/Failed"
  import Vue from 'vue'
  import VueResource from 'vue-resource'
  import { Loading,XHeader,Icon,Scroller,AlertPlugin,querystring,cookie} from 'vux'
  Vue.use(AlertPlugin)
  Vue.use(VueResource)
  Vue.prototype.$geturlpara=geturlpara

  export default {
    name: 'lives',
    data () {
      return {
        sc:false,
        loadingshow: true,
        loadtext: 'loading...',
        showContent:false,
        failedshow:false,
        failedmsg:"服务请求失败，请刷新重试",
        dataInfo:{},
      }
    },
    components: {
      Icon,
			Loading,
			LazyLoadingMore,
			LivesItem
    },
    beforeCreate(){
      //授权
      if(isWeiXin()){
        getAuth(cookie,querystring);
      }
    },
    created () {
			this.fetchData();
			shareData()
			weixinShare()
    },
    methods: {
      //获取首页数据
      fetchData(){
        var url=HOST+'/api/live/list';
        var data={};
        AjaxServer.httpGet(Vue,url,data,this.fetchResult);
      },
      fetchResult(res){
        var self=this;
        if (res.status==0) {
          this.loadingshow=false;
          this.showContent=true;
          self.dataInfo=res;
        }
        setTimeout(()=>{
          self.loadingshow=false;
        },10000);
      },
      toChannel(id){
        window.location.href="/m/channel.html?id="+id;
      },
      loadList(data){
        this.dataInfo.items=this.dataInfo.items.concat(data);
      }
    }
  }
</script>
<style lang="less">
@import '~vux/src/styles/1px.less';
@import "../index/App.less";
@import './App.less';
</style>
