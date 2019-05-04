Page({
    data: {
        scrollTop:0,
        classId:'1',//分类id
    },

    onLoad() {
        
    },

    // 选择分类
    selectClss(e){
        let that = this;
        let classId = e.currentTarget.id
        that.setData({
            classId
        })
    },

    onPageScroll(e) {
        console.log('onPageScroll', e.scrollTop)
        this.setData({
            scrollTop: e.scrollTop,
        })
    },

    toBookDetail(e) {
        wx.navigateTo({
            url: 'bookDetail/bookDetail'
        });
    },

    toUserDetail(e) {
        console.log('...')
        wx.navigateTo({
            url: 'userDetail/userDetail'
        });
    }
})