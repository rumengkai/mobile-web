<template>
  <div id="books-list">
    <div v-if="contentshow">
      <div class="banner">
        <img :src="dataInfo.head" alt="">
      </div>
			<share-money-btn type="7" :id="id" :number="dataInfo.gift_num?dataInfo.gift_num:0" :moneyVal="dataInfo.share_make_money?dataInfo.share_make_money:0"></share-money-btn>
      <p class="title" v-if="dataInfo.type===0">{{dataInfo.name}}</p>
      <p class="title" v-else-if="dataInfo.type===1" v-html="stringBr(dataInfo.brief)"></p>
      <p class="title" v-else>{{dataInfo.name}}</p>
      <book-list :dataList="dataInfo.items"></book-list>
    </div>
		<!-- 支付行为 -->
		<buy-action v-if="contentshow&&!dataInfo.followed" ref="buy_action" :shareFrom="shareFrom" :isCard="isCard" :sourceFrom="sourceFrom" :name="dataInfo.name" :buyParams="buy_params" :coupons="dataInfo.coupons" :invalidCoupons="dataInfo.invalid_coupons" :composite="dataInfo.composite" :backurl="backurl" v-on:errorFun="errorFun"> </buy-action>
    <footer v-if="contentshow&&!dataInfo.followed">
      <div class="price">
        <span>打包价格： <span> ¥{{dataInfo.channel_price}}</span></span>
      </div>
      <!-- <div class="buy" @click="buy"> -->
      <div class="buy" @click="composite_readysub">
        <a>
          <span>购买书单</span>
        </a>
      </div>
    </footer>
    <back-home></back-home>
    <loading v-model="loadingshow" :text="loadtext"></loading>
  </div>
</template>

<script>
  import 'common/js/config.js';
  import { getBooksList } from 'src/api/books';
  import { payFree ,createOrder , weixinCheck } from 'src/api/pay';
  import { toPay } from 'common/js/pay.js';
  import BackHome from "components/BackHome/BackHome"
  import geturlpara from 'common/js/geturlpara.js';
  import { isWeiXin , weixinShare } from 'common/js/common.js';
  import BookList from "components/Books/BookList"
  import TitleBar from "components/TitleBar/TitleBar"
	import LazyLoadingMore from "components/LazyLoadingMore/LazyLoadingMore"
	import ShareMoneyBtn from "components/ShareMoneyBtn/ShareMoneyBtn"
  import Vue from 'vue'
	import BuyAction from "components/BuyAction/BuyAction"
  import {
    stringBr ,shareData ,message , toast
  } from 'src/common/js/assembly';
  import {Loading,XHeader,Icon,Scroller,AlertPlugin,querystring,cookie} from 'vux'
  Vue.use(AlertPlugin)
  Vue.prototype.$geturlpara=geturlpara

  export default {
    data () {
      return {
				id:0,
				shareFrom: querystring.parse().share_from,
				isCard: querystring.parse().is_card,
				sourceFrom: querystring.parse().source_from,
        loadingshow: true,
        loadtext: '加载中...',
        contentshow:false,
				dataInfo:{},
				backurl:"/m/books-my.html",
        buy_params:{
          can_buy:true,
          buy_id:0,
          coupon_id:"",
          coupon_price:"",
          channel_price:"",
          price:0,
          showpopup:false,
          showlist:false,/* 优惠券列表 */
          show_composite:false,
          couponstext:"选择优惠券",
          couponsname:"优惠券",
          order_type:"12",
        }
      }
    },
    components: {
      Icon,
      XHeader,
      Loading,
      TitleBar,
      LazyLoadingMore,
      BookList,
			BackHome,
			ShareMoneyBtn,
			BuyAction
    },
    beforeCreate(){
      //授权
    },
    created () {
			this.id=this.$geturlpara.getUrlKey("id")//;querystring.parse()['id']
			this.buy_params.buy_id=this.id;
      if(isWeiXin()){
        var path=location.pathname.replace('/m/','')
        getAuth(cookie,querystring,path+"?id="+this.id)
      }
      this.fetchData();
      setTimeout(()=>{
        this.loadingshow = false
      },5*1000)
    },
    methods: {
      //获取数据
      fetchData(){
        getBooksList({id:this.id}).then(response => {
          this.loadingshow = false
          this.fetchResult(response)
        })
      },
      fetchResult(res){
        if (res.status==0) {
          this.dataInfo=res;
					this.contentshow=true;

					this.buy_params.can_buy=true;
          this.buy_params.channel_price=res.channel_price;
					this.buy_params.price=res.price;
					
          shareData(res.name,res.share_url,res.share_thumb,res.brief)
          weixinShare();
        }
			},
			composite_readysub(){
        this.$refs.buy_action.composite_readysub()
			},
			errorFun(){
        localStorage.clear();
        clearcookie(cookie);
        getAuth(cookie, querystring, "channel",this.id);
      },
      // buy(){
      //   this.loadingshow=true;
      //   var params={
      //     type: config()['paytype'],
      //     items: this.id,
      //     order_type:"12"
			// 	}
			// 	let f = this.from();
			// 	if ((!this.shareFrom || this.shareFrom == 'undefined')&&f!=0) {
			// 		params.share_from = f
			// 	}else if ( this.shareFrom && this.shareFrom != 'undefined') {
			// 		params.share_from = this.shareFrom
			// 	}else{
			// 		params.share_from = this.shareFrom
			// 	}
			// 	if (this.dataInfo.channel_price == '0.0' || this.dataInfo.channel_price == '0') {
			// 		payFree(params).then(res => {
			// 			this.loadingshow = false;
			// 			message("恭喜您，领取成功", "提示", () => {
			// 				location.href = "/m/books.html";
			// 			});
			// 		});
			// 	}else{
			// 		createOrder(params).then(response => {
			// 			this.loadingshow = false
			// 			this.createOrderResult(response)
			// 		})
			// 	}
      // },
      // createOrderResult(res){
      //   if (res.status!=0) {
      //     message(res.error,'提示',(res)=>{
      //       if(res.status==5){
      //         localStorage.clear();
      //         clearcookie(cookie);
      //         getAuth(cookie,querystring,"member.html");
      //       }})
      //   }else{
      //     console.log("订单创建成功。。");
      //     this.orderInfo=res;
      //     toPay(res,this.callback,this);
      //   }
      // },
      // callback(data){
      //   weixinCheck({ id: data.id }).then(response => {
      //     this.loadingshow = false;
      //     if (response.status != 0) {
      //       message("服务器维护中，您的订单已支付成功，请勿重复支付。如有疑问请联系客服：400-966-7718");
      //     } else {
      //       toast("购买成功");
      //       setTimeout(() => {
      //         location.href="/m/books-my.html";
      //       }, 1000);
      //     }
      //   });
			// },
			from(){
				let f = Math.random()*10;
				// if(f>9.5){
					return 0
			},
      skip(name){
        window.location.href="/m/"+name;
      },
      stringBr
    }
  }
</script>
<style lang="less">
@import '../../common/css/reset.css';
@import '~vux/src/styles/1px.less';
@import "../index/App.less";
@import './App.less';
</style>
