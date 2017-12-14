<template>
  <div id="books-list">
    <group>
      <li v-for="(item,index) in dataList" @click="toDetail(item)" :key="index" v-bind:class="{'vux-1px-b':(dataList.lenght-1)!=index}">
        <img class="headimg" :src="item.thumb" alt="">
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
  import { stringBr } from 'src/common/js/assembly';
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
    mounted(){
    },
    methods: {
      toDetail(data){
        if (data.article_id&&data.article_id>0) {
          window.location.href="/m/detail.html?id="+data.article_id;
        }else{
          window.location.href="/m/book-detail.html?id="+data.id;
        }
      },
      stringBr
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
    .headimg{
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
