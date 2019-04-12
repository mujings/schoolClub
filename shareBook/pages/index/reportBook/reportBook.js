let text='';
Page({
  data: {
    type: 1,
    textDisable: true,
    isLoad:false
  },

  onLoad: function (options) {

  },

  onShow: function () {

  },

  onChange(e) {
    let that = this;
    that.setData({
      type: e.detail.value,
    })
    if (e.detail.value == 5) {
      that.setData({
        textDisable: false
      })
    }
  },

  getText(e){
    text = e.detail.value
  },

  submit(e){
    let that = this;
    that.setData({
      isLoad:true
    })
    console.log(that.data.type,text)
  }

})