<template>
  <div id="channel">
    <!-- <x-header v-if="showContent"><a slot="right" @click="share"></a></x-header> -->
    <!-- <scroller lock-x ref="scrollerEvent" v-show="showContent"> -->
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
          <img :src="channelsinfo.large_thumb" alt="">
        </div>
        <div v-if="subscription" class="subtab">
          <div class="tab">
            <p><span @click="conList" :class="{focus:isfocus}">内容列表</span></p>
            <p><span @click="channelInfo" :class="{focus:!isfocus}">专栏介绍</span></p>
          </div>
        </div>
        <ul class="channels-info" v-if="!isfocus||!subscription">
          <li class="vux-1px-b">
            <p class="title">专栏介绍</p>
            <p class="con" v-html="channelsinfo.abstract"></p>
          </li>
          <li class="vux-1px-b">
            <p class="title">适宜人群</p>
            <p class="con" v-html="channelsinfo.suit_crowds"></p>
          </li>
          <li class="vux-1px-b">
            <p class="title">订阅须知</p>
            <p class="con" v-html="channelsinfo.information"></p>
          </li>
          <li v-if="!subscription">
            <p class="title">最新更新</p>
            <ul class="newupdate">
              <li class="item vux-1px-b" v-for="item in channelsinfo.articles" @click="toDetail(item.id,item.tryout)">
                <img :src="item.thumb" alt="" onerror="this.src='http://182.92.99.123:8080/privilege/uploadedFile/1491147612922.jpg?imageView2/1/w/200/h/133/q/100|imageslim'">
                <div v-if="item.tryout" class="try">试 读</div>
                <p class="title">{{item.name}}</p>
                <p class="date">{{item.published | formatDate2}}</p>
              </li>
              <!-- <div v-if='!nonecomment' class="comment-bottom">
                <p v-if="loadmore" @click="commentLoad">{{commentBottomMsg}}</p>
                <load-more v-else tip="正在加载">正在加载</load-more>
              </div> -->
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
        <popup v-model="showpopup">
            <div class="popup2">
              <group>
                <cell title="您有可用的优惠券" value="Donate"></cell>
                <cell title="Total" value="$10.24"></cell>
              </group>
              this is the first popup
              <dev class="warp">
                  <Coupons :couponData="channelsinfo.coupons"></Coupons>
                  <Coupons :couponData="channelsinfo.invalid_coupons"></Coupons>
                  <Coupons :couponData="channelsinfo.invalid_coupons"></Coupons>
                  <Coupons :couponData="channelsinfo.invalid_coupons"></Coupons>
              </dev>
            </div>
        </popup>
      </div>
    <!-- </scroller> -->
    <!-- 底部弹框 -->

    <footer v-show="showContent&&!subscription">
        <div class="freeread" @click="freeRead" v-if="unit!='1期'">
          <span>免费试读</span>
        </div>
        <div class="subscribe" @click="subscribe" v-if="unit!='1期'">
          <a>
            <span>订阅：<span>¥{{price}}/{{unit}}</span></span>
          </a>
        </div>
        <div class="subscribe_one" @click="subscribe" v-if="unit=='1期'">
          <a>
            <span>订阅专栏：<span>¥{{price}}</span></span>
          </a>
        </div>
    </footer>
    <dev v-show="showContent&&!(showContent&&!subscription)" class = "openApp">
      <div class="gfcj" @click="toChannels">
        <img src="http://m.kofuf.com/static/img/logo.png" alt="">
        <div class="gf"><p class="p1">微信登陆APP</p><p class="p2">阅读体验更佳</p></div>
      </div>
      <div class="download">
        <a id='btnOpenApp'>打开APP</a>
      </div>
    </dev>
    <div class="qr_code_pc_inner">
      <div class="qr_code_pc">
        <img id="js_pc_qr_code_img" class="qr_code_pc_img" src="http://www.kofuf.com/img/wx.jpg">
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
  import {isWeiXin} from 'common/js/common.js';
  import AjaxServer from 'common/js/ajaxServer.js';
  import geturlpara from 'common/js/geturlpara.js';
  import { toPay } from 'common/js/pay.js';
  import Vue from 'vue'
  import { formatDate2 } from 'common/js/date.js';
  import {Loading,XHeader,Scroller,LoadMore,AlertPlugin,ToastPlugin,querystring,cookie,Popup,XSwitch,Group,Cell} from 'vux'
  import Failed from "components/Failed/Failed"
  import BackHome from "components/BackHome/BackHome"
  import List from "components/List/List"
  import Coupons from "components/Coupons/Coupons"
  import VueResource from 'vue-resource'
  Vue.use(VueResource)
  Vue.use(ToastPlugin)
  Vue.use(AlertPlugin)
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
          suites:[{price:""}]
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
        unit:"年",
        coupon_id:"",
        showpopup:false
      }
    },
    components: {
      XHeader,
      Loading,
      LoadMore,
      Scroller,
      Failed,
      List,
      BackHome,
      Popup,
      Group,
      XSwitch,
      Cell,
      Coupons,
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
              console.log(this.channelsinfo);
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
                // console.log(data);
                data.abstract=data.abstract.replace(/[\n]/g,"<br/>") ;
                data.suit_crowds=data.suit_crowds.replace(/[\n]/g,"<br/>") ;
                //正则匹配，处理information
                data.information=data.information.replace(/[\n]/g,"<br/>") ;
                //加载完成后，重置scroll
                setTimeout(function () {
                  self.$nextTick(() => {
                    self.$refs.scrollerEvent.reset()
                  })
                },500);
                // if(!data.has_next){
                //   this.commentBottomMsg="没有更多数据";
                // }
                document.title = "专栏-"+data.name;
                self.subscription=data.followed;
                self.unit=data.price_unit;
                // if (data.suites[0].unit=="M") {
                //   if (data.suites[0].effectDuration>1) {
                //     // self.unit=data.suites[0].effectDuration+"月"
                //     self.unit="20期"
                //   }else{
                //     // self.unit="月"
                //     self.unit="20期"
                //   }
                // }else if(data.suites[0].unit=="Y"){
                //   if (data.suites[0].effectDuration>1) {
                //     self.unit=data.suites[0].effectDuration+"年"
                //   }else{
                //     self.unit="年"
                //   }
                // }
                this.showContent=true;
              }
            }
          },
          (err)=>{
            this.loadingshow=false;
            // this.failedshow=true;
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
      toDetail(id,tryout){
        console.log(tryout);
        if (!tryout) {
          console.log("请订阅后查看");
          this.$vux.toast.show({
             text: '请订阅后查看',
            //  position:'bottom',
             time:3000,
             width:'10em',
             type:'text'
          })
        }else{
          window.location.href="/m/detail.html?id="+id;
        }
      },
      freeRead(){
        var id = this.$geturlpara.getUrlKey("id");
        window.location.href="/m/freeread.html?id="+id;
      },
      //订阅支付
      subscribe1(){
        var id = this.$geturlpara.getUrlKey("id");
        window.location.href="https://ah88dj.mlinks.cc/AK8j?id="+id;
      },
      subscribe(){
        var id = this.$geturlpara.getUrlKey("id");
        var self=this;
        if (self.channelsinfo.coupons.length) {
          self.showpopup=true;
          return
        }
        //已登陆情况
        if (localStorage.getItem("gid")&&this.disable) {
          self.loadtext="加载中..."
          self.loadingshow=true;
          this.disable=false;
          //发起订单请求
          AjaxServer.httpPost(
            Vue,
            HOST+"/pay/weixin/create_order",
            {
              type: "JSAPI",
              items: id,
              coupon_id:self.coupon_id
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
              location.reload(true);
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
            console.log("");
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
        console.log(0);
      },
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
body{
  // background-color: #eee;
}
#channel{
  height: 100%;
  background-color: #fff;
  .vux-header{
    background: rgba(255,255,255,0);
    color: #000;
    position: fixed;
    width: 100%;
    z-index: 99;
    overflow: hidden;
    .vux-header-title{
      color: #000;
    }
  }
  .content{
    .large-img{
      position: relative;
      .name-brief{
        position: absolute;
        color: #fff;
        bottom: 0px;
        width: 100%;
        background-color: rgba(0,0,0,0.2);
        overflow: hidden;
        .name{
          padding-left: .3rem;
          width: 100%;
          line-height: 30px;
          font-size: 22px;
          font-weight: 400;
        }
        .brief{
          padding-left: .3rem;
          line-height: 28px;
          font-size: 16px;
          font-weight: 200;
        }
      }
      img{
        width: 100%;
        // height: 4.8rem;
        display: block;
      }
    }
    .subtab{
      height: 62px;
      background-color: #f3f3f3;
      .tab{
        height: 46px;
        background-color: #fff;
        width: 100%;
        box-shadow:0 2px 2px #dddddd;
        p{
          display: block;
          height: 100%;
          width: 50%;
          text-align: center;
          color: #6e6e6e;
          float: left;
          font-size: 16px;
          span{
            margin: auto;
            display: block;
            text-align: center;
            width: 50%;
            height: 46px;
            line-height: 46px;
            box-sizing: border-box;
          }
        }
        .focus{
          color: #ca915c;
          border-bottom: 3px solid #ca915c;
        }
      }
    }
    .channels-info{
      padding-bottom: 80px;
      padding-left: .3rem;
      padding-right: .3rem;
      background-color: #fff;
      p{
        text-align: justify;
      }
      li{
        padding-bottom: 12px;
        .title{
          font-size: 16px;
          font-weight: bold;
          line-height: 40px;
          color: #444;
        }
        .con{
          font-size: 14px;
          line-height: 23px;
          color: #9d9d9d;
        }
        .newupdate{
          .item{
            .try{
                position: absolute;
                width: 120px;
                height: 20px;
                background-color: #ca915c;
                bottom:16px;
                border-bottom-right-radius: 3px;
                border-bottom-left-radius: 3px;
                text-align: center;
                line-height: 20px;
                color: #fff;
            }
          }
          li{
            cursor:pointer;
            overflow: hidden;
            padding: 16px 0;
            position: relative;
            height: 80px;
            img{
              float: left;
              width: 120px;
              height: 80px;
              border-radius: 3px;
              display: block;
            }
            .title{
              line-height: 22px;
              font-size: 15px;
              color: #686868;
              font-weight: 400;
              padding-left: 11px;
              overflow: hidden;
            }
            .date{
              position: absolute;
              bottom: 15px;
              width: 100%;
              text-align: right;
              display: block;
              color: #a8a8a8;
            }
          }
        }
      }
    }
    .channel-list{
      padding-bottom: 100px;
      background-color: #f3f3f3;
    }
    .comment-bottom{
      margin-top: 40px;
      color: #999;
      p{
        text-align: center;
      }
    }
  }
  footer{
    height: .92rem;
    width: 100%;
    max-width: 680px;
    background-color: #fff;
    box-shadow: rgba(0,0,0,.2) 0 0 10px;
    position: fixed;
    bottom: 0;
    padding: 0;
    z-index: 500;
    display: -webkit-box;
    -webkit-box-align: center;
    font-size: 20px;
    .freeread{
      color: #fbfbfb;
      width: 50%;
      text-align: center;
      background-color: #757475;
      height:.92rem;
      line-height: .92rem;
    }
    .subscribe{
      width: 50%;
      color: #fbfbfb;
      line-height: .92rem;
      text-align: center;
      background-color: #ca915c;
      a{
        color: #fbfbfb;
      }
    }
    .subscribe_one{
      color: #fff;
      font-size: 17px;
      line-height: .7rem;
      width: 200px;
      height: .7rem;
      background: #ca915c;
      margin: auto;
      text-align: center;
      border-radius: 4px;
    }
  }
}
.openApp{
  height: .92rem;
  padding: .16rem 0 !important;
  width: 100%;
  max-width: 680px;
  background-color: #fff;
  box-shadow: rgba(0,0,0,.2) 0 0 10px;
  position: fixed;
  bottom: 0;
  z-index: 1000;
  display: -webkit-box;
  -webkit-box-align: center;
  font-size: 20px;
  .gfcj{
    font-size: 20px;
    color: #ca915c;
    width: 60%;
    img{
      border-radius: 5px;
      width: .8rem;
      height: .8rem;
      display: block;
      float: left;
      margin-left: .3rem;
    }
    .gf{
      width: 2.1rem;
      float: left;
      margin-left: .36rem;
      color: #868686;
      .p1{
        font-size: 12px;
        line-height: .4rem;
        font-weight: 400;
      }
      .p2{
        line-height: .4rem;
        font-weight: 100;
        font-size: 12px;
      }
    }
  }
  .download{
    width: 40%;
    text-align: right;
    a{
      // width: 148px;
      height: .8rem;
      display: block;
      color: #ca915c;
      border: 1px solid #ca915c;
      border-radius: 5px;
      text-align: center;
      line-height: .8rem;
      background: #fff;
      font-size: 18px;
      box-sizing: content-box;
      margin-right: 15px;
      margin-left: auto;
    }
  }
}
.warp{
  height: 300px;
  overflow: scroll;
}

</style>
