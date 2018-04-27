<template>
	<div id="live-item">
		<div @click="toLive(liveItem.id)" class="live-item">
			<div class="left">
				<img class="thumb" :src="liveItem.thumb" alt="">
				<div class="tip">{{liveItem.state==1?"报名中":liveItem.state==3?"预热中":liveItem.state==4?"直播中":liveItem.state==4?"完成":"回看"}}</div>
			</div>
			<div class="right">
				<p class="name ell">{{liveItem.name}}</p>
				<p class="teacher">{{liveItem.teacher.name}}</p>
				<p class="time-number"><span>{{liveItem.time | parseTime('{m}/{d} {h}:{i}')}}</span><span class="number">{{liveItem.user_count}}人{{liveItem.state==1?"已报名":liveItem.state==3?"已预约":liveItem.state==4?"正在看":"看过"}}</span></p>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	export default {
		name: 'live-item',
		props: {
			liveItem: {
				type: Object,
				default: {name:''}
			}
		},
		data() {
			return {}
		},
		components: {},
		mounted() {
			console.log(this.liveItem);
		},
		methods: {
			toLive(id) {
				window.location.href = "/m/live.html?id=" + id;
			}
		}
	}
</script>

<style lang="less">
	@import '~vux/src/styles/1px.less';
	.live-item {
		background: #fff;
		padding: 11px 4% 11px;
		height: auto;
		display: flex;
		flex-direction: row;
		.left{
			position: relative;
			.thumb{
				border-radius: 3px;
				display: block;
				width: 120px;
				height: 67px;
			}
			.tip{
				border-radius:3px; 
				background: #DE574F;
				height: 18px;
				padding: 2px 5px;
				color: #fff;
				position: absolute;
				bottom: 5px;
				left: 5px;
				font-size: 12px;
			}
		}
		.right{
			padding: 0 0 0 20px;
			width: 4rem;
			.name{
				font-size: 16px;
				line-height: 20px;
			}
			.teacher{
				font-size: 13px;
				color: #666;
				line-height: 30px;
			}
			.time-number{
				font-size: 12px;
				color: #666;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				.number{
					color: #999;
				}
			}
		}
	}
</style>
