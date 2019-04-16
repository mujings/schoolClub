Page({
  data: {
    current: 'tab1',
  },

  onLoad: function (options) {

  },

  onShow: function () {

  },

  onTabsChange(e) {
    const {
      key
    } = e.detail

    this.setData({
      key,
    })
  },

})