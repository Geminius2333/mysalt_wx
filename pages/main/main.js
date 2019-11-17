// pages/main/main.js
const app = getApp();
Page({
  //获取商品信息
  getPageInfo:function(){
    wx.request({
      url: app.globalData.url + 'goods',
      success: res => {
        var msg = res.data;
        console.log(msg.code);
        console.log(msg.data)
        this.setData({
          "pageInfo": msg.data,
        });
      }
    })    
  },
  /**
   * 页面的初始数据
   */
  data: {
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
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

    //获取商品
    that.getPageInfo();

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