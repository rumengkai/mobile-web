webpackJsonp([35,0],{0:function(t,e,o){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}var i=o(1),a=n(i),d=o(500),c=n(d),s=o(10),r=n(s);a.default.use(r.default),new a.default({el:"#app-download",template:"<App/>",components:{App:c.default}})},3:function(t,e){},4:function(t,e,o){"use strict";!function(){var t=document.documentElement.clientWidth||document.body.clientWidth;t=t>640?640:t;var e=t/750*100;e=e<50?e:50,document.documentElement.style.fontSize=e+"px",t<350?window.phonetype="small":window.phonetype="large"}(),window.base="dev","pro"==base?(window.VERSION="0.1",window.HOST="https://api.kofuf.com",window.HOSTM="https://m.kofuf.com",window.HOSTA="https://api.kofuf.com",window.appid="wx05e842991e5fa0b2",window.config=function(){return{paytype:"JSAPI",from:"3",gid:localStorage.getItem("gid"),token:localStorage.getItem("token")}}):(window.VERSION="0.1",window.HOST="http://dev.kofuf.com",window.HOSTM="http://dev.kofuf.com",window.HOSTA="http://dev.kofuf.com",window.appid="wx0a542ef9d4d41cef",window.config=function(){return{paytype:"JSAPI",from:"3",gid:"1047501566",token:"f32cd7de15144e2b931214730e6ed9f4"}}),window.shareData={title:"功夫财经",link:HOSTM+"/m/home.html",imgUrl:"http://m.kofuf.com/static/img_h5/h5_logo.png",desc:"功夫财经致力于联动最出色的财经学者，提供最优质的原创内容，打造中国规模最大的、粘性最高的财富命运共同体，以新型金融服务平台为终极己任，解决中产焦虑，提升国民财商。 "};var n=o(30);n.attach(document.body),window.getAuthLink=function(t){return"https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri="+HOSTA+"%2Fapi%2Fsession%2Fauth_weixin&response_type=code&scope=snsapi_userinfo&state="+t+"#wechat_redirect"},window.getAuth=function(t,e,o,n){var i=t.get("gid"),a=e.parse();if(!localStorage.getItem("gid")||""==localStorage.getItem("gid"))if("undefined"!=typeof a.gid)localStorage.setItem("gid",a.gid),localStorage.setItem("token",a.token);else if("undefined"!=typeof i)localStorage.setItem("gid",t.get("gid")),localStorage.setItem("token",t.get("token"));else{var d;d=void 0!=n&&""!=n?o+"_"+n:o,d=d?d:"",window.location.href=getAuthLink(d)}},window.clearcookie=function(t){localStorage.clear(),t.set("gid",0,{domain:".kofuf.com",path:"/",expires:-1}),t.set("token",0,{domain:".kofuf.com",path:"/",expires:-1})}},31:function(t,e){},264:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),o(3),o(4),e.default={name:"app-download",data:function(){return{}},components:{},created:function(){},methods:{BrowserType:function(){window.location.href="https://ah88dj.mlinks.cc/AK8k"}}}},369:function(t,e){},410:function(t,e,o){t.exports=o.p+"m/static/img/logo.0e82203.png"},444:function(t,e,o){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"app-download"}},[t._m(0),t._v(" "),o("button",{staticClass:"load",on:{click:t.BrowserType}},[t._v("打开APP阅读")])])},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"content"},[n("img",{staticClass:"logo",attrs:{src:o(410)}}),t._v(" "),n("div",{staticClass:"one"},[t._v("\n      中国财经新媒体第一平台，以最具人格化的财经大咖和最具表现力的财经小V，构筑最具公信力和活跃度的财经社群。帮助中国的中产阶层，实现全球资产的优化配置。\n    ")]),t._v(" "),n("div",{staticClass:"two"},[t._v("\n      平台集结了时寒冰、王福重、马光远、李大霄、琢磨先生、黄生、闫肖峰、胡润等各路财经大侠，以视频、音频、图文、公开课、线下社交、海外游学等方式提供最具价值的财经知识产品，和您共同缔造财富的光荣与梦想。\n    ")])])}]}},500:function(t,e,o){var n,i;o(369),n=o(264);var a=o(444);i=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(i=n=n.default),"function"==typeof i&&(i=i.options),i.render=a.render,i.staticRenderFns=a.staticRenderFns,t.exports=n}});