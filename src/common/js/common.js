(function initSize() {
	var _w = document.documentElement.clientWidth||document.body.clientWidth;
	_w=_w>640?640:_w;
	var _size=_w/750*100;
	document.documentElement.style.fontSize=_size+"px";
})()
