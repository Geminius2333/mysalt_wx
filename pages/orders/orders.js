// pages/order/order.js
const app = getApp();
Page({
  //点击对话框按钮
  tapDialogButton: function (e) {
    let index = e.detail.index;
    if (index == 0) {
      console.log("取消！")
    } else if (index == 1) {
      this.updateOrdersStatus();
    }
    this.setData({ dialogShow: false })
  },

  //弹出对话框
  showDialog:function(e) {
    let id = e.currentTarget.dataset.id;
    let status = e.currentTarget.dataset.status;
    this.setData({
      dialogShow: true,
      formData:{"id":id,"status":status}
    })
  },

  //请求更新orders
  updateOrdersStatus:function(){
    let that = this;
    let id = this.data.formData.id;
    let status = this.data.formData.status;
    wx.request({
      url: app.globalData.url+'/orders/update',
      method: 'POST', 
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      data:{id:id,status:status},
      success: function(res){
        // success
        let msg = res.data;
        console.log(msg);
        that.getOrdersList();
      },
    })
  },

  //请求获取orders
  getOrdersList:function(){
    let that = this;
    let user  = this.data.user;
    let ordersDetailList = new Array();
    wx.request({
      url: app.globalData.url+'/orders/user/'+user.id,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res){
        // success
        let msg = res.data;
        console.log(msg);
        that.setData({ordersList:msg.data});
      },
    })
  },

  //跳转到单一订单详情
  toOrdersDetailPage:function(e){
    let ordersIndex = e.currentTarget.dataset.ordersIndex;
    // let ordersId = e.currentTarget.dataset.ordersId;
    let orders = this.data.ordersList[ordersIndex];
    console.log("ordersIndex=="+ordersIndex);
    // console.log("ordersId=="+ordersId);
    wx.navigateTo({
      url:'ordersDetail/ordersDetail',
      success:res =>{
        res.eventChannel.emit("orders",orders);
      }
    })
  },

  //跳转到评价页面
  toCommentPage:function(e){
    let index = e.currentTarget.dataset;
    // console.log(index)
    let ordersDetail = this.data.ordersList[index.ordersIndex].ordersDetailList[index.ordersDetailIndex];
    console.log(ordersDetail)
    console.log("跳转到评论页面");
    wx.navigateTo({
      url: 'comment/comment',
      success: function(res){
        // success
        res.eventChannel.emit('ordersDetail',ordersDetail);
      },
    })
  },

  //切换topbar
  switchNavTop:function(e){
    //console.log(e)
    let curNav = e.target.dataset.nav;
    this.setData({curNav:curNav});
  },

  /**
   * 页面的初始数据
   */
  data: {
    appUrl:null,
    user:null,
    navTop:['全部','待付款','待发货','待收货','待评价'],
    curNav:0,
    ordesList:{},
    ordersDetailList:{},
    dialogShow: false,
    buttons: [{ text: '取消' }, { text: '确定' }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ appUrl: app.globalData.url});
    let that = this;
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('nav', function (data) {
      let nav = data.data;
      if(nav != null || nav != undefined){
        that.setData({ curNav: nav });
        console.log("nav:" + nav);
      }
    });
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
    this.setData({user:app.globalData.user});
    this.getOrdersList();
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