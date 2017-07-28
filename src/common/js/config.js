//rem 布局
(function initSize() {
	var _w = document.documentElement.clientWidth||document.body.clientWidth;
	_w=_w>640?640:_w;
	var _size=_w/750*100;
	document.documentElement.style.fontSize=_size+"px";
	console.log(_w);
	if (_w<350) {
		window.phonetype="small";
	}else{
		window.phonetype="large";
	}
})();

// 全局变量，配置
//版本
window.VERSION="0.1"
// window.HOST="http://dev.kofuf.com"// 测试地址
window.HOST="http://api.kofuf.com"// 线上地址











//移动端300ms,解决方案
const FastClick = require('fastclick')
FastClick.attach(document.body)



//微信授权地址
window.getAuthLink=function (params){
	//type:item_(id),channel_(id)
	return "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx05e842991e5fa0b2&redirect_uri="+"http://api.kofuf.com"+"%2Fapi%2Fsession%2Fauth_weixin&response_type=code&scope=snsapi_userinfo&state="+params+"#wechat_redirect"
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
			console.log(id);
			if (!(id==undefined)) {
				params=type+"_"+id;
			}else{
				params=type;
			}
			window.location.href=getAuthLink(params);
			//http://local.kofuf.com:8000/m/channels.html
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
