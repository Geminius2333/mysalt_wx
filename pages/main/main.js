// pages/main/main.js
const app = getApp();
Page({

  //添加商品到购物车
  addToCart:function(e){
    //console.log(e);
    wx.request({
      url: app.globalData.url+'/cart/add',
      method:'POST',
      data: {"user": this.data.user.id,
        "goods": e.target.dataset.goodsId,
        "number": 1,
        "addDate": new Date()},
      success:res=>{
        var msg = res.data;
        //console.log(msg.data)
        if(msg.flag){
          wx.showToast({
            title: '已加入购物车',
            duration:500,
          })
        }
      }
    })
  },

  //获取随机商品图片
  getRandGoodsImg:function(){
    let that = this;
    wx.request({
      url: app.globalData.url+'/goodsImg/getRandGoodsImg',
      success:(res)=>{
        let msg = res.data;
        console.log(msg);
        that.setData({swiperImgs:msg.data});
      }
    })
  },

  //获取商品信息
  getPageInfo:function(){
    var that = this;
    that.setData({"appUrl":app.globalData.url})
    console.log(that.data.appUrl);
    wx.request({
      url: app.globalData.url+ '/goods',
      success: res => {
        var msg = res.data;
        console.log(msg.code);
        console.log(msg.data)
        console.log(msg.data.list[6].goodsImgList[0].img)
        this.setData({
          "pageInfo": msg.data,
        });
      }
    })    
  },

  toSearchPage:function(e){
    //const query = wx.createSelectorQuery();
    
    wx.navigateTo({
      url: '/pages/search/search',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },

  toGoodsPage:function(e){
    let goodsId = e.currentTarget.dataset.goodsId;
    let index = e.currentTarget.dataset.index;
    let goods = this.data.pageInfo.list[index];
    // console.log(goods);
    // console.log(e);
    wx.navigateTo({
      url: '/pages/goods/goods',
      success: function(res){
        // success
        res.eventChannel.emit('goods', goodsId);
      },
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    user:null,
    //
    appUrl:null,
    //
    dialogShow: false,
    dialogButtons: [{ text: '取消' }, { text: '确定' }],
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    swiperImgs: [
      {
        "name": "img1",
        "url": "https://s2.ax1x.com/2019/10/13/uxJY8J.md.jpg"
      },
      {
        "name": "img2",
        "url": "https://s2.ax1x.com/2019/10/13/uxJt29.md.jpg"
      },
      {
        "name": "img3",
        "url": "https://s2.ax1x.com/2019/10/13/uxJNvR.md.jpg"
      }
    ],
    homeSwiper:{
      indicatorDots: true,
      autoplay: true,
      interval: 2000,
      duration: 500,
      height: "200px",
      circular: true,
    },

    menuItems: [{ class: "home-menu-item1", text: "按钮1" },
    { class: "home-menu-item2", text: "按钮2" },
    { class: "home-menu-item3", text: "按钮3" },
    { class: "home-menu-item4", text: "按钮4" }
    ],
    
    //测试数据
    items: [{ id: 1, title: "一斤苹果", price: 23.33, sales: 520, image: "https://s2.ax1x.com/2019/10/15/KCfaff.jpg" },
    { id: 2, title: "一个大西瓜", price: 50.00, sales: 1000, image: "https://s2.ax1x.com/2019/10/15/KChGgU.jpg" },
    { id: 3, title: "一只可爱的小母猪", price: 888.88, sales: 6666, image: "https://s2.ax1x.com/2019/10/15/KCfj1O.jpg" }
    ],
    //商品
    pageInfo: null,
    now:null,
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({"appUrl":getApp().globalData.url})
    var that = this;
    //设置swiper高度
    wx.getSystemInfo({
      success(res) {
        var screenWidth = res.screenWidth;
        var screenHeight = res.screenHeight;
        var swiperHeight = 150 * screenHeight / 568;
        // console.log("new swiperHeight:"+swiperHeight);
        that.setData({
          'homeSwiper.height':swiperHeight+"px",
        })
      }
    });
    this.getRandGoodsImg();


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
    //获取商品
    this.getPageInfo();
    this.setData({user:app.globalData.user});
    //console.log(this.data.user);
    this.setData({now:new Date().toLocaleDateString()})
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
    this.getPageInfo();
    wx.stopPullDownRefresh();
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