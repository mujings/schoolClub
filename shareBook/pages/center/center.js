var appInst =  getApp();

Page({
  data: {

  },

  onLoad: function (options) {
    let that = this
    that.setData({
      userInfo:appInst.globalData.userInfo
    })
  },

  onShow: function () {

  },

  toUserInfo(e){
    wx.navigateTo({
      url: 'userInfo/userInfo'
    });
  }
})