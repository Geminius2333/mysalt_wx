// pages/orders/logistics/logistics.js
const app = getApp();
Page({

  getLogisticsInfo:function(){
    let that = this;
    let orders = this.data.orders;
    let jsonObject ={'trackingNo':orders.trackingNo,'type':orders.ordersLogisticsCompany.code};
    wx.request({
      url:app.globalData.url+"/orders/logistcsInfo",
      data:jsonObject,
      method:'GET',
      success:function(res){
        let msg = res.data;
        let data = JSON.parse(msg.data);
        // console.log(data);
        let logisticsInfo = data.result;
        that.setData({"logisticsInfo":logisticsInfo});
        // console.log(that.data.logisticsInfo);
      }
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    deliveryStatus:['揽件','在途中', '正在派件','已签收','派送失败','疑难件','退件签收'],
    logisticsInfo:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on("orders",function(data){
      console.log(data);
      that.setData({'orders':data});
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
    this.getLogisticsInfo();
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