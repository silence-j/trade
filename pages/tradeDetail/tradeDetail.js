// pages/tradeDetail/tradeDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordIndex: Number,
    detail: [] 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let str = ''
    that.setData({
      recordIndex: options.id
    })
    options.country.replace(/\s/g, '_')
    str = options.country
    str = str.replace(/\s/g, '_')
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    wx.request({
      url: `${app.globalData.domain}/index.php?m=home&c=Index&a=info&source=wx&id=${options.id}&g=${str}`,
      method: 'GET',
      header: {
        'Cookie': 'BJYADMIN=' + app.globalData.session_id
      },
      success: function (res) {
        console.log('#########')
        console.log(res)
        if (res.data.error_message == '请先购买会员套餐') {
          wx.redirectTo({
            url: '../buy/buy'
          })
        }
        if (!res.data.error_code) {
          that.setData({
            detail: res.data.data.ds
          })
          wx.hideLoading()
        }
      },
      fail: function () {
        console.log('&&&&&&&')
        console.log(res)
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