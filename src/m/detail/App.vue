<template>
  <div id="detail">
    <Failed v-if="failedshow" :msg="failedmsg"></Failed>
    <Loading v-model="loadingshow" :text="loadtext"></Loading>
    <div class="content" v-if="showContent">
      <div v-if="articles.sub_type=='V'">
        <Videobox :video="articles.banner" :poster="articles.thumb"></Videobox>
      </div>
      <div v-if="articles.sub_type==='R'">
        <Audiobox :music="articles.banner"></Audiobox>
      </div>
      <div v-if="articles.sub_type=='A'" class="banner">
        <img :src="articles.banner" alt="">
      </div>
      <div class="article">
        <p class="title">{{articles.name}}</p>
        <div class="info vux-1px-b">
          <img :src="articles.author_pic" alt="" onerror="this.src='http://182.92.99.123:8080/privilege/uploadedFile/1491147612922.jpg?imageView2/1/w/200/h/133/q/100|imageslim'">
          <span class="author">作者：{{articles.author_name}}</span>
          <span class="created">{{articles.created | formatDate}}</span>
        </div>
        <div class="content" v-html="articles.content" ></div>
      </div>
      <!-- 评论加载更多，btn -->
      <div v-if="showComment">
        <comment  :name="articles.name" :commentlist="commentlist.items" :id="id"></comment>
        <div v-if='nonecomment' class="comment-bottom">
          <p>暂无数据</p>
        </div>
        <div v-if='!nonecomment' class="comment-bottom">
          <p v-if="loadmore" @click="commentLoad">{{commentBottomMsg}}</p>
          <load-more v-else tip="正在加载">正在加载</load-more>
        </div>
      </div>
    </div>
    <footer v-if="showContent">
      <div class="gfcj" @click="toChannels">
        <img src="./images/logo.png" alt="">
        <div class="gf"><p class="p1">功夫财经</p><p class="p2">学财经&nbsp;&nbsp;&nbsp;长本事</p></div>
      </div>
      <div class="download">
        <a @click='openApp' id='btnOpenApp'>打开APP</a>
      </div>
    </footer>
    <app-download v-if="appdownloadshow"></app-download>
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
  import AppDownload from "components/AppDownload/AppDownload"
  import Failed from "components/Failed/Failed"
  import Vue from 'vue'
  import {Loading,LoadMore} from 'vux'
  import VueResource from 'vue-resource'
  Vue.use(VueResource)
  Vue.prototype.$geturlpara=geturlpara
  //sub_type:a:文章 r：音频  v：视频
  export default {
    name: 'detail',
    data () {
      return {
        id:0,
        showContent:false,
        paly:0,
        showplay:true,
        commentlist:{
          "items":[]
        },
        articles:{},
        showComment:false,
        loadingshow: true,
        loadtext: 'loading...',
        appdownloadshow:false,
        failedshow:false,
        failedmsg:"服务请求失败，请刷新重试",
        nonecomment:false,
        loadmore:true,
        commentBottomMsg:"点击，获取更多数据",
        pn:0,
        last_time:"",
      }
    },
    components: {
      Loading,
      Comment,
      Audiobox,
      Videobox,
      AppDownload,
      Failed,
      LoadMore
    },
    created () {
      var id = this.$geturlpara.getUrlKey("id");
      this.id=id;
      this.fetchData(id);
      // var self=this;
      // setTimeout(function () {
      //   new Mlink({
      //     mlink: "https://a.mlinks.cc/AK8f",
      //     button: document.querySelector('a#btnOpenApp'),
      //     autoLaunchApp : false,
      //   });
      // },100);
    },
    methods: {
      openApp(){
        this.getPhoneType();
      },
      //获取数据
      fetchData(id){
        this.$http.get(HOST+'/api/articles/'+id+'.json', [])
        .then((data)=>{
          this.loadingshow=false;
          this.articles=JSON.parse(data.bodyText);

          this.fetchCommentData(id);
          if(this.articles.status!=0){
            //返回为4，无权限
            if(this.articles.status==4){
              //window.location.href="app-download.html"
              this.appdownloadshow=true;
            }else{
              this.failedmsg=this.articles.error;
              this.failedshow=true;
              // this.logErr(this.articles.error);
            }
          }else{
            this.showContent=true;
            //是否展示评论
            this.showComment=this.articles.need_comments=="false"?false:true;
          }
        }, (err)=>{
          this.loadingshow=false;
          this.failedmsg="请求参数有误";
          this.failedshow=true;
          // this.logErr("请在网络环境下访问");
          console.log(err);
        });
        //10秒之后loading消失
        var self=this;
        setTimeout(()=>{
          self.loadingshow=false;
        },10000);
      },

      //请求评论数据
      fetchCommentData(id,pn,last_time){
        this.$http.get(HOST+'/api/articles/comments.json?id='+id+'&pn='+pn+'&last_time='+last_time, [])
        .then((data)=>{
          this.loadingshow=false;
          this.datalist=JSON.parse(data.bodyText);
          if (this.datalist.items.length<=0&&this.loadmore==true) {
            this.nonecomment=true;
          }else{
            this.commentlist.items=this.commentlist.items.concat(this.datalist.items);
            if (this.commentlist.items[this.commentlist.items.length-1].postd) {
              this.last_time=this.commentlist.items[this.commentlist.items.length-1].postd;
            }
            if(!this.datalist.has_next){
              this.commentBottomMsg="没有更多数据";
            }
            this.loadmore=true;
          }
        }, (err)=>{
          this.loadingshow=false;
          console.log(err);
        });
      },
      logErr(err){
        this.$vux.alert.show({
          title: '提示',
          content: err,
          dialogTransition:"",
          maskTransition:"",
          onShow () {},
          onHide () {}
        })
      },
      //判断手机类型
      getPhoneType(){
        var id = this.$geturlpara.getUrlKey("id");
        var u = navigator.userAgent;
        //应用市场地址：
        if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
          console.log("Android");
          // window.location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.avatar.kungfufinance"
          window.location.href="https://a.mlinks.cc/AK8f?id="+id;
        } else if (u.indexOf('iPhone') > -1) {//苹果手机
          console.log("apple");
          window.location.href="https://a.mlinks.cc/AK8f?id="+id;
        } else if (u.indexOf('Windows Phone') > -1) {//winphone手机
          console.log("Windows");
          window.location.href="https://a.mlinks.cc/AK8f?id="+id;
        }else{
          window.location.href="https://a.mlinks.cc/AK8f?id="+id;
        }
      },
      commentLoad(){
        this.loadmore=false;
        var id = this.$geturlpara.getUrlKey("id")||"1482";
        this.fetchCommentData(id,++this.pn,this.last_time);
      },
      toChannels(){
        window.location.href="channels.html"
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
body{
  background-color: #eee;
}
.showA{
  display: none;
}
#detail{
  height: 100%;
  .weui-loading_toast{
    position: relative;
    z-index: 1001;
  }
  .content{
    overflow: hidden;
    background-color: #fff;
    padding-bottom: 100px;
  }
  .banner img{
    width: 100%;
  }
  .article{
    width: 90%;
    color: #4f4f4f;
    margin:14px auto 37px;
    overflow: hidden;
    font-size: .3rem;
  }
  .article .title{
    font-size: .42rem;
  }
  .article .info{
    height: .9rem;
    overflow: hidden;
    padding: .3rem 0;
    margin-bottom: 10px;
  }
  .article .info .author{
    line-height: .9rem;
    margin-left: .3rem;
    color: #a0a0a0;
  }
  .article .info .created{
    float: right;
    line-height: .9rem;
    color: #a0a0a0;
  }
  .article .info img{
    width: .9rem;
    height:.9rem;
    border-radius: .45rem;
    float: left;
  }
  .article .content img{
    max-width: 100%;
  }
  .comment-bottom{
    color: #eee;
    p{
      text-align: center;
    }
  }
  footer{
    height: 46px;
    width: 100%;
    max-width: 680px;
    background-color: #fff;
    box-shadow: rgba(0,0,0,.2) 0 0 10px;
    position: fixed;
    bottom: 0;
    padding: 8px 0;
    z-index: 1000;
    display: -webkit-box;
    -webkit-box-align: center;
    .gfcj{
      font-size: 20px;
      color: #ff8929;
      width: 60%;
      img{
        width: 40px;
        height: 40px;
        display: block;
        float: left;
        margin-left: 15px;
      }
      .gf{
        width: 105px;
        float: left;
        margin-left: 18px;
        color: #868686;
        .p1{
          font-size: 16px;
          line-height: 20px;
          font-weight: 400;
        }
        .p2{
          line-height: 20px;
          font-weight: 100;
          font-size: 12px;
        }
      }
    }
    .download{
      width: 40%;
      text-align: right;
      a{
        // width: 148px;
        height: 40px;
        display: block;
        color: #ff8929;
        border: 1px solid #ff8929;
        border-radius: 5px;
        text-align: center;
        line-height: 40px;
        background: #fff;
        font-size: 18px;
        box-sizing: content-box;
        margin-right: 15px;
        margin-left: auto;
      }
    }
  }
}
</style>
