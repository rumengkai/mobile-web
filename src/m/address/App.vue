<template>
  <div id="address">
    <div class="content" v-if="showContent">
      <group class="header" v-for="item in addressDate" @click.native="clickAddress(item)">
        <cell :title="item.name" :value="item.phone" value-align="left">
        </cell>
        <cell title="收货地址：" value-align="left">{{item.addressName}}&nbsp;{{item.addressDetail}}
        </cell>
        <cell value-align="left" class="cz">
          <check-icon :value="item.is_default" :dataItem="item" v-on:on-change="onCheck(item)">设为默认地址</check-icon>
          <span class="edit" @click.stop="edit(item)"><img src="./images/edit.png" alt="">编辑</span>
          <span class="del" @click.stop="del(item)"><img src="./images/delete.png" alt="">删除</span>
        </cell>
      </group>
      <group class="header" @click.native="addAddress">
        <cell title="新增地址" is-link></cell>
      </group>
    </div>
    <!-- 添加修改地址弹框 -->
    <popup v-model="editor" height="100%" position="bottom">
      <group class="header">
        <x-input title="收货人" v-model="tempAddress.name"></x-input>
        <x-input title="联系电话" v-model="tempAddress.phone"></x-input>
        <x-address raw-value @on-hide="logHide" @on-show="logShow" title="收获地址" v-model="tempAddress.addressValue" :list="addressData"  placeholder="请选择地址"  ></x-address>
        <x-textarea placeholder="请填写详细地址，如街道，楼牌号等" v-model="tempAddress.addressDetail"></x-textarea>
      </group>
      <div class="complete">
        <x-button @click.native="complete" type="primary" class="primary">保存</x-button>
        <x-button @click.native="cancel">取消</x-button>
      </div>
    </popup>
    <Loading v-model="loadingshow" :text="loadtext" ></Loading>
  </div>
</template>

<script>
  import 'common/css/reset.css';
  import 'common/js/config.js';
  import AjaxServer from 'common/js/ajaxServer.js';
  import {isWeiXin} from 'common/js/common.js';
  import geturlpara from 'common/js/geturlpara.js';
  import { ConfirmPlugin,Popup,CheckIcon,Group,Cell,Loading,cookie,querystring,XButton,XInput,ToastPlugin,XAddress,XTextarea, ChinaAddressV3Data, Value2nameFilter as value2name  } from 'vux'
  import Vue from 'vue'
  Vue.use(ToastPlugin);
  Vue.use(ConfirmPlugin);
  Vue.prototype.$geturlpara=geturlpara;
  export default {
    name: 'address',
    data () {
      return {
        id:0,
        showContent:false,
        loadingshow: true,
        loadtext: '加载中...',
        addressDate:[],
        editor:false,
        tempAddress:{
            "opt":"edit",
            "address":"",
            "addressValue":[],
            "addressName":"",
            "addressDetail":"",
            "phone":"",
            "name":"",
            "is_default":false,
            "uuid":""
        },
        show:false,
        addressData:ChinaAddressV3Data,
        reid:"",
      }
    },
    components: {
      Popup,
      CheckIcon,
      Group,
      Cell,
      Loading,
      XButton,
      XInput,
      XAddress,
      XTextarea,
    },
    created () {
      this.reid=querystring.parse().id;
      this.reurl=querystring.parse().type;
      if(isWeiXin()){
        getAuth(cookie,querystring);
      }
      this.feachDate();
    },
    methods: {
      feachDate(){
        var self=this;
        AjaxServer.httpGet(
          Vue,
          HOST+'/pay/receiver_infos/my',
          {},
          (data)=>{
            this.loadingshow=false;
            if (data.status==0) {
              this.addressDate=data.items.map((item)=>{
                var arr=item.address.split("@")
                item.addressName=arr[0]+" "+arr[1]+" "+arr[2];
                item.addressDetail=arr[3];
                item.addressValue=[this.getValue(arr[0]),this.getValue(arr[1]),this.getValue(arr[2])];
                return item;
              })
            }else{
              console.log(data.error);
            }
            this.showContent=true;
          },
          (err)=>{
            console.log(err);
          }
        )
      },
      onCheck(data){
        console.log(data);
        // 修改收获地址
        AjaxServer.httpPost(
          Vue,
          HOST+'/pay/receiver_infos/update',
          data,
          (data)=>{
            this.loadingshow=false;
            if (data.status==0) {
              this.toast("保存成功")
              this.feachDate();
              this.editor=false;
            }else{
              this.toast(data.error);
            }
          },
          (err)=>{
            console.log(err);
          }
        )
      },
      edit(data){
        this.tempAddress=data;
        this.editor=true;
      },
      // 删除地址
      del(data){
        var self=this;
        this.$vux.confirm.show({
          title: '提示',
          content: '确定删除该收获地址？',
          dialogTransition:"",
          maskTransition:"",
          onConfirm () {
            AjaxServer.httpPost(
              Vue,
              HOST+'/pay/receiver_infos/delete',
              {id:data.uuid},
              (data)=>{
                self.loadingshow=false;
                if (data.status==0) {
                  self.toast("删除成功")
                  self.feachDate();
                }else{
                  self.toast(data.error);
                }
              },
              (err)=>{
                console.log(err);
              }
            )
          }
        })
      },
      addAddress(){
        this.tempAddress={
          "opt":"add",
          "address":"",
          "addressValue":["110000", "110100", "110101"],
          "addressName":"",
          "addressDetail":"",
          "phone":"",
          "name":"",
          "is_default":false,
          "uuid":""
        };
        this.editor=true;
      },
      complete(){
        this.tempAddress.address=this.getName(this.tempAddress.addressValue).replace(/\s/g,'@')+"@"+this.tempAddress.addressDetail;
        this.loadingshow=true;
        if (this.tempAddress.uuid) {
          // 修改收获地址
          AjaxServer.httpPost(
            Vue,
            HOST+'/pay/receiver_infos/update',
            this.tempAddress,
            (data)=>{
              this.loadingshow=false;
              if (data.status==0) {
                this.toast("保存成功")
                this.feachDate();
                this.editor=false;
              }else{
                this.toast(data.error);
              }
            },
            (err)=>{
              console.log(err);
            }
          )
        }else{
          // 增加收获地址
          AjaxServer.httpPost(
            Vue,
            HOST+'/pay/receiver_infos/add',
            this.tempAddress,
            (data)=>{
              this.loadingshow=false;
              if (data.status==0) {
                this.toast("保存成功")
                this.feachDate();
                this.editor=false;
              }else{
                this.toast(data.error);
              }
            },
            (err)=>{
              console.log(err);
            }
          )
        }
      },
      cancel(){
        this.editor=false;
      },
      logHide (str) {
        // console.log(this.getName(this.tempAddress.addressValue));
      },
      logShow (str) {
        // console.log('on-show')
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
      toast(data,w,t){
        this.$vux.toast.show({
           text: data,
           position:'bottom',
           time:t||3000,
           width:w||'10em',
           type:'text'
        })
      },
      clickAddress(data){
        if (this.reid&&this.reurl) {
          window.location.href="/m/"+this.reurl+".html?id="+this.reid;
        }
      }
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
@import "../index/App.less";
@import './App.less';
</style>
