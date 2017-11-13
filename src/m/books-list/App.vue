<template>
  <div id="books-list">
    <div v-if="contentshow">
      <div class="banner">
        <img :src="dataInfo.head" alt="">
      </div>
      <p class="title">{{dataInfo.name}}</p>
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
  import { isWeiXin , weixinShare } from 'common/js/common.js';
  import BookList from "components/Books/BookList"
  import TitleBar from "components/TitleBar/TitleBar"
  import LazyLoadingMore from "components/LazyLoadingMore/LazyLoadingMore"
  import Vue from 'vue'
  import {Loading,XHeader,Icon,Scroller,AlertPlugin,querystring,cookie} from 'vux'
  Vue.use(AlertPlugin)
  export default {
    data () {
      return {
        id:0,
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
      BackHome
    },
    beforeCreate(){
      //授权
    },
    created () {
      this.id=querystring.parse()['id']
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
          window.shareData={
            title:res.name,
            link:location.href,
            imgUrl:'http://m.kofuf.com/static/img_h5/h5_logo.png',
            desc:res.brief
          }
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
        createOrder(params).then(response => {
          this.loadingshow = false
          this.createOrderResult(response)
        })
      },
      createOrderResult(res){
        if (res.status!=0) {
          this.message(res.error,'提示',(res)=>{
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
        weixinCheck({id:data.id}).then(response => {
          this.loadingshow = false
          if (response.status!=0) {
            this.message('服务器维护中，您的订单已支付成功，请勿重复支付。如有疑问请联系客服：400-966-7718')
          }else{
            this.message('您可在书架查看已拥有的书籍','恭喜您获得一本有声书',()=>{location.href="/m/home.html";})
          }
          this.createOrderResult(response)
        })
      },
      message(content,title='提示',callback){
        self.$vux.alert.show({
          title: title,
          content: content,
          dialogTransition:"",
          maskTransition:"",
          onHide (){
            callback()
          }
        });
      },
      skip(name){
        window.location.href="/m/"+name;
      }
    }
  }
</script>
<style lang="less">
@import '../../common/css/reset.css';
@import '~vux/src/styles/1px.less';
@import "../index/App.less";
@import './App.less';
</style>
