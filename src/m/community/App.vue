<template>
  <div id="united_dynamic" ref="imageCommunity">
    <div v-show="showContent">
      <div class="content_1">
        <div class="united_content">
          <activity-united v-if="showContent" :dataInfo="dataUnited"></activity-united>
        </div>
      </div>
      <div v-if="dataLive != null" class="content_2">
        <title-bar :title="dataLive.name" more="往期直播" :img="dataLive.image" line="line" url="/m/lives.html"></title-bar>
        <div v-for="(item,index) in dataLive.items" :key="index">
					<live-item :liveItem="item"></live-item>
				</div>
      </div>
      <div v-if="dataActivity != null" class="content_3">
        <title-bar :title="dataActivity.name" more="查看全部" :img="dataActivity.image" line="line" url="/mengqi/#/activity/list"></title-bar>
				<activities-list :dataList="dataActivity.items"></activities-list>
      </div>
      <div class="content_4">
        <title-bar v-if="dataTweetsList.length>0" :title="dataTweets.name" :img="dataTweets.image" line="line" ></title-bar>
        <activity-author v-if="dataTweetsList.length>0&&showContent" v-on:toCommunity="getCommunity" v-on:toIndex="getAuthor" v-on:toComment="getComment" v-on:toDelete="getDeleteComment" v-on:toLiked="getLikedComment" v-on:toUnLiked="getUnLikedComment" :dataInfo="dataTweets" mark="1"></activity-author>
        <!-- <div v-show="tweetHasNext">
          <img class="image_bg" v-bind:style="{height: height}" src="https://static2.kofuf.com/1524907490695.png" />
        </div> -->
        <div v-show="tweetHasNext" class="marginLR15 open-united">
          <a class="open_united" id="openApp">打开功夫财经，查看更多门派动态</a>
        </div>
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
    getLikeComment,
    getUnLikeComment,
    getDeleteComment,
    getUnitedIndex
  } from 'src/api/community.js'
  import ActivityAuthor from 'components/ActivityAuthor/ActivityAuthor'
  import ActivityUnited from 'components/ActivityUnited/ActivityUnited'
  import TitleBar from 'components/TitleBar/TitleBar'
  import LiveItem from 'components/LiveItem/LiveItem'
  import ActivitiesList from 'components/ActivitiesList/ActivitiesList'
  import openApp from "components/openAPP/openAPP"
  import BackHome from "components/BackHome/BackHome"
  import { setTimeout } from 'timers';
  Vue.prototype.$geturlpara=geturlpara
  export default {
    name: 'unitedIndex',
    data () {
      return {
        id: null,
        followed: null,
        showContent: false,
        tweetHasNext: false,
        dataUnited: {},
        dataLive: null,
        dataActivity: null,
        dataTweets: {},
        dataTweetsList: [],
        defaultimg: 'http://image.51xy8.com/1496311047717.jpg',
      }
    },
    components: {
      ActivityUnited,
      ActivityAuthor,
      TitleBar,
      LiveItem,
      ActivitiesList,
      openApp,
      BackHome
    },
    beforeCreate(){
      //授权
      if(!isWeiXin()){
        message("请关注'功夫财经'公众号")
      }
      getAuth(cookie, querystring)
    },
    created () {
      let id = this.$geturlpara.getUrlKey("id");
      shareData("群主页",location.href, '群主页动态')
      weixinShare();
      this.id = id
      this.fetchData();
    },
    mounted () {
    },
    methods: {
      fetchData: function() {
        this.showContent = false
        getUnitedIndex({id: this.id}).then((res) => {
          this.showContent = true
          try {
            if (res.status == 0) {
              console.log(res)
              document.title = res.name
              this.tweetHasNext = res.tweets.has_next
              this.toApp();
              this.followed = res.followed
              this.dataUnited = {
                teacher: res.teacher,
                member_price: res.member_price,
                member_size: res.member_size,
                post_count: res.post_count,
                price: res.price,
                followed: res.followed,
                id: res.id,
                no_read_num: res.no_read_num,
                name: res.name,
                push: res.push,
                logo: res.logo
              }
              if (res.lives != undefined) {
                this.dataLive = res.lives
              }
              if (res.activities != undefined) {
                this.dataActivity = res.activities
              }
              if (res.tweets != undefined && res.tweets.items.length>0) {
                res.tweets.items.map((item) => {
                  item.text = stringBr(item.text)
                })
                // res.tweets.items.map((item) => {
                //   item.eightStatus = false
                // })
                this.dataTweets = res.tweets
                this.dataTweetsList = res.tweets.items
                console.log(this.dataTweetsList)
              }
              console.log(this.dataUnited)
            }
          } catch(error) {
            toast(error)
          }
        })
      },
      toApp: function() {
        new Mlink({
          mlink: "https://ah88dj.mlinks.cc/AeBD?id="+this.id,
          button: document.querySelector('a#openApp'),
          autoLaunchApp : false,
        });
      },
      getCommunity: function(id) {
        window.location.href = "/m/tweet.html?id="+id;
      },
      getComment: function(id) {
        if (this.followed) {
          window.location.href = "/m/tweet.html?id="+id;
        } else {
          toast('你还没有加入门派');
        }
      },
      getAuthor: function(id) {
        console.log(id)
        window.location.href = "/m/moments.html?id="+id+"&type=pid";
      },
      getDeleteComment: function(id) {
        console.log(id)
        if (this.followed) {
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
        } else {
          toast('你还没有加入门派')
        }
      },
      getLikedComment: function(id) {
        console.log(id)
        console.log(this.followed)
        if (this.followed) {
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
        } else {
          toast('你还没有加入门派')
        }
      },
      getUnLikedComment: function(id) {
        console.log(id)
        if (this.followed) {
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
        } else {
          toast('你好没有加入门派')
        }
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
