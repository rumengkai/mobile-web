<template>
  <div id="my">
    <div v-if="showContent" class="content">
      <div class="profile">
        <div class="privilege" v-if="myInfo.user.level!=0" @click="toSkip('privilege.html')">
          <img class="mark" src="./images/vip_question_mark.png" alt="">
          特权说明
        </div>
        <div class="headimg" @click="toUserCenter(myInfo.user)">
          <img :src="myInfo.user.photo" alt="头像" class="head">
          <img class="level" v-if="myInfo.user.level!=0" :src="myInfo.user.vip_icon" alt="会员">
          <p v-html="myInfo.user.name"></p>
        </div>
      </div>
      <group class="group g1">
        <cell title="我的收藏" is-link @click.native="toSkip('collect.html')"></cell>
        <cell title="我的订单" is-link @click.native="toSkip('order.html')"></cell>
        <cell title="两周年庆" is-link @click.native="toSkip('second-anniversary.html')"></cell>
        <cell title="会员中心" is-link @click.native="tomember" v-if="myInfo.user.privilege_count!=-1||myInfo.user.show_privilege">
          <span class="tp tp1" v-if="myInfo.user.level==0">开通会员</span>
          <span class="tp tp1" v-if="myInfo.user.level!=0"><span v-if="myInfo.user.privilege_count!=0">{{myInfo.user.privilege_count}}项未兑换</span></span>
        </cell>
        <cell title="收货地址管理" is-link @click.native="toSkip('address.html')"></cell>
        <cell title="优惠中心" is-link @click.native="toSkip('code-active.html')"><span class="tp" v-if="myInfo.user.coupon_count!=0"><span class="tp1">{{myInfo.user.coupon_count}}</span>张待使用</span></cell>
      </group>
      <group class="group g1">
        <cell title="个人信息" is-link @click.native="toSkip('profile.html')"></cell>
        <cell title="关于我们" is-link @click.native="toSkip('about.html')"></cell>
      </group>
      <group class="group g1">
        <cell title="下载APP" is-link @click.native="toApp"></cell>
      </group>
    </div>
    <TabBar active="my"></TabBar>
    <Failed v-if="failedshow" :msg="failedmsg"></Failed>
    <Loading v-model="loadingshow" :text="loadtext"></Loading>
  </div>
</template>

<script>
  import 'common/css/reset.css';
  import 'common/js/config.js';
  import {isWeiXin} from 'common/js/common.js';
  import AjaxServer from 'common/js/ajaxServer.js';
  import TabBar from "components/TabBar/TabBar"
  import Failed from "components/Failed/Failed"
  import Vue from 'vue'
  import {Loading} from 'vux'
  import VueResource from 'vue-resource'
  import { Group,Cell,querystring,cookie} from 'vux'
  Vue.use(VueResource)
  export default {
    name: 'my',
    data () {
      return {
        loadingshow: true,
        loadtext: 'loading...',
        showContent:false,
        failedshow:false,
        failedmsg:"服务请求失败，请刷新重试",
        myInfo:{},
      }
    },
    components: {
      Group,
      Cell,
      Loading,
      TabBar,
      Failed
    },
    beforeCreate(){
      //授权
      if(isWeiXin()){
      }
      getAuth(cookie,querystring,"my.html");
    },
    created () {
      this.fetchData();
    },
    mounted(){
      //唤起app
      // new Mlink({
      //   mlink: "https://ah88dj.mlinks.cc/AK8j?id="+this.id,
      //   button: document.getElementById('btnOpenApp'),
      //   autoLaunchApp : false,
      // });
    },
    methods: {
      //获取专栏数据数据
      fetchData(cid){
        var self=this;
        AjaxServer.httpGet(
          Vue,
          HOST+'/api/users/my_info.json',
          {},
          (data)=>{
            self.loadingshow=false;
            self.showContent=true;
            if (data.status==0) {
              this.myInfo=data;
            }else{
              console.log(data.error);
            }
            if(data.status==5){
              localStorage.clear();
              clearcookie(cookie);
              getAuth(cookie,querystring);
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
      toApp(){
        window.location.href="https://ah88dj.mlinks.cc/AK8j";
      },
      toSkip(data){
        window.location.href="/m/"+data;
      },
      tomember(){
        if (this.myInfo.user.level==0) {
          window.location.href="/m/member.html";
        }else{
          //会员
          window.location.href="/m/member-center.html";
        }
      },
      toUserCenter(data){
        window.location.href="/m/moments.html?id="+data.id;
      }
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
@import "../index/App.less";
body{
  background-color: #efeef4;
}
#my{
  height: 100%;
  .content{
    margin-bottom: 100px;
  }
  .profile{
    height: 4.24rem;
    width: 100%;
    text-align: center;
    background: url(http://static1.kofuf.com/1505881780454.png);
    background-size: 100% auto;
    overflow: hidden;
    position: relative;
    .privilege{
      color: #eee;
      font-size: 14px;
      position: absolute;
      top: 10px;
      left: 20px;
      line-height: 18px;
      .mark{
        float: left;
        width: 18px;
      }
    }
    .headimg{
      position: relative;
      width: 70px;
      height: 70px;
      margin-bottom: 10px;
      margin:1.4rem auto;
      .head{
        width: 70px;
        height: 70px;
        border-radius: 35px;
      }
      .level{
        width: 20px;
        height: 20px;
        position: absolute;
        right: 0px;
        bottom: 0px;
      }
    }
    p{
      color: #666;
      font-size: 18px;
      margin-top: 10px;
    }
  }
  .group{
    .vux-label{
      font-size: 14px;
      color: #333;
    }
    .tp{
      font-size: 14px;
    }
    .tp1{
      color: @base_color;
    }
  }
  .g1{
    .weui-cells{
      margin-top: .3rem;
    }
  }
}
</style>
