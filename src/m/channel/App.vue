<template>
  <div id="channel">
      <div class="content" v-if="showContent">
        <div class="large-img">
          <div class="buy-card" @click="toBuyCard()" v-if="channelsinfo.can_buy">
            <img src="./images/gift.png" alt="">
          </div>
          <div class="name-brief">
            <p class="name">
              {{channelsinfo.name}}
            </p>
            <p class="brief">
              {{channelsinfo.brief}}
            </p>
          </div>
          <img :src="channelsinfo.large_thumb" onerror="this.src='http://image.51xy8.com/1508740825405.jpg'" alt="">
        </div>
        <div v-if="subscription" class="subtab">
          <div class="tab">
            <p><span @click="conList" :class="{focus:isfocus}">内容列表</span></p>
            <p><span @click="channelInfo" :class="{focus:!isfocus}">专栏介绍</span></p>
          </div>
        </div>
        <div class="buy_member" v-if="!subscription&&channelsinfo.member_prices&&channelsinfo.member_prices.length!=0">
          <div class="member-list">
            <p class="member-title">会员折扣价</p>
            <p class="member-price"><span v-for="(item,index) in channelsinfo.member_prices" :key="index">{{item.name}}¥{{item.price}}</span></p>
          </div>
          <p class="buy-now" @click="toActiveMember">
            &nbsp;&nbsp;购买会员
          </p>
        </div>
        <ul class="channels-info" v-if="!isfocus||!subscription">
          <li class="vux-1px-b">
            <p class="title">专栏介绍</p>
            <p class="con" v-html="stringBr(channelsinfo.abstract)"></p>
          </li>
          <li class="vux-1px-b">
            <p class="title">适宜人群</p>
            <p class="con" v-html="stringBr(channelsinfo.suit_crowds)"></p>
          </li>
          <li class="vux-1px-b">
            <p class="title">订阅须知</p>
            <p class="con" v-html="stringBr(channelsinfo.information)"></p>
          </li>
          <li v-if="!subscription">
            <p class="title">最新更新</p>
            <ul class="newupdate">
              <li class="item vux-1px-b" v-for="(item,index) in channelsinfo.articles" :key="index" @click="toDetail(item.id,item.tryout)">
                <img :src="item.thumb" alt="" onerror="this.src='http://image.51xy8.com/1508740825405.jpg?imageView2/1/w/200/h/133/q/100|imageslim'">
                <div v-if="item.tryout" class="try">试 读</div>
                <p class="title">{{item.name}}</p>
                <p class="date">{{item.published | formatDate2}}</p>
              </li>
              <div v-if='!nonecomment' class="comment-bottom">
                <p v-if="loadmore" @click="commentLoad">{{commentBottomMsg}}</p>
                <load-more v-else tip="正在加载">正在加载</load-more>
              </div>
            </ul>
          </li>
        </ul>
        <ul class="channel-list" v-if="isfocus&&subscription">
          <list :datalist="articles.articles"></list>
          <div v-if='!nonecomment' class="comment-bottom">
            <p v-if="loadmore" @click="commentLoad">{{commentBottomMsg}}</p>
            <load-more v-else tip="正在加载">正在加载</load-more>
          </div>
        </ul>
        <!-- 支付行为 -->
        <buy-action v-if="showContent&&!subscription" ref="buy_action" :name="channelsinfo.name" :buyParams="buy_params" :coupons="channelsinfo.coupons" :invalidCoupons="channelsinfo.invalid_coupons" :composite="channelsinfo.composite" :backurl="backurl" v-on:errorFun="errorFun"> </buy-action>
      </div>
    <!-- 底部弹框 -->
    <footer v-if="showContent&&!subscription">
      <div class="freeread" @click="freeRead" v-if="unit!='1期'">
        <span>免费试读</span>
      </div>
      <div class="subscribe" @click="composite_readysub" v-if="unit!='1期'">
        <a>
          <span v-if="buy_params.price!=0">订阅：<span>¥{{buy_params.price}}/{{unit}}</span></span>
          <span v-if="buy_params.price==0">免费领取</span></span>
        </a>
      </div>
      <div class="subscribe_one" @click="composite_readysub" v-if="unit=='1期'">
        <a>
          <span v-if="buy_params.price!=0">订阅专栏：<span>¥{{price}}</span></span>
          <span v-if="buy_params.price==0">免费领取</span></span>
        </a>
      </div>
    </footer>
    <div v-show="showContent&&!(showContent&&!subscription)" class = "openApp">
      <div class="gfcj" @click="toChannels">
        <img src="http://m.51xy8.com/static/img/logo.png" alt="">
        <div class="gf"><p class="p1">微信登陆APP</p><p class="p2">阅读体验更佳</p></div>
      </div>
      <div class="download">
        <a id='btnOpenApp'>打开APP</a>
      </div>
    </div>
    <div class="qr_code_pc_inner">
      <div class="qr_code_pc">
        <img id="js_pc_qr_code_img" class="qr_code_pc_img" src="http://www.51xy8.com/static/images/code.png">
        <p>微信扫一扫<br>学财经，长本事</p>
      </div>
    </div>
    <BackHome></BackHome>
    <Failed v-if="failedshow" :msg="failedmsg"></Failed>
    <Loading v-model="loadingshow" :text="loadtext" ></Loading>
  </div>
</template>

<script>
  import 'common/css/reset.css';
  import 'common/js/config.js';
  import { getChannelInfo , getChannelArticle } from 'src/api/channel';
  import { isWeiXin,weixinShare } from 'common/js/common.js';
  import geturlpara from 'common/js/geturlpara.js';
  import Vue from 'vue'
  import { message , toast } from 'common/js/assembly.js';
  import { formatDate2 } from 'common/js/date.js';
  import {Loading,XHeader,LoadMore,querystring,cookie,XSwitch,XButton} from 'vux'
  import Failed from "components/Failed/Failed"
  import BackHome from "components/BackHome/BackHome"
  import List from "components/List/List"
  import Couponsuse from "components/Couponsuse/Couponsuse"
  import BuyAction from "components/BuyAction/BuyAction"
  import {
    stringBr ,shareData
  } from 'src/common/js/assembly';
  Vue.prototype.$geturlpara=geturlpara
  export default {
    name: 'channel',
    data () {
      return {
        id:0,
        showContent:false,
        loadingshow: true,
        loadtext: 'loading...',
        channelsinfo:{
          suites:[{price:""}],
          articles:[],
          composite:{
            items:[]
          }
        },
        information:"",
        failedshow:false,
        failedmsg:"服务请求失败，请刷新重试",
        nonecomment:false,
        loadmore:true,
        commentBottomMsg:"点击，获取更多数据",
        pn:0,
        subscription:false,//是否订阅
        isfocus:true,
        articles:{'articles':[],'has_next':true},
        unit:"年",
        backurl:"/m/channels.html",
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
          order_type:"",
        }
      }
    },
    components: {
      XHeader,
      Loading,
      LoadMore,
      Failed,
      List,
      BackHome,
      XSwitch,
      Couponsuse,
      XButton,
      BuyAction
    },
    beforeCreate(){
      if(isWeiXin()){
        //授权
        var id = this.$geturlpara.getUrlKey("id");
        getAuth(cookie,querystring,"channel",id);
      }
    },
    created () {
      var id = this.$geturlpara.getUrlKey("id");
      this.id=id;
      this.buy_params.buy_id=id;
      this.fetchData(id);
      this.commentLoad(id);
    },
    mounted(){
      //唤起app
      new Mlink({
        mlink: "https://ah88dj.mlinks.cc/AK8j?id="+this.id,
        button: document.querySelector('a#btnOpenApp'),
        autoLaunchApp : false,
      });
    },
    methods: {
      toChannels(){
        window.location.href="/m/home.html"
      },
      toBuyCard(){
        window.location.href="/m/gift-card-buy.html?id="+this.id;
      },
      //获取专栏数据数据
      fetchData(id){
        getChannelInfo({"id":id}).then(response => {
          this.loadingshow = false
          this.fetchResult(response)
        })
        setTimeout(()=>{
          this.loadingshow=false;
        },10000);
      },
      fetchResult(data){
        if (data.type==1) {
          /* 跳往单品 */
          window.location.href="/m/channel-small.html?id="+this.id;
        }else if (!data.is_login&&data.is_login!=undefined&&isWeiXin()&&localStorage.getItem("gid")) {
          this.errorFun()
        }else{
          Object.assign(this.channelsinfo,data);
          console.log(this.channelsinfo);
          this.buy_params.can_buy=data.can_buy;
          this.buy_params.channel_price=data.channel_price;
          if (this.channelsinfo.channel_price>=0) {
            this.buy_params.price=this.channelsinfo.channel_price;
          }else{
            this.buy_params.price=this.channelsinfo.suites[0].price;
          }
          document.title = "专栏-"+data.name;
          this.loadingshow=false;
          this.subscription=data.followed;
          this.unit=data.price_unit;
          this.showContent=true;
          shareData(data.name,location.href,data.thumb,data.share)
          weixinShare();
        }
      },
      toDetail(id,tryout){
        if (!tryout) {
          toast("请订阅后查看")
        }else{
          window.location.href="/m/detail.html?id="+id;
        }
      },
      freeRead(){
        var id = this.$geturlpara.getUrlKey("id");
        window.location.href="/m/freeread.html?id="+id;
      },
      commentLoad(){
        this.loadmore=false;
        var id = this.$geturlpara.getUrlKey("id");
        if (id) {
          if (!this.articles.has_next) {
            this.loadmore=true;
          }else {
            getChannelArticle({"id":id,"pn":this.pn}).then(res=>{
              if (res.status==0) {
                this.loadmore=true;
                if (!res.has_next) {
                  this.commentBottomMsg="没有更多数据";
                }else{
                  this.pn++;
                }
                this.channelsinfo.articles=this.channelsinfo.articles.concat(res.articles);
                this.articles.articles=this.articles.articles.concat(res.articles);
                this.articles.has_next=res.has_next;
              }
            })
          }
        }
      },
      conList(){
        this.isfocus=true;
      },
      channelInfo(){
        this.isfocus=false;
      },
      errorFun(){
        localStorage.clear();
        clearcookie(cookie);
        getAuth(cookie, querystring, "channel",this.id);
      },
      //订阅支付前，免费领取
      composite_readysub(){
        console.log(this.$refs.buy_action);
        this.$refs.buy_action.composite_readysub()
      },
      toActiveMember(){
        window.location.href="/m/member.html"
      },
      stringBr
    },
    filters: {
      formatDate2:function (time) {
        var date = new Date(time);
        var nowDate = new Date();
        if ((formatDate2(new Date(time),'yyyy')-formatDate2(nowDate,'yyyy'))<0) {
          return formatDate2(date, "yyyy年MM月dd日");
        }else{
          return formatDate2(date, "MM月dd日");
        }
      }
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
@import "../index/App.less";
@import './App.less';
</style>
