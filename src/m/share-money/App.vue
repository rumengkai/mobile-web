<template>
	<div id="share-money">
		<div v-if="showContent" class="content">
			<p class="p-title">分享给好友赚<span></span>{{imgInfo.money}}</p>
			<p>好友通过你分享的图片购买后，你获得<span>{{imgInfo.money}}（可提现）</span>余额在<span @click="toSkip('gongfu-money.html')" class="to-gongfu-money">功夫赚</span>中查看</p>
			<div class="share-img-warp">
				<img class="share-img" :src="imgInfo.image" alt="">
			</div>
			<div class="share-btn">长按图片保存，分享给好友</div>
		</div>
		<Failed v-if="failedshow" :msg="failedmsg"></Failed>
		<Loading v-model="loadingshow" :text="loadtext"></Loading>
	</div>
</template>

<script>
	import 'common/css/reset.css';
	import 'common/js/config.js';
	import {
		isWeiXin,
		weixinShare
	} from 'common/js/common.js';
	import {
		shareData
	} from 'src/common/js/assembly';
	import geturlpara from 'common/js/geturlpara.js';
	import Failed from "components/Failed/Failed"
	import Vue from 'vue'
	import {
		getBooksList
	} from 'src/api/books';
	import {
		getChannelInfo
	} from 'src/api/channel';
	import {
		getShareMoneyImage
	} from 'src/api/share_money'
	import {
		Loading,
		XHeader,
		Icon,
		Scroller,
		AlertPlugin,
		querystring,
		cookie
	} from 'vux'
	Vue.use(AlertPlugin)
	Vue.prototype.$geturlpara = geturlpara
	
	export default {
		name: 'share-money',
		data() {
			return {
				id: this.$geturlpara.getUrlKey("id"),
				type: querystring.parse().type,
				loadingshow: true,
				loadtext: 'loading...',
				showContent: false,
				failedshow: false,
				failedmsg: "服务请求失败，请刷新重试",
				dataInfo: {},
				imgInfo: {}
			}
		},
		components: {
			Icon,
			Loading
		},
		beforeCreate() {
			//授权
			if (isWeiXin()) {
				getAuth(cookie, querystring);
			}
		},
		created() {
			this.fetchData();
		},
		methods: {
			//获取首页数据
			fetchData() {
				if (this.type == 1) {
					getChannelInfo({
						id: this.id
					}).then(res => {
						try {
							if (res.status == 0) {
								this.dataInfo = res
								shareData(res.name, res.share_url, res.thumb, res.share)
								weixinShare();
							}
						} catch (error) {
	
						}
						this.loadingshow = false
					})
				} else if (this.type == 7) {
					getBooksList({
						id: this.id
					}).then(res => {
						try {
							if (res.status == 0) {
								this.dataInfo = res
								shareData(res.name, res.share_url, res.share_thumb, res.share)
								weixinShare();
							}
						} catch (error) {
	
						}
					})
				}
				getShareMoneyImage({
					item_id: this.id,
					item_type: this.type
				}).then(res => {
					try {
						if (res.status == 0) {
							this.imgInfo = res
							this.showContent = true
							var _self = this
							setTimeout(()=>{
								_self.loadingshow = false
							},1000)
							console.log(res);
						}
					} catch (error) {
	
					}
				})
			},
			toSkip(uri) {
				window.location.href = "/m/" + uri;
			},
			toChannel(id) {
				window.location.href = "/m/channel.html?id=" + id;
			},
			loadList(data) {
				this.dataInfo.items = this.dataInfo.items.concat(data);
			}
		}
	}
</script>

<style lang="less">
	@import '~vux/src/styles/1px.less';
	@import "../index/App.less";
	@import './App.less';
</style>
