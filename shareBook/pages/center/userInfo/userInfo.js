import { wxRequest } from "../../../utils/wxRequest";
let name,phone,id;
Page({
  data: {

  },

  //studentCode是学生证
  onLoad: function (options) {
    let that = this;
    wxRequest('/user/info.wx',{},function(res) {
      that.setData({
        userInfo:res.data.result
      })
    })
  },

  onShow: function () {

  },

  // 获取输入
  inputName(res){
    
  },

  inputPhone(res){

  },

  inputId(res){

  }
})