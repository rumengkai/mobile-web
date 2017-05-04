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
    
  }
}
