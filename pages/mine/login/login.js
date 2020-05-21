//login.js
//获取应用实例
const app = getApp()
const MD5 = require("../../../utils/md5.js");
Page({
  
  //微信登录
  loginByWx:function(e){
    console.log(e);
    let that = this;
    let wxUserInfo={};
    //获取用户信息
    wx.getUserInfo({
      success: function (res) {
        // success
        wxUserInfo = res.userInfo;
        // console.log(wxUserInfo)
        that.setData({wxUserInfo:wxUserInfo});
        //登录
        wx.login({
          success: function(res){
            var code = res.code;
            // console.log(code);
            if(code){
              //发送code到服务器
              wx.request({
                url: app.globalData.url+"/wx/login",
                data: {code,wxUserInfo:that.data.wxUserInfo},
                method: 'POST',
                success: function(res){
                  // success
                  let msg = res.data;
                  let user = msg.data;
                  console.log(msg)
                  app.globalData.user = user;
                  that.setData({user:user});
                  wx.switchTab({
                    url: '/pages/mine/mine',
                  })
                },
              })
            }
          },
          fail: function() {
            // fail
            console.log("获取code失败："+res.errorMsg);
          },
        });
      },
      //用户取消授权
      fail:function(res){
        console.log('fail:',res.errMsg);
      },
    });

  },

  //用户登录
  userLogin: function (e) {
    console.log(e)
    let that = this;
    let formData = this.data.formData;
    this.setData({'formData.loginByPhone':this.data.loginByPhone})
    wx.request({
      url: app.globalData.url + '/user/login',
      method: "POST",
      data: formData,
      success: res => {
        var msg = res.data;
        if (msg.flag == false) {
          console.log(msg.code);
          that.setData({error:msg.code})
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
  },

  //验证码计时开始
  startSetInter: function () {
    let that = this;
    let time = that.data.time;
    that.data.interval = setInterval(function () {
      time = time - 1;
      that.setData({ time: time, vcodeText: that.data.time - 1 + 's' });
      console.log("时间：" + that.data.time);
      if (that.data.time - 1 < 0) {
        clearInterval(that.data.interval);
        that.setData({ vcodeText: '获取验证码', vcodeBtn: 'getVcode', time: 60 });
      }
    }, 1000, time);
  },

  //获取验证码
  getVcode: function (e) {
    let that = this;
    let phone = this.data.formData.phone;
    let reg = /^1[3|4|5|6|7|8]\d{9}$/;;
    if (reg.test(phone)) {
      wx.request({
        url: app.globalData.url + '/vcode/sms',
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        data: { phone: phone, receiverType: 1 ,type:1},
        success: function (res) {
          // success
          wx.showToast({
            title: "已发送",
            duration: 500,
            icon: 'success'
          })
        },
      });
      that.setData({ vcodeBtn: '' })
      that.startSetInter();
    } else {
      that.setData({ error: '请检查手机号！' });
    }
  },

  formInputChange: function (e) {
    let { field } = e.currentTarget.dataset;
    let value = e.detail.value;
    if(field=="password")
      value = MD5.hexMD5(value);
    this.setData({
      [`formData.${field}`]: value
    });
    // console.log(this.data.formData);
  },

  //跳转到注册
  toRegister: function () {
    wx.navigateTo({
      url: '../register/register',
    })
  },

  switchLogin:function(){
    let loginByPhone = this.data.loginByPhone;
    if(loginByPhone){
      this.setData({loginByPhone:false,'formData.vcode':null});
    }else{
      this.setData({loginByPhone:true,'formData.password':null});
    }
  },
  data: {
    time:60,
    loginByPhone:true,
    vcodeBtn:'getVcode',
    vcodeText:'获取验证码',
    formData:{
      phone:'15558970280',
    },
    wxUserInfo:{},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {

    this.setData({ appUrl: app.globalData.url });
  },
  /**
 * 生命周期函数--监听页面初次渲染完成
 */
  onReady: function () {
    // this.getSession();
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
    clearInterval(this.data.interval);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.data.interval);
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

  }

})
