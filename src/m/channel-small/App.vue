<template>
  <div id="channel-small">
    <div class="content" v-if="showContent">
      <div class="large-img">
        <div class="name-brief">
          <p class="name">
            {{channelsinfo.name}}
          </p>
          <p class="brief">
            {{channelsinfo.brief}}
          </p>
        </div>
        <img :src="channelsinfo.large_thumb" onerror="this.src='http://static1.kofuf.com/1508740825405.jpg'" alt="">
      </div>
      <group class="author-info">
        <cell title="" value="" is-link @click.native="toMoments(channelsinfo.author)">
          <p class="p-1">{{channelsinfo.author.name}}</p>
          <p class="p-2">{{channelsinfo.author.brief}}</p>
          <img slot="icon" :src="channelsinfo.author.photo" alt="头像">
        </cell>
      </group>
      <ul class="channels-info">
        <li class="vux-1px-b" v-if="channelsinfo.abstract_position=='top'">
          <p class="title">简介</p>
          <p class="con" v-html="channelsinfo.abstract"></p>
        </li>
        <li>
          <p class="title" v-show="channelsinfo.articles.length!=0">{{channelsinfo.list_title}}</p>
          <group v-if="channelsinfo.list_style=='title'">
            <cell v-for="item in channelsinfo.articles" :title="item.name" value="" is-link @click.native="toDetail(item)"></cell>
          </group>
          <div class="newupdate" v-if="channelsinfo.list_style=='abstract'">
            <li class="item vux-1px-b" v-for="item in channelsinfo.articles" @click="toDetail(item)">
              <img :src="item.thumb" alt="" onerror="this.src='http://static1.kofuf.com/1508740825405.jpg?imageView2/1/w/200/h/133/q/100|imageslim'">
              <div v-if="item.tryout" class="try">试 读</div>
              <p class="title">{{item.name}}</p>
              <p class="date">{{item.published | formatDate2}}</p>
            </li>
          </div>
        </li>
        <li class="vux-1px-b" v-if="channelsinfo.abstract_position=='bottom'">
          <p class="title">简介</p>
          <p class="con" v-html="channelsinfo.abstract"></p>
        </li>
      </ul>
      <div class="popup1" v-if="showContent&&!subscription">
        <popup v-model="showlist" height="100%" position="bottom">
          <div class="popup12">
              <p class="p1">可用优惠券</p>
              <Couponsuse :couponData="channelsinfo.coupons" v-on:getCoupons="CouponsSelected"></Couponsuse>
              <div v-if="channelsinfo.invalid_coupons">
                <p class="p1" v-if="channelsinfo.invalid_coupons.length">不可用优惠券</p>
              </div>
              <Couponsuse :couponData="channelsinfo.invalid_coupons" state="3"></Couponsuse>
            <div class="cancelCoupons">
              <x-button @click.native="cancelCoupons">暂不使用优惠券</x-button>
            </div>
          </div>
        </popup>
      </div>
      <div class="" v-if="showContent&&!subscription&&channelsinfo.composite_channel">
        <popup v-model="show_composite_channel" max-height="50%" position="bottom">
          <div class="composite">
              <p class="p1">
                组合专栏优惠价
                <span class="com_price">¥{{channelsinfo.composite_channel.channel_price}}
                </span><s class="ori_price">&nbsp;¥{{channelsinfo.composite_channel.price}}</s>
              </p>
              <ul class="">
                <li>
                  <div class="headimg">
                    <img :src="channelsinfo.composite_channel.channels[0].thumb" alt="">
                  </div>
                  <div class="con_text">
                    <p class="composite_channel_name">{{channelsinfo.composite_channel.channels[0].name}}<span class="or_price">¥{{channelsinfo.composite_channel.channels[0].price}}</span></p>
                    <p class="composite_channel_brief">{{channelsinfo.composite_channel.channels[0].brief}}</p>
                  </div>
                </li>
                <div class="center_plus">
                  <img  src="./images/plus_03.png" alt="">
                </div>
                <li @click="toChannelsTuiJian(channelsinfo.composite_channel.channels[1])">
                  <div class="headimg">
                    <img :src="channelsinfo.composite_channel.channels[1].thumb" alt="">
                    <span class="tuijian">推荐</span>
                  </div>
                  <div class="con_text">
                    <p class="composite_channel_name">{{channelsinfo.composite_channel.channels[1].name}}<span class="or_price">¥{{channelsinfo.composite_channel.channels[1].price}}</span></p>
                    <p class="composite_channel_brief">{{channelsinfo.composite_channel.channels[1].brief}}</p>
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
      <popup v-model="showpopup" max-height="60%">
          <div class="popup2">
            <group>
              <cell title="您将订阅" :value="channelsinfo.name"></cell>
              <cell title="支付金额" >¥{{coupon_price}}</cell>
              <cell :title="couponsname" :value="couponstext" is-link @click.native="showCouponsList"></cell>
            </group>
            <div style="padding:20px 15px;">
              <x-button type="primary" @click.native="subscribe">立即购买</x-button>
              <x-button @click.native="showpopup = false">取消</x-button>
            </div>
          </div>
      </popup>
    </div>
    <!-- 底部弹框 -->
    <footer v-if="showContent&&!subscription">
        <div class="subscribe" @click="composite_readysub">
          <a>
            <span v-if="price!='0'">{{channelsinfo.level_name?channelsinfo.level_name+'价':'订阅'}}：<span>¥{{price}}</span></span>
            <span v-if="price=='0'">免费领取</span></span>
          </a>
        </div>
    </footer>
    <div class="qr_code_pc_inner">
      <div class="qr_code_pc">
        <img id="js_pc_qr_code_img" class="qr_code_pc_img" src="http://www.kofuf.com/static/images/code.png">
        <p>微信扫一扫<br>学财经，长本事</p>
      </div>
    </div>
    <dev v-show="showContent&&!(showContent&&!subscription)" class = "openApp">
      <div class="gfcj" @click="toChannels()">
        <img src="https://m.kofuf.com/static/img/logo.png" alt="">
        <div class="gf"><p class="p1">微信登陆APP</p><p class="p2">阅读体验更佳</p></div>
      </div>
      <div class="download">
        <a id='btnOpenApp'>打开APP</a>
      </div>
    </dev>
    <BackHome></BackHome>
    <Failed v-if="failedshow" :msg="failedmsg"></Failed>
    <Loading v-model="loadingshow" :text="loadtext" ></Loading>
  </div>
</template>

<script>
  import 'common/css/reset.css';
  import 'common/js/config.js';
  import {isWeiXin,weixinShare} from 'common/js/common.js';
  import AjaxServer from 'common/js/ajaxServer.js';
  import geturlpara from 'common/js/geturlpara.js';
  import { toPay } from 'common/js/pay.js';
  import Vue from 'vue'
  import { formatDate2 } from 'common/js/date.js';
  import {Loading,XHeader,LoadMore,AlertPlugin,ToastPlugin,querystring,cookie,Popup,XSwitch,Group,Cell,XButton} from 'vux'
  import Failed from "components/Failed/Failed"
  import BackHome from "components/BackHome/BackHome"
  import Couponsuse from "components/Couponsuse/Couponsuse"
  import VueResource from 'vue-resource'
  Vue.use(VueResource)
  Vue.use(ToastPlugin)
  Vue.use(AlertPlugin)
  Vue.prototype.$geturlpara=geturlpara
  export default {
    data () {
      return {
        id:0,
        buy_id:0,
        showContent:false,
        loadingshow: true,
        loadtext: 'loading...',
        channelsinfo:{
          suites:[{price:""}],
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
        disable:true,
        articles:{'articles':[],'has_next':true},
        price:0,
        price:0,
        unit:"年",
        coupon_id:"",
        showpopup:false,
        showlist:false,
        couponstext:"选择优惠券",
        couponsname:"优惠券",
        show_composite_channel:false,
        order_type:"",
      }
    },
    components: {
      XHeader,
      Loading,
      LoadMore,
      Failed,
      BackHome,
      Popup,
      Group,
      XSwitch,
      Cell,
      Couponsuse,
      XButton
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
      this.buy_id=id;
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
      toMoments(item){
        window.location.href="/m/moments.html?id="+item.id
      },
      toBuyCard(){
        window.location.href="/m/gift-card-buy.html?id="+this.id;
      },
      //获取专栏数据数据
      fetchData(id){
        var self = this;
        AjaxServer.httpGet(
          Vue,
          HOST+'/api/channels/'+id+'.json',
          {},
          (data)=>{
            if (!data.is_login&&data.is_login!=undefined&&isWeiXin()&&localStorage.getItem("gid")) {
              localStorage.setItem("gid","");
              localStorage.clear();
              clearcookie(cookie);
              var id = this.$geturlpara.getUrlKey("id");
              getAuth(cookie,querystring,"channel",id);
            }else{
              this.channelsinfo=data;
              this.loadingshow=false;
              if (this.channelsinfo.channel_price>=0) {
                this.price=this.channelsinfo.channel_price;
              }else{
                this.price=this.channelsinfo.suites[0].price;
              }
              if(this.channelsinfo.status!=0){
                this.failedmsg=this.channelsinfo.error;
                this.failedshow=true;
              } else{
                data.abstract=data.abstract.replace(/[\n]/g,"<br/>") ;
                data.suit_crowds=data.suit_crowds.replace(/[\n]/g,"<br/>") ;
                //正则匹配，处理information
                data.information=data.information.replace(/[\n]/g,"<br/>") ;
                this.loadingshow=false;
                document.title = "专栏-"+data.name;
                self.subscription=data.followed;
                self.unit=data.price_unit;
                this.showContent=true;
                window.shareData={
                  title:data.name,
                  link:HOSTM+'/m/channel.html?id='+data.id+'',
                  imgUrl:'https://m.kofuf.com/static/img_h5/h5_logo.png',
                  desc:data.brief
                }
                weixinShare(Vue);
              }
            }
            if(data.status!=0){
              this.loadingshow=false;
              failedmsg=data.error;
              self.failedshow=true;
            }
          },
          (err)=>{
            this.loadingshow=false;
            console.log(err);
          }
        );
        setTimeout(()=>{
          self.loadingshow=false;
        },10000);
      },
      share(){
        console.log("share");
      },
      toDetail(item){
        if (this.subscription) {
          window.location.href="/m/detail.html?id="+item.id;
        }else{
          if (!item.tryout) {
            this.$vux.toast.show({
              text: '请订阅后查看',
              position:'bottom',
              time:3000,
              width:'10em',
              type:'text'
            })
          }else{
            window.location.href="/m/detail.html?id="+item.id;
          }
        }
      },
      freeRead(){
        var id = this.$geturlpara.getUrlKey("id");
        window.location.href="/m/freeread.html?id="+id;
      },
      //订阅支付
      composite_readysub(){
        var self=this;
        getAuth(cookie,querystring,"channel",this.id);
        //如果价格为0，则免费领取
        if (this.price=="0") {
          var url="/pay/orders/pay_free";
          AjaxServer.httpPost(
            Vue,
            HOST+url,
            {
              type: config()['paytype'],
              items: self.buy_id,
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
                self.$vux.alert.show({
                  title: '提示',
                  content: "恭喜您，领取成功",
                  dialogTransition:"",
                  maskTransition:"",
                  onHide (){
                    location.href="/m/channels.html";
                  }
                });
              }
            })
        }else{
          if (this.channelsinfo.composite_channel) {
            var self=this;
            self.show_composite_channel=true;
          }else{
            this.readysub();
          }
        }
      },
      oneBuySubscribe(){
        this.show_composite_channel=false;
        this.buy_id=this.channelsinfo.composite_channel.id;
        this.coupon_id='';
        this.order_type=3;
        this.subscribe();
      },
      readysub(){
        var self=this;
        self.show_composite_channel=false;
        self.showpopup=true;
        self.couponstext=self.channelsinfo.coupons.length+"张券可用"
        if(self.channelsinfo.coupons.length){
          self.coupon_id=self.channelsinfo.coupons[0].id;
          self.couponsname=self.channelsinfo.coupons[0].name;
          self.couponstext="已抵扣¥"+self.channelsinfo.coupons[0].discount;
          self.coupon_price=self.channelsinfo.coupons[0].coupon_price;
        }else{
          if (self.channelsinfo.channel_price>=0) {
            self.coupon_price=self.channelsinfo.channel_price;
          }else{
            self.coupon_price=self.channelsinfo.suites[0].price;
          }
        }
      },
      subscribe(){
        var self=this;
        self.showpopup=false;
        console.log(this.disable);
        //已登陆情况
        if (localStorage.getItem("gid")&&this.disable) {
          self.loadtext="加载中..."
          self.loadingshow=true;
          this.disable=false;
          //发起订单请求
          var url="/pay/weixin/create_order"
          AjaxServer.httpPost(
            Vue,
            HOST+url,
            {
              type: config()['paytype'],
              items: self.buy_id,
              coupon_id:self.coupon_id,
              order_type:self.order_type
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
                    self.disable=true;
                    if(data.status==5){
                      localStorage.clear();
                      clearcookie(cookie);
                      getAuth(cookie,querystring,"channel",id);
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
              self.disable=true;
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
          //未登陆情况，跳转到授权
          getAuth(cookie,querystring,"channel",this.id);
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
            // alert(JSON.stringify(data));
            if (data.status!=0) {
              self.$vux.alert.show({
                title: '提示',
                content: "服务器维护中，您的订单已支付成功，请勿重复支付。如有疑问请联系客服：400-966-7718",
                dialogTransition:"",
                maskTransition:"",
              });
            }else{
              // alert("购买成功")
              // location.reload();
              location.href="/m/channels.html";
            }
          }
        );
      },
      logErr(err){
        this.$vux.alert.show({
          title: '提示',
          content: err,
          dialogTransition:"",
          maskTransition:"",
          onShow () {},
          onHide () {}
        })
      },
      commentLoad(){
        this.loadmore=false;
        var id = this.$geturlpara.getUrlKey("id");
        if (id) {
          var self = this;
          if (!self.articles.has_next) {
            this.loadmore=true;
          }else {
            AjaxServer.httpGet(
              Vue,
              HOST+'/api/channels/articles.json?id='+id+'&pn='+self.pn,
              {},
              (data)=>{
                if (data.status==0) {
                  self.loadmore=true;
                  if (!data.has_next) {
                    self.commentBottomMsg="没有更多数据";
                  }else{
                    this.pn++;
                  }
                  self.articles.articles=self.articles.articles.concat(data.articles);
                  self.articles.has_next=data.has_next;
                  // self.$refs.scrollerEvent.reset()
                }
              }
            );
          }
        }
      },
      conList(){
        this.isfocus=true;
      },
      channelInfo(){
        this.isfocus=false;
      },
      showCouponsList(){
        this.showlist=true;
        this.showpopup=false;
      },
      CouponsSelected(data){
        this.showpopup=true;
        this.showlist=false;
        this.coupon_id=data.id;
        this.coupon_price=data.coupon_price;
        this.couponstext="已抵扣¥"+data.discount;;
        this.couponsname=data.name;;
      },
      cancelCoupons(){
        this.showlist = false;
        this.showpopup = true;
        if (this.channelsinfo.channel_price>=0) {
          this.coupon_price=this.channelsinfo.channel_price;
        }else{
          this.coupon_price=this.channelsinfo.suites[0].price;
        }
        this.couponstext=this.channelsinfo.coupons.length+"张券可用";
        this.couponsname="优惠券";
        this.coupon_id="";
        this.order_type="";
      },
      toChannelsTuiJian(channel){
        window.location.href="/m/channel.html?id="+channel.id;
      },
      toActiveMember(){
        window.location.href="/m/member.html"
      }
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
