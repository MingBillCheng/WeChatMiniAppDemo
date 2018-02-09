//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgArray: []
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    let urls = []
    wx.request({
      url: 'https://www.apiopen.top/meituApi',
      data: {
        page: 0
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        console.log(res.data)
        res.data.data.map((item) => {
          urls.push(item.url)
        })
        this.setData({ imgArray: res.data.data, urls: urls })
      }
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
      urls: []
    })
  },
  onPullDownRefresh: function () {
    let urls = []
    wx.request({
      url: 'https://www.apiopen.top/meituApi',
      data: {
        page: 0
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        res.data.data.map((item) => {
          urls.push(item.url)
        })
        this.setData({ imgArray: res.data.data, urls: urls })
      },
      complete: function (res) {
        wx.stopPullDownRefresh()
      }
    })
  },
  previewImage: function (e) {
     console.log(e)
    wx.previewImage({
      current: e.currentTarget.dataset.value, // 当前显示图片的http链接
      urls: this.data.urls // 需要预览的图片http链接列表
    })
  }
})
