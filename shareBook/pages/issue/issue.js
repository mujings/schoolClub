import {
  tips
} from "../../utils/tip";

Page({
  data: {

  },

  onLoad: function (options) {

  },

  onShow: function () {

  },

  toIssueBook(e) {
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        if (res.scanType == "EAN_13") {
          wx.navigateTo({
            url: 'issueBook/issueBook?isbn=' + res.result
          });
        } else {
          tips.toast('请扫描图书isbn码')
        }
      }
    })
  },

  toBegBook(e) {
    console.log('..')
  }
})