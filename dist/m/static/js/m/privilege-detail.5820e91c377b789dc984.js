webpackJsonp([28,0],{0:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}var o=n(1),a=i(o),s=n(680),r=i(s),l=n(29),u=i(l);a.default.use(u.default),new a.default({el:"#privilege-detail",template:"<App/>",components:{App:r.default}})},2:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function o(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"提示",n=arguments[2];p.default.$vux.alert.show({title:e,content:t,dialogTransition:"",maskTransition:"",onHide:function(){"function"==typeof n&&n()}})}function a(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:5e3,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"bottom";p.default.$vux.toast.show({text:t,time:e,width:"auto",type:"text",position:n})}function s(t){return t.replace(/\n/g,"<br/>")}function r(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"功夫财经",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"http://m.51xy8.com/m/home.html",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"http://m.51xy8.com/static/img_h5/h5_logo.png",i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"国民财商提升者";console.log(window),window.shareData={title:t,link:e,imgUrl:n,desc:i}}Object.defineProperty(e,"__esModule",{value:!0}),e.message=o,e.toast=a,e.stringBr=s,e.shareData=r;var l=n(23),u=i(l),c=n(30),d=i(c),f=n(1),p=i(f);p.default.use(u.default),p.default.use(d.default)},3:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(1);i(o);e.default={ajaxPost:function(t,e,n,i){$.ajax({url:t,type:"POST",data:e,success:function(t){n(t)},error:function(t){i(t)}})},ajaxGet:function(){},httpPost:function(t,e,n,i,o){t.http.options.emulateJSON=!0,t.http.options.headers={"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},t.http.interceptors.push(function(t,e){t.headers.set("from",config().from),t.headers.set("gid",config().gid),t.headers.set("token",config().token),t.headers.set("version",VERSION),e()}),t.http.post(e,n).then(function(t){return t.bodyText}).then(function(t){var t=JSON.parse(t);i(t)},function(t){o(t)||console.log(t)})},httpGet:function(t,e,n,i,o){t.http.options.emulateJSON=!0,t.http.options.headers={"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},t.http.interceptors.push(function(t,e){t.headers.set("from",config().from),t.headers.set("gid",config().gid),t.headers.set("token",config().token),t.headers.set("version",VERSION),e()}),t.http.get(e,{params:n}).then(function(t){return t.bodyText}).then(function(t){var t=JSON.parse(t);i(t)},function(t){o(t)||console.log(t)})}}},4:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(45),a=i(o),s=n(43),r=i(s),l=n(11),u=n(1),c=(i(u),n(2)),d=r.default.create({baseURL:"http://dev.51xy8.com",timeout:15e3,headers:{"Content-Type":"application/x-www-form-urlencoded"}});d.interceptors.request.use(function(t){return t.headers.token=(0,l.getToken)(),t.headers.gid=(0,l.getGid)(),t.headers.from=(0,l.getFrom)(),t},function(t){console.log(t),a.default.reject(t)}),d.interceptors.response.use(function(t){var e=t.data;return 0!==e.status?((0,c.toast)(e.error),a.default.reject({error:e})):e},function(t){return console.log("err"+t),(0,c.toast)(t.message),a.default.reject(t)}),e.default=d},5:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function o(){var t=window.navigator.userAgent.toLowerCase();return"micromessenger"==t.match(/MicroMessenger/i)}function a(){var t,e,n,i;return t=document.documentElement.scrollLeft||document.body.scrollLeft,e=document.documentElement.scrollTop||document.body.scrollTop,n=document.documentElement.clientWidth,i=document.documentElement.clientHeight,{left:t,top:e,width:n,height:i}}function s(){var t,e;return t=document.body.clientHeight,e=document.body.scrollTop,{top:e,height:t}}function r(t,e){var n=HOST+"/api/session/share_weixin_config?url="+encodeURIComponent(window.location.href.split("#")[0]);(0,p.default)({url:n,method:"get",params:{}}).then(function(t){wx.config({debug:!1,appId:t.appId,timestamp:t.timestamp,nonceStr:t.nonceStr,signature:t.signature,jsApiList:["checkJsApi","onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo"]})}),wx.ready(function(){var t=shareData.title,e=shareData.link,n=shareData.imgUrl,i=shareData.desc;wx.onMenuShareTimeline({title:t,link:e,imgUrl:n,success:function(){},cancel:function(){}}),wx.onMenuShareAppMessage({title:t,desc:i,link:e,imgUrl:n,type:"link",success:function(){},cancel:function(){}}),wx.onMenuShareQZone({title:t,desc:i,link:e,imgUrl:n,success:function(){},cancel:function(){}}),wx.onMenuShareQQ({title:t,desc:i,link:e,imgUrl:n,success:function(){},cancel:function(){}})})}function l(t){var e={ORDER_TYPE_COMPOISITE_CHANNEL:3,ORDER_TYPE_CHANNEL_GOODS:4,ORDER_TYPE_WALLET:6,ORDER_TYPE_MEMBER:7,ORDER_TYPE_MEMBER_GOODS:8,ORDER_TYPE_SMALL_CHANNEL:9,ORDER_TYPE_GIFT:10,ORDER_TYPE_BOOK:11,ORDER_TYPE_BOOKLIST:12,ORDER_TYPE_LEVEL_UPDATE:13,ORDER_TYPE_TEACHER_BOOK:14,ORDER_TYPE_TEACHER_BOOKLIST:15,ORDER_TYPE_:16};return e[t]}function u(){var t=navigator.userAgent,e=t.indexOf("Android")>-1||t.indexOf("Adr")>-1,n=!!t.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);return!(!e&&!n)}function c(){var t=navigator.userAgent,e=t.indexOf("Android")>-1||t.indexOf("Adr")>-1;return!!e}function d(){var t=navigator.userAgent,e=!!t.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);return!!e}Object.defineProperty(e,"__esModule",{value:!0}),e.isWeiXin=o,e.getClient=a,e.getBody=s,e.weixinShare=r,e.getOrderType=l,e.isMobile=u,e.isAndroid=c,e.isiOS=d;var f=n(4),p=i(f)},6:function(t,e,n){"use strict";!function(){var t=document.documentElement.clientWidth||document.body.clientWidth;t=t>640?640:t;var e=t/750*100;e=e<60?e:60,document.documentElement.style.fontSize=e+"px",t<350?window.phonetype="small":window.phonetype="large"}(),document.write('<script src="https://s19.cnzz.com/z_stat.php?id=1262435637&web_id=1262435637" language="JavaScript"></script>'),document.write('<script src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js" charset="utf-8"></script>'),window.base="dev","pro"==base?(window.VERSION="0.1",window.HOST="http://api.51xy8.com",window.HOSTM="http://m.51xy8.com",window.HOSTA="http://api.51xy8.com",window.appid="wx05e842991e5fa0b2",localStorage.setItem("from","3"),window.config=function(){return{paytype:"JSAPI",from:localStorage.getItem("from"),gid:localStorage.getItem("gid"),token:localStorage.getItem("token")}}):(window.VERSION="0.1",window.HOST="http://123.57.35.40",window.HOSTM="http://dev.51xy8.com",window.HOSTA="http://dev.51xy8.com",window.appid="wx0a542ef9d4d41cef",localStorage.setItem("from","3"),window.config=function(){return{paytype:"JSAPI",from:localStorage.getItem("from"),gid:localStorage.getItem("gid"),token:localStorage.getItem("token")}}),window.shareData={title:"功夫财经",link:HOSTM+"/m/home.html",imgUrl:"http://m.51xy8.com/static/img_h5/h5_logo.png",desc:"功夫财经致力于联动最出色的财经学者，提供最优质的原创内容，打造中国规模最大的、粘性最高的财富命运共同体，以新型金融服务平台为终极己任，解决中产焦虑，提升国民财商。 "};var i=n(40);i.attach(document.body),window.getAuthLink=function(t){return"https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri="+HOSTA+"%2Fapi%2Fsession%2Fauth_weixin&response_type=code&scope=snsapi_userinfo&state="+t+"#wechat_redirect"},window.getAuth=function(t,e,n,i){var o=t.get("gid"),a=e.parse();if(!localStorage.getItem("gid")||""==localStorage.getItem("gid"))if("undefined"!=typeof a.gid)localStorage.setItem("gid",a.gid),localStorage.setItem("token",a.token);else if("undefined"!=typeof o)localStorage.setItem("gid",t.get("gid")),localStorage.setItem("token",t.get("token"));else{var s;s=void 0!=i&&""!=i?n+"_"+i:n,s=s?s:"",window.location.href=getAuthLink(s)}},window.clearcookie=function(t){localStorage.clear(),t.set("gid",0,{domain:".51xy8.com",path:"/",expires:-1}),t.set("token",0,{domain:".51xy8.com",path:"/",expires:-1})}},7:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(42),a=i(o);e.default={name:"toast",mixins:[a.default],props:{value:Boolean,time:{type:Number,default:2e3},type:{type:String,default:"success"},transition:String,width:{type:String,default:"7.6em"},isShowMask:{type:Boolean,default:!1},text:String,position:String},data:function(){return{show:!1}},created:function(){this.value&&(this.show=!0)},computed:{currentTransition:function(){return this.transition?this.transition:"top"===this.position?"vux-slide-from-top":"bottom"===this.position?"vux-slide-from-bottom":"vux-fade"},toastClass:function(){return{"weui-toast_forbidden":"warn"===this.type,"weui-toast_cancel":"cancel"===this.type,"weui-toast_success":"success"===this.type,"weui-toast_text":"text"===this.type,"vux-toast-top":"top"===this.position,"vux-toast-bottom":"bottom"===this.position,"vux-toast-middle":"middle"===this.position}},style:function(){if("text"===this.type&&"auto"===this.width)return{padding:"10px"}}},watch:{show:function(t){var e=this;t&&(this.$emit("input",!0),this.$emit("on-show"),this.fixSafariOverflowScrolling("auto"),clearTimeout(this.timeout),this.timeout=setTimeout(function(){e.show=!1,e.$emit("input",!1),e.$emit("on-hide"),e.fixSafariOverflowScrolling("touch")},this.time))},value:function(t){this.show=t}}}},8:function(t,e){},9:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-toast"},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowMask&&t.show,expression:"isShowMask && show"}],staticClass:"weui-mask_transparent"}),t._v(" "),n("transition",{attrs:{name:t.currentTransition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"weui-toast",class:t.toastClass,style:{width:t.width}},[n("i",{directives:[{name:"show",rawName:"v-show",value:"text"!==t.type,expression:"type !== 'text'"}],staticClass:"weui-icon-success-no-circle weui-icon_toast"}),t._v(" "),t.text?n("p",{staticClass:"weui-toast__content",style:t.style,domProps:{innerHTML:t._s(t.text)}}):n("p",{staticClass:"weui-toast__content",style:t.style},[t._t("default")],2)])])],1)},staticRenderFns:[]}},10:function(t,e,n){var i,o;n(15),i=n(13);var a=n(17);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=i},11:function(t,e){"use strict";function n(){return localStorage.getItem(f)}function i(t){return localStorage.setItem(f,t)}function o(){return localStorage.removeItem(f)}function a(){return localStorage.getItem(p)}function s(t){return localStorage.setItem(p,t)}function r(){return localStorage.removeItem(p)}function l(){return localStorage.getItem(h)||3}function u(t){return localStorage.setItem(h,t)}function c(){return localStorage.removeItem(h)}function d(){return localStorage.getItem(m)}Object.defineProperty(e,"__esModule",{value:!0}),e.getToken=n,e.setToken=i,e.removeToken=o,e.getGid=a,e.setGid=s,e.removeGid=r,e.getFrom=l,e.setFrom=u,e.removeFrom=c,e.getVersion=d;var f="token",p="gid",h="from",m="version"},12:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(10),a=i(o);e.default={name:"alert",components:{XDialog:a.default},created:function(){"undefined"!=typeof this.value&&(this.showValue=this.value)},props:{value:Boolean,title:String,content:String,buttonText:String,hideOnBlur:{type:Boolean,default:!1},maskTransition:{type:String,default:"vux-mask"},dialogTransition:{type:String,default:"vux-dialog"},maskZIndex:[Number,String]},data:function(){return{showValue:!1}},methods:{_onHide:function(){this.showValue=!1}},watch:{value:function(t){this.showValue=t},showValue:function(t){this.$emit("input",t)}}}},13:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(44),a=i(o);e.default={mixins:[a.default],name:"x-dialog",model:{prop:"show",event:"change"},props:{show:{type:Boolean,default:!1},maskTransition:{type:String,default:"vux-mask"},maskZIndex:[String,Number],dialogTransition:{type:String,default:"vux-dialog"},dialogClass:{type:String,default:"weui-dialog"},hideOnBlur:Boolean,dialogStyle:Object,scroll:{type:Boolean,default:!0,validator:function(t){return!0}}},computed:{maskStyle:function(){if("undefined"!=typeof this.maskZIndex)return{zIndex:this.maskZIndex}}},mounted:function(){"undefined"!=typeof window&&window.VUX_CONFIG&&"VIEW_BOX"===window.VUX_CONFIG.$layout&&(this.layout="VIEW_BOX")},watch:{show:function(t){this.$emit("update:show",t),this.$emit(t?"on-show":"on-hide"),t?this.addModalClassName():this.removeModalClassName()}},methods:{shouldPreventScroll:function(){var t=/iPad|iPhone|iPod/i.test(window.navigator.userAgent),e=this.$el.querySelector("input")||this.$el.querySelector("textarea");if(t&&e)return!0},hide:function(){this.hideOnBlur&&(this.$emit("update:show",!1),this.$emit("change",!1),this.$emit("on-click-mask"))}},data:function(){return{layout:""}}}},14:function(t,e){},15:function(t,e){},16:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-alert"},[n("x-dialog",{attrs:{"mask-transition":t.maskTransition,"dialog-transition":t.dialogTransition,"hide-on-blur":t.hideOnBlur,"mask-z-index":t.maskZIndex},on:{"on-hide":function(e){t.$emit("on-hide")},"on-show":function(e){t.$emit("on-show")}},model:{value:t.showValue,callback:function(e){t.showValue=e},expression:"showValue"}},[n("div",{staticClass:"weui-dialog__hd"},[n("strong",{staticClass:"weui-dialog__title"},[t._v(t._s(t.title))])]),t._v(" "),n("div",{staticClass:"weui-dialog__bd"},[t._t("default",[n("div",{domProps:{innerHTML:t._s(t.content)}})])],2),t._v(" "),n("div",{staticClass:"weui-dialog__ft"},[n("a",{staticClass:"weui-dialog__btn weui-dialog__btn_primary",attrs:{href:"javascript:;"},on:{click:t._onHide}},[t._v(t._s(t.buttonText||"确定"))])])])],1)},staticRenderFns:[]}},17:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-x-dialog",class:{"vux-x-dialog-absolute":"VIEW_BOX"===t.layout}},[n("transition",{attrs:{name:t.maskTransition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"weui-mask",style:t.maskStyle,on:{click:t.hide}})]),t._v(" "),n("transition",{attrs:{name:t.dialogTransition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],class:t.dialogClass,style:t.dialogStyle},[t._t("default")],2)])],1)},staticRenderFns:[]}},18:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"loading",model:{prop:"show",event:"change"},props:{show:Boolean,text:String,position:String,transition:{type:String,default:"vux-mask"}},watch:{show:function(t){this.$emit("update:show",t)}}}},19:function(t,e){},20:function(t,e){},21:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:t.transition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"weui-loading_toast vux-loading"},[n("div",{staticClass:"weui-mask_transparent"}),t._v(" "),n("div",{staticClass:"weui-toast",style:{position:t.position}},[n("i",{staticClass:"weui-loading weui-icon_toast"}),t._v(" "),n("p",{staticClass:"weui-toast__content"},[t._v(t._s(t.text||"加载中")),t._t("default")],2)])])])},staticRenderFns:[]}},22:function(t,e,n){var i,o;n(19),i=n(18);var a=n(21);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=i},24:function(t,e,n){var i,o;n(26),i=n(25);var a=n(27);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=i},25:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(28),a=i(o);e.default={name:"group",methods:{cleanStyle:a.default},props:{title:String,titleColor:String,labelWidth:String,labelAlign:String,labelMarginRight:String,gutter:[String,Number]}}},26:function(t,e){},27:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.title?n("div",{staticClass:"weui-cells__title",style:t.cleanStyle({color:t.titleColor}),domProps:{innerHTML:t._s(t.title)}}):t._e(),t._v(" "),t._t("title"),t._v(" "),n("div",{staticClass:"weui-cells",class:{"vux-no-group-title":!t.title},style:t.cleanStyle({marginTop:"number"==typeof t.gutter?t.gutter+"px":t.gutter})},[t._t("after-title"),t._v(" "),t._t("default")],2)],2)},staticRenderFns:[]}},31:function(t,e,n){var i,o;n(35),i=n(34);var a=n(37);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=i},32:function(t,e,n){var i,o;n(36),i=n(33);var a=n(38);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=i},33:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(31),a=i(o),s=n(50),r=n(67),l=i(r),u=n(28),c=i(u),d=n(68),f=i(d);e.default={name:"cell",components:{InlineDesc:a.default},props:(0,l.default)(),created:function(){},beforeMount:function(){this.hasTitleSlot=!!this.$slots.title,this.$slots.value,1},computed:{labelStyles:function(){return(0,c.default)({width:(0,f.default)(this,"labelWidth"),textAlign:(0,f.default)(this,"labelAlign"),marginRight:(0,f.default)(this,"labelMarginRight")})},valueClass:function(){return{"vux-cell-primary":"content"===this.primary||"left"===this.valueAlign,"vux-cell-align-left":"left"===this.valueAlign,"vux-cell-arrow-transition":!!this.arrowDirection,"vux-cell-arrow-up":"up"===this.arrowDirection,"vux-cell-arrow-down":"down"===this.arrowDirection}},labelClass:function(){return{"vux-cell-justify":"justify"===(0,f.default)(this,"justify")}},style:function(){if(this.alignItems)return{alignItems:this.alignItems}}},methods:{onClick:function(){!this.disabled&&(0,s.go)(this.link,this.$router)}},data:function(){return{hasTitleSlot:!0,hasMounted:!1}}}},34:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"inline-desc"}},35:function(t,e){},36:function(t,e){},37:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",{staticClass:"vux-label-desc"},[t._t("default")],2)},staticRenderFns:[]}},38:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"weui-cell",class:{"vux-tap-active":t.isLink||!!t.link,"weui-cell_access":t.isLink||!!t.link,"vux-cell-no-border-intent":!t.borderIntent,"vux-cell-disabled":t.disabled},style:t.style,on:{click:t.onClick}},[n("div",{staticClass:"weui-cell__hd"},[t._t("icon")],2),t._v(" "),n("div",{staticClass:"vux-cell-bd",class:{"vux-cell-primary":"title"===t.primary&&"left"!==t.valueAlign}},[n("p",[t.title||t.hasTitleSlot?n("label",{staticClass:"vux-label",class:t.labelClass,style:t.labelStyles},[t._t("title",[t._v(t._s(t.title))])],2):t._e(),t._v(" "),t._t("after-title")],2),t._v(" "),n("inline-desc",[t._t("inline-desc",[t._v(t._s(t.inlineDesc))])],2)],1),t._v(" "),n("div",{staticClass:"weui-cell__ft",class:t.valueClass},[t._t("value"),t._v(" "),t._t("default",[t._v(t._s(t.value))]),t._v(" "),t.isLoading?n("i",{staticClass:"weui-loading"}):t._e()],2),t._v(" "),t._t("child")],2)},staticRenderFns:[]}},39:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={getUrlKey:function(t){if("type"==t){var e=decodeURIComponent((new RegExp("[?|&]"+t+"=([^&;]+?)(&|#|;|$)").exec(location.href)||["",""])[1].replace(/\+/g,"%20"))||null;return e}if("code"==t){var e=decodeURIComponent((new RegExp("[?|&]"+t+"=([^&;]+?)(&|#|;|$)").exec(location.href)||["",""])[1].replace(/\+/g,"%20"))||null;return e}if("id"==t){var e=decodeURIComponent((new RegExp("[?|&]"+t+"=([^&;]+?)(&|#|;|$)").exec(location.href)||["",""])[1].replace(/\+/g,"%20"))||/\/\d{1,8}/.exec(location.href)[0].replace("/","")||null;return e}}}},41:function(t,e,n){var i,o;n(8),i=n(7);var a=n(9);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=i},46:function(t,e,n){var i,o;n(14),i=n(12);var a=n(16);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=i},49:function(t,e){},56:function(t,e){"use strict";function n(t,e,n){console.log("发起微信支付"),"undefined"==typeof window.WeixinJSBridge?(document.addEventListener?document.addEventListener("WeixinJSBridgeReady",i,!1):document.attachEvent&&(document.attachEvent("WeixinJSBridgeReady",i),document.attachEvent("onWeixinJSBridgeReady",i)),n.$vux.alert.show({title:"提示",content:"请稍后再试",dialogTransition:"",maskTransition:"",onShow:function(){},onHide:function(){}}),n.disable=!0):i(t,e,n)}function i(t,e,n){WeixinJSBridge.invoke("getBrandWCPayRequest",{appId:t.app_id,timeStamp:t.timestamp,nonceStr:t.nonce_str,package:"prepay_id="+t.prepay_id,signType:"MD5",paySign:t.sign},function(i){console.log(i),"get_brand_wcpay_request:ok"==i.err_msg?e(t):"get_brand_wcpay_request:fail"==i.err_msg?(n.disable=!0,n.$vux.alert.show({title:"",content:"由于跨号支付，请关注'功夫财经'公众号'，下载APP购买",dialogTransition:"",maskTransition:""})):(n.disable=!0,n.$vux.alert.show({title:"",content:"支付取消",dialogTransition:"",maskTransition:""}))})}Object.defineProperty(e,"__esModule",{value:!0}),e.toPay=n},90:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(1);i(o);e.default={name:"titlebar",props:{title:String,more:String,url:String,line:String,img:String,color:String},data:function(){return{}},components:{},mounted:function(){},methods:{toskip:function(){window.location.href=this.url}}}},92:function(t,e){},93:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"titlebar"}},[n("div",{staticClass:"con"},[t.img?n("img",{staticClass:"img",attrs:{src:t.img,alt:"."}}):t._e(),t._v(" "),n("span",{domProps:{innerHTML:t._s(t.title)}}),t._v(" "),t.more?n("span",{staticClass:"more",style:{color:t.color},domProps:{innerHTML:t._s(t.more)},on:{click:t.toskip}}):t._e(),t._v(" "),t.more?n("span",{staticClass:"nstep"}):t._e()]),t._v(" "),t.line?n("div",{staticClass:"line vux-1px-b"}):t._e()])},staticRenderFns:[]}},94:function(t,e,n){var i,o;n(92),i=n(90);var a=n(93);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=i},137:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"goodlist",props:{items:Array,line:{type:String,default:!0},dh:String},data:function(){return{loadtext:"loading...",phonetype:window.phonetype}},mounted:function(){console.log(this.line)},components:{},methods:{channelsDetail:function(t){window.location.href="channel.html?id="+t},toGood:function(t){},toConfirm:function(t){window.location.href="privilege-confirm.html?id="+t.id}}}},146:function(t,e){},158:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"goodlist"}},[0!=t.items.length?n("div",[n("div",{staticClass:"con"},t._l(t.items,function(e,i){return n("div",{key:i,staticClass:"good",class:{"vux-1px-b":t.line&&i!=t.items.length-1},on:{click:function(n){t.toGood(e,"dh")}}},[n("div",{staticClass:"img"},[n("img",{attrs:{src:e.thumb,alt:""}})]),t._v(" "),n("div",{staticClass:"info"},[n("p",{staticClass:"ell-2",domProps:{innerHTML:t._s(e.name)}}),t._v(" "),n("p",{staticClass:"price"},[t._v("原价："),n("span",[t._v("¥")]),t._v(t._s(e.price))]),t._v(" "),""!=t.dh?n("div",{staticClass:"dh",on:{click:function(n){n.stopPropagation(),t.toConfirm(e)}}},[t._v("\n            兑换\n          ")]):t._e()])])}))]):t._e()])},staticRenderFns:[]}},169:function(t,e,n){var i,o;n(146),i=n(137);var a=n(158);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=i},377:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),n(20),n(6);var o=n(3),a=i(o),s=n(169),r=i(s),l=n(39),u=i(l),c=n(5),d=(n(56),n(94)),f=i(d),p=n(24),h=i(p),m=n(32),g=i(m),v=n(22),_=i(v),w=n(23),y=i(w),x=n(47),S=(i(x),n(48)),b=(i(S),n(1)),T=i(b);T.default.use(y.default),T.default.prototype.$geturlpara=u.default,e.default={name:"privilege-detail",data:function(){return{id:0,showContent:!1,loadingshow:!0,loadtext:"加载中...",dataInfo:{},channelsList:[],goodsList:[]}},components:{Group:h.default,Cell:g.default,Loading:_.default,TitleBar:f.default,GoodList:r.default},created:function(){this.id=this.$geturlpara.getUrlKey("id"),(0,c.isWeiXin)(),this.fetchData(this.id)},methods:{fetchData:function(t){var e=this;console.log(t),a.default.httpGet(T.default,HOST+"/api/users/privilege_detail",{id:t},function(t){e.loadingshow=!1,0==t.status?(e.dataInfo=t,e.dataInfo.intro=e.dataInfo.intro.replace(/[\n]/g,"</br>"),document.title=e.dataInfo.name,e.showContent=!0):console.log(t.error)}),function(t){console.log(t)}}}}},459:function(t,e){},562:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"privilege-detail"}},[t.showContent?n("div",{staticClass:"content"},[n("div",{staticClass:"intro",domProps:{innerHTML:t._s(t.dataInfo.intro)}}),t._v(" "),n("GoodList",{attrs:{items:t.dataInfo.items,line:"line",dh:"dh"}})],1):t._e(),t._v(" "),n("Loading",{attrs:{text:t.loadtext},model:{value:t.loadingshow,callback:function(e){t.loadingshow=e},expression:"loadingshow"}})],1)},staticRenderFns:[]}},680:function(t,e,n){var i,o;n(459),i=n(377);var a=n(562);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=i}});