<template>
	<div id="live-video">
		<div class="video-head">
			<div class="teacher">
				<img class="img-photo" :src="data.teacher.photo" alt="">
				<span class="name ell">{{data.teacher.name}}</span>
			</div>
			<div class="member-list" v-for="(item,index) in data.users" :key="index">
				<div class="wrap" id="member-list">
					<img :src="item.avatar" alt="">
				</div>
			</div>
		</div>
		<div v-if="data.state==4&&!data.need_pay">
			<video class="prism-player" id="videoElement"></video>
			<!-- <div class="prism-player" id="J_prismPlayer" style=""></div> -->
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
			return {}
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
				// var player = new Aliplayer({
				// 	id: 'J_prismPlayer',
				// 	width: '100%',
				// 	autoplay: true,
				// 	//支持播放地址播放,此播放优先级最高
				// 	source: 'http://live.kofuf.com/kofuf/live2.m3u8?auth_key=1699643483-0-0-11f4931c0c70a14d2f7be8418dd679e0',
				// 	// source: this.data.announce_url,
				// 	// source: this.data.live_url,
				// 	// isLive:true,
				// 	format: 'm3u8',
				// 	preload: true,
				// 	useH5Prism: true,
				// 	useFlashPrism: false,
				// 	x5_video_position: 'top',
				// 	x5_type: 'h5', //通过 video 属性 “x5-video-player-type” 声明启用同层H5播放器，支持的值：h5 https://x5.tencent.com/tbs/guide/video.html
				// 	cover: this.data.cover
				// });
				/* 跨域问题 */
				if (flvjs.isSupported()) {
					var videoElement = document.getElementById('videoElement');
					var flvPlayer = flvjs.createPlayer({
						type: 'flv',
						url: this.data.live_url
					});
					flvPlayer.attachMediaElement(videoElement);
					flvPlayer.load();
					flvPlayer.play();
				}
			}
			if (this.data.state == 3 && this.data.announce_url != '') {
				var player_announce = new Aliplayer({
					id: 'J_prismPlayer_announce',
					width: '100%',
					autoplay: true,
					//支持播放地址播放,此播放优先级最高
					source: this.data.announce_url,
					// source: this.data.live_url,
					// isLive:true,
					format: 'm3u8',
					preload: true,
					useH5Prism: true,
					useFlashPrism: false,
					x5_video_position: 'top',
					x5_type: 'h5', //通过 video 属性 “x5-video-player-type” 声明启用同层H5播放器，支持的值：h5 https://x5.tencent.com/tbs/guide/video.html
					cover: this.data.cover
				});
			}
		},
		methods: {
			toLive(id) {
				window.location.href = "/m/live.html?id=" + this.id;
			},
			advance() {
				if (this.data.advance_state == 1) {
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
				padding: 2px 10px;
				box-sizing: border-box;
				margin-left: 20px;
				margin-right: 20px;
				text-align: left;
				overflow-x: scroll;
				.wrap {
					display: flex;
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
	}
</style>
