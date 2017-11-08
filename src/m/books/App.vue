<template>
  <div id="books">
    <div v-if="show_content">

    </div>
    <tab-bar active="books"></tab-bar>
    <loading v-model="loadingshow" :text="loadtext"></loading>
  </div>
</template>

<script>
  import 'common/js/config.js';
  import { getBooks } from 'src/api/books';
  import { isWeiXin } from 'common/js/common.js';
  import TabBar from "components/TabBar/TabBar"
  import TitleBar from "components/TitleBar/TitleBar"
  import LazyLoadingMore from "components/LazyLoadingMore/LazyLoadingMore"
  import Vue from 'vue'
  import {Loading,XHeader,Icon,Scroller,AlertPlugin,querystring,cookie} from 'vux'
  Vue.use(AlertPlugin)
  export default {
    data () {
      return {
        sc:false,
        loading_show: true,
        loadtext: 'loading...',
        show_content:false,
        data_info:{small_channels:{items:[]}},
      }
    },
    components: {
      Icon,
      XHeader,
      Loading,
      TabBar,
      TitleBar,
      LazyLoadingMore,
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
      //获取数据
      fetchData(){
        getBooks().then(response => {
          this.loadingshow = false
          this.fetchResult(response)
        })
      },
      fetchResult(res){
        if (res.status==0) {
          this.showContent=true;
          self.dataInfo=res;
        }
      }
    }
  }
</script>
<style lang="less">
@import '../../common/css/reset.css';
@import '~vux/src/styles/1px.less';
@import "../index/App.less";
@import './App.less';
</style>
