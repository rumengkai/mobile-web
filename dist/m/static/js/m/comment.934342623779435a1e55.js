webpackJsonp([24,0],{0:function(t,e,o){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}var i=o(1),a=n(i),s=o(449),r=n(s),u=o(10),c=n(u);a.default.use(c.default),new a.default({el:"#addcomment",template:"<App/>",components:{App:r.default}})},2:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={ajaxPost:function(t,e,o,n){$.ajax({url:t,type:"POST",data:e,success:function(t){o(t)},error:function(t){n(t)}})},ajaxGet:function(){},httpPost:function(t,e,o,n,i){t.http.options.emulateJSON=!0,t.http.options.headers={"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},t.http.interceptors.push(function(t,e){t.headers.set("from",config().from),t.headers.set("gid",config().gid),t.headers.set("token",config().token),t.headers.set("version",VERSION),e()}),t.http.post(e,o).then(function(t){return t.bodyText}).then(function(t){var t=JSON.parse(t);n(t)},function(t){i(t)})},httpGet:function(t,e,o,n,i){t.http.options.emulateJSON=!0,t.http.options.headers={"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},t.http.interceptors.push(function(t,e){t.headers.set("from",config().from),t.headers.set("gid",config().gid),t.headers.set("token",config().token),t.headers.set("version",VERSION),e()}),t.http.get(e,{params:o}).then(function(t){return t.bodyText}).then(function(t){var t=JSON.parse(t);n(t)},function(t){i(t)})}}},3:function(t,e){},4:function(t,e,o){"use strict";!function(){var t=document.documentElement.clientWidth||document.body.clientWidth;t=t>640?640:t;var e=t/750*100;e=e<50?e:50,document.documentElement.style.fontSize=e+"px",t<350?window.phonetype="small":window.phonetype="large"}(),window.base="pro","pro"==base?(window.VERSION="0.1",window.HOST="http://api.kofuf.com",window.HOSTM="http://m.kofuf.com",window.config=function(){return{paytype:"JSAPI",from:"3",gid:localStorage.getItem("gid"),token:localStorage.getItem("token")}}):(window.VERSION="0.1",window.HOST="http://dev.kofuf.com",window.HOSTM="http://m.kofuf.com",window.config=function(){return{paytype:"APP",from:"2",gid:"1047500131",token:"df2d1ecf7d064049966b15787786900f"}});var n=o(23);n.attach(document.body),window.getAuthLink=function(t){return"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx05e842991e5fa0b2&redirect_uri=http://api.kofuf.com%2Fapi%2Fsession%2Fauth_weixin&response_type=code&scope=snsapi_userinfo&state="+t+"#wechat_redirect"},window.getAuth=function(t,e,o,n){var i=t.get("gid"),a=e.parse();if(!localStorage.getItem("gid")||""==localStorage.getItem("gid"))if("undefined"!=typeof a.gid)localStorage.setItem("gid",a.gid),localStorage.setItem("token",a.token);else if("undefined"!=typeof i)localStorage.setItem("gid",t.get("gid")),localStorage.setItem("token",t.get("token"));else{var s;s=void 0!=n?o+"_"+n:o,window.location.href=getAuthLink(s)}},window.clearcookie=function(t){localStorage.clear(),t.set("gid",0,{domain:".kofuf.com",path:"/",expires:-1}),t.set("token",0,{domain:".kofuf.com",path:"/",expires:-1})}},25:function(t,e){},37:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={getUrlKey:function(t){var e=decodeURIComponent((new RegExp("[?|&]"+t+"=([^&;]+?)(&|#|;|$)").exec(location.href)||["",""])[1].replace(/\+/g,"%20"))||null;return e}}},42:function(t,e,o){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var i=o(69),a=n(i);e.default={mixins:[a.default],props:{value:Boolean,time:{type:Number,default:2e3},type:{type:String,default:"success"},transition:String,width:{type:String,default:"7.6em"},isShowMask:{type:Boolean,default:!1},text:String,position:String},data:function(){return{show:!1}},created:function(){this.value&&(this.show=!0)},computed:{currentTransition:function(){return this.transition?this.transition:"top"===this.position?"vux-slide-from-top":"bottom"===this.position?"vux-slide-from-bottom":"vux-fade"},toastClass:function(){return{"weui-toast_forbidden":"warn"===this.type,"weui-toast_cancel":"cancel"===this.type,"weui-toast_success":"success"===this.type,"weui-toast_text":"text"===this.type,"vux-toast-top":"top"===this.position,"vux-toast-bottom":"bottom"===this.position,"vux-toast-middle":"middle"===this.position}},style:function(){if("text"===this.type&&"auto"===this.width)return{padding:"10px"}}},watch:{show:function(t){var e=this;t&&(this.$emit("input",!0),this.$emit("on-show"),this.fixSafariOverflowScrolling("auto"),clearTimeout(this.timeout),this.timeout=setTimeout(function(){e.show=!1,e.$emit("input",!1),e.$emit("on-hide"),e.fixSafariOverflowScrolling("touch")},this.time))},value:function(t){this.show=t}}}},45:function(t,e){},47:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"vux-toast"},[o("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowMask&&t.show,expression:"isShowMask && show"}],staticClass:"weui-mask_transparent"}),t._v(" "),o("transition",{attrs:{name:t.currentTransition}},[o("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"weui-toast",class:t.toastClass,style:{width:t.width}},[o("i",{directives:[{name:"show",rawName:"v-show",value:"text"!==t.type,expression:"type !== 'text'"}],staticClass:"weui-icon-success-no-circle weui-icon_toast"}),t._v(" "),t.text?o("p",{staticClass:"weui-toast__content",style:t.style,domProps:{innerHTML:t._s(t.text)}}):o("p",{staticClass:"weui-toast__content"},[t._t("default")],2)])])],1)},staticRenderFns:[]}},58:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{type:{default:"default"},disabled:Boolean,mini:Boolean,plain:Boolean,text:String,actionType:String,showLoading:Boolean},computed:{classes:function(){return[{"weui-btn_disabled":this.disabled,"weui-btn_mini":this.mini},"weui-btn_"+this.type,this.plain?"weui-btn_plain-"+this.type:"",this.showLoading?"weui-btn_loading":""]}}}},60:function(t,e){},63:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("button",{staticClass:"weui-btn",class:t.classes,attrs:{disabled:t.disabled,type:t.actionType}},[t.showLoading?o("i",{staticClass:"weui-loading"}):t._e(),t._t("default",[t._v(t._s(t.text))])],2)},staticRenderFns:[]}},67:function(t,e,o){var n,i;o(45),n=o(42);var a=o(47);i=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(i=n=n.default),"function"==typeof i&&(i=i.options),i.render=a.render,i.staticRenderFns=a.staticRenderFns,t.exports=n},68:function(t,e,o){var n,i;o(60),n=o(58);var a=o(63);i=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(i=n=n.default),"function"==typeof i&&(i=i.options),i.render=a.render,i.staticRenderFns=a.staticRenderFns,t.exports=n},229:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{gap:String}}},252:function(t,e,o){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),o(3),o(4);var i=o(37),a=n(i),s=o(2),r=n(s),u=o(1),c=n(u),d=o(68),l=n(d),f=o(426),p=n(f),h=o(67),m=(n(h),o(70)),w=n(m);c.default.use(w.default),c.default.prototype.$geturlpara=a.default,e.default={name:"addcomment",mounted:function(){var t=this.$geturlpara.getUrlKey("name"),e=this.$geturlpara.getUrlKey("id");this.name=t,this.id=e},data:function(){return{textdata:"",placeholder:"写下您想说的话",name:"",sub:!0,id:0,writeAble:!0}},components:{XButton:l.default,Box:p.default},created:function(){localStorage.getItem("gid")||this.$vux.toast.show({text:"请前往注册页面",width:"11em"})},methods:{submit:function(){var t=this;this.sub=!1;var e=this;this.writeAble=!1,r.default.httpPost(c.default,HOST+"/api/comments/add",{from:3,gid:localStorage.getItem("gid"),token:localStorage.getItem("token"),item:e.id,content:e.textdata,origin_comment:""},function(o){e.sub=!0,0!=o.status?(console.log("err"),e.$vux.toast.show({text:o.error,type:"warn",width:"10em"}),clearcookie(cookie),getAuth(cookie,querystring)):e.$vux.toast.show({text:"评论成功"}),setTimeout(function(){window.location.href="/m/detail.html?id="+t.id},2e3)},function(t){e.sub=!0,console.log(t),e.$vux.toast.show({text:"评论失败，请稍后重试",type:"warn"})})}},filters:{}}},330:function(t,e){},386:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"addcomment"}},[o("div",{staticClass:"content"},[o("div",{staticClass:"title"},[o("p",[t._v(t._s(t.name))])]),t._v(" "),o("div",{staticClass:"comcontent"},[o("textarea",{directives:[{name:"model",rawName:"v-model",value:t.textdata,expression:"textdata"}],staticClass:"weui-textarea",attrs:{autocomplete:"off",autocapitalize:"off",autocorrect:"off",spellcheck:"false",placeholder:t.placeholder},domProps:{value:t.textdata},on:{input:function(e){e.target.composing||(t.textdata=e.target.value)}}})]),t._v(" "),o("box",{attrs:{gap:"20px 20px"}},[t.sub?o("div",[o("x-button",{attrs:{type:"primary",disabled:!t.textdata||!t.writeAble},nativeOn:{click:function(e){t.submit(e)}}},[t._v("提交")])],1):o("div",[o("x-button",{attrs:{type:"primary",disabled:"","show-loading":""},nativeOn:{click:function(e){t.submit(e)}}},[t._v("正在提交")])],1)])],1)])},staticRenderFns:[]}},394:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{style:{margin:t.gap}},[t._t("default")],2)},staticRenderFns:[]}},426:function(t,e,o){var n,i;n=o(229);var a=o(394);i=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(i=n=n.default),"function"==typeof i&&(i=i.options),i.render=a.render,i.staticRenderFns=a.staticRenderFns,t.exports=n},449:function(t,e,o){var n,i;o(330),n=o(252);var a=o(386);i=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(i=n=n.default),"function"==typeof i&&(i=i.options),i.render=a.render,i.staticRenderFns=a.staticRenderFns,t.exports=n}});