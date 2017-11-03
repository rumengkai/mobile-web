<template>
  <div id="order-list">
   <li v-for="item in datalist" @click="toDetail(item)">
     <div class="top vux-1px-b">
       <span class="title">
         订单编号：{{item.order_no}}
       </span>
       <span class="state" v-if="item.state=='O'">
         已完成
       </span>
       <span class="state" v-if="item.state=='L'">
         待收货
       </span>
       <span class="state" v-if="item.state=='s'">
         待发货
       </span>
     </div>
     <div class="order_detail vux-1px-b" v-for="item2 in item.order_detail.items">
       <div class="left-img">
         <img :src="item2.large_thumb" alt="">
       </div>
       <div class="detail">
         <p class="name">{{item2.name}}</p>
         <p class="">¥{{item2.price}}<span class="count">x{{item2.count}}</span></p>
       </div>
     </div>
     <div class="buttom">
       <div class="btn btn-confire" v-if="item.state=='L'" @click.stop="confire(item)">
         确认收货
       </div>
       <div class="btn btn-logistics" v-if="item.state=='L'" @click.stop="logistics(item)">
         查看物流
       </div>
       <div class="btn btn-del" v-if="item.state=='O'" @click.stop="del(item)">
         删除订单
       </div>
       <div class="btn btn-confire" v-if="item.state=='s'" @click.stop="cuidan(item)">
         催单
       </div>
     </div>
   </li>
  </div>
</template>

<script>
import Vue from 'vue'
import AjaxServer from 'common/js/ajaxServer.js';
import { ConfirmPlugin,ToastPlugin } from 'vux'
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
  export default {
    name: 'order-list',
    data () {
      return {
      }
    },
    props: {
      datalist:Array
    },
    components: {
    },
    created () {
      if (this.datalist.length!=0) {
        this.datalist.map((item)=>{
          item.order_detail.items.map((item2)=>{
            if (typeof(item2.price)=='number') {
              item2.price=item2.price.toFixed(2);
            }
          })
        })
      }
    },
    methods: {
      toDetail(item){
        // location.href="/m/order-detail.html?id="+id;
        this.$emit("updateDate",{"type":2,"item":item});
      },
      confire(item){
        this.confirm('确认收货？',HOST+'/pay/orders/confirm_receipt',item,1,"收货成功");
      },
      del(item){
        this.confirm('确认删除此订单？',HOST+'/pay/orders/cancel',item,2,"删除成功");
      },
      cuidan(){
        this.toast('催单成功！');
      },
      // 查看物流
      logistics(item){
        location.href="/m/logistics.html?id="+item.id;
        console.log(item.id);
      },
      confirm(text,url,item,type,toast){
        var self=this
        this.$vux.confirm.show({
          title: '提示',
          content: text,
          onShow () {
            console.log('plugin show')
          },
          onConfirm () {
            AjaxServer.httpPost( Vue, url, {id:item.id}, (data)=>{
                if (data.status==0) {
                  self.toast(toast)
                  self.$emit("updateDate",{"type":1});
                }
              }
            );
          }
        })
      },
      toast(text,w){
        this.$vux.toast.show({
           text: text,
           position:'bottom',
           time:3000,
           width:w||'10em',
           type:'text'
        })
      }
    },
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
#order-list{
  background-color: #f3f3f3;
  li{
    margin-top: .35rem;
    background: #fff;
    padding: 0 .28rem;
    .top{
      line-height: .9rem;
      .title{
        height: 80px;
        color: #848383;
        font-size: 14px;
      }
      .state{
        font-size: 14px;
        color: #ca915c;
        float: right;
      }
    }
    .order_detail{
      height: 1.62rem;
      padding: .25rem 0;
      box-sizing: border-box;
      .left-img{
        img{
          width: 1.1rem;
          height: 1.1rem;
        }
        float: left;
      }
      .detail{
        color: #5d5d5d;
        margin-left: 1.4rem;
        .name{
          height: .8rem;
          line-height: .35rem;
          font-size: .28rem;
          overflow: hidden;
        }
        .count{
          float: right;
        }
      }
    }
    .buttom{
      height: .9rem;
      box-sizing: border-box;
      overflow: hidden;
      .btn{
        width: 1.45rem;
        height: .55rem;
        color: #fff;
        margin-top: .2rem;
        border-radius: 3px;
        line-height: .55rem;
        text-align: center;
        background: #ca915c;
        font-size: 14px;
        float: right;
        margin-left: .25rem;
      }
      .btn.btn-del{
        background: #9a9a9a;
      }
      .btn-logistics{
        background: #9a9a9a;
      }
    }
  }
}
</style>
