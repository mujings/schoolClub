import {
  wxRequest
} from "../../../utils/wxRequest";
import {
  tips
} from "../../../utils/tip";
let userId, bookId, phone = '';

Page({
  data: {
    value: 1,
    integral: 0,
    danjia: 0, //单价
  },

  onLoad: function (options) {
    let that = this;
    userId = options.userId
    bookId = options.bookId;
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
  },

  phoneInput(res) {
    phone = res.detail.value
  },

  confirm() {
    let that = this;
    if (phone != '') {
      wxRequest('/order/generate.wx', {
        userId: userId,
        bookId: bookId,
        integral: that.data.integral,
        num: that.data.value,
        phone: phone
      }, function (res) {
        wx.redirectTo({
          url: '../pay/pay?orderId='+res.data.result+'&integral='+that.data.integral        
        });
      })
    } else {
      tips.toast('请输入手机号码')
    }
  }
})