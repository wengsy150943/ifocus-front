// request.js
const request = options => {
  return new Promise((resolve, reject) => {
    
    wx.request({
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      url : options.url,
      data : options.data,
      method : "POST",
      success: function(res) {
          resolve(res.data)
      },
      fail: function(res) {
        reject(res.errMsg)
      }
    })
  })
}
export default request
