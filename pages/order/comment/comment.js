import icon from "../../../components/icon/icon";

// pages/order/comment/comment.js
const app = getApp();
Page({

  updateOrdersDetailIsComment:function(){
    let ordersDetail = this.data.ordersDetail;
    wx.request({
      url: app.globalData.url+'/ordersDetail/updateIsComment',
      data: ordersDetail.id,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        let msg = res.data;
        console.log(msg);
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
    
  },

  addComment:function(e){
    let that = this;
    let postTime = new Date();
    this.setData({['formData.postTime']:postTime,['formData.goods']:this.data.goods.id});
    console.log(this.data.formData);
    wx.request({
      url: app.globalData.url+'/comment/add',
      data: that.data.formData,
      method: 'POST',
      success: function(res){
        // success
        let msg = res.data;
        console.log(msg)
        that.updateOrdersDetailIsComment();
        wx.navigateBack({
          delta: 1, // 回退前 delta(默认为1) 页面
          success: function(res){
            // success
          },
        })
      },
      fail: function() {
        // fail
        wx.showToast({
          title:'评论失败',
          icon:'none',
        })
      },
      complete: function() {
        // complete
      }
    })
  },

  uploadError(e) {
    console.log('upload error', e.detail)
  },
  uploadSuccess(e) {
    console.log('upload success', e.detail)
  },

  deleteImage:function(e){
    console.log(e)

    let files = this.data.files;
    files.splice(e.detail.index,1);
    this.setData({
      files:files
    })
    console.log(files)
  },

  chooseImage: function (e) {
    console.log(e)
    var that = this;
    // wx.chooseImage({
    //   sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    //   sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    //   success: function (res) {
    //     // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
    //     that.setData({
    //       files: that.data.files.concat(res.tempFilePaths)
    //     });

    //     console.log(res)
    //   }
    // })
    let files = that.data.files;
    let urlList = e.detail.tempFilePaths;
    for(let i = 0;i<urlList.length;i++){
      files.push({url:urlList[i]})
    }
    that.setData({
      files: files
    });
    console.log(that.data.files)
  },

  selectFile:function(files) {
    console.log('files', files)
    // 返回false可以阻止某次文件上传
  },

  radioChange:function(e){
    let score = e.detail.value;
    console.log(score);
    this.setData({['formData.score']:score});
  },

  formSwitchChange:function(e){
    console.log(e)
    let flag = false;
    if(e.detail.value){
      flag = true;
    }
    this.setData({ ['formData.isAnonymous']: flag });
  },

  formInputChange:function(e){
    let { field } = e.currentTarget.dataset;
    //更新表单
    this.setData({
      [`formData.${field}`]: e.detail.value
    });
    //更新字数
    this.setData({commentFontCount:e.detail.cursor});
    console.log(this.data.formData.comment)
  },
  /**
   * 页面的初始数据
   */
  data: {
    files: [{
      url:'https://dss2.bdstatic.com/kfoZeXSm1A5BphGlnYG/skin/417.jpg?2'
    }],
    user:null,
    ordersDetail:null,
    goods:null,
    commentFontCount:0,
    formData:{
      isAnonymous:false
    },
    appUrl:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let that = this;
    this.setData({user:app.globalData.user,appUrl:app.globalData.url});
    this.setData({['formData.user']:this.data.user.id});
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('ordersDetail',function(data){
      console.log(data);
      that.setData({ordersDetail:data,goods:data.ordersDetailGoods});
    })
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