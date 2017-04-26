<template>
  <div id="comments">
    <p class="comment-title vux-1px-b">{{title||'评论'}}</p>
    <ul id="comment" v-if="commentlist!=undefined">
      <li v-for="item in commentlist.items" class="vux-1px-b">
        <img :src="item.headimg" alt="">
        <div class="comment-box">
          <p class="username">{{item.username}}</p>
          <p class="date">{{item.date}}</p>
          <p class="comment-con">{{item.commentCon}}</p>
          <div class="zan">
            <span class="icon"></span>
            <span class="count">{{item.count}}</span>
          </div>
        </div>
      </li>
    </ul>
    <ul v-else>
      <li class="comment-none">
        暂无评论
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'comments',
    props: {
      title:String,
      commentlist:Object
    },
    components: {
      commentlist:{}
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
.comment-title{
  line-height: .9rem;
  width: 90%;
  margin:auto;
  font-size: .3rem;
  color: #a8a8a8;
}
#comment{
  width: 90%;
  margin:auto;
  position: relative;
  margin-bottom: 30px;
}
#comment li{
  padding: .34rem 0;
  display: block;
  height: auto;
  position: relative;
  overflow: hidden;
}
#comment li img{
  float: left;
  display: block;
  width: .68rem;
  border-radius: .34rem;
}
#comment .comment-box{

  width: 70%;
  margin-left: .26rem;
  float: left;
  font-size: .2rem;
}
#comment .comment-box .username{
  font-size: .32rem;
  line-height: .50rem;
}
#comment .comment-box .date{
  font-size:.15rem;
  line-height: .3rem;
  color: #888888;
}
#comment .comment-box .comment-con{
  margin-top: .1rem;
  font-size: .28rem;
  line-height: .4rem;
  color: #9e9d9d;
}
#comment .comment-box .zan{
  font-size: #949494;
  position: absolute;
  right: .34rem;
  top: .34rem;
}
.comment-none{
  text-align: center;
  color: #666;
  font-size: 14px;
  line-height: 50px;
}
</style>
