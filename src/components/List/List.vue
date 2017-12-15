<template>
  <!-- 评论加载更多，btn -->
  <div id="list">
   <li v-for="item in datalist" @click="toDetail(item.id)">
     <div class="title">
       {{item.name}}
     </div>
     <div class="img vux-1px-b">
       <img :src="item.thumb" alt="" onerror="this.src='http://image.51xy8.com/1493739178223.jpg?imageView2/1/w/200/h/133/q/100|imageslim'">
       <div class="hint" v-show="freeshow">
         试读
       </div>
     </div>
     <span class="date">{{item.published|formatDate}}</span>
     <!-- <span class="view"><img src="./images/read.png" alt="">{{item.view_count}} 人看过</span> -->
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
      freeshow:Boolean,
      datalist:Array
    },
    components: {

    },
    created () {
    },
    methods: {
      toDetail(id){
        location.href="/m/detail.html?id="+id;
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
    height: 4.9rem;
    width: auto;
    background-color: #fff;
    box-shadow: 0 2px 2px #eee;
    margin-bottom: 14px;
    padding: .3rem 15px .2rem;
    .title{
      font-size: 16px;
      font-weight: 500;
      color: #404040;
      line-height: .4rem;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    .img{
      padding: 15px 0;
      height: 3.3rem;
      position: relative;
      .hint{
        position: absolute;
        width: 44px;
        height: 23px;
        background-color: #02a4ec;
        color: #fff;
        right: 0;
        top: 37px;
        line-height: 23px;
        z-index: 100;
        box-shadow: 0 1px 2px #333;
      }
      img{
        display: block;
        border-radius: 2px;
        width: 100%;
        height: 100%;
      }
    }
    .date{
      float: left;
      line-height:.76rem;
      color:#cbcbcb;
      font-weight: 400;
    }
    .view{
      float: right;
      line-height:.76rem;
      color:#cbcbcb;
      font-weight: 400;
      overflow: hidden;
      img{
        vertical-align:middle;
        margin-right: 10px;
        margin-top: -.08rem;
        width: 20px;

      }
    }
  }
}
</style>
