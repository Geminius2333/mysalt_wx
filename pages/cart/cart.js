// pages/cart/cart.js
var common = require('../../utils/common.js');
const app = getApp();
Page({
  //跳转到添加订单页面
  toOrderPage:function(e){
    console.log("跳转到order页面");
    let orderDetailList = new Array();
    let cartList = this.data.cartList;
    //console.log(cartList);
    for(let i = 0;i<cartList.length;i++){
      if(cartList[i].checked == true){
        orderDetailList.push(cartList[i]);
      }
    };
    //console.log(orderDetailList);
    this.setData({orderDetailList:orderDetailList});
    if(orderDetailList.length < 1){
      wx.showToast({title:"还没有选择商品",icon:'none',duration:1000});
    }else{
      wx.navigateTo({
        url: '/pages/order/add/add',
        success: function (res) {
          // success
          res.eventChannel.emit('orderDetailList', { data: orderDetailList });
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
    }
  },
  //更新数据库cart
  updateCartList:function(){
    var cartList = this.data.cartList;
    var jsonCartList = new Array();
    for(let i=0;i<cartList.length;i++){
      jsonCartList.push({id:cartList[i].id,number:cartList[i].number,checked:cartList[i].checked});
    };
   // console.log(json);
    wx.request({
      url: app.globalData.url+'/cart/update',
      data: jsonCartList,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        var msg = res.data;
      },
    })
  },

  /**
   * @param {string} id 购物车id
   */
  deleteCart:function(id){
    var that = this;
    wx.showModal({
      title: '注意',
      content: '确定移出购物车吗？',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.url + '/cart/delete/' + id,
            method: 'POST', 
            success: function (res) {
              console.log(res.data);
              that.getCartList();
            },
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    });
    //this.getCartList();
  },
  // 获取购物车list
  getCartList:function(){
    var that = this;
    wx.request({
      url: app.globalData.url+'/cart/user/'+app.globalData.user.id,
      method:"GET",
      success:res=>{
        let msg = res.data;
        console.log(msg);
        that.setData({cartList:msg.data});
        this.updateCountPrice();
      }
    })
  },
  // 跳转到登录页
  toLoginPageClick:function(e){
    common.toLoginPage();
  },
  // 商品移出购物车
  deleteCartItemClick:function(e){
    let dataset = e.target.dataset;
    console.log("商品移出购物车："+dataset.id);
    this.deleteCart(dataset.id);
    this.updateCountPrice();
  },
  // 更新总价
  updateCountPrice:function(){
    var countPrice = 0;
    console.log("当前countPrice："+this.data.countPrice);
    for(let i in this.data.cartList){
      let cart = this.data.cartList[i];
      if(cart.checked){
        if (cart.cartGoods.goodsDiscount == null || cart.cartGoods.goodsDiscount.isActive == 0){
          countPrice = countPrice + cart.number * cart.cartGoods.price;
        }
        else if (cart.cartGoods.goodsDiscount.isActive == 1){
          countPrice = countPrice + cart.number * cart.cartGoods.goodsDiscount.price;
        }
      }
    }
    this.setData({countPrice:countPrice});
    console.log("当前countPrice:"+this.data.countPrice);
  },
  //checkbox全选
  checkboxCheckAll:function(e){
    let flag = this.data.checkAll;
    //console.log("checkAll："+ flag);
    let cartList = this.data.cartList;
    if(flag==false){
      for(let i in cartList){
        let key = "cartList["+i+"].checked";
        this.setData({[key]:true});
      }
      this.setData({checkAll:true});
      console.log("判断为ture");
    }
    else{
      for (let i in cartList) {
        let key = "cartList[" + i + "].checked";
        this.setData({ [key]: false});
      }
      this.setData({checkAll:false});
      console.log("判断为false");
    }
    console.log(this.data.cartList);
    console.log(this.data.checkAll);
    this.updateCountPrice();
  },

  // checkbox单项点击选择
  checkboxChange:function(e){
    var values = e.detail.value;
    // console.log("选中的值："+values);
    if(values.length == this.data.cartList.length){
      this.setData({checkAll:true});
    }else{
      this.setData({checkAll:false});
    }
    for(let i=0;i<this.data.cartList.length;i++){
      if(values.length>0){
        for (let index in values) {
          console.log("value:"+values[index]);
          var key = "cartList[" + i + "].checked";
          if (i == values[index]) {
            this.setData({ [key]: true });
            // console.log("true i:"+i);
            break;//如果选中则立即跳出循环
          }
          else {
            this.setData({ [key]: false });
            // console.log("false i:"+i);
          }
        }
      }else{
        for(let i in this.data.cartList){
          var key = "cartList[" + i + "].checked";
          this.setData({[key]:false});
        }
        this.setData({checkAll:false});
      }
    }
    console.log(this.data.cartList);
    this.updateCountPrice();
  },
  //输入框失去焦点
  inputBlur:function(e){
    var value = e.detail.value;
    var index = e.target.dataset.index;
    if(value==""){
      var key = "cartList[" + index + "].number";
      this.setData({ [key]: 1 });
      this.updateCountPrice();
    }
  },
  //输入框修改商品数量
  inputChange:function(e){
    var index = e.target.dataset.index;
    var value = e.detail.value;
    var key = "cartList["+index+"].number";
    this.setData({[key]:value});
    this.updateCountPrice();
  },
  // 增加商品数量
  addNumClick:function(e){
    var index = e.target.dataset.index;
    // console.log("购物车index:"+index);
    var number = this.data.cartList[index].number;
    var key = "cartList["+index+"].number";
    this.setData({[key]:number+1});   
    // console.log("购物车当前数量number:" + this.data.cartList[index].number); 
    this.updateCountPrice();
  },
  // 减少商品数量
  reduceNumClick:function(e){
    var index = e.target.dataset.index;
    // console.log("购物车index:"+index);
    var number = this.data.cartList[index].number;
    var key = "cartList[" + index + "].number";
    if(number > 1){
      this.setData({ [key]: number-1 });
      // console.log("购物车当前数量number:" + this.data.cartList[index].number); 
    }
    else{
      wx.showToast({
        title: '数量最小为1',
        duration:1000,
        icon:'none',
      });
      // console.log("购物车当前数量number:" + this.data.cartList[index].number); 
    }
    this.updateCountPrice();
  },

  /**
   * 页面的初始数据
   */
  data: {
    appUrl:null,
    user:null,
    goodsNum:1,
    cartList:null,
    countPrice:0.00,
    checkAll:false,
    orderDetailList:null,
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
    if(this.data.user!=null)
      this.updateCartList();
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