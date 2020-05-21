// pages/searchResult/searchResult.js
const app = getApp();
Page({

  getSearchList:function(){
    let keyword = this.data.keyword;
    let sales = this.data.orderBysales;
    let price = this.data.orderByPrice;
    let desc = this.data.desc;
    let type = 0;
    if(this.data.goodsType != null)
      type = this.data.goodsType.id;
    let that = this;
    wx.request({
      url: app.globalData.url + '/goods/search',
      data: { keyword,sales,price,desc,type:type },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        let msg = res.data;
        that.setData({ goodsList: msg.data });
        console.log("msg",msg);
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  toSearchPage:function(e) {
    //const query = wx.createSelectorQuery();
    wx.navigateTo({
      url: '/pages/search/search',
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  toGoodsPage: function (e) {
    // let goodsId = e.currentTarget.dataset.goodsId;
    let index = e.currentTarget.dataset.index;
    let goods = this.data.goodsList[index];
    // console.log(goods);
    // console.log(e);
    wx.navigateTo({
      url: '/pages/goods/goods',
      success: function (res) {
        // success
        res.eventChannel.emit('goods', goods.id);
      },
    })
  },

  //排序方式 desc
  changeDesc: function (e) {
    let desc = this.data.desc;
    if (desc == 0)
      desc = 1;
    else
      desc = 0;
    this.setData({ desc: desc })
    this.getSearchList();
  },

  //根据ID、销量、价格 排序
  selectMenuList:function(e){
    let index = e.currentTarget.dataset.index;
    this.setData({selectMenu:index});

    //默认顺序
    this.setData({desc:0})
    // ID
    if(index==1){
      this.setData({orderBysales:0,orderByPrice:0})
    }
    // 销量
    if(index==2){
      this.setData({orderByPrice:0})
      if(this.data.orderBysales==0){
        this.setData({ orderBysales: 1,})
      }
      else{
        this.setData({orderBysales:0})
      }
    }
    //价格
    if(index==3){
      this.setData({orderBysales:0})
      if(this.data.orderByPrice==0){
        this.setData({orderByPrice:1})
      }
      else{
        this.setData({orderByPrice:0})
      }
    }

    this.getSearchList();
  },

  /**
   * 页面的初始数据
   */
  data: {
    appUrl:null,
    user:null,
    keyword:null,
    goodsList:null,
    selectMenu:1,
    orderBysales:0,
    orderByPrice:0,
    desc:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('searchKeyword',function(data){
      let keyword = data;
      // console.log(data);
      wx.setNavigationBarTitle({
        title: data,
      })
      that.setData({keyword:keyword});
      that.getSearchList();
    })
    eventChannel.on('searchGoodsType',function(data){
      let goodsType = data;
      // console.log(data);
      wx.setNavigationBarTitle({
        title: goodsType.name,
      })
      that.setData({goodsType:goodsType,keyword:''});
      that.getSearchList();
    })
    this.setData({appUrl:app.globalData.url,user:app.globalData.user})
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
    let data = this.data;
    this.getSearchList();
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