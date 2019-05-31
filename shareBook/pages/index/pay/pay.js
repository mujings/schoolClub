import {
  wxRequest
} from "../../../utils/wxRequest";
import {
  tips
} from "../../../utils/tip";
let orderId, integral;
Page({
  data: {

  },

  onLoad: function (options) {
    orderId = options.orderId;
    integral = options.integral;
  },

  back() {
    wx.switchTab({
      url: '../../index/index'
    });
  },

  pay() {
    wxRequest('/order/confirm.wx', {
      orderId: orderId,
      integral: integral
    }, function () {
      tips.toast('付款成功').then(function () {
        setTimeout(function () {
          wx.switchTab({
            url: '../../index/index'
          });
        }, 1000)
      })
    })
  }
})