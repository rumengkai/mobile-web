<template>
	<div class="share-money-btn">
		<div v-if="hasShare" @click="shareFun" class="primary btn">分享赚 <span> ¥</span>{{moneyVal}}</div>
		<div v-if="hasGift" @click="giftFun" class="bg-btn-red btn">{{number}} 赠品</div>
	</div>
</template>

<script>
	import {
		XButton
	} from 'vux'
	
	export default {
		name: 'share-money-btn',
		components: {
			XButton
		},
		props: {
			id: {
				type: String,
				default: ""
			},
			type: {
				type: String,
				default: ""
			},
			moneyVal: {
				type: Number,
				default: ""
			},
			number: {
				type: String,
				default: ""
			},
			hasShare: {
				type: Boolean,
				default: true
			},
			hasGift: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				msg: 'Welcome to Your Vue.js App'
			}
		},
		methods: {
			shareFun() {
				console.log('分享赚');
				window.location.href = '/m/share-money.html?id=' + this.id + '&type=' + this.type
			},
			giftFun() {
				console.log('赠品');
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.share-money-btn {
		display: flex;
		margin: 6px 10px 0;
		.btn {
			flex-grow: 1;
			width: 3.2rem;
			margin: 10px;
			height: 40px;
			border-radius: 5px;
			line-height: 40px;
			text-align: center;
			font-size: 15px;
			color: #fff;
		}
	}
</style>
