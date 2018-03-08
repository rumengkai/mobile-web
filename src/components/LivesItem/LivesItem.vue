<template>
	<!-- 直播列表 -->
	<div id="lives-item">
		<li v-for="(item,index) in datalist" @click="toLive(item.id)" :key="index">
			<div class="header-title" v-bind:class="[{'vux-1px-t':index!=0}]">
				<img class="head-img" :src="item.teacher.photo" alt="">
				<p>{{item.teacher.name}}</p>
				<div @click.stop="share(item)" class="share-btn"><img src="https://static2.kofuf.com/1519470348737.jpeg" alt=""></div>
			</div>
			<div class="img">
				<img :src="item.thumb" alt="" onerror="this.src='http://static1.kofuf.com/1493739178223.jpg?imageView2/1/w/200/h/133/q/100|imageslim'">
				<div class="tip">{{item.state==1?"报名中":item.state==3?"预热中":item.state==4?"直播中":item.state==4?"完成":"回看"}}</div>
			</div>
			<div class="title">
				{{item.name}}
			</div>
			<span class="date">{{item.time | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
			<span class="view"><img src="./images/read.png" alt="">{{item.user_count}}人{{item.state==1?"已报名":item.state==3?"已预约":item.state==4?"正在看":"看过"}}</span>
		</li>
		<div class="mengceng" v-show="showMengceng" @click="closeMengceng">
			<img src="https://static1.kofuf.com/1517825659248.png" alt="">
		</div>
	</div>
</template>

<script>
	import {
		isWeiXin,
		weixinShare
	} from 'common/js/common.js';
	import {
		shareData
	} from 'src/common/js/assembly';
	export default {
		name: 'lives-item',
		data() {
			return {
				showMengceng: false
			}
		},
		props: {
			datalist: Array
		},
		components: {
	
		},
		created() {},
		methods: {
			share(data) {
				if (isWeiXin()) {
					shareData(data.name, data.share_url, data.thumb, data.share_info)
					weixinShare();
				}
				this.showMengceng = true
			},
			closeMengceng() {
				this.showMengceng = false
			},
			toLive(id) {
				location.href = "/m/live.html?id=" + id;
			}
		}
	}
</script>

<style lang="less">
	@import '~vux/src/styles/1px.less';
	#lives-item {
		background-color: #f3f3f3;
		li {
			height: 5.4rem;
			width: auto;
			background-color: #fff;
			// box-shadow: 0 2px 2px #eee;
			padding: 0 15px .4rem;
			.header-title {
				height: 50px;
				width: 100%;
				display: flex;
				position: relative;
				.head-img {
					margin: 10px 10px 5px 0;
					width: 30px;
					height: 30px;
					border-radius: 30px;
					display: block;
				}
				p {
					line-height: 50px;
					font-size: 15px;
				}
				.share-btn {
					position: absolute;
					right: 0;
					top: 13px;
					img {
						width: 57px;
						height: 23px;
					}
				}
			}
			.title {
				font-size: 16px;
				font-weight: 500;
				color: #404040;
				line-height: .4rem;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.img {
				padding: 0 0 15px;
				height: 3.3rem;
				position: relative;
				.hint {
					position: absolute;
					width: 44px;
					height: 23px;
					background-color: #02a4ec;
					color: #fff;
					right: 0;
					top: 37px;
					line-height: 23px;
					z-index: 100;
					box-shadow: 0 1px 2px #333;
				}
				img {
					display: block;
					border-radius: 2px;
					width: 100%;
					height: 100%;
				}
				.tip {
					border-radius: 3px;
					background: #DE574F;
					height: 18px;
					padding: 2px 5px;
					color: #fff;
					position: absolute;
					top: 8px;
					left: 8px;
					font-size: 12px;
				}
			}
			.date {
				float: left;
				line-height: .76rem;
				color: #999;
				font-weight: 400;
			}
			.view {
				float: right;
				line-height: .76rem;
				color: #999;
				font-weight: 400;
				overflow: hidden;
				img {
					vertical-align: middle;
					margin-right: 10px;
					margin-top: -.08rem;
					width: 20px;
				}
			}
		}
		.mengceng {
			background: #000;
			opacity: 0.8;
			position: fixed;
			top: -50px;
			z-index: 999;
			width: 100%;
			height: auto;
			bottom: 0;
			img {
				display: block;
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
