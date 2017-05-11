<template>
  <div id="audiobox" class="vux-1px">
    <audio :src="music" ref="musicplay" id="audio">
      您的浏览器不支持audio
    </audio>
    <div id="audioplayer" >
      <button id="pButton" @click="play" class="play" ></button>
      <div class="controls">
        <span class="current-time" ref="currentTime">0:00</span>
        <div class="slider" ref="slider" @click="clickslider" data-direction="horizontal" >
          <div class="progress" ref="progress">
            <div class="pin" ref="propin" id="progress-pin" data-method="rewind"></div>
          </div>
        </div>
        <span class="total-time" ref="totalTime">0:00</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Range } from 'vux'
export default {
  name: 'audiobox',
  props: {
    music:String
  },
  data () {
    return {
      musicplay:this.$refs.musicplay,
      duration:0,
      current:0,
      max:0,
      value:0,
      sdrag:false,
      tx:0,
      x:0
    }
  },
  components: {
    Range
  },
  mounted () {
    this.inits();
    var pin=document.getElementById("progress-pin");
    pin.addEventListener('touchend',this.moveend);
    pin.addEventListener('touchstart',this.selectmouse);
    pin.addEventListener('touchmove',this.movemouse);
  },
  methods:{
    moveend(e){
      this.$refs.musicplay.play();
      pButton.className = "pause";
      this.$refs.musicplay.addEventListener('timeupdate', this.updateProgress);

        this.sdrag = false;
        var cw=e.target.offsetLeft;
        var w=e.target.parentElement.parentElement.clientWidth;
        var audio=document.getElementById("audio");
        audio.currentTime=audio.duration*cw/w;
    },
    selectmouse(e){
       this.isdrag = true;
       this.tx = parseInt(document.getElementById("progress-pin").style.left+0);
       this.x = e.touches[0].pageX;
       return false;
    },
    movemouse(e){
      this.$refs.musicplay.pause();
      this.isdrag = true;
      var w=this.$refs.slider.offsetWidth;
      var n = this.tx + e.touches[0].pageX - this.x;
      if (this.isdrag&&n>0&&n<w){
       document.getElementById("progress-pin").style.left=n+"px";
       this.$refs.progress.style.width=n+'px';
       return false;
      }
    },
    inits(){
      var self=this;
      var timer=setInterval(function () {
        if (!isNaN(self.$refs.musicplay.duration)) {
          self.duration=self.$refs.musicplay.duration;
          self.$refs.totalTime.textContent = self.formatTime(self.duration);
          console.log(self.duration);
          clearTimeout(timer);
        }else{
        }
      },20);
      // var d=document.getElementsByClassName("vux-range-input")[0];
      // console.log(d.value);
      // d.onchange=this.onchange;
    },
    play() {
      this.$refs.musicplay.addEventListener('timeupdate', this.updateProgress);
      // start music
      if (this.$refs.musicplay.paused) {
        this.$refs.musicplay.play();
        // remove play, add pause
        pButton.className = "";
        pButton.className = "pause";
      } else { // pause music
        this.$refs.musicplay.pause();
        // remove pause, add play
        pButton.className = "";
        pButton.className = "play";
      }
    },
    clickslider(e){
      var cw=e.offsetX;
      var w=e.srcElement.clientWidth;
      this.$refs.musicplay.currentTime=this.$refs.musicplay.duration*cw/w;
    },
    updateProgress() {
      var current = this.$refs.musicplay.currentTime;
      var percent = current / this.$refs.musicplay.duration * 100;
      this.$refs.progress.style.width = percent + '%';
      var w=this.$refs.slider.offsetWidth;
      this.$refs.propin.style.left=percent*w/100+"px";
      this.$refs.currentTime.textContent = this.formatTime(current);
      // this.current=current;
      if(this.$refs.musicplay.currentTime == this.$refs.musicplay.duration){
        this.$refs.musicplay.pause();
        // remove pause, add play
        pButton.className = "";
        pButton.className = "play";
        this.$refs.musicplay.currentTime=0;
      }
    },
    formatTime(time) {
      var min = Math.floor(time / 60);
      var sec = Math.floor(time % 60);
      return min + ':' + (sec < 10 ? '0' + sec : sec);
    }
  }
}

</script>

<style lang="less">
audio{
  display: none;
}
@import '~vux/src/styles/1px.less';
#audiobox{
  width: 99%;
  height: 50px;
  margin: 10px auto 20px auto;
  #audioplayer{
    height: 100%;
    display: flex;
    align-items: center;
    #pButton{
      height:40px;
      width: 40px;
      border: none;
      background-size: 50% 50%;
      background-repeat: no-repeat;
      background-position: center;
      float:left;
      outline:none;
      position: relative;
      z-index: 10001;
    }
    .controls{
      font-family: 'Roboto', sans-serif;
      font-size: 16px;
      line-height: 18px;
      color: #55606E;
      display: flex;
      flex-grow: 1;
      justify-content: space-between;
      align-items: center;
      margin-left: .2rem;
      margin-right: 24px;
      span {
        cursor: default;
      }
      .slider {
        margin-left: 16px;
        margin-right: 16px;
        border-radius: 2px;
        height: 4px;
        flex-grow: 1;
        background-color: #D8D8D8;
        // cursor: pointer;
        position: relative;
        .progress {
          width: 0;
          height: 100%;
          background-color: #f2cd4b;
          border-radius: inherit;
          position: absolute;
          pointer-events: none;
          .pin {
            height: 14px;
            width: 14px;
            border-radius: 8px;
            background-color: #f2cd4b;
            position: absolute;
            pointer-events: all;
            box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.32);
            right: -8px;
            top: -6px;
          }
        }
      }
    }
  }
}
.play{background: url('images/play_audio.png') ;}
.pause{background: url('images/pause.png') ;}

</style>
