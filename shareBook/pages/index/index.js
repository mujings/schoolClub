Page({
    data: {
    },

    onLoad() {

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