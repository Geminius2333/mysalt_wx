//login.js
//获取应用实例
const app = getApp()

Page({
  //测试函数
  testA:function(){
    wx.getSetting({
      success: function (res) {
        console.log(res)
        if (!res.authSetting['scope.userInfo']) {
          console.log("获取用户信息权限")
          wx.authorize({
            scope: 'scope.userInfo',
            success: function (res) {
              console.log(res)
              wx.getUserInfo({
                success: function (res) {
                  console.log(res)
                },
                fail: function () {
                  // fail
                },
              })
            }
          })
        }
      }
    })
  },

  //微信登录
  loginByWx:function(){
    wx.login({
      success: function(res){
        // success
        var code = res.code;
        console.log(code);
        if(code){
          //发送code到服务器
          wx.request({
            url: app.globalData.url+"/wx/login",
            data: code,
            method: 'POST',
            success: function(res){
              // success
              console.log(res)
              //

              //
            },
            fail: function() {
              // fail
              console.log("发送code失败:"+res.data);
            },
          })
        }

      },
      fail: function() {
        // fail
        console.log("获取code失败："+res.errorMsg);
      },
      complete: function() {
        // complete
      }
    });
  },

  toRegister:function(){
    wx.navigateTo({
      url: '../register/register',
    })
  },

  //用户登录
  userLogin: function (e) {
    wx.request({
      url: app.globalData.url + '/user/login',
      method: "GET",
      data: e.detail.value,
      success: res => {
        var msg = res.data;
        if (msg.flag == false) {
          console.log(msg.code);
        } else {
          app.globalData.user = msg.data;
          console.log(app.globalData.user)
          wx.switchTab({
            url: '/pages/mine/mine',
          })
        }
      },
      fail: res => {
        console.log(res);
      }

    })
    // console.log(e.detail);
  },

  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
