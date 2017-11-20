<template>
  <div id="app-download">
    <div class="contentapp">
      <img src="./images/logo.png" class="logo">
      <div class="one">
        中国财经新媒体第一平台，以最具人格化的财经大咖和最具表现力的财经小V，构筑最具公信力和活跃度的财经社群。帮助中国的中产阶层，实现全球资产的优化配置。
      </div>
      <div class="two">
        平台集结了时寒冰、王福重、马光远、李大霄、琢磨先生、黄生、闫肖峰、胡润等各路财经大侠，以视频、音频、图文、公开课、线下社交、海外游学等方式提供最具价值的财经知识产品，和您共同缔造财富的光荣与梦想。
      </div>

    </div>
    <a class="load" id="btnOpenApp2" @click="BrowserType">打开APP阅读</a>
  </div>

</template>

<script>
  import 'common/css/reset.css';
  import 'common/js/common.js';

  export default {
    name: 'app-download',
    props: {
      id:String
    },
    data () {
      return {

      }
    },
    components: {

    },
    mounted () {
      new Mlink({
        mlink: "https://ah88dj.mlinks.cc/AK8f?id="+this.id,
        button: document.querySelector('a#btnOpenApp2'),
        autoLaunchApp : false,
      });
    },

    methods: {
      BrowserType(){
        window.location.href="https://ah88dj.mlinks.cc/AK8f?id="+this.id
      }
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
// body{
//   // text-align:center;
//   margin:0;
//   // background:#232323;
//   font-family:'微软雅黑'
// }
#app-download{
  text-align:center;
  background:#232323;
  overflow: hidden;
  height: 100%;
  position: relative;
  .contentapp{
    text-align:center;
    width:100%;
    background:url('./images/background.png');
    background:url('http://m.51xy8.com/m/static/img/background.2e6be3f.png');
    background-size:100% 120%;
    margin-top:70px;
    .logo{
      width:160px;
      height:82px;
    }
    .one{
      font-size:14px;
      text-align:left;
      color:#EBEBEB;
      padding:58px 26px 0px 26px;
      line-height: 22px;
    }
    .two{
      font-size:14px;
      text-align:left;
      color:#EBEBEB;
      padding:15px 26px 84px 26px;
      line-height: 22px;
    }
  }
  .load{
    line-height: 40px;
    background: #ca915c;
    background-size: 100% 100%;
    margin-bottom: 40px;
    border: 0px;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    font-weight: 400;
    bottom: 40px;
    padding: 6px 13px;
    position: absolute;
    display: inline-block;
    border-radius: 30px;
    color: #403D30;
    text-decoration: none;
    width: 200px;
    margin-left: -100px;
    left: 50%;
    height: 40px;
    -webkit-box-shadow: #ca915c 0px 0px 10px;
    -moz-box-shadow: #ca915c 0px 0px 10px;
    box-shadow: #ca915c 0px 0px 10px;
  }
}

</style>
