Page({

  data: {
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
  },

  onLoad: function (options) {

  },

  onReady: function () {

  },

  onShow: function () {

  },

  showImg: function (res) {
    let that = this;
    let index = res.currentTarget.id
    wx.previewImage({
      current: that.data.imgUrls[index], // 当前显示图片的http链接  
      urls: that.data.imgUrls // 需要预览的图片http链接列表  
    })
  },

  toUserDetail(e) {
    wx.navigateTo({
      url: '../userDetail/userDetail'
    });
  },
  
  toOrder(e) {
    wx.navigateTo({
      url: '../order/order'
    });
  },

  toReport(e) {
    wx.navigateTo({
      url: '../report/report'
    });
  },

})