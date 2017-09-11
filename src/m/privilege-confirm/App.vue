<template>
  <div id="privilege-confirm">
    <div class="content" v-if="showContent">
      <group class="header" >
         <x-input :title="dataInfo.receiver.name" v-model="dataInfo.receiver.phone"></x-input>
         <x-address raw-value @on-hide="logHide" @on-show="logShow" :title="title" v-model="value" :list="addressData"  placeholder="请选择地址"  ></x-address>
         <x-textarea placeholder="请填写详细地址，如街道，楼牌号等" v-model="addressdetail"></x-textarea>
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
import { Group,Cell,Loading,AlertPlugin,cookie,querystring,XButton,XInput,XAddress,XTextarea, ChinaAddressV3Data, Value2nameFilter as value2name } from 'vux'
import TitleBar from "components/TitleBar/TitleBar"
import GoodList from 'components/GoodList/GoodList';
import geturlpara from 'common/js/geturlpara.js';
import Vue from 'vue';
Vue.prototype.$geturlpara=geturlpara;
export default {
  components: {
    Group,
    Cell,
    Loading,
    TitleBar,
    XButton,
    XInput,
    XAddress,
    XTextarea,
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
      value: [],
      addressdetail:"",
      addressData:ChinaAddressV3Data,
      gooddata:[],
      showAddress: false
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
      console.log(id);
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
            var arr=data.receiver.address.split("@")
            this.value = [this.getValue(arr[0]),this.getValue(arr[1]),this.getValue(arr[2])];
            this.addressdetail=arr[3];
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
        }),
        (err)=>{
          console.log(err);
        }
    },
    confirm(data){
      console.log(data);
      console.log("兑换");
    },
    logHide (str) {
      console.log('on-hide', str)
      console.log(this.getName(this.value));
    },
    logShow (str) {
      console.log('on-show')
    },
    getName (value) {
      return value2name(value, ChinaAddressV3Data)
    },
    getValue (name) {
      var value="";
      for (var i = 0; i < ChinaAddressV3Data.length; i++) {
        if (ChinaAddressV3Data[i].name==name) {
          value=ChinaAddressV3Data[i].value;
          break;
        }
      }
      return value;
    },
  }
}
</script>
<style lang="less">
@import '~vux/src/styles/1px.less';
@import "../index/App.less";
@import './App.less';
</style>
