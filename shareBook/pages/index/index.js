Page({
  data: {
      scrollTop: 0,
  },
  
  onLoad() {

  },

  onPageScroll(e){
      console.log('onPageScroll', e.scrollTop)
      this.setData({
          scrollTop: e.scrollTop,
      })
  },

  toDetail(e){
      wx.navigateTo({
          url: 'bookDetail/bookDetail'
      });
  }
})
