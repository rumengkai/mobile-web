webpackJsonp([16,0],{0:function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}var a=i(1),o=n(a),r=i(441),s=n(r),l=i(10),u=n(l);o.default.use(u.default),new o.default({el:"#address",template:"<App/>",components:{App:s.default}})},2:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={ajaxPost:function(t,e,i,n){$.ajax({url:t,type:"POST",data:e,success:function(t){i(t)},error:function(t){n(t)}})},ajaxGet:function(){},httpPost:function(t,e,i,n,a){t.http.options.emulateJSON=!0,t.http.options.headers={"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},t.http.interceptors.push(function(t,e){t.headers.set("from",config().from),t.headers.set("gid",config().gid),t.headers.set("token",config().token),t.headers.set("version",VERSION),e()}),t.http.post(e,i).then(function(t){return t.bodyText}).then(function(t){var t=JSON.parse(t);n(t)},function(t){a(t)})},httpGet:function(t,e,i,n,a){t.http.options.emulateJSON=!0,t.http.options.headers={"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},t.http.interceptors.push(function(t,e){t.headers.set("from",config().from),t.headers.set("gid",config().gid),t.headers.set("token",config().token),t.headers.set("version",VERSION),e()}),t.http.get(e,{params:i}).then(function(t){return t.bodyText}).then(function(t){var t=JSON.parse(t);n(t)},function(t){a(t)})}}},3:function(t,e){},4:function(t,e,i){"use strict";!function(){var t=document.documentElement.clientWidth||document.body.clientWidth;t=t>640?640:t;var e=t/750*100;e=e<50?e:50,document.documentElement.style.fontSize=e+"px",t<350?window.phonetype="small":window.phonetype="large"}(),window.base="pro","pro"==base?(window.VERSION="0.1",window.HOST="http://api.kofuf.com",window.HOSTM="http://m.kofuf.com",window.config=function(){return{paytype:"JSAPI",from:"3",gid:localStorage.getItem("gid"),token:localStorage.getItem("token")}}):(window.VERSION="0.1",window.HOST="http://dev.kofuf.com",window.HOSTM="http://m.kofuf.com",window.config=function(){return{paytype:"APP",from:"2",gid:"1047500131",token:"df2d1ecf7d064049966b15787786900f"}});var n=i(23);n.attach(document.body),window.getAuthLink=function(t){return"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx05e842991e5fa0b2&redirect_uri=http://api.kofuf.com%2Fapi%2Fsession%2Fauth_weixin&response_type=code&scope=snsapi_userinfo&state="+t+"#wechat_redirect"},window.getAuth=function(t,e,i,n){var a=t.get("gid"),o=e.parse();if(!localStorage.getItem("gid")||""==localStorage.getItem("gid"))if("undefined"!=typeof o.gid)localStorage.setItem("gid",o.gid),localStorage.setItem("token",o.token);else if("undefined"!=typeof a)localStorage.setItem("gid",t.get("gid")),localStorage.setItem("token",t.get("token"));else{var r;r=void 0!=n?i+"_"+n:i,window.location.href=getAuthLink(r)}},window.clearcookie=function(t){localStorage.clear(),t.set("gid",0,{domain:".kofuf.com",path:"/",expires:-1}),t.set("token",0,{domain:".kofuf.com",path:"/",expires:-1})}},5:function(t,e){"use strict";function i(){var t=window.navigator.userAgent.toLowerCase();return"micromessenger"==t.match(/MicroMessenger/i)}function n(){var t,e,i,n;return t=document.documentElement.scrollLeft||document.body.scrollLeft,e=document.documentElement.scrollTop||document.body.scrollTop,i=document.documentElement.clientWidth,n=document.documentElement.clientHeight,{left:t,top:e,width:i,height:n}}function a(){var t,e;return t=document.body.clientHeight,e=document.body.scrollTop,{top:e,height:t}}function o(t,e){var i="http://dev.kofuf.com/api/session/share_weixin_config?url="+encodeURIComponent(window.location.href.split("#")[0]);t.http.get(i).then(function(t){return t.bodyText}).then(function(t){var t=JSON.parse(t);wx.config({debug:!1,appId:t.appId,timestamp:t.timestamp,nonceStr:t.nonceStr,signature:t.signature,jsApiList:["checkJsApi","onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo"]})},function(t){error(t)}),wx.ready(function(){var t=shareData.title,e=shareData.link,i=shareData.imgUrl,n=shareData.desc;wx.onMenuShareTimeline({title:t,link:e,imgUrl:i,success:function(){},cancel:function(){}}),wx.onMenuShareAppMessage({title:t,desc:n,link:e,imgUrl:i,type:"link",success:function(){},cancel:function(){}}),wx.onMenuShareQZone({title:t,desc:n,link:e,imgUrl:i,success:function(){},cancel:function(){}}),wx.onMenuShareQQ({title:t,desc:n,link:e,imgUrl:i,success:function(){},cancel:function(){}})})}Object.defineProperty(e,"__esModule",{value:!0}),e.isWeiXin=i,e.getClient=n,e.getBody=a,e.weixinShare=o},6:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{value:{type:Boolean,default:!1},text:String,position:String},created:function(){this.show=this.value},data:function(){return{show:!1}},watch:{value:function(t){this.show=t},show:function(t){this.$emit("input",t)}}}},7:function(t,e){},8:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("transition",{attrs:{name:"vux-mask"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"weui-loading_toast"},[i("div",{staticClass:"weui-mask_transparent"}),t._v(" "),i("div",{staticClass:"weui-toast",style:{position:t.position}},[i("i",{staticClass:"weui-loading weui-icon_toast"}),t._v(" "),i("p",{staticClass:"weui-toast__content"},[t._v(t._s(t.text||"加载中")),t._t("default")],2)])])])},staticRenderFns:[]}},9:function(t,e,i){var n,a;i(7),n=i(6);var o=i(8);a=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(a=n=n.default),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,t.exports=n},11:function(t,e,i){var n,a;i(14);var o=i(16);a=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(a=n=n.default),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,t.exports=n},12:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{title:String,titleColor:String,labelWidth:String,labelAlign:String,labelMarginRight:String,gutter:String}}},13:function(t,e){},14:function(t,e){},15:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[t.title?i("div",{staticClass:"weui-cells__title",style:{color:t.titleColor},domProps:{innerHTML:t._s(t.title)}}):t._e(),t._v(" "),i("div",{staticClass:"weui-cells",class:{"vux-no-group-title":!t.title},style:{marginTop:t.gutter}},[t._t("after-title"),t._v(" "),t._t("default")],2)])},staticRenderFns:[]}},16:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("span",{staticClass:"vux-label-desc"},[t._t("default")],2)},staticRenderFns:[]}},17:function(t,e,i){var n,a;i(13),n=i(12);var o=i(15);a=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(a=n=n.default),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,t.exports=n},25:function(t,e){},42:function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var a=i(69),o=n(a);e.default={mixins:[o.default],props:{value:Boolean,time:{type:Number,default:2e3},type:{type:String,default:"success"},transition:String,width:{type:String,default:"7.6em"},isShowMask:{type:Boolean,default:!1},text:String,position:String},data:function(){return{show:!1}},created:function(){this.value&&(this.show=!0)},computed:{currentTransition:function(){return this.transition?this.transition:"top"===this.position?"vux-slide-from-top":"bottom"===this.position?"vux-slide-from-bottom":"vux-fade"},toastClass:function(){return{"weui-toast_forbidden":"warn"===this.type,"weui-toast_cancel":"cancel"===this.type,"weui-toast_success":"success"===this.type,"weui-toast_text":"text"===this.type,"vux-toast-top":"top"===this.position,"vux-toast-bottom":"bottom"===this.position,"vux-toast-middle":"middle"===this.position}},style:function(){if("text"===this.type&&"auto"===this.width)return{padding:"10px"}}},watch:{show:function(t){var e=this;t&&(this.$emit("input",!0),this.$emit("on-show"),this.fixSafariOverflowScrolling("auto"),clearTimeout(this.timeout),this.timeout=setTimeout(function(){e.show=!1,e.$emit("input",!1),e.$emit("on-hide"),e.fixSafariOverflowScrolling("touch")},this.time))},value:function(t){this.show=t}}}},45:function(t,e){},47:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"vux-toast"},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowMask&&t.show,expression:"isShowMask && show"}],staticClass:"weui-mask_transparent"}),t._v(" "),i("transition",{attrs:{name:t.currentTransition}},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"weui-toast",class:t.toastClass,style:{width:t.width}},[i("i",{directives:[{name:"show",rawName:"v-show",value:"text"!==t.type,expression:"type !== 'text'"}],staticClass:"weui-icon-success-no-circle weui-icon_toast"}),t._v(" "),t.text?i("p",{staticClass:"weui-toast__content",style:t.style,domProps:{innerHTML:t._s(t.text)}}):i("p",{staticClass:"weui-toast__content"},[t._t("default")],2)])])],1)},staticRenderFns:[]}},56:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{type:String,isMsg:Boolean},computed:{className:function(){return"weui-icon weui_icon_"+this.type+" weui-icon-"+this.type.replace(/_/g,"-")}}}},58:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{type:{default:"default"},disabled:Boolean,mini:Boolean,plain:Boolean,text:String,actionType:String,showLoading:Boolean},computed:{classes:function(){return[{"weui-btn_disabled":this.disabled,"weui-btn_mini":this.mini},"weui-btn_"+this.type,this.plain?"weui-btn_plain-"+this.type:"",this.showLoading?"weui-btn_loading":""]}}}},59:function(t,e){},60:function(t,e){},62:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("i",{class:[t.className,t.isMsg?"weui-icon_msg":""]})},staticRenderFns:[]}},63:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("button",{staticClass:"weui-btn",class:t.classes,attrs:{disabled:t.disabled,type:t.actionType}},[t.showLoading?i("i",{staticClass:"weui-loading"}):t._e(),t._t("default",[t._v(t._s(t.text))])],2)},staticRenderFns:[]}},65:function(t,e,i){var n,a;i(59),n=i(56);var o=i(62);a=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(a=n=n.default),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,t.exports=n},67:function(t,e,i){var n,a;i(45),n=i(42);var o=i(47);a=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(a=n=n.default),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,t.exports=n},68:function(t,e,i){var n,a;i(60),n=i(58);var o=i(63);a=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(a=n=n.default),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,t.exports=n},91:function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var a=i(94),o=n(a),r=i(118),s=n(r),l=i(65),u=n(l),c=i(11),d=n(c),h=i(172),p=n(h),f=i(173),m=n(f),v=i(139),g=n(v),w={email:{fn:p.default,msg:"邮箱格式"},"china-mobile":{fn:function(t){return(0,m.default)(t,"zh-CN")},msg:"手机号码"},"china-name":{fn:function(t){return t.length>=2&&t.length<=6},msg:"中文姓名"}};e.default={created:function(){var t=this;this.currentValue=this.value||"",this.title||this.placeholder||this.currentValue||console.warn("no title and no placeholder?"),this.required&&!this.currentValue&&(this.valid=!1),this.handleChangeEvent=!0,this.debounce&&(this._debounce=(0,g.default)(function(){t.$emit("on-change",t.currentValue)},this.debounce))},mounted:function(){this.$slots&&this.$slots["restricted-label"]&&(this.hasRestrictedLabel=!0)},beforeDestroy:function(){this._debounce&&this._debounce.cancel()},mixins:[s.default],components:{Icon:u.default,InlineDesc:d.default},props:{title:{type:String,default:""},type:{type:String,default:"text"},placeholder:String,value:[String,Number],name:String,readonly:Boolean,disabled:Boolean,keyboard:String,inlineDesc:String,isType:[String,Function],min:Number,max:Number,showClear:{type:Boolean,default:!0},equalWith:String,textAlign:String,autocomplete:{type:String,default:"off"},autocapitalize:{type:String,default:"off"},autocorrect:{type:String,default:"off"},spellcheck:{type:String,default:"false"},novalidate:{type:Boolean,default:!1},iconType:String,debounce:Number,placeholderAlign:String,labelWidth:String},computed:{labelStyles:function(){return{width:this.labelWidthComputed||this.$parent.labelWidth||this.labelWidthComputed,textAlign:this.$parent.labelAlign,marginRight:this.$parent.labelMarginRight}},pattern:function(){if("number"===this.keyboard||"china-mobile"===this.isType)return"[0-9]*"},labelWidthComputed:function(){var t=this.title.replace(/[^x00-xff]/g,"00").length/2+1;if(t<10)return t+"em"},hasErrors:function(){return(0,o.default)(this.errors).length>0},inputStyle:function(){if(this.textAlign)return{textAlign:this.textAlign}}},methods:{reset:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";this.dirty=!1,this.currentValue=t,this.firstError="",this.valid=!0},clear:function(){this.currentValue="",this.focus()},focus:function(){this.$refs.input.focus()},focusHandler:function(){this.$emit("on-focus",this.currentValue)},blur:function(){this.setTouched(),this.validate(),this.$emit("on-blur",this.currentValue)},getError:function(){var t=(0,o.default)(this.errors)[0];this.firstError=this.errors[t]},validate:function(){if("undefined"!=typeof this.equalWith)return void this.validateEqual();if(this.errors={},!this.currentValue&&!this.required)return void(this.valid=!0);if(!this.currentValue&&this.required)return this.valid=!1,this.errors.required="必填哦",void this.getError();if("string"==typeof this.isType){var t=w[this.isType];if(t){if(this.valid=t.fn(this.currentValue),!this.valid)return void(this.errors.format=t.msg+"格式不对哦~");delete this.errors.format}}if("function"==typeof this.isType){var e=this.isType(this.currentValue);if(this.valid=e.valid,!this.valid)return this.errors.format=e.msg,this.forceShowError=!0,void(this.firstError||this.getError());delete this.errors.format}if(this.min){if(this.currentValue.length<this.min)return this.errors.min="最少应该输入"+this.min+"个字符哦",this.valid=!1,void(this.firstError||this.getError());delete this.errors.min}if(this.max){if(this.currentValue.length>this.max)return this.errors.max="最多可以输入"+this.max+"个字符哦",this.valid=!1,void(this.forceShowError=!0);this.forceShowError=!1,delete this.errors.max}this.valid=!0},validateEqual:function(){if(!this.equalWith&&this.currentValue)return this.valid=!1,void(this.errors.equal="输入不一致");var t=this.dirty||this.currentValue.length>=this.equalWith.length;return t&&this.currentValue!==this.equalWith?(this.valid=!1,void(this.errors.equal="输入不一致")):void(!this.currentValue&&this.required?this.valid=!1:(this.valid=!0,delete this.errors.equal))}},data:function t(){var t={hasRestrictedLabel:!1,firstError:"",forceShowError:!1,hasLengthEqual:!1,valid:!0,currentValue:""};return t},watch:{valid:function(){this.getError()},value:function(t){this.currentValue=t},equalWith:function(t){t&&this.equalWith?(t.length===this.equalWith.length&&(this.hasLengthEqual=!0),this.validateEqual()):this.validate()},currentValue:function(t){!this.equalWith&&t&&this.validateEqual(),t&&this.equalWith?(t.length===this.equalWith.length&&(this.hasLengthEqual=!0),this.validateEqual()):this.validate(),this.$emit("input",t),this._debounce?this._debounce():this.$emit("on-change",t)}}}},100:function(t,e){},110:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"vux-x-input weui-cell",class:{"weui-cell_warn":!t.novalidate&&!t.valid}},[i("div",{staticClass:"weui-cell__hd"},[t.hasRestrictedLabel?i("div",{style:t.labelStyles},[t._t("restricted-label")],2):t._e(),t._v(" "),t._t("label",[t.title?i("label",{staticClass:"weui-label",style:{width:t.labelWidth||t.$parent.labelWidth||t.labelWidthComputed,textAlign:t.$parent.labelAlign,marginRight:t.$parent.labelMarginRight},domProps:{innerHTML:t._s(t.title)}}):t._e(),t._v(" "),t.inlineDesc?i("inline-desc",[t._v(t._s(t.inlineDesc))]):t._e()])],2),t._v(" "),i("div",{staticClass:"weui-cell__bd weui-cell__primary",class:t.placeholderAlign?"vux-x-input-placeholder-"+t.placeholderAlign:""},[t.type&&"text"!==t.type?t._e():i("input",{directives:[{name:"model",rawName:"v-model",value:t.currentValue,expression:"currentValue"}],ref:"input",staticClass:"weui-input",style:t.inputStyle,attrs:{maxlength:t.max,autocomplete:t.autocomplete,autocapitalize:t.autocapitalize,autocorrect:t.autocorrect,spellcheck:t.spellcheck,type:"text",name:t.name,pattern:t.pattern,placeholder:t.placeholder,readonly:t.readonly,disabled:t.disabled},domProps:{value:t.currentValue},on:{focus:t.focusHandler,blur:t.blur,input:function(e){e.target.composing||(t.currentValue=e.target.value)}}}),t._v(" "),"number"===t.type?i("input",{directives:[{name:"model",rawName:"v-model",value:t.currentValue,expression:"currentValue"}],ref:"input",staticClass:"weui-input",style:t.inputStyle,attrs:{maxlength:t.max,autocomplete:t.autocomplete,autocapitalize:t.autocapitalize,autocorrect:t.autocorrect,spellcheck:t.spellcheck,type:"number",name:t.name,pattern:t.pattern,placeholder:t.placeholder,readonly:t.readonly,disabled:t.disabled},domProps:{value:t.currentValue},on:{focus:t.focusHandler,blur:[t.blur,function(e){t.$forceUpdate()}],input:function(e){e.target.composing||(t.currentValue=e.target.value)}}}):t._e(),t._v(" "),"email"===t.type?i("input",{directives:[{name:"model",rawName:"v-model",value:t.currentValue,expression:"currentValue"}],ref:"input",staticClass:"weui-input",style:t.inputStyle,attrs:{maxlength:t.max,autocomplete:t.autocomplete,autocapitalize:t.autocapitalize,autocorrect:t.autocorrect,spellcheck:t.spellcheck,type:"email",name:t.name,pattern:t.pattern,placeholder:t.placeholder,readonly:t.readonly,disabled:t.disabled},domProps:{value:t.currentValue},on:{focus:t.focusHandler,blur:t.blur,input:function(e){e.target.composing||(t.currentValue=e.target.value)}}}):t._e(),t._v(" "),"password"===t.type?i("input",{directives:[{name:"model",rawName:"v-model",value:t.currentValue,expression:"currentValue"}],ref:"input",staticClass:"weui-input",style:t.inputStyle,attrs:{maxlength:t.max,autocomplete:t.autocomplete,autocapitalize:t.autocapitalize,autocorrect:t.autocorrect,spellcheck:t.spellcheck,type:"password",name:t.name,pattern:t.pattern,placeholder:t.placeholder,readonly:t.readonly,disabled:t.disabled},domProps:{value:t.currentValue},on:{focus:t.focusHandler,blur:t.blur,input:function(e){e.target.composing||(t.currentValue=e.target.value)}}}):t._e(),t._v(" "),"tel"===t.type?i("input",{directives:[{name:"model",rawName:"v-model",value:t.currentValue,expression:"currentValue"}],ref:"input",staticClass:"weui-input",style:t.inputStyle,attrs:{maxlength:t.max,autocomplete:t.autocomplete,autocapitalize:t.autocapitalize,autocorrect:t.autocorrect,spellcheck:t.spellcheck,type:"tel",name:t.name,pattern:t.pattern,placeholder:t.placeholder,readonly:t.readonly,disabled:t.disabled},domProps:{value:t.currentValue},on:{focus:t.focusHandler,blur:t.blur,input:function(e){e.target.composing||(t.currentValue=e.target.value)}}}):t._e()]),t._v(" "),i("div",{staticClass:"weui-cell__ft"},[i("icon",{directives:[{name:"show",rawName:"v-show",value:!t.equalWith&&t.showClear&&t.currentValue&&!t.readonly&&!t.disabled,expression:"!equalWith && showClear && currentValue && !readonly && !disabled"}],attrs:{type:"clear"},nativeOn:{click:function(e){t.clear(e)}}}),t._v(" "),i("icon",{directives:[{name:"show",rawName:"v-show",value:!t.novalidate&&!t.equalWith&&(t.touched&&!t.valid&&t.firstError||t.forceShowError&&!t.valid&&t.firstError),expression:"!novalidate && !equalWith && ((touched && !valid && firstError) || (forceShowError && !valid && firstError))"}],staticClass:"vux-input-icon",attrs:{type:"warn",title:t.valid?"":t.firstError}}),t._v(" "),!t.novalidate&&t.hasLengthEqual&&t.dirty&&t.equalWith&&!t.valid?i("icon",{staticClass:"vux-input-icon",attrs:{type:"warn"}}):t._e(),t._v(" "),i("icon",{directives:[{name:"show",rawName:"v-show",value:!t.novalidate&&t.equalWith&&t.equalWith===t.currentValue&&t.valid,expression:"!novalidate && equalWith && equalWith === currentValue && valid"}],attrs:{type:"success"}}),t._v(" "),i("icon",{directives:[{name:"show",rawName:"v-show",value:t.novalidate&&"success"===t.iconType,expression:"novalidate && iconType === 'success'"}],staticClass:"vux-input-icon",attrs:{type:"success"}}),t._v(" "),i("icon",{directives:[{name:"show",rawName:"v-show",value:t.novalidate&&"error"===t.iconType,expression:"novalidate && iconType === 'error'"}],staticClass:"vux-input-icon",attrs:{type:"warn"}}),t._v(" "),t._t("right")],2)])},staticRenderFns:[]}},111:function(t,e,i){var n,a;i(100),n=i(91);var o=i(110);a=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(a=n=n.default),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,t.exports=n},244:function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),i(3),i(4);var a=i(2),o=n(a),r=i(5),s=i(17),l=n(s),u=i(9),c=n(u),d=i(38),h=n(d),p=i(39),f=n(p),m=i(68),v=n(m),g=i(111),w=n(g),y=i(70),b=n(y),x=i(1),_=n(x);_.default.use(b.default),e.default={name:"address",data:function(){return{id:0,showContent:!0,loadingshow:!1,loadtext:"加载中...",codevalue:""}},components:{Group:l.default,Loading:c.default,XButton:v.default,XInput:w.default},created:function(){(0,r.isWeiXin)()&&getAuth(h.default,f.default)},methods:{code:function(){var t=this;this.loadingshow=!0,o.default.httpPost(_.default,HOST+"/api/codes/exchange.json",{code:this.codevalue},function(e){t.loadingshow=!1,0==e.status?t.$vux.toast.show({text:e.message,position:"bottom",time:3e3,width:"10em",type:"text"}):t.$vux.toast.show({text:e.error,position:"bottom",time:3e3,width:"10em",type:"text"})},function(t){console.log(t)})},coderule:function(){window.location.href="/m/code-rule.html"}}}},359:function(t,e){},373:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEUAAABFCAYAAAAcjSspAAAD5klEQVR4nO2a3W3rMAyF7wgZwSNkg3qEu0G8QbtBs0GzQb1Bu0GyQbOBs0GywXcfpKABTSXUj+0bQAcw2ofwkCIpiZL4509FRUVFRUVFRcUIwEvoW9q2WQA0wAb4BAZsGPzvN0Cz9BiKwQ/oy+iER/gCNkuPKRneGdaMiMXwVM4BWuDHOLgjcPDf9ub/o1H+B2iXHvNdAB8PBnEA3oC1kW/tf394wPsx9diiAawIZ8cFlwVNpo7G81zuZM2q0JDy4KM5BAzdlTbUB2AX0DdgzMLJ4B1yVow7Tm2c162tPefFHOMjpmVIP1caexv6QMbMP5XQ15A+gWeNq2I3/m90lAOO+YnlyQL6nO4j5FfAeyDTrpF+j4l2wDG7pAHGAleH5DikQ1+HNJyBLoJbc0ybMMw4MJ42R2tEcTVHCt6M/CvgJGSnnUa4KEtYCzFNFlzdca1ovwnXIZ1RzzpVNgmM1wDTnPURlFPmQiADvAOlc87YM1KueUPMOM1QIn3JMPLCgwzzEZeO6Y36VopsZ5GNAi61b7GNkJUGWtcIGYhzhM6tkP22yloVNIzRGGXlHL9E6pYLZzu1zVbDZMQOEbJyCzfLenk59boIWXm6NstayOX+b0p/Lyu34W2kbjkNzPKK7j5G9yPyQZCbS3HGadxG6pYB2UbIyqlbbhcSxCTIr33E2wTZpDXlRj7L9hBp1ppQWDdEnn4ZXy+0Uxh2yCa16W0YF3x9Ao9cbNsSxkmnlN3vwzoHJUuaBK5ZnLLNJg3ragi/EZl3PMEpd6+2hKGzZArhAyNkbKVzZcohm3Ss455DkjLkhvv5nIJ+ggZXnzQF+OX9T5lLbWltEdJfbun0hyfoSP5pbGdcQJU0Wi6EfUFuWdGeSnFnnX0M3MlnGwP3pGcfuRDuC3LLaP4tyL0X3F0p7snvJnDryq6k0VPbfFWSfPO2BJRpWb6+UqaQ+SJ5bqBv891UyuQuVOQFzg/ipZSTGd/WnUrwhpRplWf29nzj7OxLIOZ+9/FK5f1EVrOMMog2g0trHjqm8sUo1i5+PgvytRlcn4ptyXyxyrWugxzHXN+Fop4/BIfmkHm6Dm6M0LqIkhyDqyk6EuuIgEOmnzaKIdoLP97AOTuZVIfMZYNmlPbeC26xm6PnTeumKnrKzjFOyxhwfbVTdEeG+nUnb0A0wxsa6pI+41q1mkwdjecJdUEtN2XugXB/6xV74NUaTVwWvjI+7UrMu8vEAld3xPTW7/33fvN/TG9/u/SYzcBtsaG1Jhcnpi7dp4R3jrx2SMX3UztDgt8CrceeQSf/++TC7umAW3/Ub2nbKioqKioqKir+R/wDzu5zFiqvXMAAAAAASUVORK5CYII="},419:function(t,e,i){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"address"}},[t.showContent?n("div",{staticClass:"content"},[n("group",{staticClass:"header"},[n("x-input",{attrs:{title:"",placeholder:"请输入兑换码"},model:{value:t.codevalue,callback:function(e){t.codevalue=e},expression:"codevalue"}})],1),t._v(" "),n("div",{staticStyle:{padding:"20px 15px"}},[n("x-button",{staticClass:"primary",attrs:{type:"primary"},nativeOn:{click:function(e){t.code(e)}}},[t._v("兑换")])],1),t._v(" "),n("p",{staticClass:"coderule",on:{click:t.coderule}},[n("img",{attrs:{src:i(373),alt:""}}),t._v("兑换规则")])],1):t._e(),t._v(" "),n("Loading",{attrs:{text:t.loadtext},model:{value:t.loadingshow,callback:function(e){t.loadingshow=e},expression:"loadingshow"}})],1)},staticRenderFns:[]}},441:function(t,e,i){var n,a;i(359),n=i(244);var o=i(419);a=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(a=n=n.default),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,t.exports=n}});