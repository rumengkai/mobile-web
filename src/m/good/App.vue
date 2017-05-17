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
    <footer v-if="showContent">
      <div class="left" @click="addCart">
        <span>加入购物车</span>
      </div>
      <div class="right" @click="buy" >
        <span>立即购买</span>
      </div>
    </footer>
    <Failed v-if="failedshow" :msg="failedmsg"></Failed>
    <Loading v-model="loadingshow" :text="loadtext" ></Loading>
  </div>
</template>

<script>
  import 'common/css/reset.css';
  import 'common/js/config.js';
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
      var id = this.$geturlpara.getUrlKey("id");
      getAuth(cookie,querystring,"item",id);
    },
    created () {
      var id = this.$geturlpara.getUrlKey("id");
      this.id=id;
      this.fetchData(id);
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
        window.location.href="detail.html?id="+id;
      },
      //加入购物车
      addCart(){
        var id = this.$geturlpara.getUrlKey("id");
        console.log(id);
        window.location.href="https://a.mlinks.cc/AK8j?id="+id;
      },
      //立即购买
      buy(){
        var id = this.$geturlpara.getUrlKey("id");
        console.log(id);
        window.location.href="https://a.mlinks.cc/AK8j?id="+id;
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
  background-color: #eee;
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
        color: #ffbf00;
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
          border: 1px solid #ffbf00;
          padding: 0 5px;
          float: right;
        }
      }
    }
    .detail{
      width: auto;
      padding: 0 .32rem .2rem;
      box-shadow: 0 5px 5px #dedede;
      margin-bottom: 80px;
      background-color: #fff;
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
      background-color: #ffbf00;
    }
  }
}
</style>
