<template>
  <div id="index">
    功夫财经
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
    components: {
    },
    created () {
      console.log(0);
    },
    methods: {
      //获取数据
      fetchData(id){
        this.$http.get(HOST+'/api/articles/'+id+'.json', [])
        .then((data)=>{
          console.log(data);
        }, (err)=>{
          console.log(err);
        });
      },
    },
    filters: {
      formatDate:function (time) {
        var date = new Date(time);
        var nowDate = new Date();
        var c = nowDate-date;
        console.log(formatDate(date,'yyyy')-formatDate(nowDate,'yyyy'));
        if (c>31536000) {
          return formatDate(date, "yyyy年MM月dd日");
        }
        return formatDate(date, "MM月dd日");
      }
    }
  }
</script>

<style>
</style>
