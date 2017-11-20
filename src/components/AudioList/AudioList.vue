<template>
  <div id="audiolist">
    <ul>
      <li v-for="item in audiolist" class="vux-1px-t" @click="todetail(item.item)">
        <div class="left">
          <img class="play" src="./images/play.png" alt="播放">
          <img class="bg" :src="item.picture" alt="picture" onerror='this.src="http://m.51xy8.com/static/img/default.png"'>
        </div>
        <div class="right">
          <p v-html="item.title"></p>
          <p class="author" v-html="item.author_name"></p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
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
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
#audiolist{
  background: #fff;
  padding: 0 4%;
  height: auto;
  ul{
    height: auto;
    margin-bottom: -1px;
    overflow: hidden;
    li{
      padding: .2rem 0;
      box-sizing: border-box;
      height: 64px;
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
          line-height: 28px;
          color: #555;
          font-size: 14px;
          font-weight: 100px;
        }
        .author{
          font-size: 12px;
          color: #ccc;
          line-height: 14px;
        }
      }
    }
  }
}
</style>
