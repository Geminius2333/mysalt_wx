// pages/mine/mine.js
const utilPay = require('../../utils/beePay.js');
const app = getApp();
Page({
  //测试微信支付请求
  wxPay:function(){
    // var shop_no = "20191024308978649d";//小蜜蜂支付的门店号
    // var outTradeNo = shop_no + Date.parse(new Date());
    // var payinfo = {
    //   "Method": "PrePay",
    //   "ShopNo": "20191024308978649d",//门店号
    //   "NonceStr": Date.parse(new Date()),
    //   "OutTradeNo": "123456789",//订单号
    //   "TotalAmount": "10",//金额单位：分
    //   "ChannelType": "WX",//支付渠道
    //   "OpenId": "o0Rq-4ihlwkZEktbh_eo-z7S0s9M",//openId
    //   "SubAppId": "wxe97214b81562b89d",//小程序appid
    // };
    // utilPay.beePay({
    //   "secret": "wD7Ct61VJePUad1KyA2Iz5EYKLO2b8",//支付秘钥
    //   "success": function (res) {
    //     console.log(res);
    //   },
    //   "fail": function (res) {
    //     console.log(res);
    //   },
    //   "payinfo": payinfo
    // });

    // var shop_no = "20191024308978649d";//门店号，小蜜蜂服务平台分配 
    // var outTradeNo = shop_no + Date.parse(new Date());
    // wx.navigateToMiniProgram({
    //   appId: 'wx113f2407af0ed4da',
    //   path: 'pages/pay/index',
    //   extraData: {
    //     "shop_no": shop_no,
    //     "secret": "wD7Ct61VJePUad1KyA2Iz5EYKLO2b8",//支付秘钥，小蜜蜂服务平台分配 
    //     "totalAmount": 0.1 * 100, //金额单位：分
    //     "outTradeNo": outTradeNo
    //   },
    //   envVersion: 'release',
    //   success(res) {
    //     // 打开成功
    //     console.log(res);
    //   }
    // })

    wx.scanCode({
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    });
    wx.request({
      url: 'https://www.baidu.com',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
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