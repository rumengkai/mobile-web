webpackJsonp([3,0],{0:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}var o=n(2),s=i(o),a=n(246),r=i(a),u=n(15),l=i(u);s.default.use(l.default),new s.default({el:"#good",template:"<App/>",components:{App:r.default}})},1:function(t,e){},3:function(t,e,n){"use strict";!function(){var t=document.documentElement.clientWidth||document.body.clientWidth;t=t>640?640:t;var e=t/750*100;document.documentElement.style.fontSize=e+"px"}(),window.VERSION="0.1",window.HOST="http://dev.kofuf.com";var i=n(35);i.attach(document.body),window.getAuthLink=function(t,e){return"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx05e842991e5fa0b2&redirect_uri=http://api.kofuf.com%2Fapi%2Fsession%2Fauth_weixin&response_type=code&scope=snsapi_userinfo&state="+t+"_"+e+"#wechat_redirect"},window.getAuth=function(t,e,n,i){var o=t.get("gid"),s=e.parse();localStorage.getItem("gid")||("undefined"!=typeof s.gid?(localStorage.setItem("gid",s.gid),localStorage.setItem("token",s.token)):"undefined"!=typeof o?(localStorage.setItem("gid",t.get("gid")),localStorage.setItem("token",t.get("token"))):window.location.href=getAuthLink(n,i))},window.clearcookie=function(t){localStorage.clear(),t.set("gid",0,{domain:".kofuf.com",path:"/",expires:-1}),t.set("token",0,{domain:".kofuf.com",path:"/",expires:-1})}},5:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={ajaxPost:function(t,e,n,i){$.ajax({url:t,type:"POST",data:e,success:function(t){n(t)},error:function(t){i(t)}})},ajaxGet:function(){},httpPost:function(t,e,n,i,o){t.http.options.emulateJSON=!0,t.http.options.headers={"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},t.http.interceptors.push(function(t,e){t.headers.set("from","3"),t.headers.set("gid",localStorage.getItem("gid")),t.headers.set("token",localStorage.getItem("token")),t.headers.set("version",VERSION),e()}),t.http.post(e,n).then(function(t){return t.bodyText}).then(function(t){var t=JSON.parse(t);i(t)},function(t){o(t)})},httpGet:function(t,e,n,i,o){t.http.options.emulateJSON=!0,t.http.options.headers={"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},t.http.interceptors.push(function(t,e){t.headers.set("from","3"),t.headers.set("gid",localStorage.getItem("gid")),t.headers.set("token",localStorage.getItem("token")),t.headers.set("version",VERSION),e()}),t.http.get(e,n).then(function(t){return t.bodyText}).then(function(t){var t=JSON.parse(t);i(t)},function(t){o(t)})}}},6:function(t,e){"use strict";function n(t){var e=new Date(t),n=new Date;if(i(new Date(t),"yyyy")-i(n,"yyyy")<0)return i(e,"yyyy-MM-dd");if(i(new Date(t),"MM")-i(n,"MM")<0)return i(e,"MM-dd");var o=i(n,"dd")-i(e,"dd");if(0==o){var s=i(n,"hh")-i(e,"hh");if(0==s){var a=i(n,"mm")-i(e,"mm");return a<5?"刚刚":isNaN(a)?s+"小时前":a+"分钟前"}return s+"小时前"}return o+"天前"}function i(t,e){/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length)));var n={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds()};for(var i in n)if(new RegExp("("+i+")").test(e)){var o=(n[i]+"").replace(/^0/,"");e=e.replace(RegExp.$1,1===RegExp.$1.length?o:s(o))}return e}function o(t,e){/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length)));var n={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds()};for(var i in n)if(new RegExp("("+i+")").test(e)){var o=(n[i]+"").replace(/^0/,"");e=e.replace(RegExp.$1,1===RegExp.$1.length?o:a(o))}return e}function s(t){return("00"+t).substr(t.length)}function a(t){return t}Object.defineProperty(e,"__esModule",{value:!0}),e.formatedDate=n,e.formatDate=i,e.formatDate2=o},7:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={getUrlKey:function(t){return decodeURIComponent((new RegExp("[?|&]"+t+"=([^&;]+?)(&|#|;|$)").exec(location.href)||["",""])[1].replace(/\+/g,"%20"))||null}}},8:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{value:{type:Boolean,default:!1},text:String,position:String},created:function(){this.show=this.value},data:function(){return{show:!1}},watch:{value:function(t){this.show=t},show:function(t){this.$emit("input",t)}}}},9:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(56),s=i(o);e.default={mixins:[s.default],props:{value:Boolean,time:{type:Number,default:2e3},type:{type:String,default:"success"},transition:String,width:{type:String,default:"7.6em"},isShowMask:{type:Boolean,default:!1},text:String,position:String},data:function(){return{show:!1}},created:function(){this.value&&(this.show=!0)},computed:{currentTransition:function(){return this.transition?this.transition:"top"===this.position?"vux-slide-from-top":"bottom"===this.position?"vux-slide-from-bottom":"vux-fade"},toastClass:function(){return{"weui-toast_forbidden":"warn"===this.type,"weui-toast_cancel":"cancel"===this.type,"weui-toast_success":"success"===this.type,"weui-toast_text":"text"===this.type,"vux-toast-top":"top"===this.position,"vux-toast-bottom":"bottom"===this.position,"vux-toast-middle":"middle"===this.position}},style:function(){if("text"===this.type&&"auto"===this.width)return{padding:"10px"}}},watch:{show:function(t){var e=this;t&&(this.$emit("input",!0),this.$emit("on-show"),this.fixSafariOverflowScrolling("auto"),clearTimeout(this.timeout),this.timeout=setTimeout(function(){e.show=!1,e.$emit("input",!1),e.$emit("on-hide"),e.fixSafariOverflowScrolling("touch")},this.time))},value:function(t){this.show=t}}}},10:function(t,e){},11:function(t,e){},13:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:"vux-mask"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"weui-loading_toast"},[n("div",{staticClass:"weui-mask_transparent"}),t._v(" "),n("div",{staticClass:"weui-toast",style:{position:t.position}},[n("i",{staticClass:"weui-loading weui-icon_toast"}),t._v(" "),n("p",{staticClass:"weui-toast__content"},[t._v(t._s(t.text||"加载中")),t._t("default")],2)])])])},staticRenderFns:[]}},14:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-toast"},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowMask&&t.show,expression:"isShowMask && show"}],staticClass:"weui-mask_transparent"}),t._v(" "),n("transition",{attrs:{name:t.currentTransition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"weui-toast",class:t.toastClass,style:{width:t.width}},[n("i",{directives:[{name:"show",rawName:"v-show",value:"text"!==t.type,expression:"type !== 'text'"}],staticClass:"weui-icon-success-no-circle weui-icon_toast"}),t._v(" "),t.text?n("p",{staticClass:"weui-toast__content",style:t.style,domProps:{innerHTML:t._s(t.text)}}):n("p",{staticClass:"weui-toast__content"},[t._t("default")],2)])])],1)},staticRenderFns:[]}},16:function(t,e,n){var i,o;n(10),i=n(8);var s=n(13);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=s.render,o.staticRenderFns=s.staticRenderFns,t.exports=i},18:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(32),s=i(o);e.default={components:{XDialog:s.default},created:function(){"undefined"!=typeof this.value&&(this.showValue=this.value)},props:{value:Boolean,title:String,content:String,buttonText:String,maskTransition:{type:String,default:"vux-mask"},dialogTransition:{type:String,default:"vux-dialog"}},data:function(){return{showValue:!1}},methods:{_onHide:function(){this.showValue=!1}},watch:{value:function(t){this.showValue=t},showValue:function(t){this.$emit("input",t)}}}},19:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function o(t){return JSON.parse((0,a.default)(t))}Object.defineProperty(e,"__esModule",{value:!0});var s=n(60),a=i(s),r=n(12),u=i(r),l=n(70),c=i(l),d=n(68),f=i(d),p=n(69),h=i(p),v=function(){return{content:"Pull Down To Refresh",height:60,autoRefresh:!1,downContent:"Pull Down To Refresh",upContent:"Release To Refresh",loadingContent:"Loading...",clsPrefix:"xs-plugin-pulldown-"}},g=function(){return{content:"Pull Up To Refresh",pullUpHeight:60,height:40,autoRefresh:!1,downContent:"Release To Refresh",upContent:"Pull Up To Refresh",loadingContent:"Loading...",clsPrefix:"xs-plugin-pullup-"}};e.default={props:{value:{type:Object,default:function(){return{pulldownStatus:"",pullupStatus:""}}},height:String,lockX:Boolean,lockY:Boolean,scrollbarX:Boolean,scrollbarY:Boolean,bounce:{type:Boolean,default:!0},useOriginScroll:{type:Boolean,default:!1},useTransition:{type:Boolean,default:!0},preventDefault:{type:Boolean,default:!1},stopPropagation:Boolean,boundryCheck:{type:Boolean,default:!0},gpuAcceleration:{type:Boolean,default:!0},usePulldown:{type:Boolean,default:!1},usePullup:{type:Boolean,default:!1},pulldownConfig:{type:Object,default:function(){return{}}},pullupConfig:{type:Object,default:function(){return{}}},enableHorizontalSwiping:{type:Boolean,default:!1},scrollBottomOffset:{type:Number,default:0}},methods:{reset:function(t,e,n){t&&("undefined"!=typeof t.left&&this._xscroll.scrollLeft(t.left,e,n),"undefined"!=typeof t.top&&this._xscroll.scrollTop(t.top,e,n)),this._xscroll&&this._xscroll.resetSize()},donePulldown:function(){var t=this;this.pulldown.reset(function(){t.reset()}),this.currentValue.pulldownStatus="default"},disablePullup:function(){this.pullup.stop(),this.currentValue.pullupStatus="disabled"},enablePullup:function(){this.currentValue.pullupStatus="default",this.pullup.restart()},donePullup:function(){this.pullup.complete(),this.reset(),this.currentValue.pullupStatus="default"},getStyles:function(){var t=this.height;!this.height&&this.$el&&!this.$el.style.height&&this.lockX&&(t=document.documentElement.clientHeight+"px",this.reset()),this.height&&0===this.height.indexOf("-")&&(t=document.documentElement.clientHeight+parseInt(this.height)+"px"),this.styles={height:""+t}}},created:function(){var t=this;this.value?this.currentValue=this.value:this.currentValue={pulldownStatus:"",pullupStatus:""},this.handleOrientationchange=function(){setTimeout(function(){t.reset()},100)}},data:function(){return{currentValue:{},styles:{}}},watch:{currentValue:{handler:function(t){this.$emit("input",o(t))},deep:!0},height:function(){this.getStyles()},value:{handler:function(t){"default"===t.pullupStatus&&"default"!==this.currentValue.pullupStatus&&this.donePullup(),"default"===t.pulldownStatus&&"default"!==this.currentValue.pulldownStatus&&this.donePulldown(),"disabled"===t.pullupStatus&&"disabled"!==this.currentValue.pullupStatus&&this.disablePullup(),"enabled"===t.pullupStatus&&"disabled"===this.currentValue.pullupStatus&&this.enablePullup()},deep:!0}},mounted:function(){var t=this;this.uuid=Math.random().toString(36).substring(3,8),this.$nextTick(function(){t.$el.setAttribute("id","vux-scroller-"+t.uuid);var e=null;if(t.$slots.default&&(e=t.$slots.default[0].elm),!e)throw new Error("no content is found");if(t._xscroll=new c.default({renderTo:"#vux-scroller-"+t.uuid,lockX:t.lockX,lockY:t.lockY,scrollbarX:t.scrollbarX,scrollbarY:t.scrollbarY,content:e,bounce:t.bounce,useOriginScroll:t.useOriginScroll,useTransition:t.useTransition,preventDefault:t.preventDefault,boundryCheck:t.boundryCheck,gpuAcceleration:t.gpuAcceleration,stopPropagation:t.stopPropagation}),t._xscroll.on("scroll",function(){if(t._xscroll){var e=t._xscroll.getScrollTop();t.$emit("on-scroll",{top:e,left:t._xscroll.getScrollLeft()});var n=t._xscroll.containerHeight,i=t._xscroll.height;e>=n-i-t.scrollBottomOffset&&t.$emit("on-scroll-bottom")}}),t.usePulldown){var n=t.$slots.pulldown,i=(0,u.default)(v(),t.pulldownConfig);n&&(i.container=n[0].elm),t.pulldown=new f.default(i),t._xscroll.plug(t.pulldown),t.pulldown.on("loading",function(e){t.$emit("on-pulldown-loading",t.uuid)}),t.pulldown.on("statuschange",function(e){t.currentValue.pulldownStatus=e.newVal})}if(t.usePullup){var o=t.$slots.pullup,s=(0,u.default)(g(),t.pullupConfig);o&&(s.container=o[0].elm),t.pullup=new h.default(s),t._xscroll.plug(t.pullup),t.pullup.on("loading",function(e){t.$emit("on-pullup-loading",t.uuid)}),t.pullup.on("statuschange",function(e){t.currentValue.pullupStatus=e.newVal})}t.enableHorizontalSwiping&&(t._xscroll.on("panstart",function(e){2!==e.direction&&4!==e.direction||(e.preventDefault(),t.scrollbarY&&(t._xscroll.userConfig.scrollbarY=!1),t._xscroll.userConfig.lockY=!0)}),t._xscroll.on("panend",function(){t.scrollbarY&&(t._xscroll.userConfig.scrollbarY=!0),t._xscroll.userConfig.lockY=!1})),t._xscroll.render(),window.addEventListener("orientationchange",t.handleOrientationchange,!1)}),this.getStyles()},beforeDestroy:function(){this.pullup&&(this._xscroll.unplug(this.pullup),this.pullup.pluginDestructor()),this.pulldown&&(this._xscroll.unplug(this.pulldown),this.pulldown.pluginDestructor()),window.removeEventListener("orientationchange",this.handleOrientationchange,!1),this._xscroll.destroy(),this._xscroll=null}}},20:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{value:{type:Boolean,default:!1},maskTransition:{type:String,default:"vux-mask"},dialogTransition:{type:String,default:"vux-dialog"},hideOnBlur:Boolean,scroll:{type:Boolean,default:!0}},created:function(){"undefined"!=typeof this.value&&(this.currentValue=this.value)},watch:{value:{handler:function(t){this.currentValue=t},immediate:!0},currentValue:function(t){this.$emit(t?"on-show":"on-hide"),this.$emit("input",t)}},data:function(){return{currentValue:!1}},methods:{onTouchMove:function(t){!this.scroll&&t.preventDefault()}}}},21:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"failed",data:function(){return{}},props:{msg:String},components:{},created:function(){},methods:{}}},22:function(t,e){},23:function(t,e){},24:function(t,e){},25:function(t,e){},26:function(t,e,n){t.exports=n.p+"m/static/img/pay_result_failure.dac5b24.png"},27:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-x-dialog",on:{touchmove:t.onTouchMove}},[n("transition",{attrs:{name:t.maskTransition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.currentValue,expression:"currentValue"}],staticClass:"weui-mask",on:{click:function(e){t.hideOnBlur&&(t.currentValue=!1)}}})]),t._v(" "),n("transition",{attrs:{name:t.dialogTransition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.currentValue,expression:"currentValue"}],staticClass:"weui-dialog"},[t._t("default")],2)])],1)},staticRenderFns:[]}},28:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-alert"},[n("x-dialog",{attrs:{"mask-transition":t.maskTransition,"dialog-transition":t.dialogTransition},on:{"on-hide":function(e){t.$emit("on-hide")},"on-show":function(e){t.$emit("on-show")}},model:{value:t.showValue,callback:function(e){t.showValue=e},expression:"showValue"}},[n("div",{staticClass:"weui-dialog__hd"},[n("strong",{staticClass:"weui-dialog__title"},[t._v(t._s(t.title))])]),t._v(" "),n("div",{staticClass:"weui-dialog__bd"},[t._t("default",[n("div",{domProps:{innerHTML:t._s(t.content)}})])],2),t._v(" "),n("div",{staticClass:"weui-dialog__ft"},[n("a",{staticClass:"weui-dialog__btn weui-dialog__btn_primary",attrs:{href:"javascript:;"},on:{click:t._onHide}},[t._v(t._s(t.buttonText||"确定"))])])])],1)},staticRenderFns:[]}},29:function(t,e,n){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"failed"}},[i("img",{attrs:{src:n(26),alt:""}}),t._v(" "),i("p",[t._v(t._s(t.msg))])])},staticRenderFns:[]}},30:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{style:t.styles},[n("div",{staticClass:"xs-container"},[t._t("default"),t._v(" "),t._t("pulldown"),t._v(" "),t._t("pullup")],2)])},staticRenderFns:[]}},31:function(t,e,n){var i,o;n(25),i=n(19);var s=n(30);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=s.render,o.staticRenderFns=s.staticRenderFns,t.exports=i},32:function(t,e,n){var i,o;n(22),i=n(20);var s=n(27);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=s.render,o.staticRenderFns=s.staticRenderFns,t.exports=i},33:function(t,e,n){var i,o;n(24),i=n(21);var s=n(29);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=s.render,o.staticRenderFns=s.staticRenderFns,t.exports=i},36:function(t,e){},37:function(t,e){"use strict";function n(){var t=window.navigator.userAgent.toLowerCase();return"micromessenger"==t.match(/MicroMessenger/i)}Object.defineProperty(e,"__esModule",{value:!0}),e.isWeiXin=n},38:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{showLoading:{type:Boolean,default:!0},tip:String,backgroundColor:String},methods:{getStyle:function(){if(!this.showLoading&&this.tip)return{"background-color":this.backgroundColor}}}}},39:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(12),s=i(o);e.default={props:{leftOptions:Object,title:String,transition:String,rightOptions:{type:Object,default:function(){return{showMore:!1}}}},computed:{_leftOptions:function(){return(0,s.default)({showBack:!0,preventGoBack:!1},this.leftOptions||{})}},methods:{onClickBack:function(){this._leftOptions.preventGoBack?this.$emit("on-click-back"):this.$router?this.$router.back():window.history.back()}}}},40:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(6);e.default={name:"list",data:function(){return{}},props:{freeshow:Boolean,datalist:Array},components:{},created:function(){},methods:{toDetail:function(t){location.href="detail.html?id="+t}},filters:{formatDate:i.formatedDate}}},45:function(t,e){},46:function(t,e){},47:function(t,e){},48:function(t,e,n){t.exports=n.p+"m/static/img/read.b7c743a.png"},49:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-header"},[n("div",{staticClass:"vux-header-left"},[n("transition",{attrs:{name:t.transition}},[n("a",{directives:[{name:"show",rawName:"v-show",value:t._leftOptions.showBack,expression:"_leftOptions.showBack"}],staticClass:"vux-header-back",on:{click:[function(e){if(!("button"in e)&&t._k(e.keyCode,"preventDefault"))return null},t.onClickBack]}},[t._v(t._s("undefined"==typeof t._leftOptions.backText?"返回":t._leftOptions.backText))])]),t._v(" "),n("transition",{attrs:{name:t.transition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t._leftOptions.showBack,expression:"_leftOptions.showBack"}],staticClass:"left-arrow",on:{click:t.onClickBack}})]),t._v(" "),t._t("left")],2),t._v(" "),n("h1",{staticClass:"vux-header-title",on:{click:function(e){t.$emit("on-click-title")}}},[t._t("default",[n("transition",{attrs:{name:t.transition}},[n("span",{directives:[{name:"show",rawName:"v-show",value:t.title,expression:"title"}]},[t._v(t._s(t.title))])])])],2),t._v(" "),n("div",{staticClass:"vux-header-right"},[t.rightOptions.showMore?n("a",{staticClass:"vux-header-more",on:{click:[function(e){if(!("button"in e)&&t._k(e.keyCode,"preventDefault"))return null},function(e){t.$emit("on-click-more")}]}}):t._e(),t._v(" "),t._t("right")],2)])},staticRenderFns:[]}},50:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"weui-loadmore",class:{"weui-loadmore_line":!t.showLoading,"weui-loadmore_dot":!t.showLoading&&!t.tip}},[t.showLoading?n("i",{staticClass:"weui-loading"}):t._e(),t._v(" "),n("span",{directives:[{name:"show",rawName:"v-show",value:t.tip||!t.showLoading,expression:"tip || !showLoading"}],staticClass:"weui-loadmore__tips",style:t.getStyle()},[t._v(t._s(t.tip))])])},staticRenderFns:[]}},51:function(t,e,n){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"list"}},t._l(t.datalist,function(e){return i("li",{on:{click:function(n){t.toDetail(e.id)}}},[i("div",{staticClass:"title"},[t._v("\n     "+t._s(e.name)+"\n   ")]),t._v(" "),i("div",{staticClass:"img vux-1px-b"},[i("img",{attrs:{src:e.thumb,alt:"",onerror:"this.src='http://static0.kofuf.com/1493739178223.jpg?imageView2/1/w/200/h/133/q/100|imageslim'"}}),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.freeshow,expression:"freeshow"}],staticClass:"hint"},[t._v("\n       试读\n     ")])]),t._v(" "),i("span",{staticClass:"date"},[t._v(t._s(t._f("formatDate")(e.published)))]),t._v(" "),i("span",{staticClass:"view"},[i("img",{attrs:{src:n(48),alt:""}}),t._v(t._s(e.view_count)+" 人看过")])])}))},staticRenderFns:[]}},52:function(t,e,n){var i,o;n(46),i=n(38);var s=n(50);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=s.render,o.staticRenderFns=s.staticRenderFns,t.exports=i},53:function(t,e,n){var i,o;n(11),i=n(9);var s=n(14);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=s.render,o.staticRenderFns=s.staticRenderFns,t.exports=i},54:function(t,e,n){var i,o;n(45),i=n(39);var s=n(49);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=s.render,o.staticRenderFns=s.staticRenderFns,t.exports=i},55:function(t,e,n){var i,o;n(47),i=n(40);var s=n(51);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=s.render,o.staticRenderFns=s.staticRenderFns,t.exports=i},64:function(t,e){"use strict";function n(t,e,n){console.log("发起微信支付"),"undefined"==typeof WeixinJSBridge?(document.addEventListener?document.addEventListener("WeixinJSBridgeReady",i,!1):document.attachEvent&&(document.attachEvent("WeixinJSBridgeReady",i),document.attachEvent("onWeixinJSBridgeReady",i)),n.$vux.alert.show({title:"提示",content:"请在微信中打开",dialogTransition:"",maskTransition:"",onShow:function(){},onHide:function(){}}),n.disable=!0):i(t,e,n)}function i(t,e,n){WeixinJSBridge.invoke("getBrandWCPayRequest",{appId:t.app_id,timeStamp:t.timestamp,nonceStr:t.nonce_str,package:"prepay_id="+t.prepay_id,signType:"MD5",paySign:t.sign},function(i){console.log(i),"get_brand_wcpay_request:ok"==i.err_msg?e(t):(alert("支付取消"),n.disable=!0)})}Object.defineProperty(e,"__esModule",{value:!0}),e.toPay=n},66:function(t,e,n){var i,o;n(23),i=n(18);var s=n(28);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=s.render,o.staticRenderFns=s.staticRenderFns,t.exports=i},113:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={mounted:function(){var t=this;this.$nextTick(function(){t.$parent.rerender()})},beforeDestroy:function(){var t=this.$parent;this.$nextTick(function(){t.rerender()})}}},114:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(60),s=i(o),a=n(144),r=i(a),u=n(145);e.default={created:function(){this.index=this.value||0,this.index&&(this.current=this.index)},mounted:function(){var t=this;this.$nextTick(function(){t.list&&0===t.list.length||t.render(t.index),t.xheight=t.getHeight()})},methods:{clickListItem:function(t){(0,u.go)(t.url,this.$router),this.$emit("on-click-list-item",JSON.parse((0,s.default)(t)))},buildBackgroundUrl:function(t){return"url("+t+")"},render:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;this.swiper&&this.swiper.destroy(),this.swiper=new r.default({container:this.$el,direction:this.direction,auto:this.auto,loop:this.loop,interval:this.interval,threshold:this.threshold,duration:this.duration,height:this.height||this._height,minMovingDistance:this.minMovingDistance,imgList:this.imgList}).on("swiped",function(e,n){t.current=n%t.length,t.index=n%t.length}),e>0&&this.swiper.go(e)},rerender:function(){var t=this;this.$el&&this.$nextTick(function(){t.index=t.value||0,t.current=t.value||0,t.length=t.list.length||t.$children.length,t.destroy(),t.render(t.value)})},destroy:function(){this.swiper&&this.swiper.destroy()},getHeight:function(){var t=parseInt(this.height,10);return t?this.height:t?void 0:this.aspectRatio?this.$el.offsetWidth*this.aspectRatio+"px":"180px"}},props:{list:{type:Array,default:function(){return[]}},direction:{type:String,default:"horizontal"},showDots:{type:Boolean,default:!0},showDescMask:{type:Boolean,default:!0},dotsPosition:{type:String,default:"right"},dotsClass:String,auto:{type:Boolean,default:!1},loop:Boolean,interval:{type:Number,default:3e3},threshold:{type:Number,default:50},duration:{type:Number,default:300},height:{type:String,default:"auto"},aspectRatio:Number,minMovingDistance:{type:Number,default:0},value:{type:Number,default:0}},data:function(){return{current:this.index||0,xheight:"auto",length:this.list.length,index:0}},watch:{list:function(t){this.rerender()},current:function(t){this.index=t,this.$emit("on-index-change",t)},index:function(t){var e=this;t!==this.current&&this.$nextTick(function(){e.swiper&&e.swiper.go(t)}),this.$emit("input",t)},value:function(t){this.index=t}},beforeDestroy:function(){this.destroy()}}},128:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),n(1),n(3);var o=n(37),s=n(5),a=i(s),r=n(7),u=i(r),l=(n(64),n(2)),c=i(l),d=n(6),f=n(232),p=i(f),h=n(231),v=i(h),g=n(16),m=i(g),_=n(54),w=i(_),y=n(31),x=i(y),b=n(52),k=i(b),S=n(65),C=i(S),$=n(57),R=i($),M=n(59),O=i(M),T=n(58),B=i(T),D=n(33),P=i(D),j=n(55),F=i(j);c.default.use(R.default),c.default.use(C.default),c.default.prototype.$geturlpara=u.default,e.default={name:"good",data:function(){return{id:0,showContent:!1,loadingshow:!0,loadtext:"loading...",itemsinfo:{},failedshow:!1,failedmsg:"服务请求失败，请刷新重试",nonecomment:!1,loadmore:!0}},components:{Swiper:p.default,SwiperItem:v.default,XHeader:w.default,Loading:m.default,LoadMore:k.default,Scroller:x.default,Failed:P.default,List:F.default},beforeCreate:function(){if((0,o.isWeiXin)()){var t=this.$geturlpara.getUrlKey("id");getAuth(B.default,O.default,"item",t)}},created:function(){var t=this.$geturlpara.getUrlKey("id");this.id=t,this.fetchData(t)},mounted:function(){new Mlink([{mlink:"https://a.mlinks.cc/Acej?id="+this.id,button:document.querySelector("a#btnOpenApp1"),autoLaunchApp:!1},{mlink:"https://a.mlinks.cc/Acej?id="+this.id,button:document.querySelector("a#btnOpenApp"),autoLaunchApp:!1}])},methods:{fetchData:function(t){var e=this,n=this;a.default.httpGet(c.default,HOST+"/api/items/"+t+".json",{},function(t){e.loadingshow=!1,e.itemsinfo=t,0!=e.itemsinfo.status?(e.failedmsg=e.itemsinfo.error,e.failedshow=!0):(document.title=t.name,e.itemsinfo=t,e.showContent=!0)},function(t){e.loadingshow=!1,e.failedshow=!0,console.log(t)}),setTimeout(function(){n.loadingshow=!1},1e4)},toDetail:function(t){window.location.href="detail.html?id="+t},logErr:function(t){this.$vux.alert.show({title:"提示",content:t,dialogTransition:"",maskTransition:"",onShow:function(){},onHide:function(){}})}},filters:{formatDate2:function(t){var e=new Date(t),n=new Date;return(0,d.formatDate2)(new Date(t),"yyyy")-(0,d.formatDate2)(n,"yyyy")<0?(0,d.formatDate2)(e,"yyyy年MM月dd日"):(0,d.formatDate2)(e,"MM月dd日")},currency:function(t){return Number(t).toFixed(2)}}}},188:function(t,e){},189:function(t,e){},210:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-slider"},[n("div",{staticClass:"vux-swiper",style:{height:t.xheight}},[t._t("default"),t._v(" "),t._l(t.list,function(e,i){return n("div",{staticClass:"vux-swiper-item",attrs:{"data-index":i},on:{click:function(n){t.clickListItem(e)}}},[n("a",{attrs:{href:"javascript:"}},[n("div",{staticClass:"vux-img",style:{backgroundImage:t.buildBackgroundUrl(e.img)}}),t._v(" "),t.showDescMask?n("p",{staticClass:"vux-swiper-desc"},[t._v(t._s(e.title))]):t._e()])])})],2),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.showDots,expression:"showDots"}],class:[t.dotsClass,"vux-indicator","vux-indicator-"+t.dotsPosition]},t._l(t.length,function(e){return n("a",{attrs:{href:"javascript:"}},[n("i",{staticClass:"vux-icon-dot",class:{active:e-1===t.current}})])}))])},staticRenderFns:[]}},211:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"good"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.showContent,expression:"showContent"}],staticClass:"content"},[n("swiper",{attrs:{loop:"","dots-position":"center",height:"480px"}},t._l(t.itemsinfo.images,function(t,e){return n("swiper-item",{key:e,staticClass:"swiper-demo-img"},[n("img",{attrs:{src:t}})])})),t._v(" "),n("div",{staticClass:"header vux-1px-b"},[n("div",{staticClass:"name"},[t._v("\n          "+t._s(t.itemsinfo.name)+"\n        ")]),t._v(" "),n("div",{staticClass:"info"},[n("span",{staticClass:"price"},[t._v("\n            ¥ "+t._s(t._f("currency")(t.itemsinfo.price))+"\n          ")]),t._v(" "),n("span",{staticClass:"count"},[t._v("\n            剩余: "+t._s(t.itemsinfo.store_count)+"件\n          ")])])]),t._v(" "),n("div",{staticClass:"detail",domProps:{innerHTML:t._s(t.itemsinfo.detail)}})],1),t._v(" "),n("footer",{directives:[{name:"show",rawName:"v-show",value:t.showContent,expression:"showContent"}]},[t._m(0),t._v(" "),t._m(1)]),t._v(" "),t._m(2),t._v(" "),t.failedshow?n("Failed",{attrs:{msg:t.failedmsg}}):t._e(),t._v(" "),n("Loading",{attrs:{text:t.loadtext},model:{value:t.loadingshow,callback:function(e){t.loadingshow=e},expression:"loadingshow"}})],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("a",{staticClass:"left",attrs:{id:"btnOpenApp"}},[n("span",[t._v("加入购物车")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("a",{staticClass:"right",attrs:{id:"btnOpenApp1"}},[n("span",[t._v("立即购买")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"qr_code_pc_inner"},[n("div",{staticClass:"qr_code_pc"},[n("img",{staticClass:"qr_code_pc_img",attrs:{id:"js_pc_qr_code_img",src:"http://www.kofuf.com/img/wx.jpg"}}),t._v(" "),n("p",[t._v("微信扫一扫"),n("br"),t._v("学财经，长本事")])])])}]}},220:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-swiper-item"},[t._t("default")],2)},staticRenderFns:[]}},231:function(t,e,n){var i,o;i=n(113);var s=n(220);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=s.render,o.staticRenderFns=s.staticRenderFns,t.exports=i},232:function(t,e,n){var i,o;n(188),i=n(114);var s=n(210);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=s.render,o.staticRenderFns=s.staticRenderFns,t.exports=i},246:function(t,e,n){var i,o;n(189),i=n(128);var s=n(211);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=s.render,o.staticRenderFns=s.staticRenderFns,t.exports=i}});