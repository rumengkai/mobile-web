webpackJsonp([17,0],{0:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}var o=n(1),a=i(o),s=n(514),r=i(s),l=n(10),c=i(l);a.default.use(c.default),new a.default({el:"#daily",template:"<App/>",components:{App:r.default}})},2:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(1);i(o);e.default={ajaxPost:function(t,e,n,i){$.ajax({url:t,type:"POST",data:e,success:function(t){n(t)},error:function(t){i(t)}})},ajaxGet:function(){},httpPost:function(t,e,n,i,o){t.http.options.emulateJSON=!0,t.http.options.headers={"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},t.http.interceptors.push(function(t,e){t.headers.set("from",config().from),t.headers.set("gid",config().gid),t.headers.set("token",config().token),t.headers.set("version",VERSION),e()}),t.http.post(e,n).then(function(t){return t.bodyText}).then(function(t){var t=JSON.parse(t);i(t)},function(t){o(t)||console.log(t)})},httpGet:function(t,e,n,i,o){t.http.options.emulateJSON=!0,t.http.options.headers={"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},t.http.interceptors.push(function(t,e){t.headers.set("from",config().from),t.headers.set("gid",config().gid),t.headers.set("token",config().token),t.headers.set("version",VERSION),e()}),t.http.get(e,{params:n}).then(function(t){return t.bodyText}).then(function(t){var t=JSON.parse(t);i(t)},function(t){o(t)||console.log(t)})}}},3:function(t,e){},4:function(t,e,n){"use strict";!function(){var t=document.documentElement.clientWidth||document.body.clientWidth;t=t>640?640:t;var e=t/750*100;e=e<50?e:50,document.documentElement.style.fontSize=e+"px",t<350?window.phonetype="small":window.phonetype="large"}(),window.base="dev","pro"==base?(window.VERSION="0.1",window.HOST="https://api.kofuf.com",window.HOSTM="https://m.kofuf.com",window.HOSTA="https://api.kofuf.com",window.appid="wx05e842991e5fa0b2",window.config=function(){return{paytype:"JSAPI",from:"3",gid:localStorage.getItem("gid"),token:localStorage.getItem("token")}}):(window.VERSION="0.1",window.HOST="http://dev.kofuf.com",window.HOSTM="http://dev.kofuf.com",window.HOSTA="http://dev.kofuf.com",window.appid="wx0a542ef9d4d41cef",window.config=function(){return{paytype:"JSAPI",from:"3",gid:"1047501566",token:"f32cd7de15144e2b931214730e6ed9f4"}}),window.shareData={title:"功夫财经",link:HOSTM+"/m/home.html",imgUrl:"http://m.kofuf.com/static/img_h5/h5_logo.png",desc:"功夫财经致力于联动最出色的财经学者，提供最优质的原创内容，打造中国规模最大的、粘性最高的财富命运共同体，以新型金融服务平台为终极己任，解决中产焦虑，提升国民财商。 "};var i=n(30);i.attach(document.body),window.getAuthLink=function(t){return"https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri="+HOSTA+"%2Fapi%2Fsession%2Fauth_weixin&response_type=code&scope=snsapi_userinfo&state="+t+"#wechat_redirect"},window.getAuth=function(t,e,n,i){var o=t.get("gid"),a=e.parse();if(!localStorage.getItem("gid")||""==localStorage.getItem("gid"))if("undefined"!=typeof a.gid)localStorage.setItem("gid",a.gid),localStorage.setItem("token",a.token);else if("undefined"!=typeof o)localStorage.setItem("gid",t.get("gid")),localStorage.setItem("token",t.get("token"));else{var s;s=void 0!=i&&""!=i?n+"_"+i:n,s=s?s:"",window.location.href=getAuthLink(s)}},window.clearcookie=function(t){localStorage.clear(),t.set("gid",0,{domain:".kofuf.com",path:"/",expires:-1}),t.set("token",0,{domain:".kofuf.com",path:"/",expires:-1})}},5:function(t,e){"use strict";function n(){var t=window.navigator.userAgent.toLowerCase();return"micromessenger"==t.match(/MicroMessenger/i)}function i(){var t,e,n,i;return t=document.documentElement.scrollLeft||document.body.scrollLeft,e=document.documentElement.scrollTop||document.body.scrollTop,n=document.documentElement.clientWidth,i=document.documentElement.clientHeight,{left:t,top:e,width:n,height:i}}function o(){var t,e;return t=document.body.clientHeight,e=document.body.scrollTop,{top:e,height:t}}function a(t,e){var n=HOST+"/api/session/share_weixin_config?url="+encodeURIComponent(window.location.href.split("#")[0]);t.http.get(n).then(function(t){return t.bodyText}).then(function(t){var t=JSON.parse(t);wx.config({debug:!1,appId:t.appId,timestamp:t.timestamp,nonceStr:t.nonceStr,signature:t.signature,jsApiList:["checkJsApi","onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo"]})},function(t){error(t)}),wx.ready(function(){var t=shareData.title,e=shareData.link,n=shareData.imgUrl,i=shareData.desc;wx.onMenuShareTimeline({title:t,link:e,imgUrl:n,success:function(){},cancel:function(){}}),wx.onMenuShareAppMessage({title:t,desc:i,link:e,imgUrl:n,type:"link",success:function(){},cancel:function(){}}),wx.onMenuShareQZone({title:t,desc:i,link:e,imgUrl:n,success:function(){},cancel:function(){}}),wx.onMenuShareQQ({title:t,desc:i,link:e,imgUrl:n,success:function(){},cancel:function(){}})})}Object.defineProperty(e,"__esModule",{value:!0}),e.isWeiXin=n,e.getClient=i,e.getBody=o,e.weixinShare=a},6:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{value:{type:Boolean,default:!1},text:String,position:String},created:function(){this.show=this.value},data:function(){return{show:!1}},watch:{value:function(t){this.show=t},show:function(t){this.$emit("input",t)}}}},7:function(t,e){},8:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:"vux-mask"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"weui-loading_toast"},[n("div",{staticClass:"weui-mask_transparent"}),t._v(" "),n("div",{staticClass:"weui-toast",style:{position:t.position}},[n("i",{staticClass:"weui-loading weui-icon_toast"}),t._v(" "),n("p",{staticClass:"weui-toast__content"},[t._v(t._s(t.text||"加载中")),t._t("default")],2)])])])},staticRenderFns:[]}},9:function(t,e,n){var i,o;n(7),i=n(6);var a=n(8);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=i},11:function(t,e,n){var i,o;n(21);var a=n(25);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=i},16:function(t,e,n){var i,o;n(23),i=n(18);var a=n(27);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=i},18:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(11),a=i(o),s=n(43),r=n(47),l=i(r);e.default={components:{InlineDesc:a.default},props:(0,l.default)(),computed:{valueClass:function(){return{"vux-cell-primary":"content"===this.primary||"left"===this.valueAlign,"vux-cell-align-left":"left"===this.valueAlign,"vux-cell-arrow-transition":!!this.arrowDirection,"vux-cell-arrow-up":"up"===this.arrowDirection,"vux-cell-arrow-down":"down"===this.arrowDirection}}},methods:{getLabelStyles:function(){return{width:this.$parent.labelWidth||this.$parent.$parent.labelWidth,textAlign:this.$parent.labelAlign||this.$parent.$parent.labelAlign,marginRight:this.$parent.labelMarginRight||this.$parent.$parent.labelMarginRight}},onClick:function(){(0,s.go)(this.link,this.$router)}}}},19:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{title:String,titleColor:String,labelWidth:String,labelAlign:String,labelMarginRight:String,gutter:String}}},20:function(t,e){},21:function(t,e){},23:function(t,e){},24:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.title?n("div",{staticClass:"weui-cells__title",style:{color:t.titleColor},domProps:{innerHTML:t._s(t.title)}}):t._e(),t._v(" "),n("div",{staticClass:"weui-cells",class:{"vux-no-group-title":!t.title},style:{marginTop:t.gutter}},[t._t("after-title"),t._v(" "),t._t("default")],2)])},staticRenderFns:[]}},25:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",{staticClass:"vux-label-desc"},[t._t("default")],2)},staticRenderFns:[]}},27:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"weui-cell",class:{"vux-tap-active":t.isLink||!!t.link,"weui-cell_access":t.isLink||!!t.link,"vux-cell-no-border-intent":!t.borderIntent},on:{click:t.onClick}},[n("div",{staticClass:"weui-cell__hd"},[t._t("icon")],2),t._v(" "),n("div",{staticClass:"vux-cell-bd",class:{"vux-cell-primary":"title"===t.primary&&"left"!==t.valueAlign}},[n("p",[t.title?n("label",{staticClass:"vux-label",style:t.getLabelStyles()},[t._v(t._s(t.title))]):t._e(),t._v(" "),t._t("after-title")],2),t._v(" "),n("inline-desc",[t._t("inline-desc",[t._v(t._s(t.inlineDesc))])],2)],1),t._v(" "),n("div",{staticClass:"weui-cell__ft",class:t.valueClass},[t._t("value"),t._v(" "),t._t("default",[t._v(t._s(t.value))]),t._v(" "),t.isLoading?n("i",{staticClass:"weui-loading"}):t._e()],2),t._v(" "),t._t("child")],2)},staticRenderFns:[]}},28:function(t,e,n){var i,o;n(20),i=n(19);var a=n(24);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=i},31:function(t,e){},32:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"failed",data:function(){return{}},props:{msg:String},components:{},created:function(){},methods:{}}},35:function(t,e){},36:function(t,e,n){t.exports=n.p+"m/static/img/pay_result_failure.dac5b24.png"},37:function(t,e,n){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"failed"}},[i("img",{attrs:{src:n(36),alt:""}}),t._v(" "),i("p",[t._v(t._s(t.msg))])])},staticRenderFns:[]}},38:function(t,e,n){var i,o;n(35),i=n(32);var a=n(37);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=i},39:function(t,e){"use strict";function n(t){var e=new Date(t),n=new Date;if(i(new Date(t),"yyyy")-i(n,"yyyy")<0)return i(e,"yyyy-MM-dd");if(i(new Date(t),"MM")-i(n,"MM")<0)return i(e,"MM-dd");var o=i(n,"dd")-i(e,"dd");if(0==o){var a=i(n,"hh")-i(e,"hh");if(0==a){var s=i(n,"mm")-i(e,"mm");return s<5?"刚刚":isNaN(s)?"1小时前":s+"分钟前"}return a+"小时前"}return 1==o?"昨天":o+"天前"}function i(t,e){/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length)));var n={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds()};for(var i in n)if(new RegExp("("+i+")").test(e)){var o=(n[i]+"").replace(/^0/,"");e=e.replace(RegExp.$1,1===RegExp.$1.length?o:a(o))}return e}function o(t,e){/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length)));var n={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds()};for(var i in n)if(new RegExp("("+i+")").test(e)){var o=(n[i]+"").replace(/^0/,"");e=e.replace(RegExp.$1,1===RegExp.$1.length?o:s(o))}return e}function a(t){return("00"+t).substr(t.length)}function s(t){return t}Object.defineProperty(e,"__esModule",{value:!0}),e.formatedDate=n,e.formatDate=i,e.formatDate2=o},53:function(t,e,n){var i,o;n(57),i=n(54);var a=n(59);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=i},54:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{showLoading:{type:Boolean,default:!0},tip:String,backgroundColor:String},methods:{getStyle:function(){if(!this.showLoading&&this.tip)return{"background-color":this.backgroundColor}}}}},57:function(t,e){},59:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"weui-loadmore",class:{"weui-loadmore_line":!t.showLoading,"weui-loadmore_dot":!t.showLoading&&!t.tip}},[t.showLoading?n("i",{staticClass:"weui-loading"}):t._e(),t._v(" "),n("span",{directives:[{name:"show",rawName:"v-show",value:t.tip||!t.showLoading,expression:"tip || !showLoading"}],staticClass:"weui-loadmore__tips",style:t.getStyle()},[t._v(t._s(t.tip))])])},staticRenderFns:[]}},83:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(2),a=i(o),s=n(1),r=i(s),l=n(53),c=i(l),u=n(5);e.default={name:"load",data:function(){return{pn:0,nonedata:!1,commentBottomMsg:"点击，立即加载更多",loadmore:!0,islazyload:!0,allload:!1}},props:{url:String,datalist:Array,params:String},components:{LoadMore:c.default},created:function(){var t=this;window.onscroll=function(){var e=(0,u.getClient)(),n=(0,u.getBody)();n.top+e.height>=n.height-10&&t.islazyload&&(this.islazyload=!1,t.dataLoad())}},methods:{dataLoad:function(){this.allload||(this.loadmore=!1,this.fetchData(++this.pn))},fetchData:function(t){var e=this,n=this;a.default.httpGet(r.default,HOST+this.url+"?pn="+t,{},function(t){0==t.status?(n.islazyload=!0,n.loadmore=!0,t.has_next||(n.allload=!0,n.commentBottomMsg="- 到底啦 -"),n.params||(n.params="articles"),e.$emit("getData",t[n.params])):n.loadmore=!0},function(t){console.log(t),n.loadmore=!0})}}}},90:function(t,e){},95:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"load"}},[t.nonedata?t._e():n("div",{staticClass:"comment-bottom"},[t.loadmore?n("p",{staticClass:"clickload",on:{click:t.dataLoad}},[t._v(t._s(t.commentBottomMsg))]):n("load-more",{attrs:{tip:"正在加载"}},[t._v("正在加载")])],1)])},staticRenderFns:[]}},100:function(t,e,n){var i,o;n(90),i=n(83);var a=n(95);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=i},141:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(39);e.default={name:"audiolist",props:{audiolist:Array},data:function(){return{}},components:{},mounted:function(){},methods:{todetail:function(t){window.location.href="/m/detail.html?id="+t}},filters:{formatDate:i.formatedDate}}},177:function(t,e){},179:function(t,e){t.exports="data:image/png;base64,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"},198:function(t,e,n){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"audiolist"}},[i("ul",t._l(t.audiolist,function(e){return i("li",{staticClass:"vux-1px-t vux-1px-b",on:{click:function(n){t.todetail(e.item)}}},[i("div",{staticClass:"left"},[i("img",{staticClass:"play",attrs:{src:n(179),alt:"播放"}}),t._v(" "),i("img",{staticClass:"bg",attrs:{src:e.picture,alt:"picture",onerror:'this.src="http://m.kofuf.com/static/img/default.png"'}})]),t._v(" "),i("div",{staticClass:"right"},[i("p",{domProps:{innerHTML:t._s(e.title)}}),t._v(" "),i("p",{staticClass:"author",domProps:{innerHTML:t._s(e.author_name)}}),t._v(" "),i("p",[i("span",[t._v(t._s(t._f("formatDate")(e.postd)))]),i("span",{staticClass:"view_count"},[t._v(t._s(e.view_count)+"听过")])])])])}))])},staticRenderFns:[]}},205:function(t,e,n){var i,o;n(177),i=n(141);var a=n(198);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=i},278:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),n(3),n(4);var o=n(5),a=n(2),s=i(a),r=n(205),l=i(r),c=n(100),u=i(c),d=n(38),f=i(d),p=n(1),h=i(p),g=n(9),m=i(g),v=n(10),w=i(v),y=n(28),x=i(y),S=n(16),A=i(S),R=n(34),M=i(R),T=n(33),O=i(T);h.default.use(w.default),e.default={name:"profile",data:function(){return{loadingshow:!0,loadtext:"loading...",showContent:!1,failedshow:!1,failedmsg:"服务请求失败，请刷新重试",datalist:[]}},components:{Group:x.default,Cell:A.default,Loading:m.default,Failed:f.default,AudioLists:l.default,LazyLoadingMore:u.default},beforeCreate:function(){(0,o.isWeiXin)()&&getAuth(O.default,M.default)},created:function(){this.fetchData()},mounted:function(){},methods:{fetchData:function(t){var e=this,n=this;s.default.httpGet(h.default,HOST+"/api/articles/daily_audio_list.json?pn=0",{},function(t){n.loadingshow=!1,n.showContent=!0,0==t.status?e.datalist=t.items:console.log(t.error)},function(t){console.log(t),n.loadingshow=!1,n.failedshow=!0}),setTimeout(function(){n.loadingshow=!1},1e4)},loadList:function(t){this.datalist=this.datalist.concat(t)}}}},360:function(t,e){},433:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"daily"}},[t.showContent?n("div",[n("AudioLists",{attrs:{audiolist:t.datalist}}),t._v(" "),n("div",{staticClass:"load"},[n("LazyLoadingMore",{attrs:{url:"/api/articles/daily_audio_list.json",params:"items"},on:{getData:t.loadList}})],1)],1):t._e(),t._v(" "),t.failedshow?n("Failed",{attrs:{msg:t.failedmsg}}):t._e(),t._v(" "),n("Loading",{attrs:{text:t.loadtext},model:{value:t.loadingshow,callback:function(e){t.loadingshow=e},expression:"loadingshow"}})],1)},staticRenderFns:[]}},514:function(t,e,n){var i,o;n(360),i=n(278);var a=n(433);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=i}});