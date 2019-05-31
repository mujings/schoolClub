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
    key: '3',
    list: []
  },

  onLoad: function (options) {
    pageStart = 1
    isOver = false
    this.getInfo()
  },

  onTabsChange(e) {
    const {
      key
    } = e.detail
    this.setData({
      key,
      list:[]
    })
    pageStart = 1
    isOver = false
    this.getInfo();
  },

  getInfo() {
    if (!isOver) {
      let that = this;
      let list = that.data.list;
      wxRequest('/order/list.wx', {
        pageStart: pageStart,
        status: that.data.key
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