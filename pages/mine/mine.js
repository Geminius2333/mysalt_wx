// pages/mine/mine.js
Page({

  getUser:function(){
    wx.request({
      url: 'http://localhost:8088/salt/user/test',
      method:'GET',
      success(res){
        console.log(res.data);
      }
    }) 
  },

  /**
   * 页面的初始数据
   */
  data: {
    waitPay:"/resource/icon/mine/支付.jpg",
    iconPath:{
      waitPay:"/resource/icon/mine/支付.jpg",
      waitDisp:"/resource/icon/mine/包裹.jpg"
    }
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
    console.log();
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