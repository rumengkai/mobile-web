<template>
  <div id="books-my">
    <div v-if="contentshow">
      <div class="mybookshelf">
        <div class="bookshelf">
          <li v-for="(item,index) in dataInfo.items" @click="toDetail(item)" :key="index">
            <div class="box">
              <img :src="item.thumb">
              <p class="ell-2">{{item.name}}</p>
            </div>
          </li>
        </div>
      </div>
    </div>
    <loading v-model="loadingshow" :text="loadtext"></loading>
  </div>
</template>

<script>
  import 'common/js/config.js';
  import { getMyBooks } from 'src/api/books';
  import { isWeiXin } from 'common/js/common.js';
  import BooksList from "components/Books/BooksList"
  import LazyLoadingMore from "components/LazyLoadingMore/LazyLoadingMore"
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
      Icon,
      XHeader,
      Loading,
      BooksList
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
        getMyBooks().then(response => {
          this.loadingshow = false
          this.fetchResult(response)
        })
      },
      fetchResult(res){
        console.log(res);
        if (res.status==0) {
          this.dataInfo=res;
          this.contentshow=true;
        }
      },
      skip(name){
        window.location.href="/m/"+name;
      },
      toDetail(data){
        if (data.article_id&&data.article_id>0) {
          window.location.href="/m/detail.html"+data.article_id;
        }else{
          window.location.href="/m/book-detail.html?id="+data.id;
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
