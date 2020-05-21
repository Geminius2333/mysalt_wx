// pages/mine/mine.js
const utilPay = require('../../utils/beePay.js');
const md5 = require('../../utils/md5.js');
const app = getApp();
Page({
  Test:function(){
    console.log("test");
    let timeStamp = '1490840662';
    let nonceStr = '5K8264ILTKCH16CQ2502SI8ZNMTM67VS';
    let packageStr = 'wx2017033010242291fcfe0db70013231072';
    let paySignTemp = 'appId=wxe97214b81562b89d&nonceStr=5K8264ILTKCH16CQ2502SI8ZNMTM67VS&package=prepay_id=wx2017033010242291fcfe0db70013231072&signType=MD5&timeStamp=1490840662&key=qazwsxedcrfvtgbyhnujmikolp111111'
    let paySign = md5.hexMD5(paySignTemp).toUpperCase();
    console.log(paySign)
    wx.requestPayment({
      timeStamp:timeStamp,
      nonceStr:nonceStr,
      package:packageStr,
      signType:'MD5',
      paySign:paySign,
      success:(res)=>{

      },
      fail:(err)=>{
        console.log(err);
      }
    })
  },

  //测试微信支付请求
  wxPay:function(){
    console.log("支付")

    var shop_no = "20191024308978649d";//小蜜蜂支付的门店号
    var outTradeNo = shop_no + Date.parse(new Date());
    var payinfo = {
      "Method": "PrePay",
      "ShopNo": "20191024308978649d",//门店号
      "NonceStr": Date.parse(new Date()),
      "OutTradeNo": "123456789",//订单号
      "TotalAmount": "10",//金额单位：分
      "ChannelType": "WX",//支付渠道
      "OpenId": "o0Rq-4ihlwkZEktbh_eo-z7S0s9M",//openId
      "SubAppId": "wxe97214b81562b89d",//小程序appid
    };
    wx.navigateToMiniProgram({
      appId: 'wx6c2423928b92ca14',
      path: 'pages/index/index',
      extraData: {
        'aid': '1',
        'name': '盐吧商城支付',
        'pay_type': 'jsapi',
        'price': '0.02',
        'order_id': 'm-5',
        'notify_url': 'https://abc.com/notify',
        'sign': md5.hexMD5('盐吧商城支付' + 'jsapi' + '0.02' + 'm-5' + 'https://abc.com/notify' + 'app secret'),
      },
      //envVersion: 'develop',
      fail(res) {
        wx.showToast({
          title: res.errMsg,
          icon: 'none',
        });
      },
      success(res) {
        wx.showToast({
          title: 'ok',
          icon: 'none',
        });
      },
    });
  },

  //获取订单量信息
  getOrdersCountInfo:function(){
    let that = this;
    wx.request({
      url:app.globalData.url+'/orders/user/getOrdersCountByStatus',
      data:{'userId':that.data.user.id},
      success:res=>{
        console.log(res.data);
        let msg = res.data;
        let data = msg.data;
        that.setData({waitDispOrdersCount:data[2].count,waitRecOrdersCount:data[3].count})
      },
      fail:res=>{
        console.log(res);
      }
    });
    this.setData({waitDispOrdersCount:2,waitRecOrdersCount:3});
  },

  showNotLoginToast:function(){
    if(this.data.user==null){
      wx.showToast({title:"还没有登录！",icon:"none",duration:500});
    }
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
         url:'/pages/orders/orders',
        // url: '/pages/orders/add/add',
        success:function (res) {
          // success
          res.eventChannel.emit('nav', { data: nav });
        },
      })
    }

  },

  toUserInfo:function(){
    wx.navigateTo({
      url: 'setting/userInfo/userInfo',
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
      orders:'../orders/orders',
      userInfo:'/pages/mine/setting/userInfo/userInfo',
      logs:'/pages/logs/logs'
    },
    waitPay:"/resource/icons/mine/支付.jpg",
    iconPath:{
      waitPay:"/resource/icons/mine/支付.jpg",
      waitDisp:"/resource/icons/mine/包裹.jpg"
    },
    //menu-list
    icon:"/resource/icons/mine/baoguo.png",
    waitDispOrdersCount:null,
    waitRecOrdersCount:null,
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
    if(this.data.user!=null){
      this.getOrdersCountInfo();
    }
    //console.log(user);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({    waitDispOrdersCount:null, waitRecOrdersCount:null})
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