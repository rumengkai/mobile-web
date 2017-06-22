<template>
  <div id="channels">
    <div v-if="subs.length!=0">
      <div class="channels-item vux-1px-b" ref="list" v-for="item in subs" @click="channelsDetail(item.id)">
        <img :src="item.thumb" alt="" onerror="this.src='http://182.92.99.123:8080/privilege/uploadedFile/1490888681914.jpg'" class="headimg">
        <div class="channels-info">
          <p class="name">{{item.name}}</p>
          <span class="view_count" v-if="item.view_count!=0">{{item.view_count}}人订阅</span>
          <p class="author_name"><span>{{item.author_name}}</span><span>{{item.author_field}}</span></p>
          <p class="brief">{{item.brief}}</p>
          <p class="price-co">
            <span v-if="item.channel_price==-1" class="price">¥ <span>{{item.suites[0].price}}</span>/年</span>
            <span v-else>
              <span class="price">{{item.text}} ¥ <span>{{item.channel_price}}</span>/年</span>
              <span class="oldprice"> ¥ <span>{{item.suites[0].price}}</span>/年</span>
            </span>
          </p>
          <div class="nstep "></div>
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
      subs:Array
    },
    data () {
      return {
        loadtext: 'loading...'
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
        window.location.href="channel.html?id="+id;
      }
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
#channels{
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
      display: block;
      float: left;
      border-radius: 2px;
      margin-right: 16px;
    }
    .channels-info{
      width: auto;
      margin-right: 0;
      // float: left;
      margin-left: .15rem;
      height: 100%;
      right: 0;
      .name{
        font-size: 18px;
        font-weight: bold;
        color: #333;
        line-height: 33px;
      }
      .author_name{
        color: #666;
        font-size: 15px;
        line-height: 33px;
        span{
          margin-right: 8px;
        }
      }
      .brief{
        color: #888;
        font-size: 14px;
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
          font-size: 14px;
          color: #fdd000;
          span{
            font-size: 15px;
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
        margin-top: -22px;
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
