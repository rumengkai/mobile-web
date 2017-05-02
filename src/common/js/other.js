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
},
