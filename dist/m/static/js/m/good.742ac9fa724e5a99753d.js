webpackJsonp([14,0],{0:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}var o=n(1),s=i(o),a=n(625),r=i(a),u=n(16),l=i(u);s.default.use(l.default),new s.default({el:"#good",template:"<App/>",components:{App:r.default}})},2:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(1);i(o);e.default={ajaxPost:function(t,e,n,i){$.ajax({url:t,type:"POST",data:e,success:function(t){n(t)},error:function(t){i(t)}})},ajaxGet:function(){},httpPost:function(t,e,n,i,o){t.http.options.emulateJSON=!0,t.http.options.headers={"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},t.http.interceptors.push(function(t,e){t.headers.set("from",config().from),t.headers.set("gid",config().gid),t.headers.set("token",config().token),t.headers.set("version",VERSION),e()}),t.http.post(e,n).then(function(t){return t.bodyText}).then(function(t){var t=JSON.parse(t);i(t)},function(t){o(t)||console.log(t)})},httpGet:function(t,e,n,i,o){t.http.options.emulateJSON=!0,t.http.options.headers={"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},t.http.interceptors.push(function(t,e){t.headers.set("from",config().from),t.headers.set("gid",config().gid),t.headers.set("token",config().token),t.headers.set("version",VERSION),e()}),t.http.get(e,{params:n}).then(function(t){return t.bodyText}).then(function(t){var t=JSON.parse(t);i(t)},function(t){o(t)||console.log(t)})}}},3:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function o(){var t=window.navigator.userAgent.toLowerCase();return"micromessenger"==t.match(/MicroMessenger/i)}function s(){var t,e,n,i;return t=document.documentElement.scrollLeft||document.body.scrollLeft,e=document.documentElement.scrollTop||document.body.scrollTop,n=document.documentElement.clientWidth,i=document.documentElement.clientHeight,{left:t,top:e,width:n,height:i}}function a(){var t,e;return t=document.body.clientHeight,e=document.body.scrollTop,{top:e,height:t}}function r(t,e){var n=HOST+"/api/session/share_weixin_config?url="+encodeURIComponent(window.location.href.split("#")[0]);(0,f.default)({url:n,method:"get",params:{}}).then(function(t){wx.config({debug:!1,appId:t.appId,timestamp:t.timestamp,nonceStr:t.nonceStr,signature:t.signature,jsApiList:["checkJsApi","onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo"]})}),wx.ready(function(){var t=shareData.title,e=shareData.link,n=shareData.imgUrl,i=shareData.desc;wx.onMenuShareTimeline({title:t,link:e,imgUrl:n,success:function(){},cancel:function(){}}),wx.onMenuShareAppMessage({title:t,desc:i,link:e,imgUrl:n,type:"link",success:function(){},cancel:function(){}}),wx.onMenuShareQZone({title:t,desc:i,link:e,imgUrl:n,success:function(){},cancel:function(){}}),wx.onMenuShareQQ({title:t,desc:i,link:e,imgUrl:n,success:function(){},cancel:function(){}})})}function u(){var t=navigator.userAgent,e=t.indexOf("Android")>-1||t.indexOf("Adr")>-1,n=!!t.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);return!(!e&&!n)}function l(){var t=navigator.userAgent,e=t.indexOf("Android")>-1||t.indexOf("Adr")>-1;return!!e}function c(){var t=navigator.userAgent,e=!!t.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);return!!e}Object.defineProperty(e,"__esModule",{value:!0}),e.isWeiXin=o,e.getClient=s,e.getBody=a,e.weixinShare=r,e.isMobile=u,e.isAndroid=l,e.isiOS=c;var d=n(5),f=i(d)},4:function(t,e,n){"use strict";!function(){var t=document.documentElement.clientWidth||document.body.clientWidth;t=t>640?640:t;var e=t/750*100;e=e<60?e:60,document.documentElement.style.fontSize=e+"px",t<350?window.phonetype="small":window.phonetype="large"}(),document.write('<script src="https://s19.cnzz.com/z_stat.php?id=1262435637&web_id=1262435637" language="JavaScript"></script>'),document.write('<script src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js" charset="utf-8"></script>'),window.base="pro","pro"==base?(window.VERSION="0.1",window.HOST="http://api.51xy8.com",window.HOSTM="http://m.51xy8.com",window.HOSTA="http://api.51xy8.com",window.appid="wx05e842991e5fa0b2",localStorage.setItem("from","3"),window.config=function(){return{paytype:"JSAPI",from:localStorage.getItem("from"),gid:localStorage.getItem("gid"),token:localStorage.getItem("token")}}):(window.VERSION="0.1",window.HOST="http://123.57.35.40",window.HOSTM="http://dev.kofuf.com",window.HOSTA="http://123.57.35.40",window.appid="wx0a542ef9d4d41cef",localStorage.setItem("from","3"),localStorage.setItem("gid","1047501566"),localStorage.setItem("token","f32cd7de15144e2b931214730e6ed9f4"),window.config=function(){return{paytype:"JSAPI",from:localStorage.getItem("from"),gid:localStorage.getItem("gid"),token:localStorage.getItem("token")}}),window.shareData={title:"功夫财经",link:HOSTM+"/m/home.html",imgUrl:"http://m.kofuf.com/static/img_h5/h5_logo.png",desc:"功夫财经致力于联动最出色的财经学者，提供最优质的原创内容，打造中国规模最大的、粘性最高的财富命运共同体，以新型金融服务平台为终极己任，解决中产焦虑，提升国民财商。 "};var i=n(35);i.attach(document.body),window.getAuthLink=function(t){return"https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri="+HOSTA+"%2Fapi%2Fsession%2Fauth_weixin&response_type=code&scope=snsapi_userinfo&state="+t+"#wechat_redirect"},window.getAuth=function(t,e,n,i){var o=t.get("gid"),s=e.parse();if(!localStorage.getItem("gid")||""==localStorage.getItem("gid"))if("undefined"!=typeof s.gid)localStorage.setItem("gid",s.gid),localStorage.setItem("token",s.token);else if("undefined"!=typeof o)localStorage.setItem("gid",t.get("gid")),localStorage.setItem("token",t.get("token"));else{var a;a=void 0!=i&&""!=i?n+"_"+i:n,a=a?a:"",window.location.href=getAuthLink(a)}},window.clearcookie=function(t){localStorage.clear(),t.set("gid",0,{domain:".kofuf.com",path:"/",expires:-1}),t.set("token",0,{domain:".kofuf.com",path:"/",expires:-1})}},5:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(43),s=i(o),a=n(42),r=i(a),u=n(14),l=n(28),c=i(l),d=n(1),f=i(d);f.default.use(c.default);var p=r.default.create({baseURL:"https://api.kofuf.com",timeout:15e3,headers:{"Content-Type":"application/x-www-form-urlencoded"}});p.interceptors.request.use(function(t){return t.headers.token=(0,u.getToken)(),t.headers.gid=(0,u.getGid)(),t.headers.from=(0,u.getFrom)(),t},function(t){console.log(t),s.default.reject(t)}),p.interceptors.response.use(function(t){var e=t.data;return 0!==e.status?(f.default.$vux.toast.show({text:e.error,time:3e3,width:"auto",type:"text",position:"bottom"}),s.default.reject({error:e})):e},function(t){return console.log("err"+t),f.default.$vux.toast.show({text:t.message,time:3e3,width:"auto",type:"warn"}),s.default.reject(t)}),e.default=p},6:function(t,e){},7:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{value:{type:Boolean,default:!1},text:String,position:String},created:function(){this.show=this.value},data:function(){return{show:!1}},watch:{value:function(t){this.show=t},show:function(t){this.$emit("input",t)}}}},8:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(38),s=i(o);e.default={mixins:[s.default],props:{value:Boolean,time:{type:Number,default:2e3},type:{type:String,default:"success"},transition:String,width:{type:String,default:"7.6em"},isShowMask:{type:Boolean,default:!1},text:String,position:String},data:function(){return{show:!1}},created:function(){this.value&&(this.show=!0)},computed:{currentTransition:function(){return this.transition?this.transition:"top"===this.position?"vux-slide-from-top":"bottom"===this.position?"vux-slide-from-bottom":"vux-fade"},toastClass:function(){return{"weui-toast_forbidden":"warn"===this.type,"weui-toast_cancel":"cancel"===this.type,"weui-toast_success":"success"===this.type,"weui-toast_text":"text"===this.type,"vux-toast-top":"top"===this.position,"vux-toast-bottom":"bottom"===this.position,"vux-toast-middle":"middle"===this.position}},style:function(){if("text"===this.type&&"auto"===this.width)return{padding:"10px"}}},watch:{show:function(t){var e=this;t&&(this.$emit("input",!0),this.$emit("on-show"),this.fixSafariOverflowScrolling("auto"),clearTimeout(this.timeout),this.timeout=setTimeout(function(){e.show=!1,e.$emit("input",!1),e.$emit("on-hide"),e.fixSafariOverflowScrolling("touch")},this.time))},value:function(t){this.show=t}}}},9:function(t,e){},10:function(t,e){},11:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:"vux-mask"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"weui-loading_toast"},[n("div",{staticClass:"weui-mask_transparent"}),t._v(" "),n("div",{staticClass:"weui-toast",style:{position:t.position}},[n("i",{staticClass:"weui-loading weui-icon_toast"}),t._v(" "),n("p",{staticClass:"weui-toast__content"},[t._v(t._s(t.text||"加载中")),t._t("default")],2)])])])},staticRenderFns:[]}},12:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-toast"},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowMask&&t.show,expression:"isShowMask && show"}],staticClass:"weui-mask_transparent"}),t._v(" "),n("transition",{attrs:{name:t.currentTransition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"weui-toast",class:t.toastClass,style:{width:t.width}},[n("i",{directives:[{name:"show",rawName:"v-show",value:"text"!==t.type,expression:"type !== 'text'"}],staticClass:"weui-icon-success-no-circle weui-icon_toast"}),t._v(" "),t.text?n("p",{staticClass:"weui-toast__content",style:t.style,domProps:{innerHTML:t._s(t.text)}}):n("p",{staticClass:"weui-toast__content"},[t._t("default")],2)])])],1)},staticRenderFns:[]}},13:function(t,e,n){var i,o;n(9),i=n(7);var s=n(11);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=s.render,o.staticRenderFns=s.staticRenderFns,t.exports=i},14:function(t,e){"use strict";function n(){return localStorage.getItem(f)}function i(t){return localStorage.setItem(f,t)}function o(){return localStorage.removeItem(f)}function s(){return localStorage.getItem(p)}function a(t){return localStorage.setItem(p,t)}function r(){return localStorage.removeItem(p)}function u(){return localStorage.getItem(h)||3}function l(t){return localStorage.setItem(h,t)}function c(){return localStorage.removeItem(h)}function d(){return localStorage.getItem(g)}Object.defineProperty(e,"__esModule",{value:!0}),e.getToken=n,e.setToken=i,e.removeToken=o,e.getGid=s,e.setGid=a,e.removeGid=r,e.getFrom=u,e.setFrom=l,e.removeFrom=c,e.getVersion=d;var f="token",p="gid",h="from",g="version"},15:function(t,e,n){var i,o;n(19),i=n(18);var s=n(21);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=s.render,o.staticRenderFns=s.staticRenderFns,t.exports=i},18:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{value:{type:Boolean,default:!1},maskTransition:{type:String,default:"vux-mask"},dialogTransition:{type:String,default:"vux-dialog"},hideOnBlur:Boolean,scroll:{type:Boolean,default:!0}},created:function(){"undefined"!=typeof this.value&&(this.currentValue=this.value)},watch:{value:{handler:function(t){this.currentValue=t},immediate:!0},currentValue:function(t){this.$emit(t?"on-show":"on-hide"),this.$emit("input",t)}},data:function(){return{currentValue:!1}},methods:{onTouchMove:function(t){!this.scroll&&t.preventDefault()}}}},19:function(t,e){},21:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-x-dialog",on:{touchmove:t.onTouchMove}},[n("transition",{attrs:{name:t.maskTransition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.currentValue,expression:"currentValue"}],staticClass:"weui-mask",on:{click:function(e){t.hideOnBlur&&(t.currentValue=!1)}}})]),t._v(" "),n("transition",{attrs:{name:t.dialogTransition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.currentValue,expression:"currentValue"}],staticClass:"weui-dialog"},[t._t("default")],2)])],1)},staticRenderFns:[]}},24:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(15),s=i(o);e.default={components:{XDialog:s.default},created:function(){"undefined"!=typeof this.value&&(this.showValue=this.value)},props:{value:Boolean,title:String,content:String,buttonText:String,maskTransition:{type:String,default:"vux-mask"},dialogTransition:{type:String,default:"vux-dialog"}},data:function(){return{showValue:!1}},methods:{_onHide:function(){this.showValue=!1}},watch:{value:function(t){this.showValue=t},showValue:function(t){this.$emit("input",t)}}}},25:function(t,e){},26:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-alert"},[n("x-dialog",{attrs:{"mask-transition":t.maskTransition,"dialog-transition":t.dialogTransition},on:{"on-hide":function(e){t.$emit("on-hide")},"on-show":function(e){t.$emit("on-show")}},model:{value:t.showValue,callback:function(e){t.showValue=e},expression:"showValue"}},[n("div",{staticClass:"weui-dialog__hd"},[n("strong",{staticClass:"weui-dialog__title"},[t._v(t._s(t.title))])]),t._v(" "),n("div",{staticClass:"weui-dialog__bd"},[t._t("default",[n("div",{domProps:{innerHTML:t._s(t.content)}})])],2),t._v(" "),n("div",{staticClass:"weui-dialog__ft"},[n("a",{staticClass:"weui-dialog__btn weui-dialog__btn_primary",attrs:{href:"javascript:;"},on:{click:t._onHide}},[t._v(t._s(t.buttonText||"确定"))])])])],1)},staticRenderFns:[]}},36:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={getUrlKey:function(t){if("type"==t){var e=decodeURIComponent((new RegExp("[?|&]"+t+"=([^&;]+?)(&|#|;|$)").exec(location.href)||["",""])[1].replace(/\+/g,"%20"))||null;return e}if("code"==t){var e=decodeURIComponent((new RegExp("[?|&]"+t+"=([^&;]+?)(&|#|;|$)").exec(location.href)||["",""])[1].replace(/\+/g,"%20"))||null;return e}if("id"==t){var e=decodeURIComponent((new RegExp("[?|&]"+t+"=([^&;]+?)(&|#|;|$)").exec(location.href)||["",""])[1].replace(/\+/g,"%20"))||/\/\d{1,8}/.exec(location.href)[0].replace("/","")||null;return e}}}},37:function(t,e,n){var i,o;n(10),i=n(8);var s=n(12);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=s.render,o.staticRenderFns=s.staticRenderFns,t.exports=i},41:function(t,e){},44:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"failed",data:function(){return{}},props:{msg:String},components:{},created:function(){},methods:{}}},45:function(t,e){},46:function(t,e,n){t.exports=n.p+"m/static/img/pay_result_failure.dac5b24.png"},47:function(t,e,n){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"failed"}},[i("img",{attrs:{src:n(46),alt:""}}),t._v(" "),i("p",[t._v(t._s(t.msg))])])},staticRenderFns:[]}},48:function(t,e,n){var i,o;n(45),i=n(44);var s=n(47);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=s.render,o.staticRenderFns=s.staticRenderFns,t.exports=i},49:function(t,e){"use strict";function n(t,e,n){console.log("发起微信支付"),"undefined"==typeof WeixinJSBridge?(document.addEventListener?document.addEventListener("WeixinJSBridgeReady",i,!1):document.attachEvent&&(document.attachEvent("WeixinJSBridgeReady",i),document.attachEvent("onWeixinJSBridgeReady",i)),n.$vux.alert.show({title:"提示",content:"请在微信中打开",dialogTransition:"",maskTransition:"",onShow:function(){},onHide:function(){}}),n.disable=!0):i(t,e,n)}function i(t,e,n){WeixinJSBridge.invoke("getBrandWCPayRequest",{appId:t.app_id,timeStamp:t.timestamp,nonceStr:t.nonce_str,package:"prepay_id="+t.prepay_id,signType:"MD5",paySign:t.sign},function(i){console.log(i),"get_brand_wcpay_request:ok"==i.err_msg?e(t):"get_brand_wcpay_request:fail"==i.err_msg?(n.disable=!0,n.$vux.alert.show({title:"",content:"由于跨号支付，请关注'功夫财经'公众号'，下载APP购买",dialogTransition:"",maskTransition:""})):(n.disable=!0,n.$vux.alert.show({title:"",content:"支付取消",dialogTransition:"",maskTransition:""}))})}Object.defineProperty(e,"__esModule",{value:!0}),e.toPay=n},50:function(t,e){"use strict";function n(t){var e=new Date(t),n=new Date;if(i(new Date(t),"yyyy")-i(n,"yyyy")<0)return i(e,"yyyy-MM-dd");if(i(new Date(t),"MM")-i(n,"MM")<0)return i(e,"MM-dd");var o=i(n,"dd")-i(e,"dd");if(0==o){var s=i(n,"hh")-i(e,"hh");if(0==s){var a=i(n,"mm")-i(e,"mm");return a<5?"刚刚":isNaN(a)?"1小时前":a+"分钟前"}return s+"小时前"}return 1==o?"昨天":o+"天前"}function i(t,e){/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length)));var n={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds()};for(var i in n)if(new RegExp("("+i+")").test(e)){var o=(n[i]+"").replace(/^0/,"");e=e.replace(RegExp.$1,1===RegExp.$1.length?o:s(o))}return e}function o(t,e){/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length)));var n={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds()};for(var i in n)if(new RegExp("("+i+")").test(e)){var o=(n[i]+"").replace(/^0/,"");e=e.replace(RegExp.$1,1===RegExp.$1.length?o:a(o))}return e}function s(t){return("00"+t).substr(t.length)}function a(t){return t}Object.defineProperty(e,"__esModule",{value:!0}),e.formatedDate=n,e.formatDate=i,e.formatDate2=o},52:function(t,e,n){var i,o;n(56),i=n(53);var s=n(59);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=s.render,o.staticRenderFns=s.staticRenderFns,t.exports=i},53:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{showLoading:{type:Boolean,default:!0},tip:String,backgroundColor:String},methods:{getStyle:function(){if(!this.showLoading&&this.tip)return{"background-color":this.backgroundColor}}}}},56:function(t,e){},59:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"weui-loadmore",class:{"weui-loadmore_line":!t.showLoading,"weui-loadmore_dot":!t.showLoading&&!t.tip}},[t.showLoading?n("i",{staticClass:"weui-loading"}):t._e(),t._v(" "),n("span",{directives:[{name:"show",rawName:"v-show",value:t.tip||!t.showLoading,expression:"tip || !showLoading"}],staticClass:"weui-loadmore__tips",style:t.getStyle()},[t._v(t._s(t.tip))])])},staticRenderFns:[]}},61:function(t,e,n){var i,o;n(25),i=n(24);var s=n(26);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=s.render,o.staticRenderFns=s.staticRenderFns,t.exports=i},73:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function o(t){return JSON.parse((0,a.default)(t))}Object.defineProperty(e,"__esModule",{value:!0});var s=n(90),a=i(s),r=n(67),u=i(r),l=n(98),c=i(l),d=n(96),f=i(d),p=n(97),h=i(p),g=function(){return{content:"Pull Down To Refresh",height:60,autoRefresh:!1,downContent:"Pull Down To Refresh",upContent:"Release To Refresh",loadingContent:"Loading...",clsPrefix:"xs-plugin-pulldown-"}},m=function(){return{content:"Pull Up To Refresh",pullUpHeight:60,height:40,autoRefresh:!1,downContent:"Release To Refresh",upContent:"Pull Up To Refresh",loadingContent:"Loading...",clsPrefix:"xs-plugin-pullup-"}};e.default={props:{value:{type:Object,default:function(){return{pulldownStatus:"",pullupStatus:""}}},height:String,lockX:Boolean,lockY:Boolean,scrollbarX:Boolean,scrollbarY:Boolean,bounce:{type:Boolean,default:!0},useOriginScroll:{type:Boolean,default:!1},useTransition:{type:Boolean,default:!0},preventDefault:{type:Boolean,default:!1},stopPropagation:Boolean,boundryCheck:{type:Boolean,default:!0},gpuAcceleration:{type:Boolean,default:!0},usePulldown:{type:Boolean,default:!1},usePullup:{type:Boolean,default:!1},pulldownConfig:{type:Object,default:function(){return{}}},pullupConfig:{type:Object,default:function(){return{}}},enableHorizontalSwiping:{type:Boolean,default:!1},scrollBottomOffset:{type:Number,default:0}},methods:{reset:function(t,e,n){t&&("undefined"!=typeof t.left&&this._xscroll.scrollLeft(t.left,e,n),"undefined"!=typeof t.top&&this._xscroll.scrollTop(t.top,e,n)),this._xscroll&&this._xscroll.resetSize()},donePulldown:function(){var t=this;this.pulldown.reset(function(){t.reset()}),this.currentValue.pulldownStatus="default"},disablePullup:function(){this.pullup.stop(),this.currentValue.pullupStatus="disabled"},enablePullup:function(){this.currentValue.pullupStatus="default",this.pullup.restart()},donePullup:function(){this.pullup.complete(),this.reset(),this.currentValue.pullupStatus="default"},getStyles:function(){var t=this.height;!this.height&&this.$el&&!this.$el.style.height&&this.lockX&&(t=document.documentElement.clientHeight+"px",this.reset()),this.height&&0===this.height.indexOf("-")&&(t=document.documentElement.clientHeight+parseInt(this.height)+"px"),this.styles={height:""+t}}},created:function(){var t=this;this.value?this.currentValue=this.value:this.currentValue={pulldownStatus:"",pullupStatus:""},this.handleOrientationchange=function(){setTimeout(function(){t.reset()},100)}},data:function(){return{currentValue:{},styles:{}}},watch:{currentValue:{handler:function(t){this.$emit("input",o(t))},deep:!0},height:function(){this.getStyles()},value:{handler:function(t){"default"===t.pullupStatus&&"default"!==this.currentValue.pullupStatus&&this.donePullup(),"default"===t.pulldownStatus&&"default"!==this.currentValue.pulldownStatus&&this.donePulldown(),"disabled"===t.pullupStatus&&"disabled"!==this.currentValue.pullupStatus&&this.disablePullup(),"enabled"===t.pullupStatus&&"disabled"===this.currentValue.pullupStatus&&this.enablePullup()},deep:!0}},mounted:function(){var t=this;this.uuid=Math.random().toString(36).substring(3,8),this.$nextTick(function(){t.$el.setAttribute("id","vux-scroller-"+t.uuid);var e=null;if(t.$slots.default&&(e=t.$slots.default[0].elm),!e)throw new Error("no content is found");if(t._xscroll=new c.default({renderTo:"#vux-scroller-"+t.uuid,lockX:t.lockX,lockY:t.lockY,scrollbarX:t.scrollbarX,scrollbarY:t.scrollbarY,content:e,bounce:t.bounce,useOriginScroll:t.useOriginScroll,useTransition:t.useTransition,preventDefault:t.preventDefault,boundryCheck:t.boundryCheck,gpuAcceleration:t.gpuAcceleration,stopPropagation:t.stopPropagation}),t._xscroll.on("scroll",function(){if(t._xscroll){var e=t._xscroll.getScrollTop();t.$emit("on-scroll",{top:e,left:t._xscroll.getScrollLeft()});var n=t._xscroll.containerHeight,i=t._xscroll.height;e>=n-i-t.scrollBottomOffset&&t.$emit("on-scroll-bottom")}}),t.usePulldown){var n=t.$slots.pulldown,i=(0,u.default)(g(),t.pulldownConfig);n&&(i.container=n[0].elm),t.pulldown=new f.default(i),t._xscroll.plug(t.pulldown),t.pulldown.on("loading",function(e){t.$emit("on-pulldown-loading",t.uuid)}),t.pulldown.on("statuschange",function(e){t.currentValue.pulldownStatus=e.newVal})}if(t.usePullup){var o=t.$slots.pullup,s=(0,u.default)(m(),t.pullupConfig);o&&(s.container=o[0].elm),t.pullup=new h.default(s),t._xscroll.plug(t.pullup),t.pullup.on("loading",function(e){t.$emit("on-pullup-loading",t.uuid)}),t.pullup.on("statuschange",function(e){t.currentValue.pullupStatus=e.newVal})}t.enableHorizontalSwiping&&(t._xscroll.on("panstart",function(e){2!==e.direction&&4!==e.direction||(e.preventDefault(),t.scrollbarY&&(t._xscroll.userConfig.scrollbarY=!1),t._xscroll.userConfig.lockY=!0)}),t._xscroll.on("panend",function(){t.scrollbarY&&(t._xscroll.userConfig.scrollbarY=!0),t._xscroll.userConfig.lockY=!1})),t._xscroll.render(),window.addEventListener("orientationchange",t.handleOrientationchange,!1)}),this.getStyles()},beforeDestroy:function(){this.pullup&&(this._xscroll.unplug(this.pullup),this.pullup.pluginDestructor()),this.pulldown&&(this._xscroll.unplug(this.pulldown),this.pulldown.pluginDestructor()),window.removeEventListener("orientationchange",this.handleOrientationchange,!1),this._xscroll.destroy(),this._xscroll=null}}},75:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(67),s=i(o);e.default={props:{leftOptions:Object,title:String,transition:String,rightOptions:{type:Object,default:function(){return{showMore:!1}}}},computed:{_leftOptions:function(){return(0,s.default)({showBack:!0,preventGoBack:!1},this.leftOptions||{})}},methods:{onClickBack:function(){this._leftOptions.preventGoBack?this.$emit("on-click-back"):this.$router?this.$router.back():window.history.back()}}}},76:function(t,e){},78:function(t,e){},79:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-header"},[n("div",{staticClass:"vux-header-left"},[n("transition",{attrs:{name:t.transition}},[n("a",{directives:[{name:"show",rawName:"v-show",value:t._leftOptions.showBack,expression:"_leftOptions.showBack"}],staticClass:"vux-header-back",on:{click:[function(e){if(!("button"in e)&&t._k(e.keyCode,"preventDefault"))return null},t.onClickBack]}},[t._v(t._s("undefined"==typeof t._leftOptions.backText?"返回":t._leftOptions.backText))])]),t._v(" "),n("transition",{attrs:{name:t.transition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t._leftOptions.showBack,expression:"_leftOptions.showBack"}],staticClass:"left-arrow",on:{click:t.onClickBack}})]),t._v(" "),t._t("left")],2),t._v(" "),n("h1",{staticClass:"vux-header-title",on:{click:function(e){t.$emit("on-click-title")}}},[t._t("default",[n("transition",{attrs:{name:t.transition}},[n("span",{directives:[{name:"show",rawName:"v-show",value:t.title,expression:"title"}]},[t._v(t._s(t.title))])])])],2),t._v(" "),n("div",{staticClass:"vux-header-right"},[t.rightOptions.showMore?n("a",{staticClass:"vux-header-more",on:{click:[function(e){if(!("button"in e)&&t._k(e.keyCode,"preventDefault"))return null},function(e){t.$emit("on-click-more")}]}}):t._e(),t._v(" "),t._t("right")],2)])},staticRenderFns:[]}},81:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{style:t.styles},[n("div",{staticClass:"xs-container"},[t._t("default"),t._v(" "),t._t("pulldown"),t._v(" "),t._t("pullup")],2)])},staticRenderFns:[]}},82:function(t,e,n){var i,o;n(78),i=n(73);var s=n(81);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=s.render,o.staticRenderFns=s.staticRenderFns,t.exports=i},84:function(t,e,n){var i,o;n(76),i=n(75);var s=n(79);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=s.render,o.staticRenderFns=s.staticRenderFns,t.exports=i},128:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(50);e.default={name:"list",data:function(){return{}},props:{freeshow:Boolean,datalist:Array},components:{},created:function(){},methods:{toDetail:function(t){location.href="/m/detail.html?id="+t}},filters:{formatDate:i.formatedDate}}},139:function(t,e){},142:function(t,e,n){t.exports=n.p+"m/static/img/read.b7c743a.png"},147:function(t,e,n){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"list"}},t._l(t.datalist,function(e){return i("li",{on:{click:function(n){t.toDetail(e.id)}}},[i("div",{staticClass:"title"},[t._v("\n     "+t._s(e.name)+"\n   ")]),t._v(" "),i("div",{staticClass:"img vux-1px-b"},[i("img",{attrs:{src:e.thumb,alt:"",onerror:"this.src='http://static0.kofuf.com/1493739178223.jpg?imageView2/1/w/200/h/133/q/100|imageslim'"}}),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.freeshow,expression:"freeshow"}],staticClass:"hint"},[t._v("\n       试读\n     ")])]),t._v(" "),i("span",{staticClass:"date"},[t._v(t._s(t._f("formatDate")(e.published)))]),t._v(" "),i("span",{staticClass:"view"},[i("img",{attrs:{src:n(142),alt:""}}),t._v(t._s(e.view_count)+" 人看过")])])}))},staticRenderFns:[]}},154:function(t,e,n){var i,o;n(139),i=n(128);var s=n(147);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=s.render,o.staticRenderFns=s.staticRenderFns,t.exports=i},165:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(90),s=i(o),a=n(243),r=i(a),u=n(55);e.default={created:function(){this.index=this.value||0,this.index&&(this.current=this.index)},mounted:function(){var t=this;this.$nextTick(function(){t.list&&0===t.list.length||t.render(t.index),t.xheight=t.getHeight()})},methods:{clickListItem:function(t){(0,u.go)(t.url,this.$router),this.$emit("on-click-list-item",JSON.parse((0,s.default)(t)))},buildBackgroundUrl:function(t){return"url("+t+")"},render:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;this.swiper&&this.swiper.destroy(),this.swiper=new r.default({container:this.$el,direction:this.direction,auto:this.auto,loop:this.loop,interval:this.interval,threshold:this.threshold,duration:this.duration,height:this.height||this._height,minMovingDistance:this.minMovingDistance,imgList:this.imgList}).on("swiped",function(e,n){t.current=n%t.length,t.index=n%t.length}),e>0&&this.swiper.go(e)},rerender:function(){var t=this;this.$el&&this.$nextTick(function(){t.index=t.value||0,t.current=t.value||0,t.length=t.list.length||t.$children.length,t.destroy(),t.render(t.value)})},destroy:function(){this.swiper&&this.swiper.destroy()},getHeight:function(){var t=parseInt(this.height,10);return console.log(this.height),console.log(t),t?this.height:t?void 0:this.aspectRatio?this.$el.offsetWidth*this.aspectRatio+"px":"auto"}},props:{list:{type:Array,default:function(){return[]}},direction:{type:String,default:"horizontal"},showDots:{type:Boolean,default:!0},showDescMask:{type:Boolean,default:!0},dotsPosition:{type:String,default:"right"},dotsClass:String,auto:{type:Boolean,default:!1},loop:Boolean,interval:{type:Number,default:3e3},threshold:{type:Number,default:50},duration:{type:Number,default:300},height:{type:String,default:"auto"},aspectRatio:Number,minMovingDistance:{type:Number,default:0},value:{type:Number,default:0}},data:function(){return{current:this.index||0,xheight:"auto",length:this.list.length,index:0}},watch:{list:function(t){this.rerender()},current:function(t){this.index=t,this.$emit("on-index-change",t)},index:function(t){var e=this;t!==this.current&&this.$nextTick(function(){e.swiper&&e.swiper.go(t)}),this.$emit("input",t)},value:function(t){this.index=t}},beforeDestroy:function(){this.destroy()}}},196:function(t,e){},214:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-slider"},[n("div",{staticClass:"vux-swiper",style:{height:t.xheight}},[t._t("default"),t._v(" "),t._l(t.list,function(e,i){return n("div",{staticClass:"vux-swiper-item",attrs:{"data-index":i},on:{click:function(n){t.clickListItem(e)}}},[n("a",{attrs:{href:"javascript:"}},[n("div",{staticClass:"vux-img",style:{backgroundImage:t.buildBackgroundUrl(e.img)}}),t._v(" "),t.showDescMask?n("p",{staticClass:"vux-swiper-desc"},[t._v(t._s(e.title))]):t._e()])])})],2),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.showDots,expression:"showDots"}],class:[t.dotsClass,"vux-indicator","vux-indicator-"+t.dotsPosition]},t._l(t.length,function(e){return n("a",{attrs:{href:"javascript:"}},[n("i",{staticClass:"vux-icon-dot",class:{active:e-1===t.current}})])}))])},staticRenderFns:[]}},223:function(t,e,n){
var i,o;n(196),i=n(165);var s=n(214);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=s.render,o.staticRenderFns=s.staticRenderFns,t.exports=i},299:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={mounted:function(){var t=this;this.$nextTick(function(){t.$parent.rerender()})},beforeDestroy:function(){var t=this.$parent;this.$nextTick(function(){t.rerender()})}}},340:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),n(6),n(4);var o=n(3),s=n(2),a=i(s),r=n(36),u=i(r),l=(n(49),n(1)),c=i(l),d=n(50),f=n(223),p=i(f),h=n(584),g=i(h),m=n(13),v=i(m),w=n(84),_=i(w),y=n(82),x=i(y),S=n(52),b=i(S),k=n(51),C=i(k),M=n(28),O=i(M),$=n(40),T=i($),R=n(39),P=i(R),j=n(48),D=i(j),B=n(154),F=i(B);c.default.use(O.default),c.default.use(C.default),c.default.prototype.$geturlpara=u.default,e.default={name:"good",data:function(){return{id:0,showContent:!1,loadingshow:!0,loadtext:"loading...",itemsinfo:{},failedshow:!1,failedmsg:"服务请求失败，请刷新重试",nonecomment:!1,loadmore:!0,type:""}},components:{Swiper:p.default,SwiperItem:g.default,XHeader:_.default,Loading:v.default,LoadMore:b.default,Scroller:x.default,Failed:D.default,List:F.default},beforeCreate:function(){if((0,o.isWeiXin)()){var t=this.$geturlpara.getUrlKey("id");getAuth(P.default,T.default,"item",t)}},created:function(){this.$geturlpara.getUrlKey("type")&&(this.type=this.$geturlpara.getUrlKey("type"));var t=this.$geturlpara.getUrlKey("id");this.id=t,this.fetchData(t)},mounted:function(){new Mlink([{mlink:"https://ah88dj.mlinks.cc/Acej?id="+this.id,button:document.querySelector("a#btnOpenApp1"),autoLaunchApp:!1}])},methods:{fetchData:function(t){var e=this,n=this;a.default.httpGet(c.default,HOST+"/api/items/"+t+".json",{},function(t){e.loadingshow=!1,e.itemsinfo=t,0!=e.itemsinfo.status?(e.failedmsg=e.itemsinfo.error,e.failedshow=!0):(document.title=t.name,e.itemsinfo=t,e.showContent=!0)},function(t){e.loadingshow=!1,e.failedshow=!0,console.log(t)}),setTimeout(function(){n.loadingshow=!1},1e4)},toDetail:function(t){window.location.href="/m/detail.html?id="+t},logErr:function(t){this.$vux.alert.show({title:"提示",content:t,dialogTransition:"",maskTransition:"",onShow:function(){},onHide:function(){}})},confirm:function(){window.location.href="/m/privilege-confirm.html?id="+this.id}},filters:{formatDate2:function(t){var e=new Date(t),n=new Date;return(0,d.formatDate2)(new Date(t),"yyyy")-(0,d.formatDate2)(n,"yyyy")<0?(0,d.formatDate2)(e,"yyyy年MM月dd日"):(0,d.formatDate2)(e,"MM月dd日")},currency:function(t){return Number(t).toFixed(2)}}}},429:function(t,e){},523:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"good"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.showContent,expression:"showContent"}],staticClass:"content"},[n("swiper",{attrs:{loop:"","dots-position":"center",height:"480px"}},t._l(t.itemsinfo.images,function(t,e){return n("swiper-item",{key:e,staticClass:"swiper-demo-img"},[n("img",{attrs:{src:t}})])})),t._v(" "),n("div",{staticClass:"header vux-1px-b"},[n("div",{staticClass:"name"},[t._v("\n          "+t._s(t.itemsinfo.name)+"\n        ")]),t._v(" "),n("div",{staticClass:"info"},[n("span",{staticClass:"price"},[t._v("\n            ¥ "+t._s(t._f("currency")(t.itemsinfo.price))+"\n          ")]),t._v(" "),n("span",{staticClass:"count"},[t._v("\n            剩余: "+t._s(t.itemsinfo.store_count)+"件\n          ")])])]),t._v(" "),n("div",{staticClass:"detail",domProps:{innerHTML:t._s(t.itemsinfo.detail)}})],1),t._v(" "),n("footer",{directives:[{name:"show",rawName:"v-show",value:t.showContent,expression:"showContent"}]},[0==t.itemsinfo.price?n("div",{staticClass:"duihuan",on:{click:t.confirm}},[n("span",[t._v("免费领取")])]):n("a",{staticClass:"buy",attrs:{id:"btnOpenApp1"}},[n("span",[t._v("立即购买")])])]),t._v(" "),t._m(0),t._v(" "),t.failedshow?n("Failed",{attrs:{msg:t.failedmsg}}):t._e(),t._v(" "),n("Loading",{attrs:{text:t.loadtext},model:{value:t.loadingshow,callback:function(e){t.loadingshow=e},expression:"loadingshow"}})],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"qr_code_pc_inner"},[n("div",{staticClass:"qr_code_pc"},[n("img",{staticClass:"qr_code_pc_img",attrs:{id:"js_pc_qr_code_img",src:"https://www.kofuf.com/static/images/code.png"}}),t._v(" "),n("p",[t._v("微信扫一扫"),n("br"),t._v("学财经，长本事")])])])}]}},544:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-swiper-item"},[t._t("default")],2)},staticRenderFns:[]}},584:function(t,e,n){var i,o;i=n(299);var s=n(544);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=s.render,o.staticRenderFns=s.staticRenderFns,t.exports=i},625:function(t,e,n){var i,o;n(429),i=n(340);var s=n(523);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=s.render,o.staticRenderFns=s.staticRenderFns,t.exports=i}});