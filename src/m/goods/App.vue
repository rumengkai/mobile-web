<template>
  <div id="goods">
    <div v-if="showContent">
      <AudioLists :audiolist="datalist" ></AudioLists>
      <div class="load">
        <LazyLoadingMore url="/api/articles/daily_audio_list.json" v-on:getData="loadList" params="items"></LazyLoadingMore>
      </div>
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
  import AudioLists from 'components/AudioLists/AudioLists';
  import LazyLoadingMore from 'components/LazyLoadingMore/LazyLoadingMore';
  import Failed from "components/Failed/Failed"
  import Vue from 'vue'
  import {Loading} from 'vux'
  import VueResource from 'vue-resource'
  import { Group,Cell,querystring,cookie} from 'vux'
  Vue.use(VueResource)
  export default {
    name: 'goods',
    data () {
      return {
        loadingshow: true,
        loadtext: 'loading...',
        showContent:false,
        failedshow:false,
        failedmsg:"服务请求失败，请刷新重试",
        datalist:[],
      }
    },
    components: {
      Group,
      Cell,
      Loading,
      Failed,
      AudioLists,
      LazyLoadingMore
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
      //获取专栏数据数据
      fetchData(cid){
        var self=this;
        AjaxServer.httpGet(
          Vue,
          HOST+'/api/articles/goods_list.json?pn=0',
          {},
          (data)=>{
            self.loadingshow=false;
            self.showContent=true;
            if (data.status==0) {
              this.datalist=data.items;
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
      loadList(data){
        this.datalist=this.datalist.concat(data);
      }
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
body{
  background-color: #efeff4;
  overflow: scroll;
}
#goods{
  background-color: #efeef4;
  color: #999;
  font-size: 14px;
}
.load{
  height: 100px;
  width: 100%;
  color: #efeff4;
}
</style>
