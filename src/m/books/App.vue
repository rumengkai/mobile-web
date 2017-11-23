<template>
  <div id="books">
    <div v-if="contentshow">
      <!-- 我的书架 -->
      <div class="mybookshelf" v-if="dataInfo.bookshelf.items.length>0">
        <title-bar :title="dataInfo.bookshelf.name" v-if="dataInfo.bookshelf.update_count" :more='dataInfo.bookshelf.update_count+"本书更新"' color="red" :img="dataInfo.bookshelf.image" line="line" url="/m/books-my.html"></title-bar>
        <title-bar :title="dataInfo.bookshelf.name" v-else more='更多' :img="dataInfo.bookshelf.image" line="line" url="/m/books-my.html"></title-bar>
        <div class="bookshelf vux-1px-b">
          <li v-for="(item,index) in dataInfo.bookshelf.items" v-if="index<3" @click="skip('book-detail.html?id='+item.id)" :key="index">
            <img :src="item.thumb">
          </li>
        </div>
      </div>
      <!-- 学者书单 -->
      <title-bar :title="dataInfo.teacher_booklist.name" more="更多" :img="dataInfo.teacher_booklist.image" url="books-list-teacher.html"></title-bar>
      <books-list-teacher :dataList="dataInfo.teacher_booklist.items"></books-list-teacher>
      <!-- 书单 -->
      <title-bar :title="dataInfo.booklist.name" more="" :img="dataInfo.booklist.image" url=""></title-bar>
      <books-list :dataList="dataInfo.booklist.items"></books-list>
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
  import BooksList from "components/Books/BooksList"
  import BooksListTeacher from "components/Books/BooksListTeacher"
  import TitleBar from "components/TitleBar/TitleBar"
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
      TabBar,
      TitleBar,
      LazyLoadingMore,
      BooksList,
      BooksListTeacher
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
        console.log(res);
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
