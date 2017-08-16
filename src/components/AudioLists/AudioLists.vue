<template>
  <div id="audiolist">
    <ul>
      <li v-for="item in audiolist" class="vux-1px-t vux-1px-b" @click="todetail(item.item)">
        <div class="left">
          <img class="play" src="./images/play.png" alt="播放">
          <img class="bg" :src="item.picture" alt="picture" onerror='this.src="http://m.kofuf.com/static/img/default.png"'>
        </div>
        <div class="right">
          <p v-html="item.title"></p>
          <p class="author" v-html="item.author_name"></p>
          <p><span>{{item.postd | formatDate}}</span><span class="view_count">{{item.view_count}}听过</span></p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {formatedDate} from 'common/js/date.js';
  export default {
    name: 'audiolist',
    props: {
      audiolist:Array
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
#audiolist{
  height: auto;
  background: #efeff4;
  ul{
    height: auto;
    overflow: hidden;
    li{
      background: #fff;
      margin-top: 20px;
      padding: .2rem 10px;
      box-sizing: border-box;
      height: auto;
      overflow: hidden;
      .left{
        width: 44px;
        height: auto;
        position: relative;
        float: left;
        .bg{
          display: block;
          width: 44px;
          height: 44px;
          border-radius: 22px;
        }
        .play{
          width: 28px;
          height: 28px;
          display: block;
          position: absolute;
          left: 50%;
          margin-left: -12px;
          top:50%;
          margin-top: -11px;
        }
      }
      .right{
        margin-left: 62px;
        width: auto;
        height: auto;
        p{
          white-space:nowrap;
          overflow: hidden;
          text-overflow:ellipsis;
          line-height: 20px;
          color: #555;
          font-size: 14px;
          font-weight: 100px;
        }
        .author{
          font-size: 12px;
          color: #ccc;
          line-height: 14px;
        }
        span{
          font-size: 12px;
          color: #ccc;
        }
        .view_count{
          float: right;
        }
      }
    }
  }
}
</style>
