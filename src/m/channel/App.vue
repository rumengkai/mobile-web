<template>
  <div id="channel">

    <!-- <x-header v-if="showContent"><a slot="right" @click="share"></a></x-header> -->
    <!-- <scroller lock-x ref="scrollerEvent" v-show="showContent"> -->
      <div class="content" v-show="showContent">
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
            <p class="con">{{channelsinfo.abstract}}</p>
          </li>
          <li class="vux-1px-b">
            <p class="title">适宜人群</p>
            <p class="con">{{channelsinfo.suit_crowds}}</p>
          </li>
          <li class="vux-1px-b">
            <p class="title">订阅须知</p>
            <p class="con" v-html="information">{{information}}</p>
          </li>
          <li v-if="!subscription">
            <p class="title">最新更新</p>
            <ul class="newupdate">
              <li class="item vux-1px-b" v-for="item in channelsinfo.articles" @click="geDetail(item.id)">
                <img :src="item.thumb" alt="" onerror="this.src='http://182.92.99.123:8080/privilege/uploadedFile/1491147612922.jpg?imageView2/1/w/200/h/133/q/100|imageslim'">
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
          <list :datalist="channelsinfo.articles"></list>
          <div v-if='!nonecomment' class="comment-bottom">
            <p v-if="loadmore" @click="commentLoad">{{commentBottomMsg}}</p>
            <load-more v-else tip="正在加载">正在加载</load-more>
          </div>
        </ul>
      </div>
    <!-- </scroller> -->
    <footer v-if="showContent&&!subscription">
      <div class="freeread" @click="freeRead">
        <span>免费试读</span>
      </div>
      <div class="subscribe" @click="subscribe" disabled="disable">
        <span>订阅：<span>¥{{channelsinfo.suites[0].price}}/年</span></span>
      </div>
    </footer>
    <Failed v-if="failedshow" :msg="failedmsg"></Failed>
    <Loading v-model="loadingshow" :text="loadtext" ></Loading>
  </div>
</template>

<script>
  import 'common/css/reset.css';
  import 'common/js/common.js';
  import AjaxServer from 'common/js/ajaxServer.js';
  import geturlpara from 'common/js/geturlpara.js';
  import { toPay } from 'common/js/pay.js';
  import Vue from 'vue'
  import { formatDate2 } from 'common/js/date.js';
  import {Loading,XHeader,Scroller,LoadMore,AlertPlugin,ToastPlugin,querystring,cookie} from 'vux'
  import Failed from "components/Failed/Failed"
  import List from "components/List/List"
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
      }
    },
    components: {
      XHeader,
      Loading,
      LoadMore,
      Scroller,
      Failed,
      List
    },
    beforeCreate(){
      //授权
      var id = this.$geturlpara.getUrlKey("id");
      getAuth(cookie,querystring,"channel",id);
    },
    created () {
      var id = this.$geturlpara.getUrlKey("id");
      this.id=id;
      this.fetchData(id);
    },
    methods: {
      //获取专栏数据数据
      fetchData(id){
        var self = this;
        AjaxServer.httpGet(
          Vue,
          HOST+'/api/channels/'+id+'.json',
          {},
          (data)=>{
            this.loadingshow=false;
            this.channelsinfo=data;
            if(this.channelsinfo.status!=0){
              this.failedmsg=this.channelsinfo.error;
              this.failedshow=true;
            } else{
              //正则匹配，处理information
              this.information=this.channelsinfo.information.replace(/[。]/g,"。<br/>") ;
              //加载完成后，重置scroll
              // setTimeout(function () {
              //   self.$nextTick(() => {
              //     self.$refs.scrollerEvent.reset()
              //   })
              // },500);
              if(!data.has_next){
                this.commentBottomMsg="没有更多数据";
              }
              self.subscription=data.followed;
              this.showContent=true;
            }
          },
          (err)=>{
            this.loadingshow=false;
            this.failedshow=true;
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
      geDetail(id){
        console.log(id);
        window.location.href="detail.html?id="+id;
      },
      freeRead(){
        var id = this.$geturlpara.getUrlKey("id");
        window.location.href="https://a.mlinks.cc/AK8j?id="+id;
      },
      //订阅支付
      subscribe(){
        var id = this.$geturlpara.getUrlKey("id");
        var self=this;
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
              items: id
            },
            (data)=>{
              console.log(data.id);
              self.loadingshow=false;
              if (data.status!=0) {
                this.$vux.alert.show({
                  title: '提示',
                  content: "创建订单失败",
                  dialogTransition:"",
                  maskTransition:"",
                });
              }else{
                self.loadingshow=false;
                console.log("订单创建成功");
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
              location.href="channel.html?id="+self.id;
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
                self.channelsinfo.articles.concat(data.articles);
                // self.$refs.scrollerEvent.reset()
              }
            }
          );
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
  background-color: #eee;
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
        bottom: 2px;
        width: 100%;
        padding-left: .3rem;
        padding-right: .3rem;
        .name{
          line-height: 36px;
          font-size: 22px;
          font-weight: 400;
        }
        .brief{
          line-height: 22px;
          font-size: 16px;
          font-weight: 200;
        }
      }
      img{
        width: 100%;
        height: 4.8rem;
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
          color: #f8c600;
          border-bottom: 3px solid #f8c600;
        }
      }
    }
    .channels-info{
      padding-bottom: 80px;
      padding-left: .3rem;
      padding-right: .3rem;
      background-color: #fff;
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
      padding-bottom: 50px;
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
    height: 46px;
    width: 100%;
    max-width: 680px;
    background-color: #fff;
    box-shadow: rgba(0,0,0,.2) 0 0 10px;
    position: fixed;
    bottom: 0;
    padding: 0;
    z-index: 1000;
    display: -webkit-box;
    -webkit-box-align: center;
    font-size: 20px;
    .freeread{
      color: #fbfbfb;
      width: 50%;
      text-align: center;
      background-color: #757475;
      height: 100%;
      line-height: 46px;
    }
    .subscribe{
      width: 50%;
      color: #fbfbfb;
      line-height: 46px;
      text-align: center;
      background-color: #ffbf00;
    }
  }
}


</style>
