<template>
	<div id="live-video">
		<div class="video-head">
			<div class="teacher">
				<img class="img-photo" :src="data.teacher.photo" alt="">
				<span class="name ell">{{data.teacher.name}}</span>
			</div>
			<div class="member-list" >
				<li>
					<div class="wrap" id="member-list" v-for="(item,index) in data.users" :key="index">
						<img :src="item.avatar" alt="">
					</div>
				</li>
			</div>
		</div>
		<div v-if="data.state==4&&!data.need_pay">
			<video id="example-video" width=960 height=340 class="video-js vjs-default-skin" controls>
				<source :src="live_url" type="application/x-mpegURL">
			</video>
		</div>
		<div v-else-if="data.state==3&&data.announce_url!=''&&!data.need_pay">
			<div class="prism-player" id="J_prismPlayer_announce" style=""></div>
			<video class="cover" :src="data.announce_url"></video>
		</div>
		<div v-else>
			<img class="cover" :src="data.cover" alt="">
			<div class="cover-bottom" v-if="data.advance_state!=0&&data.start_left_time!=0"><span v-if="data.start_left_time!=0">距开播还有：{{data.start_left_time | remainingTime('{d}天{h}时{i}分{s}秒')}}</span><span @click="advance" class="advance-btn" v-bind:class="data.advance_state==1?'advance':'advancesd'" v-if="data.advance_state!=0">{{data.advance_state==1?"预约收看":"已预约"}}</span></div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import videojs from'video.js'
	import videojsHLS from 'videojs-contrib-hls'
	import {
		advanceLive
	} from 'src/api/live'
	import {
		toast
	} from 'src/common/js/assembly'
	
	export default {
		name: 'live-video',
		props: {
			data: {
				type: Object,
				default: {}
			}
		},
		data() {
			return {
				live_url:this.data.live_url
			}
		},
		components: {},
		mounted() {
			var cli = setInterval(() => {
				if (this.data.start_left_time <= 0) {
					clearInterval(cli)
				} else {
					this.data.start_left_time -= 1
				}
			}, 1000)
			if (this.data.state == 4 && !this.data.need_pay) {
				var player = videojs('example-video');
				player.ready(function () {
					player.src({
						src: this.data.live_url,
						type: 'application/x-mpegURL'
					});
				})
				player.play();
			}
			if (this.data.state == 3 && this.data.announce_url != '') {
				/* 预热 */
			}
		},
		methods: {
			toLive(id) {
				window.location.href = "/m/live.html?id=" + this.id;
			},
			advance() {
				if (this.data.advance_state == 1) {
					if (!this.data.has_mobile) {
						window.location.href = "/m/bind-phone.html";
						return
					}
					advanceLive({
						live_id: this.id
					}).then(res => {
						try {
							if (res.status == 0) {
								this.data.advance_state = 2
								toast('预约成功')
							}
						} catch (error) {
							toast(error)
						}
					})
				}
			}
		}
	}
</script>

<style lang="less">
	@import '~vux/src/styles/1px.less';
	#live-video {
		position: relative;
		.video-head {
			height: 0.9rem;
			background: #000;
			width: 100%;
			padding: 6px 0;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			.teacher {
				min-width: 90px;
				max-width: 120px;
				width: auto;
				height: .64rem;
				background: #252525;
				border-top-right-radius: 16px;
				border-bottom-right-radius: 16px;
				display: flex;
				padding: 2px;
				box-sizing: border-box;
				.img-photo {
					width: .56rem;
					height: .56rem;
					border-radius: 20px;
				}
				.name {
					margin-left: 3px;
					line-height: .56rem;
					color: #fff;
					font-size: 13px;
				}
			}
			.member-list {
				margin-left: 30px;
				ul{
					width: 4rem;
					padding: 2px 5px;
					box-sizing: border-box;
					margin-left: -20px;
					// margin-right: 20px;
					text-align: left;
					// overflow-x: scroll;
					.wrap {
						// display: flex;
						float: left;
						margin-left: -4px;
					}
					img {
						overflow: hidden;
						display: block;
						width: .6rem;
						height: .6rem;
						border-radius: .5rem;
						margin-left: -.08rem;
					}
				}
			}
		}
		.prism-player {
			width: 100%;
			max-height: 4.2rem;
			height: auto;
			display: block;
			overflow: hidden;
		}
		.cover {
			width: 100%;
			max-height: 4.2rem;
			display: block;
			overflow: hidden;
		}
		.cover-bottom {
			height: 45px;
			background-color: rgba(0, 0, 0, 0.5);
			width: 100%;
			position: absolute;
			bottom: 0;
			color: #fff;
			line-height: 45px;
			font-size: 16px;
			padding-left: 1em;
			box-sizing: border-box;
		}
		.advance-btn {
			bottom: 10px;
			font-size: 14px;
			right: 14px;
			width: 80px;
			height: 26px;
			display: block;
			position: absolute;
			border-radius: 4px;
			line-height: 26px;
			text-align: center;
		}
		.advance {
			background: #CB925F;
			color: #fff;
		}
		.advancesd {
			color: #CB925F;
			background: #F0F0F0;
		}
		.example-video-dimensions{
			width: 100% !important;
			max-height: 4.2rem !important;
			overflow: hidden;
		}
	}
</style>
