<template>
  <div id="wx-new">
    <div v-if="contentshow">
      <div class="content">
        <div class="header">
          <img class="header-img" src="http://image.51xy8.com/1512377253412.png"/>
        </div>
        <div class="con-list">
          <li class="con-item position-relative" v-for="(item, index) in links" :key="index" v-if="item.linkurl != ''">
            <div class="item-content border-bottom" v-on:click='linkIndex(item.linkurl)' >
              <div class="item-left">
                <img class="item-img" v-if="item.url != '' " :src="item.url"/>
                <img class="item-img" v-else :src="defaultimg"/>
              </div>
              <div class="item-right">
                <div class="item-name">
                  {{item.name}}
                </div>
                <div class="item-brief" style="-webkit-box-orient: vertical;">
                  {{item.brief}}
                </div>
              </div>
            </div>
          </li>
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
            url: "http://image.51xy8.com/1512470272714.png",
            name: "如松",
            brief: "独立经济理论和经济趋势研究者",
            linkurl: "http://mp.weixin.qq.com/mp/homepage?__biz=MzIzOTA3NTA5Mg==&hid=13&sn=0392a79156a23767c594c533810768dc#wechat_redirect"
          },
          {
            url: "http://image.51xy8.com/1512470359481.png",
            name: "老端",
            brief: "网红投资大神",
            linkurl: "http://mp.weixin.qq.com/mp/homepage?__biz=MzIzOTA3NTA5Mg==&hid=14&sn=c3d5247a26442835659409e37b59ffb0#wechat_redirect"
          },
          {
            url: "http://image.51xy8.com/1512470409739.png",
            name: "财经麻辣姐",
            brief: "前东方出版社经济编辑部主任",
            linkurl: ""
          },
          {
            url: "http://image.51xy8.com/1512372368218.png",
            name: "狮刀",
            brief: "前《经济》杂志社新媒体主任",
            linkurl: ""
          },
          {
            url: "http://image.51xy8.com/1512372399018.png",
            name: "欧神",
            brief: "楼市投资大神 奥派经济学者",
            linkurl: "http://mp.weixin.qq.com/mp/homepage?__biz=MzIzOTA3NTA5Mg==&hid=15&sn=9e4c2f3339a67cf652d018bae77f6718#wechat_redirect"
          },
          {
            url: "http://image.51xy8.com/1512372485858.png",
            name: "邓元杰",
            brief: "财经时事观察者",
            linkurl: ""
          },
          {
            url: "http://image.51xy8.com/1512372514971.png",
            name: "徐斌",
            brief: "资深房产律师",
            linkurl: ""
          },
          {
            url: "http://image.51xy8.com/1512372544848.png",
            name: "杨红旭",
            brief: "著名房产专家",
            linkurl: ""
          },
          {
            url: "http://image.51xy8.com/1512372592692.png",
            name: "冷眼",
            brief: "著名财经学者，海外资产配置专家",
            linkurl: ""
          },
          {
            url: "http://image.51xy8.com/1512372621592.png",
            name: "盛夏",
            brief: "资深保险经济人，理财杂志专栏作者",
            linkurl: ""
          },
          {
            url: "http://image.51xy8.com/1512470439622.png",
            name: "X嘉宾",
            brief: "近期特邀：杨红旭、徐斌、财经麻辣姐",
            linkurl: "http://mp.weixin.qq.com/mp/homepage?__biz=MzIzOTA3NTA5Mg==&hid=6&sn=d73abd5932e0bc43b56e23fbac298707#wechat_redirect"
          }
        ]
      }
    },
    components: {
    },
    beforeCreate(){
      //授权
      if(!isWeiXin()){
        message("请关注'功夫财经'公众号")
      }
    },
    created () {
      shareData("江湖新秀",location.href)
      weixinShare();
    },
    methods: {
      linkIndex: function (linkurl) {
        window.location.href = linkurl
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
