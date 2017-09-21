export function isWeiXin(){
	var ua = window.navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i) == 'micromessenger'){
		return true;
	}else{
		return false;
	}
}

export function getClient(){
	var l,t,w,h;
	l  =  document.documentElement.scrollLeft || document.body.scrollLeft;
	t  =  document.documentElement.scrollTop || document.body.scrollTop;
	w =   document.documentElement.clientWidth;
	h =   document.documentElement.clientHeight;
	return {'left':l,'top':t,'width':w,'height':h} ;
}

export function getBody(){
	var h,t;
	h  = document.body.clientHeight;
	t  =  document.body.scrollTop;
	return {'top':t,'height':h} ;
}
 //
export function weixinShare(Vue,data){
	var url=HOST+"/api/session/share_weixin_config?url="+encodeURIComponent(window.location.href.split('#')[0]);
	Vue.http.get(url)
	.then((res)=>{return res.bodyText;})
	.then((data)=>{
		var data=JSON.parse(data);
		wx.config({
			debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，
			//参数信息会通过log打出，仅在pc端时才会打印。
			appId: data.appId, // 必填，公众号的唯一标识
			timestamp: data.timestamp, // 必填，生成签名的时间戳
			nonceStr: data.nonceStr, // 必填，生成签名的随机串
			signature: data.signature,// 必填，签名，见附录1
			jsApiList: [
				'checkJsApi',
				'onMenuShareTimeline',
				'onMenuShareAppMessage',
				'onMenuShareQQ',
				'onMenuShareWeibo'
			] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		});
	},(err)=>{
		error(err)
	});
	wx.ready(function(){
    // 分享到到朋友圈
    var title=shareData.title;
    var link=shareData.link;
    var imgUrl=shareData.imgUrl;
    var desc=shareData.desc;
    wx.onMenuShareTimeline({
      title: title, // 分享标题
      link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl:imgUrl , // 分享图标
      success: function () {
        // alert("分享成功")
          // 用户确认分享后执行的回调函数
      },
      cancel: function () {
        // alert("取消分享")
          // 用户取消分享后执行的回调函数
      }
    });
    // 分享到给微信好友
    wx.onMenuShareAppMessage({
      title: title, // 分享标题
      desc:desc, // 分享描述
      link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: imgUrl, // 分享图标
      type: 'link', // 分享类型,music、video或link，不填默认为link
      // dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: function () {
        // alert("分享成功")
          // 用户确认分享后执行的回调函数
      },
      cancel: function () {
        // alert("取消分享")
          // 用户取消分享后执行的回调函数
      }
    });
    //分享到QQ空间
    wx.onMenuShareQZone({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: link, // 分享链接
      imgUrl: imgUrl, // 分享图标
      success: function () {
        // 用户确认分享后执行的回调函数
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
      }
    });

    //分享到QQ
    wx.onMenuShareQQ({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: link, // 分享链接
      imgUrl: imgUrl, // 分享图标
      success: function () {
         // 用户确认分享后执行的回调函数
      },
      cancel: function () {
         // 用户取消分享后执行的回调函数
      }
    });
	});
}
