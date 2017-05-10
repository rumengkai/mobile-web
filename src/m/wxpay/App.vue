<template>
  <div id="wxpay">
    <div class='sub' @click="createOrder ">李大霄 订阅：1<span>¥／年</span> id:300</div>
  </div>
</template>

<script>
import AjaxServer from 'common/js/ajaxServer.js';
import {toPay} from 'common/js/pay.js';
import Vue from 'vue'
import VueResource from 'vue-resource'
import { WechatPlugin } from 'vux'
Vue.use(WechatPlugin)
Vue.use(VueResource)
export default {
  name: 'wxpay',
  data () {
    return {
      orderInfo:'',
    }
  },
  components: {

  },
  created () {

  },

  methods: {
    //创建订单
    createOrder(){
      var self=this;
      if (localStorage.getItem("gid")) {
        //发起订单请求
        AjaxServer.httpPost(
          Vue,
          HOST+"/pay/weixin/create_order",
          {
            type: "JSAPI",
            items: "300"
          },
          (data)=>{
            console.log("订单创建成功");
            self.orderInfo=data;
            toPay(data);
          },
          (err)=>{
            console.log(err);
            console.log("订单创建失败");
          }
        );
      }
    },
    // //发起微信支付
    // toPay(data){
    //   console.log("发起微信支付");
    //   if (typeof WeixinJSBridge == "undefined") {
    //     if( document.addEventListener ){
    //         document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
    //     }else if (document.attachEvent){
    //         document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady);
    //         document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
    //     }
    //   }else{
    //     this.onBridgeReady(data);
    //   }
    // },
    // onBridgeReady(data){
    //   alert(JSON.stringify(data));
    //   WeixinJSBridge.invoke(
    //     'getBrandWCPayRequest', {
    //       "appId":data.app_id,     //公众号名称，由商户传入
    //       "timeStamp":data.timestamp,         //时间戳，自1970年以来的秒数
    //       "nonceStr":data.nonce_str, //随机串
    //       "package":"prepay_id="+data.prepay_id,
    //       "signType":"MD5",         //微信签名方式：
    //       "paySign":data.sign //微信签名
    //     },
    //     function(res){
    //       alert(res)
    //       alert(JSON.stringify(res))
    //       console.log(res);
    //       alert(res.err_msg);
    //       if(res.err_msg == "get_brand_wcpay_request:ok" ) {
    //         alert("支付成功");
    //       }else{
    //         alert("由于其他原因，支付失败");
    //       }    // 使用以上方式判断前端返回
    //     }
    //   );
    // }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
body{
  text-align:center;
  margin:0;
  font-family:'微软雅黑'
}
#wxpay{
  .sub{
    background-color: #f2cd4b;
    padding: 10px;
    color: #fff;
    position: fixed;
    bottom: 0;
    font-weight: 500;
    width: 100%;
    font-size: 20px;
  }
}
</style>
