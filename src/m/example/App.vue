<template>
  <div id="example">
      <div class="content" v-show="showContent">
        <div class="large-img">
          <img :src="itemsinfo.image" alt="">
        </div>
        <div class="title">
          {{itemsinfo.name}}
        </div>
      </div>
    <footer v-if="showContent">
      <div class="freeread" @click="addCart">
        <span>加入购物车</span>
      </div>
      <div class="subscribe" @click="buy" >
        <span>立即购买</span>
      </div>
    </footer>
    <Failed v-if="failedshow" :msg="failedmsg"></Failed>
    <Loading v-model="loadingshow" :text="loadtext" ></Loading>
  </div>
</template>

<script>
  import 'common/css/reset.css';
  import 'common/js/config.js';
  import AjaxServer from 'common/js/ajaxServer.js';
  import geturlpara from 'common/js/geturlpara.js';
  import { toPay } from 'common/js/pay.js';
  import Vue from 'vue'
  import { formatDate2 } from 'common/js/date.js';
  import {Loading,XHeader,Scroller,LoadMore,AlertPlugin,ToastPlugin,querystring,cookie} from 'vux'
  import Failed from "components/Failed/Failed"
  import List from "components/List/List"
  Vue.use(ToastPlugin)
  Vue.use(AlertPlugin)
  Vue.prototype.$geturlpara=geturlpara

  export default {
    name: 'example',
    data () {
      return {
        id:0,
        showContent:false,
        loadingshow: true,
        loadtext: 'loading...',
        itemsinfo:{ },
        failedshow:false,
        failedmsg:"服务请求失败，请刷新重试",
        nonecomment:false,
        loadmore:true,
      }
    },
    components: {
      XHeader,
      Loading,
      LoadMore,
      Scroller,
      Failed,
      List
    },
    beforeCreate(){
      //授权
      var id = this.$geturlpara.getUrlKey("id");
      getAuth(cookie,querystring,"channel",id);
    },
    created () {
      var id = this.$geturlpara.getUrlKey("id");
      this.id=id;
      this.fetchData(id);
    },
    methods: {
      //获取商品数据
      fetchData(id){
        var self = this;
        AjaxServer.httpGet(
          Vue,
          HOST+'/api/items/'+id+'.json',
          {},
          (data)=>{
            this.loadingshow=false;
            this.itemsinfo=data;
            if(this.itemsinfo.status!=0){
              this.failedmsg=this.itemsinfo.error;
              this.failedshow=true;
            } else{
              document.title = data.name;
              this.itemsinfo=data;
              this.showContent=true;
            }
          },
          (err)=>{
            this.loadingshow=false;
            // this.failedshow=true;
            console.log(err);
          }
        );
        setTimeout(()=>{
          self.loadingshow=false;
        },10000);
      },
      toDetail(id){
        window.location.href="detail.html?id="+id;
      },
      //加入购物车
      addCart(){
        var id = this.$geturlpara.getUrlKey("id");
        console.log(id);
        window.location.href="https://a.mlinks.cc/AK8j?id="+id;
      },
      //立即购买
      buy(){
        var id = this.$geturlpara.getUrlKey("id");
        console.log(id);
        window.location.href="https://a.mlinks.cc/AK8j?id="+id;
      },
      logErr(err){
        this.$vux.alert.show({
          title: '提示',
          content: err,
          dialogTransition:"",
          maskTransition:"",
          onShow () {},
          onHide () {}
        })
      },
    },
    filters: {
      formatDate2:function (time) {
        var date = new Date(time);
        var nowDate = new Date();
        if ((formatDate2(new Date(time),'yyyy')-formatDate2(nowDate,'yyyy'))<0) {
          return formatDate2(date, "yyyy年MM月dd日");
        }else{
          return formatDate2(date, "MM月dd日");
        }
      }
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
body{
  background-color: #eee;
}
#example{
  height: 100%;
  background-color: #fff;
  .content{
    .large-img{
      position: relative;
      .name-brief{
        position: absolute;
        color: #fff;
        bottom: 0px;
        width: 100%;
        background-color: rgba(0,0,0,0.2);
        overflow: hidden;
        .name{
          padding-left: .3rem;
          width: 100%;
          line-height: 30px;
          font-size: 22px;
          font-weight: 400;
        }
        .brief{
          padding-left: .3rem;
          line-height: 28px;
          font-size: 16px;
          font-weight: 200;
        }
      }
      img{
        width: 100%;
        height: 4.8rem;
        display: block;
      }
    }

  }
  footer{
    height: 46px;
    width: 100%;
    max-width: 680px;
    background-color: #fff;
    box-shadow: rgba(0,0,0,.2) 0 0 10px;
    position: fixed;
    bottom: 0;
    padding: 0;
    z-index: 1000;
    display: -webkit-box;
    -webkit-box-align: center;
    font-size: 20px;
    .freeread{
      color: #fbfbfb;
      width: 50%;
      text-align: center;
      background-color: #757475;
      height: 100%;
      line-height: 46px;
    }
    .subscribe{
      width: 50%;
      color: #fbfbfb;
      line-height: 46px;
      text-align: center;
      background-color: #ffbf00;
    }
  }
}
</style>
