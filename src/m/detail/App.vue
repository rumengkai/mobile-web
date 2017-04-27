<template>
  <div id="detail">
    <Loading v-model="loadingshow" :text="loadtext"></Loading>
    <div class="content">
      <div v-if="articles.sub_type=='V'">
        <Videobox :video="articles.banner" :poster="articles.thumb"></Videobox>
      </div>
      <div v-if="articles.sub_type==='R'">
        <Audiobox :music="articles.banner"></Audiobox>
      </div>
      <div v-if="articles.sub_type=='A'" class="banner">
        <img :src="articles.banner" alt="">
      </div>
      <div class="articles">
        <p class="title">{{articles.name}}</p>
        <div class="info vux-1px-b">
          <img :src="articles.author_pic" alt="">
          <span class="author">作者：{{articles.author_name}}</span>
          <span class="created">{{articles.created | formatDate}}</span>
        </div>
        <span class="content" v-html="articles.content" >
        </span>
      </div>
      <comment :title="title" :commentlist="commentlist.items"></comment>
    </div>
    <footer>
      <div class="gfcj">
        <img src="./images/logo.png" alt="">
        <span>功夫财经</span>
      </div>
      <div class="download">
        <a @click="openApp" href="http://a.app.qq.com/o/simple.jsp?pkgname=com.avatar.kungfufinance">打开APP</a>
      </div>
    </footer>
  </div>
</template>

<script>
  import 'common/css/reset.css';
  import 'common/js/common.js';
  import geturlpara from 'common/js/geturlpara.js';
  import {formatDate} from 'common/js/date.js';
  import Comment from "components/Comment/Comment"
  import Audiobox from "components/Audio/Audio"
  import Videobox from "components/Video/Video"
  import Vue from 'vue'
  import {Loading} from 'vux'
  import VueResource from 'vue-resource'
  Vue.use(VueResource)
  Vue.prototype.$geturlpara=geturlpara

  //sub_type:a:文章 r：音频  v：视频
  export default {
    name: 'detail',
    data () {
      return {
        paly:0,
        showplay:true,
        title:"评论",
        commentlist:{
          "items":[]
        },
        articles:{},
        loadingshow: true,
        loadtext: 'loading...'
      }
    },
    components: {
      Loading,
      Comment,
      Audiobox,
      Videobox
    },
    created () {
      var id = this.$geturlpara.getUrlKey("id")||"1482";
      this.fetchData(id);
    },
    methods: {
      openApp(){
        console.log("open");
        console.log(HOST);
      },
      //获取数据
      fetchData(id){
        this.$http.get(HOST+'/api/articles/'+id+'.json', [])
        .then((data)=>{
          this.loadingshow=false;
          this.articles=JSON.parse(data.bodyText);
          this.fetchCommentData(id);
        }, (err)=>{console.log(err);});
      },
      //请求评论数据
      fetchCommentData(id){
        this.$http.get(HOST+'/api/articles/comments.json?id='+id, [])
        .then((data)=>{
          this.loadingshow=false;
          this.commentlist.items=JSON.parse(data.bodyText).items;
          console.log();
        }, (err)=>{console.log(err);});
      }
    },
    filters: {
      formatDate:function (time) {
        var date = new Date(time);
        return formatDate(date, "MM月dd日");
      }
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
.content{
  margin-bottom: 100px;
}
.banner img{
  width: 100%;
}
.articles{
  width: 90%;
  color: #4f4f4f;
  margin:14px auto 37px;
  overflow: hidden;
  font-size: .3rem;
}
.articles .title{
  font-size: .42rem;
}
.articles .info{
  height: .9rem;
  overflow: hidden;
  padding: .3rem 0;
  margin-bottom: 10px;
}
.articles .info .author{
  line-height: .9rem;
  margin-left: .3rem;
  color: #a0a0a0;
}
.articles .info .created{
  float: right;
  line-height: .9rem;
  color: #a0a0a0;
}
.articles .info img{
  width: .9rem;
  height:.9rem;
  border-radius: .45rem;
  float: left;
}
.articles .content img{
  max-width: 100%;
}
footer{
  height: 46px;
  width: 100%;
  max-width: 680px;
  background-color: #fff;
  box-shadow: rgba(0,0,0,.2) 0 0 10px;
  position: fixed;
  bottom: 0;
  padding: .14286rem;
  z-index: 1000;
  display: -webkit-box;
  -webkit-box-align: center;
  .gfcj{
    font-size: 20px;
    color: #ff8929;
    width: 50%;
    text-align: center;

    img{
      width: 40px;
      height: 40px;
      display: block;
      float: left;
      margin-left: 20px;
    }
    span{
      line-height: 40px;
      display: inline-block;
    }
  }
  .download{
    width: 50%;
    a{
      width: 90%;
      height: 40px;
      display: block;
      color: #ff8929;
      border: 1px solid #ff8929;
      border-radius: 5px;
      text-align: center;
      line-height: 40px;
      background: #fff;
      font-size: 22px;
      box-sizing: content-box;
      margin-right: .08571rem;
    }
  }
}
</style>
