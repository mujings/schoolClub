import {
  wxRequest
} from "../../../utils/wxRequest";
let userId = ""

Page({
  data: {
    value:1
  },

  onLoad: function (options) {
    let that = this;
    userId = options.userId
    wxRequest('/book/getBook.wx', {
      bookId: options.bookId
    }, function (res) {
      that.setData({
        info:res.data.result
      })
    })
  },

  onChange(res){
    let that = this;
    let num = res.detail.value
    if (that.data.info.number+1 > num ) {
      that.setData({
        value:res.detail.value
      })
    }
  }
})