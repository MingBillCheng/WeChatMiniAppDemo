//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    inputValue: '',
    showData: false,
    data: []
  },
  onLoad: function () {

  },
  onInputChange: function (e) {
    console.log(e)
    this.setData({ inputValue: e.detail.value })
  },
  onClick: function (e) {
    wx.request({
      url: 'https://www.apiopen.top/weatherApi',
      data: {
        city: this.data.inputValue
      },
      success: (res) => {
        console.log(res)
        this.setData({ showData: true, data: res.data.data.forecast })
      }
    })
  }
})
