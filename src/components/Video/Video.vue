<template>
  <div id="vediobox">
    <video  :src="video" :poster="poster" ref="vdo">
      您的浏览器不支持video
    </video>
    <div class="vdo-control" @click="play" >
      <span v-if="showplay" class="vdo-play"></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'vediobox',
    props: {
      video:String,
      poster:String
    },
    data () {
      return {
        showplay:true,
      }
    },
    components: {

    },
    methods:{
      play(){
        if(this.$refs.vdo.paused){
          this.$refs.vdo.play();
          this.showplay=false;
        }else{
          this.$refs.vdo.pause();
          this.showplay=true;
        }
      }
    }
  }
</script>

<style lang="less">
#vediobox{
  position: relative;
  height: auto;
  width: 100%;
}
#vediobox .vdo-control{
  top: 50%;
  margin-top: -1.25rem;
  position: absolute;
  width: 100%;
  height: 2.5rem;
  .vdo-play{
    border-radius: .5rem;
    text-align: center;
    width: 1rem;
    height: 1rem;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -.5rem;
    margin-top: -.5rem;
    /*background-color: #f0f;*/
    background: url(../../m/detail/images/play.png);
    background-size: 1rem 1rem;
  }
}
video{
  width: 100%;
}
</style>
