<template>
  <div id="buy-active">
    <div class="popup1">
      <popup v-model="buyParams.showlist" height="100%" position="bottom">
        <div class="popup12">
            <p class="p1">可用优惠券</p>
            <Couponsuse :couponData="coupons" v-on:getCoupons="CouponsSelected"></Couponsuse>
            <div v-if="invalidCoupons">
              <p class="p1" v-if="invalidCoupons.length">不可用优惠券</p>
            </div>
            <Couponsuse :couponData="invalidCoupons" state="3"></Couponsuse>
          <div class="cancelCoupons">
            <x-button @click.native="cancelCoupons">暂不使用优惠券</x-button>
          </div>
        </div>
      </popup>
    </div>
    <div class="" v-if="composite.items.length">
      <popup v-model="buyParams.show_composite" max-height="100%" position="bottom">
        <div class="composite">
            <p class="p1">
              组合优惠价
              <span class="com_price">¥{{composite.channel_price}}
              </span><s class="ori_price">&nbsp;¥{{composite.price}}</s>
            </p>
            <ul class="">
              <li v-for="(item,index) in composite.items" :key="index">
                <div class="composite-item">
                  <div class="headimg">
                    <img :src="item.thumb" alt="">
                    <span v-if="index!=0" class="tuijian">推荐</span>
                  </div>
                  <div class="con_text">
                    <p class="composite_name">
                      <span class="composite-name ell">{{item.name}}</span>
                      <span class="or_price">¥{{item.price}}</span></p>
                    <p class="composite_brief ell-3">{{item.brief}}</p>
                  </div>
                </div>
                <div class="center_plus" v-if="index!=composite.items.length-1">
                  <img  src="./images/plus_03.png" alt="">
                </div>
              </li>
            </ul>
            <div>
              <x-button type="primary" @click.native="oneBuySubscribe">一键拿下</x-button>
              <x-button @click.native="readysub">不感兴趣</x-button>
            </div>
        </div>
      </popup>
    </div>
    <popup v-model="buyParams.showpopup" max-height="60%">
        <div class="popup2">
          <group>
            <cell title="您将订阅" :value="name"></cell>
            <cell title="支付金额" >¥{{buyParams.coupon_price}}</cell>
            <cell :title="buyParams.couponsname" :value="buyParams.couponstext" is-link @click.native="showCouponsList"></cell>
          </group>
          <div style="padding:20px 15px;">
            <x-button type="primary" @click.native="subscribe">立即购买</x-button>
            <x-button @click.native="buyParams.showpopup = false">取消</x-button>
          </div>
        </div>
    </popup>
  </div>
</template>

<script>
import Vue from "vue";
import { message , toast } from "common/js/assembly";
import { payFree , createOrder , weixinCheck } from 'src/api/pay';
import { toPay } from 'common/js/pay.js';
import Couponsuse from "components/Couponsuse/Couponsuse"
import { Popup,Group,Cell,XButton} from 'vux'

export default {
  props: {
    name: {
      type: String,
      default: ""
    },
    backurl:{
      type: String,
      default: ""
    },
    composite:{
      type:Object,
      default:{
        "id":0,
        "channel_price":0,
        "items":[]
      }
    },
    coupons:{
      type:Array,
      default:[]
    },
    invalidCoupons:{
      type:Array,
      default:[]
    },
    buyParams: {
      type: Object,
      default: {
        buy_id:0,
        can_buy:true,
        coupon_id: "",
        coupon_price:"",
        channel_price:"",
        price:"",
        showpopup: false,
        showlist: false ,/* 优惠券列表 */
        show_composite: false,
        couponstext: "选择优惠券",
        couponsname: "优惠券",
        order_type: ""
      }
		},
		shareFrom: {
			type: String,
      default: ""
		},
		sourceFrom: {
			type: String,
      default: ""
		},
		isCard: {
			type: String,
      default: ""
		}
  },
  data() {
    return {
      id:"",
      disable:true,
      loadingshow: true,
      loadtext: 'loading...'
    };
  },
  components: { Popup,Group,Cell,XButton,Couponsuse },
  mounted() {
    this.id=this.buyParams.buy_id;
  },
  methods: {
    //订阅支付前，免费领取
    composite_readysub() {
      if (!this.buyParams.can_buy) {
        message("该商品已下架！");
        return;
      }
      //如果价格为0，则免费领取
      if (this.buyParams.price <= 0) {
        var params = {
          type: config()["paytype"],
					items: this.buyParams.buy_id,
					order_type: this.buyParams.order_type
        };
        payFree(params).then(res => {
          this.loadingshow = false;
          message("恭喜您，领取成功", "提示", () => {
            location.href = this.backurl;
          });
        });
      } else if (this.composite.items.length) {
        this.buyParams.show_composite = true;
      } else {
        this.readysub();
      }
    },
    /* 一键拿下调用，是否有组合专栏 */
    oneBuySubscribe() {
      this.buyParams.show_composite = false;
      this.buyParams.buy_id = this.composite.id;
      this.buyParams.coupon_id = "";
      // this.buyParams.order_type = 16;
      this.disable = true;
      if (this.composite.has_goods) {
        /* 订单确认页 */
        window.location.href="/m/order-confirm.html?id="+this.composite.id+"&type=16"
      }else{
        this.subscribe(16);
      }
    },
    /* 购买前选择优惠券 */
    readysub() {
      this.buyParams.show_composite = false;
      this.buyParams.showpopup = true;
      // this.buyParams.order_type = this.buyParams.order_type;
      this.buyParams.buy_id = this.id;
      this.buyParams.couponstext = this.coupons.length + "张券可用";
      if (this.coupons.length) {
        this.buyParams.coupon_id = this.coupons[0].id;
        this.buyParams.couponsname = this.coupons[0].name;
        this.buyParams.couponstext = "已抵扣¥" + this.coupons[0].discount;
        this.buyParams.coupon_price = this.coupons[0].coupon_price;
      } else {
        if (this.buyParams.channel_price >= 0) {
          this.buyParams.coupon_price = this.buyParams.channel_price;
        } else {
          this.buyParams.coupon_price = this.buyParams.price;
        }
      }
    },
    /* 创建订单 */
    subscribe(orderType) {
      this.buyParams.showpopup = false;
      //已登陆情况
      if (localStorage.getItem("gid") && this.disable) {
        this.loadtext = "加载中...";
        this.loadingshow = true;
        this.disable = false;
        setTimeout(()=>{
          this.disable = true;
        },2000)
        //发起订单请求
        var params = {
          type: config()["paytype"],
          items: this.buyParams.buy_id,
          coupon_id: this.buyParams.coupon_id,
					order_type: orderType==16?orderType:this.buyParams.order_type
				};
				let f = this.from();
				if ((!this.shareFrom || this.shareFrom == 'undefined')&&f!=0) {
					params.share_from = f
				}else if ( this.shareFrom && this.shareFrom != 'undefined') {
					params.share_from = this.shareFrom
				}
				if (this.sourceFrom && this.sourceFrom != 'undefined') {
					params.source_from = this.sourceFrom
				}
				if (this.isCard && this.isCard != 'undefined') {
					params.is_card = this.isCard
				}
        createOrder(params).then(response => {
          this.loadingshow = false;
          this.createOrderResult(response);
        });
      } else {
        //未登陆情况，跳转到授权
        this.$emit("errorFun","");
      }
    },
    /* 调起支付 */
    createOrderResult(res) {
      if (res.status != 0) {
        message(res.error, "提示", res => {
          if (res.status == 5) {
            this.$emit("errorFun","");
          }
        });
      } else {
        console.log("订单创建成功。。");
        this.orderInfo = res;
        toPay(res, this.callback, this);
      }
    },
    //支付成功回调
    callback(data) {
      weixinCheck({ id: data.id }).then(response => {
        this.loadingshow = false;
        if (response.status != 0) {
          message("服务器维护中，您的订单已支付成功，请勿重复支付。如有疑问请联系客服：400-966-7718");
        } else {
          toast("购买成功");
          setTimeout(() => {
            location.href = this.backurl;
          }, 1000);
        }
      });
    },
    CouponsSelected(data){
      this.buyParams.showpopup=true;
      this.buyParams.showlist=false;
      this.buyParams.coupon_id=data.id;
      this.buyParams.coupon_price=data.coupon_price;
      this.buyParams.couponstext="已抵扣¥"+data.discount;;
      this.buyParams.couponsname=data.name;;
    },
    cancelCoupons(){
      this.buyParams.showlist = false;
      this.buyParams.showpopup = true;
      if (this.buyParams.channel_price>=0) {
        this.buyParams.coupon_price=this.buyParams.channel_price;
      }else{
        this.buyParams.coupon_price=this.buyParams.price;
      }
      this.buyParams.couponstext=this.coupons.length+"张券可用";
      this.buyParams.couponsname="优惠券";
      this.buyParams.coupon_id="";
      // this.buyParams.order_type="";
    },
    showCouponsList(){
      this.buyParams.showlist=true;
      this.buyParams.showpopup=false;
    },
    toChannelsTuiJian(channel){
      window.location.href="/m/channel.html?id="+channel.id;
		},
		from(){
			let f = Math.random()*10;
			// if(f>9.5){
				return "0"
			// 
		}
  }
};
</script>

<style lang="less">
@import "~vux/src/styles/1px.less";
@import "../../m/index/App.less";
#buy-active {
  .popup1 {
    background-color: #f5f5f5;
    .popup12 {
      margin-top: 20px;
      .p1 {
        line-height: 30px;
        text-align: center;
        font-size: 16px;
        color: #333;
      }
    }
  }
  .cancelCoupons {
    position: fixed;
    bottom: 20px;
    width: 4rem;
    margin-left: -2rem;
    left: 50%;
  }
  .composite {
    padding: 20px;
    background: #fff;
    .com_price {
      color: @base_color;
    }
    .ori_price {
      font-size: 14px;
      color: #999;
    }
    .p1 {
      font-size: 16px;
      line-height: 20px;
    }
    .center_plus {
      height: 20px;
      text-align: center;
      img {
        width: 20px;
      }
    }
    li {
      .composite-item {
        margin: 10px 0 !important;
        border-radius: 2px;
        border: @base_color 1px solid;
        margin: auto;
        height: 1.9rem;
        padding: 0.2rem;
        box-sizing: border-box;
        .composite-name {
          width: 78%;
          display: inline-block;
        }
      }
      .headimg {
        float: left;
        position: relative;
        img {
          width: 1.5rem;
          height: 1.5rem;
        }
        .tuijian {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 0.4rem;
          text-align: center;
          background: @base_color;
          color: #fff;
          line-height: 0.4rem;
        }
      }
      .con_text {
        height: 1.5rem;
        margin-left: 1.8rem;
        position: relative;
        .composite_name {
          font-size: 0.32rem;
        }
        .or_price {
          float: right;
          color: @base_color;
        }
        .composite_brief {
          position: absolute;
          bottom: 0;
        }
      }
    }
  }
  .weui-btn_primary {
    background: @base_color !important;
  }
}
</style>
