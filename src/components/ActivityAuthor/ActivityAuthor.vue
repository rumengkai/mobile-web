<template>
	<div id="activity-author" class="activity-author" >
    <div class="author_content" ref="author" v-show="showContent" v-bind:class="{'position-relative' : item.top!=undefined}" v-for="(item,index) in dataInfo.items" v-bind:key="item.id">
      <div v-bind:class="{'border-bottom' : item.top!=undefined}">
        <div class="flex-start-between" @click="toCommunityDetail(item.id)">
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
          <div class="right flex-between" v-show="false">
            <div @click="getComment(item.id)" v-if="item.comment_count != undefined" class="comment">
              <img class="comment-img" src="https://static1.kofuf.com/1525254905356.png" alt="">
              <div class="liked-number">{{item.comment_count}}</div>
            </div>
            <img @click="getDelete(item.id)" v-if="item.can_delete" class="delete" src="https://static1.kofuf.com/1520577759131.png" alt="">
            <img @click="getUnLiked(item.id)" v-if="item.liked" class="liked" src="https://static1.kofuf.com/1513910095553.png" alt="">
            <img @click="getLiked(item.id)" v-if="!item.liked"  class="unliked" src="https://static1.kofuf.com/1513910064052.png" alt="">
            <div class="liked-number">{{item.like_count}}</div>
          </div>
        </div>
        <div class="activity-section">
          <div>
            <div v-show="item.comments!=undefined&&mark==1&&item.type!=3" v-html="item.text" class="content" v-bind:class="{ 'dbell' : !markState }" style="-webkit-box-orient: vertical;" >{{item.text}}</div>
            <div v-show="mark==2" class="content" v-html="item.content">{{item.content}}</div>
          </div>
          <div ref="eightell">
            <div v-show="item.comments==undefined&&mark==1&&item.type!=3">
              <div class="content" v-html='item.text' v-bind:class="{'eightell' : item.eightStatus}" style="-webkit-box-orient: vertical;" >{{item.text}}</div>
              <div @click="toLookMore(index)" v-show="item.eightStatus" class="look-more">查看更多>></div>
            </div>
          </div>
          <div v-if="item.type==1" class="images-section" v-bind:class="{'overflow' : !markState}">
            <activity-images v-if="widthNum!=0" :dataQuery="item.images" :width="widthNum"></activity-images>
          </div>
          <div v-if="item.type==2">
            <div class="article-section flex-start" @click="toDetail(item.post.url)">
              <img class="article-thumb" :src="item.post.thumb"/>
              <div class="article-title">{{item.post.title}}</div>
            </div>
          </div>
          <div v-if="item.type==3">
            <audiobox :music="item.audio.url" :id="item.id.toString()"></audiobox>
          </div>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
  import Vue from 'vue'
  import Audiobox from "../Audio/Audio"
  import ActivityImages from "../ActivityImages/ActivityImages"
	export default {
    name: 'activity-author',
		props: {
			dataInfo: {
				type: Object,
				default: {}
      },
      mark: {
        type: String,
        default: ''
      },
      markState: {
        type: Boolean,
        default: false
      }
		},
		data() {
			return {
        width: '',
        widthNum: 0,
        height: null,
        idx: -1,
        jmz: {},
        showContent: true
      }
		},
		components: {
      ActivityImages,
      Audiobox
    },
		mounted() {
      // console.log(this.$refs.author[0].clientHeight)
      // console.log(this.$refs.author[0].clientWidth)
      // console.log(this.dataInfo);
      // console.log(this.$refs.eightell[0].clientHeight)
      // console.log(this.$refs.eightell[0].clientWidth)
      this.widthNum = (this.$refs.author[0].clientWidth-30-46-8)/3
      console.log(this.widthNum)
      this.width = (this.$refs.author[0].clientWidth-30-46-8)/3+'px'
      if (!this.markState) {
        this.height = this.width
      } else {
        this.height = 'auto'
      }
      this.getLength()
      let _self = this
      let w1 = _self.$refs.eightell[0].clientWidth
      this.dataInfo.items.map((item, index) => {
        item.eightStatus = false
        if (item.comments==undefined&&this.mark==1&&item.type!=3) {
          let h2 = _self.jmz.GetLength(item.text)
          if (parseInt(w1/14)*8*2 <= h2) {
            item.eightStatus = true
          }
        }
      })
      this.$emit('toAuthorHeight', this.$refs.author[0].clientHeight-39)
		},
		methods: {
      getLength(str) {
        this.jmz = {};
        this.jmz.GetLength = function(str) {
          return str.replace(/[\u0391-\uFFE5]/g,"aa").length;  //先把中文替换成两个字节的英文，在计算长度
        };
      },
      toCommunityDetail(id) {
        this.$emit('toCommunity', id)
      },
      toLookMore(idx) {
        console.log(idx)
        this.showContent = false
        this.dataInfo.items.map((item, index) => {
          console.log(idx == index)
          if (idx == index) {
            this.showContent = true
            item.eightStatus = false
          }
        })
        this.$emit('toLookMore', idx)
        console.log(this.dataInfo.items)
      },
      toDetail(url) {
        console.log(url)
        window.location.href = url
      },
			toAuthorIndex(id) {
        console.log(id)
        this.$emit('toIndex', id)
      },
      getComment(id) {
        this.$emit('toComment', id)
      },
      getDelete(id) {
        console.log(id)
        this.$emit('toDelete', id)
      },
      getLiked(id) {
        console.log(id)
        this.$emit('toLiked', id)
      },
      getUnLiked(id) {
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
      padding: 15px;
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
          font-size: 12px;
          color: #666666;
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
        float: left;
        margin-top: -4px;
			}
			.liked{
        width: 17px;
        height: 17px;
        line-height: 17px;
        margin: 0 10px;
        float: left;
        margin-top: -4px;
      }
      .unliked{
        width: 17px;
        height: 17px;
        line-height: 17px;
        margin: 0 5px;
        float: left;
        margin-top: -4px;
      }
      .liked-number {
        height: 16px;
        line-height: 16px;
        font-size: 11px;
        font-weight: 500;
        color: #7B7B7B;
        letter-spacing: 0;
        text-align: center;
        display: inline-block;
      }
      .comment {
        margin-right: 10px;
        .comment-img {
          width: 20px;
          height: 20px;
          line-height: 20px;
          margin: 4px 5px 0;
          float: left;
        }
      }
    }
    .activity-section {
      padding-left: 46px;
      .content {
        font-size: 14px;
        color: #000000;
        line-height: 20px;
        text-align: justify;
        margin-top: 10px;
      }
      .look-more {
        font-size: 14px;
        color: #5F96CB;
        background: #ffffff;
        margin-top: -20px;
        position: absolute;
        right: 15px;
      }
      .images-section {
        margin-top: 15px;
        position: relative;
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
    }
    .article-section {
      width: 96%;
      height: 50px;
      background: #eeeeee;
      margin-top: 10px;
      padding: 6px;
      .article-thumb {
        width: 50px;
        height: 50px;
        overflow: hidden;
      }
      .article-title {
        height: 50px;
        font-size: 13px;
        margin-left: 5px;
        width: 4.8rem;
      }
    }
  }
  .image_bg {
    position: absolute;
    bottom: 78px;
    width: 100%;
  }
  .eightell {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 8;
    overflow: hidden;
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
