// pages/mine/setting/updatePassword/updatePassword.js
const app = getApp();
const MD5 = require("../../../../utils/md5.js")
Page({

  updatePwdByPhone:function(){
    let that = this;
    let formData = this.data.formData;
    wx.request({
      url: app.globalData.url+'/user/update/password/byVcode',
      data: formData,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        let msg = res.data;
        if (msg.flag == false) {
          console.log(msg.code);
          that.setData({ error: msg.code })
        } else {
          that.loginOut();
        }
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },

  //
  updatePwdByOldPwd:function(){
    let that = this;
    let formData = this.data.formData;
    wx.request({
      url: app.globalData.url + '/user/update/password/byOldPwd',
      data: formData,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        let msg = res.data;
        console.log(msg);
        if(msg.flag == false){
          that.setData({ error: msg.code })
        }
        that.loginOut();
      },
    })
  },

  loginOut:function(){
    app.globalData.user= null,
    wx.switchTab({
      url: '/pages/mine/mine',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },

  submitForm:function(e){
    let formData = this.data.formData;
    let oldPwdForm = this.data.oldPwdForm;
    let userId = this.data.user.id;
    let phone = this.data.user.phone;
    this.setData({'formData.userId':userId,'formData.phone':phone});
    if (oldPwdForm) {
      if (formData.newPwd == formData.confNewPwd) {
        this.updatePwdByOldPwd();
      } else {
        wx.showToast({
          title: "密码不一致",
          icon: "none",
          duration: 500
        })
      }
    } else {
      this.updatePwdByPhone();
    }


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
    let phone = this.data.user.phone;
    wx.request({
      url: app.globalData.url + '/vcode/sms',
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data: { phone: phone, receiverType: 1, type: 2 },
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
  },

  formInputChange: function (e) {
    let { field } = e.currentTarget.dataset;
    let value = e.detail.value;
    if(field != "vcode")
      value = MD5.hexMD5(value);
    this.setData({
      [`formData.${field}`]: value
    });
  },

  switchForm:function(e){
    // console.log(e)
    let oldPwdForm = this.data.oldPwdForm;
    if(oldPwdForm){
      this.setData({oldPwdForm:false})
    }else{
      this.setData({oldPwdForm:true});
    }
  },

  /**
   * 页面的初始数据
   */
  data: {
    time:60,
    oldPwdForm:true,
    formData:{},
    vcodeBtn: 'getVcode',
    vcodeText: '获取验证码',
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
    this.setData({user:app.globalData.user,appUrl:app.globalData.url});
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