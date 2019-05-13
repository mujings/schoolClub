import {
  wxRequest
} from "../../../utils/wxRequest";
import {
  tips
} from "../../../utils/tip";
let bookId = ''
Page({
  data: {

  },

  onLoad: function (options) {
    let that = this;
    bookId = options.id
    wxRequest('/book/getBook.wx', {
      bookId: bookId
    }, function (res) {
      that.setData({
        bookInfo: res.data.result
      })
    })
  },

  showImg: function (res) {
    let that = this;
    let index = res.currentTarget.id
    wx.previewImage({
      current: that.data.bookInfo.pic[index], // 当前显示图片的http链接  
      urls: that.data.bookInfo.pic // 需要预览的图片http链接列表  
    })
  },

  cancel(e) {
    wxRequest('/book/cancel.wx', {
      bookId: bookId,
      state: 3
    }, function (res) {
      tips.toast('取消成功').then(function (res) {
        wxRequest('/book/getBook.wx', {
          bookId: bookId
        }, function (res) {
          that.setData({
            bookInfo: res.data.result
          })
        })
      })
    })
  },

})