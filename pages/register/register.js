// pages/register/register.js
var app = getApp(); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex:[
      '男',
      '女'
    ],
    shosed_sex:'性别（必填）',
    date:'生日（必填）',
    name:'',
    student_no:'',
    email:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  bind_sex_change:function(e){
    this.setData({
      shosed_sex:this.data.sex[e.detail.value]
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  get_input:function(e){
    // console.log(e.detail.value);
    switch(e.currentTarget.dataset.input){
      case 'name':
        this.setData({
          name:e.detail.value
        })
        break;
      case 'student_no':
        this.setData({
          student_no: e.detail.value
        })
        break;
      case 'email':
        this.setData({
          email: e.detail.value
        })
        break;
      default:
        break;
    }
  },
  register:function(){
    var that = this;
    wx.login({
      success: res => {
        wx.request({
          url: app.globalData.post_url,
          dataType: 'json',
          header: { 'content-type': 'application/json' },
          method: 'POST',
          data: {
            token: "qutcssa",
            data: {
              code: res.code,
              name: that.data.name,
              sex: that.data.shosed_sex,
              student_no: that.data.student_no,
              birthday: that.data.date,
              email: that.data.email
            },
            "type": "A006"
          },
          success: function (res) {
            // console.log(res);
            wx.setStorageSync('token', res.data.msg.token)

            wx.redirectTo({
              url: '../index/index',
            })
          },
          fail: function (res) {
            wx.redirectTo({
              url: '../error/error',
            })
          }
        })
      }
    })
   
  }
})