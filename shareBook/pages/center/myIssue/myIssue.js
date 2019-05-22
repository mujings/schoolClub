import {
  wxRequest
} from "../../../utils/wxRequest";
import {
  tips
} from "../../../utils/tip";

let isOver = false, //加载所有
  pageStart = 1; //第几页开始加载

Page({
  data: {
    list: [],
    key: 1
  },

  onLoad: function (options) {
    pageStart = 1
    isOver = false
    this.getInfo()
  },

  tabChange(res) {
    // console.log(res)
    isOver = false;
    pageStart = 1;
    this.setData({
      key: res.detail.key,
      list:[]
    })
    this.getInfo();
  },

  getInfo() {
    let that = this;
    if (!isOver) {
      let list = that.data.list;
      wxRequest('/book/uList.wx', {
        pageStart: pageStart,
        state: that.data.key
      }, function (res) {
        if (list.length == res.data.result.pageCount) {
          isOver = true
          tips.toast('已加载所有')
        } else {
          pageStart++
          list = list.concat(res.data.result.data)
          that.setData({
            list: list
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