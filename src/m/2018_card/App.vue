<template>
  <div id="wx_gift_card">
    <div v-if="contentshow">
      <div id="content" class="content" :style="{'height': clientHeight}">
        <div class="header position-relative">
          <img class="header-img" src="https://static2.kofuf.com/1515639734881.png"/>
          <img class="header-title" src="https://static2.kofuf.com/1515641100727.png"/>
        </div>
        <div class="con-list">
          <li class="con-item" v-for="(item, index) in links" :key="index" >
            <div class="item-content position-relative" v-on:click='linkIndex(item.id)' >
              <img class="item-bg" src="https://static2.kofuf.com/1515667950374.png"/>
              <img class="item-img" :src="item.url"/>
              <div class="item-text">
                {{item.brief}}
              </div>
            </div>
          </li>
        </div>
        <div class="footer">
          <img class="footer-img" src="https://static2.kofuf.com/1516100733588.png"/>
        </div>
      </div>
    </div>
  </div>
    <!-- <loading v-model="loadingshow" :text="loadtext"></loading> -->
</template>

<script>
  import 'common/js/config.js';
  import { isWeiXin ,weixinShare} from 'common/js/common.js';
  import Vue from 'vue'
  import { message ,shareData} from 'common/js/assembly'
  import { querystring, cookie } from 'vux'
  import AjaxServer from 'common/js/ajaxServer.js';
  export default {
    data () {
      return {
        sc: false,
        loadingshow: false,
        loadtext: '加载中...',
        contentshow: true,
        defaultimg: 'http://image.51xy8.com/1496311047717.jpg',
        links:[
          {
            url: "https://static1.kofuf.com/1501052704487.png",
            name: "郎咸平",
            brief: "郎咸平沃顿投资课",
            id: 2087
          },
          {
            url: "http://image.51xy8.com/1512374444167.png",
            name: "王福重",
            brief: "重.点",
            id: 1632
          },
          {
            url: "http://image.51xy8.com/1512470359481.png",
            name: "端宏斌",
            brief: "老端的投资秘籍第二季",
            id: 3775
          },
          {
            url: "http://image.51xy8.com/1512374527173.png",
            name: "胡润",
            brief: "富及贵—带你打入精英圈",
            id: 2964
          },
          {
            url: "http://image.51xy8.com/1512470409739.png",
            name: "财经麻辣姐",
            brief: "麻辣姐书单",
            id: 7
          },
          {
            url: "http://image.51xy8.com/1512374510391.png",
            name: "闫肖锋",
            brief: "肖锋书单",
            id: 6
          }
        ],
        clientHeight: '0px'
      }
    },
    components: {
    },
    beforeCreate(){
      //授权
      if(isWeiXin()){
        getAuth(cookie,querystring,location.pathname + location.hash);
      }
    },
    created () {
      shareData("功夫财经甄选专栏",location.href,'http://m.51xy8.com/static/img_h5/h5_logo.png','2018功夫财经官方VIP甄选礼品卡')
      weixinShare();
    },
    mounted() {
      this.designCSS()
    },
    methods: {
      designCSS: function () {
        var height = parseInt(document.getElementById('content').scrollHeight) + 62
        var clientHeight = parseInt(document.documentElement.clientHeight)
        if (clientHeight > height) {
          this.clientHeight = clientHeight + 'px'
        } else {
          this.clientHeight = height + 'px'
        }
      },
      linkIndex: function (id) {
        var code = this.getQueryString('code')
        var url = location.href
        url = url.replace('2018_card','wx_exchange_card')
        if (code !== null) {
          window.location.href = url + '&id=' + id
        } else {
          message('该链接已失效')
        }
      },
      getQueryString: function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
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
