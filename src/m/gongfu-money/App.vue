<template>
	<div id="gongfu-money">
		<div v-if="showContent" class="content">
			<div class="my-money-total">
				<p>我的余额</p>
				<p class="money"><span>¥</span> {{dataInfo.total}}</p>
			</div>
			<group class="group g1">
        <cell title="明细" is-link @click.native="toSkip('gongfu-money-detail.html')"></cell>
      </group>
			<group class="group g1">
        <cell title="可提现余额">{{dataInfo.take}}</cell>
        <cell title="待结算金额">{{dataInfo.wait}}</cell>
      </group>
			<group class="group g1">
        <cell title="如何赚钱" is-link @click.native="howMoney"></cell>
      </group>
			<div class="get-money-btn">
				<div class="btn" @click="getMoney">提现</div>
				<p class="tip">{{dataInfo.tip}}</p>
			</div>
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
		shareData,message , toast
	} from 'src/common/js/assembly';
	import geturlpara from 'common/js/geturlpara.js';
	import Failed from "components/Failed/Failed"
	import Vue from 'vue'
	import {
		getShareMoneyMy,
		getShareMoneyTake
	} from 'src/api/share_money'
	import {
		Group,
		Cell,
		Loading,
		AlertPlugin,
		querystring,
		cookie
	} from 'vux'
	Vue.use(AlertPlugin)
	Vue.prototype.$geturlpara = geturlpara
	
	export default {
		name: 'gongfu-money',
		data() {
			return {
				id: '',
				loadingshow: true,
				loadtext: 'loading...',
				showContent: false,
				failedshow: false,
				failedmsg: "服务请求失败，请刷新重试",
				dataInfo: {}
			}
		},
		components: {
			Loading,
			Group,
			Cell,
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
			fetchData() {
				getShareMoneyMy({}).then(res => {
					try {
						if (res.status == 0) {
							this.dataInfo = res
							this.showContent = true
							/* 是否需要微信授权 */
							if (res.need_auth) {
								getAuth(cookie, querystring);
							}
						}
					} catch (error) {}
					this.loadingshow = false
				})
			},
			getMoney(){
				getShareMoneyTake({}).then(res=>{
					try {
						if (res.status==0) {
							toast('提现成功')
						}
					} catch (error) {
					}
				})
			},
			howMoney(){
				window.location.href = this.dataInfo.make_money_url;				
			},
			toSkip(uri) {
				window.location.href = "/m/" + uri;
			},
			toChannel(id) {
				window.location.href = "/m/channel.html?id=" + id;
			}
		}
	}
</script>

<style lang="less">
	@import '~vux/src/styles/1px.less';
	@import "../index/App.less";
	@import './App.less';
</style>
