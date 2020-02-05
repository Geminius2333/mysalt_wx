// pages/mine/setting/userInfo/userInfo.js
const app =getApp();
Page({
  submitForm:function(){
    let id = this.data.user.id;
    let formData = this.data.formData;
    this.setData({'formData.id':id})
    wx.request({
      url: app.globalData.url +'/user/update/userInfo',
      data: formData,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        let msg = res.data;
        console.log(msg)
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
    this.setData({
      [`formData.${field}`]: value
    });

    if(this.data.formData.phone!=this.data.user.phone){
      this.setData({vcodeFlag:true})
    }else{
      this.setData({vcodeFlag:false})
    }
    // console.log(this.data.vcodeFlag)
    // let password = this.data.formData.password;
    // let cpassword = this.data.formData.cpassword;
    // let phone = this.data.formData.phone;
    // let vcode = this.data.formData.vcode;
    // if (phone.trim() != "" && vcode.trim() != "" && cpassword.trim() != "" && password.trim() != "") {
    //   this.setData({ submitBtn: false });
    // }
    // if (field == "cpassword" || field == "password") {
    //   if (password != cpassword) {
    //     this.setData({ error: '密码不一致', submitBtn: true })
    //   }
    // }
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

  }
})