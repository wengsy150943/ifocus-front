const {
  apiCheckAlive,
  apiStartLiving,
  apiUpdateVideo,
  apiEndLiving,
  apiEdtUserInfo
} = require("../../ifocusApi/api");

var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    room_id: "",
    alive: true,
    filepath: "",
    money:-1,
  },
  getVideo: function () {
    var list = [];
    list['id'] = this.data.openid;
    list['argc'] = "video";
    list['target'] = "user";
    var that = this;
    wx.chooseVideo({
      sourceType: ['camera'],
      maxDuration: 60,
      camera: 'back',
      success(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log(res);
        var path = res.tempFilePath;
        var formatImage = path.split(".")[(path.split(".")).length - 1];
        console.log(formatImage);
        that.data.filepath = res.tempFilePath;
        console.log(that.data.filepath);
        apiUpdateVideo(that, list, that.data.filepath);
      }
    })
  },

  takePhoto() {
    const ctx = wx.createCameraContext();
    console.log("start video");
    ctx.startRecord({
      quality: 'low',
      success: (res) => {
        this.setData({
            src: res.tempImagePath
          })          
      }
    })
  },
  endVideo() {
    const ctx = wx.createCameraContext()
    ctx.stopRecord({
      success: (res) => {
        var list = [];
        list['id'] = this.data.openid;
        list['argc'] = "video";
        list['target'] = "user";
        var that = this;
        var path = res.tempVideoPath;
        //console.log(path);

        var formatImage = path.split(".")[(path.split(".")).length - 1];
        //console.log(formatImage);
        that.data.filepath = res.tempVideoPath;
        //console.log(that.data.filepath);
        apiUpdateVideo(that, list, that.data.filepath);
      }
    })
  },
  checkAlive: function () {
    apiCheckAlive(this, this.data.openid);
  },
  endLive: function () {
    //apiEndLiving(this, this.data.openid);
    app.globalData.alive = false;
    wx.redirectTo({
      url: '../study/study',
      success: function (res) {},
      fail: function (res) {console.log(res)},
      complete: function () {}
    });
    var list = [];
    list['id'] = this.data.openid;
    list['argc'] = "edt";
    list['target'] = "user";
    list['money'] = this.data.money;
    apiEdtUserInfo(this,list);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  //---------------------------------
  //---------------------------------
  //获得已预约信息,返回一个可选时间段的数组
  onLoad: function (options) {
    console.log("True"=="True");
    this.data.openid = app.globalData.openid;
    startRecord(this, 0);
  },

  onLuanch() {
    // this.getOpenid()
  },
  // 定义调用云函数获取openid
  getOpenid() {
    let page = this;
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        console.log('openid--', res.result)
        var openid = res.result.openid
        page.setData({
          openid: openid
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

function circle(that, int) {
  console.log(that.data.alive);
  that.takePhoto();
  setTimeout(() => {
    that.endVideo()
  }, 3000);
  setTimeout(() => {
    that.checkAlive()
  }, 8000);
  if (that.data.alive == false) {
    clearInterval(int);
    console.log("end");
    that.endLive();
    console.log(that.data.money);
  }
  else{
    that.data.money += 5 ;
  }
  
}

function startRecord(that, depth) {
  //this.takePhoto()
  circle(that, int);
  var int = setInterval(() => {
      circle(that, int)
  }, 15000);
}