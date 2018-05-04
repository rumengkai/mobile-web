<template>
	<div id="activity-images" class="activity-images">
    <div class="content-images" v-bind:style="{width: item.width, height: item.height}" v-bind:class="{'center' : index%3==1}" v-for="(item,index) in dataQuery" v-bind:key="index">
      <img v-if="dataQuery.length == 1&&item.width>=item.height" @click="previewImage(item.url)" class="img" v-bind:style="{width: item.width, height: 'auto', maxWidth: item.width, maxHeight: item.height}" :src="item.url" />
      <img v-if="dataQuery.length == 1&&item.width<item.height" @click="previewImage(item.url)" class="img" v-bind:style="{width: width+'px', height: 'auto'}" :src="item.url" />
      <div v-if="dataQuery.length > 1"  @click="previewImage(item.url)" class="zoom-image" v-bind:style="{width: width+'px', backgroundImage: 'url(' + item.url + ')'}"></div>
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
        type: Number,
        default: -1
      }
		},
		data() {
			return {
        widthNum: 0
      }
		},
		components: {},
		mounted() {
      console.log(this.dataQuery);
      this.initData()
		},
		methods: {
      initData() {
        console.log(this.width)
        if (this.dataQuery.length>1) {
          console.log(this.width)

        } else {

        }
      },
      previewImage(url) {
        console.log(wx)
        let list = []
        this.dataQuery.map((item) => {
          list.push(item.url)
        })
        wx.previewImage({
            current: url, // 当前显示图片的http链接
            urls: list// 需要预览的图片http链接列表
        });
      }
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
    .zoom-image {
      height:0;
      padding-bottom:100%;
      overflow:hidden;
      background-position:center center;
      background-repeat:no-repeat;
      -webkit-background-size:cover;
      -moz-background-size:cover;
      background-size:cover;
    }
  }
</style>
