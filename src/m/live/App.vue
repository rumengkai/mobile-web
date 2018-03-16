<template>
	<div id="live">
		<div v-if="showContent">
			<!-- 视频区 -->
			<div class="video-box">
				<live-video :data="dataInfo"></live-video>
			</div>
			<!-- 直播简介区 -->
			<div class="live-content" v-if="dataInfo.need_pay">
				<div v-html="dataInfo.content"></div>
			</div>
			<!-- 聊天室区tab -->
			<tab v-show="!dataInfo.need_pay">
				<tab-item selected @on-item-click="onItemClick">交流</tab-item>
				<tab-item @on-item-click="onItemClick">精华</tab-item>
			</tab>
			<!-- 聊天室区 -->
			<div class="chat-room room" v-show="index==0&&!dataInfo.need_pay" ref="chatRoom">
				<div class="chat-room-wrap" ref="chatRoomWrap">
					<div v-show="!chatRoomMsgFlag">
						<load-more :show-loading="!chatRoomMsgFlag" :tip="chatRoomMsgFlag?'·':'正在加载'" background-color="#fbf9fe"></load-more>
					</div>
					<div class="msg-li" v-for="(item,index) in historyMsgs.chat" :key="index" v-if="item.type!='notification'">
						<div v-if="item.type=='notification'">
							<!-- <p class="notification-tip">系统消息&nbsp;{{item.attach.toNick[0]}}&nbsp;{{item.attach.type | attachAction}}</p> -->
						</div>
						<div v-else-if="item.type=='text'||item.type=='image'||item.type=='file'" v-bind:class="[{'user-my':JSON.parse(item.custom?item.custom:'{}').id==dataInfo.user.id}]">
							<div class="from-avatar">
								<img class="avatar" :src="item.fromAvatar" alt="头像" onerror="this.src='http://m.kofuf.com/static/img/logo.png'">
								<img class="level_icon" v-show="JSON.parse(item.custom?item.custom:'{}').level_icon" :src="JSON.parse(item.custom?item.custom:'{}').level_icon" alt="">
							</div>
							<div class="msg-content" v-bind:class="[{'color-admin':JSON.parse(item.custom?item.custom:'{}').level==5},{'color-member':JSON.parse(item.custom?item.custom:'{}').level==1||JSON.parse(item.custom?item.custom:'{}').level==2||JSON.parse(item.custom?item.custom:'{}').level==3},{'color-users':JSON.parse(item.custom?item.custom:'{}').level==0}]">
								<p class="from-nick"><span>{{item.fromNick}}</span>&nbsp;&nbsp;&nbsp;{{item.time | parseTime('{h}:{i}:{s}')}}</p>
								<p class="text" v-if="item.type=='text'" v-html="stringBr(item.text)">
								</p>
								<div v-if="item.type=='image'" class="content-image">
									<img :src="item.file.url" alt="" v-bind:style="{width:'2rem',height:item.file.height*2/item.file.width+'rem'}">
								</div>
								<div v-if="item.type=='file'" class="content-file">
									<div class="file-name" @click="openFile(item.file)"><img src="https://static1.kofuf.com/1519811639811.jpeg" alt="">
										<p class="ell">{{item.file.name}}</p>
									</div>
									<!-- <img :src="item.file.url" alt=""> -->
									<!-- <el-button size='mini' class="file-url" @click="downFile(item.file.url)">下载文件</el-button> -->
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="massage-input">
					<textarea @focus="writeMessage" @blur="viewDefault" ref="replyInput" rows="1" cols="50" v-model="massageValue" placeholder="发个弹幕 ～"></textarea>
					<div class="send-btn" @click="sendMessage">发送</div>
				</div>
				<div class="msg-tip" @click="setChatRoomScroll('1')" v-show="showNewMsg">收到1条新消息</div>
			</div>
			<div class="good-room room" v-show="index==1" ref="goodRoom">
				<div class="good-room-wrap" ref="goodRoomWrap">
					<div class="msg-li" v-for="(item,index) in historyMsgs.good" :key="index">
						<div v-if="item.type=='notification'">
							<!-- <p class="notification-tip">系统消息&nbsp;{{item.attach.toNick[0]}}&nbsp;{{item.attach.type | attachAction}}</p> -->
						</div>
						<div v-else-if="item.type=='text'||item.type=='image'||item.type=='file'">
							<div class="from-avatar">
								<img class="avatar" :src="item.fromAvatar" alt="头像" onerror="this.src='http://m.kofuf.com/static/img/logo.png'">
								<img class="level_icon" v-show="JSON.parse(item.custom?item.custom:'{}').level_icon" :src="JSON.parse(item.custom?item.custom:'{}').level_icon" alt="">
							</div>
							<div class="msg-content" v-bind:class="[{'color-admin':JSON.parse(item.custom?item.custom:'{}').level==5},{'color-member':JSON.parse(item.custom?item.custom:'{}').level==1||JSON.parse(item.custom?item.custom:'{}').level==2||JSON.parse(item.custom?item.custom:'{}').level==3},{'color-users':JSON.parse(item.custom?item.custom:'{}').level==0}]">
								<p class="from-nick"><span>{{item.fromNick}}</span>&nbsp;&nbsp;&nbsp;{{item.time | parseTime('{h}:{i}:{s}')}}</p>
								<p class="text" v-if="item.type=='text'" v-html="stringBr(item.text)">
								</p>
								<div v-if="item.type=='image'" class="content-image">
									<img :src="item.file.url" alt="" v-bind:style="{width:'2rem',height:item.file.height*2/item.file.width+'rem'}">
								</div>
								<div v-if="item.type=='file'" class="content-file">
									<div class="file-name" @click="openFile(item.file)"><img src="https://static1.kofuf.com/1519811639811.jpeg" alt="">
										<p class="ell">{{item.file.name}}</p>
									</div>
									<!-- <img :src="item.file.url" alt=""> -->
									<!-- <el-button size='mini' class="file-url" @click="downFile(item.file.url)">下载文件</el-button> -->
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 购买按钮 -->
		<div class="buy-live" v-if="showContent&&dataInfo.need_pay" @click="buy">
			<p>{{dataInfo.price_text}}&nbsp;¥&nbsp;{{dataInfo.member_price==-1?dataInfo.price:dataInfo.member_price}}</p>
		</div>
		<Failed v-if="failedshow" :msg="failedmsg"></Failed>
		<Loading v-model="loadingshow" :text="loadtext"></Loading>
	</div>
</template>

<script>
	import 'common/css/reset.css'
	import 'common/js/config.js'
	import {
		isWeiXin,
		getClient,
		getSubClient,
		weixinShare,
		isiOS
	} from 'common/js/common.js'
	import {
		createOrder,
		weixinCheck,
		payFree
	} from 'src/api/pay';
	import {
		toPay
	} from 'common/js/pay.js';
	import AjaxServer from 'common/js/ajaxServer.js'
	import geturlpara from 'common/js/geturlpara.js'
	import LoadingMore from "components/LoadingMore/LoadingMore"
	import LazyLoadingMore from "components/LazyLoadingMore/LazyLoadingMore"
	import Failed from "components/Failed/Failed"
	import LiveVideo from "components/LiveVideo/LiveVideo"
	import ActivitiesList from "components/ActivitiesList/ActivitiesList"
	import Vue from 'vue'
	import {
		getLiveDetail,
		getYunxinInfo
	} from 'src/api/live'
	import {
		stringBr,
		toast,
		shareData,
		message
	} from 'src/common/js/assembly'
	import {
		Tab,
		TabItem,
		Loading,
		Icon,
		LoadMore
	} from 'vux'
	import VueResource from 'vue-resource'
	import {
		AlertPlugin,
		querystring,
		cookie
	} from 'vux'
	Vue.use(AlertPlugin)
	Vue.use(VueResource)
	Vue.prototype.$geturlpara = geturlpara
	
	export default {
		name: 'live',
		data() {
			return {
				id: geturlpara.getUrlKey('id'),
				sc: false,
				dataInfo: {
					users: []
				},
				inputTimer:{},
				loadingshow: true,
				loadtext: 'loading...',
				showContent: false,
				failedshow: false,
				chatLoadTip: '加载更多',
				chatRoomMsgFlag: false,
				failedmsg: "服务请求失败，请刷新重试",
				nim: {},
				room: {},
				index: 0,
				historyMsgs: {
					good: [],
					chat: []
				},
				chatroomGood: {},
				chatroomChat: {},
				token: localStorage.getItem('token'),
				yunxinInfo: {
					id: '',
					token: ''
				},
				scrollChat: '',
				scrollGood: '',
				showNewMsg: false,
				chatHistoryFirstMsgs: {},
				goodHistoryFirstMsgs: {},
				massageValue: "",
				firstInGood: ''
			}
		},
		components: {
			Icon,
			Loading,
			LazyLoadingMore,
			Failed,
			LiveVideo,
			Tab,
			TabItem,
			LoadMore
		},
		beforeCreate() {},
		created() {
			//授权
			if (isWeiXin()) {
				getAuth(cookie, querystring, "live.html?id=" + this.id);
			}
			try {
				console.log(SDK);
			} catch (error) {
				console.log(error);
			}
			this.fetchData();
		},
		mounted() {},
		methods: {
			//获取首页数据
			fetchData() {
				getLiveDetail({
					id: this.id
				}).then(res => {
					try {
						if (res.status === 0) {
							/* 设置分享 */
							if (isWeiXin()) {
								shareData(res.name, res.share_url, res.cover, res.user.name + "邀请您观看" + res.name)
								weixinShare();
							}
							this.showContent = true
							this.loadingshow = false
							this.dataInfo = Object.assign(this.dataInfo, res)
							getYunxinInfo({}).then(res2 => {
								if (res2.status == 0) {
									this.setRoomHeight()
									this.yunxinInfo = res2
									this.fetchMsg(res2)
								}
							})
						}
					} catch (error) {
						toast(error)
						this.showContent = true
						this.loadingshow = false
					}
				})
			},
			/* 请求成功后 */
			fetchMsg(data) {
				this.nim = SDK.NIM.getInstance({
					debug: false,
					appKey: process.env.NIM_App_Key,
					account: data.id,
					token: data.token,
					onconnect: this.onConnect,
					onwillreconnect: this.onWillReconnect,
					ondisconnect: this.onDisconnect,
					onmsg: this.onMsg,
					onerror: this.onError,
				})
			},
			onConnect() {
				console.log('连接成功');
				/* 获取聊天室服务器地址 */
				this.nim.getChatroomAddress({
					chatroomId: this.dataInfo.good_room_id,
					done: this.getGoodroomAddressDone
				});
				this.nim.getChatroomAddress({
					chatroomId: this.dataInfo.chat_room_id,
					done: this.getChatroomAddressDone
				});
			},
			onWillReconnect(obj) {
				toast(`即将重连 ${obj.retryCount} 次`, );
				// 此时说明 SDK 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
				console.log('即将重连');
			},
			onDisconnect(error) {
				// 此时说明 SDK 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
				console.log('丢失连接' + error);
				if (error) {
					switch (error.code) {
						// 账号或者密码错误, 请跳转到登录页面并提示错误
						case 302:
							break;
							// 重复登录, 已经在其它端登录了, 请跳转到登录页面并提示错误
						case 417:
							break;
							// 被踢, 请提示错误后跳转到登录页面
						case 'kicked':
							break;
						default:
							break;
					}
				}
			},
			/* 接收消息 */
			onMsg(msg) {
				console.log('收到消息', msg.scene, msg.type, msg);
				this.pushMsg(msg);
				switch (msg.type) {
					case 'custom':
						onCustomMsg(msg);
						break;
					case 'notification':
						// 处理群通知消息
						onTeamNotificationMsg(msg);
						break;
						// 其它case
					default:
						break;
				}
			},
			onError(error) {
				console.log(error);
			},
			getGoodroomAddressDone(error, obj) {
				console.log('获取精华聊天室地址' + (!error ? '成功' : '失败'), error, obj);
				this.room.good = obj
				/* 初始化聊天 */
				if (!error) {
					this.chatroomGood = SDK.Chatroom.getInstance({
						debug: false,
						appKey: process.env.NIM_App_Key,
						account: this.yunxinInfo.id,
						token: this.yunxinInfo.token,
						chatroomId: this.dataInfo.good_room_id,
						chatroomAddresses: [
							this.room.good.address
						],
						onconnect: this.onGoodroomConnect,
						onerror: this.onGoodroomError,
						onwillreconnect: this.onGoodroomWillReconnect,
						ondisconnect: this.onGoodroomDisconnect,
						// 消息
						onmsgs: this.onGoodroomMsgs
					});
	
				} else {
					alert(error)
				}
			},
			onGoodroomConnect(obj) {
				console.log('进入精华聊天室', obj);
				this.chatroomGood.getHistoryMsgs({
					timetag: new Date().getTime(),
					limit: 100,
					msgTypes: ['text', 'image', 'file'], //'text', 'image' 不填默认全选
					done: this.getHistoryMsgsDoneGood
				})
			},
			onGoodroomError(error, obj) {
				toast(`发生错误 ${error}`);
				console.log('发生错误', error, obj);
			},
			onGoodroomMsgs(msgs) {
				this.historyMsgs.good.push(msgs[0])
				this.setGoodRoomScroll()
				if (msgs[0].type != "notification") {
					this.showNewMsg = true
					setTimeout(() => {
						this.showNewMsg = false
					}, 5000)
				}
				console.log('收到聊天室消息', msgs);
			},
			onGoodroomDisconnect(error, obj) {
				// 此时说明 `SDK` 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
				console.log('连接断开', error);
				if (error) {
					switch (error.code) {
						// 账号或者密码错误, 请跳转到登录页面并提示错误
						case 302:
							toast('账号或者密码错误')
							setTimeout(() => {
								window.history.go(-1)
							}, 3000)
							break;
							// 被踢, 请提示错误后跳转到登录页面
						case 'kicked':
							toast(error.message)
							setTimeout(() => {
								window.history.go(-1)
							}, 3000)
							break;
						default:
							break;
					}
				}
			},
			onGoodroomWillReconnect(obj) {
				// 此时说明 `SDK` 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
				toast(`即将重连 ${obj.retryCount} 次`);
				console.log('即将重连', obj);
			},
			getHistoryMsgsDoneGood(error, obj) {
				console.log('获取精华聊天室历史' + (!error ? '成功' : '失败'), error, obj.msgs);
				// if (this.historyMsgs.good.length!=0&&obj.msgs==0) {
				if (obj.msgs.length == 0) {} else {
					this.historyMsgs.good = this.historyMsgs.good.concat(obj.msgs.reverse())
					this.setGoodRoomScroll()
				}
			},
			onGoodroomGetHistoryMsgs(obj) {
				console.log('加载聊天记录', obj);
				this.chatroomGood.getHistoryMsgs({
					// timetag: this.historyMsgs.good.length ? this.historyMsgs.good[this.historyMsgs.good.length - 1].time : new Date().getTime(),
					timetag: this.historyMsgs.good.length ? this.historyMsgs.good[0].time : new Date().getTime(),
					limit: 100,
					msgTypes: ['text', 'image', 'file'],
					done: this.getHistoryMsgsDoneGood
				})
			},
			getChatroomAddressDone(error, obj) {
				console.log('获取普通聊天室地址' + (!error ? '成功' : '失败'), error, obj);
				this.room.chat = obj
				if (!error) {
					this.chatroomChat = SDK.Chatroom.getInstance({
						debug: false,
						appKey: process.env.NIM_App_Key,
						account: this.yunxinInfo.id,
						token: this.yunxinInfo.token,
						chatroomId: this.dataInfo.chat_room_id,
						chatroomAddresses: [
							this.room.chat.address
						],
						onconnect: this.onChatroomConnect,
						onerror: this.onChatroomError,
						onwillreconnect: this.onChatroomWillReconnect,
						ondisconnect: this.onChatroomDisconnect,
						// 消息
						onmsgs: this.onChatroomMsgs
					});
	
				} else {
					alert(error)
				}
			},
			getHistoryMsgsDoneChat(error, obj) {
				// if (this.historyMsgs.good.length!=0&&obj.msgs.length==0) {
				this.chatRoomMsgFlag = true
				if (obj.msgs.length == 0) {
					this.chatLoadTip = '暂无数据'
					// toast(`暂无更多普通聊天发言数据`);
				} else {
					if (this.historyMsgs.chat.length == 0) {
						/* 首次进入 */
						this.historyMsgs.chat = obj.msgs.reverse().concat(this.historyMsgs.chat)
						this.setChatRoomScroll()
					} else {
						/* 滚动到固定位置 */
						this.historyMsgs.chat = obj.msgs.reverse().concat(this.historyMsgs.chat)
						console.log(this.$refs.chatRoomWrap.children[obj.msgs.length]);
						// this.$refs.chatRoom.scrollTop = this.$refs.chatRoomWrap.children[this.chatHistoryFirstMsgs].getBoundingClientRect().top
					}
				}
				if (this.historyMsgs.chat) {
	
				}
	
				console.log('获取普通聊天室历史' + (!error ? '成功' : '失败'), error, obj.msgs);
			},
			onChatroomConnect(obj) {
				console.log('进入聊天室', obj);
				this.chatroomChat.getHistoryMsgs({
					timetag: new Date().getTime(),
					limit: 100,
					msgTypes: ['text', 'image', 'file'],
					done: this.getHistoryMsgsDoneChat
				})
				this.getChatroomMember()
			},
			onChatroomGetHistoryMsgs(obj) {
				console.log('加载聊天记录', obj);
				this.chatRoomMsgFlag = false
				this.chatroomChat.getHistoryMsgs({
					timetag: this.historyMsgs.chat.length > 0 ? this.historyMsgs.chat[0].time : new Date().getTime(),
					limit: 100,
					msgTypes: ['text', 'image', 'file'],
					done: this.getHistoryMsgsDoneChat
				})
			},
			onChatroomWillReconnect(obj) {
				// 此时说明 `SDK` 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
				toast(`即将重连 ${obj.retryCount} 次`);
				console.log('即将重连', obj);
			},
			onChatroomDisconnect(error, obj) {
				// 此时说明 `SDK` 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
				console.log('连接断开', error);
				if (error) {
					switch (error.code) {
						// 账号或者密码错误, 请跳转到登录页面并提示错误
						case 302:
							toast('账号或者密码错误')
							setTimeout(() => {
								window.history.go(-1)
							}, 3000)
							break;
							// 被踢, 请提示错误后跳转到登录页面
						case 'kicked':
							toast(error.message)
							setTimeout(() => {
								window.history.go(-1)
							}, 3000)
							break;
						default:
							break;
					}
				}
			},
			onChatroomError(error, obj) {
				toast(`发生错误 ${error}`);
				console.log('发生错误', error, obj);
			},
			onChatroomMsgs(msgs) {
				this.historyMsgs.chat.push(msgs[0])
				this.setChatRoomScroll()
				// console.log(this.$refs.chatRoomWrap.children);
				if (!this.isElementInViewport(this.$refs.chatRoomWrap.children[this.$refs.chatRoomWrap.children.length - 1])) {
					if (msgs[0].type != "notification") {
						this.showNewMsg = true
						setTimeout(() => {
							this.showNewMsg = false
						}, 5000)
					} else {
						this.getChatroomMember()
					}
				}
				console.log('收到聊天室消息', msgs);
			},
			getChatroomMember() {
				this.chatroomChat.getChatroomMembers({
					guest: true,
					limit: 100,
					done: this.getChatroomMembersDone
				});
			},
			getChatroomMembersDone(error, obj) {
				console.log('获取聊天室成员' + (!error ? '成功' : '失败'), error, obj.members);
				if (!error) {
					this.dataInfo.users = obj.members
				}
				setTimeout(() => {
					var memberlist = document.getElementById('member-list')
					memberlist.style.width = memberlist.children.length * 28 + "px"
				}, 200)
			},
			/* 写消息 */
			writeMessage() {
				console.log('准备写消息');
				if (isiOS()) {
					document.activeElement.scrollIntoViewIfNeeded();
					// toast('弹起键盘')
					 this.inputTimer = setInterval( () => {
								this.$refs.replyInput.scrollIntoView(false);
						},100);
				}
			},
			viewDefault(){
					clearInterval(this.inputTimer);
			},
			/* 发送消息 */
			sendMessage() {
				var msg = this.chatroomChat.sendText({
					custom: JSON.stringify(this.dataInfo.user),
					text: this.massageValue,
					done: this.sendChatroomMsgDone
				});
			},
			sendChatroomMsgDone(error, msg) {
				if (!error) {
					this.massageValue = ''
					this.historyMsgs.chat.push(msg)
					this.setChatRoomScroll('1')
				}
				console.log('发送聊天室' + msg.type + '消息' + (!error ? '成功' : '失败') + ', id=' + msg.idClient, error, msg);
			},
			/* 购买支付行为 */
			buy() {
				this.loadingshow = true;
				var params = {
					type: config()['paytype'],
					items: this.id,
					order_type: "18"
				}
				if (this.dataInfo.member_price == '0.0' || this.dataInfo.member_price == '0' || this.dataInfo.member_price<0 && this.dataInfo.price ==0) {
					payFree(params).then(res => {
						this.loadingshow = false;
						message("恭喜您，领取成功", "提示", () => {
							location.href = "/m/lives.html";
						});
					});
				}else{
					createOrder(params).then(response => {
						this.loadingshow = false
						this.createOrderResult(response)
					})
				}
			},
			createOrderResult(res) {
				if (res.status != 0) {
					message(res.error, '提示', (res) => {
						if (res.status == 5) {
							localStorage.clear();
							clearcookie(cookie);
							getAuth(cookie, querystring, "member.html");
						}
					})
				} else {
					console.log("订单创建成功。。");
					this.orderInfo = res;
					toPay(res, this.callback, this);
				}
			},
			callback(data) {
				weixinCheck({
					id: data.id
				}).then(response => {
					this.loadingshow = false;
					if (response.status != 0) {
						message("服务器维护中，您的订单已支付成功，请勿重复支付。如有疑问请联系客服：400-966-7718");
					} else {
						toast("购买成功");
						setTimeout(() => {
							location.href = "/m/my-lives.html";
						}, 1000);
					}
				});
			},
			onItemClick(i) {
				this.index = i
				if (i == 1 && this.firstInGood == '') {
					this.firstInGood = 1
					this.setGoodRoomScroll()
				}
			},
			toChannel(id) {
				window.location.href = "/m/channel.html?id=" + id;
			},
			openFile(file) {
				toast('前往APP中下载')
				// window.location.href = file.url
			},
			/* 设置聊天室scroll滚动 */
			setChatRoomScroll(f) {
				var _self = this
				_self.chatHistoryFirstMsgs = this.$refs.chatRoomWrap.children[0]
				setTimeout(() => {
					/* 判断用户是否在浏览聊天历史，如果在浏览，则不进行高度置底，否在，room高度置底 */
					// if ((_self.$refs.chatRoomWrap.offsetHeight - _self.$refs.chatRoom.scrollTop < parseFloat(_self.$refs.chatRoom.style.height) + 200) || f == 1) {
					if (!_self.isElementInViewport(_self.$refs.chatRoomWrap.children[_self.$refs.chatRoomWrap.children.length - 1]) || f == 1) {
						_self.$refs.chatRoom.scrollTop = (200 + _self.$refs.chatRoomWrap.offsetHeight - parseFloat(_self.$refs.chatRoom.style.height))
					}
					if (this.scrollChat == '') {
						_self.$refs.chatRoom.scrollTop = (200 + _self.$refs.chatRoomWrap.offsetHeight - parseFloat(_self.$refs.chatRoom.style.height))
						this.scrollChat = _self.$refs.chatRoom.addEventListener('scroll', () => {
							if (_self.$refs.chatRoom.scrollTop <= 10 && this.chatRoomMsgFlag) {
								this.onChatroomGetHistoryMsgs()
							}
						}, false);
					}
				}, 200)
			},
			setGoodRoomScroll(f) {
				var _self = this
				setTimeout(() => {
					/* 判断用户是否在浏览聊天历史，如果在浏览，则不进行高度置底，否在，room高度置底 */
					// if ((_self.$refs.goodRoomWrap.offsetHeight - _self.$refs.goodRoom.scrollTop < parseFloat(_self.$refs.goodRoom.style.height) + 200) || f == 1) {
					if (!_self.isElementInViewport(_self.$refs.goodRoomWrap.children[_self.$refs.goodRoomWrap.children.length - 1]) || f == 1) {
						_self.$refs.goodRoom.scrollTop = (200 + _self.$refs.goodRoomWrap.offsetHeight - parseFloat(_self.$refs.goodRoom.style.height))
					}
					_self.$refs.goodRoom.scrollTop = (200 + _self.$refs.goodRoomWrap.offsetHeight - parseFloat(_self.$refs.goodRoom.style.height))
					if (this.scrollGood == '') {
						_self.$refs.goodRoom.scrollTop = (200 + _self.$refs.goodRoomWrap.offsetHeight - parseFloat(_self.$refs.goodRoom.style.height))
						this.scrollGood = _self.$refs.goodRoom.addEventListener('scroll', () => {
							if (_self.$refs.goodRoom.scrollTop <= 10 && this.goodRoomMsgFlag) {
								this.onChatroomGetHistoryMsgs()
							}
						}, false);
					}
				}, 200)
			},
			/* 设置聊天室高度 */
			setRoomHeight() {
				try {
					let h = document.getElementsByTagName('html')
					let fs = h[0].style.fontSize
					this.$refs.chatRoom.style.height = h[0].clientHeight - 5.9 * parseFloat(fs) + 'px'
					this.$refs.goodRoom.style.height = h[0].clientHeight - 5.9 * parseFloat(fs) + 'px'
				} catch (error) {
					console.error(error);
				}
			},
			resetScroll() {
				this.$nextTick(() => {
					this.$refs.scroller.reset({
						top: 0
					})
				})
			},
			/* 判断元素是否在可见区域内 */
			isElementInViewport(el) {
				var rect = el.getBoundingClientRect();
				return (
					rect.top >= 0 &&
					rect.left >= 0 &&
					rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
					rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
				);
			},
			stringBr
		},
		destroyed() {
			this.nim.disconnect()
			this.chatroomChat.disconnect()
			this.chatroomGood.disconnect()
		}
	}
</script>

<style lang="less">
	@import '~vux/src/styles/1px.less';
	@import "../index/App.less";
	@import './App.less';
</style>
