const app = getApp()
//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    user: 'ncc0@sina.cn',
    psd: '123456',
    phoneError: false,
    userInput: '',
    psdInput: ''  

  },
  // 跳转注册页面
  regTo: function () {
    wx.navigateTo({
      url: '../register/register'
    })
  },
  userInput: function (e) {
    console.log(e)
    this.setData({
      userInput: e.detail.value
    })
  },
  psdInput: function (e) {
    this.setData({
      psdInput: e.detail.value
    })
  },
  login: function () {
    let that = this
      wx.request({
        url: `${app.globalData.domain}/index.php?m=home&c=user&a=login`,
        data: {
          source: 'wx',
          email: that.data.userInput,
          password: that.data.psdInput
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function (res) {
          if (!res.data.error_code) {
            app.globalData.islogin = 'ok'
            app.globalData.session_id = res.header['Set-Cookie'].split(';')[0].split('=')[1]
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 1000
            })
            wx.redirectTo({
              url: '../index/index'
            })
          } else {
            wx.showToast({
              title: '登录失败',
              icon: 'loading',
              duration: 2000
            })
          }
        }
      })
  },
  onLoad: function () {
  }
})
