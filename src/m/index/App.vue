<template>
  <div id="index">
    功夫财经
    <a id="btnOpenApp">打开APP</a>
  </div>
</template>

<script>
import 'common/css/reset.css';
  export default {
    name: 'index',
    components: {
    },
    data () {
      return {
        showContent:false,
      }
    },
    components: {},
    mounted () {
      new Mlink({
        mlink: "https://a.mlinks.cc/AK8f",
        // mlink: "https://a.mlinks.cc/AAB7",
        button: document.querySelector('a#btnOpenApp'),
        autoLaunchApp : false,
      });
    },
    methods: {

    }
  }
</script>
<style>
</style>
