<template>
  <div id="channelsdetail">
    <Loading v-model="loadingshow" :text="loadtext"></Loading>
    <x-header ><a slot="right" @click="share"><span type="search">分享</span></a></x-header>
    <scroller lock-x ref="scrollerEvent">
      <div class="content" v-show="showContent">
        <div class="large-img">
          <img :src="channelsinfo.large_thumb" alt="">
        </div>
        <ul class="channels-info">
          <li class="vux-1px-b">
            <p class="title">专栏介绍</p>
            <p class="con">{{channelsinfo.abstract}}</p>
          </li>
          <li class="vux-1px-b">
            <p class="title">适宜人群</p>
            <p class="con">{{channelsinfo.suit_crowds}}</p>
          </li>
          <li class="vux-1px-b">
            <p class="title">订阅须知</p>
            <p class="con" v-html="information">{{information}}</p>
          </li>
          <li>
            <p class="title">最新更新</p>
            <ul class="newupdate">
              <li class="vux-1px-b" v-for="item in channelsinfo.articles" @click="geDetail(item.id)">
                <img :src="item.thumb" alt="" onerror="this.src='http://182.92.99.123:8080/privilege/uploadedFile/1491147612922.jpg?imageView2/1/w/200/h/133/q/100|imageslim'">
                <p class="title">{{item.name}}</p>
                <p class="date">{{item.published | formatDate2}}</p>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </scroller>
    <footer>
      <div class="freeread" @click="freeRead">
        <span>免费试读</span>
      </div>
      <div class="subscribe" @click="subscribe">
        <span>订阅：<span>¥{{channelsinfo.suites[0].price}}/年</span></span>
      </div>
    </footer>
  </div>
</template>

<script>
  import 'common/css/reset.css';
  import 'common/js/common.js';
  import geturlpara from 'common/js/geturlpara.js';
  import Vue from 'vue'
  import { formatDate2 } from 'common/js/date.js';
  import {Loading,XHeader,Scroller} from 'vux'
  import VueResource from 'vue-resource'
  Vue.use(VueResource)
  Vue.prototype.$geturlpara=geturlpara

  export default {
    name: 'channelsdetail',
    data () {
      return {
        showContent:false,
        loadingshow: true,
        loadtext: 'loading...',
        channelsinfo:{
          suites:[{price:""}]
        },
        information:""
      }
    },
    components: {
      XHeader,
      Loading,
      Scroller
    },
    created () {
      var id = this.$geturlpara.getUrlKey("id")||"300";
      this.fetchData(id);

    },

    methods: {
      //获取专栏数据数据
      fetchData(id){
        this.$http.get(HOST+'/api/channels/'+id+'.json', [])
        .then((data)=>{
          this.loadingshow=false;
          this.channelsinfo=JSON.parse(data.bodyText);
          //正则匹配，处理information
          this.information=this.channelsinfo.information.replace(/[。]/g,"。<br/>") ;
          console.log(this.channelsinfo);
          var self=this;
          //加载完成后，重置scroll
          setTimeout(function () {
            self.$nextTick(() => {
              self.$refs.scrollerEvent.reset()
            })
          },100);
          this.showContent=true;
        }, (err)=>{
          this.loadingshow=false;
          this.logErr("请在网络环境下访问");
          console.log(err);
        });
      },
      share(){
        console.log("share");
      },
      geDetail(id){
        console.log(id);
        window.location.href="detail.html?id="+id;
      },
      freeRead(){
        window.location.href="https://a.mlinks.cc/AK8j"
      },
      subscribe(){
        window.location.href="https://a.mlinks.cc/AK8j"
      }
    },
    filters: {
      formatDate2:function (time) {
        var date = formatDate2(new Date(time), "MM月dd日");
        // console.log(date.replace(/^0/g,""));
        return date;
      }
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
body{
  background-color: #eee;
}
#channelsdetail{
  background-color: #fff;
  .vux-header{
    background: rgba(255,255,255,0);
    color: #000;
    position: fixed;
    width: 100%;
    z-index: 99;
    overflow: hidden;
    .vux-header-title{
      color: #000;
    }
  }
  .content{
    padding-bottom: 80px;
    .large-img{
      img{
        width: 100%;
      }
    }
    .channels-info{
      padding-left: .3rem;
      padding-right: .3rem;
      li{
        padding-bottom: 12px;
        .title{
          font-size: 16px;
          font-weight: bold;
          line-height: 40px;
          color: #444;
        }
        .con{
          font-size: 14px;
          line-height: 23px;
          color: #9d9d9d;
        }
        .newupdate{
          li{
            overflow: hidden;
            padding: 16px 0;
            position: relative;
            height: 80px;
            img{
              float: left;
              width: 120px;
              height: 80px;
              border-radius: 3px;
              display: block;
            }
            .title{
              line-height: 22px;
              font-size: 15px;
              color: #686868;
              font-weight: 400;
              padding-left: 11px;
              overflow: hidden;
            }
            .date{
              position: absolute;
              bottom: 15px;
              width: 100%;
              text-align: right;
              display: block;
              color: #a8a8a8;
            }
          }
        }
      }
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
    padding: 0;
    z-index: 1000;
    display: -webkit-box;
    -webkit-box-align: center;
    font-size: 20px;
    .freeread{
      color: #fbfbfb;
      width: 50%;
      text-align: center;
      background-color: #757475;
      height: 100%;
      line-height: 46px;
    }
    .subscribe{
      width: 50%;
      color: #fbfbfb;
      line-height: 46px;
      text-align: center;
      background-color: #ffbf00;
    }
  }
}

</style>
