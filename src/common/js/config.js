//rem 布局
(function initSize() {
	var _w = document.documentElement.clientWidth||document.body.clientWidth;
	_w=_w>640?640:_w;
	var _size=_w/750*100;
	_size=_size<50?_size:50;
	document.documentElement.style.fontSize=_size+"px";
	if (_w<350) {
		window.phonetype="small";
	}else{
		window.phonetype="large";
	}
})();





window.base="pro"
// 全局变量，配置
if (base=="pro") {
	window.VERSION="0.1"
	window.HOST="https://api.kofuf.com"// 线上地址
	window.HOSTM="https://m.kofuf.com"// 线上地址，分享时用
	window.HOSTA="https://api.kofuf.com"// 授权使用
	window.appid="wx05e842991e5fa0b2"
	window.config=function () {
		return {
			paytype:"JSAPI",
			from:"3",
			gid:localStorage.getItem("gid"),
			token:localStorage.getItem("token"),
		}
	}
}else{
	window.VERSION="0.1"
	window.HOST="http://dev.kofuf.com"// 	测试地址
	window.HOSTM="http://dev.kofuf.com"// 分享时用
	window.HOSTA="http://dev.kofuf.com"// 授权使用
	window.appid="wx0a542ef9d4d41cef"
	window.config=function () {
		return {
			paytype:"JSAPI",
			from:"3",
			gid:"1047501566",//localStorage.getItem("gid"),
			token:"f32cd7de15144e2b931214730e6ed9f4",//localStorage.getItem("token"),
		}
	}
}

window.shareData={
	title:'功夫财经',
	link:HOSTM+'/m/home.html',
	imgUrl:'http://m.kofuf.com/static/img_h5/h5_logo.png',
	desc:"功夫财经致力于联动最出色的财经学者，提供最优质的原创内容，打造中国规模最大的、粘性最高的财富命运共同体，以新型金融服务平台为终极己任，解决中产焦虑，提升国民财商。 "
}










//移动端300ms,解决方案
const FastClick = require('fastclick')
FastClick.attach(document.body)



//微信授权地址
window.getAuthLink=function (params){
	//type:item_(id),channel_(id)
	return "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri="+HOSTA+"%2Fapi%2Fsession%2Fauth_weixin&response_type=code&scope=snsapi_userinfo&state="+params+"#wechat_redirect"
}
//微信登陆授权
window.getAuth=function (cookie,querystring,type,id){
	//获取cookie
	var cookie_git=cookie.get('gid');
	//获取URLparse
	var parse=querystring.parse();
	if(!localStorage.getItem("gid")||localStorage.getItem("gid")==""){
		if (typeof parse.gid!="undefined") {
			localStorage.setItem("gid",parse.gid);
			localStorage.setItem("token",parse.token);
		}else if(typeof cookie_git!="undefined"){
			localStorage.setItem("gid",cookie.get('gid'));
			localStorage.setItem("token",cookie.get('token'));
		}else {
			var params;
			if (!(id==undefined)&&id!='') {
				params=type+"_"+id;
			}else{
				params=type;
			}
			params=params?params:"";
			// return
			window.location.href=getAuthLink(params);
		}
	}
}

window.clearcookie=function (cookie) {
	localStorage.clear();
	cookie.set('gid', 0,{
		domain: '.kofuf.com',
		path: '/',
		expires: -1
	});
	cookie.set('token', 0,{
		domain: '.kofuf.com',
		path: '/',
		expires: -1
	});
}
