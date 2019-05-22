import {
  wxRequest
} from "../../../utils/wxRequest";
Page({
  data: {
    
  },

  onLoad: function (options) {
    let that = this;
    wxRequest('/book/getBook.wx', {
      bookId: options.id
    }, function (res) {
      that.setData({
        bookInfo:res.data.result
      })
    })
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

  //用户详情
  toUserDetail(e) {
    wx.navigateTo({
      url: '../userDetail/userDetail?id='+e.currentTarget.id
    });
  },

  //下单
  toOrder(e) {
    let that = this;
    wx.navigateTo({
      url: '../order/order?userId='+that.data.bookInfo.userId+'&bookId='+that.data.bookInfo.id
    });
  },

  //举报书本
  toReport(e) {
    let that = this;
    wx.navigateTo({
      url: '../reportBook/reportBook?userId='+that.data.bookInfo.userId+'&bookId='+that.data.bookInfo.id
    });
  },

})