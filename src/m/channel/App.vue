<template>
  <div id="channel">
    <Loading v-model="loadingshow" :text="loadtext" ></Loading>
    <!-- <x-header v-if="showContent"><a slot="right" @click="share"></a></x-header> -->
    <scroller lock-x ref="scrollerEvent" v-show="showContent">
      <div class="content" >
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
              <li class="item vux-1px-b" v-for="item in channelsinfo.articles" @click="geDetail(item.id)">
                <img :src="item.thumb" alt="" onerror="this.src='http://182.92.99.123:8080/privilege/uploadedFile/1491147612922.jpg?imageView2/1/w/200/h/133/q/100|imageslim'">
                <p class="title">{{item.name}}</p>
                <p class="date">{{item.published | formatDate2}}</p>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </scroller>
    <footer v-if="showContent">
      <div class="freeread" @click="freeRead">
        <span>免费试读</span>
      </div>
      <div class="subscribe" @click="subscribe">
        <span>订阅：<span>¥{{channelsinfo.suites[0].price}}/年</span></span>
      </div>
    </footer>
    <Failed v-if="failedshow" :msg="failedmsg"></Failed>
  </div>
</template>

<script>
  import 'common/css/reset.css';
  import 'common/js/common.js';
  import geturlpara from 'common/js/geturlpara.js';
  import Vue from 'vue'
  import { formatDate2 } from 'common/js/date.js';
  import {Loading,XHeader,Scroller} from 'vux'
  import Failed from "components/Failed/Failed"
  import VueResource from 'vue-resource'
  import { AlertPlugin} from 'vux'
  Vue.use(VueResource)
  Vue.use(AlertPlugin)
  Vue.prototype.$geturlpara=geturlpara

  export default {
    name: 'channel',
    data () {
      return {
        showContent:false,
        loadingshow: true,
        loadtext: 'loading...',
        channelsinfo:{
          suites:[{price:""}]
        },
        information:"",
        failedshow:false,
        failedmsg:"请在网络环境下访问"
      }
    },
    components: {
      XHeader,
      Loading,
      Scroller,
      Failed
    },
    created () {
      var id = this.$geturlpara.getUrlKey("id");
      this.fetchData(id);
    },

    methods: {
      //获取专栏数据数据
      fetchData(id){
        this.$http.get(HOST+'/api/channels/'+id+'.json', [])
        .then((data)=>{
          this.loadingshow=false;
          this.channelsinfo=JSON.parse(data.bodyText);
          if(this.channelsinfo.status!=0){
            this.failedmsg=this.channelsinfo.error;
            this.failedshow=true;
          } else{
            //正则匹配，处理information
            this.information=this.channelsinfo.information.replace(/[。]/g,"。<br/>") ;
            var self=this;
            //加载完成后，重置scroll
            setTimeout(function () {
              self.$nextTick(() => {
                self.$refs.scrollerEvent.reset()
              })
            },300);
            this.showContent=true;
          }
        }, (err)=>{
          this.loadingshow=false;
          this.failedshow=true;
          console.log(err);
        });
        var self=this;
        setTimeout(()=>{
          self.loadingshow=false;
        },10000);
      },
      share(){
        console.log("share");
      },
      geDetail(id){
        console.log(id);
        window.location.href="detail.html?id="+id;
      },
      freeRead(){
        var id = this.$geturlpara.getUrlKey("id");
        window.location.href="https://a.mlinks.cc/AK8j?id="+id;
      },
      subscribe(){
        var id = this.$geturlpara.getUrlKey("id");
        window.location.href="https://a.mlinks.cc/AK8j?id="+id;
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
    },
    filters: {
      formatDate2:function (time) {
        var date = new Date(time);
        var nowDate = new Date();
        if ((formatDate2(new Date(time),'yyyy')-formatDate2(nowDate,'yyyy'))<0) {
          return formatDate2(date, "yyyy年MM月dd日");
        }else{
          return formatDate2(date, "MM月dd日");
        }
      }
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
body{
  background-color: #eee;
}
#channel{
  height: 100%;
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
        min-height: 2.1rem;
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
            cursor:pointer;
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
