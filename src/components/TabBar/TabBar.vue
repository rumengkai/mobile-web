<template>
  <div id="tabbar" class="vux-1px-t">
    <ul>
      <li @click="tab('home')" v-if="active=='home'" class="focus">
        <img src="./images/tabbar_home_select.png" alt="首页">
        <span>首页</span>
      </li>
      <li @click="tab('home')" v-else>
        <img src="./images/tabbar_home.png" alt="首页">
        <span>首页</span>
      </li>
      <li @click="tab('sub')" v-if="active=='sub'" class="focus">
        <img src="./images/tabbar_subscripe_select.png" alt="首页">
        <span>订阅</span>
      </li>
      <li @click="tab('sub')" v-else>
        <img src="./images/tabbar_subscripe.png" alt="首页">
        <span>订阅</span>
      </li>
      <li @click="tab('my')" v-if="active=='my'" class="focus">
        <img src="./images/tabbar_profile_select.png" alt="首页">
        <span>我的</span>
      </li>
      <li @click="tab('my')" v-else>
        <img src="./images/tabbar_profile.png" alt="首页">
        <span>我的</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: 'tabbar',
    props: {
      active:String,
    },
    data () {
      return {
      }
    },
    mounted(){
    },
    components: {
    },
    methods: {
      tab (focus) {
        if (focus=="home") {
          window.location.href='/m/home.html';
        }
        if (focus=="sub") {
          window.location.href='/m/channels.html';
        }
        if (focus=="my") {
          window.location.href='/m/my.html';
        }
      }
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
#tabbar{
  width: 100%;
  position: fixed;
  bottom: 0;
  height: .98rem;
  background-color: rgba(255,255,255,0.96);
  ul{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    height: 100%;
    li{
      width: 100%;
      height: 100%;
      line-height: .8rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #ccc;
      span{
        text-align: center;
        line-height: .35rem;
        transform: scale(0.8);
        margin-bottom: -0.16rem;
      }
      img{
        display: block;
        width: .4rem;
      }
    }
    .focus{
      color: #CB925F;
    }
  }
}
</style>
