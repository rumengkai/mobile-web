<template>
  <div id="failed">
    <img src="./images/failed.png" alt="">
    <p>{{msg}}</p>
  </div>
</template>

<script>
  export default {
    name: 'failed',
    data () {
      return {

      }
    },
    props: {
      msg:String
    },
    components: {

    },
    created () {
    },

    methods: {
    }
  }
</script>

<style lang="less">
#failed{
  overflow: hidden;
  height: 100%;
  background-color: #fff;
  img{
    display: block;
    width: 100%;
    margin-top: 20%;
    height: 60%;
  }
  p{
    color: #ffbf00;
    font-size: 24px;
    text-align: center;
  }
}

</style>
