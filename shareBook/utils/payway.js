const app = getApp();
import {wxRequest, http} from "./wxRequest";
import {tips} from "../utils/tip";

var pay = {
    //type:(页面跳转)  1-首页, 2-支付成功页, 3-升级成功, 4-预约成功
    /**
     * 钱包支付
     * @param data  参数
     * @param orderId  订单id
     * @param type  跳转页面
     * @param upPackageTitle  升级成功标题
     * @param isNew  1-生成订单付款成功给技师奖励, 0-没有奖励
     * @param formId 发送消息模板的formid
     * @param mesgData 消息模板的相关数据
     * @param cancelType 技师端推单的确认订单支付失败不需要取消订单
     */
    walletpay: function(data, orderId, type, upPackageTitle, isNew, formId, mesgData, cancelType) {
        let that = this;
        // orderType  订单类型   0=服务页下订单, 未使用套餐下单  1=确认订单  2=升级套餐
        wx.request({
            url: http + '/owner/payWallet.wx',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest',
                'userkey': app.globalData.userkey
            },
            method: 'POST',
            data: data,
            success(res) {
                console.log('钱包支付订单');
                if (res.statusCode == 200) {
                    if (res.data.status == 'success') {
                        console.log("app==================");
                        console.log(app);
                        // that.sendMesg(formId, mesgData);
                        if(type == 1) {
                            wx.reLaunch({
                                url: '/pages/index/index'
                            });
                        } else if(type == 2) {
                            wx.reLaunch({
                                url: '/pages/index/successPay'
                            });
                        } else if(type == 3) {
                            let title = upPackageTitle || '';
                            wx.reLaunch({
                                url: '/pages/index/successReser?type=2&title='+title
                            });
                        } else if(type == 4) {
                            wx.reLaunch({
                                url: '/pages/index/successReser?type=1'
                            });
                        } else if(type == 5) {
                                wx.redirectTo({
                                    url: '/pages/person/washCard',
                                });
                        }

                        if(isNew == 1) {
                            that.rewardTechnician();
                        }
                    } else {
                        tips.confirm(res.data.message).then(function () {
                            if(cancelType == 'confirmOrder') {

                            } else {
                                that.getOrderIdMD5(orderId);
                            }

                        });
                    }

                } else if (res.statusCode == 401) {
                    that.getOrderIdMD5(orderId);
                } else {
                    tips.toast('系统繁忙', '', "none");
                    that.getOrderIdMD5(orderId);
                }  //end if
                tips.loaded()
            },
            fail() {
                tips.toast('网络崩溃啦~', '', "none");
                tips.loaded();
                that.getOrderIdMD5(orderId);
            }
        });
    },
    /**
     * 微信支付
     * @param data  参数
     * @param orderId  订单id
     * @param type  跳转页面
     * @param upPackageTitle  升级成功标题
     * @param isNew  1-生成订单付款成功给技师奖励, 0-没有奖励
     * @param formId 发送消息模板的formid
     * @param mesgData 消息模板的相关数据
     * @param cancelType 技师端推单的确认订单支付失败不需要取消订单
     */
    wechatPay: function(carNumber, orderId, type, upPackageTitle, isNew, formId, mesgData, cancelType) {
        let that = this;
        wxRequest('/pay/getOrderPayPrice.wx', {
            openId: app.globalData.openId,
            orderId: orderId,
            carNumber: carNumber
        }, app.globalData.userkey, function (res) {
            console.log('微信支付订单');
            console.log(res);
            if (res.data.status == 'success') {
                wx.requestPayment({
                    'timeStamp': res.data.result.timeStamp,
                    'nonceStr': res.data.result.nonce_str,
                    'package': "prepay_id="+res.data.result.prepay_id,
                    'signType': 'MD5',
                    'paySign': res.data.result.paySign,
                    'success':function(res){
                        // that.sendMesg(formId, mesgData);

                        console.log("微信支付成功==============");
                        console.log(res);
                        if(type == 1) {
                            wx.reLaunch({
                                url: '/pages/index/index'
                            });
                        }else if(type == 2) {
                            wx.reLaunch({
                                url: '/pages/index/successPay'
                            });
                        }else if(type == 3) {
                            wx.reLaunch({
                                url: '/pages/index/successReser?type=2&title='+upPackageTitle
                            });
                        }else if(type == 4) {
                            wx.reLaunch({
                                url: '/pages/index/successReser?type=1'
                            });
                        } else if(type == 5) {
                            wx.redirectTo({
                                url: '/pages/person/washCard',
                            });
                        }

                        if(isNew == 1) {
                            that.rewardTechnician();
                        }
                    },
                    'fail':function(res){
                        tips.confirm('支付失败').then(function () {
                            if(cancelType == 'confirmOrder') {

                            } else {
                                that.getOrderIdMD5(orderId);
                            }
                        });
                    }
                });
            } else {
                tips.confirm(res.data.message).then(function () {
                    that.getOrderIdMD5(orderId);
                });
            }
        });
    },
    getOrderIdMD5: function (orderId, type) {
        let that = this;
        wxRequest('/pay/getOrderIdMD5.wx', {orderId: orderId}, app.globalData.userkey, function(res){
            console.log(res);
            if(res.data.status == 'success'){
                that.removeOrder(orderId, res.data.result, type);
            }
        });
    },
    //取消订单
    removeOrder: function (orderId, orderIdMD5, type) {
        let that = this;
        wxRequest('/order/cannelOrder.wx', {orderId: orderId, orderIdMD5: orderIdMD5}, app.globalData.userkey, function (res) {
            console.log('取消订单');
            console.log(res);
            if (res.data.status == 'success') {
                setTimeout(function () {
                    if(type != 1) {   //服务购买取消支付 , 不做跳转
                        wx.reLaunch({
                            url: '/pages/index/index'
                        });
                    }
                }, 1000)
            } else {
                tips.confirm(res.data.message);
            }
        });
    },

    /**
     * 付款成功发送消息模板
     * @param formId  form表单生成的form_id
     * @param data  模板数据
     */
    sendMesg: function (formId, data) {
        let that = this;
        wx.request({
            url: http + '/message/getTemplate',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest',
                'userkey': app.globalData.userkey
            },
            method: 'POST',
            data: {
                templateId: '_nq4E3-W69HxR0FwDmCcN8vdnm6JBv4Xiwopdw4MH-8',
                formId: '1537238588492',
                dataJson: JSON.stringify(data)
            },
            success(res) {
                console.log("发送消息模版==");
                console.log(res);
                // if (res.statusCode == 200) {
                //     console.log("成功");
                // } else if (res.statusCode == 401) {
                //     console.log("登录失效");
                // } else {
                //     console.log("系统繁忙");
                // }  //end if
                // tips.loaded()
            },
            fail() {
                // console.log("网络崩溃啦~");
            }
        });
    },

    //首次下单给技师奖励
    rewardTechnician: function () {
        let that = this;
        wxRequest('/order/reWardTechnician.wx', {}, app.globalData.userkey, function (res) {
            console.log("首次下单给技师奖励");
            console.log(res);
            if (res.data.status == 'success') {

            } else {
                // tips.confirm(res.data.message);
            }
        });
    },
}


export {
    pay
}

