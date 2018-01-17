<template>
  <div id="wx_exchange_card">
    <div v-if="contentshow">
      <div class="content">
        <div class="header position-relative">
          <img class="header-img" src="https://static2.kofuf.com/1515639734881.png"/>
          <img class="header-bg" src="https://static1.kofuf.com/1515657086776.png"/>
          <div class="header-title" >
            <div class="flex-center-center">《{{brief}}》</div>
          </div>
          <div class="header-item">
            <div class="item">
              <img class="item-bg" src="https://static1.kofuf.com/1515658495136.png"/>
              <img class="item-img" :src="url"/>
            </div>
          </div>
        </div>
        <div class="con-list">
          <div id="con-item" class="con-item">
            <div class="item-name"><span style="font-size: 12px; margin-right: 5px;">(主讲)</span>{{name}}</div>
            <div class="item-content" v-html="content"></div>
          </div>
        </div>
        <div class="footer" :class="[ { padding_0 : index_0 }, { padding_1 : index_1 }, { padding_2 : index_2 }, { padding_3 : index_3 }, { padding_4 : index_4 }, { padding_5 : index_5 } ]">
          <img class="footer-img" src="https://static1.kofuf.com/1515657318430.png"/>
        </div>
      </div>
      <div class="btn flex-between-center">
        <div class="back flex-center-center" v-on:click="back()">返回</div>
        <div class="confirm-exchange flex-center-center" v-on:click="fetchGiftCardData()">确认兑换</div>
      </div>
    </div>
  </div>
    <!-- <loading v-model="loadingshow" :text="loadtext"></loading> -->
</template>

<script>
  import 'common/js/config.js';
  import { exchangeGiftCard } from 'src/api/gift_card';
  import { isWeiXin ,weixinShare} from 'common/js/common.js';
  import Vue from 'vue'
  import { message ,shareData} from 'common/js/assembly'
  import { querystring, cookie } from 'vux'
  export default {
    data () {
      return {
        loadingshow: false,
        loadtext: '加载中...',
        contentshow: true,
        links:[
          {
            url: "https://static1.kofuf.com/1501052704487.png",
            name: "郎咸平",
            brief: "郎咸平沃顿投资课",
            content: '在追求最大利益化的同时，<br/>要学会及时理清思路，看清事件的本质。<br/>--清醒以自知<br/>如果你现在不去分析整个事件的本质，<br/>就无法在下一次灾难中成功逃脱。<br/>--知史以鉴今<br/>中国经济发展步入新常态，<br/>GDP一降再降，股市楼市双低迷，<br/>如此复杂多变的投资环境，该如何应对？<br/>--知难以求索<br/>借助"朗眼"之犀利目光和独特视角，<br/>厘清投资的内在逻辑，把握先机，致胜未来！',
            id: 2087
          },
          {
            url: "http://image.51xy8.com/1512374444167.png",
            name: "王福重",
            brief: "重.点",
            content: '无法想象的每日头条解读，<br/>这不是一门课程。<br/>这是每日要闻的重点评，"重"是王福重之重，"点"是解读的要点和核心点，<br/>直白说来，这是帮助你获取经济学家思维方式，探索解答世界真相与本质的独特能力，<br/>任何人皆能从中受益，<br/>触达与获取点化及顿悟，<br/>授人以渔总能伴随聪明人会心的微笑，<br/>重点评是新闻解读的一阳指，<br/>直指人心，痛并快乐。',
            id: 1632
          },
          {
            url: "http://image.51xy8.com/1512470359481.png",
            name: "端宏斌",
            brief: "老端的投资秘籍第二季",
            content: '8期秘籍+6期答疑+2期名人投资心得分享。<br/>新增神秘投资大咖，对话老端，关于投资理财、关于经济风口、关于行业趋势、关于人生感悟，分享。<br/>TA们的独门秘方，给你更多人生的可能性。<br/>更加及时的投资热点分析，<br/>更加实用的趋势投资指导。<br/>更加有效的投资思维训练。<br/>《老端投资秘籍》第二季，给你更多。',
            id: 3775
          },
          {
            url: "http://image.51xy8.com/1512374527173.png",
            name: "胡润",
            brief: "富及贵—带你打入精英圈",
            content: '精英教育理念。人生赢家的起点，从精英教育开启。<br/>财产管理思维。揭秘贵族财富从哪来、怎么管理、如何传承。<br/>前卫婚姻观念。我爱你，但是婚前协议请签收。<br/>族生活体验。品酒、马术、园艺、社交礼仪，深度全面体验。<br/>胡润带你穿越崎岖，打入精英圈，从更高维度俯瞰全新的世界。',
            id: 2964
          },
          {
            url: "http://image.51xy8.com/1512470409739.png",
            name: "财经麻辣姐",
            brief: "麻辣姐书单",
            content: '这里没有GDP、CPI、PPI，<br/>没有通货膨胀、纳什均衡，<br/>没有算不完的数学公式、研究不完的经济学模型。<br/>这里只有简单的问题，却有着不简单的答案。<br/>为什么牛奶用方盒子装，可乐却是圆罐？<br/>为什么冰箱冷藏室会亮，冷冻室却不亮？<br/>这些不曾想过答案的问题，都在经济学家的思维里。',
            id: 7
          },
          {
            url: "http://image.51xy8.com/1512374510391.png",
            name: "闫肖锋",
            brief: "肖锋书单",
            content: '书能够给你提供一个全世界的参照，让你知道这个世界对你意味着什么，于是形成你的认识格局。<br/>通过读书，认识你自己，你的品性，你的专长，你的趣味点，你的难点和痛点。<br/>当我们读书的时候，我们在读什么？是读自己。<br/>肖锋老师用十讲内容，悉心讲解影响他至深的五本书，以社会学家的角度看过去，读现在，测未来。',
            id: 6
          }
        ],
        clientHeight: '0px',
        giftGiftQuery: {},
        name: '',
        brief: '',
        content: '',
        url: '',
        index_0: false,
        index_1: false,
        index_2: false,
        index_3: false,
        index_4: false,
        index_5: false
      }
    },
    components: {
    },
    beforeCreate(){
      //授权
      if(isWeiXin()){
        getAuth(cookie,querystring, location.pathname + location.hash);
      }
//      if(!isWeiXin()){
//        message("请关注'功夫财经'公众号")
//      }
    },
    created () {
      shareData("功夫财经甄选专栏",location.href,'','2018功夫财经官方VIP甄选礼品卡')
//      shareData(this.name,location.href)
      weixinShare()
    },
    mounted () {
      this.fetchData()
    },
    methods: {
      fetchData: function() {
        var id = parseInt(this.getQueryString('id'))
        var code = this.getQueryString('code')
        this.giftGiftQuery = Object.assign({}, this.giftGiftQuery,
          {
            item_id: id,
            code: code
          }
        )
        this.links.map((item, index) => {
          if (item.id === id) {
            this.name = this.links[index].name
            this.url = this.links[index].url
            this.brief = this.links[index].brief
            this.content = this.links[index].content
            this.updateCss(index)
          }
        })
      },
      fetchGiftCardData: function () {
        exchangeGiftCard(this.giftGiftQuery).then(response => {
          if (response.status === 0) {
            this.showAlertTip(response.message)
          } else {
            this.showAlertTip(response.error)
          }
        })
      },
      updateCss: function (index) {
        if (index == 0) {
          this.index_0 = true
        }
        else if (index == 1) {
          this.index_1 = true
        }
        else if (index == 2) {
          this.index_2 = true
        }
        else if (index == 3) {
          this.index_3 = true
        }
        else if (index == 4) {
          this.index_4 = true
        }
        else if (index == 5) {
          this.index_5 = true
        }
      },
      back: function () {
        window.history.back()
      },
      showAlertTip: function (content) {
        this.$vux.alert.show({
          title: '提示',
          content: content,
          dialogTransition:"",
          maskTransition:"",
          onShow () {},
          onHide () {
            window.location.href = "/m/home.html"
          }
        })
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
