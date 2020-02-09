// pages/mine/setting/userInfo/userInfo.js
const app =getApp();
Page({

  submitForm:function(){
    let that = this;
    let id = this.data.user.id;
    let formData = this.data.formData;
    let isChangePhone = this.data.vcodeFlag;
    let vcode = this.data.vcode;
    this.setData({'formData.id':id})
    wx.request({
      url: app.globalData.url +'/user/update/userInfo',
      data: { formData, vcode, isChangePhone},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        let msg = res.data;
        console.log(msg)
        if(!msg.flag){
          that.setData({error:msg.code});
        }
        that.setData({user:msg.data});
        app.globalData.user = msg.data;
        wx.navigateBack({
          delta: 1, // 回退前 delta(默认为1) 页面
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
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
    } else {
      that.setData({ error: '请检查手机号！' });
    }
  },

  chooseImage:function(e){
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res){
        // success
        console.log(res)
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },

  bindGenderChange:function(e){
    console.log(e)
    let index = e.detail.value;
    let gender = this.data.genders[index];
    this.setData({"formData.gender":index,genderIndex:index});
  },

  formInputChange: function (e) {
    let { field } = e.currentTarget.dataset;
    let value = e.detail.value;
    if(field=="vcode"){
      this.setData({vcode:value});
    }else{
      this.setData({
        [`formData.${field}`]: value
      });
    }
    console.log(this.data)
    if(field=="phone"){
      if (this.data.formData.phone != this.data.user.phone) {
        this.setData({ vcodeFlag: true })
      } else {
        this.setData({ vcodeFlag: false })
      }
    }
  },


  switchDisabled:function(){
    if(this.data.disabled){
      this.setData({disabled:false})
    }else{
      this.setData({disabled:true})
    }
  },

  /**
   * 页面的初始数据
   */
  data: {
    time:60,
    vcodeBtn: 'getVcode',
    vcodeText: '获取验证码',
    disabled:true,
    vcodeFlag:false,
    formData:{},
    genders: ["未知", "男", "女"],
    genderIndex: 0,
    
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
    this.setData({user:app.globalData.user,
        appUrl:app.globalData.url,
      genderIndex:app.globalData.user.gender});
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