webpackJsonp([45,0],{0:function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}var i=n(1),a=o(i),s=n(682),r=o(s);new a.default({el:"#wx-gftv",template:"<App/>",components:{App:r.default}})},2:function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}function i(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"提示",n=arguments[2];m.default.$vux.alert.show({title:e,content:t,dialogTransition:"",maskTransition:"",onHide:function(){"function"==typeof n&&n()}})}function a(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:5e3,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"bottom";m.default.$vux.toast.show({text:t,time:e,width:"auto",type:"text",position:n})}function s(t){return t.replace(/\n/g,"<br/>")}function r(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"功夫财经",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"https://m.kofuf.com/m/home.html",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"https://m.kofuf.com/static/img_h5/h5_logo.png",o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"国民财商提升者";console.log(window),window.shareData={title:t,link:e,imgUrl:n,desc:o}}Object.defineProperty(e,"__esModule",{value:!0}),e.message=i,e.toast=a,e.stringBr=s,e.shareData=r;var u=n(23),c=o(u),l=n(29),d=o(l),f=n(1),m=o(f);m.default.use(c.default),m.default.use(d.default)},3:function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var i=n(42),a=o(i),s=n(41),r=o(s),u=n(11),c=n(1),l=(o(c),n(2)),d=r.default.create({baseURL:"https://api.kofuf.com",timeout:15e3,headers:{"Content-Type":"application/x-www-form-urlencoded"}});d.interceptors.request.use(function(t){return t.headers.token=(0,u.getToken)(),t.headers.gid=(0,u.getGid)(),t.headers.from=(0,u.getFrom)(),t},function(t){console.log(t),a.default.reject(t)}),d.interceptors.response.use(function(t){var e=t.data;return 0!==e.status?((0,l.toast)(e.error),a.default.reject({error:e})):e},function(t){return console.log("err"+t),(0,l.toast)(t.message),a.default.reject(t)}),e.default=d},5:function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}function i(){var t=window.navigator.userAgent.toLowerCase();return"micromessenger"==t.match(/MicroMessenger/i)}function a(){var t,e,n,o;return t=document.documentElement.scrollLeft||document.body.scrollLeft,e=document.documentElement.scrollTop||document.body.scrollTop,n=document.documentElement.clientWidth,o=document.documentElement.clientHeight,{left:t,top:e,width:n,height:o}}function s(){var t,e;return t=document.body.clientHeight,e=document.body.scrollTop,{top:e,height:t}}function r(t,e){var n=HOST+"/api/session/share_weixin_config?url="+encodeURIComponent(window.location.href.split("#")[0]);(0,m.default)({url:n,method:"get",params:{}}).then(function(t){wx.config({debug:!1,appId:t.appId,timestamp:t.timestamp,nonceStr:t.nonceStr,signature:t.signature,jsApiList:["checkJsApi","onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo"]})}),wx.ready(function(){var t=shareData.title,e=shareData.link,n=shareData.imgUrl,o=shareData.desc;wx.onMenuShareTimeline({title:t,link:e,imgUrl:n,success:function(){},cancel:function(){}}),wx.onMenuShareAppMessage({title:t,desc:o,link:e,imgUrl:n,type:"link",success:function(){},cancel:function(){}}),wx.onMenuShareQZone({title:t,desc:o,link:e,imgUrl:n,success:function(){},cancel:function(){}}),wx.onMenuShareQQ({title:t,desc:o,link:e,imgUrl:n,success:function(){},cancel:function(){}})})}function u(t){var e={ORDER_TYPE_COMPOISITE_CHANNEL:3,ORDER_TYPE_CHANNEL_GOODS:4,ORDER_TYPE_WALLET:6,ORDER_TYPE_MEMBER:7,ORDER_TYPE_MEMBER_GOODS:8,ORDER_TYPE_SMALL_CHANNEL:9,ORDER_TYPE_GIFT:10,ORDER_TYPE_BOOK:11,ORDER_TYPE_BOOKLIST:12,ORDER_TYPE_LEVEL_UPDATE:13,ORDER_TYPE_TEACHER_BOOK:14,ORDER_TYPE_TEACHER_BOOKLIST:15,ORDER_TYPE_:16};return e[t]}function c(){var t=navigator.userAgent,e=t.indexOf("Android")>-1||t.indexOf("Adr")>-1,n=!!t.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);return!(!e&&!n)}function l(){var t=navigator.userAgent,e=t.indexOf("Android")>-1||t.indexOf("Adr")>-1;return!!e}function d(){var t=navigator.userAgent,e=!!t.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);return!!e}Object.defineProperty(e,"__esModule",{value:!0}),e.isWeiXin=i,e.getClient=a,e.getBody=s,e.weixinShare=r,e.getOrderType=u,e.isMobile=c,e.isAndroid=l,e.isiOS=d;var f=n(3),m=o(f)},6:function(t,e,n){"use strict";!function(){var t=document.documentElement.clientWidth||document.body.clientWidth;t=t>640?640:t;var e=t/750*100;e=e<60?e:60,document.documentElement.style.fontSize=e+"px",t<350?window.phonetype="small":window.phonetype="large"}(),document.write('<script src="https://s19.cnzz.com/z_stat.php?id=1262435637&web_id=1262435637" language="JavaScript"></script>'),document.write('<script src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js" charset="utf-8"></script>'),window.base="dev","pro"==base?(window.VERSION="",window.HOST="https://api.kofuf.com",window.HOSTM="https://m.kofuf.com",window.HOSTA="https://api.kofuf.com",window.appid="wx05e842991e5fa0b2",localStorage.setItem("from","3"),window.config=function(){return{paytype:"JSAPI",from:localStorage.getItem("from"),gid:localStorage.getItem("gid"),token:localStorage.getItem("token")}}):(window.VERSION="",window.HOST="http://123.57.35.40",window.HOSTM="http://dev.kofuf.com",window.HOSTA="http://dev.kofuf.com",window.appid="wx0a542ef9d4d41cef",localStorage.setItem("from","3"),window.config=function(){return{paytype:"JSAPI",from:localStorage.getItem("from"),gid:localStorage.getItem("gid"),token:localStorage.getItem("token")}}),window.shareData={title:"功夫财经",link:HOSTM+"/m/home.html",imgUrl:"https://m.kofuf.com/static/img_h5/h5_logo.png",desc:"功夫财经致力于联动最出色的财经学者，提供最优质的原创内容，打造中国规模最大的、粘性最高的财富命运共同体，以新型金融服务平台为终极己任，解决中产焦虑，提升国民财商。 "};var o=n(38);o.attach(document.body),window.getAuthLink=function(t){return"https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri="+HOSTA+"%2Fapi%2Fsession%2Fauth_weixin&response_type=code&scope=snsapi_userinfo&state="+t+"#wechat_redirect"},window.getAuth=function(t,e,n,o){var i=t.get("gid"),a=e.parse();if(!localStorage.getItem("gid")||""==localStorage.getItem("gid"))if("undefined"!=typeof a.gid)localStorage.setItem("gid",a.gid),localStorage.setItem("token",a.token);else if("undefined"!=typeof i)localStorage.setItem("gid",t.get("gid")),localStorage.setItem("token",t.get("token"));else{var s;s=void 0!=o&&""!=o?n+"_"+o:n,s=s?s:"",window.location.href=getAuthLink(s)}},window.clearcookie=function(t){localStorage.clear(),t.set("gid",0,{domain:".kofuf.com",path:"/",expires:-1}),t.set("token",0,{domain:".kofuf.com",path:"/",expires:-1})}},7:function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var i=n(40),a=o(i);e.default={mixins:[a.default],props:{value:Boolean,time:{type:Number,default:2e3},type:{type:String,default:"success"},transition:String,width:{type:String,default:"7.6em"},isShowMask:{type:Boolean,default:!1},text:String,position:String},data:function(){return{show:!1}},created:function(){this.value&&(this.show=!0)},computed:{currentTransition:function(){return this.transition?this.transition:"top"===this.position?"vux-slide-from-top":"bottom"===this.position?"vux-slide-from-bottom":"vux-fade"},toastClass:function(){return{"weui-toast_forbidden":"warn"===this.type,"weui-toast_cancel":"cancel"===this.type,"weui-toast_success":"success"===this.type,"weui-toast_text":"text"===this.type,"vux-toast-top":"top"===this.position,"vux-toast-bottom":"bottom"===this.position,"vux-toast-middle":"middle"===this.position}},style:function(){if("text"===this.type&&"auto"===this.width)return{padding:"10px"}}},watch:{show:function(t){var e=this;t&&(this.$emit("input",!0),this.$emit("on-show"),this.fixSafariOverflowScrolling("auto"),clearTimeout(this.timeout),this.timeout=setTimeout(function(){e.show=!1,e.$emit("input",!1),e.$emit("on-hide"),e.fixSafariOverflowScrolling("touch")},this.time))},value:function(t){this.show=t}}}},8:function(t,e){},9:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-toast"},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowMask&&t.show,expression:"isShowMask && show"}],staticClass:"weui-mask_transparent"}),t._v(" "),n("transition",{attrs:{name:t.currentTransition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"weui-toast",class:t.toastClass,style:{width:t.width}},[n("i",{directives:[{name:"show",rawName:"v-show",value:"text"!==t.type,expression:"type !== 'text'"}],staticClass:"weui-icon-success-no-circle weui-icon_toast"}),t._v(" "),t.text?n("p",{staticClass:"weui-toast__content",style:t.style,domProps:{innerHTML:t._s(t.text)}}):n("p",{staticClass:"weui-toast__content"},[t._t("default")],2)])])],1)},staticRenderFns:[]}},10:function(t,e,n){var o,i;n(14),o=n(13);var a=n(16);i=o=o||{},"object"!=typeof o.default&&"function"!=typeof o.default||(i=o=o.default),"function"==typeof i&&(i=i.options),i.render=a.render,i.staticRenderFns=a.staticRenderFns,t.exports=o},11:function(t,e){"use strict";function n(){return localStorage.getItem(f)}function o(t){return localStorage.setItem(f,t)}function i(){return localStorage.removeItem(f)}function a(){return localStorage.getItem(m)}function s(t){return localStorage.setItem(m,t)}function r(){return localStorage.removeItem(m)}function u(){return localStorage.getItem(p)||3}function c(t){return localStorage.setItem(p,t)}function l(){return localStorage.removeItem(p)}function d(){return localStorage.getItem(h)}Object.defineProperty(e,"__esModule",{value:!0}),e.getToken=n,e.setToken=o,e.removeToken=i,e.getGid=a,e.setGid=s,e.removeGid=r,e.getFrom=u,e.setFrom=c,e.removeFrom=l,e.getVersion=d;var f="token",m="gid",p="from",h="version"},12:function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var i=n(10),a=o(i);e.default={components:{XDialog:a.default},created:function(){"undefined"!=typeof this.value&&(this.showValue=this.value)},props:{value:Boolean,title:String,content:String,buttonText:String,maskTransition:{type:String,default:"vux-mask"},dialogTransition:{type:String,default:"vux-dialog"}},data:function(){return{showValue:!1}},methods:{_onHide:function(){this.showValue=!1}},watch:{value:function(t){this.showValue=t},showValue:function(t){this.$emit("input",t)}}}},13:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{value:{type:Boolean,default:!1},maskTransition:{type:String,default:"vux-mask"},dialogTransition:{type:String,default:"vux-dialog"},hideOnBlur:Boolean,scroll:{type:Boolean,default:!0}},created:function(){"undefined"!=typeof this.value&&(this.currentValue=this.value)},watch:{value:{handler:function(t){this.currentValue=t},immediate:!0},currentValue:function(t){this.$emit(t?"on-show":"on-hide"),this.$emit("input",t)}},data:function(){return{currentValue:!1}},methods:{onTouchMove:function(t){!this.scroll&&t.preventDefault()}}}},14:function(t,e){},15:function(t,e){},16:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-x-dialog",on:{touchmove:t.onTouchMove}},[n("transition",{attrs:{name:t.maskTransition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.currentValue,expression:"currentValue"}],staticClass:"weui-mask",on:{click:function(e){t.hideOnBlur&&(t.currentValue=!1)}}})]),t._v(" "),n("transition",{attrs:{name:t.dialogTransition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.currentValue,expression:"currentValue"}],staticClass:"weui-dialog"},[t._t("default")],2)])],1)},staticRenderFns:[]}},17:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-alert"},[n("x-dialog",{attrs:{"mask-transition":t.maskTransition,"dialog-transition":t.dialogTransition},on:{"on-hide":function(e){t.$emit("on-hide")},"on-show":function(e){t.$emit("on-show")}},model:{value:t.showValue,callback:function(e){t.showValue=e},expression:"showValue"}},[n("div",{staticClass:"weui-dialog__hd"},[n("strong",{staticClass:"weui-dialog__title"},[t._v(t._s(t.title))])]),t._v(" "),n("div",{staticClass:"weui-dialog__bd"},[t._t("default",[n("div",{domProps:{innerHTML:t._s(t.content)}})])],2),t._v(" "),n("div",{staticClass:"weui-dialog__ft"},[n("a",{staticClass:"weui-dialog__btn weui-dialog__btn_primary",attrs:{href:"javascript:;"},on:{click:t._onHide}},[t._v(t._s(t.buttonText||"确定"))])])])],1)},staticRenderFns:[]}},39:function(t,e,n){var o,i;n(8),o=n(7);var a=n(9);i=o=o||{},"object"!=typeof o.default&&"function"!=typeof o.default||(i=o=o.default),"function"==typeof i&&(i=i.options),i.render=a.render,i.staticRenderFns=a.staticRenderFns,t.exports=o},43:function(t,e,n){var o,i;n(15),o=n(12);var a=n(17);i=o=o||{},"object"!=typeof o.default&&"function"!=typeof o.default||(i=o=o.default),"function"==typeof i&&(i=i.options),i.render=a.render,i.staticRenderFns=a.staticRenderFns,t.exports=o},370:function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),n(6);var i=n(5),a=n(1),s=(o(a),n(2));e.default={data:function(){return{sc:!1,loadingshow:!1,loadtext:"加载中...",contentshow:!0,defaultimg:"http://static1.kofuf.com/1496311047717.jpg",links:[{imgurl:"http://static1.kofuf.com/1512554461616.png",txturl:"http://static1.kofuf.com/1512554483479.png",linkurl:"http://mp.weixin.qq.com/mp/homepage?__biz=MzIzOTA3NTA5Mg==&hid=21&sn=23d96eb339a0f818f4355abed7c67cbd#wechat_redirect"},{imgurl:"http://static1.kofuf.com/1512557101893.png",txturl:"http://static1.kofuf.com/1512615504904.png",linkurl:"http://mp.weixin.qq.com/mp/homepage?__biz=MzIzOTA3NTA5Mg==&hid=19&sn=3c57875e9429a10fc7fad8313c63af34#wechat_redirect"},{imgurl:"http://static1.kofuf.com/1512557053860.png",txturl:"http://static1.kofuf.com/1512557082574.png",linkurl:"http://mp.weixin.qq.com/mp/homepage?__biz=MzIzOTA3NTA5Mg==&hid=16&sn=8b73deac498df522b4033ffc49b356a5#wechat_redirect"}]}},components:{},beforeCreate:function(){(0,i.isWeiXin)()||(0,s.message)("请关注'功夫财经'公众号")},created:function(){(0,s.shareData)("功夫TV",location.href),(0,i.weixinShare)()},methods:{linkIndex:function(t){window.location.href=t}}}},489:function(t,e){},596:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"wx-gftv"}},[t.contentshow?n("div",{staticClass:"content position-relative"},[n("img",{staticClass:"tv-img",attrs:{src:"http://static1.kofuf.com/1512558174623.png"}}),t._v(" "),n("img",{staticClass:"bottom-img",attrs:{src:"http://static1.kofuf.com/1512558314601.png"}}),t._v(" "),n("div",{staticClass:"tv-section"},t._l(t.links,function(e,o){return n("div",{key:o,staticClass:"tv-item",on:{click:function(n){t.linkIndex(e.linkurl)}}},[n("img",{staticClass:"tv-top",attrs:{src:e.imgurl}}),t._v(" "),n("img",{staticClass:"tv-bottom",attrs:{src:e.txturl}})])}))]):t._e()])},staticRenderFns:[]}},682:function(t,e,n){var o,i;n(489),o=n(370);var a=n(596);i=o=o||{},"object"!=typeof o.default&&"function"!=typeof o.default||(i=o=o.default),"function"==typeof i&&(i=i.options),i.render=a.render,i.staticRenderFns=a.staticRenderFns,t.exports=o}});