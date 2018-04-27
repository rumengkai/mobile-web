<template>
  <div id="community_detail">
    <div>
      <div class="content_1">
        <div class="community_content">
          <activity-author v-if="showContent" v-on:toIndex="getAuthor" v-on:toDelete="getDeleteCommunity" v-on:toLiked="getLikedCommunity" v-on:toUnLiked="getUnLikedCommunity" :dataInfo="userInfo"></activity-author>
          <div>
            <a class="add_community" id="openApp_1">加入大校门查看完整动态> </a>
          </div>
          <div class="image_community" v-bind:style="{height : height}" ref="imageCommunity">
            <activity-images v-if="showContent" :dataQuery="dataQuery" :width="width"></activity-images>
          </div>
          <a class="open_community" id="openApp_2">打开功夫财经，打开原文</a>
        </div>
      </div>
      <div class="content_1 sub_content_1" v-show="dataInfoList.length>0" >
        <div class="community_content">
          <div class="title">评论</div>
          <activity-author v-if="showContent"  v-on:toIndex="getAuthor" v-on:toDelete="getDeleteCommunity" v-on:toLiked="getLikedCommunity" v-on:toUnLiked="getUnLikedCommunity" :dataInfo="dataInfo"></activity-author>
          <a class="open_community" id="openApp_3">打开功夫财经，查看更多评论</a>
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
    getDeleteCommunity
  } from 'src/api/community.js'
  import ActivityAuthor from 'components/ActivityAuthor/ActivityAuthor'
  import ActivityImages from 'components/ActivityImages/ActivityImages'
  import openApp from "components/openAPP/openAPP"
  import BackHome from "components/BackHome/BackHome"
  import { setTimeout } from 'timers';
  Vue.prototype.$geturlpara=geturlpara
  export default {
    name: 'communityDetail',
    data () {
      return {
        id: null,
        showContent: false,
        dataInfoList: [],
        userInfo: {},
        dataInfo: {},
        dataQuery: [],
        width: null,
        height: null,
        defaultimg: 'http://image.51xy8.com/1496311047717.jpg',
      }
    },
    components: {
      ActivityAuthor,
      ActivityImages,
      openApp,
      BackHome
    },
    beforeCreate(){
    },
    created () {
      let id = this.$geturlpara.getUrlKey("id");
      this.id = id
      //授权
      if(isWeiXin()){
        getAuth(cookie,querystring)
      } else {
        message("请关注'功夫财经'公众号")
      }
      shareData("动态",location.href, '动态评论')
      weixinShare();
    },
    mounted () {
      this.fetchData();
      window.addEventListener('scroll', this.handleScrollTop);
      this.getResizeWidth();
      this.toApp();
    },
    methods: {
      fetchData: function() {
        let userItem = {}
        let userList = []
        this.showContent = false
        getCommunityDetail({id: this.id}).then((res) => {
          this.showContent = true
          console.log(res)
          try {
            if (res.status == 0) {
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
              if (this.dataInfoList.length<=1) {
                setTimeout(function(){
                  this.height = 'auto'
                }.bind(this), 500)
              }
            } else {
              toast(res.error)
            }
          } catch(error) {
            toast(error)
          }
        })
      },
      toApp: function() {
        new Mlink({
          mlink: "https://ah88dj.mlinks.cc/AK8f?id="+this.id,
          button: document.querySelector('a#openApp_1'),
          autoLaunchApp : false,
        });
        new Mlink({
          mlink: "https://ah88dj.mlinks.cc/AK8f?id="+this.id,
          button: document.querySelector('a#openApp_2'),
          autoLaunchApp : false,
        });
        new Mlink({
          mlink: "https://ah88dj.mlinks.cc/AK8f?id="+this.id,
          button: document.querySelector('a#openApp_3'),
          autoLaunchApp : false,
        });
      },
      getResizeWidth: function() {
        let _self = this;
        window.onresize = (function temp() {
          if (_self.$refs.imageCommunity != undefined) {
            // console.log(_self.$refs.imageCommunity.getBoundingClientRect().width)
            _self.width = (parseInt(_self.$refs.imageCommunity.getBoundingClientRect().width)-46-8)/3+'px'
            _self.height = _self.width
          }
        })();
      },
      getAuthor: function(id) {
        console.log(id)
        window.location.href = "/m/community-detail.html?id=" + id;
      },
      getDeleteCommunity: function(id) {
        console.log(id)
        this.showContent = false
        getDeleteCommunity({id: id}).then((res) => {
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
      getLikedCommunity: function(id) {
        console.log(id)
        this.showContent = false
        getLikedCommunity({id: id}).then((res) => {
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
      getUnLikedCommunity: function(id) {
        console.log(id)
        this.showContent = false
        getUnLikedCommunity({id: id}).then((res) => {
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
      handleScrollTop: function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        let selfTop = null
        console.log(scrollTop)
        if (scrollTop>90) {
          setTimeout(function(){
            this.height = 'auto'
          }.bind(this), 500)
        }
        if(this.dataQuery.length<=3){
          selfTop = 140
        }else if(this.dataQuery.length<=6&&this.dataQuery.length>3) {
          selfTop = 210
        }else{
          selfTop = 270
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
