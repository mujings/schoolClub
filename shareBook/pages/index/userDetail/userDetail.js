import {
  wxRequest
} from "../../../utils/wxRequest";
import {
  tips
} from "../../../utils/tip";

let isOver = false, //加载所有
  pageStart = 1, //第几页开始加载
  id = ''

Page({
  data: {
    bookArr: []
  },

  onLoad: function (options) {
    id = options.id;
    pageStart = 1
    isOver = false
    this.getInfo()
  },

  getInfo() {
    if (!isOver) {
      let that = this;
      let bookArr = that.data.bookArr;
      wxRequest('/user/otherUser.wx', {
        userId: id,
        pageStart: pageStart
      }, function (res) {
        if (bookArr.length == res.data.result.bookList.pageCount) {
          isOver = true
          tips.toast('已加载所有')
        } else {
          if (pageStart == 1) {
            that.setData({
              avatarUrl: res.data.result.avatarUrl,
              nick_name: res.data.result.nick_name
            })
          }
          pageStart++
          bookArr = bookArr.concat(res.data.result.bookList.data)
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
    this.getInfo()
  },
})