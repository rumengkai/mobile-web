<template>
  <div id="channelsdetail">
    <Loading v-model="loadingshow" :text="loadtext"></Loading>
    <x-header ><a slot="right" @click="share"><span type="search">分享</span></a></x-header>
    <scroller lock-x ref="scrollerEvent">
      <div class="content">
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
                <p class="date">{{item.published}}</p>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </scroller>
  </div>
</template>

<script>
  import 'common/css/reset.css';
  import 'common/js/common.js';
  import geturlpara from 'common/js/geturlpara.js';
  import Vue from 'vue'
  import {Loading,XHeader,Scroller} from 'vux'
  import VueResource from 'vue-resource'
  Vue.use(VueResource)
  Vue.prototype.$geturlpara=geturlpara

  export default {
    name: 'channelsdetail',
    data () {
      return {
        loadingshow: true,
        loadtext: 'loading...',
        channelsinfo:{

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
        this.$http.get('/api/channels/'+id+'.json', [])
        .then((data)=>{
          this.loadingshow=false;
          this.channelsinfo=JSON.parse(data.bodyText);
          //正则匹配，处理information
          this.information=this.channelsinfo.information.replace(/[。]/g,"。<br/>") ;
          var self=this;
          setTimeout(function () {
            self.$nextTick(() => {
              self.$refs.scrollerEvent.reset()
            })
          },100);
        }, (err)=>{console.log(err);});
      },
      share(){
        console.log("share");
      },
      geDetail(id){
        console.log(id);
      }
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
body{
  background-color: #fff;
}
#channelsdetail{
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
    padding-bottom: 50px;
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
}

</style>
