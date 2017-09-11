export default{
  ajaxPost:function (url,data,success,error) {
    $.ajax({
      url:url,
      type:"POST",
      data:data,
      success: function (data) {
        success(data);
      },
      error:function (err) {
        error(err);
      }
    });
  },
  ajaxGet:function () {

  },
  httpPost:function (Vue,url,data,success,error) {
    //将vue-resouses设置为formdata
    Vue.http.options.emulateJSON = true;
    Vue.http.options.headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };
    Vue.http.interceptors.push(function(request, next) {
      request.headers.set('from', config()['from']);
      request.headers.set('gid', config()['gid']);
      request.headers.set('token', config()['token']);
      request.headers.set('version', VERSION);
      next();
    });
    Vue.http.post(url, data)
    .then((res)=>{return res.bodyText;})
    .then((res)=>{
      var res=JSON.parse(res);
      success(res);
    },(err)=>{
      error(err)
    });
  },
  httpGet:function (Vue,url,params,success,error) {
    //将vue-resouses设置为formdata
    Vue.http.options.emulateJSON = true;
    Vue.http.options.headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };
    Vue.http.interceptors.push(function(request, next) {
      // modify headers
      request.headers.set('from', config()['from']);
      request.headers.set('gid', config()['gid']);
      request.headers.set('token', config()['token']);
      request.headers.set('version', VERSION);
      next();
    });
    Vue.http.get(url, {params:params})
    .then((res)=>{return res.bodyText;})
    .then((res)=>{
      var res=JSON.parse(res);
      success(res);
    },(err)=>{
      error(err)
    });
  }
}
