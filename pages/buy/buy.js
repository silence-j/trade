// pages/buy/buy.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: ['一个月', '三个月', '六个月', '一年'] ,
    lastPrice: 69.00 
  },
  yearNum: function(e) {
    console.log(123)
    console.log()
    if (e.currentTarget.dataset.year == 0) {
      this.setData({
        lastPrice: 69
      })
    } else if (e.currentTarget.dataset.year == 1) {
      this.setData({
        lastPrice: 199
      })
    } else if (e.currentTarget.dataset.year == 2) {
      this.setData({
        lastPrice: 389
      })
    } else if (e.currentTarget.dataset.year == 3) {
      this.setData({
        lastPrice: 759
      })
    }
  },
  buyNow: function() {
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    if (app.globalData.islogin == 'notok') {
      console.log('')
      wx.navigateTo({
        url: '../logs/logs'
      })
    } else {
      wx.login({
        success: function (res) {
          if (res.code) {
            console.log(res.code)
            wx.request({
              url: `${app.globalData.domain}/index.php/Api/Weixinpay/getOpenId`,
              data: {
                code: res.code,
              },
              header: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              method: 'GET',
              success: function (rd) {
                let openid = rd.data.openid
                let session_key = rd.data.session_key
                wx.request({
                  url: `${app.globalData.domain}/index.php/Home/Index/alipay`,
                  data: {
                    openid: openid,
                    session_key: session_key,
                    options: 1,
                    pt: "app"
                  },
                  header: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cookie': 'BJYADMIN=' + app.globalData.session_id
                  },
                  method: 'POST',
                  success: function (rda) {
                    wx.hideLoading()
                    var rds = rda.data
                    wx.requestPayment({
                      'timeStamp': rds.timeStamp,
                      'nonceStr': rds.nonceStr,
                      'package': rds.package,
                      'signType': 'MD5',
                      'paySign': rds.paySign,
                      'success': function (r) {
                        console.log("success")
                        wx.redirectTo({
                          url: '../index/index'
                        })
                      },
                      'fail': function (r) {
                        console.log("fail")
                      }
                    })
                  }
                })
              }
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