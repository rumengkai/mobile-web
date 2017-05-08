<template>
  <!-- 评论加载更多，btn -->
  <div id="list">
   <li v-for="item in datalist" @click="toDetail(item.id)">
     <div class="title">
       {{item.name}}
     </div>
     <div class="img vux-1px-b">
       <img :src="item.thumb" alt="" onerror="this.src='http://static0.kofuf.com/1493739178223.jpg?imageView2/1/w/200/h/133/q/100|imageslim'">
     </div>
     <span class="date">{{item.published|formatDate}}</span>
     <span class="view"><img src="./images/read.png" alt="">{{item.view_count}} 人看过</span>
   </li>
  </div>
</template>

<script>
import {formatedDate} from 'common/js/date.js';
  export default {
    name: 'list',
    data () {
      return {
      }
    },
    props: {
      datalist:Array
    },
    components: {

    },
    created () {
    },

    methods: {
      toDetail(id){
        location.href="detail.html?id="+id;
      }
    },
    filters: {
      formatDate:formatedDate
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
#list{
  background-color: #f3f3f3;
  li{
    height: 245px;
    width: auto;
    background-color: #fff;
    box-shadow: 0 2px 2px #eee;
    margin-bottom: 14px;
    padding: 15px 15px 10px;
    .title{
      font-size: 14px;
      font-weight: 500;
      color: #404040;
      line-height: 20px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    .img{
      padding: 15px 0;
      height: 165px;
      img{
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .date{
      float: left;
      line-height:38px;
      color:#cbcbcb;
      font-weight: 100;
    }
    .view{
      float: right;
      line-height:38px;
      color:#cbcbcb;
      font-weight: 100;
      overflow: hidden;
      img{
        vertical-align:middle;
        margin-right: 10px;
        margin-top: -4px;
        width: 20px;
      }
    }
  }
}
</style>
