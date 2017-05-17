<template>
  <div id="freeread">
    <p class="hint">{{articlesList.tip}}</p>
    <scroller v-if="showContent" lock-x ref="scrollerEvent">
      <div class="content" v-if="showContent">
        <ul class="channel-list">
          <list :datalist="articlesList.articles" :freeshow="true"></list>
        </ul>
      </div>
    </scroller>
    <Loading v-model="loadingshow" :text="loadtext" ></Loading>
  </div>
</template>

<script>
import 'common/css/reset.css';
import 'common/js/config.js';
import AjaxServer from 'common/js/ajaxServer.js';
import geturlpara from 'common/js/geturlpara.js';
import List from "components/List/List"
import Vue from 'vue'
import {Loading,ToastPlugin,querystring,cookie,Scroller} from 'vux'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.use(ToastPlugin)
Vue.prototype.$geturlpara=geturlpara
  export default {
    name: 'freeread',
    components: {
      Loading,
      List,
      Scroller
    },
    data () {
      return {
        showContent:false,
        loadingshow: true,
        articlesList:{
          suites:[{price:""}]
        },
      }
    },

    created () {
      var id = this.$geturlpara.getUrlKey("id");
      this.getData(id);
    },
    methods: {
      //请求数据
      getData(id){
        console.log("get"+id);
        AjaxServer.httpGet(
          Vue,
          HOST+'/api/channels/tryout.json?id='+id,
          {
            id:id
          },
          (data)=>{
            console.log(data);
            this.loadingshow=false;
            if (data.status!=0) {
              alert(data.error)
              console.log("请求失败");
            }else{
              this.showContent=true;
              this.articlesList=data;
            }
          },
          (err)=>{
            this.loadingshow=false;
            console.log(err);
          }
        );
      }
    },
    filters: {
      formatDate:function (time) {
        var date = new Date(time);
        var nowDate = new Date();
        var c = nowDate-date;
        console.log(formatDate(date,'yyyy')-formatDate(nowDate,'yyyy'));
        if (c>31536000) {
          return formatDate(date, "yyyy年MM月dd日");
        }
        return formatDate(date, "MM月dd日");
      }
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
body{
  background-color: #f3f3f3;
}
#freeread{
  .hint{
    max-width: 680px;
    width: 100%;
    position: fixed;
    line-height: 32px;
    background-color: #01a4f1;
    color: #dfffff;
    text-align: center;
    z-index: 1000;
    overflow: hidden;
  }
  .content{
    background-color: #f3f3f3;
    padding-top: 47px;
    padding-bottom: 47px;
  }
}
</style>
