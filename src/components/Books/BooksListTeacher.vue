<template>
  <div id="books-list-teacher">
    <group>
      <li v-for="(item,index) in dataList" @click="todetail(item.id)" :key="index" v-bind:class="{'vux-1px-b':(dataList.lenght-1)!=index}">
        <div class="left">
          <img class="headimg" :src="item.author_photo" alt="">
        </div>
        <div class="right">
          <p class="name"> {{item.name}}</p>
          <p class="brief" v-html="stringBr(item.brief)"></p>
          <div class="bookname">
            <p v-for="(item2,index) in item.items" :key="index">
              <img class="img-1" src="./images/book.png" alt="">
              <span>{{item2.name}}</span>
              <img v-if="item2.is_new" class="img-2" src="./images/book-new.png" alt="">
            </p>
          </div>
        </div>
      </li>
    </group>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {
    stringBr
  } from 'src/common/js/assembly';
  import {
    Group
  } from 'vux'
  export default {
    props: {
      dataList: {
        type: Array,
        default: []
      },
    },
    data() {
      return {}
    },
    components: {
      Group
    },
    mounted() {},
    methods: {
      todetail(id) {
        window.location.href = "/m/books-list.html?id=" + id;
      },
      stringBr
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/1px.less';
  #books-list-teacher {
    background: #fff;
    height: auto;
    .weui-cells {
      padding-left: .3rem;
    }
    li {
      padding: .3rem .3rem .3rem 0;
      display: flex;
      .left {
        width: .72rem;
        // height: 2rem;
        .headimg {
          width: .72rem;
          height: .72rem;
          border-radius: .5rem;
          display: block;
        }
      }
      .right {
        max-width: 5rem;
        margin-left: .3rem;
      }
      .name {
        font-size: 14px;
        color: 000;
      }
      .brief {
        line-height: .4rem;
        overflow: hidden;
        font-size: 12px;
        color: #666;
        max-height: .8rem;
        text-align: justify;
      }
      .bookname {
        p {
          font-size: 13px;
          overflow: hidden;
          margin: .08rem 0;
          display: flex;
          height: .37rem;
          align-items: center;
        }
        .img-1 {
          width: .35rem;
          margin-right: 10px;
        }
        .img-2 {
          margin-left: 8px;
          width: .52rem;
        }
      }
    }
  }
</style>
