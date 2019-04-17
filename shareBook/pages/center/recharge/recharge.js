import { $wuxDialog } from '../../../dist/index'
Page({
  data: {

  },

  onLoad: function (options) {

  },

  onShow: function () {

  },

  recharge(e){
    console.log(e)
    let that = this;
    that.prompt()
  },

  prompt() {
    const alert = (content) => {
        $wuxDialog('#wux-dialog').alert({
            resetOnClose: true,
            title: '提示',
            content: content,
        })
    }

    $wuxDialog().prompt({
        resetOnClose: true,
        title: '请输入密码',
        content: '初始密码为666666',
        fieldtype: 'number',
        password: !0,
        defaultText: '',
        placeholder: '请输入密码',
        maxlength: 6,
        onConfirm(e, response) {
            if(response.length != 6){
            alert(`请输入正确的六位数字密码`)
          }
        },
    })
},
})