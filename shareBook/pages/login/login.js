var appInst = getApp();
import {
  tips
} from "../../utils/tip";
import {
  wxRequest
} from "../../utils/wxRequest";
let code;
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
              wx.login({
                success: (result) => {
                  code = result.code
                  wxRequest('/userLogin/getOpenId.wx',{code:code},function(res){
                    console.log(res)
                    // wx.switchTab({
                    //   url: '../index/index',
                    // });
                  })
                }
              })
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
      setTimeout(function () {
        that.login()
      }, 500)
    }
  },

  login: function () {
    let that = this;
    wx.switchTab({
      url: '../index/index',
    });
    // wxRequest('/userLogin/wechatLogin.wx',{},function(res){

    // })
  }
})