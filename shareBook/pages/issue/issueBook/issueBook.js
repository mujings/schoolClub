import {
  wxRequest
} from "../../../utils/wxRequest";
import {
  wxRequestUpload
} from "../../../utils/wxRequest";
let picIds = []; //图片id
let bookNum = 1; //图书数量
Page({
  data: {
    images: [],
    array: [],
    index: 0
  },

  onLoad: function (options) {
    let that = this;
    if (options.isbn) {
      that.setData({
        isbn: options.isbn
      })
    }
    wxRequest('/category/categorys.wx', {
      parentId: 0
    }, function (res) {
      that.setData({
        array: res.data.result
      })
    })
  },

  onShow: function () {

  },

  // 表单提交
  formSubmit: function (res) {
    console.log(res.detail.value)
    let json = res.detail.value;
    let categoryId = json.categoryId;
    delete json.categoryId
    json.titlePic = "https://ss3.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=7dac85b2825494ee982209191df4e0e1/c2cec3fdfc03924558fae5028994a4c27d1e256b.jpg"
    json.pic = ["https://ss3.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=7dac85b2825494ee982209191df4e0e1/c2cec3fdfc03924558fae5028994a4c27d1e256b.jpg"]
    json.number = bookNum;
    json.tradeWay = 1;
    wxRequest('/book/release.wx', {
      json: JSON.stringify(json),
      categoryId: categoryId
    }, function (res) {
      
    })
  },

  //书本数量
  numChange(res) {
    bookNum = res.detail.value
  },



  //选择图片
  choosePic: function () {
    let that = this;
    let pic = that.data.images;
    let sum = pic.length;
    wx.chooseImage({
      count: 6 - sum,
      success: function (res) {
        pic = pic.concat(res.tempFilePaths);
        for (let i = 0; i < res.tempFilePaths.length; i++) {
          that.uploadPic(res.tempFilePaths[i]);
        }
      },
    })
  },

  //上传图片
  uploadPic: function (img) {
    let that = this,
      urls = that.data.images;

    wxRequestUpload(img, function (res) {
      console.log('上传图片-----');
      console.log(JSON.parse(res.data))
      let mydata = JSON.parse(res.data);
      urls.push(mydata.result.url)
      picIds.push(mydata.result.urlId);

      if (mydata.status == 'success') {
        console.log(urls);
        that.setData({
          images: urls
        })
      }
    })
  },


  //删除图片
  delPic: function (e) {
    let that = this;
    let pic = that.data.images;
    let id = e.currentTarget.dataset.id;
    console.log(id);
    // tips.confirm();
    wx.showModal({
      title: '提示',
      content: '是否删除这张照片',
      success(res) {
        if (res.confirm) {
          pic.splice(id, 1);
          that.setData({
            images: pic
          })
          picIds.splice(id, 1);
        }
      }
    })
  }
})