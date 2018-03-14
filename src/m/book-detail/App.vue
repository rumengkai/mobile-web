<template>
  <div id="book-detail">
    <audio src=""> </audio>
    <div v-if="contentshow">
      <div class="book-detail-header">
        <div class="book-img">
          <img :src="dataInfo.thumb" alt="">
        </div>
        <div class="right">
          <p class="ell-2">{{dataInfo.name}}</p>
          <p class="author_name">{{dataInfo.author_name}}</p>
          <p class="wj" v-if="dataInfo.finished">未完结</p>
          <p class="wj" v-else>已完结</p>
          <p class="price">¥{{dataInfo.channel_price}} <span class="oldprice">¥{{dataInfo.price}}</span></p>
        </div>
      </div>
      <div v-if="dataInfo.type==0">
        <p class="brief" ref="brief">{{dataInfo.brief}}</p>
        <p v-if="flag" class="zhankai" @click="zhankai(1)">展开</p>
        <p v-else class="zhankai" @click="zhankai(0)">收起</p>
        <div v-bind:class="{'audio-box-active':music!='','audio-box':music==''}" v-if="music!=''" ref="audiodev">
          <p class="p-title">正在播放：<span>{{audioname}}</span></p>
          <audiobox :music="music" ref="audiobox"></audiobox>
        </div>
        <group>
          <cell v-for="(item,index) in dataInfo.items" :title="item.title" is-link @click.native="play(item)" :key="index">
            <span class="tryout" v-if="item.tryout">试听</span>{{item.audio_length | audioFormat}}
          </cell>
        </group>
      </div>
      <div v-else class="teacher">
        <div class="teacher-aricle vux-1px-t">
          <p class="title">目录</p>
          <li class="vux-1px-b" v-for="(item,index) in dataInfo.items" :key="index" @click="skipDetail('detail.html?id='+item.id)">
            <img :src="item.thumb" alt="">
            <p>{{item.name}}</p>
          </li>
        </div>
        <div>
          <div class="teacher-brief">
            <p class="title">简介</p>
            <p class="con" v-html="stringBr(dataInfo.brief)"></p>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-btn" v-show="contentshow">
      <div class="bookshelf" v-if="!dataInfo.followed" @click="shelf()">放入书架</div>
      <div class="bookshelf" v-else @click="shelf()">移除书架</div>
      <div class="buy-now" v-if="!dataInfo.subed" @click="buy()">立即购买</div>
    </div>
    <back-home></back-home>
    <loading v-model="loadingshow" :text="loadtext"></loading>
  </div>
</template>

<script>
  import 'common/js/config.js';
  import { getBooksDetail , addShelf , delShelf} from 'src/api/books';
  import { payFree , createOrder , weixinCheck } from 'src/api/pay';
	import { toPay } from 'common/js/pay.js';
  import { audioFormat } from 'src/utils/';
  import {
    stringBr , toast , shareData ,message
  } from 'src/common/js/assembly';
  import Audiobox from "components/Audio/Audio"
  import BackHome from "components/BackHome/BackHome"
  import { isWeiXin , weixinShare} from 'common/js/common.js';
  import TitleBar from "components/TitleBar/TitleBar"
  import LazyLoadingMore from "components/LazyLoadingMore/LazyLoadingMore"
  import Vue from 'vue'
  import geturlpara from 'common/js/geturlpara.js';
  Vue.prototype.$geturlpara=geturlpara

  import {Loading,XHeader,Group,Cell,Icon,Scroller,AlertPlugin,querystring,cookie} from 'vux'
  Vue.use(AlertPlugin)
  export default {
    data () {
      return {
        id:0,
        loadingshow: true,
        loadtext: '加载中...',
        contentshow:false,
        dataInfo:{},
        flag:true,
        music:'',
        audioname:''
      }
    },
    components: { Icon, XHeader, Loading, TitleBar, LazyLoadingMore, BackHome, Group, Cell , Audiobox},
    beforeCreate(){
    },
    created () {
      this.id=this.$geturlpara.getUrlKey("id")//querystring.parse()['id']
      if(isWeiXin()){
        var path=location.pathname.replace('/m/','')
        getAuth(cookie,querystring,path+"?id="+this.id)
      }
      this.fetchData();
      setTimeout(()=>{
        this.loadingshow = false
      },5*1000)
    },
    filters: {
      audioFormat:audioFormat
    },
    methods: {
      //获取数据
      fetchData(){
        getBooksDetail({id:this.id}).then(response => {
          this.loadingshow = false
          this.fetchResult(response)
        })
      },
      fetchResult(res){
        if (res.status==0) {
          this.dataInfo=res;
          if(res.type==1) document.title = "书籍推荐";
          this.contentshow=true;
          /* 分享设置 */
          shareData(res.name,location.href,res.share_thumb,res.brief)
          weixinShare(Vue);
        }
      },
      buy(){
				this.loadingshow=true;
        var params={
          type: config()['paytype'],
          items: this.id,
          order_type:"11"
				}
				if (this.dataInfo.channel_price == '0.0' || this.dataInfo.channel_price == '0') {
					payFree(params).then(res => {
						this.loadingshow = false;
						message("恭喜您，领取成功", "提示", () => {
							location.href = "/m/books.html";
						});
					});
				}else{
					createOrder(params).then(response => {
						this.loadingshow = false
						this.createOrderResult(response)
					})
				}
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
      skip(name){
        window.location.href="/m/"+name;
      },
      skipDetail(name){
        if(!this.dataInfo.subed){
          toast("请购买后阅读")
        }else {
          window.location.href="/m/"+name;
        }
      },
      shelf(){
        if (!this.dataInfo.followed) {
          addShelf({id:this.id}).then(response => {
            this.loadingshow = false
            toast('添加成功')
            this.fetchData()
          })
        }else{
          delShelf({id:this.id}).then(response => {
            this.loadingshow = false
            toast('移除成功')
            this.fetchData()
          })
        }
      },
      zhankai(flag){
        if (flag) {
          this.$refs.brief.style.height="auto"
        }else{
          console.log(0);
          this.$refs.brief.style.height="1.1rem"
        }
        this.flag=!this.flag;
      },
      play(item){
        if (!item.tryout&&item.audio==="") {
          toast("请订阅后收听")
        }else{
          this.music = item.audio
          this.audioname=item.title
          setTimeout(()=>{
            this.$refs.audiobox.inits()
            this.$refs.audiobox.onlyplay()
          },0)
        }
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
