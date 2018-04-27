<template>
  <div id="bind-phone">
    <div class="content" v-if="showContent">
      <group class="header">
        <x-input title="" v-model="phoneValue" placeholder="请输入手机号"></x-input>
        <x-input title="" v-model="codeValue" placeholder="输入验证码">
				</x-input>
				<x-button class="primary get-code-btn" :disabled="disabled" type="primary" @click.native="sendCode">{{btnText}}</x-button>
      </group>
      <div style="padding:20px 15px;">
        <x-button type="primary" @click.native="bindPone" class="primary">确定</x-button>
      </div>
    </div>
    <Loading v-model="loadingshow" :text="loadtext" ></Loading>
  </div>
</template>

<script>
  import 'common/css/reset.css';
  import 'common/js/config.js';
  import AjaxServer from 'common/js/ajaxServer.js';
  import {isWeiXin} from 'common/js/common.js';
  import { Group,Cell,Loading,cookie,querystring,XButton,XInput,Toast,ToastPlugin } from 'vux'
	import Vue from 'vue'
	import { getCode,phoneUpdate } from "src/api/my"
	import { isPhone } from "src/utils/validate"
  Vue.use(ToastPlugin)
  export default {
    data () {
      return {
        id:0,
        showContent:true,
        loadingshow: false,
				loadtext: '加载中...',
				phoneValue:"",
				codeValue:"",
				disabled: false,
				dataCount:{},
				btnText: '获取验证码'
      }
    },
    components: {
      Group,
      Cell,
			Loading,
			ToastPlugin,
      XButton,
			XInput,
			Toast
    },
    created () {
      getAuth(cookie,querystring);
    },
    methods: {
			sendCode(){
				if(this.phoneValue){
					if(!isPhone(this.phoneValue)){
						this.toast('手机号格式有误')
						return
					}
					getCode({phone:this.phoneValue}).then(res=>{
						try {
							if (res.status==0) {
								this.toast('发送成功')
								let time = 60
								var cli = setInterval(()=>{
									if (time<=0) {
										this.disabled = false
										clearInterval(cli)
										console.log(0);
									}else{
										this.btnText = --time + '重新获取'
									}
								},1000)
								this.disabled = true
							}
						} catch (error) {
							
						}
					})
				}else{
					this.toast('请填写手机号')
				}
			},
			bindPone(){
				if (this.phoneValue!=''&&this.codeValue!='') {
					phoneUpdate({phone:this.phoneValue,code:this.codeValue}).then(res=>{
						try {
							if (res.status==0) {
								this.toast('操作成功')
								setTimeout(()=>{
									window.history.go(-1)
								},2000)
							}else if(res.status==0){
								this.toast('请到APP中进行账号合并')
							}
						} catch (error) {
						}
					})
				}
			},
			toast(msg){
				this.$vux.toast.show({
					text: msg,
					type: "text",
					width: '200px',
					showPosition: 'bottom',
          onShow () {
            console.log('Plugin: I\'m showing')
          },
          onHide () {
            console.log('Plugin: I\'m hiding')
          }
        })
			},
      coderule(){
        window.location.href="/m/code-rule.html"
      },
      toSkip(data){
        window.location.href="/m/"+data;
      },
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
@import "../index/App.less";
@import './App.less';
</style>
