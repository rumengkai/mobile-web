<template>
  <div id="detail">
    <Failed v-if="failedshow" :msg="failedmsg"></Failed>
    <div class="contents" v-if="showContent">
			<div v-if="articles.share_read_index&&articles.share_read_index>0" class="share-free-read">
				<img class="img-bg" src="https://static2.kofuf.com/1521010995711.png" alt="">
				<img class="img-dz" src="https://static1.kofuf.com/1521011011648.png" alt="">
				<p>您是第 <span> {{articles.share_read_index?articles.share_read_index:0}} </span> 个抢到免费试读的读者</p>
			</div>
			<div v-else>
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
			</div>
      <div class="article">
        <p class="title">{{articles.name}}</p>
        <div class="info vux-1px-b" @click="toUserCenter(articles)">
          <img :src="articles.author_pic" alt="" onerror="this.src='https://m.kofuf.com/static/img/logo.png'">
          <span class="author">作者：{{articles.author_name}}</span>
          <span class="created">{{articles.created | formatDate}}</span>
        </div>
        <div v-if="articles.sub_type==='R'">
          <Audiobox :music="articles.banner" :id="id"></Audiobox>
        </div>
        <div class="content" id="contenthtml" ref="contenthtml" v-html="articles.content" > </div>
      </div>
      <!-- 评论加载更多，btn -->
      <div v-if="showComment">
        <comment  :name="articles.name" :commentlist="commentlist.items" :id="id"></comment>
        <div v-if='nonecomment' class="comment-bottom">
          <p>暂无数据</p>
        </div>
        <!-- <div v-if='!nonecomment' class="comment-bottom">
          <p v-if="loadmore" @click="commentLoad">{{commentBottomMsg}}</p>
          <load-more v-else tip="正在加载">正在加载</load-more>
        </div> -->
        <LazyLoadingMore url="/api/articles/comments.json" v-on:getData="loadList" params="items" :id="id"></LazyLoadingMore>
      </div>
    </div>
		<div v-if="articles.share_read_index&&articles.share_read_index>0" class="footer" @click="toBuyChannel">
			<p>订阅：{{articles.audio_sub_title}}</p>
		</div>
		<div v-else>
			<footer v-show="showContent&&!open_channel">
				<div class="gfcj" @click="toChannels">
					<img src="https://m.kofuf.com/static/img/logo.png" alt="">
					<div class="gf"><p class="p1">微信登陆APP</p><p class="p2">阅读体验更佳</p></div>
				</div>
				<div class="download">
					<a id='btnOpenApp'>打开APP</a>
				</div>
			</footer>
		</div>
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
        <img id="js_pc_qr_code_img" class="qr_code_pc_img" src="http://www.kofuf.com/static/images/code.png">
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
  import { logs } from 'src/api/logs';
  import {formatDate} from 'common/js/date.js';
  import AjaxServer from 'common/js/ajaxServer.js';
  import {isWeiXin,weixinShare} from 'common/js/common.js';
  import LazyLoadingMore from 'components/LazyLoadingMore/LazyLoadingMore';
  import Comment from "components/Comment/Comment"
  import Audiobox from "components/Audio/Audio"
  import Videobox from "components/Video/Video"
  import BackHome from "components/BackHome/BackHome"
  import AppDownload from "components/AppDownload/AppDownload"
  import Failed from "components/Failed/Failed"
  import Vue from 'vue'
	import {Loading,LoadMore,querystring} from 'vux'
	import { getDetail } from "src/api/detail"
	Vue.prototype.$geturlpara=geturlpara
	import VueResource from 'vue-resource'
	Vue.use(VueResource)
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
				shareFrom: querystring.parse().share_from,
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
      BackHome,
      LazyLoadingMore
    },
    created () {
      var id = this.$geturlpara.getUrlKey("id");
      if(isWeiXin()){
      }
      this.id=id;
      this.fetchData(id);
    },
    mounted(){
      // console.log( document.querySelector('a#btnOpenApp'));
      new Mlink({
        mlink: "https://ah88dj.mlinks.cc/AK8f?id="+this.id,
        button: document.querySelector('a#btnOpenApp'),
        autoLaunchApp : false,
      });
      // 埋点统计
      let params={
        id:this.id,
        action:'item_detail',
        end_pos:''
      }
      logs(params).then(response => {
        this.loadingshow = false
      })
    },
    methods: {
      openApp(){
        this.getPhoneType();
      },
      //获取数据
      fetchData(id){
        getDetail({id:id,share_from:this.shareFrom?this.shareFrom:""}).then(res=>{
          this.fetchCommentData(id);
          this.loadingshow=false;
          this.articles=res;
          document.title = this.articles.name;
          this.open_channel=!!this.articles.from_channel;
          //请求评论
          if(this.articles.status!=0){
            //返回为4，无权限
            if(this.articles.status!=4){
              this.appdownloadshow=true;
            }else{
							if(this.articles.share_read_index&&this.articles.share_read_index>0){
								/* 分享免费看 */
							}else{
								if (this.articles.type===0) {
									window.location.href="/m/channel.html?id="+this.articles.channel;
								}else if(this.articles.type==1){
									window.location.href="/m/channel-small.html?id="+this.articles.channel;
								}
							}
            }
          }else{
            this.showContent=true;
            //是否展示评论
            this.showComment=this.articles.need_comments;
            window.shareData={
              title: this.articles.name,
              link: this.articles.share_url?this.articles.share_url:HOSTM+'/m/detail.html?id='+this.id+'',
              imgUrl: this.articles.large_thumb,//||this.articles.screenshots + '?imageView2/1/w/300/h/300/q/100|imageslim',
              desc: this.articles.share
            }
            weixinShare(Vue);
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
      fetchCommentData(id,pn=0,last_time){
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
              // if (self.commentlist.items[self.commentlist.items.length-1].postd) {
              //   self.last_time=self.commentlist.items[self.commentlist.items.length-1].postd;
              // }
              // if(!self.datalist.has_next){
              //   self.commentBottomMsg="没有更多数据";
              // }
              // self.loadmore=true;
            }
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
      loadList(data){
        this.commentlist.items=this.commentlist.items.concat(data);
      },
      toChannels(){
        window.location.href="/m/home.html"
      },
      openChannel(id){
        window.location.href="/m/channel.html?id="+id;
			},
			toBuyChannel(){
				window.location.href="/m/channel.html?id="+this.articles.channel;
			},
      toUserCenter(item){
        window.location.href="/m/moments.html?id="+item.author_id;
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
@import "../index/App.less";
@import './App.less';
</style>
