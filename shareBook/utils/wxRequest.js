import {
    tips
} from "./tip";
const app = getApp();

// var http = 'http://user.xyshare.top/sucaigongxiang-user';//正式域名
var http = 'http://47.103.75.229:8080/sucaigongxiang-user';
// var http = 'http://192.168.1.244/sucaigongxiang-user';

var httpUpload = 'https://hongkedou.file.infotoo.com.cn/kooun-file/file/pic/upload.wx';

function wxRequest(url, data, callback) {
    tips.loading();
    wx.request({
        url: http + url,
        header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Requested-With': 'XMLHttpRequest',
            'userkey': app.globalData.userkey
        },
        method: 'POST',
        data: data,
        success(res) {
            tips.loaded()
            if (res.statusCode == 200) {
                if (res.data.status == 'success') {
                    typeof callback == "function" && callback(res);
                } else if (res.data.status == '401') {
                    tips.confirm(res.data.message).then(
                        function (res) { //确定
                            wx.navigateTo({
                                url: '/pages/login/login?type=' + 1
                            });
                        },
                        function (res) { //取消

                        });
                } else if (res.data.status == '403') {//未认证
                    tips.confirm(res.data.message).then(
                        function (res) { //确定
                            wx.navigateTo({
                                url: '/pages/center/userInfo/userInfo?type=' + 1
                            });
                        },
                        function (res) { //取消

                        });
                } else {
                    tips.toast(res.data.message)
                }
            } else {
                tips.toast('系统繁忙');
            }
        },
        fail() {
            tips.loaded();
            tips.toast('网络崩溃啦');
        }
    });
}

function wxRequestUpload(filePath, callback) {
    tips.loading();
    wx.uploadFile({
        url: httpUpload,
        filePath: filePath,
        name: 'file',
        header: {
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'X-Requested-With': 'XMLHttpRequest',
            'userkey': app.globalData.userkey
        },
        method: 'POST',
        success(res) {
            tips.loaded()
            if (res.statusCode == 200) {
                if (res.data.status == 'success') {
                    typeof callback == "function" && callback(res);
                } else if (res.data.status == '401') {
                    tips.confirm(res.data.message).then(
                        function (res) { //确定
                            wx.navigateTo({
                                url: '/pages/login/login?type=' + 1
                            });
                        },
                        function (res) { //取消

                        });
                } else if (res.data.status == '403') {
                    tips.confirm(res.data.message).then(
                        function (res) { //确定
                            wx.navigateTo({
                                url: '/pages/center/userInfo/userInfo?type=' + 1
                            });
                        },
                        function (res) { //取消

                        });
                } else {
                    tips.toast(res.data.message)
                }
            } else {
                tips.toast('系统繁忙');
            }
        },
        fail() {
            tips.loaded();
            tips.toast('网络崩溃啦');
        }
    });
}

export {
    wxRequest,
    wxRequestUpload,
    http
}