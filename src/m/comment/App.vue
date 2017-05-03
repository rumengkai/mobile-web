<template>
  <div id="addcomment">
    <div class="content">
      <div class="title">
        <p>顺丰连续四个涨停，开扒背后金主掘金图；交通部：积极鼓励支持共享单车| 功夫早报（音频版）</p>
      </div>
      <x-textarea :max="20" :placeholder="placeholder"></x-textarea>
    </div>
  </div>
</template>

<script>
  import 'common/css/reset.css';
  import 'common/js/common.js';
  import geturlpara from 'common/js/geturlpara.js';
  import Vue from 'vue'
  import { formatDate2 } from 'common/js/date.js';
  import {XTextarea} from 'vux'
  import VueResource from 'vue-resource'
  Vue.use(VueResource)
  Vue.prototype.$geturlpara=geturlpara

  export default {
    name: 'addcomment',
    data () {
      return {
        placeholder:"lalall"
      }
    },
    components: {
      XTextarea
    },
    created () {

    },

    methods: {
      onEvent (event) {
      console.log('on', event)
    },
      //获取专栏数据数据
      fetchData(id){
        this.$http.get(HOST+'/api/channels/'+id+'.json', [])
        .then((data)=>{
          this.loadingshow=false;
          this.channelsinfo=JSON.parse(data.bodyText);
          if(this.channelsinfo.status!=0){
            this.failedmsg=this.channelsinfo.error;
            this.failedshow=true;
          } else{
            //正则匹配，处理information
            this.information=this.channelsinfo.information.replace(/[。]/g,"。<br/>") ;
            var self=this;
            //加载完成后，重置scroll
            setTimeout(function () {
              self.$nextTick(() => {
                self.$refs.scrollerEvent.reset()
              })
            },300);
            this.showContent=true;
          }
        }, (err)=>{
          this.loadingshow=false;
          this.failedshow=true;
          console.log(err);
        });
        var self=this;
        setTimeout(()=>{
          self.loadingshow=false;
        },10000);
      },
    },
    filters: {

    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
body{
  background-color: #eee;
}
#addcomment{
  .content{
    overflow: hidden;
    height: 100%;
    .title{
      margin: 10px 0;
      p{
        padding: 0 10px;
        line-height: 28px;
        font-size: 16px;
        color:#000;
      }
    }

    .weui-cell{
      // padding: 0;
      // textarea{
      //   padding:10px 15px;
      // }
    }
  }
}

</style>
