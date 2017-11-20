<template>
  <div id="collect">
    <ul class="newupdate vux-1px-t">
      <li class="item vux-1px-b" v-for="item in collectList" @click="toDetail(item.id,item.tryout)">
        <img :src="item.thumb" alt="" onerror="this.src='http://182.92.99.123:8080/privilege/uploadedFile/1491147612922.jpg?imageView2/1/w/200/h/133/q/100|imageslim'">
        <p class="title">{{item.name}}</p>
        <p class="pp"><span class="author">{{item.author_name}}</span><span class="date">{{item.published | formatDate2}}</span></p>
      </li>
      <div class="none" v-if="collectList.length==0">
        <p>暂无收藏</p>
      </div>
    </ul>
    <div class="load" v-if="has_next">
      <LazyLoadingMore url="/api/articles/my_fav.json" v-on:getData="loadList" params="items"></LazyLoadingMore>
    </div>
    <Failed v-if="failedshow" :msg="failedmsg"></Failed>
    <Loading v-model="loadingshow" :text="loadtext"></Loading>
  </div>
</template>

<script>
  import 'common/css/reset.css';
  import 'common/js/config.js';
  import { formatDate2 } from 'common/js/date.js';
  import {isWeiXin,weixinShare} from 'common/js/common.js';
  import LazyLoadingMore from 'components/LazyLoadingMore/LazyLoadingMore';
  import geturlpara from 'common/js/geturlpara.js';
  import AjaxServer from 'common/js/ajaxServer.js';
  import Failed from "components/Failed/Failed"
  import Coupons from "components/Coupons/Coupons"
  import Vue from 'vue'
  import {Loading} from 'vux'
  import VueResource from 'vue-resource'
  import { Group,Cell,querystring,cookie} from 'vux'
  Vue.prototype.$geturlpara=geturlpara
  Vue.use(VueResource)
  export default {
    name: 'collect',
    data () {
      return {
        id:"",
        loadingshow: true,
        loadtext: 'loading...',
        showContent:false,
        failedshow:false,
        failedmsg:"服务请求失败，请刷新重试",
        collectList:[],
        has_next:false
      }
    },
    components: {
      Group,
      Cell,
      Loading,
      Failed,
      Coupons,
      LazyLoadingMore,
      formatDate2
    },
    beforeCreate(){
      // 授权
      if(isWeiXin()){
        getAuth(cookie,querystring);
      }
      window.shareData={
        title:'功夫财经',
        link:HOSTM+'/m/',
        imgUrl:'http://m.51xy8.com/static/img_h5/h5_logo.png',
        desc:"国民财商提升者"
      }
      weixinShare(Vue);
    },
    created () {
      // var id = this.$geturlpara.getUrlKey("id");
      // this.id=id;
      this.fetchData();
    },
    mounted(){
    },
    methods: {
      //获取优惠券数据
      fetchData(id){
        var self=this;
        AjaxServer.httpGet(
          Vue,
          HOST+'/api/articles/my_fav.json',
          {},
          (data)=>{
            self.loadingshow=false;
            if (data.status==0) {
              this.collectList=data.items;
              this.has_next=data.has_next;
              self.showContent=true;
            }else{
              self.failedshow=true;
              self.failedmsg=data.error;
              console.log(data.error);
            }
          },
          (err)=>{
            console.log(err);
            self.loadingshow=false;
            self.failedshow=true;
          }
        );
        setTimeout(()=>{
          self.loadingshow=false;
        },10000);
      },
      toDetail(id,tryout){
        window.location.href="/m/detail.html?id="+id;
      },
      loadList(data){
        this.collectList=this.collectList.concat(data);
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
body{
  background-color: #fff;
  height: 100%;
}
#collect{
  height: 100%;
  background-color: #fff;
  color: #999;
  font-size: 14px;
  padding: 20px;
  .coupons_info{
    padding:20px 20px 0px;
    line-height: 20px;
    text-align: right;
    color: #333;
    &:hover{
      color: #5f96cb;
    }
  }
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
    .pp{
      position: absolute;
      bottom: 15px;
      width: 100%;
      text-align: right;
      display: block;
      color: #a8a8a8;
      .data{
        float: right;
      }
      .author{
        float: left;
        margin-left: 130px;
      }
    }
  }
}
.none{
  p{
    text-align: center;
    line-height: 50px;
  }
}
</style>
