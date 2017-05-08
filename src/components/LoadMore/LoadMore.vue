<template>
  <!-- 评论加载更多，btn -->
  <div id="load">
    <div v-if='!nonecomment' class="comment-bottom">
      <p v-if="loadmore" @click="commentLoad">{{commentBottomMsg}}</p>
      <load-more v-else tip="正在加载">正在加载</load-more>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'load',
    data () {
      return {
        nonecomment:false,
      }
    },
    props: {
      msg:String
    },
    components: {

    },
    created () {
    },

    methods: {
      commentLoad(){
        this.loadmore=false;
        var id = this.$geturlpara.getUrlKey("id")||"1482";
        this.fetchCommentData(id,++this.pn,this.last_time);
      }
    }
  }
</script>

<style lang="less">
#load{

}

</style>
