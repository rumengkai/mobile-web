webpackJsonp([16,0],{0:function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}var a=i(1),o=n(a),r=i(456),s=n(r),l=i(10),u=n(l);o.default.use(u.default),new o.default({el:"#code-active",template:"<App/>",components:{App:s.default}})},2:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={ajaxPost:function(t,e,i,n){$.ajax({url:t,type:"POST",data:e,success:function(t){i(t)},error:function(t){n(t)}})},ajaxGet:function(){},httpPost:function(t,e,i,n,a){t.http.options.emulateJSON=!0,t.http.options.headers={"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},t.http.interceptors.push(function(t,e){t.headers.set("from",config().from),t.headers.set("gid",config().gid),t.headers.set("token",config().token),t.headers.set("version",VERSION),e()}),t.http.post(e,i).then(function(t){return t.bodyText}).then(function(t){var t=JSON.parse(t);n(t)},function(t){a(t)})},httpGet:function(t,e,i,n,a){t.http.options.emulateJSON=!0,t.http.options.headers={"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},t.http.interceptors.push(function(t,e){t.headers.set("from",config().from),t.headers.set("gid",config().gid),t.headers.set("token",config().token),t.headers.set("version",VERSION),e()}),t.http.get(e,{params:i}).then(function(t){return t.bodyText}).then(function(t){var t=JSON.parse(t);n(t)},function(t){a(t)})}}},3:function(t,e){},4:function(t,e,i){"use strict";!function(){var t=document.documentElement.clientWidth||document.body.clientWidth;t=t>640?640:t;var e=t/750*100;e=e<50?e:50,document.documentElement.style.fontSize=e+"px",t<350?window.phonetype="small":window.phonetype="large"}(),window.base="pro","pro"==base?(window.VERSION="0.1",window.HOST="http://api.kofuf.com",window.HOSTM="http://m.kofuf.com",window.HOSTA="http://api.kofuf.com",window.appid="wx05e842991e5fa0b2",window.config=function(){return{paytype:"JSAPI",from:"3",gid:localStorage.getItem("gid"),token:localStorage.getItem("token")}}):(window.VERSION="0.1",window.HOST="http://123.57.35.40",window.HOSTM="http://123.57.35.40",window.HOSTA="http://dev.kofuf.com",window.appid="wx0a542ef9d4d41cef",window.config=function(){return{paytype:"JSAPI",from:"3",gid:localStorage.getItem("gid"),token:localStorage.getItem("token")}}),window.shareData={title:"功夫财经",link:HOSTM+"/m/home.html",imgUrl:"http://m.kofuf.com/static/img_h5/h5_logo.png",desc:"功夫财经致力于联动最出色的财经学者，提供最优质的原创内容，打造中国规模最大的、粘性最高的财富命运共同体，以新型金融服务平台为终极己任，解决中产焦虑，提升国民财商。 "};var n=i(31);n.attach(document.body),window.getAuthLink=function(t){return"https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri="+HOSTA+"%2Fapi%2Fsession%2Fauth_weixin&response_type=code&scope=snsapi_userinfo&state="+t+"#wechat_redirect"},window.getAuth=function(t,e,i,n){var a=t.get("gid"),o=e.parse();if(!localStorage.getItem("gid")||""==localStorage.getItem("gid"))if("undefined"!=typeof o.gid)localStorage.setItem("gid",o.gid),localStorage.setItem("token",o.token);else if("undefined"!=typeof a)localStorage.setItem("gid",t.get("gid")),localStorage.setItem("token",t.get("token"));else{var r;r=void 0!=n?i+"_"+n:i,r=r?r:"",window.location.href=getAuthLink(r)}},window.clearcookie=function(t){localStorage.clear(),t.set("gid",0,{domain:".kofuf.com",path:"/",expires:-1}),t.set("token",0,{domain:".kofuf.com",path:"/",expires:-1})}},5:function(t,e){"use strict";function i(){var t=window.navigator.userAgent.toLowerCase();return"micromessenger"==t.match(/MicroMessenger/i)}function n(){var t,e,i,n;return t=document.documentElement.scrollLeft||document.body.scrollLeft,e=document.documentElement.scrollTop||document.body.scrollTop,i=document.documentElement.clientWidth,n=document.documentElement.clientHeight,{left:t,top:e,width:i,height:n}}function a(){var t,e;return t=document.body.clientHeight,e=document.body.scrollTop,{top:e,height:t}}function o(t,e){var i=HOSTA+"/api/session/share_weixin_config?url="+encodeURIComponent(window.location.href.split("#")[0]);t.http.get(i).then(function(t){return t.bodyText}).then(function(t){var t=JSON.parse(t);wx.config({debug:!1,appId:t.appId,timestamp:t.timestamp,nonceStr:t.nonceStr,signature:t.signature,jsApiList:["checkJsApi","onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo"]})},function(t){error(t)}),wx.ready(function(){var t=shareData.title,e=shareData.link,i=shareData.imgUrl,n=shareData.desc;wx.onMenuShareTimeline({title:t,link:e,imgUrl:i,success:function(){},cancel:function(){}}),wx.onMenuShareAppMessage({title:t,desc:n,link:e,imgUrl:i,type:"link",success:function(){},cancel:function(){}}),wx.onMenuShareQZone({title:t,desc:n,link:e,imgUrl:i,success:function(){},cancel:function(){}}),wx.onMenuShareQQ({title:t,desc:n,link:e,imgUrl:i,success:function(){},cancel:function(){}})})}Object.defineProperty(e,"__esModule",{value:!0}),e.isWeiXin=i,e.getClient=n,e.getBody=a,e.weixinShare=o},6:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{value:{type:Boolean,default:!1},text:String,position:String},created:function(){this.show=this.value},data:function(){return{show:!1}},watch:{value:function(t){this.show=t},show:function(t){this.$emit("input",t)}}}},7:function(t,e){},8:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("transition",{attrs:{name:"vux-mask"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"weui-loading_toast"},[i("div",{staticClass:"weui-mask_transparent"}),t._v(" "),i("div",{staticClass:"weui-toast",style:{position:t.position}},[i("i",{staticClass:"weui-loading weui-icon_toast"}),t._v(" "),i("p",{staticClass:"weui-toast__content"},[t._v(t._s(t.text||"加载中")),t._t("default")],2)])])])},staticRenderFns:[]}},9:function(t,e,i){var n,a;i(7),n=i(6);var o=i(8);a=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(a=n=n.default),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,t.exports=n},11:function(t,e,i){var n,a;i(14);var o=i(16);a=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(a=n=n.default),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,t.exports=n},12:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{title:String,titleColor:String,labelWidth:String,labelAlign:String,labelMarginRight:String,gutter:String}}},13:function(t,e){},14:function(t,e){},15:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[t.title?i("div",{staticClass:"weui-cells__title",style:{color:t.titleColor},domProps:{innerHTML:t._s(t.title)}}):t._e(),t._v(" "),i("div",{staticClass:"weui-cells",class:{"vux-no-group-title":!t.title},style:{marginTop:t.gutter}},[t._t("after-title"),t._v(" "),t._t("default")],2)])},staticRenderFns:[]}},16:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("span",{staticClass:"vux-label-desc"},[t._t("default")],2)},staticRenderFns:[]}},17:function(t,e,i){var n,a;i(13),n=i(12);var o=i(15);a=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(a=n=n.default),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,t.exports=n},32:function(t,e){},43:function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var a=i(65),o=n(a);e.default={mixins:[o.default],props:{value:Boolean,time:{type:Number,default:2e3},type:{type:String,default:"success"},transition:String,width:{type:String,default:"7.6em"},isShowMask:{type:Boolean,default:!1},text:String,position:String},data:function(){return{show:!1}},created:function(){this.value&&(this.show=!0)},computed:{currentTransition:function(){return this.transition?this.transition:"top"===this.position?"vux-slide-from-top":"bottom"===this.position?"vux-slide-from-bottom":"vux-fade"},toastClass:function(){return{"weui-toast_forbidden":"warn"===this.type,"weui-toast_cancel":"cancel"===this.type,"weui-toast_success":"success"===this.type,"weui-toast_text":"text"===this.type,"vux-toast-top":"top"===this.position,"vux-toast-bottom":"bottom"===this.position,"vux-toast-middle":"middle"===this.position}},style:function(){if("text"===this.type&&"auto"===this.width)return{padding:"10px"}}},watch:{show:function(t){var e=this;t&&(this.$emit("input",!0),this.$emit("on-show"),this.fixSafariOverflowScrolling("auto"),clearTimeout(this.timeout),this.timeout=setTimeout(function(){e.show=!1,e.$emit("input",!1),e.$emit("on-hide"),e.fixSafariOverflowScrolling("touch")},this.time))},value:function(t){this.show=t}}}},45:function(t,e){},47:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"vux-toast"},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowMask&&t.show,expression:"isShowMask && show"}],staticClass:"weui-mask_transparent"}),t._v(" "),i("transition",{attrs:{name:t.currentTransition}},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"weui-toast",class:t.toastClass,style:{width:t.width}},[i("i",{directives:[{name:"show",rawName:"v-show",value:"text"!==t.type,expression:"type !== 'text'"}],staticClass:"weui-icon-success-no-circle weui-icon_toast"}),t._v(" "),t.text?i("p",{staticClass:"weui-toast__content",style:t.style,domProps:{innerHTML:t._s(t.text)}}):i("p",{staticClass:"weui-toast__content"},[t._t("default")],2)])])],1)},staticRenderFns:[]}},57:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{type:{default:"default"},disabled:Boolean,mini:Boolean,plain:Boolean,text:String,actionType:String,showLoading:Boolean},computed:{classes:function(){return[{"weui-btn_disabled":this.disabled,"weui-btn_mini":this.mini},"weui-btn_"+this.type,this.plain?"weui-btn_plain-"+this.type:"",this.showLoading?"weui-btn_loading":""]}}}},58:function(t,e){},60:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("button",{staticClass:"weui-btn",class:t.classes,attrs:{disabled:t.disabled,type:t.actionType}},[t.showLoading?i("i",{staticClass:"weui-loading"}):t._e(),t._t("default",[t._v(t._s(t.text))])],2)},staticRenderFns:[]}},63:function(t,e,i){var n,a;i(45),n=i(43);var o=i(47);a=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(a=n=n.default),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,t.exports=n},64:function(t,e,i){var n,a;i(58),n=i(57);var o=i(60);a=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(a=n=n.default),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,t.exports=n},69:function(t,e,i){var n,a;i(78),n=i(70);var o=i(81);a=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(a=n=n.default),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,t.exports=n},70:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{type:String,isMsg:Boolean},computed:{className:function(){return"weui-icon weui_icon_"+this.type+" weui-icon-"+this.type.replace(/_/g,"-")}}}},78:function(t,e){},81:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("i",{class:[t.className,t.isMsg?"weui-icon_msg":""]})},staticRenderFns:[]}},124:function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var a=i(114),o=n(a),r=i(136),s=n(r),l=i(69),u=n(l),c=i(11),d=n(c),h=i(219),p=n(h),f=i(220),m=n(f),v=i(205),g=n(v),w={email:{fn:p.default,msg:"邮箱格式"},"china-mobile":{fn:function(t){return(0,m.default)(t,"zh-CN")},msg:"手机号码"},"china-name":{fn:function(t){return t.length>=2&&t.length<=6},msg:"中文姓名"}};e.default={created:function(){var t=this;this.currentValue=this.value||"",this.title||this.placeholder||this.currentValue||console.warn("no title and no placeholder?"),this.required&&!this.currentValue&&(this.valid=!1),this.handleChangeEvent=!0,this.debounce&&(this._debounce=(0,g.default)(function(){t.$emit("on-change",t.currentValue)},this.debounce))},mounted:function(){this.$slots&&this.$slots["restricted-label"]&&(this.hasRestrictedLabel=!0)},beforeDestroy:function(){this._debounce&&this._debounce.cancel()},mixins:[s.default],components:{Icon:u.default,InlineDesc:d.default},props:{title:{type:String,default:""},type:{type:String,default:"text"},placeholder:String,value:[String,Number],name:String,readonly:Boolean,disabled:Boolean,keyboard:String,inlineDesc:String,isType:[String,Function],min:Number,max:Number,showClear:{type:Boolean,default:!0},equalWith:String,textAlign:String,autocomplete:{type:String,default:"off"},autocapitalize:{type:String,default:"off"},autocorrect:{type:String,default:"off"},spellcheck:{type:String,default:"false"},novalidate:{type:Boolean,default:!1},iconType:String,debounce:Number,placeholderAlign:String,labelWidth:String},computed:{labelStyles:function(){return{width:this.labelWidthComputed||this.$parent.labelWidth||this.labelWidthComputed,textAlign:this.$parent.labelAlign,marginRight:this.$parent.labelMarginRight}},pattern:function(){if("number"===this.keyboard||"china-mobile"===this.isType)return"[0-9]*"},labelWidthComputed:function(){var t=this.title.replace(/[^x00-xff]/g,"00").length/2+1;if(t<10)return t+"em"},hasErrors:function(){return(0,o.default)(this.errors).length>0},inputStyle:function(){if(this.textAlign)return{textAlign:this.textAlign}}},methods:{reset:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";this.dirty=!1,this.currentValue=t,this.firstError="",this.valid=!0},clear:function(){this.currentValue="",this.focus()},focus:function(){this.$refs.input.focus()},focusHandler:function(){this.$emit("on-focus",this.currentValue)},blur:function(){this.setTouched(),this.validate(),this.$emit("on-blur",this.currentValue)},getError:function(){var t=(0,o.default)(this.errors)[0];this.firstError=this.errors[t]},validate:function(){if("undefined"!=typeof this.equalWith)return void this.validateEqual();if(this.errors={},!this.currentValue&&!this.required)return void(this.valid=!0);if(!this.currentValue&&this.required)return this.valid=!1,this.errors.required="必填哦",void this.getError();if("string"==typeof this.isType){var t=w[this.isType];if(t){if(this.valid=t.fn(this.currentValue),!this.valid)return void(this.errors.format=t.msg+"格式不对哦~");delete this.errors.format}}if("function"==typeof this.isType){var e=this.isType(this.currentValue);if(this.valid=e.valid,!this.valid)return this.errors.format=e.msg,this.forceShowError=!0,void(this.firstError||this.getError());delete this.errors.format}if(this.min){if(this.currentValue.length<this.min)return this.errors.min="最少应该输入"+this.min+"个字符哦",this.valid=!1,void(this.firstError||this.getError());delete this.errors.min}if(this.max){if(this.currentValue.length>this.max)return this.errors.max="最多可以输入"+this.max+"个字符哦",this.valid=!1,void(this.forceShowError=!0);this.forceShowError=!1,delete this.errors.max}this.valid=!0},validateEqual:function(){if(!this.equalWith&&this.currentValue)return this.valid=!1,void(this.errors.equal="输入不一致");var t=this.dirty||this.currentValue.length>=this.equalWith.length;return t&&this.currentValue!==this.equalWith?(this.valid=!1,void(this.errors.equal="输入不一致")):void(!this.currentValue&&this.required?this.valid=!1:(this.valid=!0,delete this.errors.equal))}},data:function t(){var t={hasRestrictedLabel:!1,firstError:"",forceShowError:!1,hasLengthEqual:!1,valid:!0,currentValue:""};return t},watch:{valid:function(){this.getError()},value:function(t){this.currentValue=t},equalWith:function(t){t&&this.equalWith?(t.length===this.equalWith.length&&(this.hasLengthEqual=!0),this.validateEqual()):this.validate()},currentValue:function(t){!this.equalWith&&t&&this.validateEqual(),t&&this.equalWith?(t.length===this.equalWith.length&&(this.hasLengthEqual=!0),this.validateEqual()):this.validate(),this.$emit("input",t),this._debounce?this._debounce():this.$emit("on-change",t)}}}},162:function(t,e){},182:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"vux-x-input weui-cell",class:{"weui-cell_warn":!t.novalidate&&!t.valid}},[i("div",{staticClass:"weui-cell__hd"},[t.hasRestrictedLabel?i("div",{style:t.labelStyles},[t._t("restricted-label")],2):t._e(),t._v(" "),t._t("label",[t.title?i("label",{staticClass:"weui-label",style:{width:t.labelWidth||t.$parent.labelWidth||t.labelWidthComputed,textAlign:t.$parent.labelAlign,marginRight:t.$parent.labelMarginRight},domProps:{innerHTML:t._s(t.title)}}):t._e(),t._v(" "),t.inlineDesc?i("inline-desc",[t._v(t._s(t.inlineDesc))]):t._e()])],2),t._v(" "),i("div",{staticClass:"weui-cell__bd weui-cell__primary",class:t.placeholderAlign?"vux-x-input-placeholder-"+t.placeholderAlign:""},[t.type&&"text"!==t.type?t._e():i("input",{directives:[{name:"model",rawName:"v-model",value:t.currentValue,expression:"currentValue"}],ref:"input",staticClass:"weui-input",style:t.inputStyle,attrs:{maxlength:t.max,autocomplete:t.autocomplete,autocapitalize:t.autocapitalize,autocorrect:t.autocorrect,spellcheck:t.spellcheck,type:"text",name:t.name,pattern:t.pattern,placeholder:t.placeholder,readonly:t.readonly,disabled:t.disabled},domProps:{value:t.currentValue},on:{focus:t.focusHandler,blur:t.blur,input:function(e){e.target.composing||(t.currentValue=e.target.value)}}}),t._v(" "),"number"===t.type?i("input",{directives:[{name:"model",rawName:"v-model",value:t.currentValue,expression:"currentValue"}],ref:"input",staticClass:"weui-input",style:t.inputStyle,attrs:{maxlength:t.max,autocomplete:t.autocomplete,autocapitalize:t.autocapitalize,autocorrect:t.autocorrect,spellcheck:t.spellcheck,type:"number",name:t.name,pattern:t.pattern,placeholder:t.placeholder,readonly:t.readonly,disabled:t.disabled},domProps:{value:t.currentValue},on:{focus:t.focusHandler,blur:[t.blur,function(e){t.$forceUpdate()}],input:function(e){e.target.composing||(t.currentValue=e.target.value)}}}):t._e(),t._v(" "),"email"===t.type?i("input",{directives:[{name:"model",rawName:"v-model",value:t.currentValue,expression:"currentValue"}],ref:"input",staticClass:"weui-input",style:t.inputStyle,attrs:{maxlength:t.max,autocomplete:t.autocomplete,autocapitalize:t.autocapitalize,autocorrect:t.autocorrect,spellcheck:t.spellcheck,type:"email",name:t.name,pattern:t.pattern,placeholder:t.placeholder,readonly:t.readonly,disabled:t.disabled},domProps:{value:t.currentValue},on:{focus:t.focusHandler,blur:t.blur,input:function(e){e.target.composing||(t.currentValue=e.target.value)}}}):t._e(),t._v(" "),"password"===t.type?i("input",{directives:[{name:"model",rawName:"v-model",value:t.currentValue,expression:"currentValue"}],ref:"input",staticClass:"weui-input",style:t.inputStyle,attrs:{maxlength:t.max,autocomplete:t.autocomplete,autocapitalize:t.autocapitalize,autocorrect:t.autocorrect,spellcheck:t.spellcheck,type:"password",name:t.name,pattern:t.pattern,placeholder:t.placeholder,readonly:t.readonly,disabled:t.disabled},domProps:{value:t.currentValue},on:{focus:t.focusHandler,blur:t.blur,input:function(e){e.target.composing||(t.currentValue=e.target.value)}}}):t._e(),t._v(" "),"tel"===t.type?i("input",{directives:[{name:"model",rawName:"v-model",value:t.currentValue,expression:"currentValue"}],ref:"input",staticClass:"weui-input",style:t.inputStyle,attrs:{maxlength:t.max,autocomplete:t.autocomplete,autocapitalize:t.autocapitalize,autocorrect:t.autocorrect,spellcheck:t.spellcheck,type:"tel",name:t.name,pattern:t.pattern,placeholder:t.placeholder,readonly:t.readonly,disabled:t.disabled},domProps:{value:t.currentValue},on:{focus:t.focusHandler,blur:t.blur,input:function(e){e.target.composing||(t.currentValue=e.target.value)}}}):t._e()]),t._v(" "),i("div",{staticClass:"weui-cell__ft"},[i("icon",{directives:[{name:"show",rawName:"v-show",value:!t.equalWith&&t.showClear&&t.currentValue&&!t.readonly&&!t.disabled,expression:"!equalWith && showClear && currentValue && !readonly && !disabled"}],attrs:{type:"clear"},nativeOn:{click:function(e){t.clear(e)}}}),t._v(" "),i("icon",{directives:[{name:"show",rawName:"v-show",value:!t.novalidate&&!t.equalWith&&(t.touched&&!t.valid&&t.firstError||t.forceShowError&&!t.valid&&t.firstError),expression:"!novalidate && !equalWith && ((touched && !valid && firstError) || (forceShowError && !valid && firstError))"}],staticClass:"vux-input-icon",attrs:{type:"warn",title:t.valid?"":t.firstError}}),t._v(" "),!t.novalidate&&t.hasLengthEqual&&t.dirty&&t.equalWith&&!t.valid?i("icon",{staticClass:"vux-input-icon",attrs:{type:"warn"}}):t._e(),t._v(" "),i("icon",{directives:[{name:"show",rawName:"v-show",value:!t.novalidate&&t.equalWith&&t.equalWith===t.currentValue&&t.valid,expression:"!novalidate && equalWith && equalWith === currentValue && valid"}],attrs:{type:"success"}}),t._v(" "),i("icon",{directives:[{name:"show",rawName:"v-show",value:t.novalidate&&"success"===t.iconType,expression:"novalidate && iconType === 'success'"}],staticClass:"vux-input-icon",attrs:{type:"success"}}),t._v(" "),i("icon",{directives:[{name:"show",rawName:"v-show",value:t.novalidate&&"error"===t.iconType,expression:"novalidate && iconType === 'error'"}],staticClass:"vux-input-icon",attrs:{type:"warn"}}),t._v(" "),t._t("right")],2)])},staticRenderFns:[]}},186:function(t,e,i){var n,a;i(162),n=i(124);var o=i(182);a=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(a=n=n.default),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,t.exports=n},251:function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),i(3),i(4);var a=i(2),o=n(a),r=i(5),s=i(17),l=n(s),u=i(9),c=n(u),d=i(38),h=n(d),p=i(39),f=n(p),m=i(64),v=n(m),g=i(186),w=n(g),y=i(66),_=n(y),b=i(1),x=n(b);x.default.use(_.default),e.default={name:"code-active",data:function(){return{id:0,showContent:!0,loadingshow:!1,loadtext:"加载中...",codevalue:""}},components:{Group:l.default,Loading:c.default,XButton:v.default,XInput:w.default},created:function(){(0,r.isWeiXin)()&&getAuth(h.default,f.default)},methods:{code:function(){var t=this;this.loadingshow=!0,o.default.httpPost(x.default,HOST+"/api/codes/exchange.json",{code:this.codevalue},function(e){t.loadingshow=!1,0==e.status?(t.$vux.toast.show({text:e.message,position:"bottom",time:3e3,width:"10em",type:"text"}),setTimeout(function(){window.location.href="/m/my.html"},2e3)):t.$vux.toast.show({text:e.error,position:"bottom",time:3e3,width:"10em",type:"text"})},function(t){console.log(t)})},coderule:function(){window.location.href="/m/code-rule.html"}}}},340:function(t,e){},387:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAYAAABXuSs3AAACCklEQVRoge2Y0Y3CMAyGOwIjdAQ2oBvABtcN7vMEdAQ2aDe4bgAbwAbHBu0GvYfmIRcBiZu06E61ZAlBYn917PQXWbbaaqv9bxORPXAEvoAzcDV+Nt8dRWT/bs4sy7IMKIAa6IAh0Duzp3gHcG6Sh8I+8xrIF4EWkc8EwK6Xs0InqvLT6s8FffUk7oHTo94FtkAF3D0xrqmhfZVugU1grNMilWe0V4maB3u2IvLBkyswIGYZC50HtMfGWr9hvLfddd/A1ol98cTOY8AbT3Cc9a/moLPhTd+rTjIUuvAE/lWVgOMfgNbJ4RvWYgq4r9p3Z73v6AdgUO5ppoD7XuMdozY5isguBHoCeKeFPoSCKP2iLM4AHDTg1Uzg9nCGFqfSgLczQJdOjnPgvvYJ5kPwoEEL9N49bnSa56IB9+kSDbT74tFAD2j0C3BLBB4LPQA3DXiKVqkSQKtbpU3QIraGOUXEUg1n7HXYWrF8Qk11cj7wQ6pkQBkZK/wFZBL2icBjTq9XQZuEPpH1ymsR2RkNU0fEaaaAh8jaub1Qgyeoeqzrq22BT70RGsberiIePp8MbuCJOeKJLVdGQVvJtVWLAW+SQFsAtwXAw3WJEn7OYW1mgbbgp/S8z/FnTgOfJ6p+w1J/MzsPUJjkvQK2N3uKxYEfGaMwqxgl8cUM8818bs1vOsG02mqr/T37AYtyYr4yewLhAAAAAElFTkSuQmCC"},399:function(t,e,i){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"code-active"}},[t.showContent?n("div",{staticClass:"content"},[n("group",{staticClass:"header"},[n("x-input",{attrs:{title:"",placeholder:"请输入兑换码"},model:{value:t.codevalue,callback:function(e){t.codevalue=e},expression:"codevalue"}})],1),t._v(" "),n("div",{staticStyle:{padding:"20px 15px"}},[n("x-button",{staticClass:"primary",attrs:{type:"primary"},nativeOn:{click:function(e){t.code(e)}}},[t._v("兑换")])],1),t._v(" "),n("p",{staticClass:"coderule",on:{click:t.coderule}},[n("img",{attrs:{src:i(387),alt:""}}),t._v("兑换规则")])],1):t._e(),t._v(" "),n("Loading",{attrs:{text:t.loadtext},model:{value:t.loadingshow,callback:function(e){t.loadingshow=e},expression:"loadingshow"}})],1)},staticRenderFns:[]}},456:function(t,e,i){var n,a;i(340),n=i(251);var o=i(399);a=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(a=n=n.default),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,t.exports=n}});