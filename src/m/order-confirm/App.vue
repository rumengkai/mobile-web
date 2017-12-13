<template>
  <div id="order-confirm">
    <div class="content" v-if="showContent">
      <group class="header" v-if="haveAddress">
        <cell :title="dataInfo.receiver.name" :value="dataInfo.receiver.phone" value-align="left"></cell>
        <cell title="收货地址：" value-align="left" is-link @click.native="toAddress()">{{addresseAll}} </cell>
      </group>
      <group class="header" v-if="!haveAddress">
        <cell title="选择收货地址" value-align="left" is-link @click.native="toAddress()"></cell>
      </group>
      <good-list :items="gooddata" line="line" dh=""></good-list>
    </div>
    <footer class="price-buy">
      <div class="price">
        <span>合计： <span> ¥{{ price }}</span></span>
      </div>
      <div class="buy" @click="confirm">
        <a>
          <span>提交订单</span>
        </a>
      </div>
    </footer>
    <Loading v-model="loadingshow" :text="loadtext" ></Loading>
  </div>
</template>

<script>
import 'common/css/reset.css';
import 'common/js/config.js';
import AjaxServer from 'common/js/ajaxServer.js';
import {isWeiXin} from 'common/js/common.js';
import { getCheckComposite } from 'src/api/goods';
import { payFree , createOrder , weixinCheck } from 'src/api/pay';
import { toPay } from 'common/js/pay';
import { message , toast } from 'common/js/assembly.js';
import { Group,Cell,Loading,AlertPlugin,cookie,querystring,XButton} from 'vux'
import GoodList from 'components/GoodList/GoodList';
import geturlpara from 'common/js/geturlpara.js';
import Vue from 'vue';
Vue.use(AlertPlugin)
Vue.prototype.$geturlpara=geturlpara;
export default {
  components: {
    Group,
    Cell,
    Loading,
    XButton,
    GoodList,
  },
  data () {
    return {
      id:0,
      title:"title",
      showContent:false,
      loadingshow: true,
      loadtext: '加载中...',
      dataInfo:{receiver:{name:"",phone:"",uuid:""}},
      price:"",
      addresseAll:"",
      gooddata:[],
      haveAddress:false,
      order_type:"",
    }
  },
  created () {
    this.id=this.$geturlpara.getUrlKey("id");
    this.order_type=this.$geturlpara.getUrlKey("type");
    this.dataInfo.receiver.uuid = querystring.parse().uuid
    if (isWeiXin()) {
      this.fetchData(this.id);
    }
  },
  methods: {
    fetchData(id){
      getCheckComposite({"id":id,"uuid":this.dataInfo.receiver.uuid}).then(res=>{
        this.gooddata = res.composite.items;
        res.composite.channel_price>0?this.price=res.composite.channel_price:this.price=res.composite.price
        this.dataInfo.receiver = res.receiver;
        if (res.receiver) {
          this.haveAddress=true;
          this.addresseAll=res.receiver.address.replace(/@/g," ");
        }
        this.loadingshow = false;
        this.showContent = true;
      })
    },
    confirm(data){
      if(!this.dataInfo.receiver.uuid){
        toast("请选择地址")
        return
      }
      this.loadingshow=true;
      //如果价格为0，则免费领取
      if (this.price == "0") {
        var params = {
          type: config()["paytype"],
          items: this.id,
          order_type:8,
          receive_id:this.dataInfo.receiver.uuid
        };
        payFree(params).then(res => {
          this.loadingshow = false;
          message("恭喜您，领取成功", "提示", () => {
            location.href = "/m/order.html";
          });
        });
      }else{
        this.buy();
      }
    },
    buy(){
      this.loadingshow=true;
      var params={
        type: config()['paytype'],
        items: this.id,
        order_type:this.order_type,
        receive_id:this.dataInfo.receiver.uuid
      }
      createOrder(params).then(response => {
        this.loadingshow = false
        this.createOrderResult(response)
      })
    },
    createOrderResult(res){
      if (res.status!=0) {
        message(res.error,'提示',(res)=>{
          if(res.status==5){
            localStorage.clear();
            clearcookie(cookie);
            getAuth(cookie,querystring,"order-confirm.html?id="+this.id+"&type="+this.type);
          }})
      }else{
        console.log("订单创建成功。。");
        this.orderInfo=res;
        toPay(res,this.callback,this);
      }
    },
    callback(data){
      weixinCheck({id:data.id}).then(response => {
        this.loadingshow = false
        if (response.status!=0) {
          message('服务器维护中，您的订单已支付成功，请勿重复支付。如有疑问请联系客服：400-966-7718')
        }else{
          toast("购买成功")
          location.href="/m/channels.html"
        }
      })
    },
    toAddress(){
      window.location.href="/m/address.html?id="+this.id+"&type=order-confirm"+"&order_type="+this.order_type;
    },
  }
}
</script>
<style lang="less">
@import '~vux/src/styles/1px.less';
@import "../index/App.less";
@import './App.less';
</style>
