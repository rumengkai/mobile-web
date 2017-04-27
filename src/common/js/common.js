(function initSize() {
	var _w = document.documentElement.clientWidth||document.body.clientWidth;
	_w=_w>640?640:_w;
	var _size=_w/750*100;
	document.documentElement.style.fontSize=_size+"px";
})()
// 测试地址
window.HOST="http://123.57.35.40:8000"
// 线上地址
//  window.HOST="http://api.kofuf.com:8000"
