// pages/mine/recAddress/recAddress.js
const app = getApp();
Page({

  //请求数据库更新
  updataUserDeftAddress: function () {
    let user = this.data.user;
    let param = { "id": user.id, "deftAddress": user.deftAddress };
    wx.request({
      url: app.globalData.url + '/user/update/deftAddress',
      data: param,
      method: 'POST',
      success: function (res) {
        // success
        let msg = res.data;
       // console.log(msg);
      }
    })
  },

  //删除收货地址
  deleteRecAddress:function(e){
    //console.log(e)
    let id = e.currentTarget.dataset.id;
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确认删除当前收货地址吗？',
      success(res) {
        if(res.confirm) {
          console.log("删除收货地址："+id);
          if(id == that.data.user.deftAddress){
            wx.showToast({title:"当前为默认地址！",icon:'none'});
          }else{
            wx.request({
              url: app.globalData.url+'/recAddress/delete/'+id,
              data: {},
              method: 'POST', 
              success: function(res){
                let msg = res.data;
                console.log(msg);
                that.getRecAddress();
              },
            })
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  //跳转编辑页面
  toEditPage:function(e){
    //console.log(e)
    let index = e.currentTarget.dataset.index;
    let recAddress = this.data.recAddressList[index];
    wx.navigateTo({
      url: 'edit/edit',
      success: function(res){
        // success
        res.eventChannel.emit('recAddress', { data: recAddress});
      },
    })
  },

  changeDeftAddress:function(e){
    console.log(e);
    let deftAddress = e.detail.value;
    this.setData({ "user.deftAddress":deftAddress});
    console.log(this.data.user);
  },

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
      success:function(res){
        
      }
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
        let recAddressList = msg.data;
        that.setData({recAddressList:recAddressList});
        console.log(recAddressList);
        if (recAddressList.length == 1) {
          app.globalData.user.deftAddress = recAddressList[0].id;
          this.setData({ user: app.globalData.user });
        }
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
    // console.log(this.data.user);
    // console.log(this.data.appUrl);
    this.getRecAddress();

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    if(this.data.user.deftAddress != '' || this.data.user.deftAddress != null)
      this.updataUserDeftAddress();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    if (this.data.user.deftAddress != '' || this.data.user.deftAddress != null)
      this.updataUserDeftAddress();
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