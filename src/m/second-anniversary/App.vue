<template>
  <div id="second-anniversary">
    <div class="con" v-if="showContent&&active">
      <div class="header">
        <img src="./images/bg-1.png" alt="">
      </div>
      <div class="active-time">
        <ul>
          <li v-for="(item,index) in dataInfo.items" v-bind:class="{ active:flag==index }" @click="tabChange(index)">
            <div class="tab">
              <p class="p-1">{{item.week}}</p>
              <p class="p-2">{{item.date}}</p>
            </div>
            <p class="tab-title">{{item.name}}</p>
            <img src="./images/bline.png" alt="">
          </li>
        </ul>
        <div class="channels" >
          <img class="model-title" src="./images/xsyh.png" alt="">
          <p class="one-time">{{dataInfo.items[flag].date}}</p>
          <div class="sub-list" v-for="item in dataInfo.items[flag].items" @click="toChannel(item)">
            <div class="img">
              <img :src="item.thumb" alt="礼包">
            </div>
            <div class="info">
              <p class="title ell">
                {{item.name}}
              </p>
              <p class="author-name">
                {{item.author_name}}
              </p>
              <p class="price ell">
                <span>限时价：</span>
                <span>¥{{item.channel_price}}</span>
                <s class="del"> ¥{{item.price}}</s>
              </p>
              <div class="btn" v-bind:class="{ btnd:item.followed||!item.followed&&dataInfo.items[flag].state==0}" @click.stop="subscribe(item)">
                <span v-if="item.followed">已订</span>
                <span v-else-if="dataInfo.items[flag].state!=0">订阅</span>
                <span v-else>未开始</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="hdsm">
        <img class="model-title" src="./images/hdsm.png" alt="">
        <p class="hdsm-p">1、活动期间内，只对功夫财经会员有效。</p>
        <p class="hdsm-p">2、会员购买每周特惠专栏，均享受年度最低价。</p>
        <p class="hdsm-p">3、活动截止前，累计购买5个专栏的用户即可得到神秘功夫钱袋子（内含至少两种礼品）及功夫财经两周年专属徽章。</p>
        <p class="hdsm-p">4、参与活动的专栏《如松话投资—投资的精髓》、《郎咸平沃顿投资课》、《中国经济的50个关键词》、《老端的投资秘籍》、《个人晋级二十条》、《由富及贵—带你打入精英圈》、《重·点》、《投资的艺术》。</p>
        <p class="hdsm-p">5、神秘钱袋子礼品需要在11月30日前，于本页下方主动兑换领取，礼品在12月发货。未主动领取，视为自动放弃，不予补偿。</p>
        <p class="hdsm-p">6、在法律许可的范围内，功夫财经保留变更、调整、终止本活动之权利并有权调整或变更本活动规则并于相关渠道公告后生效。</p>
      </div>
      <div class="nydy">
        <img class="model-title" src="./images/nydy.png" alt="" v-if="dataInfo.subs.length!=0">
        <ul>
          <li v-for="item in dataInfo.subs">
            <img :src="item.thumb" alt="">
            <!-- <span>{{item.author_name}}</span> -->
          </li>
        </ul>
      </div>
      <div class="qdz">
        <img class="model-title" src="./images/qdz.png" alt="">
        <img class="img-qdz" src="./images/kefu.png" alt="">
      </div>
    </div>
    <div class="bottom-btn" v-show="showContent&&active&&(!dataInfo.has_money_bag||dataInfo.level==0)">
      <div class="buy-qdz" v-if="!dataInfo.has_money_bag" @click="toQdz()">领取钱袋子</div>
      <div class="buy-member" v-if="dataInfo.level==0" @click="toMember()">成为会员</div>
    </div>
    <div class="endactive" v-show="!active">
      <img src="./images/endtime_2.png" alt="">
      <p class="p1">活动已结束</p>
    </div>
    <Loading v-model="loadingshow" :text="loadtext" ></Loading>
  </div>
</template>

<script>
  import 'common/css/reset.css';
  import 'common/js/config.js';
  import Vue from 'vue';
  import {isMobile , isWeiXin , weixinShare} from 'common/js/common.js';
  import {Loading,querystring,cookie,AlertPlugin} from 'vux'
  import AjaxServer from 'common/js/ajaxServer.js';
  import { toPay } from 'common/js/pay.js';
  Vue.use(AlertPlugin)
  export default {
    name: 'second-anniversary',
    data () {
      return {
        loadingshow:true,
        active:true,
        loadtext:"加载中。。。",
        showContent:false,
        dataInfo:{},
        flag:0,
      }
    },
    components: {
      Loading,
    },
    beforeCreate(){
      if(isWeiXin()){
        window.shareData={
          title:'两周年 · 功夫财经',
          link:'http://m.kofuf.com/m/second-anniversary.html',
          imgUrl:'http://m.kofuf.com/static/img_h5/h5_logo.png',
          desc:"功夫·两周年  限时劲省4225元！"
        }
        weixinShare(Vue);
      }
      if(isMobile()&&!isWeiXin()){
        window.location.href='/h5/html/second-anniversary.html'
      }else{
        //授权
        getAuth(cookie,querystring,"second-anniversary.html");
      }
    },
    mounted () {
      this.fetchData();
    },
    methods: {
      toQdz(){
        if (this.dataInfo.subs.length<5) {
          this.$vux.alert.show({
            title: '提示',
            content: "您还需购买"+(5-this.dataInfo.subs.length)+"个专栏，才能领取钱袋子",
            dialogTransition:"",
            maskTransition:"",
          });
        }else if(HOSTM=="http://dev.kofuf.com"){
          window.location.href="/m/good.html?id=1215";
        }else{
          window.location.href="/m/good.html?id=3167";
        }
      },
      toMember(){
        if (this.dataInfo.level>0) {
          this.$vux.alert.show({
            title: '提示',
            content: "您已经是会员，请勿重复购买",
            dialogTransition:"",
            maskTransition:"",
          });
        }else{
          window.location.href="/m/member.html";
        }
      },
      toChannel(item){
        window.location.href="/m/channel.html?id="+item.id;
      },
      tabChange(index){
        console.log(index);
        this.flag=index;
      },
      //获取专栏数据数据
      fetchData(){
        var url=HOST+'/api/two_years/big_surprise.json';
        var data={};
        AjaxServer.httpGet(Vue,url,data,this.fetchResult);
      },
      fetchResult(res){
        var self=this;
        if (res.status!=0&&isWeiXin()&&localStorage.getItem("gid")) {
          if(res.status==5){
            localStorage.setItem("gid","");
            localStorage.clear();
            clearcookie(cookie);
            getAuth(cookie,querystring,"second-anniversary.html");
          }
        }else if(res.status==0){
          self.dataInfo=res;
          res.items.map((item,index)=>{
            if(item.state==1){
              self.flag=index;
            }
          })
          self.loadingshow=false;
          self.showContent=true;
        }
      },
      //订阅支付
      subscribe:function (item) {
        var self = this;
        if (self.dataInfo.items[this.flag].state!==1) {
          return 0;
        }
        if (self.dataInfo.level===0&&!item.followed) {
          this.$vux.alert.show({
            title: '提示',
            content: "请成为会员后购买！",
            dialogTransition:"",
            maskTransition:"",
          });
          return 0;
        }
        if(!item.followed){
          if (localStorage.getItem("gid")) {
            self.loadtext="加载中..."
            self.loadingshow=true;
            //发起订单请求
            AjaxServer.httpPost(
              Vue,
              HOST+"/pay/weixin/create_order",
              {
                type: "JSAPI",
                items: item.id,
              },
              (data)=>{
                self.loadingshow=false;
                if (data.status!=0) {
                  this.$vux.alert.show({
                    title: '提示',
                    content: "创建订单失败",
                    dialogTransition:"",
                    maskTransition:"",
                    onHide (){
                      console.log("订单创建失败");
                      if(data.status==5){
                        localStorage.setItem("gid","");
                        localStorage.clear();
                        clearcookie(cookie);
                        getAuth(cookie,querystring,"second-anniversary.html");
                      }
                    }
                  });
                }else{
                  self.loadingshow=false;
                  console.log("订单创建成功。。");
                  self.orderInfo=data;
                  toPay(data,self.callback,self);
                }
              },
              (err)=>{
                console.log(err);
                console.log("订单创建失败");
                this.$vux.alert.show({
                  title: '提示',
                  content: "网络异常，请稍后重试",
                  dialogTransition:"",
                  maskTransition:"",
                });
                self.loadingshow=false;
              }
            );
          }else{
            getAuth(cookie,querystring,"second-anniversary.html");
          }
        }
      },
      //支付成功回调
      callback(data){
        var self=this;
        AjaxServer.httpPost(
          Vue,
          HOST+"/pay/weixin/check",
          {
            id:data.id
          },
          (data)=>{
            if (data.status!=0) {
              self.$vux.alert.show({
                title: '提示',
                content: "服务器维护中，您的订单已支付成功，请勿重复支付。如有疑问请联系客服：400-966-7718",
                dialogTransition:"",
                maskTransition:"",
              });
            }else{
              //重新请求数据，刷新
              self.loadingshow=true;
              self.fetchData();
            }
          }
        );
      },
    }
  }
</script>
<style lang="less">
@import '~vux/src/styles/1px.less';
@import "../index/App.less";
@import './App.less';
</style>
