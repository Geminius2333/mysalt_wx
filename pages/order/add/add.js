// pages/order/add/add.js
const app = getApp();
Page({

  //请求添加订单
  addOrder:function(e){
    //订单详细列表
    let orderDetailList = new Array();
    for(let i=0;i<this.data.cartList.length;i++){
      let cart = this.data.cartList[i];
      if(cart.goods.discount==null)
        orderDetailList.push({goods: cart.goods, number: cart.number,price:cart.cartGoods.price});
      else
        orderDetailList.push({goods:cart.goods,number:cart.number,price:cart.cartGoods.discount.price});
    }
    //默认未支付
    let orders  = {
      user:this.data.user.id,
      status:1,
      recAddress:this.data.recAddress.id,
      orderDetailList:orderDetailList,
    };  
    console.log(orders);
    wx.request({
      url: app.globalData.url+'/orders/add',
      data: {ordersJson:orders},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res){
        // success
        let msg = res.data;
        console.log(msg);
      },
    })

  },
  //跳转到订单
  toOrdersPage:function(e){
    wx.navigateTo({
      url: '/pages/order/order',
      success: function(res){
        // success
      },
    })
  },

  //跳转到收货地址
  toRecAddressPage:function(e){
    wx.navigateTo({
      url: '/pages/recAddress/recAddress',
      success: function(res){
        // success
        
      },
    })
  },

  //请求获取用户默认收件地址
  getDeftAddress: function () {
    let that = this;
    let id = this.data.user.deftAddress;
    wx.request({
      url: app.globalData.url + '/recAddress/' + id,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        // success
        let msg = res.data;
       // console.log(msg);
        that.setData({ recAddress: msg.data });
      },
    })
  },

  //计算价格
  countOrderPrice:function(){
    let goodsPrice = 0;
    let logisticsPrice = this.data.logisticsPrice;
    for(let i = 0;i<this.data.cartList.length;i++){
      let cart = this.data.cartList[i];
     // if (cart.checked) {
        if (cart.cartGoods.goodsDiscount == null || cart.cartGoods.goodsDiscount.isActive == 0) {
          goodsPrice = goodsPrice + cart.number * cart.cartGoods.price;
        }
        else if (cart.cartGoods.goodsDiscount.isActive == 1) {
          goodsPrice = goodsPrice + cart.number * cart.cartGoods.goodsDiscount.price;
        }
      //}
    };
    this.setData({goodsPrice:goodsPrice,countPrice:goodsPrice+logisticsPrice});
  },

  /**
   * 页面的初始数据
   */
  data: {
    appUrl: null,
    user: null,
    goodsPrice: 0.00,
    logisticsPrice:0.00,
    countPrice:0.00,
    recAddress: null,
    cartList:null,
    orders:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ appUrl: app.globalData.url });
    this.setData({ user: app.globalData.user });
    let that = this;
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('orderDetailList', function (data) {
      let cartList = data.data;
      that.setData({ cartList: cartList });
      console.log(cartList);
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

    this.getDeftAddress();
    this.countOrderPrice();
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