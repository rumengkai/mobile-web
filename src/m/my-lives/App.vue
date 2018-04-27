<template>
  <div id="my-lives">
    <div v-if="showContent" class="content vux-1px-t vux-1px-b">
			<div v-for="(item,index) in dataInfo.items" :key="index">
				<live-item :liveItem="item"></live-item>
			</div>
    </div>
		<div class="load">
			<LazyLoadingMore url="/api/live/my.json" v-on:getData="loadList" params="items"></LazyLoadingMore>
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
  import LiveItem from 'components/LiveItem/LiveItem'
  import LazyLoadingMore from "components/LazyLoadingMore/LazyLoadingMore"
  import Failed from "components/Failed/Failed"
  import Vue from 'vue'
  import VueResource from 'vue-resource'
  import { Loading,XHeader,Icon,Scroller,AlertPlugin,querystring,cookie} from 'vux'
  Vue.use(AlertPlugin)
  Vue.use(VueResource)
  Vue.prototype.$geturlpara=geturlpara

  export default {
    name: 'my-lives',
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
			LiveItem
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
        var url=HOST+'/api/live/my';
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
