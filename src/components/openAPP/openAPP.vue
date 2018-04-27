<template>
	<div class="open-app">
    <div class="content">
      <div class="app-content" @click="toHome">
        <img src="https://m.kofuf.com/static/img/logo.png" alt="">
        <div class="app-text"><p class="p1">微信登陆APP</p><p class="p2">阅读体验更佳</p></div>
      </div>
      <div class="download">
        <a id='openApp'>打开APP</a>
      </div>
    </div>
	</div>
</template>

<script>
	import Vue from 'vue'
	export default {
    name: 'open-app',
		props: {
			id: {
				type: String,
				default: ''
			}
		},
		data() {
			return {}
		},
		components: {},
		mounted() {
      new Mlink({
        mlink: "https://ah88dj.mlinks.cc/AK8f?id="+this.id,
        button: document.querySelector('a#openApp'),
        autoLaunchApp : false,
      });
		},
		methods: {
      toHome: function() {
        window.location.href="/m/home.html"
      }
		}
	}
</script>

<style lang="less">
	@import '~vux/src/styles/1px.less';
	.open-app {
		background: #fff;
    height: auto;
    .content {
      height: .92rem;
      width: 100%;
      max-width: 680px;
      background-color: #ffffff;
      box-shadow: 0 0 10px rgba(0,0,0,.2);
      position: fixed;
      bottom: 0;
      padding: .16rem 0;
      z-index: 200001;
      display: -webkit-box;
      -webkit-box-align: center;
      .app-content {
        font-size: .4rem;
        color: #ca915c;
        width: 60%;
        img {
          border-radius: 5px;
          width: .8rem;
          height: .8rem;
          display: block;
          float: left;
          margin-left: .3rem;
        }
        .app-text {
          width: 2.1rem;
          float: left;
          margin-left: .36rem;
          color: #868686;
          .p1{
            font-size: 12px;
            line-height: .4rem;
            font-weight: 400;
          }
          .p2{
            font-size: 12px;
            line-height: .4rem;
            font-weight: 100;
          }
        }
      }
      .download {
        width: 36%;
        text-align: right;
        #openApp {
          height: .68rem;
          display: block;
          color: #ca915c;
          border: 1px solid #ca915c;
          border-radius: 5px;
          text-align: center;
          line-height: .68rem;
          background-color: #ffffff;
          font-size: 18px;
          box-sizing: content-box;
          margin-right: .2rem;
          margin-left: auto;
        }
      }
    }
    .center {
      padding: 0 4px;
    }
  }
</style>
