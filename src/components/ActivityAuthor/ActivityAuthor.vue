<template>
	<div id="activity-author" class="activity-author">
    <div class="author_content" v-bind:class="{'position-relative' : item.top!=undefined}" v-for="item in dataInfo.items" v-bind:key="item.id">
      <div v-bind:class="{'border-bottom' : item.top!=undefined}">
        <div class="flex-start-between">
          <div class="left flex-start">
            <div class="left_1" @click="toAuthorIndex(item.user.id)">
              <img class="photo" :src="item.user.photo" alt="">
              <img class="vip" :src="item.user.level_icon" alt="">
            </div>
            <div class="left_2">
              <p class="name flex-start"><span class="ell" v-bind:class="{ 'user-name' : item.user.name.length>9 }" >{{item.user.name}}</span><span v-show="item.top" class="place-top">置顶</span></p>
              <p class="time-number">{{item.time | parseTime('{m}/{d} {h}:{i}')}}</p>
            </div>
          </div>
          <div class="right flex-between">
            <img @click="getDelete(item.user.id)" v-if="item.can_delete" class="delete" src="https://static1.kofuf.com/1520577759131.png" alt="">
            <img @click="getLiked(item.user.id)" v-if="item.liked" class="liked" src="https://static1.kofuf.com/1513910095553.png" alt="">
            <img @click="getUnliked(item.user.id)" v-if="!item.liked"  class="unliked" src="https://static1.kofuf.com/1513910064052.png" alt="">
            <div class="liked-number">{{item.like_count}}</div>
          </div>
        </div>
        <div class="activity-section">
          <div v-if="item.top==undefined" class="content dbell" style="-webkit-box-orient: vertical;" >{{item.content}}</div>
          <div v-else class="content">{{item.content}}</div>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
  import Vue from 'vue'
  import {
    parseTime
  } from '../../filters/index'
	export default {
    name: 'activity-author',
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
			toAuthorIndex(id) {
        console.log(id)
        this.$emit('toIndex', id)
      },
      getDelete(id) {
        console.log(id)
        this.$emit('toDelete', id)
      },
      getLiked(id) {
        console.log(id)
        this.$emit('toLiked', id)
      },
      getUnliked(id) {
        console.log(id)
        this.$emit('toUnLiked', id)
      }
		}
	}
</script>

<style lang="less">
	@import '~vux/src/styles/1px.less';
	.activity-author {
		background: #fff;
    height: auto;
    .author_content {
      padding: 15px 0;
    }
		.left{
      position: relative;
      .left_1{
        margin-top: 4px;
        .photo{
          display: block;
          width: 36px;
          height: 36px;
          border-radius: 36px;
        }
        .vip{
          position: absolute;
          left: 22px;
          top: 28px;
          z-index: 2;
          width: 18px;
          height: 18px;
          border-radius: 18px;
        }
      }
      .left_2{
        padding: 0 0 0 10px;
        width: 4rem;
        .name{
          font-size: 16px;
          height: 32px;
          line-height: 32px;
          color: #000000;
          .user-name {
            width: 3rem;
          }
          .place-top{
            line-height: 17px;
            width: 34px;
            text-align: center;
            font-size: 10px;
            color: #CB925F;
            border: 1px solid #CB925F;
            margin-left: 10px;
            margin-top: 10px;
            border-radius: 2px;
          }
        }
        .time-number{
          font-size: 10px;
          color: #999999;
        }
      }
		}
		.right{
      font-size: 15px;
      color: #666666;
      margin-top: 10px;
			.delete{
        width: 16px;
        height: 16px;
        line-height: 16px;
			}
			.liked{
        width: 17px;
        height: 17px;
        line-height: 17px;
        margin: 0 10px;
      }
      .unliked{
        width: 17px;
        height: 17px;
        line-height: 17px;
        margin: 0 10px;
      }
      .liked-number {
        height: 16px;
        line-height: 16px;
        font-size: 11px;
        font-weight: 500;
        color: #7B7B7B;
        letter-spacing: 0;
        text-align: center;
      }
    }
    .activity-section{
      padding-left: 46px;
      .content {
        font-size: 14px;
        color: #000000;
        line-height: 20px;
        text-align: justify;
        margin-top: 10px;
      }
    }
  }
  .ell {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .dbell {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .flex-start {
    display: -moz-box;
    display: -webkit-box;
    display: box;
    -moz-box-align: center;
    -webkit-box-align: center;
    -moz-box-pack: start;
    -webkit-box-pack: start;
    display: -webkit-flex;
    display: -moz-flex;
    display: flex;
    -webkit-align-items: center;
    -moz-align-items: center;
    align-items: center;
    -webkit-justify-content: flex-start;
    -moz-justify-content: flex-start;
    justify-content: flex-start;
  }
  .flex-between {
    display: -moz-box;
    display: -webkit-box;
    display: box;
    -moz-box-align: center;
    -webkit-box-align: center;
    -moz-box-pack: justify;
    -webkit-box-pack: justify;
    display: -webkit-flex;
    display: -moz-flex;
    display: flex;
    -webkit-align-items: center;
    -moz-align-items: center;
    align-items: center;
    -webkit-justify-content: space-between;
    -moz-justify-content: space-between;
    justify-content: space-between;
  }
  .flex-start-between {
    display: -moz-box;
    display: -webkit-box;
    display: box;
    -moz-box-align: start;
    -webkit-box-align: start;
    -moz-box-pack: justify;
    -webkit-box-pack: justify;
    display: -webkit-flex;
    display: -moz-flex;
    display: flex;
    -webkit-align-items: flex-start;
    -moz-align-items: flex-start;
    align-items: flex-start;
    -webkit-justify-content: space-between;
    -moz-justify-content: space-between;
    justify-content: space-between;
  }
  .position-relative {
    position: relative;
  }
  .border-bottom::before {
    content: "";
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #e5e5e5;
    -webkit-transform: scaleY(.5);
    -ms-transform: scaleY(.5);
    -o-transform: scaleY(.5);
    transform: scaleY(.5);
    -webkit-transform-origin: 0 0;
    -ms-transform-origin: 0 0;
    -o-transform-origin: 0 0;
    transform-origin: 0 0;
  }
</style>
