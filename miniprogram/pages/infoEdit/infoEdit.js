// pages/infoEdit/infoEdit.js
import {
  apiGetUserMoney,
  apiGetUserSlogan,
  apiGetUserNickname,
  apiGetUserImg,
  apiEdtUserInfo,
  apiEdtUserImg
} from '../../ifocusApi/api.js'

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: "2",
    nickname: "",
    slogan: "",
    img: "",
    filepath: ""
  },
  updateDataFromCloud: function () {
    var _this = this

    // console.log(app.globalData.openid)

    const db = wx.cloud.database()
    db.collection('user').where({
        _openid: app.globalData.openid
      })
      .get({
        success: res => {
          app.data.Credit = res.data[0].credit
          app.data.userStatus = res.data[0].status
          // this.setData({
          //   currentStatus : (app.data.userStatus - 1)
          // })
          // this.changCurrentStatus(app.data.userStatus - 1)

          console.log("[云函数]查询用户信息成功", res)
          // console.log("app data:"+app.data)
          // console.log("app globaldata:"+app.globalData)

          _this.setData({
            credit: app.data.Credit,
            openid: app.globalData.openid
          })
        },

        fail: err => {
          console.log("[云函数]查询用户信息失败", err)
        },

        complete: function () {
          wx.stopPullDownRefresh({
            complete(res) {
              wx.hideToast()
              console.log(res, new Date())
            }
          })
        }
      })
  },



  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    var list = e.detail.value;
    //this.data.openid = app.globalData.openid;
    list['id'] = this.data.openid;
    list['argc'] = "edt";
    list['target'] = "user";
    //if(this.data.filepath) list['img'] = this.data.filepath;
    console.log(list);

    if (this.data.filepath) {
      console.log(this.data.filepath);
      apiEdtUserImg(this, list, this.data.filepath);
    } else {
      apiEdtUserInfo(this, list);
    }
    getBaseInfo(this, this.data.openid);
    var that = this;
    that.onLoad();
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  uploadPhoto() {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var path = res.tempFilePaths[0];
        var formatImage = path.split(".")[(path.split(".")).length - 1];
        console.log(formatImage);
        if (formatImage != "jpg" && formatImage != "JPG") {
          return wx.showToast({
            title: '只能上传.jpg 格式',
            icon: 'none',
            image: '',
            duration: 2000,
            mask: true,
          })
        }
        that.data.filepath = res.tempFilePaths;
        console.log(that.data.filepath);
      }
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  //---------------------------
  //---------------------------
  //---------------------------
  //完成拉取预约信息，从数据库中
  onLoad: function (options) {
    //this.updateDataFromCloud()
    this.data.openid = app.globalData.openid;
    console.log(this.data.openid);
    console.log(app.globalData);
    getBaseInfo(this, this.data.openid);
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
    // this.updateDataFromCloud()
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
    this.updateDataFromCloud()
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



function getBaseInfo(that, id) {
  apiGetUserMoney(that, id);
  apiGetUserSlogan(that, id);
  apiGetUserNickname(that, id);
  apiGetUserImg(that, id);
}