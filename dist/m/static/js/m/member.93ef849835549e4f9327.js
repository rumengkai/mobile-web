webpackJsonp([18,0],{0:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}var o=n(1),a=i(o),s=n(471),r=i(s),l=n(10),c=i(l);a.default.use(c.default),new a.default({el:"#member",template:"<App/>",components:{App:r.default}})},2:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={ajaxPost:function(t,e,n,i){$.ajax({url:t,type:"POST",data:e,success:function(t){n(t)},error:function(t){i(t)}})},ajaxGet:function(){},httpPost:function(t,e,n,i,o){t.http.options.emulateJSON=!0,t.http.options.headers={"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},t.http.interceptors.push(function(t,e){t.headers.set("from",config().from),t.headers.set("gid",config().gid),t.headers.set("token",config().token),t.headers.set("version",VERSION),e()}),t.http.post(e,n).then(function(t){return t.bodyText}).then(function(t){var t=JSON.parse(t);i(t)},function(t){o(t)})},httpGet:function(t,e,n,i,o){t.http.options.emulateJSON=!0,t.http.options.headers={"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},t.http.interceptors.push(function(t,e){t.headers.set("from",config().from),t.headers.set("gid",config().gid),t.headers.set("token",config().token),t.headers.set("version",VERSION),e()}),t.http.get(e,{params:n}).then(function(t){return t.bodyText}).then(function(t){var t=JSON.parse(t);i(t)},function(t){o(t)})}}},3:function(t,e){},4:function(t,e,n){"use strict";!function(){var t=document.documentElement.clientWidth||document.body.clientWidth;t=t>640?640:t;var e=t/750*100;e=e<50?e:50,document.documentElement.style.fontSize=e+"px",t<350?window.phonetype="small":window.phonetype="large"}(),window.base="pro","pro"==base?(window.VERSION="0.1",window.HOST="http://api.kofuf.com",window.HOSTM="http://m.kofuf.com",window.HOSTA="http://api.kofuf.com",window.appid="wx05e842991e5fa0b2",window.config=function(){return{paytype:"JSAPI",from:"3",gid:localStorage.getItem("gid"),token:localStorage.getItem("token")}}):(window.VERSION="0.1",window.HOST="http://123.57.35.40",window.HOSTM="http://123.57.35.40",window.HOSTA="http://dev.kofuf.com",window.appid="wx0a542ef9d4d41cef",window.config=function(){return{paytype:"JSAPI",from:"3",gid:localStorage.getItem("gid"),token:localStorage.getItem("token")}}),window.shareData={title:"功夫财经",link:HOSTM+"/m/home.html",imgUrl:"http://m.kofuf.com/static/img_h5/h5_logo.png",desc:"功夫财经致力于联动最出色的财经学者，提供最优质的原创内容，打造中国规模最大的、粘性最高的财富命运共同体，以新型金融服务平台为终极己任，解决中产焦虑，提升国民财商。 "};var i=n(31);i.attach(document.body),window.getAuthLink=function(t){return"https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri="+HOSTA+"%2Fapi%2Fsession%2Fauth_weixin&response_type=code&scope=snsapi_userinfo&state="+t+"#wechat_redirect"},window.getAuth=function(t,e,n,i){var o=t.get("gid"),a=e.parse();if(!localStorage.getItem("gid")||""==localStorage.getItem("gid"))if("undefined"!=typeof a.gid)localStorage.setItem("gid",a.gid),localStorage.setItem("token",a.token);else if("undefined"!=typeof o)localStorage.setItem("gid",t.get("gid")),localStorage.setItem("token",t.get("token"));else{var s;s=void 0!=i?n+"_"+i:n,s=s?s:"",window.location.href=getAuthLink(s)}},window.clearcookie=function(t){localStorage.clear(),t.set("gid",0,{domain:".kofuf.com",path:"/",expires:-1}),t.set("token",0,{domain:".kofuf.com",path:"/",expires:-1})}},5:function(t,e){"use strict";function n(){var t=window.navigator.userAgent.toLowerCase();return"micromessenger"==t.match(/MicroMessenger/i)}function i(){var t,e,n,i;return t=document.documentElement.scrollLeft||document.body.scrollLeft,e=document.documentElement.scrollTop||document.body.scrollTop,n=document.documentElement.clientWidth,i=document.documentElement.clientHeight,{left:t,top:e,width:n,height:i}}function o(){var t,e;return t=document.body.clientHeight,e=document.body.scrollTop,{top:e,height:t}}function a(t,e){var n=HOSTA+"/api/session/share_weixin_config?url="+encodeURIComponent(window.location.href.split("#")[0]);t.http.get(n).then(function(t){return t.bodyText}).then(function(t){var t=JSON.parse(t);wx.config({debug:!1,appId:t.appId,timestamp:t.timestamp,nonceStr:t.nonceStr,signature:t.signature,jsApiList:["checkJsApi","onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo"]})},function(t){error(t)}),wx.ready(function(){var t=shareData.title,e=shareData.link,n=shareData.imgUrl,i=shareData.desc;wx.onMenuShareTimeline({title:t,link:e,imgUrl:n,success:function(){},cancel:function(){}}),wx.onMenuShareAppMessage({title:t,desc:i,link:e,imgUrl:n,type:"link",success:function(){},cancel:function(){}}),wx.onMenuShareQZone({title:t,desc:i,link:e,imgUrl:n,success:function(){},cancel:function(){}}),wx.onMenuShareQQ({title:t,desc:i,link:e,imgUrl:n,success:function(){},cancel:function(){}})})}Object.defineProperty(e,"__esModule",{value:!0}),e.isWeiXin=n,e.getClient=i,e.getBody=o,e.weixinShare=a},6:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{value:{type:Boolean,default:!1},text:String,position:String},created:function(){this.show=this.value},data:function(){return{show:!1}},watch:{value:function(t){this.show=t},show:function(t){this.$emit("input",t)}}}},7:function(t,e){},8:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:"vux-mask"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"weui-loading_toast"},[n("div",{staticClass:"weui-mask_transparent"}),t._v(" "),n("div",{staticClass:"weui-toast",style:{position:t.position}},[n("i",{staticClass:"weui-loading weui-icon_toast"}),t._v(" "),n("p",{staticClass:"weui-toast__content"},[t._v(t._s(t.text||"加载中")),t._t("default")],2)])])])},staticRenderFns:[]}},9:function(t,e,n){var i,o;n(7),i=n(6);var a=n(8);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=i},11:function(t,e,n){var i,o;n(14);var a=n(16);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=i},12:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{title:String,titleColor:String,labelWidth:String,labelAlign:String,labelMarginRight:String,gutter:String}}},13:function(t,e){},14:function(t,e){},15:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.title?n("div",{staticClass:"weui-cells__title",style:{color:t.titleColor},domProps:{innerHTML:t._s(t.title)}}):t._e(),t._v(" "),n("div",{staticClass:"weui-cells",class:{"vux-no-group-title":!t.title},style:{marginTop:t.gutter}},[t._t("after-title"),t._v(" "),t._t("default")],2)])},staticRenderFns:[]}},16:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",{staticClass:"vux-label-desc"},[t._t("default")],2)},staticRenderFns:[]}},17:function(t,e,n){var i,o;n(13),i=n(12);var a=n(15);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=i},18:function(t,e,n){var i,o;n(23),i=n(19);var a=n(27);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=i},19:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(11),a=i(o),s=n(40),r=n(49),l=i(r);e.default={components:{InlineDesc:a.default},props:(0,l.default)(),computed:{valueClass:function(){return{"vux-cell-primary":"content"===this.primary||"left"===this.valueAlign,"vux-cell-align-left":"left"===this.valueAlign,"vux-cell-arrow-transition":!!this.arrowDirection,"vux-cell-arrow-up":"up"===this.arrowDirection,"vux-cell-arrow-down":"down"===this.arrowDirection}}},methods:{getLabelStyles:function(){return{width:this.$parent.labelWidth||this.$parent.$parent.labelWidth,textAlign:this.$parent.labelAlign||this.$parent.$parent.labelAlign,marginRight:this.$parent.labelMarginRight||this.$parent.$parent.labelMarginRight}},onClick:function(){(0,s.go)(this.link,this.$router)}}}},20:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{value:{type:Boolean,default:!1},maskTransition:{type:String,default:"vux-mask"},dialogTransition:{type:String,default:"vux-dialog"},hideOnBlur:Boolean,scroll:{type:Boolean,default:!0}},created:function(){"undefined"!=typeof this.value&&(this.currentValue=this.value)},watch:{value:{handler:function(t){this.currentValue=t},immediate:!0},currentValue:function(t){this.$emit(t?"on-show":"on-hide"),this.$emit("input",t)}},data:function(){return{currentValue:!1}},methods:{onTouchMove:function(t){!this.scroll&&t.preventDefault()}}}},22:function(t,e){},23:function(t,e){},26:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-x-dialog",on:{touchmove:t.onTouchMove}},[n("transition",{attrs:{name:t.maskTransition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.currentValue,expression:"currentValue"}],staticClass:"weui-mask",on:{click:function(e){t.hideOnBlur&&(t.currentValue=!1)}}})]),t._v(" "),n("transition",{attrs:{name:t.dialogTransition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.currentValue,expression:"currentValue"}],staticClass:"weui-dialog"},[t._t("default")],2)])],1)},staticRenderFns:[]}},27:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"weui-cell",class:{"vux-tap-active":t.isLink||!!t.link,"weui-cell_access":t.isLink||!!t.link,"vux-cell-no-border-intent":!t.borderIntent},on:{click:t.onClick}},[n("div",{staticClass:"weui-cell__hd"},[t._t("icon")],2),t._v(" "),n("div",{staticClass:"vux-cell-bd",class:{"vux-cell-primary":"title"===t.primary&&"left"!==t.valueAlign}},[n("p",[t.title?n("label",{staticClass:"vux-label",style:t.getLabelStyles()},[t._v(t._s(t.title))]):t._e(),t._v(" "),t._t("after-title")],2),t._v(" "),n("inline-desc",[t._t("inline-desc",[t._v(t._s(t.inlineDesc))])],2)],1),t._v(" "),n("div",{staticClass:"weui-cell__ft",class:t.valueClass},[t._t("value"),t._v(" "),t._t("default",[t._v(t._s(t.value))]),t._v(" "),t.isLoading?n("i",{staticClass:"weui-loading"}):t._e()],2),t._v(" "),t._t("child")],2)},staticRenderFns:[]}},29:function(t,e,n){var i,o;n(22),i=n(20);var a=n(26);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=i},32:function(t,e){},35:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(29),a=i(o);e.default={components:{XDialog:a.default},created:function(){"undefined"!=typeof this.value&&(this.showValue=this.value)},props:{value:Boolean,title:String,content:String,buttonText:String,maskTransition:{type:String,default:"vux-mask"},dialogTransition:{type:String,default:"vux-dialog"}},data:function(){return{showValue:!1}},methods:{_onHide:function(){this.showValue=!1}},watch:{value:function(t){this.showValue=t},showValue:function(t){this.$emit("input",t)}}}},36:function(t,e){},37:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-alert"},[n("x-dialog",{attrs:{"mask-transition":t.maskTransition,"dialog-transition":t.dialogTransition},on:{"on-hide":function(e){t.$emit("on-hide")},"on-show":function(e){t.$emit("on-show")}},model:{value:t.showValue,callback:function(e){t.showValue=e},expression:"showValue"}},[n("div",{staticClass:"weui-dialog__hd"},[n("strong",{staticClass:"weui-dialog__title"},[t._v(t._s(t.title))])]),t._v(" "),n("div",{staticClass:"weui-dialog__bd"},[t._t("default",[n("div",{domProps:{innerHTML:t._s(t.content)}})])],2),t._v(" "),n("div",{staticClass:"weui-dialog__ft"},[n("a",{staticClass:"weui-dialog__btn weui-dialog__btn_primary",attrs:{href:"javascript:;"},on:{click:t._onHide}},[t._v(t._s(t.buttonText||"确定"))])])])],1)},staticRenderFns:[]}},51:function(t,e,n){var i,o;n(36),i=n(35);var a=n(37);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=i},53:function(t,e){"use strict";function n(t,e,n){console.log("发起微信支付"),"undefined"==typeof WeixinJSBridge?(document.addEventListener?document.addEventListener("WeixinJSBridgeReady",i,!1):document.attachEvent&&(document.attachEvent("WeixinJSBridgeReady",i),document.attachEvent("onWeixinJSBridgeReady",i)),n.$vux.alert.show({title:"提示",content:"请在微信中打开",dialogTransition:"",maskTransition:"",onShow:function(){},onHide:function(){}}),n.disable=!0):i(t,e,n)}function i(t,e,n){WeixinJSBridge.invoke("getBrandWCPayRequest",{appId:t.app_id,timeStamp:t.timestamp,nonceStr:t.nonce_str,package:"prepay_id="+t.prepay_id,signType:"MD5",paySign:t.sign},function(i){console.log(i),"get_brand_wcpay_request:ok"==i.err_msg?e(t):"get_brand_wcpay_request:fail"==i.err_msg?(n.disable=!0,n.$vux.alert.show({title:"",content:"由于跨号支付，请关注'功夫财经'公众号'，下载APP购买",dialogTransition:"",maskTransition:""})):(n.disable=!0,n.$vux.alert.show({title:"",content:"支付取消",dialogTransition:"",maskTransition:""}))})}Object.defineProperty(e,"__esModule",{value:!0}),e.toPay=n},266:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),n(3),n(4);var o=n(2),a=i(o),s=n(5),r=n(53),l=n(17),c=i(l),u=n(18),d=i(u),f=n(9),p=i(f),h=n(50),v=i(h),m=n(38),g=i(m),_=n(39),w=i(_),y=n(1),x=i(y);x.default.use(v.default),e.default={name:"member",data:function(){return{id:0,dataInfo:{},showContent:!1,price:0,loadingshow:!0,loadtext:"加载中...",level_id:0}},components:{Group:c.default,Cell:d.default,Loading:p.default},created:function(){(0,s.isWeiXin)()&&(0,s.weixinShare)(x.default),this.fetchData()},methods:{fetchData:function(t){var e=this;a.default.httpGet(x.default,HOST+"/api/items/member",{},function(t){0==t.status&&(e.loadingshow=!1,e.showContent=!0,e.id=t.id,e.dataInfo=t,e.level_id=e.dataInfo.category_prices[0].id,e.price=e.dataInfo.category_prices[0].price)}),function(t){console.log(t)}},memberActive:function(t){this.price=t.price,this.level_id=t.id},toProfile:function(){window.location.href="/m/profile.html"},toCardActive:function(){window.location.href="/m/code-active.html"},buy:function(){var t=this,e=this;localStorage.getItem("gid")?(e.loadtext="加载中...",e.loadingshow=!0,a.default.httpPost(x.default,HOST+"/pay/weixin/create_order",{type:config().paytype,items:e.id+":"+this.level_id,order_type:""},function(n){e.loadingshow=!1,0!=n.status?t.$vux.alert.show({title:"提示",content:n.error,dialogTransition:"",maskTransition:"",onHide:function(){console.log("订单创建失败"),5==n.status&&(console.log(0),localStorage.clear(),clearcookie(g.default),getAuth(g.default,w.default,"member",0))}}):(console.log("订单创建成功。。"),e.orderInfo=n,(0,r.toPay)(n,e.callback,e))},function(n){e.disable=!0,console.log(n),console.log("订单创建失败"),t.$vux.alert.show({title:"提示",content:"网络异常，请稍后重试",dialogTransition:"",maskTransition:""}),e.loadingshow=!1})):getAuth(g.default,w.default,"member",0)},callback:function(t){var e=this;a.default.httpPost(x.default,HOST+"/pay/weixin/check",{id:t.id},function(t){0!=t.status?e.$vux.alert.show({title:"提示",content:"服务器维护中，您的订单已支付成功，请勿重复支付。如有疑问请联系客服：400-966-7718",dialogTransition:"",maskTransition:""}):e.$vux.alert.show({title:"恭喜您成为会员",content:"您可在会员中心查看您的特权",dialogTransition:"",maskTransition:"",onHide:function(){location.href="/m/my.html"}})})}}}},366:function(t,e){},429:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"member"}},[t.showContent?n("div",{staticClass:"content"},[t.dataInfo.user?n("div",{staticClass:"header"},[n("div",{staticClass:"headimg",on:{click:t.toProfile}},[n("img",{attrs:{src:t.dataInfo.user.photo,alt:""}})]),t._v(" "),n("div",{staticClass:"name-title"},[n("p",{staticClass:"name",domProps:{innerHTML:t._s(t.dataInfo.user.name)}}),t._v(" "),n("p",{staticClass:"t"},[t._v("您正在为当前用户开通会员")])])]):t._e(),t._v(" "),n("div",{staticClass:"memberlist"},[n("p",[t._v("申请成为")]),t._v(" "),n("ul",t._l(t.dataInfo.category_prices,function(e,i){return n("li",{class:{active:e.id==t.level_id},on:{click:function(n){t.memberActive(e)}}},[n("img",{attrs:{src:e.photo,alt:""}}),t._v(" "),n("span",{staticClass:"name",domProps:{innerHTML:t._s(e.name)}}),t._v(" "),n("span",{staticClass:"price"},[t._v("¥"+t._s(e.price))])])}))]),t._v(" "),n("group",{staticClass:"group"},[n("cell",{attrs:{title:"会员卡激活","is-link":""},nativeOn:{click:function(e){t.toCardActive(e)}}})],1),t._v(" "),n("div",{staticClass:"memberprivilege"},[n("p",[t._v("会员特权")]),t._v(" "),n("p",{staticClass:"detail",domProps:{innerHTML:t._s(t.dataInfo.detail)}})])],1):t._e(),t._v(" "),t.showContent?n("footer",[n("div",{staticClass:"price"},[n("span",[t._v("价格： "),n("span",[t._v(" ¥"+t._s(t.price))])])]),t._v(" "),n("div",{staticClass:"buy",on:{click:t.buy}},[t._m(0)])]):t._e(),t._v(" "),n("Loading",{attrs:{text:t.loadtext},model:{value:t.loadingshow,callback:function(e){t.loadingshow=e},expression:"loadingshow"}})],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("a",[n("span",[t._v("确认支付")])])}]}},471:function(t,e,n){var i,o;n(366),i=n(266);var a=n(429);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=i}});