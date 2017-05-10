<template>
  <div id="comments">
    <div class="title">
      <p class="comment-title vux-1px-b">{{title||'评论'}}</p>
      <p class="add-comment" @click="addComment">
        写评论
        <img src="./images/write.png" alt="">
      </p>
    </div>
    <ul id="comment" v-if="commentlist!=undefined">
      <li v-for="(item , index) in commentlist" class="vux-1px-b">
        <img :src="item.author.photo" alt="" onerror="this.src='http://182.92.99.123:8080/privilege/uploadedFile/default.png'">
        <div class="comment-box">
          <p class="username">{{item.author.name}}</p>
          <p class="date">{{item.postd|formatDate}}</p>
          <p class="comment-con">{{item.content}}</p>
          <div class="zan" @click="clickZan(item.id,index)">
            <span class="icon" ref="zan" :class="{ img1:iszan, img2:!iszan}"></span>
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
  import {formatedDate} from 'common/js/date.js';
  import AjaxServer from 'common/js/ajaxServer.js';
  import Vue from 'vue'
  import { AlertPlugin,ToastPlugin,cookie,querystring} from 'vux'
  Vue.use(ToastPlugin)
  Vue.use(AlertPlugin)
  export default {
    name: 'comments',
    props: {
      name:String,
      commentlist:Array,
      id:String,
    },
    data () {
      return {
        isClick:{},
        iszan:true,
      }
    },
    components: {
    },
    filters: {
      formatDate:formatedDate
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
      },
      addComment(){
        if (localStorage.getItem("gid")) {
          window.location.href="comment.html?id="+this.id+"&name="+this.name;
        }else{
          getAuth(cookie,querystring,"item",this.id);
          console.log(0);
        }
      },
      clickZan(id,index){
        if (localStorage.getItem("gid")) {
          var self=this;
          if (!this.isClick[index]) {
            this.isClick[index]=1;
            this.$refs.zan[index].className='icon img2';
            AjaxServer.httpPost(
              Vue,
              HOST+'/api/comments/do_like',
              {
                id:id
              },function (res) {
                if(res.status!=0){
                  self.$vux.toast.show({
                   text: res.error,
                   type:'warn',
                   width:'10em'
                  })
                }else{
                  self.commentlist[index].support_count=res.count;
                }
              },function (err) {
                console.log(err);
              });
          }else{
            this.isClick[index]=0;
            this.$refs.zan[index].className='icon img1';
            AjaxServer.httpPost(
              Vue,
              HOST+'/api/comments/cancel_like',
              {
                id:id
              },function (res) {
                console.log(res);
                if(res.status!=0){
                  console.log(res);
                  self.$vux.toast.show({
                   text: res.error,
                   type:'warn',
                   width:'10em'
                  })
                }else{
                  self.commentlist[index].support_count=res.count;
                }
              },function (err) {
                console.log(1);
              });
          }
          console.log(this.isClick);
        }else{
          getAuth(cookie,querystring,"item",this.id);
          console.log(0);
        }
      }
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
#comments{
  position: relative;
  #comment{
    width: 90%;
    margin:auto;
    position: relative;
    margin-bottom: 30px;
  }
  .title{

    .comment-title{
      text-align: left;
      line-height: .9rem;
      width: 90%;
      margin:auto;
      font-size: 16px;
      color: #a8a8a8;
    }
    .add-comment{
      display: flex;
      align-items:center;
      line-height: .9rem;
      position: absolute;
      right: .4rem;
      top: 0;
      font-size: 16px;
      color: #a8a8a8;
      img{
        display: block;
        margin-left: 5px;
        width: 20px;
        height: 20px;
      }
    }
  }
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
    width: 16px;
    height: 16px;
    background-color: #f00;
    display: block;
    float: left;
  }
  .img1{
    background: url(images/zan.png);
    background-size: 16px 16px;
  }
  .img2{
    background: url(images/zaned.png);
    background-size: 16px 16px;
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
