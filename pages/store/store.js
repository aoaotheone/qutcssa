// pages/store/store.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    top_tab: [
      {
        'text': "首字母",
        status: true
      },
      {
        'text': "分类",
        status: false
      },
      {
        'text': "收藏",
        status: false
      }
    ],
    store:[],
    store_class:[],
    class_show: false,
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
    })
    var that = this;
    var store_class = [];
    wx.getStorage({
      key: 'token',
      success: function(res) {
        wx.request({
          url: app.globalData.post_url,
          dataType: 'json',
          header: { 'content-type': 'application/json' },
          method: 'POST',
          data: {
            token: res.data,
            data: '',
            "type": "A008"
          },
          success: function (res) {
            store_class = res.data.msg
            for (let i = 0; i < store_class.length; i++) {
              store_class[i].status = false;
            }
            wx.hideLoading()
          },
          fail: function (res) {
            wx.redirectTo({
              url: '../error/error',
            })
          }
        })
        wx.request({
          url: app.globalData.post_url,
          dataType: 'json',
          header: { 'content-type': 'application/json' },
          method: 'POST',
          data: {
            token: res.data,
            data: '',
            "type": "A003"
          },
          success: function (res) {
            // console.log(res)
           
            setTimeout(function () {
              
              that.setData({
                store: res.data.msg,
                store_class: store_class
              })
            }, 100)
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
  onPullDownRefresh: function (options) {
    var that = this;
    var store_class = [];
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.request({
          url: app.globalData.post_url,
          dataType: 'json',
          header: { 'content-type': 'application/json' },
          method: 'POST',
          data: {
            token: res.data,
            data: '',
            "type": "A008"
          },
          success: function (res) {
            store_class = res.data.msg
            for (let i = 0; i < store_class.length; i++) {
              store_class[i].status = false;
            }
          },
          fail: function (res) {
            wx.redirectTo({
              url: '../error/error',
            })
          }
        })
        wx.request({
          url: app.globalData.post_url,
          dataType: 'json',
          header: { 'content-type': 'application/json' },
          method: 'POST',
          data: {
            token: res.data,
            data: '',
            "type": "A003"
          },
          success: function (res) {
            // console.log(res)

            setTimeout(function () {

              that.setData({
                store: res.data.msg,
                store_class: store_class
              })
              wx.stopPullDownRefresh()
            }, 100)
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
  back:function(){
    wx.navigateBack()
  },
  tab:function(e){
    // console.log(e.currentTarget.dataset.tab);
    switch (e.currentTarget.dataset.tab) {
      case 0:
        for (let i = 0; i < this.data.store_class.length; i++) {
          this.data.store_class[i].status = false;
        }
        this.setData({
          top_tab: [
            {
              'text': "首字母",
              status: true
            },
            {
              'text': "分类",
              status: false
            },
            {
              'text': "收藏",
              status: false
            }
          ],
          store_class: this.data.store_class
          
        })
        wx.showLoading({
          title: '正在加载',
          mask: true
        })
        var that = this
        wx.getStorage({
          key: 'token',
          success: function (res) {

            wx.request({
              url: app.globalData.post_url,
              dataType: 'json',
              header: { 'content-type': 'application/json' },
              method: 'POST',
              data: {
                token: res.data,
                data: '',
                "type": "A003"
              },
              success: function (res) {

                that.setData({
                  store: res.data.msg,
                })
                that.hide_class()
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
        break;
      case 1:
        this.setData({
          top_tab: [
            {
              'text': "首字母",
              status: false
            },
            {
              'text': "分类",
              status: true
            },
            {
              'text': "收藏",
              status: false
            }
          ],
          class_show:true
        })
        break;
      case 2:
        for (let i = 0; i < this.data.store_class.length; i++) {
          this.data.store_class[i].status = false;
        }
        this.setData({
          top_tab: [
            {
              'text': "首字母",
              status: false
            },
            {
              'text': "分类",
              status: false
            },
            {
              'text': "收藏",
              status: true
            }
          ],
          store_class: this.data.store_class
        })
        wx.showLoading({
          title: '正在加载',
          mask: true
        })
        var that = this
        wx.getStorage({
          key: 'token',
          success: function (res) {

            wx.request({
              url: app.globalData.post_url,
              dataType: 'json',
              header: { 'content-type': 'application/json' },
              method: 'POST',
              data: {
                token: res.data,
                data: '',
                "type": "A009"
              },
              success: function (res) {
                wx.hideLoading()
                if(res.data.code == 200){
                  that.setData({
                    store: res.data.msg,
                  })
                }else{
                  that.setData({
                    store: "空空如也",
                  })
                }
              },
              fail: function (res) {
                wx.redirectTo({
                  url: '../error/error',
                })
              }
            })
          },
        })
        break;
      default:
        break;
    }
  },
  tab_class: function (e) {
    // console.log(e.currentTarget.dataset.tab);
    let _store_class = this.data.store_class
    for(let i = 0;i<_store_class.length;i++){
      _store_class[i].status = _store_class[i].status
    }
    _store_class[e.currentTarget.dataset.tab].status = true
    this.setData({
      store_class: _store_class
    })
    this.load_type(_store_class[e.currentTarget.dataset.tab].type)
    
  },
  load_type: function (type){
    wx.showLoading({
      title: '正在加载',
      mask: true
    })
    var that = this
    wx.getStorage({
      key: 'token',
      success: function (res) {
        
        wx.request({
          url: app.globalData.post_url,
          dataType: 'json',
          header: { 'content-type': 'application/json' },
          method: 'POST',
          data: {
            token: res.data,
            data: {
              "type": type
            },
            "type": "A005"
          },
          success: function (res) {
            wx.hideLoading()
            if(res.data.code == 200){
              that.setData({
                store: res.data.msg,
              })
            }else{
              that.setData({
                store: "空空如也",
              })
            }
            that.hide_class()
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
  hide_class:function(e){
    this.setData({
      class_show: false
    })
  },
  show_shop: function (e) {
    wx.navigateTo({
      url: '../detail/detail?id=' + e.currentTarget.dataset.shop_id,
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