<template>
  <div id="logistics">
    <div class="content" v-if="showContent">
      <p class="title">物流跟踪信息</p>
      <timeline>
        <timeline-item v-for="(i,index) in dataInfo" :key="index">
          <h4 :class="[index === 0 ? 'recent' : '']">  {{i.station}}</h4>
          <p :class="[index === 0 ? 'recent' : '']"> {{i.time}}</p>
        </timeline-item>
      </timeline>
    </div>
    <Failed v-if="!showContent&&showFailed" :msg="error_message"></Failed>
    <back-home></back-home>
    <loading v-model="loadingshow" :text="loadtext" ></loading>
  </div>
</template>

<script>
  import 'common/css/reset.css';
  import 'common/js/config.js';
  import BackHome from "components/BackHome/BackHome"
  import AjaxServer from 'common/js/ajaxServer.js';
  import Failed from 'components/Failed/Failed';
  import {isWeiXin,weixinShare} from 'common/js/common.js';
  import { toPay } from 'common/js/pay.js';
  import { Timeline,TimelineItem,Group,Cell,Loading,AlertPlugin,cookie,querystring } from 'vux'
  import Vue from 'vue'
  Vue.use(AlertPlugin)
  export default {
    data () {
      return {
        id:0,
        showContent:false,
        loadingshow: true,
        loadtext: '加载中...',
        dataInfo:{},
        error_message:'',
        show_failed:false
      }
    },
    components: {
      Timeline,
      TimelineItem,
      Failed,
      Group,
      Cell,
      Loading,
      BackHome
    },
    beforeCreate(){
      //授权
      if (isWeiXin()) {
        getAuth(cookie,querystring,"member.html");
      }
    },
    created () {
      this.id = querystring.parse().id;
      this.fetchData(this.id);
    },
    methods: {
      //获取数据
      fetchData(id){
        var url=HOST+'/pay/orders/get_logistics_info';
        var data={id:id};
        AjaxServer.httpGet(Vue,url,data,this.fetchResult);
      },
      fetchResult(res){
        var self=this;
        if (res.status!=0&&isWeiXin()&&localStorage.getItem("gid")) {
          if(res.status==5){
            localStorage.setItem("gid","");
            localStorage.clear();
            clearcookie(cookie);
            getAuth(cookie,querystring,"second-anniversary.html");
          }else{
            self.error_message=res.error;
            self.showContent=false;
            self.show_failed=true;
            self.loadingshow=false;
          }
        }else {
          self.dataInfo=res.traces;
          console.log(res);
          self.showContent=true;
          self.loadingshow=false;
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
