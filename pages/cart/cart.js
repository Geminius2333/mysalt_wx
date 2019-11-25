// pages/cart/cart.js
var common = require('../../utils/common.js');
const app = getApp();
Page({
  
  addOrder:function(e){
    console.log("添加order");
  },

  getCartList:function(){
    var that = this;
    wx.request({
      url: app.globalData.url+'/cart/user/'+app.globalData.user.id,
      method:"GET",
      success:res=>{
        var msg = res.data;
        console.log(msg);
        that.setData({cartList:msg.data});
      }
    })
  },

  toLoginPage:function(e){
    common.toLoginPage();
  },

  deleteCartItem:function(e){
    console.log(e);
  },

  addNum:function(){
    this.setData({"goodsNum":this.data.goodsNum+1});    
  },
  reduceNum:function(){
    if(this.data.goodsNum>1)
      this.setData({"goodsNum":this.data.goodsNum-1});
    else{
      wx.showToast({
        title: '数量最小为1',
        duration:1000,
        icon:'none',
      })
    }
  },


  /**
   * 页面的初始数据
   */
  data: {
    appUrl:null,
    user:null,
    goodsNum:1,
    cartList:null,
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
    if(this.data.user !=null)
      this.getCartList();
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