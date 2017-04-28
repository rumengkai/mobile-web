<template>
  <div id="comments">
    <p class="comment-title vux-1px-b">{{title||'评论'}}</p>
    <ul id="comment" v-if="commentlist!=undefined">
      <li v-for="item in commentlist" class="vux-1px-b">
        <img :src="item.author.photo" alt="" onerror="this.src='http://182.92.99.123:8080/privilege/uploadedFile/default.png'">
        <div class="comment-box">
          <p class="username">{{item.author.name}}</p>
          <p class="date">{{item.postd|formatDate}}</p>
          <p class="comment-con">{{item.content}}</p>
          <div class="zan" @click="showPluginAuto">
            <span class="icon"><img src="../../m/detail/images/zan.png" alt=""> </span>
            <span class="count"> {{item.support_count}}</span>
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
  import {formatDate} from 'common/js/date.js';
  import Vue from 'vue'
  import { AlertPlugin} from 'vux'
  Vue.use(AlertPlugin)
  export default {
    name: 'comments',
    props: {
      title:String,
      commentlist:Array
    },
    components: {
    },
    filters: {
      formatDate:function (time) {
        var date = new Date(time);
        return formatDate(date, "yyyy-MM-dd");
      }
    },
    methods: {
      showPlugin () {
        this.$vux.alert.show({
          title: '小提示',
          content: '打开APP，参与互动，<br/> 获取优质内容。',
          dialogTransition:"",
          maskTransition:"",
          onShow () {
            console.log('Plugin: I\'m showing')
          },
          onHide () {
            console.log('Plugin: I\'m hiding now')
          }
        })
      },
      showPluginAuto () {
        this.showPlugin()
        // setTimeout(() => {
        //   this.$vux.alert.hide()
        // }, 3000)
      }
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
.comment-title{
  text-align: left;
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
  height: .68rem;
  border-radius: .34rem;
}
#comment .comment-box{
  text-align: left;
  width: 70%;
  margin-left: .26rem;
  float: left;
  font-size: .2rem;
}
#comment .comment-box .username{
  font-size: 16px;
  line-height: .50rem;
}
#comment .comment-box .date{
  font-size:12px;
  line-height: .3rem;
  color: #888888;
}
#comment .comment-box .comment-con{
  margin-top: .1rem;
  font-size: 14px;
  line-height: .4rem;
  color: #9e9d9d;
}
#comment .comment-box .zan{
  font-size: #949494;
  position: absolute;
  right: .34rem;
  top: .34rem;
  .icon{
    img{
      width: 16px;
      height: 16px;
    }
  }
  .count{
    margin-left: 10px;
    color: #a8a8a8;
    font-size: 16px;
    line-height: 16px;
    display: block;
    float: left;
  }
}
.comment-none{
  text-align: center;
  color: #666;
  font-size: 14px;
  line-height: 50px;
}
</style>
