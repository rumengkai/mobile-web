webpackJsonp([14,0],{0:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}var o=n(1),a=i(o),s=n(409),r=i(s),l=n(10),c=i(l);a.default.use(c.default),new a.default({el:"#member-center",template:"<App/>",components:{App:r.default}})},2:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={ajaxPost:function(t,e,n,i){$.ajax({url:t,type:"POST",data:e,success:function(t){n(t)},error:function(t){i(t)}})},ajaxGet:function(){},httpPost:function(t,e,n,i,o){t.http.options.emulateJSON=!0,t.http.options.headers={"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},t.http.interceptors.push(function(t,e){t.headers.set("from","3"),t.headers.set("gid",localStorage.getItem("gid")),t.headers.set("token",localStorage.getItem("token")),t.headers.set("version",VERSION),e()}),t.http.post(e,n).then(function(t){return t.bodyText}).then(function(t){var t=JSON.parse(t);i(t)},function(t){o(t)})},httpGet:function(t,e,n,i,o){t.http.options.emulateJSON=!0,t.http.options.headers={"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},t.http.interceptors.push(function(t,e){t.headers.set("from","3"),t.headers.set("gid",localStorage.getItem("gid")),t.headers.set("token",localStorage.getItem("token")),t.headers.set("version",VERSION),e()}),t.http.get(e,n).then(function(t){return t.bodyText}).then(function(t){var t=JSON.parse(t);i(t)},function(t){o(t)})}}},3:function(t,e){},4:function(t,e,n){"use strict";!function(){var t=document.documentElement.clientWidth||document.body.clientWidth;t=t>640?640:t;var e=t/750*100;e=e<50?e:50,document.documentElement.style.fontSize=e+"px",t<350?window.phonetype="small":window.phonetype="large"}(),window.VERSION="0.1",window.HOST="http://api.kofuf.com",window.HOSTM="http://m.kofuf.com";var i=n(21);i.attach(document.body),window.getAuthLink=function(t){return"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx05e842991e5fa0b2&redirect_uri=http://api.kofuf.com%2Fapi%2Fsession%2Fauth_weixin&response_type=code&scope=snsapi_userinfo&state="+t+"#wechat_redirect"},window.getAuth=function(t,e,n,i){var o=t.get("gid"),a=e.parse();if(!localStorage.getItem("gid")||""==localStorage.getItem("gid"))if("undefined"!=typeof a.gid)localStorage.setItem("gid",a.gid),localStorage.setItem("token",a.token);else if("undefined"!=typeof o)localStorage.setItem("gid",t.get("gid")),localStorage.setItem("token",t.get("token"));else{var s;s=void 0!=i?n+"_"+i:n,window.location.href=getAuthLink(s)}},window.clearcookie=function(t){localStorage.clear(),t.set("gid",0,{domain:".kofuf.com",path:"/",expires:-1}),t.set("token",0,{domain:".kofuf.com",path:"/",expires:-1})}},5:function(t,e){"use strict";function n(){var t=window.navigator.userAgent.toLowerCase();return"micromessenger"==t.match(/MicroMessenger/i)}function i(){var t,e,n,i;return t=document.documentElement.scrollLeft||document.body.scrollLeft,e=document.documentElement.scrollTop||document.body.scrollTop,n=document.documentElement.clientWidth,i=document.documentElement.clientHeight,{left:t,top:e,width:n,height:i}}function o(){var t,e;return t=document.body.clientHeight,e=document.body.scrollTop,{top:e,height:t}}function a(t,e){var n="http://dev.kofuf.com/api/session/share_weixin_config?url="+encodeURIComponent(window.location.href.split("#")[0]);t.http.get(n).then(function(t){return t.bodyText}).then(function(t){var t=JSON.parse(t);wx.config({debug:!1,appId:t.appId,timestamp:t.timestamp,nonceStr:t.nonceStr,signature:t.signature,jsApiList:["checkJsApi","onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo"]})},function(t){error(t)}),wx.ready(function(){var t=shareData.title,e=shareData.link,n=shareData.imgUrl,i=shareData.desc;wx.onMenuShareTimeline({title:t,link:e,imgUrl:n,success:function(){},cancel:function(){}}),wx.onMenuShareAppMessage({title:t,desc:i,link:e,imgUrl:n,type:"link",success:function(){},cancel:function(){}}),wx.onMenuShareQZone({title:t,desc:i,link:e,imgUrl:n,success:function(){},cancel:function(){}}),wx.onMenuShareQQ({title:t,desc:i,link:e,imgUrl:n,success:function(){},cancel:function(){}})})}Object.defineProperty(e,"__esModule",{value:!0}),e.isWeiXin=n,e.getClient=i,e.getBody=o,e.weixinShare=a},6:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{value:{type:Boolean,default:!1},text:String,position:String},created:function(){this.show=this.value},data:function(){return{show:!1}},watch:{value:function(t){this.show=t},show:function(t){this.$emit("input",t)}}}},7:function(t,e){},8:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:"vux-mask"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"weui-loading_toast"},[n("div",{staticClass:"weui-mask_transparent"}),t._v(" "),n("div",{staticClass:"weui-toast",style:{position:t.position}},[n("i",{staticClass:"weui-loading weui-icon_toast"}),t._v(" "),n("p",{staticClass:"weui-toast__content"},[t._v(t._s(t.text||"加载中")),t._t("default")],2)])])])},staticRenderFns:[]}},9:function(t,e,n){var i,o;n(7),i=n(6);var a=n(8);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=i},17:function(t,e,n){var i,o;n(20);var a=n(23);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=i},18:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{title:String,titleColor:String,labelWidth:String,labelAlign:String,labelMarginRight:String,gutter:String}}},19:function(t,e){},20:function(t,e){},22:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.title?n("div",{staticClass:"weui-cells__title",style:{color:t.titleColor},domProps:{innerHTML:t._s(t.title)}}):t._e(),t._v(" "),n("div",{staticClass:"weui-cells",class:{"vux-no-group-title":!t.title},style:{marginTop:t.gutter}},[t._t("after-title"),t._v(" "),t._t("default")],2)])},staticRenderFns:[]}},23:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",{staticClass:"vux-label-desc"},[t._t("default")],2)},staticRenderFns:[]}},24:function(t,e,n){var i,o;n(19),i=n(18);var a=n(22);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=i},25:function(t,e){},26:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(36),a=i(o);e.default={components:{XDialog:a.default},created:function(){"undefined"!=typeof this.value&&(this.showValue=this.value)},props:{value:Boolean,title:String,content:String,buttonText:String,maskTransition:{type:String,default:"vux-mask"},dialogTransition:{type:String,default:"vux-dialog"}},data:function(){return{showValue:!1}},methods:{_onHide:function(){this.showValue=!1}},watch:{value:function(t){this.showValue=t},showValue:function(t){this.$emit("input",t)}}}},27:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(17),a=i(o),s=n(46),r=n(50),l=i(r);e.default={components:{InlineDesc:a.default},props:(0,l.default)(),computed:{valueClass:function(){return{"vux-cell-primary":"content"===this.primary||"left"===this.valueAlign,"vux-cell-align-left":"left"===this.valueAlign,"vux-cell-arrow-transition":!!this.arrowDirection,"vux-cell-arrow-up":"up"===this.arrowDirection,"vux-cell-arrow-down":"down"===this.arrowDirection}}},methods:{getLabelStyles:function(){return{width:this.$parent.labelWidth||this.$parent.$parent.labelWidth,textAlign:this.$parent.labelAlign||this.$parent.$parent.labelAlign,marginRight:this.$parent.labelMarginRight||this.$parent.$parent.labelMarginRight}},onClick:function(){(0,s.go)(this.link,this.$router)}}}},28:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{value:{type:Boolean,default:!1},maskTransition:{type:String,default:"vux-mask"},dialogTransition:{type:String,default:"vux-dialog"},hideOnBlur:Boolean,scroll:{type:Boolean,default:!0}},created:function(){"undefined"!=typeof this.value&&(this.currentValue=this.value)},watch:{value:{handler:function(t){this.currentValue=t},immediate:!0},currentValue:function(t){this.$emit(t?"on-show":"on-hide"),this.$emit("input",t)}},data:function(){return{currentValue:!1}},methods:{onTouchMove:function(t){!this.scroll&&t.preventDefault()}}}},29:function(t,e){},30:function(t,e){},31:function(t,e){},32:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-x-dialog",on:{touchmove:t.onTouchMove}},[n("transition",{attrs:{name:t.maskTransition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.currentValue,expression:"currentValue"}],staticClass:"weui-mask",on:{click:function(e){t.hideOnBlur&&(t.currentValue=!1)}}})]),t._v(" "),n("transition",{attrs:{name:t.dialogTransition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.currentValue,expression:"currentValue"}],staticClass:"weui-dialog"},[t._t("default")],2)])],1)},staticRenderFns:[]}},33:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-alert"},[n("x-dialog",{attrs:{"mask-transition":t.maskTransition,"dialog-transition":t.dialogTransition},on:{"on-hide":function(e){t.$emit("on-hide")},"on-show":function(e){t.$emit("on-show")}},model:{value:t.showValue,callback:function(e){t.showValue=e},expression:"showValue"}},[n("div",{staticClass:"weui-dialog__hd"},[n("strong",{staticClass:"weui-dialog__title"},[t._v(t._s(t.title))])]),t._v(" "),n("div",{staticClass:"weui-dialog__bd"},[t._t("default",[n("div",{domProps:{innerHTML:t._s(t.content)}})])],2),t._v(" "),n("div",{staticClass:"weui-dialog__ft"},[n("a",{staticClass:"weui-dialog__btn weui-dialog__btn_primary",attrs:{href:"javascript:;"},on:{click:t._onHide}},[t._v(t._s(t.buttonText||"确定"))])])])],1)},staticRenderFns:[]}},34:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"weui-cell",class:{"vux-tap-active":t.isLink||!!t.link,"weui-cell_access":t.isLink||!!t.link,"vux-cell-no-border-intent":!t.borderIntent},on:{click:t.onClick}},[n("div",{staticClass:"weui-cell__hd"},[t._t("icon")],2),t._v(" "),n("div",{staticClass:"vux-cell-bd",class:{"vux-cell-primary":"title"===t.primary&&"left"!==t.valueAlign}},[n("p",[t.title?n("label",{staticClass:"vux-label",style:t.getLabelStyles()},[t._v(t._s(t.title))]):t._e(),t._v(" "),t._t("after-title")],2),t._v(" "),n("inline-desc",[t._t("inline-desc",[t._v(t._s(t.inlineDesc))])],2)],1),t._v(" "),n("div",{staticClass:"weui-cell__ft",class:t.valueClass},[t._t("value"),t._v(" "),t._t("default",[t._v(t._s(t.value))]),t._v(" "),t.isLoading?n("i",{staticClass:"weui-loading"}):t._e()],2),t._v(" "),t._t("child")],2)},staticRenderFns:[]}},35:function(t,e,n){var i,o;n(31),i=n(27);var a=n(34);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=i},36:function(t,e,n){var i,o;n(29),i=n(28);var a=n(32);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=i},52:function(t,e,n){var i,o;n(30),i=n(26);var a=n(33);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=i},54:function(t,e){"use strict";function n(t,e,n){console.log("发起微信支付"),"undefined"==typeof WeixinJSBridge?(document.addEventListener?document.addEventListener("WeixinJSBridgeReady",i,!1):document.attachEvent&&(document.attachEvent("WeixinJSBridgeReady",i),document.attachEvent("onWeixinJSBridgeReady",i)),n.$vux.alert.show({title:"提示",content:"请在微信中打开",dialogTransition:"",maskTransition:"",onShow:function(){},onHide:function(){}}),n.disable=!0):i(t,e,n)}function i(t,e,n){WeixinJSBridge.invoke("getBrandWCPayRequest",{appId:t.app_id,timeStamp:t.timestamp,nonceStr:t.nonce_str,package:"prepay_id="+t.prepay_id,signType:"MD5",paySign:t.sign},function(i){console.log(i),"get_brand_wcpay_request:ok"==i.err_msg?e(t):"get_brand_wcpay_request:fail"==i.err_msg?(n.disable=!0,n.$vux.alert.show({title:"",content:"由于跨号支付，请关注'功夫财经'公众号'，下载APP购买",dialogTransition:"",maskTransition:""})):(n.disable=!0,n.$vux.alert.show({title:"",content:"支付取消",dialogTransition:"",maskTransition:""}))})}Object.defineProperty(e,"__esModule",{value:!0}),e.toPay=n},123:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(1);i(o);e.default={name:"titlebar",props:{title:String,more:String,url:String,line:String,img:String},data:function(){return{}},components:{},mounted:function(){},methods:{toskip:function(){window.location.href=this.url}}}},145:function(t,e){},163:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"titlebar"}},[n("div",{staticClass:"con"},[t.img?n("img",{staticClass:"img",attrs:{src:t.img,alt:"."}}):t._e(),t._v(" "),n("span",{domProps:{innerHTML:t._s(t.title)}}),t._v(" "),t.more?n("span",{staticClass:"more",domProps:{innerHTML:t._s(t.more)},on:{click:t.toskip}}):t._e(),t._v(" "),t.more?n("span",{staticClass:"nstep"}):t._e()]),t._v(" "),t.line?n("div",{staticClass:"line vux-1px-b"}):t._e()])},staticRenderFns:[]}},178:function(t,e,n){var i,o;n(145),i=n(123);var a=n(163);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=i},232:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),n(3),n(4);var o=n(2),a=i(o),s=n(5),r=(n(54),n(178)),l=i(r),c=n(24),u=i(c),d=n(35),f=i(d),p=n(9),h=i(p),v=n(49),_=i(v),m=n(38),g=(i(m),n(39)),w=(i(g),n(1)),y=i(w);y.default.use(_.default),e.default={name:"member-center",data:function(){return{id:0,showContent:!1,loadingshow:!0,loadtext:"加载中...",dataInfo:{},channelsList:[],goodsList:[]}},components:{Group:u.default,Cell:f.default,Loading:h.default,TitleBar:l.default},created:function(){(0,s.isWeiXin)()&&this.fetchData()},methods:{fetchData:function(t){var e=this;a.default.httpGet(y.default,HOST+"/api/users/my_privileges",{},function(t){0==t.status&&(e.loadingshow=!1,e.showContent=!0,e.dataInfo=t,t.items.map(function(t){"channel"==t.type&&(e.channelsList=t.items),"goods"==t.type&&(e.goodsList=t.items)}))}),function(t){console.log(t)}},toChannel:function(t){window.location.href="/m/channel.html?id="+t.id},activeTicket:function(){console.log("年终盛典门票")},toGood:function(t){console.log(t),console.log("商品")}}}},308:function(t,e){},361:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"member-center"}},[t.showContent?n("div",{staticClass:"content"},[n("group",{staticClass:"header"},[n("cell",{attrs:{title:"年中盛典门票","is-link":""},nativeOn:{click:function(e){t.activeTicket(e)}}},[n("span",[t._v("已过期")])])],1),t._v(" "),n("TitleBar",{attrs:{title:"专栏折扣价",more:"查看更多",line:"",url:"/m/channels.html"}}),t._v(" "),n("div",{staticClass:"channels-list"},[n("ul",t._l(t.channelsList,function(e,i){return i<3?n("li",{on:{click:function(n){t.toChannel(e)}}},[n("div",{staticClass:"img"},[n("img",{attrs:{src:e.thumb,alt:""}}),t._v(" "),n("p",{staticClass:"channel-name",domProps:{innerHTML:t._s(e.name)}})]),t._v(" "),n("p",[e.followed?t._e():n("span",{staticClass:"price"},[t._v("已订阅")]),t._v(" "),e.followed?n("span",{staticClass:"price"},[t._v("¥"+t._s(e.channel_price))]):t._e(),t._v(" "),e.followed?n("s",{staticClass:"proprice"},[t._v("¥"+t._s(e.price))]):t._e()])]):t._e()})),t._v(" "),n("ul",t._l(t.channelsList,function(e,i){return i>=3&&i<6?n("li",{on:{click:function(n){t.toChannel(e)}}},[n("div",{staticClass:"img"},[n("img",{attrs:{src:e.thumb,alt:""}}),t._v(" "),n("p",{staticClass:"channel-name",domProps:{innerHTML:t._s(e.name)}})]),t._v(" "),n("p",[e.followed?t._e():n("span",{staticClass:"price"},[t._v("已订阅")]),t._v(" "),e.followed?n("span",{staticClass:"price"},[t._v("¥"+t._s(e.channel_price))]):t._e(),e.followed?n("s",{staticClass:"proprice"},[t._v("¥"+t._s(e.price))]):t._e()])]):t._e()}))]),t._v(" "),n("div",{staticClass:"goods-list"},t._l(t.goodsList,function(e){return n("group",{staticClass:"header"},[n("cell",{attrs:{title:e.name,"is-link":""},nativeOn:{click:function(n){t.toGood(e)}}},[0==e.state?n("span",[t._v("未兑换")]):t._e(),t._v(" "),1==e.state?n("span",[t._v("未兑换")]):t._e()])],1)}))],1):t._e(),t._v(" "),n("Loading",{attrs:{text:t.loadtext},model:{value:t.loadingshow,callback:function(e){t.loadingshow=e},expression:"loadingshow"}})],1)},staticRenderFns:[]}},409:function(t,e,n){var i,o;n(308),i=n(232);var a=n(361);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=i}});