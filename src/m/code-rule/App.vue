<template>
  <div id="code-rule">
    <div class="content" v-if="showContent">
      <p v-html="dataInfo"></p>
    </div>
    <Loading v-model="loadingshow" :text="loadtext" ></Loading>
  </div>
</template>

<script>
  import 'common/css/reset.css';
  import 'common/js/config.js';
  import { Loading } from 'vux'
  import AjaxServer from 'common/js/ajaxServer.js';
  import Vue from 'vue'

  export default {
    name: 'code-rule',
    data () {
      return {
        showContent:false,
        loadingshow:true,
        dataInfo:""
      }
    },
    components: {
      Loading
    },
    created () {
      AjaxServer.httpGet(
        Vue,
        HOST+'/api/codes/rule.json',
        {},
        (data)=>{
          this.loadingshow=false;
          this.showContent=true;
          if (data.status==0) {
            this.dataInfo=data.content;
          }
        },
        (err)=>{
          console.log(err);
        }
      )
    },
    methods: {

    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
@import "../index/App.less";
body{
  text-align:justify;
  margin:0;
  font-family:'微软雅黑';
  background-color: @bg_color;
}
#code-rule{
  .content{
    box-sizing: border-box;
    text-align:justify;
    width:100%;
    font-size: 16px;
    color: @font_color_b;
    padding: .4rem;
    line-height: 35px;
    span{
      display: inline-block;
      line-height: 25px !important;
    }
  }
}
</style>
