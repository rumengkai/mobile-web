<template>
  <div id="articles">
    <ul>
      <li v-for="item in articlelist" class="vux-1px-b" @click="todetail(item.item)" key="index">
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
    li{
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
