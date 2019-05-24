Page({

  data: {
    show: false
  },

  onLoad: function (options) {
    if (options.show) {
      this.setData({
        show: true
      })
    }
  },

  toIndex: function () {
    wx.switchTab({
      url: '../../index/index',
    });
  }
})