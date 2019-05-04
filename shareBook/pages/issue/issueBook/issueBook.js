import { wxRequest } from "../../../utils/wxRequest";
Page({
  data: {
    images: [],
    picIds : [] , //图片id
    array: ['美国', '中国', '巴西', '日本'],
    index:0
  },

  onLoad: function (options) {
    wxRequest('/category/categoeys.wx',{parentId:0},function(res){

    })
  },

  onShow: function () {

  },

  submit(res){
    console.log(res)
  },

  scanCode(e){
    wx.scanCode({
      onlyFromCamera: true,
      scanType:['barCode'],
      success(res) {
        console.log(res)
      }
    })
  },

  //选择图片
  choosePic: function() {
    let that = this;
    let pic = that.data.images;
    let sum = pic.length;
    wx.chooseImage({
      count: 6 - sum,
      success: function(res) {
        pic = pic.concat(res.tempFilePaths);
        for (let i = 0; i < res.tempFilePaths.length; i++) {
          that.uploadPic(res.tempFilePaths[i]);
        }
      },
    })
  },

  //上传图片
  uploadPic: function(img) {
    let that = this, urls = that.data.images, urlIds = that.data.picIds;

    wxRequestUpload(img, function(res) {
        console.log('上传图片-----');        
        console.log(JSON.parse(res.data))
        let mydata = JSON.parse(res.data);
        urls.push(mydata.result.url)
        urlIds.push(mydata.result.urlId);       

        if(mydata.status == 'success'){        
          console.log(urlIds);
          console.log(urls);
          that.setData({
            images: urls,
            picIds: urlIds
          })
        }
      })  
    
  },


  //删除图片
  delPic: function(e) {
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
          that.data.picIds.splice(id, 1);
        }
      }
    })
  },
})