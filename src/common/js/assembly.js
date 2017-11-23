import { AlertPlugin, ToastPlugin } from 'vux'
import Vue from 'vue'

Vue.use(AlertPlugin)
Vue.use(ToastPlugin)

export function message(content, title = '提示', callback) {
	Vue.$vux.alert.show({
		title: title,
		content: content,
		dialogTransition: "",
		maskTransition: "",
		onHide() {
			typeof callback == "function" && callback()
		}
	});
}
export function toast(content, time = 3000, position = 'bottom') {
	Vue.$vux.toast.show({
		text: content,
		time: time,
		width: 'auto',
		type: "text",
		position: position
	})
}
export function stringBr(str) {
	return str.replace(/\n/g, "<br/>")
}
export function shareData(name='功夫财经',href='http://m.51xy8.com/m/home.html',share_thumb='http://m.51xy8.com/static/img_h5/h5_logo.png',brief='国民财商提升者') {
	console.log(window);
	window.shareData={
		title:name,
		link:href,
		imgUrl:share_thumb,
		desc:brief
	}
	return
}
