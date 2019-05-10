import {
  wxRequest
} from "../../../utils/wxRequest";
let text = '',
  userId = '',
  bookId = '';
Page({
  data: {
    type: '色情、低俗内容',
    textDisable: true,
    isLoad: false
  },

  onLoad: function (options) {
    console.log(options)
    let that = this;
    userId = options.userId;
    bookId = options.bookId;
    wxRequest('/book/getBook.wx', {
      bookId: bookId
    }, function (res) {
      that.setData({
        bookName: res.data.result.name
      })
      wxRequest('/user/otherUser.wx', {
        userId: userId
      }, function (res) {
        that.setData({
          head: res.data.result.avatarUrl,
          nick_name: res.data.result.nick_name
        })
      })
    })
  },

  onShow: function () {

  },

  onChange(e) {
    let that = this;
    that.setData({
      type: e.detail.value,
    })
    if (e.detail.value == 5) {
      that.setData({
        textDisable: false
      })
    }
  },

  getText(e) {
    text = e.detail.value
  },

  submit(e) {
    let that = this;
    let content = that.data.type
    that.setData({
      isLoad: true
    })
    if (content == '其他') {
      content = text
    }
    wxRequest('/book/report.wx', {
      bookId: bookId,
      bookPeople: userId,
      content: content
    }, function (res) {

    })
  }

})