<template>
    <div class="somi-player-container">
        <div class="somi-player-box" v-on:fullscreenchange="fullScreenChange"
             v-on:webkitfullscreenchange="fullScreenChange"
             v-on:mozfullscreenchange="fullScreenChange"
             v-on:MSFullscreenChange="fullScreenChange">
            <div class="somi-player-display" tabindex="1"
                 v-on:mousemove="sliderMove"
                 v-on:mouseleave="sliderLeave"
                 v-on:mouseup="sliderUp"
                 v-on:keydown="videoKeyDown">
                <div class="somi-event-div"
                     v-on:dblclick="fullScreen"
                     v-on:click="playVideo">
                    <svg :class="player.svgState.show"
                         class="" width="100%" height="100%" viewBox="-18 -19 70 70"
                        v-on:transitionend="transitionEnd"
                        v-on:transition="transitionEnd"
                        v-on:OTransition="transitionEnd"
                        v-on:MozTransition="transitionEnd">
                        <g class="time-back" transform="scale(0.03125 0.03125)">
                            <path d="M512 64c-141.384 0-269.376 57.32-362.032 149.978l-149.968-149.978v384h384l-143.532-143.522c69.496-69.492 165.492-112.478 271.532-112.478 212.068 0 384 171.924 384 384 0 114.696-50.292 217.636-130.018 288l84.666 96c106.302-93.816 173.352-231.076 173.352-384 0-282.77-229.23-512-512-512z"></path>
                        </g>
                        <g class="time-ahead" transform="scale(0.03125 0.03125)">
                            <path d="M0 576c0 152.924 67.048 290.184 173.35 384l84.666-96c-79.726-70.364-130.016-173.304-130.016-288 0-212.076 171.93-384 384-384 106.042 0 202.038 42.986 271.53 112.478l-143.53 143.522h384v-384l-149.97 149.978c-92.654-92.658-220.644-149.978-362.030-149.978-282.77 0-512 229.23-512 512z"></path>
                        </g>
                        <g class="video-pause" transform="scale(0.03125 0.03125)">
                            <path d="M192 128l640 384-640 384z"></path>
                        </g>
                        <g class="video-play" transform="scale(0.03125 0.03125)">
                            <path d="M128 128h320v768h-320zM576 128h320v768h-320z"></path>
                        </g>
                        <g class="volume-up" transform="scale(0.03125 0.03125)">
                            <path d="M1024 576h-192v192h-128v-192h-192v-128h192v-192h128v192h192v128z"></path>
                            <path d="M416.006 960c-8.328 0-16.512-3.25-22.634-9.374l-246.626-246.626h-114.746c-17.672 0-32-14.326-32-32v-320c0-17.672 14.328-32 32-32h114.746l246.626-246.628c9.154-9.154 22.916-11.89 34.874-6.936 11.958 4.952 19.754 16.622 19.754 29.564v832c0 12.944-7.796 24.612-19.754 29.564-3.958 1.64-8.118 2.436-12.24 2.436z"></path>
                        </g>
                        <g class="volume-down" transform="scale(0.03125 0.03125)">
                            <path d="M512 448h512v128h-512v-128z"></path>
                            <path d="M416.006 960c-8.328 0-16.512-3.25-22.634-9.374l-246.626-246.626h-114.746c-17.672 0-32-14.326-32-32v-320c0-17.672 14.328-32 32-32h114.746l246.626-246.628c9.154-9.154 22.916-11.89 34.874-6.936 11.958 4.952 19.754 16.622 19.754 29.564v832c0 12.944-7.796 24.612-19.754 29.564-3.958 1.64-8.118 2.436-12.24 2.436z"></path>
                        </g>
                    </svg>
                    <svg :class="player.svgState.loading" width="100%" height="100%" viewBox="-18 -19 70 70">
                        <g transform="scale(0.03125 0.03125)">
                            <path d="M384 128c0-70.692 57.308-128 128-128s128 57.308 128 128c0 70.692-57.308 128-128 128s-128-57.308-128-128zM790.994 512c0 0 0 0 0 0 0-57.993 47.013-105.006 105.006-105.006s105.006 47.013 105.006 105.006c0 0 0 0 0 0 0 57.993-47.013 105.006-105.006 105.006s-105.006-47.013-105.006-105.006zM688.424 783.53c0-52.526 42.58-95.106 95.106-95.106s95.106 42.58 95.106 95.106c0 52.526-42.58 95.106-95.106 95.106s-95.106-42.58-95.106-95.106zM425.862 896c0-47.573 38.565-86.138 86.138-86.138s86.138 38.565 86.138 86.138c0 47.573-38.565 86.138-86.138 86.138s-86.138-38.565-86.138-86.138zM162.454 783.53c0-43.088 34.93-78.018 78.018-78.018s78.018 34.93 78.018 78.018c0 43.088-34.93 78.018-78.018 78.018s-78.018-34.93-78.018-78.018zM57.338 512c0-39.026 31.636-70.662 70.662-70.662s70.662 31.636 70.662 70.662c0 39.026-31.636 70.662-70.662 70.662s-70.662-31.636-70.662-70.662zM176.472 240.472c0 0 0 0 0 0 0-35.346 28.654-64 64-64s64 28.654 64 64c0 0 0 0 0 0 0 35.346-28.654 64-64 64s-64-28.654-64-64zM899.464 240.472c0 64.024-51.906 115.934-115.936 115.934-64.024 0-115.936-51.91-115.936-115.934 0-64.032 51.912-115.934 115.936-115.934 64.030 0 115.936 51.902 115.936 115.934z">
                            </path>
                        </g>
                    </svg>
                </div>
                <div class="somi-controller" :class="{'somi-hide': player.controller.hide}">
                    <div class="somi-slider-bar"
                         v-on:mousedown="sliderDown"
                         v-on:mouseenter="sliderEnter">
                        <div class="somi-slider-played" :style="playedStyle"></div>
                        <div v-for="bufferedStyle in player.controller.sliderBar.bufferedStyles"
                             class="somi-slider-buffered" :style="bufferedStyle"></div>
                        <div class="somi-slider-preview-box" :style="getSliderHoverLeft">
                            <video class="somi-preview-video" :src="player.videoUrl" preload="auto"
                                   webkit-playsinline playsinline muted>
                            </video>
                        </div>
                        <span class="somi-slider-currentTime" :style="getSliderHoverLeft">
                            {{ getSliderCurrentTime }}
                        </span>
                    </div>
                    <button class="somi-main-button" v-on:click="playVideo">
                        <svg class="main-button-svg" height="100%" version="1.1" viewBox="0 0 36 36" width="100%" :class="{ 'button-play': player.paused,'button-paused': !player.paused }">
                            <path class="play-svg-fill" :d="getMainButtonSvgD" id="ytp-svg-477">
                            </path>
                        </svg>
                    </button>
                    <div class="somi-volume-container">
                        <button class="somi-volume" v-on:click="v_setMuted">
                            <svg class="icon-volume" viewBox="-20 -24 100 110"  fill="currentColor" width="100%" height="100%">
                                <path fill="#fff" :d="getVolumeSvgD">
                                </path>
                            </svg>
                        </button>
                        <div class="somi-volume-slider-container" v-on:mousedown.capture="volumeSliderDown">
                            <div class="somi-total-volume">
                                <div claSS="somi-current-volume" :style="player.controller.volume.slider.class"></div>
                            </div>
                        </div>
                    </div>
                    <div class="videoTime">
                        <span class="videoCurrentTime">{{ stringCurrentTime }}</span>
                        <span class="">/</span>
                        <span class="videoTotalTime">{{ stringDuration }}</span>
                    </div>
                    <button class="somi-fullScreen-button" v-on:click="fullScreen">
                        <svg class="svg-fullScreen" :class="{ fullScreen: player.fullScreen }" height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
                            <g class="ytp-fullscreen-button-corner-0">
                                <path class="ytp-svg-fill" d="m 10,16 2,0 0,-4 4,0 0,-2 L 10,10 l 0,6 0,0 z"
                                      id="ytp-svg-19">
                                </path>
                            </g>
                            <g class="ytp-fullscreen-button-corner-1">
                                <path class="ytp-svg-fill" d="m 20,10 0,2 4,0 0,4 2,0 L 26,10 l -6,0 0,0 z"
                                      id="ytp-svg-20">

                                </path>
                            </g>
                            <g class="ytp-fullscreen-button-corner-2">
                                <path class="ytp-svg-fill" d="m 24,24 -4,0 0,2 L 26,26 l 0,-6 -2,0 0,4 0,0 z"
                                      id="ytp-svg-21">
                                </path>
                            </g>
                            <g class="ytp-fullscreen-button-corner-3">
                                <path class="ytp-svg-fill" d="M 12,20 10,20 10,26 l 6,0 0,-2 -4,0 0,-4 0,0 z"
                                      id="ytp-svg-22">
                                </path>
                            </g>
                        </svg>
                    </button>
                </div>
            </div>
            <video class="somi-main-video" :src="player.videoUrl"
                    v-on:loadstart="v_loadstart"
                    v-on:loadedmetadata="v_loadedmetadata"
                    v-on:waiting="v_waiting"
                    v-on:canplay="v_canplay"
                    v-on:play="v_play"
                    v-on:pause="v_pause"
                    v-on:timeupdate="v_timeupdate"
                    v-on:progress="v_progress"
                    v-on:volumechange="v_volumechange"
                    v-on:error="v_error">
                <source type="video/mp4" :scr="player.videoUrl">
            </video>
        </div>
    </div>
</template>
<script type="text/babel">
    import { shape,render,play } from 'wilderness'
    import TWEEN from 'tween.js'
    export default {
        name: 'somiVideoPlayer',
        data() {
            return {
                player: {
                    dom: null,
                    videoUrl: "http://vjs.zencdn.net/v/oceans.mp4",
                    currentTime: "",
                    videoTotalTime: "",
                    paused: true,
                    fullScreen: false,
                    playerKeyDown: false,
                    svgState: {
                        show: "",
                        loading: ""
                    },
                    controller : {
                        hide: true,
                        timeOutId:0,
                        sliderBar: {
                            playedPosition: 0,
                            playedPercentage: 0,
                            bufferedStyles: [],
                            hoverPosition: 0,
                            focus: false,
                            previewVideo: null,
                            position: {}
                        },
                        mainButton: {
                            play: {
                                type: "path",
                                points: {
                                    "1x": 12,
                                    "1y": 26,
                                    "2x": 18.5,
                                    "2y": 22,
                                    "3x": 18.5,
                                    "3y": 14,
                                    "4x": 12,
                                    "4y": 10,
                                    "5x": 18.5,
                                    "5y": 22,
                                    "6x": 25,
                                    "6y": 18,
                                    "7x": 25,
                                    "7y": 18,
                                    "8x": 18.5,
                                    "8y": 14
                                },
                                fill: "#fff"
                            },
                            paused: {
                                type: "path",
                                points: {
                                    "1x": 12,
                                    "1y": 26,
                                    "2x": 16,
                                    "2y": 26,
                                    "3x": 16,
                                    "3y": 10,
                                    "4x": 12,
                                    "4y": 10,
                                    "5x": 21,
                                    "5y": 26,
                                    "6x": 25,
                                    "6y": 26,
                                    "7x": 25,
                                    "7y": 10,
                                    "8x": 21,
                                    "8y": 10
                                },
                                fill: "#fff"
                            },
                            transitionPoint: {
                                "1x": 12,
                                "1y": 26,
                                "2x": 18.5,
                                "2y": 22,
                                "3x": 18.5,
                                "3y": 14,
                                "4x": 12,
                                "4y": 10,
                                "5x": 18.5,
                                "5y": 22,
                                "6x": 25,
                                "6y": 18,
                                "7x": 25,
                                "7y": 18,
                                "8x": 18.5,
                                "8y": 14
                            }
                        },
                        videoTime: {
                            currentTime: 0,
                            duration: 0
                        },
                        fullScreenButton: {
                        },
                        volume: {
                            slider: {
                                class: {
                                    width: "100%"
                                },
                                focus: false,
                                position: {}
                            },
                            svg: {
                                points: {
                                    'Max': {
                                        'M1x': 41,
                                        'M1y': 6,
                                        'M2x': 41,
                                        'M2y': 58,
                                        'M3x': 3,
                                        'M3y': 13,
                                        'M4x': 7,
                                        'M4y': 3,
                                        'stroke': 10
                                    },
                                    'Medium': {
                                        'M1x': 37,
                                        'M1y': 18,
                                        'M2x': 37,
                                        'M2y': 46,
                                        'M3x': 3,
                                        'M3y': 13,
                                        'M4x': 7,
                                        'M4y': 3,
                                        'stroke': 10
                                    },
                                    'Min': {
                                        'M1x': 37,
                                        'M1y': 18,
                                        'M2x': 37,
                                        'M2y': 46,
                                        'M3x': 55,
                                        'M3y': 51,
                                        'M4x': 48,
                                        'M4y': 55,
                                        'stroke': 5
                                    }
                                },
                                transitionPoint: {
                                    'M1x': 41,
                                    'M1y': 6,
                                    'M2x': 41,
                                    'M2y': 58,
                                    'M3x': 3,
                                    'M3y': 13,
                                    'M4x': 7,
                                    'M4y': 3,
                                    'stroke': 10
                                }
                            }
                        }
                    }
                }
            }
        },
        computed: {
            playedStyle: function() {
                return {
                    width: this.player.controller.sliderBar.playedPosition + "px"
                }
            },
            getMainButtonSvgD: function() {
                let point = this.player.controller.mainButton.transitionPoint;
                return "M "
                        + point['1x'] + " "
                        + point['1y'] + " "
                        + point['2x'] + " "
                        + point['2y'] + " "
                        + point['3x'] + " "
                        + point['3y'] + " "
                        + point['4x'] + " "
                        + point['4y'] + " z"
                        + "M "
                        + point['5x'] + " "
                        + point['5y'] + " "
                        + point['6x'] + " "
                        + point['6y'] + " "
                        + point['7x'] + " "
                        + point['7y'] + " "
                        + point['8x'] + " "
                        + point['8y'] + " z"
            },
            getVolumeSvgD: function() {
                let point = this.player.controller.volume.svg.transitionPoint;
                return "M 0 22 L 12 22 L 32 5 L 32 59 L 12 42 L 0 42 M 36,22 A " + point.stroke + ",10 0 0 1 36,42 L 36,38 M"
                        + point.M1x + "," + point.M1y
                        + " A 11,13 0 0 1 "
                        + point.M2x + "," + point.M2y
                        + " L 37,46 A 11,13 0 0 0 37,18"
                        +"M3,13 L7,3 L "+point.M3x+","+point.M3y
                        +" L "+point.M4x+","+point.M4y;
            },
            stringCurrentTime() {
                return this.toHHMMSS(this.player.controller.videoTime.currentTime.toString())
            },
            stringDuration() {
                return this.toHHMMSS(this.player.controller.videoTime.duration.toString())
            },
            getSliderHoverLeft() {
                if(this.player.controller.sliderBar.focus) {
                    return {
                        left: this.player.controller.sliderBar.hoverPosition + "px",
                        visibility: "visible"
                    }
                }
                else {
                    return {
                        left: this.player.controller.sliderBar.hoverPosition + "px"
                    }
                }
            },
            getSliderCurrentTime() {
                let percentage = 0;
                if(document.querySelector(".somi-slider-bar")) {
                    percentage = this.player.controller.sliderBar.hoverPosition/document.querySelector(".somi-slider-bar").offsetWidth;
                }
                return this.toHHMMSS(percentage*this.player.controller.videoTime.duration);
            }
        },
        mounted() {
            this.player.controller.sliderBar.position =
                    this.getElementPosition(document.querySelector(".somi-controller"));
            this.player.controller.volume.slider.position =
                    this.getElementPosition(document.querySelector(".somi-total-volume"));
        },
        methods: {
            v_loadstart(e) {
                this.player.svgState.loading = "loading show";
            },
            v_loadedmetadata(e) {
                let video = e.srcElement || e.target;
                this.player.controller.videoTime.duration = video.duration;
                video.play();
            },
            v_waiting() {
                this.player.svgState.loading = "loading show";
            },
            v_canplay(e) {
                this.player.svgState.loading = "";
            },
            v_play(e) {
                let video = e.srcElement || e.target;
                let _this = this;
                this.player.paused = video.paused;
                let tween = new TWEEN.Tween(_this.player.controller.mainButton.transitionPoint)
                        .to(_this.player.controller.mainButton.paused.points,150)
                        .start();
                requestAnimationFrame(this.svgAnimate);
                clearTimeout(_this.player.controller.timeOutId);
                _this.player.controller.timeOutId = setTimeout(function() {
                    if(!video.paused) {
                        _this.player.controller.hide = true;
                    }
                },2000);
            },
            v_pause(e) {
                let video = e.srcElement || e.target;
                this.player.paused = video.paused;
                let _this = this;
                let tween = new TWEEN.Tween(_this.player.controller.mainButton.transitionPoint)
                        .to(_this.player.controller.mainButton.play.points,150)
                        .start();
                requestAnimationFrame(this.svgAnimate);
                _this.player.controller.hide = false;
            },
            v_timeupdate(e) {
                let video = e.srcElement || e.target;
                this.player.controller.videoTime.currentTime = video.currentTime;
                this.player.controller.sliderBar.percentage = video.currentTime / video.duration;
                this.player.controller.sliderBar.playedPosition = this.player.controller.sliderBar.percentage
                        * document.querySelector(".somi-slider-bar").offsetWidth;
            },
            v_progress(e) {
                let video = e.srcElement || e.target;
                let bufferedarr = [];
                for(let i=0; i<video.buffered.length;i++) {
                    bufferedarr.push({
                        left: 100*video.buffered.start(i)/video.duration + "%",
                        right: 100*(1-video.buffered.end(i)/video.duration) + "%"
                    });
                }
                this.player.controller.sliderBar.bufferedStyles = bufferedarr;
            },
            v_error(e) {
                let video = e.srcElement || e.target;
            },
            v_volumechange(e) {
                let video = e.srcElement || e.target;
                let _tween = null;
                let _this = this;
                if(video.muted) {
                    _tween = new TWEEN.Tween(this.player.controller.volume.svg.transitionPoint)
                            .to(this.player.controller.volume.svg.points.Min,100);
                    this.player.controller.volume.slider.class = {
                        width: "0%"
                    };
                }
                else {
                    this.player.controller.volume.slider.class = {
                        width: 100 * video.volume + "%"
                    };
                    if(video.volume >= .5) {
                        _tween = new TWEEN.Tween(_this.player.controller.volume.svg.transitionPoint)
                                .to(_this.player.controller.volume.svg.points.Max,100)
                    }
                    if(.5 > video.volume >= .1) {
                        _tween = new TWEEN.Tween(_this.player.controller.volume.svg.transitionPoint)
                                .to(_this.player.controller.volume.svg.points.Medium,100);
                    }
                    if(video.volume <= .01) {
                        _tween = new TWEEN.Tween(_this.player.controller.volume.svg.transitionPoint)
                                .to(_this.player.controller.volume.svg.points.Min,100);
                    }
                }
                _tween.start();
                requestAnimationFrame(this.svgAnimate);
            },
            v_setMuted() {
                document.querySelector(".somi-main-video").muted = !document.querySelector(".somi-main-video").muted
            },
            playVideo() {
                let video = document.querySelector(".somi-main-video");
                if(video.paused) {
                    video.play();
                    this.player.svgState.show = "play show";
                }
                else {
                    video.pause();
                    this.player.svgState.show = "pause show";
                }
            },
            fullScreen(e) {
                let el = document.querySelector(".somi-player-box");
                let fullscreenEnabled = document.fullscreenEnabled ||
                        document.webkitFullscreenEnabled ||
                        document.mozFullScreenEnabled ||
                        document.msFullscreenEnabled;
                let rfs = el.requestFullscreen || el.webkitRequestFullscreen ||
                        el.mozRequestFullScreen || el.msRequestFullscreen;
                let efs = document.exitFullscreen || document.webkitExitFullscreen ||
                        document.mozCancelFullScreen || document.msExitFullscreen;
                if (fullscreenEnabled) {
                    if(this.player.fullScreen) {
                        efs.call(document);
                    }
                    else {
                        rfs.call(el);
                    }
                }
            },
            sliderEnter(e) {
                this.player.controller.sliderBar.previewVideo = document.querySelector(".somi-preview-video");
            },
            sliderLeave(e) {
                if(this.player.controller.sliderBar.focus) {
                    let video  = document.querySelector(".somi-main-video");
                    this.player.controller.sliderBar.focus = false;
                    let position = e.clientX - document.querySelector(".somi-player-container").offsetLeft-
                            document.querySelector(".somi-controller").offsetLeft;
                    this.player.controller.sliderBar.hoverPosition = position;
                    video.currentTime = this.player.controller.sliderBar.playedPercentage*video.duration;
                    video.play();
                }
                if(this.player.controller.volume.slider.focus) {
                    this.player.controller.volume.slider.focus = false;
                }
            },
            sliderMove(e) {
                let _this = this;
                let video = document.querySelector(".somi-main-video");
                let sliderBar = document.querySelector(".somi-slider-bar");
                let sliderPosition = e.clientX - this.player.controller.sliderBar.position.x;
                _this.player.controller.hide = false;
                this.player.controller.sliderBar.hoverPosition = sliderPosition;
                if (this.player.controller.sliderBar.focus) {
                    this.player.controller.sliderBar.playedPosition = sliderPosition;
                    this.player.controller.sliderBar.playedPercentage =
                            sliderPosition / sliderBar.offsetWidth;
                    this.player.controller.videoTime.currentTime = this.player.controller.sliderBar.playedPercentage * video.duration;
                    video.currentTime = this.player.controller.sliderBar.playedPercentage * video.duration;
                }
                if(this.player.controller.volume.slider.focus) {
                    let VolumeSliderPosition = e.clientX -this.player.controller.volume.slider.position.x;
                    if(0<=VolumeSliderPosition&&VolumeSliderPosition<=document.querySelector(".somi-total-volume").offsetWidth) {
                        video.volume = VolumeSliderPosition/document.querySelector(".somi-total-volume").offsetWidth;
                    }
                }
                if (this.player.controller.sliderBar.previewVideo) {
                    this.throttle(function () {
                        _this.player.controller.sliderBar.previewVideo.currentTime =
                                sliderPosition / sliderBar.offsetWidth * video.duration;
                    }, 100)();
                }
                clearTimeout(_this.player.controller.timeOutId);
                _this.player.controller.timeOutId = setTimeout(function() {
                    if(!video.paused) {
                        _this.player.controller.hide = true;
                    }
                },2000);
            },
            sliderDown(e) {
                let video  = document.querySelector(".somi-main-video");
                let sliderBar = document.querySelector(".somi-slider-bar");
                let position = e.clientX - this.player.controller.sliderBar.position.x;
                this.player.controller.sliderBar.hoverPosition = position;
                if(!video.paused) {
                    video.pause();
                }
                this.player.controller.sliderBar.focus = true;
                this.player.controller.sliderBar.playedPercentage =
                        position/sliderBar.offsetWidth;
                video.currentTime = this.player.controller.sliderBar.playedPercentage * video.duration;
            },
            sliderUp(e) {
                if(this.player.controller.sliderBar.focus) {
                    let video = document.querySelector(".somi-main-video");
                    this.player.controller.sliderBar.focus = false;
                    video.play();
                }
                if(this.player.controller.volume.slider.focus) {
                    this.player.controller.volume.slider.focus = false;
                }
            },
            volumeSliderDown(e) {
                let video = document.querySelector(".somi-main-video");
                video.muted = false;
                this.player.controller.volume.slider.focus = true;
                let position = e.clientX-this.player.controller.volume.slider.position.x;
                video.volume = position/document.querySelector(".somi-total-volume").clientWidth;
            },
            transitionEnd() {
                this.player.svgState.show = "";
            },
            videoKeyDown(e) {
                if(e.preventDefault) {
                    e.preventDefault();
                }
                if(this.playerKeyDown) {
                    return;
                }
                else {
                    this.playerKeyDown = true;
                }
                let video = document.querySelector(".somi-main-video");
                switch (e.keyCode) {
                    case 37: //left
//                        this.player.svgState.svgTimeBack.show = false;
                        if (video.currentTime >= 5) {
                            video.currentTime -= 5;
                        } else {
                            video.currentTime = 0;
                        }
                        this.player.svgState.show = "back show";
                        break;
                    case 38: //up
                        if (video.volume <= .9) {
                            video.volume += .1;
                        } else {
                            video.volume = 1;
                        }
                        this.player.svgState.show = "up show";
                        break;
                    case 39: //right
                        if (video.currentTime <= video.duration - 5) {
                            video.currentTime += 5;
                        }else {
                            video.currentTime = video.duration;
                        }
                        this.player.svgState.show = "ahead show";
                        break;
                    case 40: //down
                        if (video.volume > .1) {
                            video.volume -= .1;
                        }else {
                            video.volume = 0;
                        }
                        this.player.svgState.show = "down show";
                        break;
                    case 32:
                        if (video.paused) {
                            video.play();
                            this.player.svgState.show = "play show";
                        }
                        else {
                            video.pause();
                            this.player.svgState.show = "pause show";
                        }
                }
                this.playerKeyDown = false;
            },
            fullScreenChange(e) {
                if(document.fullscreenElement ||
                        document.webkitFullscreenElement ||
                        document.mozFullScreenElement ||
                        document.msFullscreenElement) {
                    this.player.fullScreen = true;
                }else {
                    this.player.fullScreen = false;
                }
            },
            toHHMMSS (_string) {
                var sec_num = parseInt(_string, 10); // don't forget the second param
                var hours = Math.floor(sec_num / 3600);
                var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
                var seconds = sec_num - (hours * 3600) - (minutes * 60);
                if (hours) {
                    if (hours < 10) {
                        hours = "0" + hours + ":";
                    }
                    else {
                        hours = hours + ":";
                    }
                }
                else {
                    hours = "";
                }
                if (minutes < 10) {
                    minutes = "0" + minutes + ":";
                }
                else {
                    minutes = minutes + ":";
                }
                if (seconds < 10) {
                    seconds = "0" + seconds;
                }
                return hours + minutes + seconds;
            },
            getElementPosition(el) {
                var target = el;
                var position = {
                    x :target.offsetLeft,
                    y : target.offsetTop
                };
                var target = target.offsetParent;
                while(target) {
                    position.x += target.offsetLeft;
                    position.y += target.offsetTop;
                    target = target.offsetParent;
                }
                return position;
            },
            throttle(fn,delay) {
                var timeID = null;
                return function() {
                    var context = this,args = arguments;
                    clearTimeout(timeID);
                    timeID = setTimeout(function(){
                       fn.apply(context,args);
                    },delay);
                }
            },
            svgAnimate() {
                requestAnimationFrame(this.svgAnimate);
                TWEEN.update();
            }
        }
    }
</script>
<style lang="scss" scoped>
    $main-color: #41b883;
    $buffered-color: #fff;
    $slider-bar-color: #687f75;
    .somi-player-container {
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 60%;
        font-size: 20px;
        button {
            font-size: inherit;
        }
        button:focus {
            outline: 0;
        }
        button {
            display: inline-block;
            background-color: transparent;
            border: none;
        }
        .somi-player-box {
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: #000;
            top: 0;
            left: 0;
            font-size: inherit;
            video {
                width: 100%;
                height: 100%;
            }
            .somi-player-display {
                position: absolute;
                width: 100%;
                height: 100%;
                background-color: transparent;
                top: 0;
                left: 0;
                z-index: 1;
                overflow: hidden;
                &:focus {
                    outline: none;
                 }
                 .somi-event-div {
                     position: absolute;
                     height: 100%;
                     width: 100%;
                     top:0;
                     left:0;
                     svg {
                         width: 4em;
                         height: 4em;
                         background-color: #000;
                         position: absolute;
                         left: 50%;
                         top: 50%;
                         transform: translate(-50%, -50%);
                         border-radius: 100%;
                         opacity: 1;
                         visibility: hidden;
                        g{
                            fill: #fff;
                            visibility: hidden;
                        }
                        &.show {
                             width: 5em;
                             height: 5em;
                             visibility: visible;
                             opacity: 0;
                             transform: translate(-50%, -50%);
                             transition: .3s;
                         }
                         &.back {
                            g.time-back{
                                visibility: visible;
                            }
                          }
                        &.ahead {
                            g.time-ahead{
                                visibility: visible;
                            }
                         }
                        &.play {
                            g.video-play {
                                visibility: visible;
                            }
                         }
                        &.pause {
                            g.video-pause {
                                visibility: visible;
                            }
                         }
                        &.up {
                            g.volume-up {
                                visibility: visible;
                            }
                         }
                        &.down {
                            g.volume-down {
                                visibility: visible;
                            }
                         }
                        &.loading {
                             opacity: .7;
                            animation: video-loading 1s ease infinite;
                            g {
                                visibility: visible;
                            }
                            @keyframes video-loading {
                                0% {
                                    transform: translate(-50%, -50%) rotateZ(360deg);
                                }
                                60% {
                                    transform: translate(-50%, -50%) rotateZ(300deg);
                                }
                                100% {
                                    transform: translate(-50%, -50%) rotateZ(0deg);
                                }
                            }
                         }
                     }
                 }
                .somi-controller {
                    position: absolute;
                    bottom: 0;
                    height: 4em;
                    left: 1em;
                    right: 1em;
                    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==);
                    background-repeat: repeat-x;
                    font-size: inherit;
                    z-index: 2;
                    opacity: 1;
                    transition: all .8s;
                    &.somi-hide {
                        bottom: -100%;
                        opacity: 0;
                     }
                    &:after {
                        clear: both;
                        content: " "
                     }
                    /*opacity: .7;*/
                    .videoTime {
                        float: left;
                        left: 4em;
                        height: 100%;
                        width: auto;
                        color: $main-color;
                        padding: 0 1em;
                        span {
                             height: 100%;
                            display: inline-block;
                            line-height: 4em;
                            letter-spacing: .1em;
                        }
                    }
                    .somi-main-button {
                        cursor: pointer;
                        height: 100%;
                        width: 4em;
                        float: left;
                        .main-button-svg {
                            path{
                                fill: $main-color;
                                visibility: visible;
                            }
                        }
                    }
                    .somi-volume-container {
                        height: 100%;
                        width: auto;
                        display: inline-block;
                        float: left;
                        position: relative;
                        cursor: pointer;
                        padding: 0 1em;
                        .somi-volume {
                            height: 100%;
                            width: 4em;
                            float: left;
                            cursor: pointer;
                            .icon-volume {
                                height: 100%;
                                width: 100%;
                                path {
                                    transition: 1s;
                                    fill: $main-color;
                                    visibility: visible;
                                }
                            }
                        }
                        .somi-volume-slider-container {
                            height: 100%;
                            width: 0;
                            display: inline-block;
                            position: relative;
                            transition: .5s;
                            .somi-total-volume {
                                height: .4em;
                                width: 100%;
                                position: absolute;
                                top: 50%;
                                background-color: $slider-bar-color;
                                transform: translateY(-50%);
                                .somi-current-volume {
                                    height: 100%;
                                    position: absolute;
                                    background-color: $main-color;
                                    left: 0;
                                    top: 0;
                                }
                            }
                        }
                        &:hover {
                            .somi-volume-slider-container {
                                width: 9em;
                            }
                         }
                    }
                    .somi-fullScreen-button {
                        height: 100%;
                        width: 4em;
                        float: right;
                        cursor: pointer;
                        .svg-fullScreen {
                            g {
                                transition: .3s;
                                transform-origin: center;
                                path {
                                    fill: $main-color;
                                    transition: .3s;
                                }
                            }
                            &.fullScreen {
                                g {
                                    transform: rotateZ(180deg);
                                }
                            }
                        }
                    }
                    .somi-slider-bar {
                        width: 100%;
                        height: .4em;
                        background-color: $slider-bar-color;
                        position: absolute;
                        top: -.4em;
                        border-radius: 1em;
                        transition: .1s;
                        cursor: pointer;
                        .somi-slider-played {
                            background-color: $main-color;
                            height: 100%;
                            position: absolute;
                            left: 0;
                            top: 0;
                            z-index: 2;
                        }
                        .somi-slider-buffered {
                            position: absolute;
                            height: 100%;
                            left: 0;
                            right: 0;
                            background-color: $buffered-color;
                        }
                        .somi-slider-currentTime {
                            height: 1.5em;
                            line-height: 1.5em;
                            width: auto;
                            padding: 0 .5em;
                            color: $main-color;
                            top: -2em;
                            background-color: #000;
                            position: absolute;
                            visibility: hidden;
                            border:.1em solid $main-color;
                            border-radius: .3em;
                            transform: translateX(-50%);
                        }
                        .somi-slider-preview-box {
                            position: absolute;
                            width: 10em;
                            height: 6em;
                            background-color: #000;
                            border: .1em $main-color solid;
                            border-radius:.5em;
                            top: -6.5em;
                            visibility: hidden;
                            transform: translateX(-50%);
                            .somi-preview-video {
                                height: 100%;
                                width: 100%;
                            }
                        }
                    }
                    .somi-slider-bar:hover {
                        height: .7em;
                        top: -.7em;
                        .somi-slider-preview-box {
                            visibility: visible;
                        }
                        .somi-slider-played {
                            &:after {
                                height: 1.5em;
                                width: 1.5em;
                                right: -.8em;
                                 content: " ";
                                 background-color: $main-color;
                                 position: absolute;
                                 top: 50%;
                                 transform: translateY(-50%);
                                 border-radius: 100%;
                             }
                        }
                        .somi-slider-currentTime {
                            visibility: visible;
                        }
                    }
                }
            }
        }
    }
</style>
