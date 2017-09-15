<template>
  <div id="privilege-confirm">
    <div class="content" v-if="showContent">
      <group class="header" v-if="haveAddress">
        <cell :title="dataInfo.receiver.name" :value="dataInfo.receiver.phone" value-align="left"></cell>
        <cell title="收货地址：" value-align="left" is-link @click.native="toAddress()">{{addresseAll}} </cell>
      </group>
      <group class="header" v-if="!haveAddress">
        <cell title="选择收货地址" value-align="left" is-link @click.native="toAddress()"></cell>
      </group>
      <GoodList :items="gooddata" line="" dh=""></GoodList>
    </div>
    <div class="btn">
      <x-button type="primary" @click.native="confirm" class="primary">确认兑换</x-button>
    </div>
    <Loading v-model="loadingshow" :text="loadtext" ></Loading>
  </div>
</template>

<script>
import 'common/css/reset.css';
import 'common/js/config.js';
import AjaxServer from 'common/js/ajaxServer.js';
import {isWeiXin} from 'common/js/common.js';
import { Group,Cell,Loading,AlertPlugin,cookie,querystring,XButton} from 'vux'
import GoodList from 'components/GoodList/GoodList';
import geturlpara from 'common/js/geturlpara.js';
import Vue from 'vue';
Vue.use(AlertPlugin)
Vue.prototype.$geturlpara=geturlpara;
export default {
  components: {
    Group,
    Cell,
    Loading,
    XButton,
    GoodList,
  },
  data () {
    return {
      id:0,
      title:"title",
      showContent:true,
      loadingshow: false,
      loadtext: '加载中...',
      dataInfo:{receiver:{name:"",phone:""}},
      addresseAll:"",
      gooddata:[],
      haveAddress:false
    }
  },
  created () {
    this.id=this.$geturlpara.getUrlKey("id");
    if (isWeiXin()) {
    }
    this.fetchData(this.id);
  },
  methods: {
    fetchData(id){
      AjaxServer.httpGet(
        Vue,
        HOST+'/api/items/'+id+'.json',
        {
          id:id
        },
        (data)=>{
          this.loadingshow=false;
          if (data.status==0) {
            this.dataInfo=data;
            if (data.receiver) {
              this.haveAddress=true;
              console.log();
              this.addresseAll=data.receiver.address.replace(/@/g," ");
            }
            this.gooddata.push({
              thumb:data.thumb,
              price:data.price,
              name:data.name,
              id:data.id,
            })
            this.showContent=true;
          }else{
            console.log(data.error);
          }
        },
        (err)=>{
          console.log(err);
        }
      );
    },
    confirm(data){
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
          receive_id:this.dataInfo.receiver.uuid
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
    },
    toAddress(){
      window.location.href="/m/address.html?type="+this.id;
    },
  }
}
</script>
<style lang="less">
@import '~vux/src/styles/1px.less';
@import "../index/App.less";
@import './App.less';
</style>
