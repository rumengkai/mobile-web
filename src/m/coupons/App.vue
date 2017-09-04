<template>
  <div id="coupons">
    <div v-if="showContent">
      <p class="coupons_info" @click="toinfo">
        优惠券使用说明
        <span class="nstep"></span>
      </p>
      <Coupons :couponData="couponData"></Coupons>
    </div>
    <Failed v-if="failedshow" :msg="failedmsg"></Failed>
    <Loading v-model="loadingshow" :text="loadtext"></Loading>
  </div>
</template>

<script>
  import 'common/css/reset.css';
  import 'common/js/config.js';
  import {isWeiXin,weixinShare} from 'common/js/common.js';
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
    name: 'coupons',
    data () {
      return {
        id:"",
        loadingshow: true,
        loadtext: 'loading...',
        showContent:false,
        failedshow:false,
        failedmsg:"服务请求失败，请刷新重试",
        couponData:[]
      }
    },
    components: {
      Group,
      Cell,
      Loading,
      Failed,
      Coupons
    },
    beforeCreate(){
      // 授权
      if(isWeiXin()){
        getAuth(cookie,querystring);
      }
      window.shareData={
        title:'功夫财经-优惠券',
        link:HOSTM+'/m/coupons.html',
        imgUrl:'http://m.kofuf.com/static/img_h5/h5_logo.png',
        desc:"功夫财经优惠券"
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
          HOST+'/api/coupons/my.json',
          {},
          (data)=>{
            self.loadingshow=false;
            if (data.status==0) {
              this.couponData=data.items;
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
      toinfo(){
        window.location.href="/m/coupons-explain.html"
      }
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
body{
  background-color: #f5f5f5;
  height: 100%;
}
#coupons{
  height: 100%;
  background-color: #f5f5f5;
  color: #999;
  font-size: 14px;
  .nstep{
    margin-top: -5px;
  }
  .coupons_info{
    box-sizing: border-box;
    position: relative;
    padding-right: 15px;
    margin:20px 10px 0px;
    line-height: 20px;
    text-align: right;
    color: #333;
    &:hover{
      color: #5f96cb;
    }
  }
}
</style>
