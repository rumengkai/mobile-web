<template>
  <div id="privilege">
    <div v-if="showContent">
      <div class="con" v-html="con">
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
  import Failed from "components/Failed/Failed"
  import Vue from 'vue'
  import {Loading} from 'vux'
  import VueResource from 'vue-resource'
  import { Group,Cell,querystring,cookie} from 'vux'
  Vue.use(VueResource)
  export default {
    name: 'privilege',
    data () {
      return {
        loadingshow: false,
        loadtext: 'loading...',
        showContent:true,
        failedshow:false,
        failedmsg:"服务请求失败，请刷新重试",
        con:""
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
      //获取专栏数据数据
      fetchData(cid){
        var self=this;
        AjaxServer.httpGet(
          Vue,
          HOST+'/api/users/privilege_info.json ',
          {},
          (data)=>{
            self.loadingshow=false;
            self.showContent=true;
            if (data.status==0) {
              this.con=data.content;
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
#privilege{
  height: auto;
  background-color: #fff;
  color: #999;
  font-size: 14px;
  padding:10px 15px 20px;;
  .con{
    img{
      width: 100%;
    }
  }
}
</style>
