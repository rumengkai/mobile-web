webpackJsonp([14,0],{0:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}var o=n(1),a=i(o),s=n(462),c=i(s),r=n(10),l=i(r);a.default.use(l.default),new a.default({el:"#my",template:"<App/>",components:{App:c.default}})},2:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={ajaxPost:function(t,e,n,i){$.ajax({url:t,type:"POST",data:e,success:function(t){n(t)},error:function(t){i(t)}})},ajaxGet:function(){},httpPost:function(t,e,n,i,o){t.http.options.emulateJSON=!0,t.http.options.headers={"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},t.http.interceptors.push(function(t,e){t.headers.set("from",config().from),t.headers.set("gid",config().gid),t.headers.set("token",config().token),t.headers.set("version",VERSION),e()}),t.http.post(e,n).then(function(t){return t.bodyText}).then(function(t){var t=JSON.parse(t);i(t)},function(t){o(t)})},httpGet:function(t,e,n,i,o){t.http.options.emulateJSON=!0,t.http.options.headers={"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},t.http.interceptors.push(function(t,e){t.headers.set("from",config().from),t.headers.set("gid",config().gid),t.headers.set("token",config().token),t.headers.set("version",VERSION),e()}),t.http.get(e,{params:n}).then(function(t){return t.bodyText}).then(function(t){var t=JSON.parse(t);i(t)},function(t){o(t)})}}},3:function(t,e){},4:function(t,e,n){"use strict";!function(){var t=document.documentElement.clientWidth||document.body.clientWidth;t=t>640?640:t;var e=t/750*100;e=e<50?e:50,document.documentElement.style.fontSize=e+"px",t<350?window.phonetype="small":window.phonetype="large"}(),window.base="pro","pro"==base?(window.VERSION="0.1",window.HOST="http://api.kofuf.com",window.HOSTM="http://m.kofuf.com",window.config=function(){return{paytype:"JSAPI",from:"3",gid:localStorage.getItem("gid"),token:localStorage.getItem("token")}}):(window.VERSION="0.1",window.HOST="http://dev.kofuf.com",window.HOSTM="http://m.kofuf.com",window.config=function(){return{paytype:"APP",from:"2",gid:"1047500131",token:"df2d1ecf7d064049966b15787786900f"}});var i=n(23);i.attach(document.body),window.getAuthLink=function(t){return"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx05e842991e5fa0b2&redirect_uri=http://api.kofuf.com%2Fapi%2Fsession%2Fauth_weixin&response_type=code&scope=snsapi_userinfo&state="+t+"#wechat_redirect"},window.getAuth=function(t,e,n,i){var o=t.get("gid"),a=e.parse();if(!localStorage.getItem("gid")||""==localStorage.getItem("gid"))if("undefined"!=typeof a.gid)localStorage.setItem("gid",a.gid),localStorage.setItem("token",a.token);else if("undefined"!=typeof o)localStorage.setItem("gid",t.get("gid")),localStorage.setItem("token",t.get("token"));else{var s;s=void 0!=i?n+"_"+i:n,window.location.href=getAuthLink(s)}},window.clearcookie=function(t){localStorage.clear(),t.set("gid",0,{domain:".kofuf.com",path:"/",expires:-1}),t.set("token",0,{domain:".kofuf.com",path:"/",expires:-1})}},5:function(t,e){"use strict";function n(){var t=window.navigator.userAgent.toLowerCase();return"micromessenger"==t.match(/MicroMessenger/i)}function i(){var t,e,n,i;return t=document.documentElement.scrollLeft||document.body.scrollLeft,e=document.documentElement.scrollTop||document.body.scrollTop,n=document.documentElement.clientWidth,i=document.documentElement.clientHeight,{left:t,top:e,width:n,height:i}}function o(){var t,e;return t=document.body.clientHeight,e=document.body.scrollTop,{top:e,height:t}}function a(t,e){var n="http://dev.kofuf.com/api/session/share_weixin_config?url="+encodeURIComponent(window.location.href.split("#")[0]);t.http.get(n).then(function(t){return t.bodyText}).then(function(t){var t=JSON.parse(t);wx.config({debug:!1,appId:t.appId,timestamp:t.timestamp,nonceStr:t.nonceStr,signature:t.signature,jsApiList:["checkJsApi","onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo"]})},function(t){error(t)}),wx.ready(function(){var t=shareData.title,e=shareData.link,n=shareData.imgUrl,i=shareData.desc;wx.onMenuShareTimeline({title:t,link:e,imgUrl:n,success:function(){},cancel:function(){}}),wx.onMenuShareAppMessage({title:t,desc:i,link:e,imgUrl:n,type:"link",success:function(){},cancel:function(){}}),wx.onMenuShareQZone({title:t,desc:i,link:e,imgUrl:n,success:function(){},cancel:function(){}}),wx.onMenuShareQQ({title:t,desc:i,link:e,imgUrl:n,success:function(){},cancel:function(){}})})}Object.defineProperty(e,"__esModule",{value:!0}),e.isWeiXin=n,e.getClient=i,e.getBody=o,e.weixinShare=a},6:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{value:{type:Boolean,default:!1},text:String,position:String},created:function(){this.show=this.value},data:function(){return{show:!1}},watch:{value:function(t){this.show=t},show:function(t){this.$emit("input",t)}}}},7:function(t,e){},8:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:"vux-mask"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"weui-loading_toast"},[n("div",{staticClass:"weui-mask_transparent"}),t._v(" "),n("div",{staticClass:"weui-toast",style:{position:t.position}},[n("i",{staticClass:"weui-loading weui-icon_toast"}),t._v(" "),n("p",{staticClass:"weui-toast__content"},[t._v(t._s(t.text||"加载中")),t._t("default")],2)])])])},staticRenderFns:[]}},9:function(t,e,n){var i,o;n(7),i=n(6);var a=n(8);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=i},11:function(t,e,n){var i,o;n(14);var a=n(16);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=i},12:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{title:String,titleColor:String,labelWidth:String,labelAlign:String,labelMarginRight:String,gutter:String}}},13:function(t,e){},14:function(t,e){},15:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.title?n("div",{staticClass:"weui-cells__title",style:{color:t.titleColor},domProps:{innerHTML:t._s(t.title)}}):t._e(),t._v(" "),n("div",{staticClass:"weui-cells",class:{"vux-no-group-title":!t.title},style:{marginTop:t.gutter}},[t._t("after-title"),t._v(" "),t._t("default")],2)])},staticRenderFns:[]}},16:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",{staticClass:"vux-label-desc"},[t._t("default")],2)},staticRenderFns:[]}},17:function(t,e,n){var i,o;n(13),i=n(12);var a=n(15);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=i},18:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"failed",data:function(){return{}},props:{msg:String},components:{},created:function(){},methods:{}}},19:function(t,e){},20:function(t,e,n){t.exports=n.p+"m/static/img/pay_result_failure.dac5b24.png"},21:function(t,e,n){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"failed"}},[i("img",{attrs:{src:n(20),alt:""}}),t._v(" "),i("p",[t._v(t._s(t.msg))])])},staticRenderFns:[]}},22:function(t,e,n){var i,o;n(19),i=n(18);var a=n(21);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=i},24:function(t,e,n){var i,o;n(32),i=n(28);var a=n(35);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=i},25:function(t,e){},28:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(11),a=i(o),s=n(43),c=n(50),r=i(c);e.default={components:{InlineDesc:a.default},props:(0,r.default)(),computed:{valueClass:function(){return{"vux-cell-primary":"content"===this.primary||"left"===this.valueAlign,"vux-cell-align-left":"left"===this.valueAlign,"vux-cell-arrow-transition":!!this.arrowDirection,"vux-cell-arrow-up":"up"===this.arrowDirection,"vux-cell-arrow-down":"down"===this.arrowDirection}}},methods:{getLabelStyles:function(){return{width:this.$parent.labelWidth||this.$parent.$parent.labelWidth,textAlign:this.$parent.labelAlign||this.$parent.$parent.labelAlign,marginRight:this.$parent.labelMarginRight||this.$parent.$parent.labelMarginRight}},onClick:function(){(0,s.go)(this.link,this.$router)}}}},32:function(t,e){},35:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"weui-cell",class:{"vux-tap-active":t.isLink||!!t.link,"weui-cell_access":t.isLink||!!t.link,"vux-cell-no-border-intent":!t.borderIntent},on:{click:t.onClick}},[n("div",{staticClass:"weui-cell__hd"},[t._t("icon")],2),t._v(" "),n("div",{staticClass:"vux-cell-bd",class:{"vux-cell-primary":"title"===t.primary&&"left"!==t.valueAlign}},[n("p",[t.title?n("label",{staticClass:"vux-label",style:t.getLabelStyles()},[t._v(t._s(t.title))]):t._e(),t._v(" "),t._t("after-title")],2),t._v(" "),n("inline-desc",[t._t("inline-desc",[t._v(t._s(t.inlineDesc))])],2)],1),t._v(" "),n("div",{staticClass:"weui-cell__ft",class:t.valueClass},[t._t("value"),t._v(" "),t._t("default",[t._v(t._s(t.value))]),t._v(" "),t.isLoading?n("i",{staticClass:"weui-loading"}):t._e()],2),t._v(" "),t._t("child")],2)},staticRenderFns:[]}},93:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(1);i(o);e.default={name:"tabbar",props:{active:String},data:function(){return{}},mounted:function(){},components:{},methods:{tab:function(t){"home"==t&&(window.location.href="/m/home.html"),"sub"==t&&(window.location.href="/m/channels.html"),"my"==t&&(window.location.href="/m/my.html")}}}},98:function(t,e){},102:function(t,e,n){t.exports=n.p+"m/static/img/tabbar_home.d3c0522.png"},103:function(t,e,n){t.exports=n.p+"m/static/img/tabbar_home_select.5e587d9.png"},104:function(t,e,n){t.exports=n.p+"m/static/img/tabbar_profile.d09474c.png"},105:function(t,e,n){t.exports=n.p+"m/static/img/tabbar_profile_select.f2cc085.png"},106:function(t,e,n){t.exports=n.p+"m/static/img/tabbar_subscripe.0e2d6c2.png"},107:function(t,e,n){t.exports=n.p+"m/static/img/tabbar_subscripe_select.5c884fa.png"},108:function(t,e,n){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"vux-1px-t",attrs:{id:"tabbar"}},[i("ul",["home"==t.active?i("li",{staticClass:"focus",on:{click:function(e){t.tab("home")}}},[i("img",{attrs:{src:n(103),alt:"首页"}}),t._v(" "),i("span",[t._v("首页")])]):i("li",{on:{click:function(e){t.tab("home")}}},[i("img",{attrs:{src:n(102),alt:"首页"}}),t._v(" "),i("span",[t._v("首页")])]),t._v(" "),"sub"==t.active?i("li",{staticClass:"focus",on:{click:function(e){t.tab("sub")}}},[i("img",{attrs:{src:n(107),alt:""}}),t._v(" "),i("span",[t._v("讲武堂")])]):i("li",{on:{click:function(e){t.tab("sub")}}},[i("img",{attrs:{src:n(106),alt:""}}),t._v(" "),i("span",[t._v("讲武堂")])]),t._v(" "),"my"==t.active?i("li",{staticClass:"focus",on:{click:function(e){t.tab("my")}}},[i("img",{attrs:{src:n(105),alt:""}}),t._v(" "),i("span",[t._v("我的")])]):i("li",{on:{click:function(e){t.tab("my")}}},[i("img",{attrs:{src:n(104),alt:""}}),t._v(" "),i("span",[t._v("我的")])])])])},staticRenderFns:[]}},113:function(t,e,n){var i,o;n(98),i=n(93);var a=n(108);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=i},265:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),n(3),n(4);var o=n(5),a=n(2),s=i(a),c=n(113),r=i(c),l=n(22),u=i(l),f=n(1),d=i(f),p=n(9),m=i(p),h=n(10),g=i(h),v=n(17),w=i(v),_=n(24),b=i(_),y=n(39),x=i(y),k=n(38),A=i(k);d.default.use(g.default),e.default={name:"my",data:function(){return{loadingshow:!0,loadtext:"loading...",showContent:!1,failedshow:!1,failedmsg:"服务请求失败，请刷新重试",myInfo:{}}},components:{Group:w.default,Cell:b.default,Loading:m.default,TabBar:r.default,Failed:u.default},beforeCreate:function(){(0,o.isWeiXin)(),getAuth(A.default,x.default)},created:function(){this.fetchData()},mounted:function(){},methods:{fetchData:function(t){var e=this,n=this;s.default.httpGet(d.default,HOST+"/api/users/my_info.json",{},function(t){n.loadingshow=!1,n.showContent=!0,0==t.status?e.myInfo=t:console.log(t.error),5==t.status&&(localStorage.clear(),clearcookie(A.default),getAuth(A.default,x.default))},function(t){console.log(t),n.loadingshow=!1,n.failedshow=!0}),setTimeout(function(){n.loadingshow=!1},1e4)},toApp:function(){window.location.href="https://ah88dj.mlinks.cc/AK8j"},toAbout:function(){window.location.href="/m/about.html"},toprofile:function(){window.location.href="/m/profile.html"},tomember:function(){0==this.myInfo.level?window.location.href="/m/member.html":window.location.href="/m/member-center.html"},privilege:function(){window.location.href="/m/privilege.html"},tocoupons:function(){window.location.href="/m/coupons.html"},tocollect:function(){window.location.href="/m/collect.html"},toaddress:function(){window.location.href="/m/address.html"}}}},355:function(t,e){},382:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEUAAABFCAYAAAAcjSspAAAD5klEQVR4nO2a3W3rMAyF7wgZwSNkg3qEu0G8QbtBs0GzQb1Bu0GyQbOBs0GywXcfpKABTSXUj+0bQAcw2ofwkCIpiZL4509FRUVFRUVFRcUIwEvoW9q2WQA0wAb4BAZsGPzvN0Cz9BiKwQ/oy+iER/gCNkuPKRneGdaMiMXwVM4BWuDHOLgjcPDf9ub/o1H+B2iXHvNdAB8PBnEA3oC1kW/tf394wPsx9diiAawIZ8cFlwVNpo7G81zuZM2q0JDy4KM5BAzdlTbUB2AX0DdgzMLJ4B1yVow7Tm2c162tPefFHOMjpmVIP1caexv6QMbMP5XQ15A+gWeNq2I3/m90lAOO+YnlyQL6nO4j5FfAeyDTrpF+j4l2wDG7pAHGAleH5DikQ1+HNJyBLoJbc0ybMMw4MJ42R2tEcTVHCt6M/CvgJGSnnUa4KEtYCzFNFlzdca1ovwnXIZ1RzzpVNgmM1wDTnPURlFPmQiADvAOlc87YM1KueUPMOM1QIn3JMPLCgwzzEZeO6Y36VopsZ5GNAi61b7GNkJUGWtcIGYhzhM6tkP22yloVNIzRGGXlHL9E6pYLZzu1zVbDZMQOEbJyCzfLenk59boIWXm6NstayOX+b0p/Lyu34W2kbjkNzPKK7j5G9yPyQZCbS3HGadxG6pYB2UbIyqlbbhcSxCTIr33E2wTZpDXlRj7L9hBp1ppQWDdEnn4ZXy+0Uxh2yCa16W0YF3x9Ao9cbNsSxkmnlN3vwzoHJUuaBK5ZnLLNJg3ragi/EZl3PMEpd6+2hKGzZArhAyNkbKVzZcohm3Ss455DkjLkhvv5nIJ+ggZXnzQF+OX9T5lLbWltEdJfbun0hyfoSP5pbGdcQJU0Wi6EfUFuWdGeSnFnnX0M3MlnGwP3pGcfuRDuC3LLaP4tyL0X3F0p7snvJnDryq6k0VPbfFWSfPO2BJRpWb6+UqaQ+SJ5bqBv891UyuQuVOQFzg/ipZSTGd/WnUrwhpRplWf29nzj7OxLIOZ+9/FK5f1EVrOMMog2g0trHjqm8sUo1i5+PgvytRlcn4ptyXyxyrWugxzHXN+Fop4/BIfmkHm6Dm6M0LqIkhyDqyk6EuuIgEOmnzaKIdoLP97AOTuZVIfMZYNmlPbeC26xm6PnTeumKnrKzjFOyxhwfbVTdEeG+nUnb0A0wxsa6pI+41q1mkwdjecJdUEtN2XugXB/6xV74NUaTVwWvjI+7UrMu8vEAld3xPTW7/33fvN/TG9/u/SYzcBtsaG1Jhcnpi7dp4R3jrx2SMX3UztDgt8CrceeQSf/++TC7umAW3/Ub2nbKioqKioqKir+R/wDzu5zFiqvXMAAAAAASUVORK5CYII="},415:function(t,e,n){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"my"}},[t.showContent?i("div",[i("div",{staticClass:"profile"},[0!=t.myInfo.user.level?i("div",{staticClass:"privilege",on:{click:t.privilege}},[i("img",{staticClass:"mark",attrs:{src:n(382),alt:""}}),t._v("\n        特权说明\n      ")]):t._e(),t._v(" "),i("div",{staticClass:"headimg"},[i("img",{staticClass:"head",attrs:{src:t.myInfo.user.photo,alt:"头像"}}),t._v(" "),0!=t.myInfo.user.level?i("img",{staticClass:"level",attrs:{src:t.myInfo.user.vip_icon,alt:"会员"}}):t._e(),t._v(" "),i("p",{domProps:{innerHTML:t._s(t.myInfo.user.name)}})])]),t._v(" "),i("group",{staticClass:"group g1"},[i("cell",{attrs:{title:"我的收藏","is-link":""},nativeOn:{click:function(e){t.tocollect(e)}}}),t._v(" "),i("cell",{attrs:{title:"优惠券","is-link":""},nativeOn:{click:function(e){t.tocoupons(e)}}},[i("span",{staticClass:"tp"},[i("span",{staticClass:"tp1"},[t._v(t._s(t.myInfo.user.coupon_count))]),t._v("张待使用")])])],1),t._v(" "),i("group",{staticClass:"group g1"},[i("cell",{attrs:{title:"个人信息","is-link":""},nativeOn:{click:function(e){t.toprofile(e)}}}),t._v(" "),i("cell",{attrs:{title:"关于我们","is-link":""},nativeOn:{click:function(e){t.toAbout(e)}}})],1),t._v(" "),i("group",{staticClass:"group g1"},[i("cell",{attrs:{title:"下载APP","is-link":""},nativeOn:{click:function(e){t.toApp(e)}}})],1)],1):t._e(),t._v(" "),i("TabBar",{attrs:{active:"my"}}),t._v(" "),t.failedshow?i("Failed",{attrs:{msg:t.failedmsg}}):t._e(),t._v(" "),i("Loading",{attrs:{text:t.loadtext},model:{value:t.loadingshow,callback:function(e){t.loadingshow=e},expression:"loadingshow"}})],1)},staticRenderFns:[]}},462:function(t,e,n){var i,o;n(355),i=n(265);var a=n(415);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=i}});