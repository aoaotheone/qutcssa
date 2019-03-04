//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    hover:[200,650],
    showCard:false,
    card_no: wx.getStorage({
      key: 'card_no',
      success: function(res) {},
    }),
    card_url: "https://qutcssa.aoaotheone.cn/qutcssa/public/1.png"
  },
  onLoad:function(){
    wx.showLoading({
      title: '正在加载',
      mask: true
    })
    var that = this;
    wx.getStorage({
      key: 'token',
      success: function(res) {
        // console.log(res.data)
        wx.request({
          url: app.globalData.post_url, 
          dataType: 'json',
          header: { 'content-type': 'application/json' },
          method: 'POST',
          data: {
            token: res.data,
            data: '',
            "type": "A002"
          },
          success: function (res) {
            console.log(res);
            that.setData({
              imgUrls:res.data.msg.up,
              daily: res.data.msg.down,
              bottom: res.data.msg.bottom,
              card_no: res.data.msg.card_no
            })
            wx.setStorage({
              key: 'card_no',
              data: res.data.msg.card_no,
            })
            wx.hideLoading()
          },
          fail: function (res) {
            wx.redirectTo({
              url: '../error/error',
            })
          }
        })
      },
    })
  },
  onPullDownRefresh:function(){
    var that = this;
    wx.getStorage({
      key: 'token',
      success: function (res) {
        // console.log(res.data)
        wx.request({
          url: app.globalData.post_url,
          dataType: 'json',
          header: { 'content-type': 'application/json' },
          method: 'POST',
          data: {
            token: res.data,
            data: '',
            "type": "A002"
          },
          success: function (res) {
            // console.log(res);
            that.setData({
              imgUrls: res.data.msg.up,
              daily: res.data.msg.down,
              bottom: res.data.msg.bottom              
            })
            wx.setStorage({
              key: 'card_no',
              data: res.data.msg.card_no,
            })
            wx.stopPullDownRefresh()
          },
          fail: function (res) {
            wx.redirectTo({
              url: '../error/error',
            })
            wx.stopPullDownRefresh()
          }
        })
      },
    })
    
  },
  go_to_stores:function(){
    wx.navigateTo({
      url: '../store/store',
    })
  },
  show_shop:function(e){
    wx.navigateTo({
      url: '../detail/detail?id=' + e.currentTarget.dataset.shop_id,
    })
  },
  show_public:function(){
    // console.log(this.data.bottom)
    var that = this;
    wx.previewImage({
      urls: [that.data.bottom[0]]
    })
  },
  show_service: function () {
    var that = this;
    wx.previewImage({
      urls: [that.data.bottom[1]]
    })
  },
  hover_move:function(e){
    var screenTime = wx.getSystemInfoSync().screenWidth / 750;
    // console.log(e)
    this.setData({
      hover: [e.touches[0].clientY / screenTime - 40, e.touches[0].clientX / screenTime - 40]
    })
  },
  show_card:function(){
    this.setData({
      showCard: true
    })
  },
  hide_card:function(){
    this.setData({
      showCard: false
    })
  }
})
