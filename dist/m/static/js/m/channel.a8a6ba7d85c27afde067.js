webpackJsonp([4,0],{0:function(t,e,n){"use strict";function l(t){return t&&t.__esModule?t:{default:t}}var o=n(4),s=l(o),i=n(178),a=l(i),u=n(9),r=l(u);s.default.use(r.default),new s.default({el:"#channel",template:"<App/>",components:{App:a.default}})},3:function(t,e){},5:function(t,e){"use strict";!function(){var t=document.documentElement.clientWidth||document.body.clientWidth;t=t>640?640:t;var e=t/750*100;document.documentElement.style.fontSize=e+"px"}(),window.HOST="http://api.kofuf.com"},14:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={getUrlKey:function(t){return decodeURIComponent((new RegExp("[?|&]"+t+"=([^&;]+?)(&|#|;|$)").exec(location.href)||["",""])[1].replace(/\+/g,"%20"))||null}}},15:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{value:{type:Boolean,default:!1},text:String,position:String},created:function(){this.show=this.value},data:function(){return{show:!1}},watch:{value:function(t){this.show=t},show:function(t){this.$emit("input",t)}}}},17:function(t,e){},19:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:"vux-mask"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"weui-loading_toast"},[n("div",{staticClass:"weui-mask_transparent"}),t._v(" "),n("div",{staticClass:"weui-toast",style:{position:t.position}},[n("i",{staticClass:"weui-loading weui-icon_toast"}),t._v(" "),n("p",{staticClass:"weui-toast__content"},[t._v(t._s(t.text||"加载中")),t._t("default")],2)])])])},staticRenderFns:[]}},20:function(t,e,n){var l,o;n(17),l=n(15);var s=n(19);o=l=l||{},"object"!=typeof l.default&&"function"!=typeof l.default||(o=l=l.default),"function"==typeof o&&(o=o.options),o.render=s.render,o.staticRenderFns=s.staticRenderFns,t.exports=l},22:function(t,e){"use strict";function n(t,e){/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length)));var n={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds()};for(var l in n)if(new RegExp("("+l+")").test(e)){var s=(n[l]+"").replace(/^0/,"");e=e.replace(RegExp.$1,1===RegExp.$1.length?s:o(s))}return e}function l(t,e){/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length)));var n={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds()};for(var l in n)if(new RegExp("("+l+")").test(e)){var o=(n[l]+"").replace(/^0/,"");e=e.replace(RegExp.$1,1===RegExp.$1.length?o:s(o))}return e}function o(t){return("00"+t).substr(t.length)}function s(t){return t}Object.defineProperty(e,"__esModule",{value:!0}),e.formatDate=n,e.formatDate2=l},29:function(t,e){},30:function(t,e,n){"use strict";function l(t){return t&&t.__esModule?t:{default:t}}function o(t){return JSON.parse((0,i.default)(t))}Object.defineProperty(e,"__esModule",{value:!0});var s=n(55),i=l(s),a=n(18),u=l(a),r=n(69),c=l(r),f=n(66),d=l(f),p=n(67),h=l(p),v=function(){return{content:"Pull Down To Refresh",height:60,autoRefresh:!1,downContent:"Pull Down To Refresh",upContent:"Release To Refresh",loadingContent:"Loading...",clsPrefix:"xs-plugin-pulldown-"}},g=function(){return{content:"Pull Up To Refresh",pullUpHeight:60,height:40,autoRefresh:!1,downContent:"Release To Refresh",upContent:"Pull Up To Refresh",loadingContent:"Loading...",clsPrefix:"xs-plugin-pullup-"}};e.default={props:{value:{type:Object,default:function(){return{pulldownStatus:"",pullupStatus:""}}},height:String,lockX:Boolean,lockY:Boolean,scrollbarX:Boolean,scrollbarY:Boolean,bounce:{type:Boolean,default:!0},useOriginScroll:{type:Boolean,default:!1},useTransition:{type:Boolean,default:!0},preventDefault:{type:Boolean,default:!1},stopPropagation:Boolean,boundryCheck:{type:Boolean,default:!0},gpuAcceleration:{type:Boolean,default:!0},usePulldown:{type:Boolean,default:!1},usePullup:{type:Boolean,default:!1},pulldownConfig:{type:Object,default:function(){return{}}},pullupConfig:{type:Object,default:function(){return{}}},enableHorizontalSwiping:{type:Boolean,default:!1},scrollBottomOffset:{type:Number,default:0}},methods:{reset:function(t,e,n){t&&("undefined"!=typeof t.left&&this._xscroll.scrollLeft(t.left,e,n),"undefined"!=typeof t.top&&this._xscroll.scrollTop(t.top,e,n)),this._xscroll&&this._xscroll.resetSize()},donePulldown:function(){var t=this;this.pulldown.reset(function(){t.reset()}),this.currentValue.pulldownStatus="default"},disablePullup:function(){this.pullup.stop(),this.currentValue.pullupStatus="disabled"},enablePullup:function(){this.currentValue.pullupStatus="default",this.pullup.restart()},donePullup:function(){this.pullup.complete(),this.reset(),this.currentValue.pullupStatus="default"},getStyles:function(){var t=this.height;!this.height&&this.$el&&!this.$el.style.height&&this.lockX&&(t=document.documentElement.clientHeight+"px",this.reset()),this.height&&0===this.height.indexOf("-")&&(t=document.documentElement.clientHeight+parseInt(this.height)+"px"),this.styles={height:""+t}}},created:function(){var t=this;this.value?this.currentValue=this.value:this.currentValue={pulldownStatus:"",pullupStatus:""},this.handleOrientationchange=function(){setTimeout(function(){t.reset()},100)}},data:function(){return{currentValue:{},styles:{}}},watch:{currentValue:{handler:function(t){this.$emit("input",o(t))},deep:!0},height:function(){this.getStyles()},value:{handler:function(t){"default"===t.pullupStatus&&"default"!==this.currentValue.pullupStatus&&this.donePullup(),"default"===t.pulldownStatus&&"default"!==this.currentValue.pulldownStatus&&this.donePulldown(),"disabled"===t.pullupStatus&&"disabled"!==this.currentValue.pullupStatus&&this.disablePullup(),"enabled"===t.pullupStatus&&"disabled"===this.currentValue.pullupStatus&&this.enablePullup()},deep:!0}},mounted:function(){var t=this;this.uuid=Math.random().toString(36).substring(3,8),this.$nextTick(function(){t.$el.setAttribute("id","vux-scroller-"+t.uuid);var e=null;if(t.$slots.default&&(e=t.$slots.default[0].elm),!e)throw new Error("no content is found");if(t._xscroll=new c.default({renderTo:"#vux-scroller-"+t.uuid,lockX:t.lockX,lockY:t.lockY,scrollbarX:t.scrollbarX,scrollbarY:t.scrollbarY,content:e,bounce:t.bounce,useOriginScroll:t.useOriginScroll,useTransition:t.useTransition,preventDefault:t.preventDefault,boundryCheck:t.boundryCheck,gpuAcceleration:t.gpuAcceleration,stopPropagation:t.stopPropagation}),t._xscroll.on("scroll",function(){if(t._xscroll){var e=t._xscroll.getScrollTop();t.$emit("on-scroll",{top:e,left:t._xscroll.getScrollLeft()});var n=t._xscroll.containerHeight,l=t._xscroll.height;e>=n-l-t.scrollBottomOffset&&t.$emit("on-scroll-bottom")}}),t.usePulldown){var n=t.$slots.pulldown,l=(0,u.default)(v(),t.pulldownConfig);n&&(l.container=n[0].elm),t.pulldown=new d.default(l),t._xscroll.plug(t.pulldown),t.pulldown.on("loading",function(e){t.$emit("on-pulldown-loading",t.uuid)}),t.pulldown.on("statuschange",function(e){t.currentValue.pulldownStatus=e.newVal})}if(t.usePullup){var o=t.$slots.pullup,s=(0,u.default)(g(),t.pullupConfig);o&&(s.container=o[0].elm),t.pullup=new h.default(s),t._xscroll.plug(t.pullup),t.pullup.on("loading",function(e){t.$emit("on-pullup-loading",t.uuid)}),t.pullup.on("statuschange",function(e){t.currentValue.pullupStatus=e.newVal})}t.enableHorizontalSwiping&&(t._xscroll.on("panstart",function(e){2!==e.direction&&4!==e.direction||(e.preventDefault(),t.scrollbarY&&(t._xscroll.userConfig.scrollbarY=!1),t._xscroll.userConfig.lockY=!0)}),t._xscroll.on("panend",function(){t.scrollbarY&&(t._xscroll.userConfig.scrollbarY=!0),t._xscroll.userConfig.lockY=!1})),t._xscroll.render(),window.addEventListener("orientationchange",t.handleOrientationchange,!1)}),this.getStyles()},beforeDestroy:function(){this.pullup&&(this._xscroll.unplug(this.pullup),this.pullup.pluginDestructor()),this.pulldown&&(this._xscroll.unplug(this.pulldown),this.pulldown.pluginDestructor()),window.removeEventListener("orientationchange",this.handleOrientationchange,!1),this._xscroll.destroy(),this._xscroll=null}}},31:function(t,e,n){"use strict";function l(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(18),s=l(o);e.default={props:{leftOptions:Object,title:String,transition:String,rightOptions:{type:Object,default:function(){return{showMore:!1}}}},computed:{_leftOptions:function(){return(0,s.default)({showBack:!0,preventGoBack:!1},this.leftOptions||{})}},methods:{onClickBack:function(){this._leftOptions.preventGoBack?this.$emit("on-click-back"):this.$router?this.$router.back():window.history.back()}}}},47:function(t,e){},48:function(t,e){},49:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-header"},[n("div",{staticClass:"vux-header-left"},[n("transition",{attrs:{name:t.transition}},[n("a",{directives:[{name:"show",rawName:"v-show",value:t._leftOptions.showBack,expression:"_leftOptions.showBack"}],staticClass:"vux-header-back",on:{click:[function(e){if(!("button"in e)&&t._k(e.keyCode,"preventDefault"))return null},t.onClickBack]}},[t._v(t._s("undefined"==typeof t._leftOptions.backText?"返回":t._leftOptions.backText))])]),t._v(" "),n("transition",{attrs:{name:t.transition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t._leftOptions.showBack,expression:"_leftOptions.showBack"}],staticClass:"left-arrow",on:{click:t.onClickBack}})]),t._v(" "),t._t("left")],2),t._v(" "),n("h1",{staticClass:"vux-header-title",on:{click:function(e){t.$emit("on-click-title")}}},[t._t("default",[n("transition",{attrs:{name:t.transition}},[n("span",{directives:[{name:"show",rawName:"v-show",value:t.title,expression:"title"}]},[t._v(t._s(t.title))])])])],2),t._v(" "),n("div",{staticClass:"vux-header-right"},[t.rightOptions.showMore?n("a",{staticClass:"vux-header-more",on:{click:[function(e){if(!("button"in e)&&t._k(e.keyCode,"preventDefault"))return null},function(e){t.$emit("on-click-more")}]}}):t._e(),t._v(" "),t._t("right")],2)])},staticRenderFns:[]}},50:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{style:t.styles},[n("div",{staticClass:"xs-container"},[t._t("default"),t._v(" "),t._t("pulldown"),t._v(" "),t._t("pullup")],2)])},staticRenderFns:[]}},51:function(t,e,n){var l,o;n(48),l=n(30);var s=n(50);o=l=l||{},"object"!=typeof l.default&&"function"!=typeof l.default||(o=l=l.default),"function"==typeof o&&(o=o.options),o.render=s.render,o.staticRenderFns=s.staticRenderFns,t.exports=l},52:function(t,e,n){var l,o;n(47),l=n(31);var s=n(49);o=l=l||{},"object"!=typeof l.default&&"function"!=typeof l.default||(o=l=l.default),"function"==typeof o&&(o=o.options),o.render=s.render,o.staticRenderFns=s.staticRenderFns,t.exports=l},80:function(t,e,n){"use strict";function l(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),n(3),n(5);var o=n(14),s=l(o),i=n(4),a=l(i),u=n(22),r=n(20),c=l(r),f=n(52),d=l(f),p=n(51),h=l(p),v=n(9),g=l(v);a.default.use(g.default),a.default.prototype.$geturlpara=s.default,e.default={name:"channel",data:function(){return{showContent:!1,loadingshow:!0,loadtext:"loading...",channelsinfo:{suites:[{price:""}]},information:""}},components:{XHeader:d.default,Loading:c.default,Scroller:h.default},created:function(){var t=this.$geturlpara.getUrlKey("id")||"300";this.fetchData(t)},methods:{fetchData:function(t){var e=this;this.$http.get(HOST+"/api/channels/"+t+".json",[]).then(function(t){e.loadingshow=!1,e.channelsinfo=JSON.parse(t.bodyText),e.information=e.channelsinfo.information.replace(/[。]/g,"。<br/>"),console.log(e.channelsinfo);var n=e;setTimeout(function(){n.$nextTick(function(){n.$refs.scrollerEvent.reset()})},200),e.showContent=!0},function(t){e.loadingshow=!1,e.logErr("请在网络环境下访问"),console.log(t)})},share:function(){console.log("share")},geDetail:function(t){console.log(t),window.location.href="detail.html?id="+t},freeRead:function(){window.location.href="https://a.mlinks.cc/AK8j"},subscribe:function(){window.location.href="https://a.mlinks.cc/AK8j"}},filters:{formatDate2:function(t){var e=(0,u.formatDate2)(new Date(t),"MM月dd日");return e}}}},147:function(t,e){},165:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"channel"}},[n("Loading",{attrs:{text:t.loadtext},model:{value:t.loadingshow,callback:function(e){t.loadingshow=e},expression:"loadingshow"}}),t._v(" "),n("x-header",[n("a",{on:{click:t.share},slot:"right"})]),t._v(" "),n("scroller",{ref:"scrollerEvent",attrs:{"lock-x":""}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.showContent,expression:"showContent"}],staticClass:"content"},[n("div",{staticClass:"large-img"},[n("img",{attrs:{src:t.channelsinfo.large_thumb,alt:""}})]),t._v(" "),n("ul",{staticClass:"channels-info"},[n("li",{staticClass:"vux-1px-b"},[n("p",{staticClass:"title"},[t._v("专栏介绍")]),t._v(" "),n("p",{staticClass:"con"},[t._v(t._s(t.channelsinfo.abstract))])]),t._v(" "),n("li",{staticClass:"vux-1px-b"},[n("p",{staticClass:"title"},[t._v("适宜人群")]),t._v(" "),n("p",{staticClass:"con"},[t._v(t._s(t.channelsinfo.suit_crowds))])]),t._v(" "),n("li",{staticClass:"vux-1px-b"},[n("p",{staticClass:"title"},[t._v("订阅须知")]),t._v(" "),n("p",{staticClass:"con",domProps:{innerHTML:t._s(t.information)}},[t._v(t._s(t.information))])]),t._v(" "),n("li",[n("p",{staticClass:"title"},[t._v("最新更新")]),t._v(" "),n("ul",{staticClass:"newupdate"},t._l(t.channelsinfo.articles,function(e){return n("li",{staticClass:"item vux-1px-b",on:{click:function(n){t.geDetail(e.id)}}},[n("img",{attrs:{src:e.thumb,alt:"",onerror:"this.src='http://182.92.99.123:8080/privilege/uploadedFile/1491147612922.jpg?imageView2/1/w/200/h/133/q/100|imageslim'"}}),t._v(" "),n("p",{staticClass:"title"},[t._v(t._s(e.name))]),t._v(" "),n("p",{staticClass:"date"},[t._v(t._s(t._f("formatDate2")(e.published)))])])}))])])])]),t._v(" "),t.showContent?n("footer",[n("div",{staticClass:"freeread",on:{click:t.freeRead}},[n("span",[t._v("免费试读")])]),t._v(" "),n("div",{staticClass:"subscribe",on:{click:t.subscribe}},[n("span",[t._v("订阅："),n("span",[t._v("¥"+t._s(t.channelsinfo.suites[0].price)+"/年")])])])]):t._e()],1)},staticRenderFns:[]}},178:function(t,e,n){var l,o;n(147),l=n(80);var s=n(165);o=l=l||{},"object"!=typeof l.default&&"function"!=typeof l.default||(o=l=l.default),"function"==typeof o&&(o=o.options),o.render=s.render,o.staticRenderFns=s.staticRenderFns,t.exports=l}});
//# sourceMappingURL=channel.a8a6ba7d85c27afde067.js.map