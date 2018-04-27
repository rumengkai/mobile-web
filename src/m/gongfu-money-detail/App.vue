<template>
	<div id="gongfu-money-detail">
		<div v-if="showContent" class="content">
			<ul class="detail-ul vux-1px-t vux-1px-b" v-if="dataInfo.items.length>0">
				<li class="detail-li" v-bind:class="[{'vux-1px-t':idx!=0}]" v-for="(item,idx) in dataInfo.items" :key="idx">
					<p class="title">{{item.title}}</p>
					<p class="time">{{item.time}}</p>
					<span class="money">{{item.money}}</span>
				</li>
			</ul>
			<div class="items-none" v-else>
				<img src="https://static1.kofuf.com/1520929698988.png" alt="">
				<p>暂无消费记录</p>
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
		shareData
	} from 'src/common/js/assembly';
	import geturlpara from 'common/js/geturlpara.js';
	import Failed from "components/Failed/Failed"
	import Vue from 'vue'
	import {
		getShareMoneyLogs
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
		name: 'gongfu-money-detail',
		data() {
			return {
				id: '',
				loadingshow: true,
				loadtext: 'loading...',
				showContent: false,
				failedshow: false,
				failedmsg: "服务请求失败，请刷新重试",
				dataInfo: {},
				dataInfos: {
					items:[{
						money:'1.0',
						title:'提现',
						time:'2018',
					},{
						money:'1.0',
						title:'提现',
						time:'2018',
					},{
						money:'1.0',
						title:'提现',
						time:'2018',
					}]
				}
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
				getShareMoneyLogs({}).then(res => {
					try {
						if (res.status == 0) {
							this.dataInfo = res
							this.showContent = true
						}
					} catch (error) {}
					this.loadingshow = false
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
