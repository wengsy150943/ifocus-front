import request from "./request.js"


export function apiGetUserMoney(that,id) {
  request({
    url: "http://47.94.173.35/ifocus-back/control.php",
    data : {'argc':'info','id':id,'res':'user_money','target':'user'}
  }).then(function(res){that.setData({money:res})});
}

export function apiGetUserSlogan(that,id) {
  request({
    url: "http://47.94.173.35/ifocus-back/control.php",
    data : {'argc':'info','id':id,'res':'slogan','target':'user'}
  }).then(function(res){that.setData({slogan:res})});
}

export function apiGetUserNickname(that,id) {
  request({
    url: "http://47.94.173.35/ifocus-back/control.php",
    data : {'argc':'info','id':id,'res':'nickname','target':'user'}
  }).then(function(res){that.setData({nickname:res})});
}

export function apiGetUserLog(that,id) {
  request({
    url: "http://47.94.173.35/ifocus-back/control.php",
    data : {'argc':'log','id':id,'target':'user'}
  }).then(function(res){console.log(res),that.setData({log:res})});
}

export function apiGetRoomList(that) {
  request({
    url: "http://47.94.173.35/ifocus-back/control.php",
    data : {'target':'room_list'}
  }).then(function(res){that.setData({list:res})});
}

export function apiGetTodayRank(that) {
  request({
    url: "http://47.94.173.35/ifocus-back/control.php",
    data : {'target':'today_rank'}
  }).then(function(res){that.setData({today_rank:array2json(res)})});
}

export function apiGetTotalRank(that) {
  request({
    url: "http://47.94.173.35/ifocus-back/control.php",
    data : {'target':'total_rank'}
  }).then(function(res){that.setData({total_rank:array2json(res)})});
}

export function apiCheckAlive(that,id) {
  request({
    url: "http://47.94.173.35/ifocus-back/control.php",
    data : {'argc':'check_alive','id':id,'target':'user'}
  }).then(function(res){console.log(res),that.setData({alive:(res=="True")})});
}

export function apiGetMateList(that,room_id) {
  request({
    url: "http://47.94.173.35/ifocus-back/control.php",
    data : {'argc':'userinfo','room_id':room_id,'target':'room'}
  }).then(function(res){that.setData({list:array2json(res)})});
}
function array2json(res){
  var list = [];
  for(var x in res){
    var json_res = JSON.parse(res[x]);
    var temp = [];
    for(var i in json_res){
      temp[i] = json_res[i];
   //   console.log(i+temp[i])
    }
    list[x] = json_res;
  }
 // console.log(list);
  return list;
}

export function apiGetUserImg(that,id) {
  request({
    url: "http://47.94.173.35/ifocus-back/control.php",
    data : {'argc':'info','id':id,'res':'img','target':'user'}
  }).then(function(res){that.setData({img:res})});
}

export function apiStartLiving(that,id,room_id,mode) {
  request({
    url: "http://47.94.173.35/ifocus-back/control.php",
    data : {'target':'user','argc':'start_live','id':id,'room_id':room_id,'state':mode}
  }).then(that.setData({alive:true}));
}

export function apiEndLiving(that,id) {
  request({
    url: "http://47.94.173.35/ifocus-back/control.php",
    data : {'target':'user','argc':'end_live','id':id}
  }).then();
}

export function apiEdtUserInfo(that,data) {
  request({
    url: "http://47.94.173.35/ifocus-back/control.php",
    data : data
  }).then(function(res){});
}

export function apiUpdateVideo(that,data,path) {
  /*wx.showToast({
    icon: "loading",
    title: "正在上传"
  }),*/
  console.log(data),
    wx.uploadFile({
      url: "http://47.94.173.35/ifocus-back/control.php",
      filePath: path, 
      name: 'video',
      header: { "Content-Type": "multipart/form-data" },
      formData: data,
      success: function (res) {
        //console.log(res);
        //that.onLoad();
        if (res.statusCode != 200) { 
          wx.showModal({
            title: '提示',
            content: '上传失败',
            showCancel: false
          })
          
          return;
        }
        console.log("success upload");
      },
      fail: function (e) {
        console.log(e);
        wx.showModal({
          title: '提示',
          content: '上传失败',
          showCancel: false
        })
      },
     /* complete: function () {
        wx.hideToast();  //隐藏Toast
      }*/
    })

}
export function apiEdtUserImg(that,data,path) {
  wx.showToast({
    icon: "loading",
    title: "正在上传"
  }),
  console.log(data),
  console.log(path),
    wx.uploadFile({
      url: "http://47.94.173.35/ifocus-back/control.php",
      filePath: path[0], 
      name: 'img',
      header: { "Content-Type": "multipart/form-data" },
      formData: data,
      success: function (res) {
        console.log(res);
        that.onLoad();
        if (res.statusCode != 200) { 
          wx.showModal({
            title: '提示',
            content: '上传失败',
            showCancel: false
          })
          
          return;
        }
      },
      fail: function (e) {
        console.log(e);
        wx.showModal({
          title: '提示',
          content: '上传失败',
          showCancel: false
        })
      },
      complete: function () {
        wx.hideToast();  //隐藏Toast
      }
    })

}

