// pages/mine/recAddress/recAddress.js
const app = getApp();
Page({

  toEdit:function(){
    console.log("跳转到编辑收货地址页面");
    wx.navigateTo({
      url: 'edit/edit',
    })
  },

  toAdd:function(){
    console.log("跳转到添加收货地址页面");
    wx.navigateTo({
      url: 'add/add',
    })
  },

  getRecAddress:function(){
    var that = this;
    wx.request({
      url: that.data.appUrl+'/recAddress/user/'+that.data.user.id,
      method:'GET',
      success:res=>{
        //console.log(res);  
        var msg = res.data;
        that.setData({recAddressList:msg.data});
        console.log(msg.data);
      }
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    recAddressList:null,
    user:null,
    appUrl:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ appUrl: app.globalData.url,user:app.globalData.user});

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
    console.log(this.data.user);
    console.log(this.data.appUrl);
    this.getRecAddress();
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