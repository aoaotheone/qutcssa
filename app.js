//app.js
App({
  onLaunch: function () {

    // 登录
    wx.login({
      success: res => {
        
        wx.request({
          url: this.globalData.post_url,
          dataType: 'json',
          header: { 'content-type': 'application/json' },
          method: 'POST',
          data:{
            token: "qutcssa",
            type: "A001",
            data: {
              code: res.code
            }
          },
          success: function (res0) {
            if (res0.data.code == 200) {
              wx.setStorageSync('token', res0.data.msg.token)
            } else if (res0.data.code == 300) {
              setTimeout(function(){
                wx.redirectTo({
                  url: '../register/register',
                })
              },200)
            } else {
              setTimeout(function () {
                wx.redirectTo({
                  url: '../error/error',
                })
              }, 200)
            }
          },
          fail:function(res){
            wx.redirectTo({
              url: '../error/error',
            })
          }
        })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
      fail: res => {
        wx.redirectTo({
          url: '../error/error',
        })
      }
    })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  globalData: {
    userInfo: null,
    post_url:'https://qutcssa.aoaotheone.cn/qutcssa/public/index.php/index'
  },
  
})