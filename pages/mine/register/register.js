// pages/mine/register/register.js
//导入验证js
import WxValidate from "../../../utils/WxValidate.js";
const md5 = require('../../../utils/md5.js');
const common = require('../../../utils/common.js');
const app = getApp();
Page({

  registerUser:function(){
    console.log("注册用户");
    console.log(this.data.formData);
    let that = this;
    let formData = this.data.formData;
    let sessionId = wx.getStorageSync("sessionId");
    wx.request({
      url: app.globalData.url+'/user/register',
      data: { phone: formData.phone, password: md5.hexMD5(formData.password),vcode:formData.vcode},
      method: 'POST',
      header: {
        'Cookie': sessionId
      },
      success: function(res){
        // success
        let msg = res.data;
        console.log(msg);
        if(msg.flag){
          wx.showToast({
            title:'注册成功！',
            duration:500,
            icon:'none'
          })
          common.toLoginPage();
        }else{
          that.setData({error:msg.code});
        }
      },
    })
  },

  submitForm:function(e){
    const params = this.data.formData;
    console.log(params)
    // 传入表单数据，调用验证方法
    if (!this.WxValidate.checkForm(params)) {
      console.log(this.WxValidate.errorList);
      this.setData({ error: this.WxValidate.errorList[0].msg })
      return false
    } else {
      //wx.showToast({title:"验证成功！"});
      this.registerUser();
    }
  },

  //获取验证码
  getVcode:function(e){
    let that = this;
    let phone = this.data.formData.phone;
    let sessionId = wx.getStorageSync("sessionId");
    let reg = /^1[3|4|5|6|7|8]\d{9}$/; ;
    if(reg.test(phone)){
      wx.request({
        url: app.globalData.url + '/vcode/sms',
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        data:{phone:phone,receiverType:1,type:0},
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
    }else{
      that.setData({error:'请检查手机号！'});
    }
  },
  //获取session
  getSession:function(){
    wx.request({
      url: app.globalData.url+'/wx/getSession',
      data: {},
      method: 'GET', 
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        let msg = res.data;
        console.log(msg)
        wx.setStorageSync('sessionId', 'JSESSIONID='+msg.data);
      },
    })
  },
  //验证码计时开始
  startSetInter:function(){
    let that = this;
    let time = that.data.time;
    that.data.interval = setInterval(function(){
      time = time-1;
      that.setData({time:time,vcodeText:that.data.time-1+'s'});
      console.log("时间："+that.data.time);
      if(that.data.time-1<0){
        that.clearInter();
        that.setData({vcodeText:'获取验证码',vcodeBtn:'getVcode',time:60});
      }
    },1000,time);
  },
  //关闭计时器
  clearInter:function(){
    let that = this;
    clearInterval(that.data.interval);
  },

  //验证函数
  initValidate() {
    const rules = {
      phone: {
        required: true,
        tel: true
      },
      vcode: {
        required: true,
        minlength:6,
        maxlength: 6
      },
      password: {
        required: true,
        minlength: 6,
        maxlength: 20
      }
    }
    const messages = {
      phone: {
        required: '请填写手机号',
        tel: '请填写正确的手机号'
      },
      vcode: {
        required: '请填写验证码',
        minlength: '验证码长度应为6位',
        maxlength: '验证码长度应为6位',
      },
      password: {
        required: '请填写密码',
        minlength: '密码为6-20位，英文+数字',
        maxlength: '密码为6-20位，英文+数字',
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },
  formInputBlur:function(e){
    // let password = this.data.formData.password;
    // let cpassword = this.data.formData.cpassword;
    // if(password != cpassword){
    //   this.setData({ error: '密码不一致',submitBtn:true})
    // }
  },
  formInputChange:function(e){
    let { field } = e.currentTarget.dataset;
    this.setData({
      [`formData.${field}`]: e.detail.value
    });
    //console.log(this.data.formData);

    let password = this.data.formData.password;
    let cpassword = this.data.formData.cpassword;
    let phone = this.data.formData.phone;
    let vcode = this.data.formData.vcode;
    if (phone.trim() != "" && vcode.trim() != "" && cpassword.trim() != "" && password.trim() != "") {
      this.setData({ submitBtn: false });
    }
    if(field =="cpassword" || field =="password"){
      if (password != cpassword) {
        this.setData({ error: '密码不一致', submitBtn: true })
      }
    }
  },

  toLoginPage:function(){
    wx.navigateTo({
      url: '/pages/mine/login/login',
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

  /**
   * 页面的初始数据
   */
  data: {
    appUrl:null,
    formData:{phone:"",vcode:"",password:"",cpassword:""},
    vcodeBtn:'getVcode',
    vcodeText:'获取验证码',
    submitBtn:true,
    interval:'',
    time:60,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initValidate();
    this.setData({appUrl:app.globalData.url});
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