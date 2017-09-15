<template>
  <div id="banner" class="vux-1px-t">
    <swiper :list="bannerlist" v-model="demo01_index" height="2.9rem" @on-index-change="bannerChange" loop auto></swiper>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Swiper } from 'vux'
  export default {
    name: 'banner',
    props: {
      bannerlist:Array
    },
    data () {
      return {
      }
    },
    components: {
      swiper:Swiper
    },
    mounted(){
      this.bannerlist.map((item)=>{
        item.img=item.image;
      })
    },
    methods: {
      bannerChange:function () {
      },
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
#banner{

}
</style>
