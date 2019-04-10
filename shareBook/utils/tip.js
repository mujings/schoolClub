/**
 * 提示与加载工具类
 */
var tips = {
    toast(title) {
        return new Promise((resolve, reject) => {
            wx.showToast({
                title: title,
                icon: 'none',
                success: res => {
                    resolve(res);
                },
                fail: res => {
                    reject(res);
                }
            });
        })
    },

    confirm(text, title = "提示") {
        return new Promise((resolve, reject) => {
            wx.showModal({
                title: title,
                content: text,
                success: res => {
                    if (res.confirm) {
                        resolve(res);
                    } else if (res.cancel) {
                        reject(res);
                    }
                },
                fail: res => {
                    reject(res);
                }
            });
        });
    },

    confirmNoCancel(text, title = "提示") {
        return new Promise((resolve, reject) => {
            wx.showModal({
                title: title,
                content: text,
                showCancel: false,
                success: res => {
                    if (res.confirm) {
                        resolve(res);
                    } else if (res.cancel) {
                        reject(res);
                    }
                },
                fail: res => {
                    reject(res);
                }
            });
        });
    },

    loading(title = "加载中") {
        wx.showLoading({
            title: title,
            mask: true
        });
    },

    loaded() {
        return new Promise((resolve, reject) => {
            wx.hideLoading({
                success: res => {
                    resolve(res);
                },
                fail: res => {
                    reject(res);
                }
            });
        })
    }
}

export {
    tips
}