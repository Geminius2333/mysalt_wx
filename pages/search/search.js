// pages/search/search.js
const app = getApp();
Page({

  //跳转到搜索结果
  toSearchResultPage:function(keyword){
    // console.log("搜索内容=="+keyword);   
    wx.navigateTo({
      url: '/pages/searchResult/searchResult',
      success: function(res){
        // success
        res.eventChannel.emit('searchKeyword',keyword);

      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },

  //点击清除记录
  clickClearHistory:function(e){
    this.setData({searchArray:[]});
  },

  //
  longPressHistoryItem:function(e){
    // console.log(e)
    let index = e.currentTarget.dataset.index;
    let searchArray = this.data.searchArray;
    searchArray.splice(index, 1);
    this.setData({ searchArray: searchArray});
  },

  //点击搜索记录Item
  clickHistoryItem:function(e){
    // console.log(e)
    let index = e.currentTarget.dataset.index;
    let searchArray = this.data.searchArray;
    let keyword = searchArray[index];
    let keywordIndex = searchArray.indexOf(keyword);
    searchArray.splice(keywordIndex, 1);
    searchArray.unshift(keyword);
    this.setData({ searchArray: searchArray,keyword:keyword });
    this.toSearchResultPage(keyword);
  },
  //提交搜索
  searchSubmit:function(e){
    let searchArray = this.data.searchArray;
    let keyword = this.data.keyword;
    if(keyword == null){
      this.setData({error:'请输入搜索内容'});
    }else{
      let index = searchArray.indexOf(keyword);
      // console.log("index=="+index)
      if (index >= 0)
        searchArray.splice(index, 1);
      if (searchArray.length > 8) {
        searchArray.pop();
      }
      searchArray.unshift(keyword);
      this.setData({ searchArray: searchArray });
      console.log(this.data.searchArray)
      this.toSearchResultPage(keyword);
    }
  },

  //保存到本地
  saveStorage:function(e){
    console.log("保存搜索历史==" + this.data.searchArray)
    wx.setStorageSync('searchArray', this.data.searchArray);
  },

  inputChange:function(e){
    // console.log(e)
    if(e.detail.value.trim()==this.data.keyword){
      wx.showToast({
        icon:'none',
        title:'搜索内容空格自动删除',
        duration:500
      })
    }
    let keyword = e.detail.value;
    this.setData({ keyword: keyword.trim()});
  },

  /**
   * 页面的初始数据
   */
  data: {
    keyword:null,
    searchArray:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let searchArray = wx.getStorageSync('searchArray');
    console.log("searchArray=="+searchArray)
    if(searchArray=="")
      searchArray = [];
    this.setData({searchArray:searchArray});
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
    this.saveStorage();    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.saveStorage();
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