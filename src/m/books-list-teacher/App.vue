<template>
  <div id="books-list-teacher">
    <div v-if="contentshow">
      <!-- 学者书单 -->
      <books-list-teacher :dataList="dataInfo.items"></books-list-teacher>
    </div>
    <back-home></back-home>
    <loading v-model="loadingshow" :text="loadtext"></loading>
  </div>
</template>

<script>
  import 'common/js/config.js';
  import { getTeacherBooklists } from 'src/api/books';
  import { isWeiXin } from 'common/js/common.js';
  import BooksListTeacher from "components/Books/BooksListTeacher"
  import LazyLoadingMore from "components/LazyLoadingMore/LazyLoadingMore"
  import BackHome from "components/BackHome/BackHome"
  import Vue from 'vue'
  import {Loading,XHeader,Icon,Scroller,AlertPlugin,querystring,cookie} from 'vux'
  Vue.use(AlertPlugin)
  export default {
    data () {
      return {
        sc:false,
        loadingshow: true,
        loadtext: '加载中...',
        contentshow:false,
        dataInfo:{},
      }
    },
    components: {
      BackHome,
      Icon,
      XHeader,
      Loading,
      LazyLoadingMore,
      BooksListTeacher
    },
    beforeCreate(){
      //授权
      if(isWeiXin()){
        getAuth(cookie,querystring,'books-list-teacher.html');
      }
    },
    created () {
      this.fetchData();
    },
    methods: {
      //获取数据
      fetchData(){
        getTeacherBooklists().then(response => {
          this.loadingshow = false
          this.fetchResult(response)
        })
      },
      fetchResult(res){
        if (res.status==0) {
          this.dataInfo=res;
          this.contentshow=true;
        }
      },
      skip(name){
        window.location.href="/m/"+name;
      },
      loadList(data){
        this.dataInfo.booklist.items=this.dataInfo.booklist.items.concat(data);
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
