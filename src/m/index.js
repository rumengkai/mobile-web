//url转换处理
(function () {
  var patt1=new RegExp(".com/m/.*");
  var parase=patt1.exec(location.href);
  if (parase) {
    var value=parase[0].replace(/.com\/m\//g,"");
    var arr=value.split("/");
    var name=arr[arr.length-2];
    var id=arr[arr.length-1];
    switch (name) {
      case "article":name="detail"
      break;
      default:
      name=name;
    }
    var url=(function () {
      if (arr.length==2) {
        return "/m/"+name+".html?id="+id;
      }else if(arr.length>2){
        var p="";
        for (var i = 0; i < arr.length-2; i++) {
          p+=arr[i]+"/";
        }
        return "/m/"+p+name+".html?id="+id;
      }else{
        return "/m/index.html"
      }
    })()
    window.location.href=url;
  }
})()
