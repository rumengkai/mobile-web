<template>
  <div id="detail">
    <Failed v-if="failedshow" :msg="failedmsg"></Failed>
    <div class="contents" v-if="showContent">
      <div v-if="articles.sub_type=='V'">
        <Videobox :video="articles.banner" :poster="articles.thumb"></Videobox>
      </div>
      <div v-if="articles.sub_type==='R'">
        <img class="img" :src="articles.thumb" alt="">
        <!-- <Audiobox :music="articles.banner"></Audiobox> -->
      </div>
      <div v-if="articles.sub_type=='A'" class="banner">
        <img :src="articles.banner" alt="">
      </div>
      <div class="article">
        <p class="title">{{articles.name}}</p>
        <div class="info vux-1px-b">
          <img :src="articles.author_pic" alt="" onerror="this.src='http://m.kofuf.com/static/img/logo.png'">
          <span class="author">作者：{{articles.author_name}}</span>
          <span class="created">{{articles.created | formatDate}}</span>
        </div>
        <div v-if="articles.sub_type==='R'">
          <Audiobox :music="articles.banner"></Audiobox>
        </div>
        <div class="content" id="contenthtml" ref="contenthtml" v-html="articles.content" > </div>
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

    <footer v-show="showContent&&!open_channel">
      <div class="gfcj" @click="toChannels">
        <img src="http://m.kofuf.com/static/img/logo.png" alt="">
        <div class="gf"><p class="p1">微信登陆APP</p><p class="p2">阅读体验更佳</p></div>
      </div>
      <div class="download">
        <a id='btnOpenApp'>打开APP</a>
      </div>
    </footer>
    <!-- <footer v-if="open_channel&&showContent" class = "open-channel">
      <div class="gfcj" >
        <img :src="articles.from_channel.thumb" alt="">
        <div class="gf"><p class="p1">{{articles.from_channel.name}}</p><p class="p2">¥{{articles.from_channel.price}}</p></div>
      </div>
      <div class="download" @click="openChannel(articles.from_channel.id)">
        <a id='btnOpenApp'>点此购买</a>
      </div>
    </footer> -->
    <div class="qr_code_pc_inner">
      <div class="qr_code_pc">
        <img id="js_pc_qr_code_img" class="qr_code_pc_img" src="https://www.kofuf.com/static/images/code.png">
        <p>微信扫一扫<br>学财经，长本事</p>
      </div>
    </div>
    <app-download v-if="appdownloadshow" :id="id"></app-download>
    <BackHome></BackHome>
    <Loading v-model="loadingshow" :text="loadtext"></Loading>
  </div>
</template>

<script>
  import 'common/css/reset.css';
  import 'common/js/config.js';
  import geturlpara from 'common/js/geturlpara.js';
  import {formatDate} from 'common/js/date.js';
  import AjaxServer from 'common/js/ajaxServer.js';
  import {isWeiXin,weixinShare} from 'common/js/common.js';
  import Comment from "components/Comment/Comment"
  import Audiobox from "components/Audio/Audio"
  import Videobox from "components/Video/Video"
  import BackHome from "components/BackHome/BackHome"
  import AppDownload from "components/AppDownload/AppDownload"
  import Failed from "components/Failed/Failed"
  import Vue from 'vue'
  import {Loading,LoadMore} from 'vux'
  import VueResource from 'vue-resource'
  Vue.use(VueResource)
  Vue.prototype.$geturlpara=geturlpara
  Vue.http.interceptors.push(function(request, next) {
    // modify headers
    request.headers.set('from', '3');
    request.headers.set('gid', localStorage.getItem("gid"));
    request.headers.set('token', localStorage.getItem("token"));
    request.headers.set('version', VERSION);
    next();
  });
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
        open_channel:false,
      }
    },
    components: {
      Loading,
      Comment,
      Audiobox,
      Videobox,
      AppDownload,
      Failed,
      LoadMore,
      BackHome
    },
    created () {
      var id = this.$geturlpara.getUrlKey("id");
      if(isWeiXin()){
      }
      this.id=id;
      this.fetchData(id);
    },
    mounted(){
      console.log( document.querySelector('a#btnOpenApp'));
      new Mlink({
        mlink: "https://ah88dj.mlinks.cc/AK8f?id="+this.id,
        button: document.querySelector('a#btnOpenApp'),
        autoLaunchApp : false,
      });
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
          document.title = this.articles.name;
          this.open_channel=!!this.articles.from_channel;
          console.log(this.open_channel);
          if(this.articles.status!=0){
            //返回为4，无权限
            if(this.articles.status!=4){
              this.appdownloadshow=true;
            }else{
              window.location.href="/m/channel.html?id="+this.articles.channel;
            }
          }else{
            this.showContent=true;
            //是否展示评论
            this.showComment=this.articles.need_comments;
            window.shareData={
              title:'功夫财经'+this.articles.name,
              link:HOSTM+'/m/detail.html?id='+this.id+'',
              imgUrl:'http://m.kofuf.com/static/img_h5/h5_logo.png',
              desc:this.articles.name
            }
            weixinShare(Vue);
            if (this.showComment) {
              //请求评论
              this.fetchCommentData(id);
            }
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
        var self=this;
        AjaxServer.httpGet(
          Vue,
          HOST+'/api/articles/comments.json?id='+id+'&pn='+pn+'&last_time='+last_time,
          {},
          (data)=>{
            self.loadingshow=false;
            self.datalist=data;
            if (self.datalist.items.length<=0&&self.loadmore==true) {
              self.nonecomment=true;
            }else{
              self.datalist.items=self.datalist.items.map((item)=>{
                item.content=item.content.replace(/\n/g,"<br/>");
                return item
              });
              self.commentlist.items=self.commentlist.items.concat(self.datalist.items);
              if (self.commentlist.items[self.commentlist.items.length-1].postd) {
                self.last_time=self.commentlist.items[self.commentlist.items.length-1].postd;
              }
              if(!self.datalist.has_next){
                self.commentBottomMsg="没有更多数据";
              }
              self.loadmore=true;
            }
          },
          (err)=>{
            self.loadingshow=false;
            console.log(err);
          }
        );
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
          window.location.href="https://ah88dj.mlinks.cc/AK8f?id="+id;
        } else if (u.indexOf('iPhone') > -1) {//苹果手机
          console.log("apple");
          window.location.href="https://ah88dj.mlinks.cc/AK8f?id="+id;
        } else if (u.indexOf('Windows Phone') > -1) {//winphone手机
          console.log("Windows");
          window.location.href="https://ah88dj.mlinks.cc/AK8f?id="+id;
        }else{
          window.location.href="https://ah88dj.mlinks.cc/AK8f?id="+id;
        }
      },
      commentLoad(){
        this.loadmore=false;
        var id = this.$geturlpara.getUrlKey("id")||"1482";
        this.fetchCommentData(id,++this.pn,this.last_time);
      },
      toChannels(){
        window.location.href="/m/home.html"
      },
      openChannel(id){
        window.location.href="/m/channel.html?id="+id;
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
  // background-color: #eee;
}
.showA{
  display: none;
}
#detail{
  position: relative;
  height: 100%;
  .weui-loading_toast{
    position: relative;
    z-index: 1001;
  }
  .contents{
    // box-shadow: 0px 0px 5px #ccc;
    overflow: hidden;
    background-color: #fff;
    padding-bottom: 100px;
    .img{
      width: 100%;
      // height: 4.56rem;
    }
  }
  .banner img{
    width: 100%;
  }
  .article{
    width: 90%;
    color: #4f4f4f;
    margin:14px auto 37px;
    overflow: hidden;
    font-size: 15px;
  }
  .article .title{
    font-size: 21px;
  }
  .article .info{
    height: .9rem;
    overflow: hidden;
    padding: .3rem 0;
    margin-bottom: 10px;
  }
  .article .info .author{
    line-height: 45px;
    margin-left: .3rem;
    color: #a0a0a0;
  }
  .article .info .created{
    float: right;
    line-height: 45px;
    color: #a0a0a0;
  }
  .article .info img{
    width: 45px;
    height:45px;
    border-radius: .45rem;
    float: left;
  }
  .article .content{
    p{
      text-align: justify;
    }
    img{
      // box-shadow: 0px 0px 5px #ccc;
      max-width: 100%;
    }
  }
  .comment-bottom{
    color: #eee;
    p{
      text-align: center;
    }
  }
  footer{
    height: .92rem;
    width: 100%;
    max-width: 680px;
    background-color: #fff;
    box-shadow: rgba(0,0,0,.2) 0 0 10px;
    position: fixed;
    bottom: 0;
    padding: .16rem 0;
    z-index: 10002;
    display: -webkit-box;
    -webkit-box-align: center;
    .gfcj{
      font-size: .4rem;
      color: #ca915c;
      width: 60%;
      img{
        border-radius: 5px;
        width: .8rem;
        height: .8rem;
        display: block;
        float: left;
        margin-left: .3rem;
      }
      .gf{
        width: 2.1rem;
        float: left;
        margin-left: .36rem;
        color: #868686;
        .p1{
          font-size: 12px;
          line-height: .4rem;
          font-weight: 400;
        }
        .p2{
          line-height: .4rem;
          font-weight: 100;
          font-size: 12px;
        }
      }
    }
    .download{
      width: 36%;
      text-align: right;
      a{
        // width: 148px;
        height: .68rem;
        display: block;
        color: #ca915c;
        border: 1px solid #ca915c;
        border-radius: 5px;
        text-align: center;
        line-height: .68rem;
        background: #fff;
        font-size: 18px;
        box-sizing: content-box;
        margin-right: .2rem;
        margin-left: auto;
      }
    }
  }
  .open-channel{
    .gfcj{
      .gf{
        width: 2.87rem;
        .p1{
          font-size: .26rem;
          line-height: .4rem;
          font-weight: 400;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          color: #333;
        }
        .p2{
          line-height: .4rem;
          font-weight: 100;
          font-size: 12px;
          color: #ca915c;
        }
      }

    }
  }
  strong{
    font-weight: 900;
  }
}
</style>
