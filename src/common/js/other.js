//此文件用于记录js代码，并不被引用
getAjax(){
  $.ajax({
    url:HOST+'/api/channels.json',
    headers: {
      Accept: "application/json; charset=utf-8",
      version:0.1,
      from:2,
      gid:"1047500131",
      token:"9a5795f406b94f3192a61d683327c550"
    },
    type: "post",
    success: function (data) {
    }
  });
}



//ajax
// AjaxServer.ajaxPost(
//   HOST+'/api/comments/add',
//   {
//     from:3,
//     gid:localStorage.getItem("gid"),
//     token:localStorage.getItem("token"),
//     // gid:"1047500131",
//     // token:"9a5795f406b94f3192a61d683327c550",
//     item:self.id,
//     content:self.textdata,
//     origin_comment:""
//   },
//   (data)=>{
//     self.sub=true;
//     if (data.status!=0) {
//       console.log('err');
//       self.$vux.toast.show({
//        text: data.error,
//        type:'warn',
//        width:'10em'
//       })
//     }else{
//       self.$vux.toast.show({
//         text: '评论成功',
//       }),
//       setTimeout(()=>{
//         window.history.go(-1);
//       },3000)
//     }
//   },
//   (err)=>{
//     self.sub=true;
//     console.log(err);
//     self.$vux.toast.show({
//      text: '评论失败，请稍后重试',
//      type:'warn',
//     })
//   }
// );
