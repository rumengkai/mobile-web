<template>
  <div id="about">
    <div v-if="showContent">
      <div class="top">
        <img src="./images/about_1_02.png" alt="关于我们">
      </div>
      <p class="abp">
          功夫财经致力于联动最出色的财经学者，提供最优质的原创内容，打造中国规模最大的、粘性最高的财富命运共同体，以新型金融服务平台为终极己任，解决中产焦虑，提升国民财商。
      </p>
      <group class="group">
        <cell title="TEL:"><a href="tel:+4009667718">400-966-7718</a></cell>
        <cell title="QQ:">2949103867</cell>
        <cell title="E-mail:">app@kofuf.com</cell>
        <cell title="微信公众号:">搜索"功夫财经"</cell>
        <cell title="微博:">@功夫财经</cell>
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
    name: 'about',
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
      // this.fetchData();
    },
    mounted(){
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
  background-color: #eee;
}
#about{
  height: 100%;
  background-color: #efeef4;
  color: #999;
  font-size: 14px;
  .top{
    img{
      width: 100%;
      display: block;
      height: auto;
    }
  }
  .abp{
    color: #9f9e9e;
    font-size: 14px;
    padding:0 20px;
    text-align: justify;
    line-height: 20px;
  }
  a{
      color: #2eabf7;
  }
  .vux-label{
    font-size: 14px;
  }
  .weui-cell__ft{
    font-size: 14px;
    text-align: left;
    width: 4.8rem;
  }
}
</style>
