<template>
  <div id="goodlist">
    <div v-if="items.length!=0">
      <div class="con">
        <div class="good" v-bind:class="{'vux-1px-b':line&&index!=items.length-1}" v-for="(item,index) in items" @click="toGood(item,'dh')" :key="index">
          <div class="img">
            <img :src="item.thumb" alt="">
          </div>
          <div class="info">
            <p v-html="item.name" class="ell-2"></p>
            <p class="price">原价：<span>¥</span>{{item.price}}</p>
            <div class="dh" @click.stop="toConfirm(item)" v-if="dh!=''">
              兑换
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'goodlist',
    props: {
      items:Array,
      line:{
        type:String,
        default:true
      },
      dh:String,
    },
    data () {
      return {
        loadtext: 'loading...',
        phonetype:window.phonetype
      }
    },
    mounted(){
      console.log(this.line);
    },
    components: {
    },
    methods: {
      channelsDetail(id){
        window.location.href="channel.html?id="+id;
      },
      toGood(data){
        // switch (data.type) {
        //   case 0:
        //     window.location.href="channel.html?id="+data.id+"&type=dh";
        //     break;
        //   case 1:
        //     window.location.href="channel-small.html?id="+data.id+"&type=dh";
        //     break;
        //   case 2:
        //     window.location.href="channel.html?id="+data.id+"&type=dh";
        //     break;
        //   default:
        //     window.location.href="good.html?id="+data.id+"&type=dh";
        //     break;
        // }
      },
      toConfirm(data){
        window.location.href="privilege-confirm.html?id="+data.id;
      }
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
#goodlist{
  .con{
    padding:0 .4rem 0;
    background: #fff;
    box-sizing: border-box;
    margin-top: .4rem;
    width: 100%;
    .good{
      overflow: hidden;
      height: 1.73rem;
      padding: .3rem 0;
      .img{
        float: left;
        overflow: hidden;
        img{
          width: 1.62rem;
          height: 1.62rem;
        }
      }
      .info{
        margin-left: 1.82rem;
        position: relative;
        height: 100%;
        font-size: 14px;
        .price{
          position: absolute;
          bottom: 3px;
          line-height: 20px;
          font-size: 14px;
          color: #666;
        }
        .dh{
          position: absolute;
          bottom: 0;
          right: 0;
          width: 1.93rem;
          height: .64rem;
          background: #ca915c;
          border-radius: 4px;
          text-align: center;
          line-height: .64rem;
          color: #fff;
        }
      }
    }
  }
}
</style>
