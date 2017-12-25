// pages/tradeList/tradeList.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchValue: '',
    country: [],
    list: [] ,
    countryValue: '',
    show: false,
    searchType: -1,
    loading: true,
    page: 1,
    allList: [],
    index: true,
    up: false
  },
  // 更换搜索国家
  changeCountry: function (e) {
    console.log(456)
    console.log(this.data.country[e.detail.value]    )
    this.setData({
      up: false,
      countryValue: e.detail.value
    })
  },
  // 国家弹框
  choose:function () {
    this.setData({
      show: true
    })
  },
  // 清楚搜索内容
  clear: function () {
    this.setData({
      searchValue: ''
    })
  },
  // 重新搜索结果
  searchList: function () {
    let that = this
    that.searchNow()
  },
  chanceCountry: function () {
    let that = this
    this.setData({
      show: false
    })
    that.searchNow()
  },
  // 跳转详情
  jumpDetail: function (e) {
    if (app.globalData.islogin == 'notok') {
      console.log('')
      wx.navigateTo({
        url: '../logs/logs'
      })
    } else {
      console.log('1')
      let id = ''
      let country = ''
      id = e.currentTarget.dataset.id
      country = e.currentTarget.dataset.country
      wx.redirectTo({
        url: '../tradeDetail/tradeDetail?id=' + id + '&country=' + country
      })
    }
  },
  searchNow: function () {
    let url = ''
    let that = this
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    if (this.data.countryValue === '') {
      url = `${app.globalData.domain}/index.php?m=home&c=index&a=plist&keywords=${this.data.searchValue}&ty=${this.data.searchType}&source=wx&p=${this.data.page}`
    } else {
      let arr = []
      for (var key in this.data.country) {
        arr.push(key)
      }
      url = `${app.globalData.domain}/index.php?m=home&c=index&a=plist&keywords=${this.data.searchValue}&ty=${this.data.searchType}&source=wx&ct=${arr[this.data.countryValue]}&p=${this.data.page}`
    }
    wx.request({
      url: url,
      method: 'GET',
      success: function (res) {
        console.log('88888888')
        console.log(res)
        if (!res.data.error_code) {
          that.setData({
            index: that.data.index++
          })
          let cur = []
          let cur1 = []
          let country1 = {}
          let curList = []
          let listAll = []
          cur = res.data.data.countrySum
          cur1 = res.data.data.countryList
          console.log(cur)
          if (res.data.data.list.length !== 0 && res.data.data.list !== null) {
            res.data.data.list.forEach(item => {
              item.arrivaldate = item.arrivaldate.slice(0, 10)
            })
          }
          if (that.data.index == true) {
            for (var key in cur) {
              for (var keya in cur1) {
                console.log(keya)
                console.log(cur1[keya])
                if (key == keya) {
                  country1[key] = cur1[keya]
                }
              }
            }
          }
          if (that.data.up === true) {
            listAll = that.data.list
            curList = res.data.data.list
            that.setData({
              allList: res.data.data.list,
              loading: false,
              list: listAll.concat(curList)
            })
          } else {
            that.setData({
              allList: res.data.data.list,
              loading: false,
              list: res.data.data.list
            })
          }
          if (that.data.index == true) {
            that.setData({
              country: country1,
              index: false
            })
          }
          wx.hideLoading()
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    let that = this
    that.setData({
      searchValue: options.search,
      searchType: options.type
    })
    that.searchNow() 
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
    wx.stopPullDownRefresh()
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this
    this.setData({
      up: true,
      page: this.data.page++
    })
    that.searchNow()  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})