<template>
  <div id="wx-gftv">
    <div class="content position-relative" v-if="contentshow">
      <img class="tv-img" src="http://image.51xy8.com/1512558174623.png"/>
      <img class="bottom-img" src="http://image.51xy8.com/1512558314601.png"/>
      <div class="tv-section">
        <div class="tv-item" v-for="(item, index) in links" :key="index" v-on:click="linkIndex(item.linkurl)">
          <img class="tv-top" :src="item.imgurl"/>
          <img class="tv-bottom" :src="item.txturl"/>
        </div>
      </div>
    </div>
  </div>
    <!-- <loading v-model="loadingshow" :text="loadtext"></loading> -->
</template>

<script>
  import 'common/js/config.js';
  import { isWeiXin ,weixinShare} from 'common/js/common.js';
  import Vue from 'vue'
  import { message ,shareData} from 'common/js/assembly'
  export default {
    data () {
      return {
        sc: false,
        loadingshow: false,
        loadtext: '加载中...',
        contentshow: true,
        defaultimg: 'http://image.51xy8.com/1496311047717.jpg',
        links:[
          {
            imgurl: "http://image.51xy8.com/1512554461616.png",
            txturl: "http://image.51xy8.com/1512554483479.png",
            linkurl: "http://mp.weixin.qq.com/mp/homepage?__biz=MzIzOTA3NTA5Mg==&hid=21&sn=23d96eb339a0f818f4355abed7c67cbd#wechat_redirect"
          },
          {
            imgurl: "http://image.51xy8.com/1512557101893.png",
            txturl: "http://image.51xy8.com/1512615504904.png",
            linkurl: "http://mp.weixin.qq.com/mp/homepage?__biz=MzIzOTA3NTA5Mg==&hid=19&sn=3c57875e9429a10fc7fad8313c63af34#wechat_redirect"
          },
          {
            imgurl: "http://image.51xy8.com/1512557053860.png",
            txturl: "http://image.51xy8.com/1512557082574.png",
            linkurl: "http://mp.weixin.qq.com/mp/homepage?__biz=MzIzOTA3NTA5Mg==&hid=16&sn=8b73deac498df522b4033ffc49b356a5#wechat_redirect"
          }
        ]
      }
    },
    components: {
    },
    beforeCreate(){
      //授权
      if(!isWeiXin()){
        message("请关注'功夫财经'公众号")
      }
    },
    created () {
      shareData("功夫TV",location.href)
      weixinShare();
    },
    methods: {
      linkIndex: function (linkurl) {
        window.location.href = linkurl
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
