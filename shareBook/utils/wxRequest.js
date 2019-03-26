import {
    tips
} from "./tip";
const app = getApp();

// var http = 'http://192.168.1.124:8080/kooun-hongkedou-user'; //喜沛

// var http = 'http://47.106.197.214:8083/kooun-hongkedou-user';//测试

var http = 'https://hongkedou.user.infotoo.com.cn/kooun-hongkedou-user';//正式域名

var httpUpload = 'https://hongkedou.file.infotoo.com.cn/kooun-file/file/pic/upload.wx';

var mapHttp = 'https://restapi.amap.com';

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
            if (res.statusCode == 200) {
                if (res.data.status == '401') {
                    tips.confirm(res.data.message).then(
                        function (res) { //确定
                            wx.navigateTo({
                                url: '/pages/login/login'
                            });
                        },
                        function (res) { //取消

                        });
                } else if (res.data.status == 0) {
                    wx.navigateTo({
                        url: '/pages/weChatLogin?code=0'
                    });
                } else {
                    typeof callback == "function" && callback(res);
                }
                tips.loaded()
            } else {
                tips.toast('系统繁忙', '', "none");
                tips.loaded()
            }
        },
        fail() {
            tips.toast('网络崩溃啦~', '', "none");
            tips.loaded();
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
            if (res.statusCode == 200) {

                typeof callback == "function" && callback(res);

            } else if (res.statusCode == 401) {
                tips.confirm('登录失效，请重新登录！').then(
                    function (res) {
                        wx.navigateTo({
                            url: '/pages/login/login'
                        });
                    }
                );
            } else {
                tips.toast('系统繁忙', '', "none");
            }
            tips.loaded();
        },
        fail() {
            tips.toast('网络崩溃啦~', '', "none");
            tips.loaded();
        }
    });
}

// 高德地图请求接口
function mapApi(url, data, callback) {
    wx.request({
        url: mapHttp + url,
        method: "POST",
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
        success: function (res) {
            if (res.data.status == "1") {

                typeof callback == "function" && callback(res);

            } else {
                tips.toast('系统繁忙', '', "none");
            }
        },
        fail: function (res) {
            tips.toast('网络崩溃啦~', '', "none");
        }
    })
}

export {
    wxRequest,
    wxRequestUpload,
    mapApi,
    http
}