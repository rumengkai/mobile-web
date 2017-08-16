<template>
  <div id="titlebar">
    <div class="con">
      <img class="img" src="./images/icon_title.png" alt=".">
      <span v-html="title"></span>
      <span v-html="more" class="more" v-if="more" @click="toskip"></span>
      <span class="nstep" v-if="more"></span>
    </div>
    <div class="line vux-1px-b" v-if="line"></div>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: 'titlebar',
    props: {
      title:String,
      more:String,
      url:String,
      line:String
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
      toskip () {
        window.location.href=this.url;
      }
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
#titlebar{
  .line{
    width: 93%;
    margin: auto;
  }
  .con{
    box-sizing: border-box;
    background: #fff;
    margin-top: .32rem;
    height: .8rem;
    padding: .2rem;
    position: relative;
    .img{
      display: inline-block;
      width: .60rem;
      float: left;
    }
    span{
      float: left;
      font-size: 14px;
      line-height: .5rem;
      margin-left: 8px;
    }
    .more{
      float: right;
      color: #9e9e9e;
      font-weight: 100;
      margin-right: 20px;
      font-size: 12px;
    }
    .nstep{
      margin-right: 15px;
    }
  }
}
</style>
