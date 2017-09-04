<template>
  <div id="coupons-explain">
    <div class="content" v-html="content">
    </div>
  </div>
</template>

<script>
  import 'common/css/reset.css';
  import 'common/js/config.js';
  import AjaxServer from 'common/js/ajaxServer.js';
  import Vue from 'vue'
  export default {
    name: 'app-download',
    data () {
      return {
        content:'<p style=\"white-space: normal; line-height: 2em;\"><span style=\"font-family: 微软雅黑; color: rgb(227, 108, 9);\"><strong><span style=\"line-height: inherit;\">1.什么是优惠券？</span></strong></span><span style=\"font-family: 微软雅黑;\"><strong><span style=\"line-height: inherit; color: rgb(51, 51, 51);\"></span></strong><span style=\"line-height: inherit; color: rgb(51, 51, 51);\"><br/></span></span></p><p style=\"white-space: normal; line-height: 2em;\"><span style=\"color: rgb(51, 51, 51); font-family: 微软雅黑;\">优惠券是功夫财经发行和认可的购物抵用券，可以在功夫财经购买商品或付费订阅内容时使用，使用时可抵扣对应金额或享受对应折扣。</span></p><p style=\"white-space: normal; line-height: 2em;\"><span style=\"color: rgb(227, 108, 9);\"><strong><span style=\"font-family: 微软雅黑;\">2.如何获得优惠券？</span></strong></span></p><p style=\"white-space: normal; line-height: 2em;\"><span style=\"color: rgb(51, 51, 51); font-family: 微软雅黑;\">功夫财经客户端与公众号会不定期推出优惠券领取活动，参与活动即可免费领取。</span></p><p style=\"white-space: normal; line-height: 2em;\"><span style=\"color: rgb(227, 108, 9);\"><strong><span style=\"line-height: inherit; font-family: 微软雅黑;\">3.如何使用优惠券？</span></strong></span></p><p style=\"white-space: normal; line-height: 2em;\"><span style=\"color: rgb(51, 51, 51); font-family: 微软雅黑;\">在购买商品或订阅付费内容时，系统会自动为您选择可使用的优惠券，您也可以手动更换优惠券或选择暂时不使用优惠券。</span></p><p style=\"white-space: normal; line-height: 2em;\"><strong><span style=\"line-height: inherit; font-family: 微软雅黑; color: rgb(227, 108, 9);\">4.优惠券可找零或兑现么？</span></strong></p><p style=\"white-space: normal; line-height: 2em;\"><span style=\"color: rgb(51, 51, 51); font-family: 微软雅黑;\">优惠券不支持找零或兑换现金。</span></p><p style=\"white-space: normal; line-height: 2em;\"><strong><span style=\"line-height: inherit; font-family: 微软雅黑; color: rgb(227, 108, 9);\">5.如您有任何疑问请联系我们</span></strong><span style=\"line-height: inherit; color: rgb(51, 51, 51); font-family: 微软雅黑;\">：400-966-7718</span></p>'
      }
    },
    components: {
    },
    created () {
      this.fetchData();
    },
    methods: {
      fetchData(id){
        AjaxServer.httpGet(
          Vue,
          HOST+'/api/coupons/intro.json',
          {},
          (data)=>{
            if (data.status==0) {
              this.content=data.content;
            }
          }),
          (err)=>{
            console.log(err);
          }
      },
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
body{
  text-align:justify;
  margin:0;
  font-family:'微软雅黑'
}
#coupons-explain{
  .content{
    padding:0 20px;
    box-sizing: border-box;
    text-align:justify;
    width:100%;
    margin-top:20px;
    font-size: 16px;
  }
}

</style>
