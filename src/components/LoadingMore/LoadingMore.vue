<template>
  <!-- 评论加载更多，btn -->
  <div id="load">
    <div v-if='!nonedata' class="comment-bottom">
      <p v-if="loadmore" @click="dataLoad" class="clickload">{{commentBottomMsg}}</p>
      <load-more v-else tip="正在加载">正在加载</load-more>
    </div>
  </div>
</template>

<script>
import AjaxServer from 'common/js/ajaxServer.js';
import Vue from 'vue'
import {LoadMore} from 'vux'
  export default {
    name: 'load',
    data () {
      return {
        pn:0,
        nonedata:false,
        commentBottomMsg:"点击，立即加载更多",
        loadmore:true
      }
    },
    props: {
      url:String,
      datalist:Array,
      params:String
    },
    components: {
      LoadMore
    },
    created () {

    },
    methods: {
      dataLoad(){
        this.loadmore=false;
        this.fetchData(++this.pn);
      },
      fetchData(pn){
        var self = this;
        AjaxServer.httpGet(
          Vue,
          HOST+this.url+'?pn='+pn,
          {},
          (data)=>{
            if (data.status==0) {
              self.loadmore=true;
              if (!data.has_next) {
                commentBottomMsg="- 到底啦 -"
              }
              if (!self.params) {
                self.params='articles'
              }
              this.$emit("getData",data[self.params]);
            }else{
              self.loadmore=true;
            }
          },(err)=>{
            console.log(err);
            self.loadmore=true;
          }
        );
      }
    }
  }
</script>

<style lang="less">
#load{
  text-align: center;
  padding: 20px;
  .clickload{
    margin-top: 20px;
  }
  .comment-bottom{
    color: #ccc;
  }
}

</style>
