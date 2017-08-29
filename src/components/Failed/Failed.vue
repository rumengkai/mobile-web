<template>
  <div id="failed">
    <img src="./images/pay_result_failure.png" alt="">
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
  // background-color: #fff;
  img{
    margin: 30% auto;
    display: block;
    width: 332px;
    height: 258px;
  }
  p{
    color: #ca915c;
    font-size: 24px;
    text-align: center;
  }
}

</style>
