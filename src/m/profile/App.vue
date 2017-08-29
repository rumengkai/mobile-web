<template>
  <div id="profile">
    <div v-if="showContent">
      <group class="group">
        <cell title="头像"><img class="headimg" :src="myInfo.user.photo" alt=""></cell>
        <cell title="昵称" >{{myInfo.user.name}}</cell>
        <cell title="性别" ><span v-if="myInfo.user.gender=='M'">男</span><span v-else>女</span></cell>
      </group>
      <group class="group">
        <cell title="手机号" v-if='myInfo.user.has_mobile'>{{myInfo.user.mobile}}</cell>
        <cell title="微信" v-if='myInfo.user.weixin'>{{myInfo.user.weixin}}</cell>
        <cell title="微博" v-if='myInfo.user.weibo'>{{myInfo.user.weibo}}</cell>
      </group>
    </div>
    <Failed v-if="failedshow" :msg="failedmsg"></Failed>
    <Loading v-model="loadingshow" :text="loadtext"></Loading>
  </div>
</template>

<script>
  import 'common/css/reset.css';
  import 'common/js/config.js';
  import {isWeiXin} from 'common/js/common.js';
  import AjaxServer from 'common/js/ajaxServer.js';
  import Failed from "components/Failed/Failed"
  import Vue from 'vue'
  import {Loading} from 'vux'
  import VueResource from 'vue-resource'
  import { Group,Cell,querystring,cookie} from 'vux'
  Vue.use(VueResource)
  export default {
    name: 'profile',
    data () {
      return {
        loadingshow: false,
        loadtext: 'loading...',
        showContent:true,
        failedshow:false,
        failedmsg:"服务请求失败，请刷新重试",
        myInfo:{},
      }
    },
    components: {
      Group,
      Cell,
      Loading,
      Failed
    },
    beforeCreate(){
      //授权
      if(isWeiXin()){
        getAuth(cookie,querystring);
      }
    },
    created () {
      this.fetchData();
    },
    mounted(){
    },
    methods: {
      //获取个人信息数据
      fetchData(cid){
        var self=this;
        AjaxServer.httpGet(
          Vue,
          HOST+'/api/users/my_profile.json',
          {},
          (data)=>{
            self.loadingshow=false;
            self.showContent=true;
            if (data.status==0) {
              this.myInfo=data;
            }else{
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
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
body{
  background-color: #efeef4;
}
#profile{
  overflow: hidden;
  height: 100%;
  color: #999;
  font-size: 14px;
  .headimg{
    width: 50px;
  }
  .vux-label{
    font-size: 14px;
  }
  .weui-cell__ft{
    font-size: 14px;
  }
}
</style>
