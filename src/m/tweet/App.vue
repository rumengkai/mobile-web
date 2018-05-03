<template>
  <div id="united_dynamic" ref="imageCommunity">
    <div v-show="showContent">
      <div class="content_1">
        <div class="united_content">
          <activity-author v-if="showContent" v-on:toIndex="getAuthor" v-on:toDelete="getDeleteComment" v-on:toLiked="getLikedComment" v-on:toUnLiked="getUnLikedComment" :dataInfo="userInfo"></activity-author>
          <div class="marginLR15">
            <a class="add_united" @click="toCommunity" id="openApp_1">加入大校门查看完整动态> </a>
          </div>
          <div class="marginLR15">
            <div class="image_united" v-bind:style="{height : height}">
              <activity-images :dataQuery="dataQuery" :width="width"></activity-images>
              <img class="image_bg" v-bind:style="{height: width}" src="https://static2.kofuf.com/1524907490695.png" />
            </div>
          </div>
          <div style="margin: 0 15px;">
            <a class="open_united" @click="toCommunity" id="openApp_2">打开功夫财经，打开原文</a>
          </div>
        </div>
      </div>
      <div class="content_1 sub_content_1" v-show="dataInfoList.length>0" >
        <div class="united_content">
          <div class="title">评论</div>
          <activity-author v-if="dataInfoList.length>0&&showContent" v-on:toAuthorHeight="getAuthorHeight" v-on:toIndex="getAuthor" v-on:toDelete="getDeleteCommunity" v-on:toLiked="getLikedCommunity" v-on:toUnLiked="getUnLikedCommunity" :dataInfo="dataInfo"></activity-author>
          <img class="image_bg_2" v-bind:style="{height: authorHeight}" src="https://static1.kofuf.com/1524908164856.png" />
          <div class="marginLR15">
            <a class="open_united" @click="toCommunity" id="openApp_3">打开功夫财经，查看更多评论</a>
          </div>
        </div>
      </div>
      <div>
        <open-app :id="id"></open-app>
      </div>
      <div class="qr_code_pc_inner">
        <div class="qr_code_pc">
          <img id="js_pc_qr_code_img" class="qr_code_pc_img" src="http://www.kofuf.com/static/images/code.png">
          <p>微信扫一扫<br>学财经，长本事</p>
        </div>
      </div>
      <back-home></back-home>
    </div>
  </div>
</template>

<script>
  import 'common/js/config.js';
  import {
    isWeiXin,
		weixinShare,
		isiOS
  } from 'common/js/common.js';
  import geturlpara from 'common/js/geturlpara.js';
  import Vue from 'vue'
  import {
    message,
    toast,
    stringBr,
    shareData
  } from 'common/js/assembly'
  import {
    querystring,
    cookie
  } from 'vux'
  import {
    getCommunityDetail,
    getLikedCommunity,
    getUnLikedCommunity,
    getDeleteCommunity,
    getLikeComment,
    getUnLikeComment,
    getDeleteComment,
  } from 'src/api/community.js'
  import ActivityAuthor from 'components/ActivityAuthor/ActivityAuthor'
  import ActivityImages from 'components/ActivityImages/ActivityImages'
  import openApp from "components/openAPP/openAPP"
  import BackHome from "components/BackHome/BackHome"
  import { setTimeout } from 'timers';
  Vue.prototype.$geturlpara=geturlpara
  export default {
    name: 'unitedDynamic',
    data () {
      return {
        id: null,
        showContent: false,
        dataInfoList: [],
        userInfo: {},
        dataInfo: {},
        dataQuery: [],
        imageWidth: null,
        width: null,
        height: null,
        authorHeight: null,
        defaultimg: 'http://image.51xy8.com/1496311047717.jpg',
        share_image: 'http://image.51xy8.com/1496311047717.jpg',
        share_text: '门派动态',
        share_title: '动态',
        share_url: location.href
      }
    },
    components: {
      ActivityAuthor,
      ActivityImages,
      openApp,
      BackHome
    },
    beforeCreate(){
      //授权
      if(!isWeiXin()){
        message("请关注'功夫财经'公众号")
      } else {
        getAuth(cookie,querystring)
      }
    },
    created () {
      let id = this.$geturlpara.getUrlKey("id");
      this.id = id
      this.fetchData();
      this.shareWeixin();
    },
    mounted () {
      window.addEventListener('scroll', this.handleScrollTop);
    },
    methods: {
      shareWeixin: function() {
        shareData(this.share_title, this.share_url, this.share_text, this.share_image)
        weixinShare();
      },
      fetchData: function() {
        let userItem = {}
        let userList = []
        this.showContent = false
        getCommunityDetail({id: this.id}).then((res) => {
          this.showContent = true
          this.getResizeWidth();
          console.log(res)
          try {
            if (res.status == 0) {
              this.share_title = res.share_title
              this.share_url = res.share_url
              this.share_text = res.share_text
              this.share_image = res.share_image
              this.shareWeixin()
              res.text = stringBr(res.text)
              res.comments.items.map((item) => {
                item.content = stringBr(item.content)
              })
              userItem = {
                can_delete: res.can_delete,
                id: res.id,
                content: res.text,
                like_count: res.like_count,
                liked: res.liked,
                time: res.time,
                user: res.user
              }
              userList.push(userItem)
              this.userInfo = {items: userList}
              this.dataQuery = res.images
              // 特殊处理
              this.dataInfoList = res.comments.items
              if(res.comments.items.length>3){
                this.dataInfo = {items: res.comments.items.slice(0,2)}
              }else{
                this.dataInfo = {items: this.dataInfoList}
              }
              if (this.dataInfoList.length<=3) {
                setTimeout(function(){
                  this.height = 'auto'
                }.bind(this), 0)
              }
            } else {
              toast(res.error)
            }
          } catch(error) {
            toast(error)
          }
        })
      },
      toCommunity: function() {
        window.location.href = location.origin+'/m/community.html?id='+this.id
      },
      getResizeWidth: function() {
        let _self = this;
        window.onresize = (function temp() {
          if (_self.$refs.imageCommunity != undefined) {
            _self.imageWidth = (parseInt(_self.$refs.imageCommunity.getBoundingClientRect().width)-76-8)/3;
            _self.width = _self.imageWidth+'px'
            _self.height = _self.width
          }
        })();
      },
      getAuthorHeight: function(val) {
        console.log(val)
        this.authorHeight = val+'px'
      },
      getAuthor: function(id) {
        console.log(id)
        window.location.href = "/m/moments.html?id="+id+"&type=mid"
        // window.location.href = "/m/tweet.html?id=" + id;
      },
      getDeleteComment: function(id) {
        console.log(id)
        this.showContent = false
        getDeleteComment({id: id}).then((res) => {
          this.showContent = true
          try {
            if (res.status == 0) {
              this.fetchData()
            } else {
              toast(res.error)
            }
          } catch(error) {
            toast(error)
          }
        })
      },
      getLikedComment: function(id) {
        console.log(id)
        this.showContent = false
        getLikeComment({id: id}).then((res) => {
          this.showContent = true
          try {
            if (res.status == 0) {
              this.fetchData()
            }
          } catch(error) {
            toast(error)
          }
        })
      },
      getUnLikedComment: function(id) {
        console.log(id)
        this.showContent = false
        getUnLikeComment({id: id}).then((res) => {
          this.showContent = true
          try {
            if (res.status == 0) {
              this.fetchData()
            }
          } catch(error) {
            toast(error)
          }
        })
      },
      getDeleteCommunity: function(id) {
        console.log(id)
        this.showContent = false
        getDeleteCommunity({id: id}).then((res) => {
          this.showContent = true
          try {
            if (res.status == 0) {
              this.fetchData()
            } else {
              toast(res.error)
            }
          } catch(error) {
            toast(error)
          }
        })
      },
      getLikedCommunity: function(id) {
        console.log(id)
        this.showContent = false
        getLikedCommunity({id: id}).then((res) => {
          this.showContent = true
          try {
            if (res.status == 0) {
              this.fetchData()
            } else {
              toast(res.error)
            }
          } catch(error) {
            toast(error)
          }
        })
      },
      getUnLikedCommunity: function(id) {
        console.log(id)
        this.showContent = false
        getUnLikedCommunity({id: id}).then((res) => {
          this.showContent = true
          try {
            if (res.status == 0) {
              this.fetchData()
            } else {
              toast(res.error)
            }
          } catch(error) {
            toast(error)
          }
        })
      },
      handleScrollTop: function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        let selfTop = null
        console.log(scrollTop)
        console.log(scrollTop>this.imageWidth-7)
        if (scrollTop>this.imageWidth-7) {
          setTimeout(function(){
            this.height = 'auto'
          }.bind(this), 500)
        }
        if(this.dataQuery.length<=3){
          selfTop = this.imageWidth
        }else if(this.dataQuery.length<=6&&this.dataQuery.length>3) {
          selfTop = this.imageWidth*2
        }else{
          selfTop = this.imageWidth*3
        }
        if(scrollTop>selfTop){
          setTimeout(function(){
            this.dataInfo = {items: this.dataInfoList}
            this.destroyed();
          }.bind(this), 500)
        }
      },
      destroyed () {
        window.removeEventListener('scroll', this.handleScrollTop)
      }
    }
  }
</script>
<style lang="less">
@import '../../common/css/reset.css';
@import '~vux/src/styles/1px.less';
@import "../index/App.less";
@import './App.less';
</style>
