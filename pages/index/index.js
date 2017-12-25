const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currt0: false,
    currt1: false,
    currt2: true,
    searchValue: '',
    type: 1,
    loginor: 'notok'
  },
  // 退出
  quite: function () {
    let that = this
    wx.request({
      url: `${app.globalData.domain}/index.php?m=home&c=user&a=logout&source=wx`,
      method: 'GET',
      header: {
        'Cookie': 'BJYADMIN=' + app.globalData.session_id
      },
      success: function (res) {
        if (!res.data.error_code) {
          app.globalData.islogin = 'notok'
          that.setData({
            loginor: 'notok'
          })
          wx.showToast({
            title: '退出成功',
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
  },
  // 跳转至搜索列表
  jumpList: function () {
    if (this.data.searchValue !== '') {
      wx.navigateTo({
        url: '../tradeList/tradeList?search=' + this.data.searchValue + '&type=' + this.data.type
      })
    }    
  },
  login: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  buyTo: function () {
    wx.navigateTo({
      url: '../buy/buy'
    })
  },
  // 切换搜索内容
  chance: function (e) {
    console.log(e)
    this.setData({
      type: e.target.dataset.search
    })
    if (e.target.dataset.search == '3') {
      this.setData({
        currt0: true,
        currt1: false,
        currt2: false
      })
    } else if (e.target.dataset.search == '2') {
      this.setData({
        currt0: false,
        currt1: true,
        currt2: false
      })
    } else if (e.target.dataset.search == '1') {
      this.setData({
        currt0: false,
        currt1: false,
        currt2: true
      })
    }   
  },
  // 搜索输入关键词
  search: function (e) {
    this.setData({
      searchValue: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   loginor: app.data.islogin
    // })
    console.log(this.data.loginor)
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
    this.setData({
      loginor: app.globalData.islogin
    })
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