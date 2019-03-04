// pages/detail/detail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:'',
    shop_id: '',
    hover: [200, 650],
    showCard: false,
    card_no: wx.getStorage({
      key: 'card_no',
      success: function (res) { },
    }),
    card_url: "https://qutcssa.aoaotheone.cn/qutcssa/public/1.png"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载',
      mask: true
    })
    var that = this;
    wx.getStorage({
      key: 'token',
      success: function(res) {
        wx.request({
          url: app.globalData.post_url,
          dataType: 'json',
          header: { 'content-type': 'application/json' },
          method: 'POST',
          data: {
            "token": res.data,
            "type": "A004",
            "data": {
              shop_id: options.id
            }
          },
          success:function(res){
            console.log(res);
            that.setData({
              detail:res.data.msg,
              shop_id: options.id
            })
            wx.hideLoading();
          }
        })
      },
    })
  },
  onPullDownRefresh: function (options) {
    var that = this;
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.request({
          url: app.globalData.post_url,
          dataType: 'json',
          header: { 'content-type': 'application/json' },
          method: 'POST',
          data: {
            "token": res.data,
            "type": "A004",
            "data": {
              shop_id: options.id
            }
          },
          success: function (res) {
            console.log(res);
            that.setData({
              detail: res.data.msg,
              shop_id: options.id
            })
            wx.stopPullDownRefresh()
          }
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  back: function () {
    wx.navigateBack()
  },
  show_official:function(){
    var that = this;
    wx.previewImage({
      urls: [that.data.detail.to],
    })
    console.log(that.data.detail.to)
  },
  collect:function(){
    wx.showLoading({
      title: '正在加载',
      mask: true
    })
    var that = this;
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.request({
          url: app.globalData.post_url,
          dataType: 'json',
          header: { 'content-type': 'application/json' },
          method: 'POST',
          data: {
            "token": res.data,
            "type": "A007",
            "data": {
              shop_id: that.data.shop_id
            }
          },
          success: function (res) {
            that.data.detail.is_collect = that.data.detail.is_collect == 1? 0 : 1
            that.setData({
              detail: that.data.detail
            })
            wx.hideLoading()
          }
        })
      },
    })
  },
  hover_move: function (e) {
    var screenTime = wx.getSystemInfoSync().screenWidth / 750;
    // console.log(e)
    this.setData({
      hover: [e.touches[0].clientY / screenTime - 40, e.touches[0].clientX / screenTime - 40]
    })
  },
  show_card: function () {
    this.setData({
      showCard: true
    })
  },
  hide_card: function () {
    this.setData({
      showCard: false
    })
  }
})