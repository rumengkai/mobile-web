webpackJsonp([2,0],[function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}var o=n(2),s=i(o),a=n(244),r=i(a),c=n(8),l=i(c);s.default.use(l.default),new s.default({el:"#gongfu",template:"<App/>",components:{App:r.default}})},function(t,e){},,function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={ajaxPost:function(t,e,n,i){$.ajax({url:t,type:"POST",data:e,success:function(t){n(t)},error:function(t){i(t)}})},ajaxGet:function(){},httpPost:function(t,e,n,i,o){t.http.options.emulateJSON=!0,t.http.options.headers={"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},t.http.interceptors.push(function(t,e){t.headers.set("from","3"),t.headers.set("gid",localStorage.getItem("gid")),t.headers.set("token",localStorage.getItem("token")),t.headers.set("version",VERSION),e()}),t.http.post(e,n).then(function(t){return t.bodyText}).then(function(t){var t=JSON.parse(t);i(t)},function(t){o(t)})},httpGet:function(t,e,n,i,o){t.http.options.emulateJSON=!0,t.http.options.headers={"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},t.http.interceptors.push(function(t,e){t.headers.set("from","3"),t.headers.set("gid",localStorage.getItem("gid")),t.headers.set("token",localStorage.getItem("token")),t.headers.set("version",VERSION),e()}),t.http.get(e,n).then(function(t){return t.bodyText}).then(function(t){var t=JSON.parse(t);i(t)},function(t){o(t)})}}},function(t,e,n){"use strict";!function(){var t=document.documentElement.clientWidth||document.body.clientWidth;t=t>640?640:t;var e=t/750*100;document.documentElement.style.fontSize=e+"px"}(),window.VERSION="0.1",window.HOST="http://api.kofuf.com";var i=n(32);i.attach(document.body),window.getAuthLink=function(t,e){return"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx05e842991e5fa0b2&redirect_uri=http://api.kofuf.com%2Fapi%2Fsession%2Fauth_weixin&response_type=code&scope=snsapi_userinfo&state="+t+"_"+e+"#wechat_redirect"},window.getAuth=function(t,e,n,i){var o=t.get("gid"),s=e.parse();localStorage.getItem("gid")||("undefined"!=typeof s.gid?(localStorage.setItem("gid",s.gid),localStorage.setItem("token",s.token)):"undefined"!=typeof o?(localStorage.setItem("gid",t.get("gid")),localStorage.setItem("token",t.get("token"))):window.location.href=getAuthLink(n,i))},window.clearcookie=function(t){localStorage.clear(),t.set("gid",0,{domain:".kofuf.com",path:"/",expires:-1}),t.set("token",0,{domain:".kofuf.com",path:"/",expires:-1})}},,function(t,e){"use strict";function n(t){var e=new Date(t),n=new Date;if(i(new Date(t),"yyyy")-i(n,"yyyy")<0)return i(e,"yyyy-MM-dd");if(i(new Date(t),"MM")-i(n,"MM")<0)return i(e,"MM-dd");var o=i(n,"dd")-i(e,"dd");if(0==o){var s=i(n,"hh")-i(e,"hh");if(0==s){var a=i(n,"mm")-i(e,"mm");return a<5?"刚刚":isNaN(a)?s+"小时前":a+"分钟前"}return s+"小时前"}return o+"天前"}function i(t,e){/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length)));var n={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds()};for(var i in n)if(new RegExp("("+i+")").test(e)){var o=(n[i]+"").replace(/^0/,"");e=e.replace(RegExp.$1,1===RegExp.$1.length?o:s(o))}return e}function o(t,e){/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length)));var n={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds()};for(var i in n)if(new RegExp("("+i+")").test(e)){var o=(n[i]+"").replace(/^0/,"");e=e.replace(RegExp.$1,1===RegExp.$1.length?o:a(o))}return e}function s(t){return("00"+t).substr(t.length)}function a(t){return t}Object.defineProperty(e,"__esModule",{value:!0}),e.formatedDate=n,e.formatDate=i,e.formatDate2=o},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={getUrlKey:function(t){return decodeURIComponent((new RegExp("[?|&]"+t+"=([^&;]+?)(&|#|;|$)").exec(location.href)||["",""])[1].replace(/\+/g,"%20"))||null}}},,function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{value:{type:Boolean,default:!1},text:String,position:String},created:function(){this.show=this.value},data:function(){return{show:!1}},watch:{value:function(t){this.show=t},show:function(t){this.$emit("input",t)}}}},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(47),s=i(o);e.default={mixins:[s.default],props:{value:Boolean,time:{type:Number,default:2e3},type:{type:String,default:"success"},transition:String,width:{type:String,default:"7.6em"},isShowMask:{type:Boolean,default:!1},text:String,position:String},data:function(){return{show:!1}},created:function(){this.value&&(this.show=!0)},computed:{currentTransition:function(){return this.transition?this.transition:"top"===this.position?"vux-slide-from-top":"bottom"===this.position?"vux-slide-from-bottom":"vux-fade"},toastClass:function(){return{"weui-toast_forbidden":"warn"===this.type,"weui-toast_cancel":"cancel"===this.type,"weui-toast_success":"success"===this.type,"weui-toast_text":"text"===this.type,"vux-toast-top":"top"===this.position,"vux-toast-bottom":"bottom"===this.position,"vux-toast-middle":"middle"===this.position}},style:function(){if("text"===this.type&&"auto"===this.width)return{padding:"10px"}}},watch:{show:function(t){var e=this;t&&(this.$emit("input",!0),this.$emit("on-show"),this.fixSafariOverflowScrolling("auto"),clearTimeout(this.timeout),this.timeout=setTimeout(function(){e.show=!1,e.$emit("input",!1),e.$emit("on-hide"),e.fixSafariOverflowScrolling("touch")},this.time))},value:function(t){this.show=t}}}},function(t,e){},function(t,e){},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:"vux-mask"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"weui-loading_toast"},[n("div",{staticClass:"weui-mask_transparent"}),t._v(" "),n("div",{staticClass:"weui-toast",style:{position:t.position}},[n("i",{staticClass:"weui-loading weui-icon_toast"}),t._v(" "),n("p",{staticClass:"weui-toast__content"},[t._v(t._s(t.text||"加载中")),t._t("default")],2)])])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-toast"},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowMask&&t.show,expression:"isShowMask && show"}],staticClass:"weui-mask_transparent"}),t._v(" "),n("transition",{attrs:{name:t.currentTransition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"weui-toast",class:t.toastClass,style:{width:t.width}},[n("i",{directives:[{name:"show",rawName:"v-show",value:"text"!==t.type,expression:"type !== 'text'"}],staticClass:"weui-icon-success-no-circle weui-icon_toast"}),t._v(" "),t.text?n("p",{staticClass:"weui-toast__content",style:t.style,domProps:{innerHTML:t._s(t.text)}}):n("p",{staticClass:"weui-toast__content"},[t._t("default")],2)])])],1)},staticRenderFns:[]}},function(t,e,n){var i,o;n(11),i=n(9);var s=n(13);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=s.render,o.staticRenderFns=s.staticRenderFns,t.exports=i},,function(t,e){"use strict";function n(){var t=window.navigator.userAgent.toLowerCase();return"micromessenger"==t.match(/MicroMessenger/i)}Object.defineProperty(e,"__esModule",{value:!0}),e.isWeiXin=n},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(29),s=i(o);e.default={components:{XDialog:s.default},created:function(){"undefined"!=typeof this.value&&(this.showValue=this.value)},props:{value:Boolean,title:String,content:String,buttonText:String,maskTransition:{type:String,default:"vux-mask"},dialogTransition:{type:String,default:"vux-dialog"}},data:function(){return{showValue:!1}},methods:{_onHide:function(){this.showValue=!1}},watch:{value:function(t){this.showValue=t},showValue:function(t){this.$emit("input",t)}}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{value:{type:Boolean,default:!1},maskTransition:{type:String,default:"vux-mask"},dialogTransition:{type:String,default:"vux-dialog"},hideOnBlur:Boolean,scroll:{type:Boolean,default:!0}},created:function(){"undefined"!=typeof this.value&&(this.currentValue=this.value)},watch:{value:{handler:function(t){this.currentValue=t},immediate:!0},currentValue:function(t){this.$emit(t?"on-show":"on-hide"),this.$emit("input",t)}},data:function(){return{currentValue:!1}},methods:{onTouchMove:function(t){!this.scroll&&t.preventDefault()}}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"failed",data:function(){return{}},props:{msg:String},components:{},created:function(){},methods:{}}},function(t,e){},function(t,e){},function(t,e){},,function(t,e,n){t.exports=n.p+"m/static/img/pay_result_failure.dac5b24.png"},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-x-dialog",on:{touchmove:t.onTouchMove}},[n("transition",{attrs:{name:t.maskTransition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.currentValue,expression:"currentValue"}],staticClass:"weui-mask",on:{click:function(e){t.hideOnBlur&&(t.currentValue=!1)}}})]),t._v(" "),n("transition",{attrs:{name:t.dialogTransition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.currentValue,expression:"currentValue"}],staticClass:"weui-dialog"},[t._t("default")],2)])],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-alert"},[n("x-dialog",{attrs:{"mask-transition":t.maskTransition,"dialog-transition":t.dialogTransition},on:{"on-hide":function(e){t.$emit("on-hide")},"on-show":function(e){t.$emit("on-show")}},model:{value:t.showValue,callback:function(e){t.showValue=e},expression:"showValue"}},[n("div",{staticClass:"weui-dialog__hd"},[n("strong",{staticClass:"weui-dialog__title"},[t._v(t._s(t.title))])]),t._v(" "),n("div",{staticClass:"weui-dialog__bd"},[t._t("default",[n("div",{domProps:{innerHTML:t._s(t.content)}})])],2),t._v(" "),n("div",{staticClass:"weui-dialog__ft"},[n("a",{staticClass:"weui-dialog__btn weui-dialog__btn_primary",attrs:{href:"javascript:;"},on:{click:t._onHide}},[t._v(t._s(t.buttonText||"确定"))])])])],1)},staticRenderFns:[]}},function(t,e,n){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"failed"}},[i("img",{attrs:{src:n(25),alt:""}}),t._v(" "),i("p",[t._v(t._s(t.msg))])])},staticRenderFns:[]}},function(t,e,n){var i,o;n(21),i=n(19);var s=n(26);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=s.render,o.staticRenderFns=s.staticRenderFns,t.exports=i},function(t,e,n){var i,o;n(23),i=n(20);var s=n(28);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=s.render,o.staticRenderFns=s.staticRenderFns,t.exports=i},,,function(t,e){},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{showLoading:{type:Boolean,default:!0},tip:String,backgroundColor:String},methods:{getStyle:function(){if(!this.showLoading&&this.tip)return{"background-color":this.backgroundColor}}}}},,,,,,function(t,e){},,function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"weui-loadmore",class:{"weui-loadmore_line":!t.showLoading,"weui-loadmore_dot":!t.showLoading&&!t.tip}},[t.showLoading?n("i",{staticClass:"weui-loading"}):t._e(),t._v(" "),n("span",{directives:[{name:"show",rawName:"v-show",value:t.tip||!t.showLoading,expression:"tip || !showLoading"}],staticClass:"weui-loadmore__tips",style:t.getStyle()},[t._v(t._s(t.tip))])])},staticRenderFns:[]}},,function(t,e,n){var i,o;n(40),i=n(34);var s=n(42);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=s.render,o.staticRenderFns=s.staticRenderFns,t.exports=i},,function(t,e,n){var i,o;n(12),i=n(10);var s=n(14);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=s.render,o.staticRenderFns=s.staticRenderFns,t.exports=i},,,,,,,,,,,,,,,,,function(t,e,n){var i,o;n(22),i=n(18);var s=n(27);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=s.render,o.staticRenderFns=s.staticRenderFns,t.exports=i},,,,,,,,,,,,,,,function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(117),s=i(o);e.default={props:{decimal:Boolean,value:{default:0,type:Number},min:{type:Number,default:0},minHTML:String,maxHTML:String,max:{type:Number,default:100},step:{type:Number,default:0},disabled:Boolean,disabledOpacity:Number,rangeBarHeight:{type:Number,default:1},rangeHandleHeight:{type:Number,default:30}},created:function(){this.currentValue=this.value},mounted:function(){var t=this,e=this;this.$nextTick(function(){var n={callback:function(t){e.currentValue=t},decimal:t.decimal,start:t.currentValue,min:t.min,max:t.max,minHTML:t.minHTML,maxHTML:t.maxHTML,disable:t.disabled,disabledOpacity:t.disabledOpacity,initialBarWidth:window.getComputedStyle(t.$el.parentNode).width.replace("px","")-80};0!==t.step&&(n.step=t.step),t.range=new s.default(t.$el.querySelector(".vux-range-input"),n);var i=(t.rangeHandleHeight-t.rangeBarHeight)/2;t.$el.querySelector(".range-handle").style.top="-"+i+"px",t.$el.querySelector(".range-bar").style.height=t.rangeBarHeight+"px"})},methods:{update:function(){var t=this.currentValue;t<this.min&&(t=this.min),t>this.max&&(t=this.max),this.range.reInit({min:this.min,max:this.max,value:t}),this.currentValue=t,this.range.setStart(this.currentValue)}},data:function(){return{currentValue:0}},watch:{currentValue:function(t){this.range&&this.range.setStart(t),this.$emit("input",t)},value:function(t){this.currentValue=t},min:function(){this.update()},max:function(){this.update()}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),n(1),n(17),e.default={name:"app-download",props:{id:String},data:function(){return{}},components:{},mounted:function(){new Mlink({mlink:"https://a.mlinks.cc/AK8f?id="+this.id,button:document.querySelector("a#btnOpenApp2"),autoLaunchApp:!1})},methods:{BrowserType:function(){window.location.href="https://a.mlinks.cc/AK8f?id="+this.id}}}},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(110),s=i(o);e.default={name:"audiobox",props:{music:String},data:function(){return{musicplay:this.$refs.musicplay,duration:0,current:0,max:0,value:0,sdrag:!1,tx:0,x:0}},components:{Range:s.default},mounted:function(){this.inits();var t=document.getElementById("progress-pin");t.addEventListener("touchend",this.moveend),t.addEventListener("touchstart",this.selectmouse),t.addEventListener("touchmove",this.movemouse)},methods:{moveend:function(t){this.$refs.musicplay.play(),pButton.className="pause",this.$refs.musicplay.addEventListener("timeupdate",this.updateProgress),this.sdrag=!1;var e=t.target.offsetLeft,n=t.target.parentElement.parentElement.clientWidth,i=document.getElementById("audio");i.currentTime=i.duration*e/n},selectmouse:function(t){return this.isdrag=!0,this.tx=parseInt(document.getElementById("progress-pin").style.left+0),this.x=t.touches[0].pageX,!1},movemouse:function(t){this.$refs.musicplay.pause(),this.isdrag=!0;var e=this.$refs.slider.offsetWidth,n=this.tx+t.touches[0].pageX-this.x;if(this.isdrag&&n>0&&n<e)return document.getElementById("progress-pin").style.left=n+"px",this.$refs.progress.style.width=n+"px",!1},inits:function(){var t=this,e=setInterval(function(){isNaN(t.$refs.musicplay.duration)||(t.duration=t.$refs.musicplay.duration,t.$refs.totalTime.textContent=t.formatTime(t.duration),console.log(t.duration),clearTimeout(e))},20)},play:function(){this.$refs.musicplay.addEventListener("timeupdate",this.updateProgress),this.$refs.musicplay.paused?(this.$refs.musicplay.play(),pButton.className="",pButton.className="pause"):(this.$refs.musicplay.pause(),pButton.className="",pButton.className="play")},clickslider:function(t){var e=t.offsetX,n=t.srcElement.clientWidth;this.$refs.musicplay.currentTime=this.$refs.musicplay.duration*e/n},updateProgress:function(){var t=this.$refs.musicplay.currentTime,e=t/this.$refs.musicplay.duration*100;this.$refs.progress.style.width=e+"%";var n=this.$refs.slider.offsetWidth;this.$refs.propin.style.left=e*n/100+"px",this.$refs.currentTime.textContent=this.formatTime(t),this.$refs.musicplay.currentTime==this.$refs.musicplay.duration&&(this.$refs.musicplay.pause(),pButton.className="",pButton.className="play",this.$refs.musicplay.currentTime=0)},formatTime:function(t){var e=Math.floor(t/60),n=Math.floor(t%60);return e+":"+(n<10?"0"+n:n)}}}},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(6),s=n(3),a=i(s),r=n(2),c=i(r),l=n(56),u=i(l),d=n(48),f=i(d),p=n(49),m=i(p),h=n(50),g=i(h);c.default.use(f.default),c.default.use(u.default),e.default={name:"comments",props:{name:String,commentlist:Array,id:String},data:function(){return{isClick:{}}},mounted:function(){},components:{},filters:{formatDate:o.formatedDate},methods:{showPlugin:function(){this.$vux.alert.show({title:"小提示",content:"打开APP，参与互动，<br/> 获取优质内容。",dialogTransition:"",maskTransition:"",onShow:function(){console.log("Plugin: I'm showing")},onHide:function(){console.log("Plugin: I'm hiding now")}})},showPluginAuto:function(){this.showPlugin()},addComment:function(){localStorage.getItem("gid")?window.location.href="comment.html?id="+this.id+"&name="+this.name:(getAuth(m.default,g.default,"item",this.id),console.log(0))},clickZan:function(t,e){if(localStorage.getItem("gid")){var n=this;this.isClick[e]||this.commentlist[e].liked?(this.commentlist[e].liked=!this.commentlist[e].liked,this.isClick[e]=!1,this.$refs.zan[e].className="icon img1",a.default.httpPost(c.default,HOST+"/api/comments/cancel_like",{id:t},function(t){console.log(t),0!=t.status?(console.log(t),n.$vux.toast.show({text:t.error,type:"warn",width:"10em"}),clearcookie(m.default),getAuth(m.default,g.default)):n.commentlist[e].support_count=t.count},function(t){console.log(1)})):(this.commentlist[e].liked=!this.commentlist[e].liked,this.isClick[e]=!0,this.$refs.zan[e].className="icon img2",a.default.httpPost(c.default,HOST+"/api/comments/do_like",{id:t},function(t){0!=t.status?(n.$vux.toast.show({text:t.error,type:"warn",width:"10em"}),clearcookie(m.default),getAuth(m.default,g.default)):n.commentlist[e].support_count=t.count},function(t){console.log(t)})),console.log(this.isClick)}else getAuth(m.default,g.default,"item",this.id),console.log(0)}}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"vediobox",props:{video:String,poster:String},data:function(){return{showplay:!0}},components:{},methods:{play:function(){this.$refs.vdo.paused?(this.$refs.vdo.play(),this.showplay=!1):(this.$refs.vdo.pause(),this.showplay=!0)}}}},,,,,,,,,,,,,,,,function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e,n){t.exports=n.p+"m/static/img/logo.0e82203.png"},function(t,e){t.exports="data:image/png;base64,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"},function(t,e,n){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"comments"}},[i("div",{staticClass:"title"},[i("p",{staticClass:"comment-title vux-1px-b"},[t._v(t._s(t.title||"评论"))]),t._v(" "),i("p",{staticClass:"add-comment",on:{click:t.addComment}},[t._v("\n      写评论\n      "),i("img",{attrs:{src:n(104),alt:""}})])]),t._v(" "),void 0!=t.commentlist?i("ul",{attrs:{id:"comment"}},t._l(t.commentlist,function(e,n){return i("li",{staticClass:"vux-1px-b"},[i("img",{attrs:{src:e.author.photo,alt:"",onerror:"this.src='http://m.kofuf.com/static/img/default.png'"}}),t._v(" "),i("div",{staticClass:"comment-box"},[i("p",{staticClass:"username"},[t._v(t._s(e.author.name))]),t._v(" "),i("p",{staticClass:"date"},[t._v(t._s(t._f("formatDate")(e.postd)))]),t._v(" "),i("p",{staticClass:"comment-con"},[t._v(t._s(e.content))]),t._v(" "),i("div",{staticClass:"zan",on:{click:function(i){t.clickZan(e.id,n)}}},[i("span",{ref:"zan",refInFor:!0,staticClass:"icon",class:{img1:!e.liked,img2:e.liked}}),t._v(" "),i("span",{staticClass:"count"},[t._v(" "+t._s(e.support_count))])])])])})):i("ul",[i("li",{staticClass:"comment-none"},[t._v("\n      暂无评论\n    ")])])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"vediobox"}},[n("video",{ref:"vdo",attrs:{src:t.video,poster:t.poster}},[t._v("\n    您的浏览器不支持video\n  ")]),t._v(" "),n("div",{staticClass:"vdo-control",on:{click:t.play}},[t.showplay?n("span",{staticClass:"vdo-play"}):t._e()])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-1px",attrs:{id:"audiobox"}},[n("audio",{ref:"musicplay",attrs:{src:t.music,id:"audio"}},[t._v("\n    您的浏览器不支持audio\n  ")]),t._v(" "),n("div",{attrs:{id:"audioplayer"}},[n("button",{staticClass:"play",attrs:{id:"pButton"},on:{click:t.play}}),t._v(" "),n("div",{staticClass:"controls"},[n("span",{ref:"currentTime",staticClass:"current-time"},[t._v("0:00")]),t._v(" "),n("div",{ref:"slider",staticClass:"slider",attrs:{"data-direction":"horizontal"},on:{click:t.clickslider}},[n("div",{ref:"progress",staticClass:"progress"},[n("div",{ref:"propin",staticClass:"pin",attrs:{id:"progress-pin","data-method":"rewind"}})])]),t._v(" "),n("span",{ref:"totalTime",staticClass:"total-time"},[t._v("0:00")])])])])},staticRenderFns:[]}},function(t,e,n){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app-download"}},[t._m(0),t._v(" "),n("a",{staticClass:"load",attrs:{id:"btnOpenApp2"},on:{click:t.BrowserType}},[t._v("打开APP阅读")])])},staticRenderFns:[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"contentapp"},[i("img",{staticClass:"logo",attrs:{src:n(103)}}),t._v(" "),i("div",{staticClass:"one"},[t._v("\n      中国财经新媒体第一平台，以最具人格化的财经大咖和最具表现力的财经小V，构筑最具公信力和活跃度的财经社群。帮助中国的中产阶层，实现全球资产的优化配置。\n    ")]),t._v(" "),i("div",{staticClass:"two"},[t._v("\n      平台集结了时寒冰、王福重、马光远、李大霄、琢磨先生、黄生、闫肖峰、胡润等各路财经大侠，以视频、音频、图文、公开课、线下社交、海外游学等方式提供最具价值的财经知识产品，和您共同缔造财富的光荣与梦想。\n    ")])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-range-input-box",staticStyle:{position:"relative","margin-right":"30px","margin-left":"50px"}},[n("input",{directives:[{name:"model",rawName:"v-model.number",value:t.currentValue,expression:"currentValue",modifiers:{number:!0}}],staticClass:"vux-range-input",domProps:{value:t.currentValue},on:{input:function(e){e.target.composing||(t.currentValue=t._n(e.target.value))},blur:function(e){t.$forceUpdate()}}})])},staticRenderFns:[]}},function(t,e,n){var i,o;n(102),i=n(78);var s=n(109);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=s.render,o.staticRenderFns=s.staticRenderFns,t.exports=i},function(t,e,n){var i,o;n(101),i=n(79);var s=n(108);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=s.render,o.staticRenderFns=s.staticRenderFns,t.exports=i},function(t,e,n){var i,o;n(100),i=n(80);var s=n(107);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=s.render,o.staticRenderFns=s.staticRenderFns,t.exports=i},function(t,e,n){var i,o;n(98),i=n(81);var s=n(105);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=s.render,o.staticRenderFns=s.staticRenderFns,t.exports=i},function(t,e,n){var i,o;n(99),i=n(82);var s=n(106);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=s.render,o.staticRenderFns=s.staticRenderFns,t.exports=i},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),n(1),n(4);var o=n(7),s=(i(o),n(6)),a=n(3),r=i(a),c=n(113),l=i(c),u=n(112),d=i(u),f=n(114),p=i(f),m=n(111),h=i(m),g=n(30),v=i(g),w=n(2),y=i(w),x=n(15),_=i(x),C=n(44),A=i(C),k=n(8),b=i(k);window.location.href="http://detail.youzan.com/show/goods?alias=3nwklbnnoeybu&sls=2IItkM",y.default.use(b.default),e.default={name:"gongfu",data:function(){return{id:"1817",showContent:!1,paly:0,showplay:!0,commentlist:{items:[]},articles:{},showComment:!1,loadingshow:!0,loadtext:"loading...",appdownloadshow:!1,failedshow:!1,failedmsg:"服务请求失败，请刷新重试",nonecomment:!1,loadmore:!0,commentBottomMsg:"点击，获取更多数据",pn:0,last_time:""}},components:{Loading:_.default,Comment:l.default,Audiobox:d.default,Videobox:p.default,AppDownload:h.default,Failed:v.default,LoadMore:A.default},created:function(){var t="1817";this.id=t,this.fetchData(t)},mounted:function(){
new Mlink({mlink:"https://a.mlinks.cc/AK8f?id="+this.id,button:document.querySelector("a#btnOpenApp"),autoLaunchApp:!1})},methods:{openApp:function(){this.getPhoneType()},fetchData:function(t){var e=this;this.$http.get(HOST+"/api/articles/"+t+".json",[]).then(function(n){if(e.loadingshow=!1,e.articles=JSON.parse(n.bodyText),document.title=e.articles.name,/<a/g.test(e.articles.content)){var i=e.articles.content.match(/href=\"channel\/\d{3,}/g);if(console.log(i),i){var o=i[0].replace('href="channel/',"");e.articles.content=e.articles.content.replace(/href=\"channel\/\d{3,}/g,'href="channel.html?id='+o)}var s=e.articles.content.match(/href=\"article\/\d{3,}/g);if(s){var a=s[0].replace('href="article/',"");e.articles.content=e.articles.content.replace(/href=\"article\/\d{3,}/g,'href="detail.html?id='+a)}var r=e.articles.content.match(/href=\"good\/\d{3,}/g);if(r){var c=e;console.log(r);var l=r[0].replace('href="good/',"");if(c.articles.content=c.articles.content.replace(/href=\"good\/\d{3,}/,'href="good.html?id='+l),c.articles.content=c.articles.content.replace(/href=\"good\/\d{3,}/,'href="good.html?id='+l),c.articles.content=c.articles.content.replace(/href=\"good\/\d{3,}/,'href="good.html?id='+l),r[3]){var u=r[3].replace('href="good/',"");c.articles.content=c.articles.content.replace(/href=\"good\/\d{3,}/,'href="good.html?id='+u),c.articles.content=c.articles.content.replace(/href=\"good\/\d{3,}/,'href="good.html?id='+u),c.articles.content=c.articles.content.replace(/href=\"good\/\d{3,}/,'href="good.html?id='+u)}if(r[6]){var d=r[6].replace('href="good/',"");c.articles.content=c.articles.content.replace(/href=\"good\/\d{3,}/,'href="good.html?id='+d),c.articles.content=c.articles.content.replace(/href=\"good\/\d{3,}/,'href="good.html?id='+d),c.articles.content=c.articles.content.replace(/href=\"good\/\d{3,}/,'href="good.html?id='+d)}console.log(l),console.log(u),console.log(d)}}0!=e.articles.status?4!=e.articles.status?e.appdownloadshow=!0:(e.failedmsg=e.articles.error,e.failedshow=!0):(e.showContent=!0,e.showComment=e.articles.need_comments,e.showComment&&e.fetchCommentData(t))},function(t){e.loadingshow=!1,e.failedmsg="请求参数有误",e.failedshow=!0,console.log(t)});var n=this;setTimeout(function(){n.loadingshow=!1},1e4)},fetchCommentData:function(t,e,n){var i=this;r.default.httpGet(y.default,HOST+"/api/articles/comments.json?id="+t+"&pn="+e+"&last_time="+n,{},function(t){i.loadingshow=!1,i.datalist=t,console.log(i.datalist),i.datalist.items.length<=0&&1==i.loadmore?i.nonecomment=!0:(i.commentlist.items=i.commentlist.items.concat(i.datalist.items),i.commentlist.items[i.commentlist.items.length-1].postd&&(i.last_time=i.commentlist.items[i.commentlist.items.length-1].postd),i.datalist.has_next||(i.commentBottomMsg="没有更多数据"),i.loadmore=!0)},function(t){i.loadingshow=!1,console.log(t)})},logErr:function(t){this.$vux.alert.show({title:"提示",content:t,dialogTransition:"",maskTransition:"",onShow:function(){},onHide:function(){}})},getPhoneType:function(){var t="1817",e=navigator.userAgent;e.indexOf("Android")>-1||e.indexOf("Linux")>-1?(console.log("Android"),window.location.href="https://a.mlinks.cc/AK8f?id="+t):e.indexOf("iPhone")>-1?(console.log("apple"),window.location.href="https://a.mlinks.cc/AK8f?id="+t):e.indexOf("Windows Phone")>-1?(console.log("Windows"),window.location.href="https://a.mlinks.cc/AK8f?id="+t):window.location.href="https://a.mlinks.cc/AK8f?id="+t},commentLoad:function(){this.loadmore=!1;var t="1817";this.fetchCommentData(t,++this.pn,this.last_time)},toChannels:function(){window.location.href="channels.html"}},filters:{formatDate:function(t){var e=new Date(t);return(0,s.formatDate)(e,"MM月dd日")}}}},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e){},,,,,,,,,,,,,,,function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"gongfu"}},[t.failedshow?n("Failed",{attrs:{msg:t.failedmsg}}):t._e(),t._v(" "),t.showContent?n("div",{staticClass:"contents"},["V"==t.articles.sub_type?n("div",[n("Videobox",{attrs:{video:t.articles.banner,poster:t.articles.thumb}})],1):t._e(),t._v(" "),"R"===t.articles.sub_type?n("div",[n("img",{staticClass:"img",attrs:{src:t.articles.thumb,alt:""}})]):t._e(),t._v(" "),"A"==t.articles.sub_type?n("div",{staticClass:"banner"},[n("img",{attrs:{src:t.articles.banner,alt:""}})]):t._e(),t._v(" "),n("div",{staticClass:"article"},[n("p",{staticClass:"title"},[t._v(t._s(t.articles.name))]),t._v(" "),n("div",{staticClass:"info vux-1px-b"},[n("img",{attrs:{src:t.articles.author_pic,alt:"",onerror:"this.src='http://m.kofuf.com/static/img/logo.png'"}}),t._v(" "),n("span",{staticClass:"author"},[t._v("作者："+t._s(t.articles.author_name))]),t._v(" "),n("span",{staticClass:"created"},[t._v(t._s(t._f("formatDate")(t.articles.created)))])]),t._v(" "),"R"===t.articles.sub_type?n("div",[n("Audiobox",{attrs:{music:t.articles.banner}})],1):t._e(),t._v(" "),n("div",{ref:"contenthtml",staticClass:"content",attrs:{id:"contenthtml"},domProps:{innerHTML:t._s(t.articles.content)}})]),t._v(" "),t.showComment?n("div",[n("comment",{attrs:{name:t.articles.name,commentlist:t.commentlist.items,id:t.id}}),t._v(" "),t.nonecomment?n("div",{staticClass:"comment-bottom"},[n("p",[t._v("暂无数据")])]):t._e(),t._v(" "),t.nonecomment?t._e():n("div",{staticClass:"comment-bottom"},[t.loadmore?n("p",{on:{click:t.commentLoad}},[t._v(t._s(t.commentBottomMsg))]):n("load-more",{attrs:{tip:"正在加载"}},[t._v("正在加载")])],1)],1):t._e()]):t._e(),t._v(" "),n("footer",{directives:[{name:"show",rawName:"v-show",value:t.showContent,expression:"showContent"}]},[n("div",{staticClass:"gfcj",on:{click:t.toChannels}},[n("img",{attrs:{src:"http://m.kofuf.com/static/img/logo.png",alt:""}}),t._v(" "),t._m(0)]),t._v(" "),t._m(1)]),t._v(" "),t._m(2),t._v(" "),t.appdownloadshow?n("app-download",{attrs:{id:t.id}}):t._e(),t._v(" "),n("Loading",{attrs:{text:t.loadtext},model:{value:t.loadingshow,callback:function(e){t.loadingshow=e},expression:"loadingshow"}})],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"gf"},[n("p",{staticClass:"p1"},[t._v("功夫财经")]),n("p",{staticClass:"p2"},[t._v("学财经   长本事")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"download"},[n("a",{attrs:{id:"btnOpenApp"}},[t._v("打开APP")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"qr_code_pc_inner"},[n("div",{staticClass:"qr_code_pc"},[n("img",{staticClass:"qr_code_pc_img",attrs:{id:"js_pc_qr_code_img",src:"http://m.kofuf.com/static/img/wx.jpg"}}),t._v(" "),n("p",[t._v("微信扫一扫"),n("br"),t._v("学财经，长本事")])])])}]}},,,,,,,,,,,,,,,,,,,function(t,e,n){var i,o;n(210),i=n(145);var s=n(225);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=s.render,o.staticRenderFns=s.staticRenderFns,t.exports=i}]);