webpackJsonp([22,0],{0:function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}var i=n(1),a=o(i),s=n(631),r=o(s),l=n(16),c=o(l);a.default.use(c.default),new a.default({el:"#moments",template:"<App/>",components:{App:r.default}})},2:function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var i=n(1);o(i);e.default={ajaxPost:function(t,e,n,o){$.ajax({url:t,type:"POST",data:e,success:function(t){n(t)},error:function(t){o(t)}})},ajaxGet:function(){},httpPost:function(t,e,n,o,i){t.http.options.emulateJSON=!0,t.http.options.headers={"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},t.http.interceptors.push(function(t,e){t.headers.set("from",config().from),t.headers.set("gid",config().gid),t.headers.set("token",config().token),t.headers.set("version",VERSION),e()}),t.http.post(e,n).then(function(t){return t.bodyText}).then(function(t){var t=JSON.parse(t);o(t)},function(t){i(t)||console.log(t)})},httpGet:function(t,e,n,o,i){t.http.options.emulateJSON=!0,t.http.options.headers={"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},t.http.interceptors.push(function(t,e){t.headers.set("from",config().from),t.headers.set("gid",config().gid),t.headers.set("token",config().token),t.headers.set("version",VERSION),e()}),t.http.get(e,{params:n}).then(function(t){return t.bodyText}).then(function(t){var t=JSON.parse(t);o(t)},function(t){i(t)||console.log(t)})}}},3:function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}function i(){var t=window.navigator.userAgent.toLowerCase();return"micromessenger"==t.match(/MicroMessenger/i)}function a(){var t,e,n,o;return t=document.documentElement.scrollLeft||document.body.scrollLeft,e=document.documentElement.scrollTop||document.body.scrollTop,n=document.documentElement.clientWidth,o=document.documentElement.clientHeight,{left:t,top:e,width:n,height:o}}function s(){var t,e;return t=document.body.clientHeight,e=document.body.scrollTop,{top:e,height:t}}function r(t,e){var n=HOST+"/api/session/share_weixin_config?url="+encodeURIComponent(window.location.href.split("#")[0]);(0,c.default)({url:n,method:"get",params:{}}).then(function(t){wx.config({debug:!1,appId:t.appId,timestamp:t.timestamp,nonceStr:t.nonceStr,signature:t.signature,jsApiList:["checkJsApi","onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo"]})}),wx.ready(function(){var t=shareData.title,e=shareData.link,n=shareData.imgUrl,o=shareData.desc;wx.onMenuShareTimeline({title:t,link:e,imgUrl:n,success:function(){},cancel:function(){}}),wx.onMenuShareAppMessage({title:t,desc:o,link:e,imgUrl:n,type:"link",success:function(){},cancel:function(){}}),wx.onMenuShareQZone({title:t,desc:o,link:e,imgUrl:n,success:function(){},cancel:function(){}}),wx.onMenuShareQQ({title:t,desc:o,link:e,imgUrl:n,success:function(){},cancel:function(){}})})}Object.defineProperty(e,"__esModule",{value:!0}),e.isWeiXin=i,e.getClient=a,e.getBody=s,e.weixinShare=r;var l=n(5),c=o(l)},4:function(t,e,n){"use strict";!function(){var t=document.documentElement.clientWidth||document.body.clientWidth;t=t>640?640:t;var e=t/750*100;e=e<60?e:60,document.documentElement.style.fontSize=e+"px",t<350?window.phonetype="small":window.phonetype="large"}(),document.write('<script src="https://s19.cnzz.com/z_stat.php?id=1262435637&web_id=1262435637" language="JavaScript"></script>'),document.write('<script src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js" charset="utf-8"></script>'),window.base="pro","pro"==base?(window.VERSION="0.1",window.HOST="https://api.kofuf.com",window.HOSTM="https://m.kofuf.com",window.HOSTA="https://api.kofuf.com",window.appid="wx05e842991e5fa0b2",localStorage.setItem("from","3"),window.config=function(){return{paytype:"JSAPI",from:localStorage.getItem("from"),gid:localStorage.getItem("gid"),token:localStorage.getItem("token")}}):(window.VERSION="0.1",window.HOST="http://123.57.35.40",window.HOSTM="http://dev.kofuf.com",window.HOSTA="http://123.57.35.40",window.appid="wx0a542ef9d4d41cef",localStorage.setItem("from","3"),localStorage.setItem("gid","1047501566"),localStorage.setItem("token","f32cd7de15144e2b931214730e6ed9f4"),window.config=function(){return{paytype:"JSAPI",from:localStorage.getItem("from"),gid:localStorage.getItem("gid"),token:localStorage.getItem("token")}}),window.shareData={title:"功夫财经",link:HOSTM+"/m/home.html",imgUrl:"http://m.kofuf.com/static/img_h5/h5_logo.png",desc:"功夫财经致力于联动最出色的财经学者，提供最优质的原创内容，打造中国规模最大的、粘性最高的财富命运共同体，以新型金融服务平台为终极己任，解决中产焦虑，提升国民财商。 "};var o=n(35);o.attach(document.body),window.getAuthLink=function(t){return"https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri="+HOSTA+"%2Fapi%2Fsession%2Fauth_weixin&response_type=code&scope=snsapi_userinfo&state="+t+"#wechat_redirect"},window.getAuth=function(t,e,n,o){var i=t.get("gid"),a=e.parse();if(!localStorage.getItem("gid")||""==localStorage.getItem("gid"))if("undefined"!=typeof a.gid)localStorage.setItem("gid",a.gid),localStorage.setItem("token",a.token);else if("undefined"!=typeof i)localStorage.setItem("gid",t.get("gid")),localStorage.setItem("token",t.get("token"));else{var s;s=void 0!=o&&""!=o?n+"_"+o:n,s=s?s:"",window.location.href=getAuthLink(s)}},window.clearcookie=function(t){localStorage.clear(),t.set("gid",0,{domain:".kofuf.com",path:"/",expires:-1}),t.set("token",0,{domain:".kofuf.com",path:"/",expires:-1})}},5:function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var i=n(43),a=o(i),s=n(42),r=o(s),l=n(14),c=n(28),u=o(c),d=n(1),f=o(d);f.default.use(u.default);var p=r.default.create({baseURL:"https://api.kofuf.com",timeout:15e3,headers:{"Content-Type":"application/x-www-form-urlencoded"}});p.interceptors.request.use(function(t){return t.headers.token=(0,l.getToken)(),t.headers.gid=(0,l.getGid)(),t.headers.from=(0,l.getFrom)(),t},function(t){console.log(t),a.default.reject(t)}),p.interceptors.response.use(function(t){var e=t.data;return 0!==e.status?(f.default.$vux.toast.show({text:e.error,time:3e3,width:"auto",type:"text",position:"bottom"}),a.default.reject({error:e})):e},function(t){return console.log("err"+t),f.default.$vux.toast.show({text:t.message,time:3e3,width:"auto",type:"warn"}),a.default.reject(t)}),e.default=p},6:function(t,e){},7:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{value:{type:Boolean,default:!1},text:String,position:String},created:function(){this.show=this.value},data:function(){return{show:!1}},watch:{value:function(t){this.show=t},show:function(t){this.$emit("input",t)}}}},8:function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var i=n(38),a=o(i);e.default={mixins:[a.default],props:{value:Boolean,time:{type:Number,default:2e3},type:{type:String,default:"success"},transition:String,width:{type:String,default:"7.6em"},isShowMask:{type:Boolean,default:!1},text:String,position:String},data:function(){return{show:!1}},created:function(){this.value&&(this.show=!0)},computed:{currentTransition:function(){return this.transition?this.transition:"top"===this.position?"vux-slide-from-top":"bottom"===this.position?"vux-slide-from-bottom":"vux-fade"},toastClass:function(){return{"weui-toast_forbidden":"warn"===this.type,"weui-toast_cancel":"cancel"===this.type,"weui-toast_success":"success"===this.type,"weui-toast_text":"text"===this.type,"vux-toast-top":"top"===this.position,"vux-toast-bottom":"bottom"===this.position,"vux-toast-middle":"middle"===this.position}},style:function(){if("text"===this.type&&"auto"===this.width)return{padding:"10px"}}},watch:{show:function(t){var e=this;t&&(this.$emit("input",!0),this.$emit("on-show"),this.fixSafariOverflowScrolling("auto"),clearTimeout(this.timeout),this.timeout=setTimeout(function(){e.show=!1,e.$emit("input",!1),e.$emit("on-hide"),e.fixSafariOverflowScrolling("touch")},this.time))},value:function(t){this.show=t}}}},9:function(t,e){},10:function(t,e){},11:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:"vux-mask"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"weui-loading_toast"},[n("div",{staticClass:"weui-mask_transparent"}),t._v(" "),n("div",{staticClass:"weui-toast",style:{position:t.position}},[n("i",{staticClass:"weui-loading weui-icon_toast"}),t._v(" "),n("p",{staticClass:"weui-toast__content"},[t._v(t._s(t.text||"加载中")),t._t("default")],2)])])])},staticRenderFns:[]}},12:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-toast"},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowMask&&t.show,expression:"isShowMask && show"}],staticClass:"weui-mask_transparent"}),t._v(" "),n("transition",{attrs:{name:t.currentTransition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"weui-toast",class:t.toastClass,style:{width:t.width}},[n("i",{directives:[{name:"show",rawName:"v-show",value:"text"!==t.type,expression:"type !== 'text'"}],staticClass:"weui-icon-success-no-circle weui-icon_toast"}),t._v(" "),t.text?n("p",{staticClass:"weui-toast__content",style:t.style,domProps:{innerHTML:t._s(t.text)}}):n("p",{staticClass:"weui-toast__content"},[t._t("default")],2)])])],1)},staticRenderFns:[]}},13:function(t,e,n){var o,i;n(9),o=n(7);var a=n(11);i=o=o||{},"object"!=typeof o.default&&"function"!=typeof o.default||(i=o=o.default),"function"==typeof i&&(i=i.options),i.render=a.render,i.staticRenderFns=a.staticRenderFns,t.exports=o},14:function(t,e){"use strict";function n(){return localStorage.getItem(f)}function o(t){return localStorage.setItem(f,t)}function i(){return localStorage.removeItem(f)}function a(){return localStorage.getItem(p)}function s(t){return localStorage.setItem(p,t)}function r(){return localStorage.removeItem(p)}function l(){return localStorage.getItem(m)||3}function c(t){return localStorage.setItem(m,t)}function u(){return localStorage.removeItem(m)}function d(){return localStorage.getItem(h)}Object.defineProperty(e,"__esModule",{value:!0}),e.getToken=n,e.setToken=o,e.removeToken=i,e.getGid=a,e.setGid=s,e.removeGid=r,e.getFrom=l,e.setFrom=c,e.removeFrom=u,e.getVersion=d;var f="token",p="gid",m="from",h="version"},21:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{title:String,titleColor:String,labelWidth:String,labelAlign:String,labelMarginRight:String,gutter:String}}},22:function(t,e){},24:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.title?n("div",{staticClass:"weui-cells__title",style:{color:t.titleColor},domProps:{innerHTML:t._s(t.title)}}):t._e(),t._v(" "),n("div",{staticClass:"weui-cells",class:{"vux-no-group-title":!t.title},style:{marginTop:t.gutter}},[t._t("after-title"),t._v(" "),t._t("default")],2)])},staticRenderFns:[]}},26:function(t,e,n){var o,i;n(22),o=n(21);var a=n(24);i=o=o||{},"object"!=typeof o.default&&"function"!=typeof o.default||(i=o=o.default),"function"==typeof i&&(i=i.options),i.render=a.render,i.staticRenderFns=a.staticRenderFns,t.exports=o},27:function(t,e,n){var o,i;n(31);var a=n(33);i=o=o||{},"object"!=typeof o.default&&"function"!=typeof o.default||(i=o=o.default),"function"==typeof i&&(i=i.options),i.render=a.render,i.staticRenderFns=a.staticRenderFns,t.exports=o},29:function(t,e,n){var o,i;n(32),o=n(30);var a=n(34);i=o=o||{},"object"!=typeof o.default&&"function"!=typeof o.default||(i=o=o.default),"function"==typeof i&&(i=i.options),i.render=a.render,i.staticRenderFns=a.staticRenderFns,t.exports=o},30:function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var i=n(27),a=o(i),s=n(55),r=n(63),l=o(r);e.default={components:{InlineDesc:a.default},props:(0,l.default)(),computed:{valueClass:function(){return{"vux-cell-primary":"content"===this.primary||"left"===this.valueAlign,"vux-cell-align-left":"left"===this.valueAlign,"vux-cell-arrow-transition":!!this.arrowDirection,"vux-cell-arrow-up":"up"===this.arrowDirection,"vux-cell-arrow-down":"down"===this.arrowDirection}}},methods:{getLabelStyles:function(){return{width:this.$parent.labelWidth||this.$parent.$parent.labelWidth,textAlign:this.$parent.labelAlign||this.$parent.$parent.labelAlign,marginRight:this.$parent.labelMarginRight||this.$parent.$parent.labelMarginRight}},onClick:function(){(0,s.go)(this.link,this.$router)}}}},31:function(t,e){},32:function(t,e){},33:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",{staticClass:"vux-label-desc"},[t._t("default")],2)},staticRenderFns:[]}},34:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"weui-cell",class:{"vux-tap-active":t.isLink||!!t.link,"weui-cell_access":t.isLink||!!t.link,"vux-cell-no-border-intent":!t.borderIntent},on:{click:t.onClick}},[n("div",{staticClass:"weui-cell__hd"},[t._t("icon")],2),t._v(" "),n("div",{staticClass:"vux-cell-bd",class:{"vux-cell-primary":"title"===t.primary&&"left"!==t.valueAlign}},[n("p",[t.title?n("label",{staticClass:"vux-label",style:t.getLabelStyles()},[t._v(t._s(t.title))]):t._e(),t._v(" "),t._t("after-title")],2),t._v(" "),n("inline-desc",[t._t("inline-desc",[t._v(t._s(t.inlineDesc))])],2)],1),t._v(" "),n("div",{staticClass:"weui-cell__ft",class:t.valueClass},[t._t("value"),t._v(" "),t._t("default",[t._v(t._s(t.value))]),t._v(" "),t.isLoading?n("i",{staticClass:"weui-loading"}):t._e()],2),t._v(" "),t._t("child")],2)},staticRenderFns:[]}},36:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={getUrlKey:function(t){if("type"==t){var e=decodeURIComponent((new RegExp("[?|&]"+t+"=([^&;]+?)(&|#|;|$)").exec(location.href)||["",""])[1].replace(/\+/g,"%20"))||null;return e}if("code"==t){var e=decodeURIComponent((new RegExp("[?|&]"+t+"=([^&;]+?)(&|#|;|$)").exec(location.href)||["",""])[1].replace(/\+/g,"%20"))||null;return e}if("id"==t){var e=decodeURIComponent((new RegExp("[?|&]"+t+"=([^&;]+?)(&|#|;|$)").exec(location.href)||["",""])[1].replace(/\+/g,"%20"))||/\/\d{1,8}/.exec(location.href)[0].replace("/","")||null;return e}}}},37:function(t,e,n){var o,i;n(10),o=n(8);var a=n(12);i=o=o||{},"object"!=typeof o.default&&"function"!=typeof o.default||(i=o=o.default),"function"==typeof i&&(i=i.options),i.render=a.render,i.staticRenderFns=a.staticRenderFns,t.exports=o},41:function(t,e){},44:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"failed",data:function(){return{}},props:{msg:String},components:{},created:function(){},methods:{}}},45:function(t,e){},46:function(t,e,n){t.exports=n.p+"m/static/img/pay_result_failure.dac5b24.png"},47:function(t,e,n){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"failed"}},[o("img",{attrs:{src:n(46),alt:""}}),t._v(" "),o("p",[t._v(t._s(t.msg))])])},staticRenderFns:[]}},48:function(t,e,n){var o,i;n(45),o=n(44);var a=n(47);i=o=o||{},"object"!=typeof o.default&&"function"!=typeof o.default||(i=o=o.default),"function"==typeof i&&(i=i.options),i.render=a.render,i.staticRenderFns=a.staticRenderFns,t.exports=o},50:function(t,e){"use strict";function n(t){var e=new Date(t),n=new Date;if(o(new Date(t),"yyyy")-o(n,"yyyy")<0)return o(e,"yyyy-MM-dd");if(o(new Date(t),"MM")-o(n,"MM")<0)return o(e,"MM-dd");var i=o(n,"dd")-o(e,"dd");if(0==i){var a=o(n,"hh")-o(e,"hh");if(0==a){var s=o(n,"mm")-o(e,"mm");return s<5?"刚刚":isNaN(s)?"1小时前":s+"分钟前"}return a+"小时前"}return 1==i?"昨天":i+"天前"}function o(t,e){/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length)));var n={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds()};for(var o in n)if(new RegExp("("+o+")").test(e)){var i=(n[o]+"").replace(/^0/,"");e=e.replace(RegExp.$1,1===RegExp.$1.length?i:a(i))}return e}function i(t,e){/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length)));var n={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds()};for(var o in n)if(new RegExp("("+o+")").test(e)){var i=(n[o]+"").replace(/^0/,"");e=e.replace(RegExp.$1,1===RegExp.$1.length?i:s(i))}return e}function a(t){return("00"+t).substr(t.length)}function s(t){return t}Object.defineProperty(e,"__esModule",{value:!0}),e.formatedDate=n,e.formatDate=o,e.formatDate2=i},52:function(t,e,n){var o,i;n(56),o=n(53);var a=n(59);i=o=o||{},"object"!=typeof o.default&&"function"!=typeof o.default||(i=o=o.default),"function"==typeof i&&(i=i.options),i.render=a.render,i.staticRenderFns=a.staticRenderFns,t.exports=o},53:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{showLoading:{type:Boolean,default:!0},tip:String,backgroundColor:String},methods:{getStyle:function(){if(!this.showLoading&&this.tip)return{"background-color":this.backgroundColor}}}}},56:function(t,e){},59:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"weui-loadmore",class:{"weui-loadmore_line":!t.showLoading,"weui-loadmore_dot":!t.showLoading&&!t.tip}},[t.showLoading?n("i",{staticClass:"weui-loading"}):t._e(),t._v(" "),n("span",{directives:[{name:"show",rawName:"v-show",value:t.tip||!t.showLoading,expression:"tip || !showLoading"}],staticClass:"weui-loadmore__tips",style:t.getStyle()},[t._v(t._s(t.tip))])])},staticRenderFns:[]}},69:function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var i=n(2),a=o(i),s=n(1),r=o(s),l=n(52),c=o(l),u=n(3);e.default={name:"load",data:function(){return{pn:0,nonedata:!1,commentBottomMsg:"点击，立即加载更多",loadmore:!0,islazyload:!0,allload:!1}},props:{url:String,pid:String,datalist:Array,params:String,id:String},components:{LoadMore:c.default},created:function(){var t=this;window.onscroll=function(){var e=(0,u.getClient)(),n=(0,u.getBody)();n.top+e.height>=n.height-10&&t.islazyload&&(this.islazyload=!1,t.dataLoad())}},methods:{dataLoad:function(){this.allload||(this.loadmore=!1,this.fetchData(++this.pn))},fetchData:function(t){var e=this,n=this;a.default.httpGet(r.default,HOST+this.url+"?pn="+t,{pid:this.pid,id:this.id},function(t){0==t.status?(n.islazyload=!0,n.loadmore=!0,t.has_next||(n.allload=!0,n.commentBottomMsg="- 到底啦 -"),n.params||(n.params="articles"),e.$emit("getData",t[n.params])):n.loadmore=!0},function(t){console.log(t),n.loadmore=!0})}}}},70:function(t,e){},71:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"load"}},[t.nonedata?t._e():n("div",{staticClass:"comment-bottom"},[t.loadmore?n("p",{staticClass:"clickload",on:{click:t.dataLoad}},[t._v(t._s(t.commentBottomMsg))]):n("load-more",{attrs:{tip:"正在加载"}},[t._v("正在加载")])],1)])},staticRenderFns:[]}},72:function(t,e,n){var o,i;n(70),o=n(69);var a=n(71);i=o=o||{},"object"!=typeof o.default&&"function"!=typeof o.default||(i=o=o.default),"function"==typeof i&&(i=i.options),i.render=a.render,i.staticRenderFns=a.staticRenderFns,t.exports=o},85:function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var i=n(1);o(i);e.default={name:"titlebar",props:{title:String,more:String,url:String,line:String,img:String},data:function(){return{}},components:{},mounted:function(){},methods:{toskip:function(){window.location.href=this.url}}}},86:function(t,e){},87:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"titlebar"}},[n("div",{staticClass:"con"},[t.img?n("img",{staticClass:"img",attrs:{src:t.img,alt:"."}}):t._e(),t._v(" "),n("span",{domProps:{innerHTML:t._s(t.title)}}),t._v(" "),t.more?n("span",{staticClass:"more",domProps:{innerHTML:t._s(t.more)},on:{click:t.toskip}}):t._e(),t._v(" "),t.more?n("span",{staticClass:"nstep"}):t._e()]),t._v(" "),t.line?n("div",{staticClass:"line vux-1px-b"}):t._e()])},staticRenderFns:[]}},88:function(t,e,n){var o,i;n(86),o=n(85);var a=n(87);i=o=o||{},"object"!=typeof o.default&&"function"!=typeof o.default||(i=o=o.default),"function"==typeof i&&(i=i.options),i.render=a.render,i.staticRenderFns=a.staticRenderFns,t.exports=o},346:function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),n(6),n(4);var i=(n(3),n(88)),a=o(i),s=n(72),r=o(s),l=n(36),c=o(l),u=n(2),d=o(u),f=n(13),p=o(f),m=n(48),h=o(m),g=n(1),v=o(g),_=n(16),w=o(_),y=n(50),x=n(26),S=o(x),b=n(29),C=o(b),k=n(40),M=o(k),I=n(39),R=o(I);v.default.use(w.default),v.default.prototype.$geturlpara=c.default,e.default={data:function(){return{id:0,loadingshow:!0,loadtext:"loading...",showContent:!1,failedshow:!1,failedmsg:"服务请求失败，请刷新重试",dataInfo:{}}},components:{LazyLoadingMore:r.default,TitleBar:a.default,Group:S.default,Cell:C.default,Loading:p.default,Failed:h.default},beforeCreate:function(){getAuth(R.default,M.default)},created:function(){},mounted:function(){this.id=this.$geturlpara.getUrlKey("id"),this.fetchData(this.id)},methods:{fetchData:function(){try{var t=this.$geturlpara.getUrlKey("type")}catch(t){var t=0}if("mid"==t)var e={mid:this.id};else var e={pid:this.id};var n=HOST+"/api/users/user_center2.json";d.default.httpGet(v.default,n,e,this.fetchResult)},fetchResult:function(t){0==t.status&&(this.dataInfo=t,this.loadingshow=!1,this.showContent=!0),5==t.status&&(localStorage.clear(),clearcookie(R.default),getAuth(R.default,M.default))},toSkip:function(t){window.location.href="/m/"+t},toChannelSmall:function(t){window.location.href="/m/channel-small.html?id="+t.id},toChannel:function(t){window.location.href="/m/channel.html?id="+t.id},toDetail:function(t){window.location.href="/m/detail.html?id="+t.id},loadList:function(t){this.dataInfo.timeline.items=this.dataInfo.timeline.items.concat(t)}},filters:{formatDate:y.formatedDate}}},458:function(t,e){},557:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"moments"}},[t.showContent?n("div",{staticClass:"content"},[n("div",{staticClass:"profile"},[n("div",{staticClass:"headimg"},[n("img",{staticClass:"head",attrs:{src:t.dataInfo.user.photo,alt:"头像"}}),t._v(" "),0!=t.dataInfo.user.level||"S"==t.dataInfo.user.gender?n("img",{staticClass:"level",attrs:{src:t.dataInfo.user.vip_icon,alt:"会员"}}):t._e(),t._v(" "),n("p",{domProps:{innerHTML:t._s(t.dataInfo.user.name)}})])]),t._v(" "),t.dataInfo.small_channels.items.length?n("div",[n("TitleBar",{attrs:{title:t.dataInfo.small_channels.name,img:t.dataInfo.small_channels.image}}),t._v(" "),n("group",{staticClass:"author-info"},t._l(t.dataInfo.small_channels.items,function(e){return n("cell",{attrs:{value:"","is-link":""},nativeOn:{click:function(n){t.toChannelSmall(e)}}},[n("p",{staticClass:"p-1"},[t._v(t._s(e.name))]),t._v(" "),n("p",{staticClass:"p-2"},[t._v(t._s(e.brief))]),t._v(" "),n("img",{attrs:{src:e.thumb,alt:"头像"},slot:"icon"})])}))],1):t._e(),t._v(" "),t.dataInfo.big_channels.items.length?n("div",[n("TitleBar",{attrs:{title:t.dataInfo.big_channels.name,img:t.dataInfo.big_channels.image}}),t._v(" "),n("group",{staticClass:"author-info"},t._l(t.dataInfo.big_channels.items,function(e){return n("cell",{attrs:{value:"","is-link":""},nativeOn:{click:function(n){t.toChannel(e)}}},[n("p",{staticClass:"p-1"},[t._v(t._s(e.name))]),t._v(" "),n("p",{staticClass:"p-2"},[t._v(t._s(e.brief))]),t._v(" "),n("img",{attrs:{src:e.thumb,alt:"头像"},slot:"icon"})])}))],1):t._e(),t._v(" "),t.dataInfo.timeline.items.length?n("div",[n("TitleBar",{attrs:{title:t.dataInfo.timeline.name,img:t.dataInfo.timeline.image}}),t._v(" "),n("group",{staticClass:"author-timeline"},t._l(t.dataInfo.timeline.items,function(e){return n("cell",{attrs:{value:""},nativeOn:{click:function(n){t.toDetail(e.item)}}},[n("img",{staticClass:"heard-img",attrs:{src:t.dataInfo.user.photo,alt:"头像"}}),t._v(" "),n("div",{staticClass:"div"},[n("p",{staticClass:"p-1"},[t._v(t._s(t.dataInfo.user.name))]),t._v(" "),n("p",{staticClass:"p-2"},[t._v(t._s(t._f("formatDate")(e.time))+"\n              "),1==e.type?n("span",[t._v("发表文章")]):t._e(),t._v(" "),2==e.type?n("span",[t._v("发表评论")]):t._e(),t._v(" "),3==e.type?n("span",[t._v("点赞文章")]):t._e(),t._v(" "),4==e.type?n("span",[t._v("点赞文章")]):t._e()])]),t._v(" "),n("p",{staticClass:"comment"},[t._v("\n            "+t._s(e.content)+"\n          ")]),t._v(" "),n("div",{staticClass:"box"},[n("img",{attrs:{src:e.item.thumb,alt:""}}),t._v(" "),n("span",{staticClass:"cankao"}),t._v(" "),n("span",{staticClass:"text"},[t._v(t._s(e.item.name))])])])}))],1):t._e(),t._v(" "),n("LazyLoadingMore",{attrs:{url:"/api/users/timeline.json",params:"items",pid:t.dataInfo.user.id},on:{getData:t.loadList}})],1):t._e(),t._v(" "),t.failedshow?n("Failed",{attrs:{msg:t.failedmsg}}):t._e(),t._v(" "),n("Loading",{attrs:{text:t.loadtext},model:{value:t.loadingshow,callback:function(e){t.loadingshow=e},expression:"loadingshow"}})],1)},staticRenderFns:[]}},631:function(t,e,n){var o,i;n(458),o=n(346);var a=n(557);i=o=o||{},"object"!=typeof o.default&&"function"!=typeof o.default||(i=o=o.default),"function"==typeof i&&(i=i.options),i.render=a.render,i.staticRenderFns=a.staticRenderFns,t.exports=o}});