<template>
	<div id="activity-images" class="activity-images">
    <div class="content-images" v-bind:style="{width: width, height: width}" v-bind:class="{'center' : index%3==1}" v-for="(item,index) in dataQuery" v-bind:key="index">
      <img class="img" v-bind:style="{width: width, height: width}" :src="item.url" />
    </div>
	</div>
</template>

<script>
	import Vue from 'vue'
	export default {
    name: 'activity-images',
		props: {
			dataQuery: {
				type: Array,
				default: []
      },
      width: {
        type: String,
        default: ''
      }
		},
		data() {
			return {}
		},
		components: {},
		mounted() {
      console.log(this.width)
      console.log(this.dataQuery);
		},
		methods: {
		}
	}
</script>

<style lang="less">
	@import '~vux/src/styles/1px.less';
	#activity-images {
		background: #fff;
    height: auto;
    .content-images {
      display: inline-block;
      .img {
        width: 100%;
        height: 100%;
      }
    }
    .center {
      padding: 0 4px;
    }
  }
</style>
