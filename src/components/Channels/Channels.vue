<template>
  <div id="channels">
    <div v-if="subs.length!=0">
      <div class="channels-item vux-1px-b" ref="list" v-for="item in subs" @click="channelsDetail(item.id)">
        <img :src="item.thumb" alt="" onerror="this.src='http://182.92.99.123:8080/privilege/uploadedFile/1490888681914.jpg'" class="headimg">
        <div class="channels-info">
          <p class="name">{{item.name}}</p>
          <p class="author_name"><span>{{item.author_name}}</span><span>{{item.author_field}}</span></p>
          <p class="brief">{{item.brief}}</p>
          <p class="price-co">
            <span class="price">¥ <span>{{item.suites[0].price}}</span>/年</span>
            <span class="view_count" v-if="item.view_count!=0">{{item.view_count}}人订阅</span>
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
      console.log(this.$refs.list[this.$refs.list.length-1].className);
    },
    components: {
    },
    methods: {
      channelsDetail(id){
        console.log(id);
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
    }
    .channels-info{
      width: 67%;
      margin-right: 0;
      float: left;
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
        width: 98%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .price-co{
        margin-top: 10px;
        font-size: 10px;
        .price{
          color: #fdd000;
          span{
            font-size: 15px;
            font-weight: bold;
          }
        }
        .view_count{
          float: right;
          color: #888;
        }
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
