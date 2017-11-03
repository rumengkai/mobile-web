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
    <footer v-show="showContent">
      <!-- <a id="btnOpenApp" class="left" >
        <span>加入购物车</span>
      </a> -->
      <div class="duihuan" @click="confirm"  v-if="itemsinfo.price==0">
        <span>免费领取</span>
      </div>
      <a v-else id="btnOpenApp1" class="buy">
        <span>立即购买</span>
      </a>
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
        window.location.href="/m/privilege-confirm.html?id="+this.id;
        // console.log(this.id);
        // var self=this;
        // this.loadingshow=true;
        // var url="/pay/orders/pay_free";
        // AjaxServer.httpPost(
        //   Vue,
        //   HOST+url,
        //   {
        //     type: config()['paytype'],
        //     items: this.id,
        //     order_type:8,
        //     receive_id:this.itemsinfo.receiver.uuid
        //   },
        //   (data)=>{
        //     this.loadingshow=false;
        //     if (data.status!=0) {
        //       self.$vux.alert.show({
        //         title: '提示',
        //         content: data.error,
        //         dialogTransition:"",
        //         maskTransition:"",
        //       });
        //     }else{
        //       self.$vux.alert.show({
        //         title: '提示',
        //         content: "恭喜您，兑换成功",
        //         dialogTransition:"",
        //         maskTransition:"",
        //         onHide (){
        //           location.href="/m/member-center.html";
        //         }
        //       });
        //     }
        //   })
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
@import "../index/App.less";
@import './App.less';
</style>
