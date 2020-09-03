
/**
 * name: api.js
 * description: request处理基础类
 * author: 徐磊
 * date: 2018-5-19
 */
class request {
  constructor() {
    this._header = {}
  }

/**
 * 设置统一的异常处理
 */
  setErrorHandler(handler) {
    this._errorHandler = handler;
  }


  /**
   * POST类型的网络请求
   */
  postRequest(data) {
    return this.requestAll(data,'POST')
  }

  /**
   * 网络请求
   */
  requestAll(data, method) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: "http://47.94.173.35/ifocus-back/control.php",
        data: data,
        header: {
          "Content-Type":"application/x-www-form-urlencoded"
      },
        method: method,
        success: (res => {
          if (res.statusCode === 200) {
            //200: 服务端业务处理正常结束
            resolve(res)
          } else {
            //其它错误，提示用户错误信息
            if (this._errorHandler != null) {
            //如果有统一的异常处理，就先调用统一异常处理函数对异常进行处理
              this._errorHandler(res)
            }
            reject(res)
          }
        }),
        fail: (res => {
          if (this._errorHandler != null) {
            this._errorHandler(res)
          }
          reject(res)
        })
      })
    })
  }
}

export default request