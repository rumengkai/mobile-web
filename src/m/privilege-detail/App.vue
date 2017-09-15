<template>
  <div id="privilege-detail">
    <div class="content" v-if="showContent">
      <div class="intro" v-html="dataInfo.intro">
      </div>
      <GoodList :items="dataInfo.items" line="line" dh="dh"></GoodList>
    </div>
    <Loading v-model="loadingshow" :text="loadtext" ></Loading>
  </div>
</template>

<script>
  import 'common/css/reset.css';
  import 'common/js/config.js';
  import AjaxServer from 'common/js/ajaxServer.js';
  import GoodList from 'components/GoodList/GoodList';
  import geturlpara from 'common/js/geturlpara.js';
  import {isWeiXin} from 'common/js/common.js';
  import { toPay } from 'common/js/pay.js';
  import TitleBar from "components/TitleBar/TitleBar"
  import { Group,Cell,Loading,AlertPlugin,cookie,querystring } from 'vux'
  import Vue from 'vue'
  Vue.use(AlertPlugin)
  Vue.prototype.$geturlpara=geturlpara
  export default {
    name: 'privilege-detail',
    data () {
      return {
        id:0,
        showContent:false,
        loadingshow: true,
        loadtext: '加载中...',
        dataInfo:{},
        channelsList:[],
        goodsList:[]
      }
    },
    components: {
      Group,
      Cell,
      Loading,
      TitleBar,
      GoodList
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
          HOST+'/api/users/privilege_detail',
          {
            id:id
          },
          (data)=>{
            this.loadingshow=false;
            if (data.status==0) {
              this.dataInfo=data;
              this.dataInfo.intro=this.dataInfo.intro.replace(/[\n]/g,'</br>');
              document.title=this.dataInfo.name
              this.showContent=true;
            }else{
              console.log(data.error);
            }
          }),
          (err)=>{
            console.log(err);
          }
      },
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
@import "../index/App.less";
@import './App.less';
</style>
