<template>
  <div id="backhome">
    <div class="btn" @click="tohome">
      <span class="img"><img src="./images/icon_home.png" alt=""></span>
      <span class="back">回到首页</span>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: 'backhome',
    props: {
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
      tohome () {
        window.location.href="/m/home.html";
      }
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
#backhome{
  .btn{
    position: fixed;
    bottom: 2rem;
    right: 0;
    border-top-left-radius: .25rem;
    border-bottom-left-radius: .25rem;
    width: 1.6rem;
    height: .5rem;
    background: rgba(0,0,0,0.4);
    overflow: hidden;
    span{
      float: left;
      display: block;
    }
    .img{
      padding: .11rem;
      overflow: hidden;
      img{
        display: inline-block;
        width: .3rem;
        height: .3rem;
      }
    }
    .back{
      line-height: .5rem;
      color: #fff;
      font-size: 12px;;
    }
  }
}
</style>
