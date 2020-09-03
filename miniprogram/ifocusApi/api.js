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
  }).then(function(res){that.setData({log:res})});
}