const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    email: '',
    password: '',
    repassword: '',
    nickname: '',
    error: '输入有误',
    emailError: false,
    passwordError: false,
    repasswordError: false,
    nicknameEorror: false  
  },
  reback: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  emailInput: function (e) {
    this.setData({
      email: e.detail.value
    })
  },
  psdInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  repsdInput: function (e) {
    this.setData({
      repassword: e.detail.value
    })
  },
  nickInput: function (e) {
    this.setData({
      nickname: e.detail.value
    })
  },
  // 立即注册
  register: function () {
    let myreg = /^1[0-9]{10}$/
    if (myreg.test(this.data.email) == false) {
      this.setData({
        emailError: true
      })
    } else if (this.data.password !== this.data.repassword) {
      this.setData({
        repasswordError: true
      })
    } else {
      wx.request({
        url: `${app.globalData.domain}/index.php?m=home&c=user&a=reg`,
        data: {
          source: 'wx',
          email: this.data.email,
          password: this.data.password,
          repassword: this.data.repassword,
          truename: this.data.nickname
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function (res) {
          if (!res.data.error_code) {
            console.log("12312")
            app.globalData.session_id = res.header['Set-Cookie'].split(';')[0].split('=')[1]
            wx.navigateTo({
              url: '../logs/logs'
            })
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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