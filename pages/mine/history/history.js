// pages/mine/history/history.js
const app = getApp();
Page({

  
  tapDialogButton:function(e){
    // console.log(e)
    let index = e.detail.index;
    if(index==0){
      console.log("取消！")
    }
    else if(index==1){
      console.log("删除足迹！");
      let index = this.data.deleteIndex;
      let goodsHistory = this.data.goodsHistory;
      goodsHistory.splice(index,1);
      this.setData({goodsHistory,goodsHistory});
      wx.setStorageSync("GOODS_HISTORY",goodsHistory);
    }
    this.setData({ dialogShow: false })
  },

  longPressHistoryItem:function(e){
    let index = e.currentTarget.dataset.index;
    this.setData({
        dialogShow: true,
        deleteIndex:index,
    })
  },

  toGoodsPage:function(e){
    let goodsId = e.currentTarget.dataset.goodsId;
    console.log(goodsId);
    wx.request({
      url:app.globalData.url+'/goods/'+goodsId,
      method:'GET',
      success:function(res){
        let msg = res.data;
        let goods = msg.data;
         if(goods != null && goods != undefined){
          wx.navigateTo({
            url:'/pages/goods/goods',
            success:function(res){
              res.eventChannel.emit("goods",goods);
            }
          });
        }
      }
    });
  },

  /**
   * 页面的初始数据
   */
  data: {
    goodsHistory:null,
    user:null,
    appUrl:null,
    buttons: [{text: '取消'}, {text: '确定'}],
    dialogShow:false,
    deleteIndex:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({appUrl:app.globalData.url,user:app.globalData.user});
    console.log(this.data.goodsHistory);
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
    this.setData({goodsHistory:wx.getStorageSync("GOODS_HISTORY")});
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