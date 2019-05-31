import { wxRequest } from "../../../utils/wxRequest";

Page({
  data: {

  },

  onLoad: function (options) {
    let that = this;
    wxRequest('/order/orderDetails.wx',{
      orderId:options.orderId
    },function (res) {
      that.setData({
        info:res.data.result
      })
    })
  },

})