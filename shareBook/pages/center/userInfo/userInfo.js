import {
  wxRequest
} from "../../../utils/wxRequest";
import {
  tips
} from "../../../utils/tip";
let name, phone, stuCardNumber, idCardNumber;
Page({
  data: {
    idCardSrc: "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640",
    stuCardSrc: "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640"
  },

  //studentCode是学生证
  onLoad: function (options) {
    let that = this;
    wxRequest('/user/info.wx', {}, function (res) {
      let info = res.data.result
      name = info.studentName;
      phone = info.phone;
      stuCardNumber = info.studentId;
      idCardNumber = info.idCardNumber;
      that.setData({
        userInfo: info
      })
    })
  },

  onShow: function () {

  },

  submit(res) {
    let json = {
      studentName: name,
      studentId: stuCardNumber,
      phone: phone,
      idCardNumber: idCardNumber,
      studentCode: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      idcardpic: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640'
      // studentCode: that.data.stuCardSrc,
      // idcardpic: that.data.idCardSrc
    }
    wxRequest('/user/certification.wx', {
      json: JSON.stringify(json)
    }, function (res) {
      tips.toast('提交认证成功').then(function (res) {
        wx.navigateBack({
          delta: 1
        });
      })
    })
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
    name = res.detail.value
  },

  inputPhone(res) {
    phone = res.detail.value
  },

  inputStuCard(res) {
    stuCardNumber = res.detail.value
  },

  inputIdCard(res) {
    idCardNumber = res.detail.value
  }
})