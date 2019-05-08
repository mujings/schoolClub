var appInst = getApp();
import {
  wxRequest
} from "../../utils/wxRequest";
Page({
  data: {},

  onLoad: function (options) {
    let that = this;
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              appInst.globalData.userInfo = res.userInfo;
              that.login();
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function (e) {
    let that = this;
    if (e.detail.userInfo) {
      appInst.globalData.userInfo = e.detail.userInfo;
      that.login()
    }
  },

  login: function () {
    wx.login({
      success: (result) => {
        wxRequest('/userLogin/getOpenId.wx', {
          code: result.code
        }, function (res) {
          let userJson = {
            userInfo: appInst.globalData.userInfo,
            openId: res.data.openId
          }
          wxRequest('/userLogin/wechatLogin.wx', {
            userJson: JSON.stringify(userJson)
          }, function (res) {
              appInst.globalData.userkey = res.data.userkey
              wx.switchTab({
                url: '../index/index',
              });
          })
        })
      }
    })
  }
})