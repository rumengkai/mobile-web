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
    <footer v-if="contentshow&&!dataInfo.followed">
      <div class="price">
        <span>打包价格： <span> ¥{{dataInfo.channel_price}}</span></span>
      </div>
      <div class="buy" @click="buy">
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
  import { createOrder , weixinCheck } from 'src/api/pay';
  import { toPay } from 'common/js/pay.js';
  import BackHome from "components/BackHome/BackHome"
  import geturlpara from 'common/js/geturlpara.js';
  import { isWeiXin , weixinShare } from 'common/js/common.js';
  import BookList from "components/Books/BookList"
  import TitleBar from "components/TitleBar/TitleBar"
	import LazyLoadingMore from "components/LazyLoadingMore/LazyLoadingMore"
	import ShareMoneyBtn from "components/ShareMoneyBtn/ShareMoneyBtn"
  import Vue from 'vue'
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
        loadingshow: true,
        loadtext: '加载中...',
        contentshow:false,
        dataInfo:{},
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
			ShareMoneyBtn
    },
    beforeCreate(){
      //授权
    },
    created () {
      this.id=this.$geturlpara.getUrlKey("id")//;querystring.parse()['id']
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
          shareData(res.name,res.share_url,res.share_thumb,res.brief)
          weixinShare();
        }
      },
      buy(){
        this.loadingshow=true;
        var params={
          type: config()['paytype'],
          items: this.id,
          order_type:"12"
				}
				if ((!this.shareFrom || this.shareFrom == 'undefined')) {
					if(this.from()!=0){
						params.share_from = this.from()
					}
				}else if ( this.shareFrom && this.shareFrom != 'undefined') {
					params.share_from = this.shareFrom
				}else{
					params.share_from = this.shareFrom
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
              getAuth(cookie,querystring,"member.html");
            }})
        }else{
          console.log("订单创建成功。。");
          this.orderInfo=res;
          toPay(res,this.callback,this);
        }
      },
      callback(data){
        weixinCheck({ id: data.id }).then(response => {
          this.loadingshow = false;
          if (response.status != 0) {
            message("服务器维护中，您的订单已支付成功，请勿重复支付。如有疑问请联系客服：400-966-7718");
          } else {
            toast("购买成功");
            setTimeout(() => {
              location.href="/m/books-my.html";
            }, 1000);
          }
        });
			},
			from(){
				let f = Math.random()*10;
				if(f>8){
					return "87854572"
				}else if(f>5){
					return "92750265"
				}else{
					return 0
				}
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
