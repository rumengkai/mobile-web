<template>
  <div id="coupons">
    <div v-bind:class="{coupon_used:couponData.has_received,coupon_no:!couponData.has_received}">
      <div class="coupon vux-1px">
        <img v-if="!couponData.has_received" src="./images/coupon_1_03.png" alt="">
        <img v-else src="./images/coupon_1_03.png" alt="">
        <div class="left" v-if="couponData.type==1">
          <span class="price"><span></span>{{couponData.type_value}}</span>
          <span class="use_condition" v-html="couponData.use_condition"></span>
        </div>
        <div class="left" v-if="couponData.type==2">
          <span class="price"><span>¥</span>{{couponData.type_value}}</span>
          <span class="use_condition" v-html="couponData.use_condition"></span>
        </div>
        <div class="right">
          <p class="name" v-html="couponData.name"></p>
          <p class="explain">
            <span class="period" v-html="couponData.period"></span>
            <span class="getcoupon" v-if="!couponData.has_received" @click="getcoupon">点击领取</span>
            <span class="have" v-if="couponData.has_received">已领取</span>
            <!-- <span v-if="!couponData.has_received" class="use_explain" @click="showexplain">使用说明</span> -->
            <span class="use_explain" @click="showexplain">使用说明</span>
            <!-- <span class="use_explain">已领取</span> -->
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { AlertPlugin } from 'vux'
  import AjaxServer from 'common/js/ajaxServer.js';

  Vue.use(AlertPlugin)
  export default {
    name: 'coupons',
    props: {
      couponData:Object
    },
    data () {
      return {
      }
    },
    components: {
    },
    mounted(){
    },
    methods: {
      showexplain () {
        // 显示
        this.$vux.alert.show({
          title: '使用说明',
          content: this.couponData.use_scope,
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
      getcoupon(){
        self.loadingshow=true;
        var id=this.couponData.id;
        AjaxServer.httpPost(
          Vue,
          HOST+'/api/coupons/add',
          {id:id},
          (data)=>{
            self.showContent=true;
            if (data.status==0) {
              self.showContent=false;
              this.$vux.alert.show({
                title: '',
                content: "领取成功",
                dialogTransition:"",
                maskTransition:"",
                onHide () {
                  window.location.reload();
                }
              })
            }else{
              this.$vux.alert.show({
                title: '',
                content: data.error,
                dialogTransition:"",
                maskTransition:"",
              })
            }
          },
          (err)=>{
            console.log(err);
            self.loadingshow=false;
            self.failedshow=true;
          }
        );
      }
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
#coupon{
  height: auto;
  background-color: #f5f5f5;
  color: #999;
  font-size: 14px;
  .coupon{
    position: relative;
    width: 6.92rem;
    height: 2.21rem;
    background: #fff;
    margin: 20px auto;
    img{
      position: absolute;
      top: 0;
      left: 0;
      height: 2.21rem;
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
      padding: .4rem;
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
        position: relative;
        bottom: -.8rem;
        margin-bottom: 20px;
        z-index: 999;
        .period{
          font-size: 12px;
          color: #ccc;
          float: left;
        }
        .use_explain{
          font-size: 12px;
          color: #a8d2f0;
          float: right;
          line-height: 20px;
        }
        .have{
          font-size: 12px;
          color: #a8d2f0;
          float: left;
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
    // .coupon{
    //   .right{
    //     .name{
    //       color: #ccc;
    //     }
    //     .explain{
    //       .use_explain{
    //         color: #ccc;
    //       }
    //     }
    //   }
    // }
    .vux-1px:before {
      border: 1px solid #c49466;
    }
  }
}
</style>
