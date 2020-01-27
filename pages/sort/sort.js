// pages/sort/sort.js
const app = getApp();
Page({
  //switchRightTab
  switchRightTab:function(e){
    let tabId = e.target.dataset.id;
    // console.log(e.target.dataset);
    this.setData({
      curNav:tabId,
    })
  },
  //获取分类
  getGoodsType:function(){
    var that = this;
    wx.request({
      url: app.globalData.url+'/goods/goodsType',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        var msg = res.data;
        that.setData({
          "goodsTypeList":msg.data
        });
        console.log(that.data.goodsTypeList);
      }
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    goodsTypeList:null,
    curNav:1,
    appUrl:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({appUrl:app.globalData.url});   
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
    this.getGoodsType();
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