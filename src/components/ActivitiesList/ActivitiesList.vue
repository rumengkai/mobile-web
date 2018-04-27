<template>
  <div id="activities">
    <div class="list" v-for="(item,index) in dataList" @click="todetail(item)" :key="index">
      <div class="list-pr">
        <span class="list-ol"></span>
        <span class="list-line" v-if="index != dataList.length - 1"></span>
        <p class="list-top ell">
          <span class="list-address">{{ item.start_time | parseTime("{m}月{d}日") }} ·  {{item.address}}</span>
          <span class="list-tip" v-bind:class="{ 'list-tip-red': item.state==7,'list-tip-g':item.state==8,'list-tip-blur':item.state==11,'list-tip-green':item.state==4||item.state==5 }">{{ item.state_val }}</span>
        </p>
        <p class="name ell"> {{item.intro}}</p>
        <div class="nstep"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { toast } from 'common/js/assembly'
  import { parseTime } from 'common/js/date.js'

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
    components: {  },
    mounted(){
    },
    methods: {
      todetail(data){
        window.location.href = "/mengqi/#/activity/detail/" + data.id
      }
    },
    filters: {
      parseTime:parseTime
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
#activities{
	background: #fff;
	padding: 10px 0;
  height: auto;
  .list{
    height: 60px;
    padding: 5px 25px;
    box-sizing: border-box;
    .list-ol{
      background: #cb925f;
      position: absolute;
      width: 7px;
      height: 7px;
      top: 8px;
      left: -3px;
      border-radius: 4px;
    }
    .list-line{
      background: #cb925f;
      width: 1px;
      position: absolute;
      left: 0;
      top: 8px;
      height: 60px;
    }
    .list-pr{
      padding-left: 20px;
			position: relative;
			.name{
				font-size: 15px;
				line-height: 25px;
			}
    }
  }
  .list-top{
		font-size: 13px;
		line-height: 25px;
		color: #333;
    .list-address{
      max-width: 70%;
    }
		.list-tip{
			font-size: 12px;
			margin-left: .2rem;
			padding: 0px 8px;
			color: #fff;
			background: #C5C5C5;
		}
		.list-top-address{
			max-width: 80%;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
		}
		.list-tip-red{
			background: #DE574F;
		}
		.list-tip-g{
			background: #C5C5C5;
		}
		.list-tip-blur{
			background: #5F96CB;
		}
		.list-tip-green{
			background: #62D2A6;
		}
	}
}
</style>
