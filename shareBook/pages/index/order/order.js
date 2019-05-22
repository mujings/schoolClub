import {
  wxRequest
} from "../../../utils/wxRequest";
let userId = ""

Page({
  data: {
    value: 1,
    integral: 0,
    danjia:0,//单价
  },

  onLoad: function (options) {
    let that = this;
    userId = options.userId
    wxRequest('/book/getBook.wx', {
      bookId: options.bookId
    }, function (res) {
      that.setData({
        info: res.data.result,
        integral: res.data.result.integral,
        danjia: res.data.result.integral
      })
    })
  },

  onChange(res) {
    let that = this;
    let num = res.detail.value
    if (that.data.info.number + 1 > num) {
      that.setData({
        value: res.detail.value,
        integral: that.data.danjia * res.detail.value
      })
    }
  }
})