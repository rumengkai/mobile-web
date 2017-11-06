<template>
  <div id="articles">
    <ul>
      <li class="vux-1px-b" v-bind:class="{ large: item.view_mode=='L', small: item.view_mode=='T' }" v-for="item in articlelist" @click="todetail(item.item)" key="index">
        <div v-if="item.picture" class="thumb">
          <img :src="item.picture" alt="picture" onerror="this.src='http://m.kofuf.com/static/img/default.png'">
        </div>
        <div v-else class="thumb">
          <img :src="item.thumb" alt="picture" onerror="this.src='http://m.kofuf.com/static/img/default.png'">
        </div>
        <p class="title" v-html="item.item_name"></p>
        <div class="author">
          <img class="author_pic" :src="item.author_pic" alt="">
          <span v-html="item.author_name"></span>
          <span class="data">{{item.postd | formatDate}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {formatedDate} from 'common/js/date.js';
  export default {
    name: 'articles',
    props: {
      articlelist:Array
    },
    data () {
      return {
      }
    },
    components: {
    },
    mounted(){
    },
    methods: {
      todetail(id){
        window.location.href="/m/detail.html?id="+id;
      }
    },
    filters: {
      formatDate:formatedDate
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
#articles{
  background: #fff;
  padding: 0 4%;
  height: auto;
  ul{
    .small{
      overflow: hidden;
      position: relative;
      // color: #f00;
      height: 2.4rem;
      .thumb{
        float: right;
        margin-top: .33rem;
        img{
          border-radius: 3px;
          width: 2.5rem;
          height: 1.73rem;
        }
      }
      .title{
        margin: 16px 0;
        font-size: 13px;
        overflow : hidden;
        // text-overflow: ellipsis;
        // display: -webkit-box;
        // -webkit-line-clamp: 2;
        // -webkit-box-orient: vertical;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-height:1.25em;
        height:2.4em;
      }
      // .title:after{
      //   content:"...";
      //   position:absolute;
      //   bottom:0;
      //   right:0;
      //   padding: 0 5px;
      //   background-color: #fff;
      // }
      .author{
        display: flex;
        flex-direction: row;
        align-items: center;
        position: absolute;
        bottom: .27rem;
        width: 4.2rem;
        .author_pic{
          margin-right: 5px;
          width: 20px;
          height: 20px;
          border-radius: 10px;
        }
        .data{
          float: right;
          right: 0;
          position: absolute;
          margin-left: 10px;
          font-size: 12px;
          transform: scale(0.9);
          color: #999;
        }
      }
    }
    .large{
      overflow: hidden;
      padding: .2rem 0;
      height: auto;
      box-sizing: border-box;
      .thumb{
        img{
          border-radius: 3px;
          width: 100%;
          height: 3.1rem;
        }
      }
      .title{
        margin: 10px 0;
        line-height: 16px;
        font-size: 14px;
      }
      .author{
        display: flex;
        flex-direction: row;
        align-items: center;
        .author_pic{
          margin-right: 5px;
          width: 20px;
          height: 20px;
          border-radius: 10px;
        }
        .data{
          margin-left: 10px;
          font-size: 12px;
          transform: scale(0.9);
          color: #999;
        }
      }
    }
  }
}
</style>
