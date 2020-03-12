// pages/orders/ordersDetail/ordersDetail.js
const app = getApp();
Page({


  toLogisticsProgram:function(e){
    let trackingNo = e.currentTarget.dataset.trackingNo;
    console.log(trackingNo);
    wx.navigateToMiniProgram({
      appId: 'wxfaeec4255298e6c6',
      path: 'pages/queryExpress/queryExpress',
      extraData: {
        foo: 'bar'
      },
      envVersion: 'develop',
      success(res) {
        // 打开成功
        console.log(res)
      }
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    user:{},
    appUrl:'',
    orders:{},
    goodsCost:0.00,
    logisticsCost:0.00,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    this.setData({user:app.globalData.user,appUrl:app.globalData.url});
    const eventChanel = this.getOpenerEventChannel();
    eventChanel.on('orders',function(data){
      console.log(data);
      that.setData({orders:data});
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

  }
})