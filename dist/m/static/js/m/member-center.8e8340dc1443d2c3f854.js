webpackJsonp([14,0],{0:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}var o=n(1),a=i(o),s=n(495),r=i(s),c=n(10),l=i(c);a.default.use(l.default),new a.default({el:"#member-center",template:"<App/>",components:{App:r.default}})},2:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={ajaxPost:function(t,e,n,i){$.ajax({url:t,type:"POST",data:e,success:function(t){n(t)},error:function(t){i(t)}})},ajaxGet:function(){},httpPost:function(t,e,n,i,o){t.http.options.emulateJSON=!0,t.http.options.headers={"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},t.http.interceptors.push(function(t,e){t.headers.set("from",config().from),t.headers.set("gid",config().gid),t.headers.set("token",config().token),t.headers.set("version",VERSION),e()}),t.http.post(e,n).then(function(t){return t.bodyText}).then(function(t){var t=JSON.parse(t);i(t)},function(t){o(t)})},httpGet:function(t,e,n,i,o){t.http.options.emulateJSON=!0,t.http.options.headers={"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},t.http.interceptors.push(function(t,e){t.headers.set("from",config().from),t.headers.set("gid",config().gid),t.headers.set("token",config().token),t.headers.set("version",VERSION),e()}),t.http.get(e,{params:n}).then(function(t){return t.bodyText}).then(function(t){var t=JSON.parse(t);i(t)},function(t){o(t)})}}},3:function(t,e){},4:function(t,e,n){"use strict";!function(){var t=document.documentElement.clientWidth||document.body.clientWidth;t=t>640?640:t;var e=t/750*100;e=e<50?e:50,document.documentElement.style.fontSize=e+"px",t<350?window.phonetype="small":window.phonetype="large"}(),window.base="dev","pro"==base?(window.VERSION="0.1",window.HOST="https://api.kofuf.com",window.HOSTM="https://m.kofuf.com",window.HOSTA="https://api.kofuf.com",window.appid="wx05e842991e5fa0b2",window.config=function(){return{paytype:"JSAPI",from:"3",gid:localStorage.getItem("gid"),token:localStorage.getItem("token")}}):(window.VERSION="0.1",window.HOST="https://dev.kofuf.com",window.HOSTM="https://dev.kofuf.com",window.HOSTA="https://dev.kofuf.com",window.appid="wx0a542ef9d4d41cef",window.config=function(){return{paytype:"JSAPI",from:"3",gid:localStorage.getItem("gid"),token:localStorage.getItem("token")}}),window.shareData={title:"功夫财经",link:HOSTM+"/m/home.html",imgUrl:"http://m.kofuf.com/static/img_h5/h5_logo.png",desc:"功夫财经致力于联动最出色的财经学者，提供最优质的原创内容，打造中国规模最大的、粘性最高的财富命运共同体，以新型金融服务平台为终极己任，解决中产焦虑，提升国民财商。 "};var i=n(30);i.attach(document.body),window.getAuthLink=function(t){return"https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri="+HOSTA+"%2Fapi%2Fsession%2Fauth_weixin&response_type=code&scope=snsapi_userinfo&state="+t+"#wechat_redirect"},window.getAuth=function(t,e,n,i){var o=t.get("gid"),a=e.parse();if(!localStorage.getItem("gid")||""==localStorage.getItem("gid"))if("undefined"!=typeof a.gid)localStorage.setItem("gid",a.gid),localStorage.setItem("token",a.token);else if("undefined"!=typeof o)localStorage.setItem("gid",t.get("gid")),localStorage.setItem("token",t.get("token"));else{var s;s=void 0!=i&&""!=i?n+"_"+i:n,s=s?s:"",window.location.href=getAuthLink(s)}},window.clearcookie=function(t){localStorage.clear(),t.set("gid",0,{domain:".kofuf.com",path:"/",expires:-1}),t.set("token",0,{domain:".kofuf.com",path:"/",expires:-1})}},5:function(t,e){"use strict";function n(){var t=window.navigator.userAgent.toLowerCase();return"micromessenger"==t.match(/MicroMessenger/i)}function i(){var t,e,n,i;return t=document.documentElement.scrollLeft||document.body.scrollLeft,e=document.documentElement.scrollTop||document.body.scrollTop,n=document.documentElement.clientWidth,i=document.documentElement.clientHeight,{left:t,top:e,width:n,height:i}}function o(){var t,e;return t=document.body.clientHeight,e=document.body.scrollTop,{top:e,height:t}}function a(t,e){var n=HOST+"/api/session/share_weixin_config?url="+encodeURIComponent(window.location.href.split("#")[0]);t.http.get(n).then(function(t){return t.bodyText}).then(function(t){var t=JSON.parse(t);wx.config({debug:!1,appId:t.appId,timestamp:t.timestamp,nonceStr:t.nonceStr,signature:t.signature,jsApiList:["checkJsApi","onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo"]})},function(t){error(t)}),wx.ready(function(){var t=shareData.title,e=shareData.link,n=shareData.imgUrl,i=shareData.desc;wx.onMenuShareTimeline({title:t,link:e,imgUrl:n,success:function(){},cancel:function(){}}),wx.onMenuShareAppMessage({title:t,desc:i,link:e,imgUrl:n,type:"link",success:function(){},cancel:function(){}}),wx.onMenuShareQZone({title:t,desc:i,link:e,imgUrl:n,success:function(){},cancel:function(){}}),wx.onMenuShareQQ({title:t,desc:i,link:e,imgUrl:n,success:function(){},cancel:function(){}})})}Object.defineProperty(e,"__esModule",{value:!0}),e.isWeiXin=n,e.getClient=i,e.getBody=o,e.weixinShare=a},6:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{value:{type:Boolean,default:!1},text:String,position:String},created:function(){this.show=this.value},data:function(){return{show:!1}},watch:{value:function(t){this.show=t},show:function(t){this.$emit("input",t)}}}},7:function(t,e){},8:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:"vux-mask"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"weui-loading_toast"},[n("div",{staticClass:"weui-mask_transparent"}),t._v(" "),n("div",{staticClass:"weui-toast",style:{position:t.position}},[n("i",{staticClass:"weui-loading weui-icon_toast"}),t._v(" "),n("p",{staticClass:"weui-toast__content"},[t._v(t._s(t.text||"加载中")),t._t("default")],2)])])])},staticRenderFns:[]}},9:function(t,e,n){var i,o;n(7),i=n(6);var a=n(8);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=i},11:function(t,e,n){var i,o;n(14);var a=n(16);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=i},12:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{title:String,titleColor:String,labelWidth:String,labelAlign:String,labelMarginRight:String,gutter:String}}},13:function(t,e){},14:function(t,e){},15:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.title?n("div",{staticClass:"weui-cells__title",style:{color:t.titleColor},domProps:{innerHTML:t._s(t.title)}}):t._e(),t._v(" "),n("div",{staticClass:"weui-cells",class:{"vux-no-group-title":!t.title},style:{marginTop:t.gutter}},[t._t("after-title"),t._v(" "),t._t("default")],2)])},staticRenderFns:[]}},16:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",{staticClass:"vux-label-desc"},[t._t("default")],2)},staticRenderFns:[]}},17:function(t,e,n){var i,o;n(13),i=n(12);var a=n(15);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=i},18:function(t,e,n){var i,o;n(23),i=n(20);var a=n(25);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=i},19:function(t,e,n){var i,o;n(22),i=n(21);var a=n(24);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=i},20:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(11),a=i(o),s=n(41),r=n(44),c=i(r);e.default={components:{InlineDesc:a.default},props:(0,c.default)(),computed:{valueClass:function(){return{"vux-cell-primary":"content"===this.primary||"left"===this.valueAlign,"vux-cell-align-left":"left"===this.valueAlign,"vux-cell-arrow-transition":!!this.arrowDirection,"vux-cell-arrow-up":"up"===this.arrowDirection,"vux-cell-arrow-down":"down"===this.arrowDirection}}},methods:{getLabelStyles:function(){return{width:this.$parent.labelWidth||this.$parent.$parent.labelWidth,textAlign:this.$parent.labelAlign||this.$parent.$parent.labelAlign,marginRight:this.$parent.labelMarginRight||this.$parent.$parent.labelMarginRight}},onClick:function(){(0,s.go)(this.link,this.$router)}}}},21:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{value:{type:Boolean,default:!1},maskTransition:{type:String,default:"vux-mask"},dialogTransition:{type:String,default:"vux-dialog"},hideOnBlur:Boolean,scroll:{type:Boolean,default:!0}},created:function(){"undefined"!=typeof this.value&&(this.currentValue=this.value)},watch:{value:{handler:function(t){this.currentValue=t},immediate:!0},currentValue:function(t){this.$emit(t?"on-show":"on-hide"),this.$emit("input",t)}},data:function(){return{currentValue:!1}},methods:{onTouchMove:function(t){!this.scroll&&t.preventDefault()}}}},22:function(t,e){},23:function(t,e){},24:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-x-dialog",on:{touchmove:t.onTouchMove}},[n("transition",{attrs:{name:t.maskTransition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.currentValue,expression:"currentValue"}],staticClass:"weui-mask",on:{click:function(e){t.hideOnBlur&&(t.currentValue=!1)}}})]),t._v(" "),n("transition",{attrs:{name:t.dialogTransition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.currentValue,expression:"currentValue"}],staticClass:"weui-dialog"},[t._t("default")],2)])],1)},staticRenderFns:[]}},25:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"weui-cell",class:{"vux-tap-active":t.isLink||!!t.link,"weui-cell_access":t.isLink||!!t.link,"vux-cell-no-border-intent":!t.borderIntent},on:{click:t.onClick}},[n("div",{staticClass:"weui-cell__hd"},[t._t("icon")],2),t._v(" "),n("div",{staticClass:"vux-cell-bd",class:{"vux-cell-primary":"title"===t.primary&&"left"!==t.valueAlign}},[n("p",[t.title?n("label",{staticClass:"vux-label",style:t.getLabelStyles()},[t._v(t._s(t.title))]):t._e(),t._v(" "),t._t("after-title")],2),t._v(" "),n("inline-desc",[t._t("inline-desc",[t._v(t._s(t.inlineDesc))])],2)],1),t._v(" "),n("div",{staticClass:"weui-cell__ft",class:t.valueClass},[t._t("value"),t._v(" "),t._t("default",[t._v(t._s(t.value))]),t._v(" "),t.isLoading?n("i",{staticClass:"weui-loading"}):t._e()],2),t._v(" "),t._t("child")],2)},staticRenderFns:[]}},26:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(19),a=i(o);e.default={components:{XDialog:a.default},created:function(){"undefined"!=typeof this.value&&(this.showValue=this.value)},props:{value:Boolean,title:String,content:String,buttonText:String,maskTransition:{type:String,default:"vux-mask"},dialogTransition:{type:String,default:"vux-dialog"}},data:function(){return{showValue:!1}},methods:{_onHide:function(){this.showValue=!1}},watch:{value:function(t){this.showValue=t},showValue:function(t){this.$emit("input",t)}}}},28:function(t,e){},32:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-alert"},[n("x-dialog",{attrs:{"mask-transition":t.maskTransition,"dialog-transition":t.dialogTransition},on:{"on-hide":function(e){t.$emit("on-hide")},"on-show":function(e){t.$emit("on-show")}},model:{value:t.showValue,callback:function(e){t.showValue=e},expression:"showValue"}},[n("div",{staticClass:"weui-dialog__hd"},[n("strong",{staticClass:"weui-dialog__title"},[t._v(t._s(t.title))])]),t._v(" "),n("div",{staticClass:"weui-dialog__bd"},[t._t("default",[n("div",{domProps:{innerHTML:t._s(t.content)}})])],2),t._v(" "),n("div",{staticClass:"weui-dialog__ft"},[n("a",{staticClass:"weui-dialog__btn weui-dialog__btn_primary",attrs:{href:"javascript:;"},on:{click:t._onHide}},[t._v(t._s(t.buttonText||"确定"))])])])],1)},staticRenderFns:[]}},35:function(t,e){},47:function(t,e){"use strict";function n(t,e,n){console.log("发起微信支付"),"undefined"==typeof WeixinJSBridge?(document.addEventListener?document.addEventListener("WeixinJSBridgeReady",i,!1):document.attachEvent&&(document.attachEvent("WeixinJSBridgeReady",i),document.attachEvent("onWeixinJSBridgeReady",i)),n.$vux.alert.show({title:"提示",content:"请在微信中打开",dialogTransition:"",maskTransition:"",onShow:function(){},onHide:function(){}}),n.disable=!0):i(t,e,n)}function i(t,e,n){WeixinJSBridge.invoke("getBrandWCPayRequest",{appId:t.app_id,timeStamp:t.timestamp,nonceStr:t.nonce_str,package:"prepay_id="+t.prepay_id,signType:"MD5",paySign:t.sign},function(i){console.log(i),"get_brand_wcpay_request:ok"==i.err_msg?e(t):"get_brand_wcpay_request:fail"==i.err_msg?(n.disable=!0,n.$vux.alert.show({title:"",content:"由于跨号支付，请关注'功夫财经'公众号'，下载APP购买",dialogTransition:"",maskTransition:""})):(n.disable=!0,n.$vux.alert.show({title:"",content:"支付取消",dialogTransition:"",maskTransition:""}))})}Object.defineProperty(e,"__esModule",{value:!0}),e.toPay=n},51:function(t,e,n){var i,o;n(28),i=n(26);var a=n(32);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=i},54:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(1);i(o);e.default={name:"backhome",props:{},data:function(){return{}},components:{},mounted:function(){},methods:{tohome:function(){window.location.href="/m/home.html"}}}},55:function(t,e){},56:function(t,e){t.exports="data:image/png;base64,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"},57:function(t,e,n){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"backhome"}},[n("div",{staticClass:"btn",on:{click:t.tohome}},[t._m(0),t._v(" "),n("span",{staticClass:"back"},[t._v("回到首页")])])])},staticRenderFns:[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("span",{staticClass:"img"},[i("img",{attrs:{src:n(56),alt:""}})])}]}},59:function(t,e,n){var i,o;n(55),i=n(54);var a=n(57);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=i},94:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(1);i(o);e.default={name:"titlebar",props:{title:String,more:String,url:String,line:String,img:String},data:function(){return{}},components:{},mounted:function(){},methods:{toskip:function(){window.location.href=this.url}}}},100:function(t,e){},110:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"titlebar"}},[n("div",{staticClass:"con"},[t.img?n("img",{staticClass:"img",attrs:{src:t.img,alt:"."}}):t._e(),t._v(" "),n("span",{domProps:{innerHTML:t._s(t.title)}}),t._v(" "),t.more?n("span",{staticClass:"more",domProps:{innerHTML:t._s(t.more)},on:{click:t.toskip}}):t._e(),t._v(" "),t.more?n("span",{staticClass:"nstep"}):t._e()]),t._v(" "),t.line?n("div",{staticClass:"line vux-1px-b"}):t._e()])},staticRenderFns:[]}},114:function(t,e,n){var i,o;n(100),i=n(94);var a=n(110);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=i},274:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),n(3),n(4);var o=n(2),a=i(o),s=n(5),r=(n(47),n(59)),c=i(r),l=n(114),u=i(l),d=n(17),f=i(d),p=n(18),g=i(p),h=n(9),m=i(h),v=n(45),w=i(v),_=n(38),C=i(_),I=n(39),k=i(I),y=n(1),S=i(y);S.default.use(w.default),e.default={name:"member-center",data:function(){return{id:0,showContent:!1,loadingshow:!0,loadtext:"加载中...",dataInfo:{}}},components:{Group:f.default,Cell:g.default,Loading:m.default,TitleBar:u.default,BackHome:c.default},beforeCreate:function(){window.shareData={title:"功夫财经英雄招募令",link:HOSTM+"/m/member-center.html",imgUrl:"http://m.kofuf.com/static/img_h5/h5_logo.png",desc:"订阅专栏折扣、功夫佳酿、功夫盛典现场门票、超值课程礼包、全国各地线下活动与大咖零距离交流~现在就来加伙吧！"},(0,s.isWeiXin)()&&(getAuth(C.default,k.default,"member-center.html"),(0,s.weixinShare)(S.default))},created:function(){this.fetchData()},methods:{fetchData:function(t){var e=this;a.default.httpGet(S.default,HOST+"/api/users/my_privileges",{},function(t){0==t.status&&(e.loadingshow=!1,e.showContent=!0,e.dataInfo=t,(0,s.isWeiXin)()&&(0,s.weixinShare)(S.default),0==e.dataInfo.items.length&&(window.location.href="/m/my.html")),5==t.status&&(localStorage.setItem("gid",""),localStorage.clear(),clearcookie(C.default),getAuth(C.default,k.default,"my.html")),4==t.status&&(e.loadingshow=!1,e.showContent=!0,window.location.href="/m/member.html")}),function(t){console.log(t)}},toChannel:function(t){window.location.href="/m/channel.html?id="+t.id},toGood:function(t){2!=t.state&&3!=t.state&&(window.location.href="/m/privilege-detail.html?id="+t.id)}}}},365:function(t,e){},435:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"member-center"}},[t.showContent?n("div",{staticClass:"content"},[t._l(t.dataInfo.items,function(e){return n("div",["goods"==e.type?n("div",t._l(e.items,function(e){return n("group",{staticClass:"header"},[n("cell",{attrs:{title:e.name,"is-link":""},nativeOn:{click:function(n){t.toGood(e)}}},[0==e.state?n("span",[t._v("未开始")]):t._e(),t._v(" "),1==e.state?n("span",[t._v("未兑换")]):t._e(),t._v(" "),2==e.state?n("span",[t._v("已兑换")]):t._e(),t._v(" "),3==e.state?n("span",[t._v("已过期")]):t._e()])],1)})):t._e(),t._v(" "),"channel"==e.type?n("div",[n("TitleBar",{attrs:{title:"专栏折扣价",more:"查看更多",line:"",url:"/m/channels.html"}}),t._v(" "),n("div",{staticClass:"channels-list"},[n("ul",t._l(e.items,function(e,i){return i<3?n("li",{on:{click:function(n){t.toChannel(e)}}},[n("div",{staticClass:"img"},[n("img",{attrs:{src:e.thumb,alt:""}}),t._v(" "),n("p",{staticClass:"channel-name",domProps:{innerHTML:t._s(e.name)}})]),t._v(" "),n("p",[e.followed?t._e():n("span",{staticClass:"price"},[t._v("已订阅")]),t._v(" "),e.followed?n("span",{staticClass:"price"},[t._v("¥"+t._s(e.channel_price))]):t._e(),t._v(" "),e.followed?n("s",{staticClass:"proprice"},[t._v("¥"+t._s(e.price))]):t._e()])]):t._e()})),t._v(" "),n("ul",t._l(e.items,function(e,i){return i>=3&&i<6?n("li",{on:{click:function(n){t.toChannel(e)}}},[n("div",{staticClass:"img"},[n("img",{attrs:{src:e.thumb,alt:""}}),t._v(" "),n("p",{staticClass:"channel-name",domProps:{innerHTML:t._s(e.name)}})]),t._v(" "),n("p",[e.followed?t._e():n("span",{staticClass:"price"},[t._v("已订阅")]),t._v(" "),e.followed?n("span",{staticClass:"price"},[t._v("¥"+t._s(e.channel_price))]):t._e(),e.followed?n("s",{staticClass:"proprice"},[t._v("¥"+t._s(e.price))]):t._e()])]):t._e()}))])],1):t._e()])}),t._v(" "),0==t.dataInfo.items.length?n("div",{},[n("p",{staticClass:"over"},[t._v("权益已兑换")])]):t._e()],2):t._e(),t._v(" "),n("BackHome"),t._v(" "),n("Loading",{attrs:{text:t.loadtext},model:{value:t.loadingshow,callback:function(e){t.loadingshow=e},expression:"loadingshow"}})],1)},staticRenderFns:[]}},495:function(t,e,n){var i,o;n(365),i=n(274);var a=n(435);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=i}});