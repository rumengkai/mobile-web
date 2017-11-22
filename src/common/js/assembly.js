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

