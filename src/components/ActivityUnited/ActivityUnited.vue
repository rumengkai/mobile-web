<template>
	<div id="activity-uniteds" class="activity-uniteds">
    <div class="content flex-start">
      <div class="teacher-photo">
        <img class="photo" :src="dataInfo.teacher.photo" />
      </div>
      <div class="teacher-content flex-column-start-between">
        <div class="teacher-name flex-start">
          <span>掌门：</span>
          <img class="img" :src="dataInfo.teacher.photo" />
          <span>{{dataInfo.teacher.name}}</span>
        </div>
        <div class="teacher-num flex-between">
          <div>成员：{{dataInfo.member_size}}</div>
          <div>动态：{{dataInfo.post_count}}</div>
        </div>
        <div class="pay-united">
          <div class="join-united" v-if="!dataInfo.followed">
            <a id='joinOpenApp'>加入门派</a>
          </div>
          <div class="united" v-else>已加入</div>
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
      new Mlink({
        mlink: "https://ah88dj.mlinks.cc/AK8f?id="+this.dataInfo.id,
        button: document.querySelector('a#joinOpenApp'),
        autoLaunchApp : false,
      });
		},
		methods: {
		}
	}
</script>

<style lang="less">
	@import '~vux/src/styles/1px.less';
	#activity-uniteds {
		background: #fff;
    height: auto;
    .content {
      padding: 0.46rem 0;
      .teacher-photo {
        width: 1.82rem;
        height: 1.82rem;
        border-radius: 6px;
        margin-right: 0.5rem;
        .photo {
          width: 1.82rem;
          height: 1.82rem;
          border-radius: 6px;
        }
      }
      .teacher-content {
        width: 4.12rem;
        height: 1.82rem;
        font-size: 14px;
        color: #000000;
        letter-spacing: 0;
        line-height: 20px;
        .teacher-name {
          height: 0.54rem;
          .img {
            width: 0.54rem;
            height: 0.54rem;
            border-radius: 0.54rem;
            margin: 0 10px 0 5px;
          }
        }
        .teacher-num {
          width: 4.12rem;
        }
        .pay-united {
          width: 4.12rem;
          height: 0.6rem;
          line-height: 0.6rem;
          text-align: center;
          border-radius: 6px;
          .united {
            border: 1px solid #B3B3B3;
            background: #FFFFFF;
            color: #000000;
            border-radius: 6px;
          }
          .join-united {
            border: 1px solid #CB925F;
            background: #CB925F;
            color: #ffffff;
            border-radius: 6px;
            a {
              color: #ffffff;
            }
          }
        }
      }
    }
    .center {
      padding: 0 4px;
    }
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
  .flex-column-start-between {
    display: -moz-box;
    display: -webkit-box;
    display: box;
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    -moz-box-align: start;
    -webkit-box-align: start;
    -moz-box-pack: justify;
    -webkit-box-pack: justify;
    display: -webkit-flex;
    display: -moz-flex;
    display: flex;
    -webkit-flex-direction: column;
    -moz-flex-direction: column;
    flex-direction: column;
    -webkit-align-items: flex-start;
    -moz-align-items: flex-start;
    align-items: flex-start;
    -webkit-justify-content: space-between;
    -moz-justify-content: space-between;
    justify-content: space-between;
}
</style>
