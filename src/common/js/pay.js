export function toPay(data,success,self){
  console.log("发起微信支付");
  if (typeof WeixinJSBridge == "undefined") {
    if( document.addEventListener ){
      document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    }else if (document.attachEvent){
      document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
      document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
    }
    self.$vux.alert.show({
      title: '提示',
      content: "请在微信中打开",
      dialogTransition:"",
      maskTransition:"",
      onShow () {},
      onHide () {}
    })
    self.disable=true;
  }else{
    onBridgeReady(data,success,self);
  }
}
function onBridgeReady(data,success,self){
  // alert(JSON.stringify(data));
  WeixinJSBridge.invoke(
    'getBrandWCPayRequest', {
      "appId":data.app_id,     //公众号名称，由商户传入
      "timeStamp":data.timestamp,        //时间戳，自1970年以来的秒数
      "nonceStr":data.nonce_str, //随机串
      "package":"prepay_id="+data.prepay_id,
      "signType":"MD5",         //微信签名方式：
      "paySign":data.sign //微信签名
    },
    function(res){
      // alert(JSON.stringify(res))
      console.log(res);
      if(res.err_msg == "get_brand_wcpay_request:ok" ) {
        success(data);
      }else{
        alert("支付取消");
        self.disable=true;
      }    // 使用以上方式判断前端返回
    }
  );
}
