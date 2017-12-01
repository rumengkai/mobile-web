<template>
  <div id="wx-index">
    <div v-if="contentshow">
      <div class="content">
        <div class="header">
          <img class="header-img" src="http://image.51xy8.com/1512025219138.png"/>
        </div>
        <div class="con-list">
          <li class="con-item position-relative" v-for="(item, index) in links">
            <div class="item-content" :class="links.length-1 != index ? 'border-bottom' : '' ">
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
    <loading v-model="loadingshow" :text="loadtext"></loading>
  </div>
</template>

<script>
  import 'common/js/config.js';
  import { isWeiXin } from 'common/js/common.js';
  import Vue from 'vue'
  import { message } from 'common/js/assembly'
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
            url: "http://image.51xy8.com/1512029692851.png",
            name: "李大霄",
            brief: "英大证券研究所所长"
          },
          {
            url: "http://image.51xy8.com/1512029745352.png",
            name: "马光远",
            brief: "扑腾话最标肿的正经经济学家"
          },
          {
            url: "http://image.51xy8.com/1512029314314.png",
            name: "王福重",
            brief: "经济学教授"
          },
          {
            url: "http://image.51xy8.com/1512029334247.png",
            name: "时寒冰",
            brief: "趋势经济学鬼谷子"
          },
          {
            url: "http://image.51xy8.com/1512029395320.png",
            name: "琢磨先生",
            brief: "新锐经济学者，中产阶级代言人"
          },
          {
            url: "http://image.51xy8.com/1512029359200.png",
            name: "肖峰",
            brief: "社会趋势观察家，前《新周刊》总主笔"
          },
          {
            url: "http://image.51xy8.com/1512029374044.png",
            name: "胡润",
            brief: "跟土豪讲Engliese的琅琊榜榜爷"
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

    },
    methods: {

    }
  }
</script>
<style lang="less">
@import '../../common/css/reset.css';
@import '~vux/src/styles/1px.less';
@import "../index/App.less";
@import './App.less';
</style>
