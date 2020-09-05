const { apiCheckAlive, apiStartLiving } = require("../../ifocusApi/api");

var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    room_id:"",
    alive: false,
  },

  submit: function(e){
    var mode = e.currentTarget.dataset['hi'];
    apiStartLiving(this,this.data.openid,this.data.room_id,mode);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //---------------------------------
  //---------------------------------
  //获得已预约信息,返回一个可选时间段的数组
  onLoad: function () {
    this.data.openid = app.globalData.openid;
    this.data.room_id = app.globalData.room_id;
    console.log(this.data.openid);
    console.log(app.globalData);
    apiCheckAlive(this,this.data.openid);
  },

  onLuanch(){
   // this.getOpenid()
    },
    // 定义调用云函数获取openid
    getOpenid(){
      let page = this;
      wx.cloud.callFunction({
        name:'getOpenid',
        complete:res=>{
          console.log('openid--',res.result)
          var openid = res.result.openid
          page.setData({
            openid:openid
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
    app.globalData.room_id = "";
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
