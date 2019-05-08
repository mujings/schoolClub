import {
    wxRequest
} from "../../utils/wxRequest";
import {
    tips
} from "../../utils/tip";

let isOver = false, //加载所有
    pageStart = 1, //第几页开始加载
    keyWord = '';
Page({
    data: {
        scrollTop: 0,
        classId: '', //分类id
        bookArr: [],
    },

    onLoad() {
        let that = this;
        wxRequest('/category/categorys.wx', {
            parentId: 0
        }, function (res) {
            that.setData({
                array: res.data.result,
                classId: res.data.result[0].id
            })
            that.getBookList(res.data.result[0].id);
        })
    },

    // 选择分类
    selectClss(e) {
        let that = this;
        isOver = false;
        pageStart = 1;
        that.setData({
            classId: e.currentTarget.id,
            bookArr: []
        })
        that.getBookList();
    },

    // 搜索
    search(res) {
        let that = this;
        isOver = false;
        pageStart = 1;
        keyWord = res.detail.value
        that.setData({
            bookArr: [],
            classId: ''
        })
        that.getBookListSearch()
    },

    //获取图书列表
    getBookList() {
        if (!isOver) {
            let that = this;
            let bookArr = that.data.bookArr;
            wxRequest('/book/list.wx', {
                categoryId: that.data.classId,
                pageStart: pageStart
            }, function (res) {
                if (bookArr.length == res.data.result.pageCount) {
                    isOver = true
                    tips.toast('已加载所有')
                } else {
                    pageStart = res.data.result.pageStart + 1
                    bookArr = bookArr.concat(res.data.result.data)
                    that.setData({
                        bookArr: bookArr
                    })
                }
            })
        } else {
            tips.toast('已加载所有')
        }
    },

    getBookListSearch() {
        if (!isOver) {
            let that = this;
            let bookArr = that.data.bookArr;
            wxRequest('/book/search.wx', {
                keyWord: keyWord,
                pageStart: pageStart
            }, function (res) {
                if (bookArr.length == res.data.result.pageCount) {
                    isOver = true
                    tips.toast('已加载所有')
                } else {
                    pageStart = res.data.result.pageStart + 1
                    bookArr = bookArr.concat(res.data.result.data)
                    that.setData({
                        bookArr: bookArr
                    })
                }
            })
        } else {
            tips.toast('已加载所有')
        }
    },

    // 上划加载更多
    onReachBottom() {
        let that = this;
        if (that.data.classId == '') {
            that.getBookListSearch()
        } else {
            getBookList()
        }
    },

    // 吸顶
    onPageScroll(e) {
        console.log('onPageScroll', e.scrollTop)
        this.setData({
            scrollTop: e.scrollTop,
        })
    },

    //图书详情
    toBookDetail(e) {
        // console.log(e.currentTarget.id)
        wx.navigateTo({
            url: 'bookDetail/bookDetail?id='+e.currentTarget.id
        });
    },

    //用户详情
    toUserDetail(e) {
        // console.log(e)
        wx.navigateTo({
            url: 'userDetail/userDetail?id='+e.currentTarget.id
        });
    }
})