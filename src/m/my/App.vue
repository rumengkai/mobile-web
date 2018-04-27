<template>
	<div id="my">
		<div v-if="showContent" class="content">
			<div class="profile">
				<!-- <div class="privilege" v-if="myInfo.user.level!=0" @click="toSkip('privilege.html')">
	          <img class="mark" src="./images/vip_question_mark.png" alt="">
	          特权说明
	        </div> -->
				<div>
					<div class="headimg" @click="toUserCenter(myInfo.user)">
						<img :src="myInfo.user.photo" alt="头像" class="head">
						<img class="level" v-if="myInfo.user.level!=0" :src="myInfo.user.vip_icon" alt="会员">
					</div>
					<span v-html="myInfo.user.name"></span>
				</div>
				<div class="member-entry" @click="tomember">
					<p class="title">{{myInfo.user.level>0?'会员中心':'开通会员'}}</p>
					<p class="con">{{myInfo.user.level>0?myInfo.user.privilege_count+"项特权待兑换":"享受"+myInfo.user.privilege_count+"项特权"}}</p>
				</div>
				<img class="bottom-img" src="https://static2.kofuf.com/1520934481076.png" alt="">
			</div>
			<div class="member-items vux-1px-b">
				<li @click="toMessage()">
					<div>{{myInfo.user.wallet_money}}</div>
					<p>功夫币</p>
				</li>
				<li @click="toSkip('collect.html')">
					<div><img src="https://static1.kofuf.com/1520936941958.png" alt=""></div>
					<p>收藏</p>
				</li>
				<li @click="toUserCenter(myInfo.user)">
					<div><img src="https://static2.kofuf.com/1520937762330.png" alt=""></div>
					<p>评论</p>
				</li>
				<li @click="toMessage()">
					<div><img src="https://static2.kofuf.com/1520937951091.png" alt=""></div>
					<p>消息</p>
				</li>
			</div>
			<div class="member-items">
				<li @click="toSkip('gongfu-money.html')">
					<div>{{myInfo.user.share_money}}</div>
					<p>功夫赚</p>
				</li>
				<li @click="toSkip('code-active.html')">
					<div>{{myInfo.user.coupon_count}}</div>
					<p>优惠中心</p>
				</li>
				<li @click="toMessage()">
					<div>{{myInfo.user.shopping_count}}</div>
					<p>购物车</p>
				</li>
				<li @click="toSkip('order.html')">
					<div>{{myInfo.user.order_count}}</div>
					<p>订单中心</p>
				</li>
			</div>
			<group class="group g1">
				<!-- <cell title="我的收藏" is-link @click.native="toSkip('collect.html')"></cell> -->
				<!-- <cell title="我的订单" is-link @click.native="toSkip('order.html')"></cell> -->
				<!-- <cell v-if="gid=='1047501566'" title="两周年庆" is-link @click.native="toSkip('second-anniversary.html')"></cell>
	        <cell v-if="gid=='1047501566'" title="购买会员" is-link @click.native="toSkip('member.html')"></cell> -->
				<!-- <cell title="会员中心" is-link @click.native="tomember" v-if="myInfo.user.privilege_count!=-1||myInfo.user.show_privilege">
					<span class="tp tp1" v-if="myInfo.user.level==0">开通会员</span>
					<span class="tp tp1" v-if="myInfo.user.level!=0"><span v-if="myInfo.user.privilege_count!=0">{{myInfo.user.privilege_count}}项未兑换</span></span>
				</cell> -->
				<cell title="收货地址管理" is-link @click.native="toSkip('address.html')"><img slot="icon" width="20" style="display:block;margin-right:5px;" src="https://static2.kofuf.com/1520938620930.png"></cell>
				<!-- <cell title="优惠中心" is-link @click.native="toSkip('code-active.html')"><span class="tp" v-if="myInfo.user.coupon_count!=0"><span class="tp1">{{myInfo.user.coupon_count}}</span>张待使用</span>
				</cell> -->
				<!-- <cell title="我的活动" is-link @click.native="toSkip('')"><img src="https://static2.kofuf.com/1520938673463.png" alt=""></cell> -->
				<cell title="我的直播" is-link @click.native="toSkip('my-lives.html')"><img slot="icon" width="20" style="display:block;margin-right:5px;" src="https://static2.kofuf.com/1520938763694.png" alt=""></cell>
			</group>
			<group class="group g1">
				<cell title="个人信息" is-link @click.native="toSkip('profile.html')"><img slot="icon" width="20" style="display:block;margin-right:5px;" src="https://static1.kofuf.com/1520938793679.png" alt=""></cell>
			</group>
			<group class="group g1">
				<cell title="关于我们" is-link @click.native="toSkip('about.html')"><img slot="icon" width="20" style="display:block;margin-right:5px;" src="https://static2.kofuf.com/1521173726818.png" alt=""></cell>
				<cell title="下载APP" is-link @click.native="toApp()"><img slot="icon" width="20" style="display:block;margin-right:5px;" src="https://static1.kofuf.com/1521173732969.png" alt=""></cell>
			</group>
		</div>
		<TabBar active="my"></TabBar>
		<Failed v-if="failedshow" :msg="failedmsg"></Failed>
		<Loading v-model="loadingshow" :text="loadtext"></Loading>
	</div>
</template>

<script>
	import 'common/css/reset.css';
	import 'common/js/config.js';
	import {
		isWeiXin
	} from 'common/js/common.js';
	import AjaxServer from 'common/js/ajaxServer.js';
	import TabBar from "components/TabBar/TabBar"
	import Failed from "components/Failed/Failed"
	import Vue from 'vue'
	import {
		Loading
	} from 'vux'
	import {
		toast
	} from 'src/common/js/assembly';
	import VueResource from 'vue-resource'
	import {
		Group,
		Cell,
		querystring,
		cookie
	} from 'vux'
	Vue.use(VueResource)
	export default {
		name: 'my',
		data() {
			return {
				loadingshow: true,
				loadtext: 'loading...',
				showContent: false,
				failedshow: false,
				failedmsg: "服务请求失败，请刷新重试",
				myInfo: {},
				gid: localStorage.getItem("gid")
			}
		},
		components: {
			Group,
			Cell,
			Loading,
			TabBar,
			Failed
		},
		beforeCreate() {
			//授权
			if (isWeiXin()) {}
			getAuth(cookie, querystring, "my.html");
		},
		created() {
			this.fetchData();
		},
		mounted() {
			//唤起app
			// new Mlink({
			//   mlink: "https://ah88dj.mlinks.cc/AK8j?id="+this.id,
			//   button: document.getElementById('btnOpenApp'),
			//   autoLaunchApp : false,
			// });
		},
		methods: {
			//获取专栏数据数据
			fetchData(cid) {
				var self = this;
				AjaxServer.httpGet(
					Vue,
					HOST + '/api/users/my_info.json', {},
					(data) => {
						self.loadingshow = false;
						self.showContent = true;
						if (data.status == 0) {
							this.myInfo = data;
						} else {
							console.log(data.error);
						}
						if (data.status == 5) {
							localStorage.clear();
							clearcookie(cookie);
							getAuth(cookie, querystring);
						}
					},
					(err) => {
						console.log(err);
						self.loadingshow = false;
						self.failedshow = true;
					}
				);
				setTimeout(() => {
					self.loadingshow = false;
				}, 10000);
			},
			toApp() {
				window.location.href = "https://ah88dj.mlinks.cc/AK8j";
			},
			toSkip(data) {
				window.location.href = "/m/" + data;
			},
			tomember() {
				if (this.myInfo.user.level == 0) {
					window.location.href = "/m/member.html";
				} else {
					//会员
					window.location.href = "/m/member-center.html";
				}
			},
			toUserCenter(data) {
				window.location.href = "/m/moments.html?id=" + data.id;
			},
			toMessage() {
				toast('请前往APP中查看')
			}
		}
	}
</script>

<style lang="less">
	@import '~vux/src/styles/1px.less';
	@import "../index/App.less";
	@import './App.less';
</style>
