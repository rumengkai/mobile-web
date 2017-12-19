<template>
  <div id="big-surprising">
    <div class="con" v-show="showContent&&active">
      <div class="header">
        <img src="./images/logo_b.png" alt="">
      </div>
      <div class="surprising" >
        <div class="welcome">
          <p>欢迎您来到功夫财经年中盛典“炼金之夜”</p>
          <p>今夜，我们为您特别奉献一份功夫大礼&nbsp;&nbsp;&nbsp; </p>
          <img src="http://static1.kofuf.com/1501061930563.png" alt="">
          <p class="endtime">活动优惠价截至2017年7月30日12:00前有效</p>
          <p><span><img class="san" src="./images/san_03.png" alt=""></span></p>
        </div>
        <div class="title-d" v-if="show_bigbang">
          <img src="http://static1.kofuf.com/1501064668580.png" alt="">
        </div>
        <div class="big-gift" v-if="show_bigbang">
          <p class="g-title">功夫宝典大礼包内含功夫财经精选的5门学者课程</p>
          <div class="cla">
            <p>《郎咸平沃顿投资课》</p>
            <p>《郎咸平：中国经济的50个关键词》</p>
            <p>《老端的投资秘籍》</p>
            <p>《肖锋：个人晋级二十讲》</p>
            <p>《王福重：重•点》</p>
          </div>
          <div class="img">
            <img src="./images/gift.png" alt="礼包">
          </div>
          <div class="prices">
            <span class="price">
              <span>特惠价：</span>
              <span>¥ {{bigBang.price}} &nbsp;</span>
              <s class="del"> ¥{{bigBang.old_price}}</s>
            </span>
            <div class="btn" @click="subscribe({id:bigID,isbig:true})">
              购买
            </div>
          </div>
        </div>
      </div>
      <div class="buy-one">
        <div class="title-d">
          <img src="http://static1.kofuf.com/1501064668589.png" alt="">
        </div>
        <div class="sub-list vux-1px-b" v-for="item in bigOneList">
          <div class="img">
            <img :src="item.thumb" alt="礼包">
          </div>
          <div class="info">
            <p class="title">
              {{item.name}}
            </p>
            <p class="bref">
              {{item.author_name}}&nbsp;&nbsp;{{item.author_field}} &nbsp;学者
            </p>
            <p >
              <span class="one-c">{{item.brief}}</span>
            </p>
            <p class="price">
              <span>特惠价：</span>
              <span>¥ {{item.price}} </span>
              <s class="del"> ¥{{item.old_price}}</s>
            </p>
          </div>
          <div class="btn" v-bind:class="{ btnd:item.followed }" @click="subscribe(item)">
            <span v-if="item.followed">已购</span>
            <span v-if="!item.followed">购买</span>
          </div>
        </div>
        <p class="phone"><a href="tel:+4009667718">Tel：400-966-7718</a></p>
      </div>
    </div>

    <div class="open-app" v-show="showContent">
      <a class="btnOpenApp">打开APP查看订阅专栏</a>
    </div>
    <div class="endactive" v-show="!active">
      <img class="ljzy" src="./images/endtime_1.png" alt="">
      <img src="./images/endtime_2.png" alt="">
      <p class="p1">活动已结束</p>
      <!-- <p><a class="btnOpenApp">打开功夫财经APP</a></p> -->
    </div>
    <Loading v-model="loadingshow" :text="loadtext" ></Loading>
  </div>
</template>

<script>
  import 'common/css/reset.css';
  import 'common/js/config.js';
  import Vue from 'vue';
  import {isWeiXin , weixinShare} from 'common/js/common.js';
  import {Loading,querystring,cookie,AlertPlugin} from 'vux'
  import AjaxServer from 'common/js/ajaxServer.js';
  import { toPay } from 'common/js/pay.js';
  Vue.use(AlertPlugin)
  export default {
    name: 'big-surprising',
    data () {
      return {
        loadingshow:false,
        active:false,
        loadtext:"加载中。。。",
        showContent:false,
        show_bigbang:true,
        bigID:0,
        bigBang:{
          price:0,
          old_price:0
        },
        bigOneList:[],
        orderInfo:"",
        headlist:[
          {id:2087,img: "http://static1.kofuf.com/1501058350889.png"},
          {id:2086,img: "http://static1.kofuf.com/1500972298710.png"},
          {id:2085,img: "http://static1.kofuf.com/1500972298752.png"},
          {id:1919,img: "http://static1.kofuf.com/1500972298727.png"},
          {id:1632,img: "http://static1.kofuf.com/1500972299706.png"}
        ]
      }
    },
    components: {
      Loading,
    },
    beforeCreate(){
      if(isWeiXin()){
        //授权
      }
      window.shareData={
        title:'功夫财经-炼金之夜-大礼包',
        link:'http://m.kofuf.com/m/big-surprising.html',
        imgUrl:'http://m.kofuf.com/static/img_h5/h5_logo.png',
        desc:"【功夫财经，搞大事情】7月29日，北京奥体中心体育馆，财经界半壁江山归一！最炙手可热的经济学者，你最关注的财经话题，炼金之夜，尽情呈献给你！红毯、礼服、摇滚、财经，最跨界的组合，最意想不到的惊喜！729，北京奥体中心，第一波招募，开启！戳链接，我们等你"
      }
      weixinShare(Vue);
      getAuth(cookie,querystring,"big-surprising.html");
    },
    mounted () {
      // this.fetchData();
      new Mlink({
        mlink: "https://ah88dj.mlinks.cc/AK8f",
        button: document.querySelector('a.btnOpenApp'),
        autoLaunchApp : false,
      });
      var time=new Date().getTime();
      // var endtime=new Date("2017-7-30 11:00:00").getTime();
      var endtime=new Date("2017-7-30 12:00:00").getTime();
      if ((endtime-time)<=0) {
        this.active=false;
      }else if((endtime-time)>0){
        this.active=true;
      }
    },
    methods: {
      //获取专栏数据数据
      fetchData(){
        var self = this;
        AjaxServer.httpGet(
          Vue,
          HOST+'/api/bigbang/729.json',
          {},
          (data)=>{
            if (data.status!=0&&isWeiXin()&&localStorage.getItem("gid")) {
              console.log(data.error);
              if(data.status==5){
                localStorage.setItem("gid","");
                localStorage.clear();
                clearcookie(cookie);
                getAuth(cookie,querystring,"big-surprising.html");
              }
            }else if(data.status==0){
              self.loadingshow=false;
              self.showContent=true;
              self.bigOneList=data.channels;
              self.bigBang.price=data.price;
              self.bigBang.old_price=data.old_price;
              self.show_bigbang=data.show_bigbang;
              self.bigID=data.id;
              self.bigOneList=self.bigOneList.map(function (item,index) {
                for (var i = 0; i < self.headlist.length; i++) {
                  if (self.headlist[i].id===item.id) {
                    item.thumb=self.headlist[i].img;
                  }
                }
                return item;
              })
            }
          },
          (err)=>{
            this.loadingshow=false;
            console.log(err);
          }
        );
      },
      //订阅支付
      subscribe:function (item) {
        var self = this;
        if(!item.followed){
          if (item.isbig) {
            if (localStorage.getItem("gid")) {
              self.loadtext="加载中..."
              self.loadingshow=true;
              //发起订单请求
              AjaxServer.httpPost(
                Vue,
                HOST+"/pay/weixin/create_order",
                {
                  type: "JSAPI",
                  items: item.id,
                  order_type:4
                },
                (data)=>{
                  self.loadingshow=false;
                  if (data.status!=0) {
                    this.$vux.alert.show({
                      title: '提示',
                      content: "创建订单失败",
                      dialogTransition:"",
                      maskTransition:"",
                      onHide (){
                        console.log("订单创建失败");
                        if(data.status==5){
                          localStorage.setItem("gid","");
                          localStorage.clear();
                          clearcookie(cookie);
                          getAuth(cookie,querystring,"big-surprising.html");
                        }
                      }
                    });
                  }else{
                    self.loadingshow=false;
                    console.log("订单创建成功。。");
                    self.orderInfo=data;
                    toPay(data,self.callback,self);
                  }
                },
                (err)=>{
                  console.log(err);
                  console.log("订单创建失败");
                  this.$vux.alert.show({
                    title: '提示',
                    content: "网络异常，请稍后重试",
                    dialogTransition:"",
                    maskTransition:"",
                  });
                  self.loadingshow=false;
                }
              );
            }else{
              //未登陆情况，跳转到授权
              getAuth(cookie,querystring,"big-surprising.html");
            }
          }else{
            console.log(self.bigID+":"+item.id);
            if (localStorage.getItem("gid")) {
              self.loadtext="加载中..."
              self.loadingshow=true;
              //发起订单请求
              AjaxServer.httpPost(
                Vue,
                HOST+"/pay/weixin/create_order",
                {
                  type: "JSAPI",
                  items: self.bigID+":"+item.id,
                  order_type:4
                },
                (data)=>{
                  self.loadingshow=false;
                  if (data.status!=0) {
                    this.$vux.alert.show({
                      title: '提示',
                      content: "创建订单失败",
                      dialogTransition:"",
                      maskTransition:"",
                      onHide (){
                        console.log("订单创建失败");
                        if(data.status==5){
                          localStorage.setItem("gid","");
                          localStorage.clear();
                          clearcookie(cookie);
                          getAuth(cookie,querystring,"big-surprising.html");
                        }
                      }
                    });
                  }else{
                    self.loadingshow=false;
                    console.log("订单创建成功。。");
                    self.orderInfo=data;
                    toPay(data,self.callback,self);
                  }
                },
                (err)=>{
                  console.log(err);
                  console.log("订单创建失败");
                  this.$vux.alert.show({
                    title: '提示',
                    content: "网络异常，请稍后重试",
                    dialogTransition:"",
                    maskTransition:"",
                  });
                  self.loadingshow=false;
                }
              );
            }else{
              //未登陆情况，跳转到授权
              getAuth(cookie,querystring,"big-surprising.html");
            }
          }
        }
      },
      //支付成功回调
      callback(data){
        var self=this;
        AjaxServer.httpPost(
          Vue,
          HOST+"/pay/weixin/check",
          {
            id:data.id
          },
          (data)=>{
            if (data.status!=0) {
              self.$vux.alert.show({
                title: '提示',
                content: "服务器维护中，您的订单已支付成功，请勿重复支付。如有疑问请联系客服：400-966-7718",
                dialogTransition:"",
                maskTransition:"",
              });
            }else{
              location.reload(true)
            }
          }
        );
      },
    }
  }
</script>
<style lang="less">
@import '~vux/src/styles/1px.less';
.vux-1px-t:before {
  border-top: 1px solid #7c583b;
}
.vux-1px-b:after {
  border-bottom: 1px solid #7c583b;
}
html,body{
  width: 100%;
  height: 100%;
  color: #fff;
  background: #000;
}

#big-surprising{
  background: #000;
  width: 100%;
  height: auto;
  // overflow: hidden;
  background-size:100% auto;
  .con{
    background: url(http://static1.kofuf.com/1501061436257.png) no-repeat;
    width: 100%;
    height: auto;
    overflow: hidden;
    background-size:100% auto;
  }
  .header{
    width: 100%;
    img{
      width: 100%;
    }
  }
  .surprising{
    margin-top: 4.8rem;
    height: auto;
    .welcome{
      line-height: .4rem;
      font-size: 14px;
      text-align: center;
      width: 90%;
      margin:20px auto;
      color: #d9d7d5;
      p{
        text-align: center;
      }
      img{
        margin-top: .73rem;
        width: 100%;
      }
      .san{
        width: 13px;
        margin-top: 0;
      }
      .endtime{
        font-size: 12px;
        color: #b07a52;
        transform: scale(0.8);
      }
    }
    .big-gift{
      overflow: hidden;
      .g-title{
        color: #d79765;
        font-size: 14px;
        margin-top: 50px;
        margin-left: 17px;
      }
      .cla{
        margin-top: 30px;
        margin-left: 10px;
        float: left;
        overflow: hidden;
        width: 4.37rem;
        p{
          line-height: 27px;
          font-size: .24rem;
          overflow: hidden;
          text-overflow:"";
          white-space: nowrap;
          color: #e1e1e1;
          transform: scale(0.9);
        }
      }
      .img{
        float: right;
        img{
          margin-top: 34px;
          margin-right: 20px;
          display: block;
          width: 2.28rem;
          height: 2.6rem;
        }
      }
      .prices{
        margin: 200px 20px 0;
        height: 72px;
        .price{
          font-size: .46rem;
          color: #d29463;
          line-height: 34px;
          .del{
            color: #7f7f7f;
            font-size: .30rem;
          }
        }
        .btn{
          float: right;
          right: .16rem;
          width: 1.34rem;
          height: .6rem;
          background: #ca8e5f;
          border-radius: .3rem;
          line-height: .6rem;
          text-align: center;
          font-size: 12px;
          color: #fff;
        }
        .btnd{
          background: #675548;
        }
      }
    }
  }
  .title-d{
    width: 100%;
    height: 33px;
    background: rgba(103, 85, 72, 0.7);
    // line-height: 33px;
    // font-size: 16px;
    // padding-left: 20px;
    position: relative;
    overflow: hidden;
    text-align: center;
    img{
      margin: auto;
      display: block;
      margin-top:5px;
      overflow: hidden;
      width: 80%;
    }
  }
  .buy-one{
    padding-bottom: 100px;
    .sub-list{
      .list;
      .one-c{
        // -webkit-transform:scale(0.8);
        font-size: 12px;
        color: #818181;
      }
      .img{
        border-radius: 5px;
        overflow: hidden;
        img{
          height: 1.7rem;
          border-radius: 5px;
        }
      }
    }
  }
}
.open-app{
  height: 1rem;
  width: 100%;
  text-align: center;
  background: #926645;
  position: fixed;
  bottom: 0;
  z-index: 1000;
  max-width: 680px;
  a{
    font-size: 16px;
    color: #fff;
    line-height: 1rem;
  }
}
.list{
  overflow: hidden;
  margin: 0px 12px 0px;
  position: relative;
  .img{
    float: left;
    overflow: hidden;
    img{
      width: 1.58rem;
      margin: 23px 10px;
    }
  }
  .info{
    float: left;
    display: inline-block;
    width: 3.3rem;
    overflow: hidden;
    margin: 25px 0px 15px;
    position: relative;
    height: 1.62rem;
    font-weight: 100;
    p{
      margin-left: 0;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    .title{
      font-size: 14px;
      line-height: .52rem;
      color: #fff;
    }
    .bref{
      line-height: .40rem;
      font-size: 12px;
      color: #ededed;
    }
    .price{
      position: absolute;
      bottom: 0;
      font-size: 12px;
      color: #e5a16c;
      .del{
        margin-left: 10px;
        color: #7f7f7f;
      }
    }
  }
  .btn{
    float: right;
    position: absolute;
    right: .16rem;
    margin: 50px 0px auto auto;
    width: 1.34rem;
    height: .6rem;
    background: #ca8e5f;
    border-radius: .3rem;
    line-height: .6rem;
    text-align: center;
    font-size: 12px;
    color: #fff;
  }
  .btnd{
    background: #675548;
  }
}
.phone{
  text-align: center;
  font-size: 12px;
  color: #ca8e5f;
  a{
    line-height: 50px;
    color: #ca8e5f;
  }
}
.endactive{
  background: #000;
  width: 100%;
  height: 100%;
  position: relative;
  .ljzy{
    width: 60%;
    display: block;
    margin: 0px auto;
  }
  img{
    margin-top: 40px;
    max-width: 100%;
  }
  .p1{
    font-size: 30px;
    width: 100%;
    margin-top: 30px;
    // margin-bottom: 200px;
    line-height: 80px;
    text-align: center;
    color: #fff;
  }
}
</style>
