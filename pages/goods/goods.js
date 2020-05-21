// pages/goods/goods.js
const app = getApp();
Page({

  //购买订单  
  addOrder:function(e){
    if(this.data.user ==null){
      wx.showToast({
        title: '还没有登录',
        icon: 'none'
      })
    }else{
      console.log("跳转到order页面");
      let orderDetailList = new Array();
      let goods = this.data.goods;
      //console.log(cartList);
      let price = goods.price;
      if (goods.discount != null)
        price = goods.goodsDiscount.price;
      let orderDetail = {
        goods: goods.id,
        user: this.data.user.id,
        number: this.data.buyNum,
        price: price,
        cartGoods:goods
      }
      orderDetailList.push(orderDetail);
      //console.log(orderDetailList);
      this.setData({ orderDetailList: orderDetailList });
      wx.navigateTo({
        url: '/pages/order/add/add',
        success: function (res) {
          // success
          res.eventChannel.emit('orderDetailList', { data: orderDetailList });
        },
      })
    }
    
  },

  //加入购物车
  addToCart:function(e){
    let that = this;
    if(this.data.user==null){
      wx.showToast({
        title:'还没有登录',
        icon:'none'
      })
    }else{
      let id = this.data.goods.id;
      let number = this.data.buyNum;
      wx.request({
        url: app.globalData.url + '/cart/add',
        method: 'POST',
        data: {
          "user": this.data.user.id,
          "goods": id,
          "number": number,
          "addDate": new Date()
        },
        success: res => {
          var msg = res.data;
          console.log(msg)
          if (msg.flag) {
            that.setData({toptips:{msg:'已加入购物车',type:'success',show:true}})
          }else{
            that.setData({toptips:{msg:'购物车中已有该商品',type:'error',show:true}})
          }
        }
      });
    }
  },
  //请求获取商品评价
  getGoodsComment:function(){
    let that = this;
    let goods = this.data.goods.id;
    wx.request({
      url: app.globalData.url+'/comment/goods/'+goods,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        let msg = res.data;
        console.log(msg)
        that.setData({commentList:msg.data.commentList,commentCount:msg.data.commentCount});
        if(that.data.commetnCount>999){
          that.setData({['goodsNav[1]']:"商品评价(999+)"})
        }else{
          let str = "商品评价("+that.data.commentCount+")";
          that.setData({['goodsNav[1]']:str})
        }
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  
  //请求获取商品信息
  getGoodsInfo:function(){
    let that = this;
    let id = this.data.goodsId;
    console.log("请求商品信息=="+id);
    wx.request({
      url: app.globalData.url+'/goods/'+id,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res){
        // success
        let msg = res.data;
        console.log(msg);
        that.setData({goods:msg.data});
        that.saveHistory(msg.data);
        that.getGoodsComment();
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },

  buyNumIput:function(e){
    let num = e.detail.value;
    if(num==""){
      num = 1
    }
    if(num>100){
      num=100
    }
    this.setData({buyNum:num})
  },

  // 更改商品数量
  changeBuyNum:function(e){
    let num = parseInt(e.currentTarget.dataset.num) ;
    let buyNum = this.data.buyNum;
    let goodsNum = this.data.goods.number;
    //console.log(e);
    //console.log(goodsNum);
    if(buyNum+num>0 && buyNum+num<=goodsNum && buyNum+num<=100){
      this.setData({ buyNum: buyNum + num });
    }
    else if(buyNum+num<=0){
      wx.showToast({
        title: '数量最小为1',
        icon: 'none'
      })
    }
    else if(buyNum+num>goodsNum){
      wx.showToast({
        title:'数量超过库存',
        icon:'none'
      })
    }else if(buyNum+num>100){
      wx.showToast({
        title:'单次限量100',
        icon:'none'
      })
    }
  },

  saveHistory:function(goods){
    let goodsHistory = [];
    if(wx.getStorageSync('GOODS_HISTORY') != ""){
      goodsHistory = wx.getStorageSync('GOODS_HISTORY');
      // console.log('原历史',goodsHistory);
    }
    for(let i in goodsHistory){
      console.log("goodsHistory[i]=="+JSON.stringify(goodsHistory[i].id));
      console.log("goods=="+JSON.stringify(goods.id));
      if(goodsHistory[i].id==goods.id){
        goodsHistory.splice(i,1);
        break;
      }
    }
    if(goodsHistory.length>20){
      goodsHistory.pop();
    }
    goodsHistory.unshift(goods);
    console.log("浏览历史", goodsHistory);
    wx.setStorageSync('GOODS_HISTORY', goodsHistory);
  },

  //切换goodsNav
  changeNav:function(e){
   // console.log(e);
    let nav = e.currentTarget.dataset.nav;
    this.setData({curNav:nav});
  },

  toHelpPage:function(){
    wx.navigateTo({
      url: '/pages/mine/help/help',
      success: function(res){
        // success
      },
    })
  },

  toCartTab:function(){
    wx.switchTab({
      url: '/pages/cart/cart',
      success: function(res){
        // success
      },
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    user:null,
    appUrl:null,
    goods:{},
    goodsNav:['商品详情','商品评价'],
    curNav:0,
    buyNum:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({appUrl:app.globalData.url});
    let that = this;
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('goods', function (data) {
      let goodsId = data;
      // that.setData({ goods: goods });
      that.setData({goodsId:goodsId});
      console.log("onLoad商品ID==",goodsId);
      // that.saveHistory(goods);
      that.getGoodsInfo();
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
    this.getGoodsComment();
    this.getGoodsInfo();
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