<template>
  <div id="books-list">
    <group>
      <li v-for="(item,index) in dataList" @click="todetail(item.id)" :key="index" v-bind:class="{'vux-1px-b':(dataList.lenght-1)!=index}">
        <img :src="item.thumb" alt="">
        <div class="right">
          <p class="name"> {{item.name}}</p>
          <p class="brief" v-html="stringBr(item.brief)"></p>
        </div>
      </li>
    </group>
  </div>
</template>

<script>
  import Vue from 'vue'
  // import { stringBr } from 'src/utils/';
  import { Group } from 'vux'
  export default {
    props: {
      dataList:{
        type: Array,
        default: []
      },
    },
    data () {
      return {
      }
    },
    components: { Group },
    // filters: {
    //   stringBr:stringBr
    // },
    mounted(){
    },
    methods: {
      todetail(id){
        window.location.href="/m/books-list.html?id="+id;
      },
      stringBr (str) {
       return str.replace(/\n/g,"<br/>")
     }
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
#books-list{
  background: #fff;
  height: auto;
  .weui-cells{
    padding-left: .3rem;
  }
  li{
    padding: .3rem .3rem .3rem 0;
    display: flex;
    img{
      width: 2rem;
      height: 2rem;
      display: block;
    }
    .right{
      max-width:5rem;
      margin-left: .3rem;
      height: 2rem;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .name{
      font-size: 14px;
      color: 000;
    }
    .brief{
      line-height: .36rem;
      max-height: 1.4rem;
      overflow: hidden;
      font-size: 12px;
      color: #999;
    }
  }
}
</style>
