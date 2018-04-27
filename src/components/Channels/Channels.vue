<template>
  <div id="channels">
    <div v-if="subs.length!=0">
      <div class="channels-item vux-1px-b" ref="list" v-for="(item,index) in subs" @click="channelsDetail(item.id)" :key="index">
        <div class="headimg">
          <img :src="item.thumb" alt="" onerror="this.src='https://m.kofuf.com/static/img/default.png'">
          <span class="tip" v-if="item.unread_num!=0"><span>{{item.unread_num}}</span></span>
        </div>
        <div class="channels-info">
          <p class="name ell">{{item.name}}</p>
          <!-- <span class="view_count" v-if="item.view_count!=0&&phonetype!='small'">{{item.view_count}}人订阅</span> -->
          <p class="author_name ell"><span>{{item.author_name}}</span><span>{{item.author_field}}</span></p>
          <p class="brief ell">{{item.brief}}</p>
          <p class="price-co">
            <span v-if="item.channel_price==-1" class="price ell">¥
              <span v-if='item.suites'>{{item.suites[0].price}}</span>
              <span v-if='!item.suites'>{{item.price}}</span>
              <span v-if="type!='small'">/{{item.price_unit}}</span>
            </span>
            <span v-else class="ell">
              <span class="price">{{item.text}}¥<span>{{item.channel_price}}</span>
							<span v-if="type!='small'">/{{item.price_unit}}</span>
              </span>
              <span class="oldprice">
                <span v-if='item.suites'>¥{{item.suites[0].price}}</span>
                <span v-if='!item.suites'>¥{{item.price}}</span>
                <span v-if="type!='small'">/{{item.price_unit}}</span>
              </span>
            </span>
          </p>
          <!-- <div class="nstep "></div> -->
        </div>
      </div>
    </div>
    <div v-else class="channels-none">
      赶快订阅吧！！！
    </div>
  </div>
</template>

<script>
  export default {
    name: 'channels',
    props: {
      subs:Array,
      type:String
    },
    data () {
      return {
        loadtext: 'loading...',
        phonetype:window.phonetype
      }
    },
    mounted(){
      this.$refs.list[this.$refs.list.length-1].className="channels-item";
      var temp=this.subs.map(function (item,index) {
        if (item.view_count>9999) {
          item.view_count=(Math.ceil(item.view_count/1000)/10).toFixed(1)+"万"
        }
        return item
      });
    },
    components: {
    },
    methods: {
      channelsDetail(id){
        if (this.type=="small") {
          window.location.href="/m/channel-small.html?id="+id;
        }else{
          window.location.href="/m/channel.html?id="+id;
        }
      }
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
#channels{
  background: #fff;
  .channels-item{
    cursor: pointer;
    height: 165px;
    padding: 20px 0;
    margin-left: .3rem;
    margin-right: .3rem;
    box-sizing:border-box;
    overflow: hidden;
    position: relative;

    .headimg{
      width: 90px;
      height: 124px;
      float: left;
      margin-right: 16px;
      position: relative;
      img{
        border-radius: 2px;
        display: block;
        height: 100%;
        width: 100%;
      }
      .tip{
        width: 14px;
        height: 14px;
        background-color: #f00;
        border-radius: 7px;
        position: absolute;
        right: -8px;
        top: -8px;
        text-align: center;
        line-height: 14px;
        color: #fff;
        line-height: 14px;
        span{
          line-height: 17px;
          font-size: 12px;
          transform: scale(0.8);
        }
      }
    }
    .channels-info{
      width: auto;
      margin-right: 0;
      // float: left;
      margin-left: .15rem;
      height: 100%;
      right: 0;
      .name{
        font-size: .36rem;
        font-weight: bold;
        color: #333;
        line-height: 33px;
      }
      .author_name{
        color: #666;
        font-size: 13px;
        line-height: 33px;
        span{
          margin-right: 8px;
        }
      }
      .brief{
        color: #888;
        font-size: 13px;
        line-height:20px;
        // width: 98%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .price-co{
        margin-top: 15px;
        font-size: 10px;
        font-size: 14px;
        .price{
          font-size: 13px;
          color: #ca915c;
          span{
            font-size: 13px;
            font-weight: bold;
          }
        }
        .oldprice{
          color: #bcbcbc;
          font-size: 12px;
          text-decoration:line-through;
          margin-left: 10px;
        }
      }
      .view_count{
        float: right;
        color: #888;
        margin-top: -25px;
      }
    }
  }
  .channels-none{
    height: 165px;
    text-align: center;
    line-height: 165px;
    color: #666;
  }
}


</style>
