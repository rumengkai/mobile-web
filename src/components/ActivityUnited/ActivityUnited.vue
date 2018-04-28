<template>
	<div id="activity-uniteds" class="activity-uniteds">
    <div class="content">
      <div>
        <img src="" />
      </div>
      <div>
        <div>
          <span>掌门：</span>
          <img />
          <span>李大霄</span>
        </div>
        <div>
          <div>成员：300</div>
          <div>动态：400</div>
        </div>
        <div>
          <div>加入门派</div>
          <div>已加入</div>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
	import Vue from 'vue'
	export default {
    name: 'activity-united',
		props: {
			dataInfo: {
				type: Object,
				default: {}
      }
		},
		data() {
			return {}
		},
		components: {},
		mounted() {
      console.log(this.dataInfo);
		},
		methods: {
		}
	}
</script>

<style lang="less">
	@import '~vux/src/styles/1px.less';
	.activity-images {
		background: #fff;
    height: auto;
    padding-left: 46px;
    .content {
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
