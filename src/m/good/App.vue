<template>
  <div id="good">
      <div class="content" v-show="showContent">
        <swiper  loop dots-position="center" height="480px">
          <swiper-item class="swiper-demo-img" v-for="(item, index) in itemsinfo.images" :key="index">
            <img :src="item">
          </swiper-item>
        </swiper>
        <div class="header vux-1px-b">
          <div class="name">
            {{itemsinfo.name}}
          </div>
          <div class="info">
            <span class="price">
              ¥ {{itemsinfo.price | currency}}
            </span>
            <span class="count">
              剩余: {{itemsinfo.store_count}}件
            </span>
          </div>
        </div>
        <div class="detail" v-html="itemsinfo.detail"></div>
      </div>
    <footer v-show="showContent&&type==''">
      <a id="btnOpenApp" class="left" >
        <span>加入购物车</span>
      </a>
      <a id="btnOpenApp1" class="right" >
        <span>立即购买</span>
      </a>
    </footer>
    <footer v-show="showContent&&type=='dh'">
      <div class="duihuan" @click="confirm">
        <span>兑换</span>
      </div>
    </footer>
    <div class="qr_code_pc_inner">
      <div class="qr_code_pc">
        <img id="js_pc_qr_code_img" class="qr_code_pc_img" src="https://www.kofuf.com/static/images/code.png">
        <p>微信扫一扫<br>学财经，长本事</p>
      </div>
    </div>
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
  import {Swiper,SwiperItem,Loading,XHeader,Scroller,LoadMore,AlertPlugin,ToastPlugin,querystring,cookie} from 'vux'
  import Failed from "components/Failed/Failed"
  import List from "components/List/List"
  Vue.use(ToastPlugin)
  Vue.use(AlertPlugin)
  Vue.prototype.$geturlpara=geturlpara

  export default {
    name: 'good',
    data () {
      return {
        id:0,
        showContent:false,
        loadingshow: true,
        loadtext: 'loading...',
        itemsinfo:{ },
        failedshow:false,
        failedmsg:"服务请求失败，请刷新重试",
        nonecomment:false,
        loadmore:true,
        type:""
      }
    },
    components: {
      Swiper,
      SwiperItem,
      XHeader,
      Loading,
      LoadMore,
      Scroller,
      Failed,
      List
    },
    beforeCreate(){
      //授权
      if(isWeiXin()){
        var id = this.$geturlpara.getUrlKey("id");
        getAuth(cookie,querystring,"item",id);
      }
    },
    created () {
      if (this.$geturlpara.getUrlKey("type")) {
        this.type = this.$geturlpara.getUrlKey("type");
      }
      var id = this.$geturlpara.getUrlKey("id");
      this.id=id;
      this.fetchData(id);
    },
    mounted(){
      //唤起app
      new Mlink([{
        mlink: "https://ah88dj.mlinks.cc/Acej?id="+this.id,
        button: document.querySelector('a#btnOpenApp1'),
        autoLaunchApp : false,
      },{
        mlink: "https://ah88dj.mlinks.cc/Acej?id="+this.id,
        button: document.querySelector('a#btnOpenApp'),
        autoLaunchApp : false,
      }]);
    },
    methods: {
      //获取商品数据
      fetchData(id){
        var self = this;
        AjaxServer.httpGet(
          Vue,
          HOST+'/api/items/'+id+'.json',
          {},
          (data)=>{
            this.loadingshow=false;
            this.itemsinfo=data;
            if(this.itemsinfo.status!=0){
              this.failedmsg=this.itemsinfo.error;
              this.failedshow=true;
            } else{
              document.title = data.name;
              this.itemsinfo=data;
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
      toDetail(id){
        window.location.href="/m/detail.html?id="+id;
      },
      // //加入购物车
      // addCart(){
      //   var id = this.$geturlpara.getUrlKey("id");
      //   console.log(id);
      // },
      // //立即购买
      // buy(){
      //   var id = this.$geturlpara.getUrlKey("id");
      //   console.log(id);
      // },
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
      confirm(){
        console.log(this.id);
        var self=this;
        this.loadingshow=true;
        var url="/pay/orders/pay_free";
        AjaxServer.httpPost(
          Vue,
          HOST+url,
          {
            type: config()['paytype'],
            items: this.id,
            order_type:8,
            receive_id:this.itemsinfo.receiver.uuid
          },
          (data)=>{
            this.loadingshow=false;
            if (data.status!=0) {
              self.$vux.alert.show({
                title: '提示',
                content: data.error,
                dialogTransition:"",
                maskTransition:"",
              });
            }else{
              self.$vux.alert.show({
                title: '提示',
                content: "恭喜您，兑换成功",
                dialogTransition:"",
                maskTransition:"",
                onHide (){
                  location.href="/m/member-center.html";
                }
              });
            }
          })
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
      },
      currency(value){
        return Number(value).toFixed(2);
      }
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
body{
  // background-color: #eee;
}
#good{
  height: 100%;
  background-color: #fff;
  .content{
    .vux-swiper{
      height: 4.8rem !important;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .vux-slider > .vux-indicator > a > .vux-icon-dot.active{
      background-color: #fff;
    }
    .header{
      margin: 14px .32rem;
      .name{
        font-size: 16px;
        line-height: 26px;
      }
      .info{
        color: #ca915c;
        line-height: 50px;
        .price{
          font-size:20px;
        }
        .count{
          display: block;
          margin-right: 0;
          margin-top: 15px;
          width: auto;
          line-height: 21px;
          box-sizing: border-box;
          border-radius: 3px;
          border: 1px solid #ca915c;
          padding: 0 5px;
          float: right;
        }
      }
    }
    .detail{
      width: auto;
      padding: 0 .32rem 100px;
      box-shadow: 0 5px 5px #dedede;
      background-color: #fff;
      overflow: hidden;
      img{
        width: 100%;
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
    a{
      display: block;
    }
    .left{
      color: #fbfbfb;
      width: 50%;
      text-align: center;
      background-color: #757475;
      height: 100%;
      line-height: 46px;
    }
    .right{
      width: 50%;
      color: #fbfbfb;
      line-height: 46px;
      text-align: center;
      background-color: #ca915c;
    }
    .duihuan{
      width: 100%;
      color: #fbfbfb;
      line-height: 46px;
      text-align: center;
      background-color: #ca915c;
    }
  }
}
</style>
