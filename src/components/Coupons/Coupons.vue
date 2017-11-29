<template>
  <div id="coupons">
    <div class="" v-for="item in couponD" v-if="show">
      <div v-bind:class="{coupon_used:item.state,coupon_no:!item.state}">
        <div class="coupon vux-1px" >
          <img v-if="!item.state" src="./images/coupon_1_03.png" alt="">
          <img v-else src="./images/coupon_2_03.png" alt="">
          <div class="left" >
            <span class="price"><span v-if="item.type==2">¥</span>{{item.type_value}}<span v-if="item.type==2">.00</span></span>
            <span class="use_condition" v-html="item.use_condition"></span>
          </div>
          <div class="right">
            <p class="name" v-html="item.name"></p>
            <p class="explain">
              <span class="period" v-bind:class="{red:item.will_expired}" v-html="item.period">有效期至：{{item.end_time}}</span>
              <span class="have" v-if="item.state==1">已使用</span>
              <span class="have" v-if="item.state==2">已过期</span>
              <span class="use_explain" v-if="item.state==0" @click="showexplain(item)">使用说明</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="couponsnone" v-if="!couponD.length">
      <img src="./images/empty_coupon.png" alt="">
    </div> -->
  </div>
</template>

<script>
  import Vue from 'vue'
  import { AlertPlugin } from 'vux'
  import AjaxServer from 'common/js/ajaxServer.js';
  import {formatDate} from 'common/js/date.js';

  Vue.use(AlertPlugin)
  export default {
    name: 'coupons',
    props: {
      couponData:Array
    },
    data () {
      return {
        show:false,
        couponD:[]
      }
    },
    components: {
    },
    mounted(){
      console.log(this.couponData);
      this.couponD=this.couponData.map((item)=>{
        item.end_time=formatDate(new Date(item.end_time),"yyyy-MM-dd");
        return item;
      })
      this.show=true;
    },
    methods: {
      showexplain (item) {
        item.start_time=formatDate(new Date(item.start_time),"yyyy-MM-dd")
        item.end_time=formatDate(new Date(item.end_time),"yyyy-MM-dd")
        var text='<div class="alert">'+
                    '<p><b>优&nbsp;&nbsp;惠&nbsp;&nbsp;券：</b>'+item.name+"</p>"+
                    '<p><b>适用类型：</b>'+item.use_condition+"</p>"+
                    "<p><b>可用时间：</b>"+item.start_time+"至"+item.end_time+"</p>"+
                    "<p><b>可用业务：</b>"+item.use_scope+"</p>"+
                  '</div>';
        // 显示
        this.$vux.alert.show({
          title: '使用规则',
          content: text,
          dialogTransition:"",
          maskTransition:"",
          onShow () {
            console.log('Plugin: I\'m showing')
          },
          onHide () {
            console.log('Plugin: I\'m hiding')
          }
        })
      },
    },
    filters: {
      formatD:formatDate
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
#coupons{
  background-color: #f5f5f5;
  color: #999;
  font-size: 14px;
  padding-bottom: 30px;
  .coupon{
    position: relative;
    width: 6.92rem;
    height: 2.2rem;
    background: #fff;
    margin: 20px auto;
    img{
      position: absolute;
      top: 0;
      left: 0;
      height: 2.22rem;
      overflow: hidden;
    }
    .left{
      width: 2.22rem;
      float: left;
      color: #fff;
      z-index: 100;
      position: relative;
      text-align: center;
      .price{
        margin-top: .44rem;
        line-height: .8rem;
        font-size: 20px;
        display: block;
      }
      .use_condition{
        font-size: 12px;
        color: #ebe3db;
      }
    }
    .right{
      width: 4.69rem;
      float: left;
      color: #333;
      padding: .4rem .2rem .2rem;
      box-sizing: border-box;
      height: 100%;
      position: relative;
      .getcoupon{
        width: 70px;
        height: 20px;
        background: #ccc;
        color: #f00;
        border-radius: 5px;
        display: inline-block;
        line-height: 20px;
        text-align: center;
      }
      .name{
        font-size: .35rem;
        line-height: .47rem;
      }
      .explain{
        position: absolute;
        bottom: 0;
        margin-bottom: 20px;
        z-index: 999;
        color: #ccc;
        .period{
          font-size: 12px;
          float: left;
          line-height: 20px;
          width: 2.9rem;
          white-space:nowrap;
          text-overflow:ellipsis;
          overflow: hidden;
        }
        .red{
          color: #f00;
        }
        .use_explain{
          font-size: 12px;
          color: #88a2d0;
          float: right;
          line-height: 20px;
        }
        .have{
          font-size: 12px;
          color: #ccc;
          float: right;
          line-height: 20px;
        }
      }
    }
  }
  .coupon_no{
    .vux-1px:before {
      border: 1px solid #c49466;
    }
  }
  .coupon_used{
    .vux-1px:before {
      border: 1px solid #ccc;
    }
  }
}

.alert{
  text-align: left;
  font-size: .28rem;
  color: #333;
  width: 100%;
  line-height: 20px;
  b{
    display: inline-block;
    // width: 1.7rem;
    text-align: left;
  }
}
.couponsnone{
  padding: 30px 0;
  text-align: center;
  img{
    width: 6.92rem;
  }
}
</style>
