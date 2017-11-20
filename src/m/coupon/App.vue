<template>
  <div id="coupon">
    <div v-if="showContent">
      <div class="con">
        <img src="./images/card.png" alt="">
        <p class="title">
          <span>{{couponData.name}}</span>
        </p>
        <p class="tip">
          适用于：
        </p>
        <p class="use_scope">
          {{couponData.use_scope}}
        </p>
        <div class="btn" v-if="btn_text=='立即领取'" @click="getCoupons()">
          {{btn_text}}
        </div>
        <div class="btno" v-else>
          {{btn_text}}
        </div>
        <div class="btn" v-if="btn_text=='已领取'" @click="tochannel()">
          查看课程
        </div>
      </div>
    </div>
    <div class="logo-b"  @click="tochannel()">
      <img src="./images/logo.png" alt="">
    </div>
    <Failed v-if="failedshow" :msg="failedmsg"></Failed>
    <Loading v-model="loadingshow" :text="loadtext"></Loading>
  </div>
</template>

<script>
  import 'common/css/reset.css'
  import 'common/js/config.js'
  import {isWeiXin,weixinShare} from 'common/js/common.js'
  import geturlpara from 'common/js/geturlpara.js'
  import AjaxServer from 'common/js/ajaxServer.js'
  import Failed from "components/Failed/Failed"
  import Vue from 'vue'
  import VueResource from 'vue-resource'
  import { Loading,Group,Cell,querystring,cookie,ToastPlugin } from 'vux'
  Vue.prototype.$geturlpara=geturlpara
  Vue.use(VueResource)
  Vue.use(ToastPlugin)
  export default {
    name: 'coupon',
    data () {
      return {
        id:"",
        loadingshow: false,
        loadtext: 'loading...',
        showContent:false,
        failedshow:false,
        failedmsg:"服务请求失败，请刷新重试",
        couponData:{},
        btn_text:"立即领取"
      }
    },
    components: {
      Group,
      Cell,
      Loading,
      Failed,
    },
    beforeCreate(){
      // 授权
    },
    created () {
      var id = this.$geturlpara.getUrlKey("id");
      this.id=id;
      if (id) {
        this.fetchData(id);
      }else{
        this.loadingshow=false;
        this.failedmsg="请求参数有误"
        this.failedshow=true;
      }
      if (isWeiXin()) {
      }
      getAuth(cookie,querystring,"coupon",id);
    },
    mounted(){
    },
    methods: {
      //获取优惠券数据
      fetchData(id){
        var self=this;
        AjaxServer.httpGet(
          Vue,
          HOST+'/api/coupons/'+id+'.json',
          {},
          (data)=>{
            self.loadingshow=false;
            if (data.status==0) {
              self.showContent=true;
              this.couponData=data;
              if (data.has_received) {
                this.btn_text="已领取";
              }
              window.shareData={
                title:data.name+'-功夫财经',
                link:HOSTM+'/m/coupon.html?id='+this.id,
                imgUrl:'http://m.51xy8.com/static/img_h5/h5_logo.png',
                desc:data.use_scope
              }
              weixinShare(Vue);
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
      getCoupons(){
        var self=this;
        getAuth(cookie,querystring,"coupon",this.id);
        self.loadingshow=true;
        // return
        AjaxServer.httpPost(
          Vue,
          HOST+'/api/coupons/add',
          {
            id:this.id
          },
          (data)=>{
            self.loadingshow=false;
            if (data.status==0) {
              self.loadingshow=false;
              self.showContent=true;
              self.btn_text="已领取";
              self.toast("领取成功");
            }else if(data.status==5){
              localStorage.clear();
              clearcookie(cookie);
              getAuth(cookie,querystring,"coupon",self.id);
            }else{
              self.toast(data.error,'5rem');
            }
          },
          (err)=>{
            console.log(err);
            self.loadingshow=false;
            self.failedshow=true;
          }
        );
      },
      tochannel(){
        window.location.href="/m/channels.html"
      },
      toast(text,w){
        this.$vux.toast.show({
           text: text,
           position:'bottom',
           time:3000,
           width:w||'10em',
           type:'text'
        })
      }
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
@import "../index/App.less";
@import './App.less';
</style>
