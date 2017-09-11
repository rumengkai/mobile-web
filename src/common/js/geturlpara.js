export default{
  getUrlKey:function (name) {
    // var data = decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href)||['',''])[1].replace(/\+/g,'%20'))||/\/\d{1,8}/.exec(location.href)[0].replace("/","")||null
    var data = decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href)||['',''])[1].replace(/\+/g,'%20'))||null
    return data;
  }
}
