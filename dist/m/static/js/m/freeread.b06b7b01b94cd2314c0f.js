webpackJsonp([19,0],{0:function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}var i=n(1),s=o(i),l=n(403),a=o(l);new s.default({el:"#freeread",template:"<App/>",components:{App:a.default}})},2:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={ajaxPost:function(t,e,n,o){$.ajax({url:t,type:"POST",data:e,success:function(t){n(t)},error:function(t){o(t)}})},ajaxGet:function(){},httpPost:function(t,e,n,o,i){t.http.options.emulateJSON=!0,t.http.options.headers={"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},t.http.interceptors.push(function(t,e){t.headers.set("from","3"),t.headers.set("gid",localStorage.getItem("gid")),t.headers.set("token",localStorage.getItem("token")),t.headers.set("version",VERSION),e()}),t.http.post(e,n).then(function(t){return t.bodyText}).then(function(t){var t=JSON.parse(t);o(t)},function(t){i(t)})},httpGet:function(t,e,n,o,i){t.http.options.emulateJSON=!0,t.http.options.headers={"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},t.http.interceptors.push(function(t,e){t.headers.set("from","3"),t.headers.set("gid",localStorage.getItem("gid")),t.headers.set("token",localStorage.getItem("token")),t.headers.set("version",VERSION),e()}),t.http.get(e,n).then(function(t){return t.bodyText}).then(function(t){var t=JSON.parse(t);o(t)},function(t){i(t)})}}},3:function(t,e){},4:function(t,e,n){"use strict";!function(){var t=document.documentElement.clientWidth||document.body.clientWidth;t=t>640?640:t;var e=t/750*100;e=e<50?e:50,document.documentElement.style.fontSize=e+"px",t<350?window.phonetype="small":window.phonetype="large"}(),window.VERSION="0.1",window.HOST="http://api.kofuf.com",window.HOSTM="http://m.kofuf.com";var o=n(21);o.attach(document.body),window.getAuthLink=function(t){return"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx05e842991e5fa0b2&redirect_uri=http://api.kofuf.com%2Fapi%2Fsession%2Fauth_weixin&response_type=code&scope=snsapi_userinfo&state="+t+"#wechat_redirect"},window.getAuth=function(t,e,n,o){var i=t.get("gid"),s=e.parse();if(!localStorage.getItem("gid")||""==localStorage.getItem("gid"))if("undefined"!=typeof s.gid)localStorage.setItem("gid",s.gid),localStorage.setItem("token",s.token);else if("undefined"!=typeof i)localStorage.setItem("gid",t.get("gid")),localStorage.setItem("token",t.get("token"));else{var l;l=void 0!=o?n+"_"+o:n,window.location.href=getAuthLink(l)}},window.clearcookie=function(t){localStorage.clear(),t.set("gid",0,{domain:".kofuf.com",path:"/",expires:-1}),t.set("token",0,{domain:".kofuf.com",path:"/",expires:-1})}},6:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{value:{type:Boolean,default:!1},text:String,position:String},created:function(){this.show=this.value},data:function(){return{show:!1}},watch:{value:function(t){this.show=t},show:function(t){this.$emit("input",t)}}}},7:function(t,e){},8:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:"vux-mask"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"weui-loading_toast"},[n("div",{staticClass:"weui-mask_transparent"}),t._v(" "),n("div",{staticClass:"weui-toast",style:{position:t.position}},[n("i",{staticClass:"weui-loading weui-icon_toast"}),t._v(" "),n("p",{staticClass:"weui-toast__content"},[t._v(t._s(t.text||"加载中")),t._t("default")],2)])])])},staticRenderFns:[]}},9:function(t,e,n){var o,i;n(7),o=n(6);var s=n(8);i=o=o||{},"object"!=typeof o.default&&"function"!=typeof o.default||(i=o=o.default),"function"==typeof i&&(i=i.options),i.render=s.render,i.staticRenderFns=s.staticRenderFns,t.exports=o},16:function(t,e){"use strict";function n(t){var e=new Date(t),n=new Date;if(o(new Date(t),"yyyy")-o(n,"yyyy")<0)return o(e,"yyyy-MM-dd");if(o(new Date(t),"MM")-o(n,"MM")<0)return o(e,"MM-dd");var i=o(n,"dd")-o(e,"dd");if(0==i){var s=o(n,"hh")-o(e,"hh");if(0==s){var l=o(n,"mm")-o(e,"mm");return l<5?"刚刚":isNaN(l)?"1小时前":l+"分钟前"}return s+"小时前"}return 1==i?"昨天":i+"天前"}function o(t,e){/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length)));var n={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds()};for(var o in n)if(new RegExp("("+o+")").test(e)){var i=(n[o]+"").replace(/^0/,"");e=e.replace(RegExp.$1,1===RegExp.$1.length?i:s(i))}return e}function i(t,e){/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length)));var n={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds()};for(var o in n)if(new RegExp("("+o+")").test(e)){var i=(n[o]+"").replace(/^0/,"");e=e.replace(RegExp.$1,1===RegExp.$1.length?i:l(i))}return e}function s(t){return("00"+t).substr(t.length)}function l(t){return t}Object.defineProperty(e,"__esModule",{value:!0}),e.formatedDate=n,e.formatDate=o,e.formatDate2=i},25:function(t,e){},37:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={getUrlKey:function(t){var e=decodeURIComponent((new RegExp("[?|&]"+t+"=([^&;]+?)(&|#|;|$)").exec(location.href)||["",""])[1].replace(/\+/g,"%20"))||/\/\d{1,8}/.exec(location.href)[0].replace("/","")||null;return e}}},45:function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var i=n(64),s=o(i);e.default={mixins:[s.default],props:{value:Boolean,time:{type:Number,default:2e3},type:{type:String,default:"success"},transition:String,width:{type:String,default:"7.6em"},isShowMask:{type:Boolean,default:!1},text:String,position:String},data:function(){return{show:!1}},created:function(){this.value&&(this.show=!0)},computed:{currentTransition:function(){return this.transition?this.transition:"top"===this.position?"vux-slide-from-top":"bottom"===this.position?"vux-slide-from-bottom":"vux-fade"},toastClass:function(){return{"weui-toast_forbidden":"warn"===this.type,"weui-toast_cancel":"cancel"===this.type,"weui-toast_success":"success"===this.type,"weui-toast_text":"text"===this.type,"vux-toast-top":"top"===this.position,"vux-toast-bottom":"bottom"===this.position,"vux-toast-middle":"middle"===this.position}},style:function(){if("text"===this.type&&"auto"===this.width)return{padding:"10px"}}},watch:{show:function(t){var e=this;t&&(this.$emit("input",!0),this.$emit("on-show"),this.fixSafariOverflowScrolling("auto"),clearTimeout(this.timeout),this.timeout=setTimeout(function(){e.show=!1,e.$emit("input",!1),e.$emit("on-hide"),e.fixSafariOverflowScrolling("touch")},this.time))},value:function(t){this.show=t}}}},47:function(t,e){},48:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-toast"},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowMask&&t.show,expression:"isShowMask && show"}],staticClass:"weui-mask_transparent"}),t._v(" "),n("transition",{attrs:{name:t.currentTransition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"weui-toast",class:t.toastClass,style:{width:t.width}},[n("i",{directives:[{name:"show",rawName:"v-show",value:"text"!==t.type,expression:"type !== 'text'"}],staticClass:"weui-icon-success-no-circle weui-icon_toast"}),t._v(" "),t.text?n("p",{staticClass:"weui-toast__content",style:t.style,domProps:{innerHTML:t._s(t.text)}}):n("p",{staticClass:"weui-toast__content"},[t._t("default")],2)])])],1)},staticRenderFns:[]}},55:function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}function i(t){return JSON.parse((0,l.default)(t))}Object.defineProperty(e,"__esModule",{value:!0});var s=n(66),l=o(s),a=n(51),u=o(a),r=n(108),c=o(r),d=n(106),f=o(d),p=n(107),h=o(p),g=function(){return{content:"Pull Down To Refresh",height:60,autoRefresh:!1,downContent:"Pull Down To Refresh",upContent:"Release To Refresh",loadingContent:"Loading...",clsPrefix:"xs-plugin-pulldown-"}},w=function(){return{content:"Pull Up To Refresh",pullUpHeight:60,height:40,autoRefresh:!1,downContent:"Release To Refresh",upContent:"Pull Up To Refresh",loadingContent:"Loading...",clsPrefix:"xs-plugin-pullup-"}};e.default={props:{value:{type:Object,default:function(){return{pulldownStatus:"",pullupStatus:""}}},height:String,lockX:Boolean,lockY:Boolean,scrollbarX:Boolean,scrollbarY:Boolean,bounce:{type:Boolean,default:!0},useOriginScroll:{type:Boolean,default:!1},useTransition:{type:Boolean,default:!0},preventDefault:{type:Boolean,default:!1},stopPropagation:Boolean,boundryCheck:{type:Boolean,default:!0},gpuAcceleration:{type:Boolean,default:!0},usePulldown:{type:Boolean,default:!1},usePullup:{type:Boolean,default:!1},pulldownConfig:{type:Object,default:function(){return{}}},pullupConfig:{type:Object,default:function(){return{}}},enableHorizontalSwiping:{type:Boolean,default:!1},scrollBottomOffset:{type:Number,default:0}},methods:{reset:function(t,e,n){t&&("undefined"!=typeof t.left&&this._xscroll.scrollLeft(t.left,e,n),"undefined"!=typeof t.top&&this._xscroll.scrollTop(t.top,e,n)),this._xscroll&&this._xscroll.resetSize()},donePulldown:function(){var t=this;this.pulldown.reset(function(){t.reset()}),this.currentValue.pulldownStatus="default"},disablePullup:function(){this.pullup.stop(),this.currentValue.pullupStatus="disabled"},enablePullup:function(){this.currentValue.pullupStatus="default",this.pullup.restart()},donePullup:function(){this.pullup.complete(),this.reset(),this.currentValue.pullupStatus="default"},getStyles:function(){var t=this.height;!this.height&&this.$el&&!this.$el.style.height&&this.lockX&&(t=document.documentElement.clientHeight+"px",this.reset()),this.height&&0===this.height.indexOf("-")&&(t=document.documentElement.clientHeight+parseInt(this.height)+"px"),this.styles={height:""+t}}},created:function(){var t=this;this.value?this.currentValue=this.value:this.currentValue={pulldownStatus:"",pullupStatus:""},this.handleOrientationchange=function(){setTimeout(function(){t.reset()},100)}},data:function(){return{currentValue:{},styles:{}}},watch:{currentValue:{handler:function(t){this.$emit("input",i(t))},deep:!0},height:function(){this.getStyles()},value:{handler:function(t){"default"===t.pullupStatus&&"default"!==this.currentValue.pullupStatus&&this.donePullup(),"default"===t.pulldownStatus&&"default"!==this.currentValue.pulldownStatus&&this.donePulldown(),"disabled"===t.pullupStatus&&"disabled"!==this.currentValue.pullupStatus&&this.disablePullup(),"enabled"===t.pullupStatus&&"disabled"===this.currentValue.pullupStatus&&this.enablePullup()},deep:!0}},mounted:function(){var t=this;this.uuid=Math.random().toString(36).substring(3,8),this.$nextTick(function(){t.$el.setAttribute("id","vux-scroller-"+t.uuid);var e=null;if(t.$slots.default&&(e=t.$slots.default[0].elm),!e)throw new Error("no content is found");if(t._xscroll=new c.default({renderTo:"#vux-scroller-"+t.uuid,lockX:t.lockX,lockY:t.lockY,scrollbarX:t.scrollbarX,scrollbarY:t.scrollbarY,content:e,bounce:t.bounce,useOriginScroll:t.useOriginScroll,useTransition:t.useTransition,preventDefault:t.preventDefault,boundryCheck:t.boundryCheck,gpuAcceleration:t.gpuAcceleration,stopPropagation:t.stopPropagation}),t._xscroll.on("scroll",function(){if(t._xscroll){var e=t._xscroll.getScrollTop();t.$emit("on-scroll",{top:e,left:t._xscroll.getScrollLeft()});var n=t._xscroll.containerHeight,o=t._xscroll.height;e>=n-o-t.scrollBottomOffset&&t.$emit("on-scroll-bottom")}}),t.usePulldown){var n=t.$slots.pulldown,o=(0,u.default)(g(),t.pulldownConfig);n&&(o.container=n[0].elm),t.pulldown=new f.default(o),t._xscroll.plug(t.pulldown),t.pulldown.on("loading",function(e){t.$emit("on-pulldown-loading",t.uuid)}),t.pulldown.on("statuschange",function(e){t.currentValue.pulldownStatus=e.newVal})}if(t.usePullup){var i=t.$slots.pullup,s=(0,u.default)(w(),t.pullupConfig);i&&(s.container=i[0].elm),t.pullup=new h.default(s),t._xscroll.plug(t.pullup),t.pullup.on("loading",function(e){t.$emit("on-pullup-loading",t.uuid)}),t.pullup.on("statuschange",function(e){t.currentValue.pullupStatus=e.newVal})}t.enableHorizontalSwiping&&(t._xscroll.on("panstart",function(e){2!==e.direction&&4!==e.direction||(e.preventDefault(),t.scrollbarY&&(t._xscroll.userConfig.scrollbarY=!1),t._xscroll.userConfig.lockY=!0)}),t._xscroll.on("panend",function(){t.scrollbarY&&(t._xscroll.userConfig.scrollbarY=!0),t._xscroll.userConfig.lockY=!1})),t._xscroll.render(),window.addEventListener("orientationchange",t.handleOrientationchange,!1)}),this.getStyles()},beforeDestroy:function(){this.pullup&&(this._xscroll.unplug(this.pullup),this.pullup.pluginDestructor()),this.pulldown&&(this._xscroll.unplug(this.pulldown),this.pulldown.pluginDestructor()),window.removeEventListener("orientationchange",this.handleOrientationchange,!1),this._xscroll.destroy(),this._xscroll=null}}},56:function(t,e){},57:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{style:t.styles},[n("div",{staticClass:"xs-container"},[t._t("default"),t._v(" "),t._t("pulldown"),t._v(" "),t._t("pullup")],2)])},staticRenderFns:[]}},58:function(t,e,n){var o,i;n(56),o=n(55);var s=n(57);i=o=o||{},"object"!=typeof o.default&&"function"!=typeof o.default||(i=o=o.default),"function"==typeof i&&(i=i.options),i.render=s.render,i.staticRenderFns=s.staticRenderFns,t.exports=o},61:function(t,e,n){var o,i;n(47),o=n(45);var s=n(48);i=o=o||{},"object"!=typeof o.default&&"function"!=typeof o.default||(i=o=o.default),"function"==typeof i&&(i=i.options),i.render=s.render,i.staticRenderFns=s.staticRenderFns,t.exports=o},81:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(16);e.default={name:"list",data:function(){return{}},props:{freeshow:Boolean,datalist:Array},components:{},created:function(){},methods:{toDetail:function(t){location.href="/m/detail.html?id="+t}},filters:{formatDate:o.formatedDate}}},89:function(t,e){},90:function(t,e,n){t.exports=n.p+"m/static/img/read.b7c743a.png"},100:function(t,e,n){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"list"}},t._l(t.datalist,function(e){return o("li",{on:{click:function(n){t.toDetail(e.id)}}},[o("div",{staticClass:"title"},[t._v("\n     "+t._s(e.name)+"\n   ")]),t._v(" "),o("div",{staticClass:"img vux-1px-b"},[o("img",{attrs:{src:e.thumb,alt:"",onerror:"this.src='http://static0.kofuf.com/1493739178223.jpg?imageView2/1/w/200/h/133/q/100|imageslim'"}}),t._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:t.freeshow,expression:"freeshow"}],staticClass:"hint"},[t._v("\n       试读\n     ")])]),t._v(" "),o("span",{staticClass:"date"},[t._v(t._s(t._f("formatDate")(e.published)))]),t._v(" "),o("span",{staticClass:"view"},[o("img",{attrs:{src:n(90),alt:""}}),t._v(t._s(e.view_count)+" 人看过")])])}))},staticRenderFns:[]}},103:function(t,e,n){var o,i;n(89),o=n(81);var s=n(100);i=o=o||{},"object"!=typeof o.default&&"function"!=typeof o.default||(i=o=o.default),"function"==typeof i&&(i=i.options),i.render=s.render,i.staticRenderFns=s.staticRenderFns,t.exports=o},226:function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),n(3),n(4);var i=n(2),s=o(i),l=n(37),a=o(l),u=n(103),r=o(u),c=n(1),d=o(c),f=n(9),p=o(f),h=n(65),g=o(h),w=n(39),v=(o(w),n(38)),m=(o(v),n(58)),y=o(m),_=n(10),x=o(_);d.default.use(x.default),d.default.use(g.default),d.default.prototype.$geturlpara=a.default,e.default={name:"freeread",components:{Loading:p.default,List:r.default,Scroller:y.default},data:function(){return{showContent:!1,loadingshow:!0,articlesList:{suites:[{price:""}]}}},created:function(){var t=this.$geturlpara.getUrlKey("id");this.getData(t)},methods:{getData:function(t){var e=this;console.log("get"+t),s.default.httpGet(d.default,HOST+"/api/channels/tryout.json?id="+t,{id:t},function(t){console.log(t),e.loadingshow=!1,0!=t.status?(alert(t.error),console.log("请求失败")):(e.showContent=!0,e.articlesList=t)},function(t){e.loadingshow=!1,console.log(t)})}},filters:{formatDate:function(t){function e(e){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(t){var e=new Date(t),n=new Date,o=n-e;return console.log(formatDate(e,"yyyy")-formatDate(n,"yyyy")),o>31536e3?formatDate(e,"yyyy年MM月dd日"):formatDate(e,"MM月dd日")})}}},313:function(t,e){},366:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"freeread"}},[n("p",{staticClass:"hint"},[t._v(t._s(t.articlesList.tip))]),t._v(" "),t.showContent?n("scroller",{ref:"scrollerEvent",attrs:{"lock-x":""}},[t.showContent?n("div",{staticClass:"content"},[n("ul",{staticClass:"channel-list"},[n("list",{attrs:{datalist:t.articlesList.articles,freeshow:!0}})],1)]):t._e()]):t._e(),t._v(" "),n("Loading",{attrs:{text:t.loadtext},model:{value:t.loadingshow,callback:function(e){t.loadingshow=e},expression:"loadingshow"}})],1)},staticRenderFns:[]}},403:function(t,e,n){var o,i;n(313),o=n(226);var s=n(366);i=o=o||{},"object"!=typeof o.default&&"function"!=typeof o.default||(i=o=o.default),"function"==typeof i&&(i=i.options),i.render=s.render,i.staticRenderFns=s.staticRenderFns,t.exports=o}});