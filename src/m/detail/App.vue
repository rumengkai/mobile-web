<template>
  <div id="detail">
    <Loading v-model="loadingshow" :text="loadtext"></Loading>
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
      <div class="info">
        <img :src="articles.author_pic" alt="">
        <span class="author">作者：{{articles.author_name}}</span>
        <span class="created">{{articles.created | formatDate}}</span>
      </div>
      <span class="content" v-html="articles.content" >
      </span>
    </div>
    <comment :title="title" :commentlist="commentlist"></comment>
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
          "items":[{
            "headimg":"http://img3.imgtn.bdimg.com/it/u=4180799590,1107306819&fm=23&gp=0.jpg",
            "username":"Sara Davis",
            "date":"2106-10-12",
            "commentCon":"房价上涨是趋势，但不能基于上涨是趋势，但不能基于上涨是趋势，但不能基于投资",
            "count":"678"
          },{
            "headimg":"http://img3.imgtn.bdimg.com/it/u=4180799590,1107306819&fm=23&gp=0.jpg",
            "username":"Sara Davis",
            "date":"2106-10-12",
            "commentCon":"房价上涨是趋势，但不能基于上涨是趋势，但不能基于上涨是趋势，但不能基于投资",
            "count":"678"
          }]
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
      //获取数据
      fetchData(cid){
        this.$http.get('/api/articles/'+cid+'.json', [])
        .then((data)=>{
          this.loadingshow=false;
          this.articles=JSON.parse(data.bodyText);
        }, (err)=>{console.log(err);});
      },
    },
    filters: {
      formatDate:function (time) {
        var date = new Date(time);
        return formatDate(date, "MM月dd日");
      }
    }
  }
</script>

<style>
html body{
  max-width: 640px;
  margin: auto;
}
.banner img{
  width: 100%;
}
.articles{
  width: 90%;
  color: #4f4f4f;
  margin: auto;
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
  border-bottom: 1px solid #e2e2e2;
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
</style>
