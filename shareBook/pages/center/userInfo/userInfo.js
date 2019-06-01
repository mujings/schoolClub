import {
  wxRequest
} from "../../../utils/wxRequest";
import {
  tips
} from "../../../utils/tip";
import {
  wxRequestUpload
} from "../../../utils/wxRequest";
let name, phone, stuCardNumber, picIds; //图片id;

Page({
  data: {
    stuCardBackSrc: "https://686f-home-td6wb-1259196216.tcb.qcloud.la/images/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20190509095335.png?sign=a5c66d657232627afd3e2cf5fae3033f&t=1559381527"
  },

  //studentCode是学生证
  onLoad: function (options) {
    let that = this;
    wxRequest('/user/info.wx', {}, function (res) {
      let info = res.data.result
      name = info.studentName;
      phone = info.phone;
      stuCardNumber = info.studentId;
      that.setData({
        userInfo: info,
        stuCardSrc: info.studentCode,
        status:info.status
      })
    })
  },

  submit(res) {
    let json = {
      studentName: name,
      studentId: stuCardNumber,
      phone: phone,
      studentCode: picIds
    }
    wxRequest('/user/certification.wx', {
      json: JSON.stringify(json)
    }, function (res) {
      tips.toast('提交认证成功').then(function (res) {
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          });
        }, 1000)
      })
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
      if (res.status == 'success') {
        picIds = res.result.urlId;
        that.setData({
          status:10,
          stuCardSrc: res.result.url
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
  }
})