export default{
  getUrlKey:function (name) {
    if (name=="type") {
      var data = decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href)||['',''])[1].replace(/\+/g,'%20'))||null
      return data;
    }
    if (name=="code") {
      var data = decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href)||['',''])[1].replace(/\+/g,'%20'))||null
      return data;
    }
    if (name=="id") {
      var data = decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href)||['',''])[1].replace(/\+/g,'%20'))||/\/\d{1,8}/.exec(location.href)[0].replace("/","")||null
      return data;
    }
  }
}
