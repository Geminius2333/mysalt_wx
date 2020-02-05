// pages/mine/setting/setting.js
const app = getApp();
Page({

  tapDialogButton:function(e){
    // console.log(e)
    let index = e.detail.index;
    if(index==0){
      console.log("取消！")
    }else if(index==1){
      //dialogId 0为清除缓存 1为退出登录
      if(this.data.dialogId==0)
        wx.clearStorageSync();
      else
        this.loginOut();
    }
    this.setData({ dialogShow: false })
  },

  showDialog:function(e){
    let dialogText = e.currentTarget.dataset.dialogText;
    let dialogId = e.currentTarget.dataset.dialogId;
    this.setData({dialogShow:true,dialogText:dialogText,dialogId:dialogId}); 
  },

  loginOut:function(){
    app.globalData.user = null;
    // console.log(app.globalData.user)
    wx.switchTab({
      url: '/pages/mine/mine'
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    user:null,
    appUrl:null,
    dialogShow: false,
    dialogText:"Dialog文本",
    dialogId:0,
    buttons: [{ text: '取消' }, { text: '确定' }],
    pages:{
      none:'',
      userInfo:"userInfo/userInfo",
      updatePassword:"updatePassword/updatePassword",
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
    this.setData({ appUrl: app.globalData.url, user: app.globalData.user });
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