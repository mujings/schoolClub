import {
  wxRequest
} from "../../../utils/wxRequest";
let name, phone, id;
Page({
  data: {
    idSrc: "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640",
    stuSrc: "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640",
  },

  //studentCode是学生证
  onLoad: function (options) {
    let that = this;
    wxRequest('/user/info.wx', {}, function (res) {
      let info = res.data.result
      name = info.nick_name;
      phone = info.phone;
      id = studentId
      that.setData({
        userInfo: info
      })
    })
  },

  onShow: function () {

  },

  // 上传身份证
  chooseIdPic() {
    let that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        console.log(res)
        that.uploadPic(res.tempFilePaths[0]);
      },
    })
  },

  // 上传学生证
  chooseStuPic() {
    let that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        that.uploadPic(res.tempFilePaths[0]);
      },
    })
  },

  //上传图片
  uploadPic: function (img) {
    let that = this;

    wxRequestUpload(img, function (res) {
      console.log('res');
      console.log(JSON.parse(res.data))
      let mydata = JSON.parse(res.data);
      if (mydata.status == 'success') {
        console.log(urls);
        that.setData({
          images: urls
        })
      }
    })
  },

  // 获取输入
  inputName(res) {
    console.log(res.detail.value)
  },

  inputPhone(res) {

  },

  inputId(res) {

  }
})