// pages/mine/mine.js
const app = getApp();
Page({
  //测试微信支付请求
  wxPay:function(){
    wx.requestPayment({
      timeStamp: new Date(),
      nonceStr: '12345',
      package: 'prepay_id=123456',
      signType: 'MD5',
      paySign: '',
      success(res) {
        console.log(res)
       },
      fail(res) { 
        console.log(res)
      }
    })
  },

  //跳转到订单页面
  toOrderPage:function(e){
    console.log(this.data.user);
    let nav = e.currentTarget.dataset.nav;
    if(this.data.user==null){
      wx.showToast({title:"还没有登录！",icon:"none",duration:500});
    }
    else{
      wx.navigateTo({
         url:'/pages/order/order',
        // url: '/pages/order/add/add',
        success: function (res) {
          // success
          res.eventChannel.emit('nav', { data: nav });
        },
      })
    }

  },

  //跳转到注册页面
  toRegister:function(){
    wx.navigateTo({
      url:'register/register',
    })
  },

  //跳转到登录页面
  toLogin:function(){
    wx.navigateTo({
      url:'login/login',
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    user :null,
    appUrl:null,
    pages:{
      none:'',
      recAddress: '../recAddress/recAddress',
      setting:'/pages/mine/setting/setting',
      history:'/pages/mine/history/history',
      help:'/pages/mine/help/help',
      orders:'../order/order',
    },
    waitPay:"/resource/icons/mine/支付.jpg",
    iconPath:{
      waitPay:"/resource/icons/mine/支付.jpg",
      waitDisp:"/resource/icons/mine/包裹.jpg"
    },
    //menu-list
    icon:"/resource/icons/mine/baoguo.png",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.setData({user:app.globalData.user});
    // console.log(user);
    this.setData({ appUrl: app.globalData.url});
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
    this.setData({ user: app.globalData.user});
    //console.log(user);
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