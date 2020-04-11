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

  uploadCommentImage:function(commentId){
    let that = this;
    let formData = {commentId:commentId};
    let images = this.data.files;
    console.log('上传图片', images)
    // 文件上传的函数，返回一个promise
    return new Promise((resolve, reject) => {
      console.log("图片上传！");
      for(let i=0;i<images.length;i++){
        let imgUrl = images[i].url;
        console.log("上传图片路径：",imgUrl);
        const upload_task = wx.uploadFile({
          url:app.globalData.url+'/comment/uploadCommentImage',
          filePath:imgUrl,
          name:'image',
          formData:{commentId},
          success:res=>{
            console.log(res.data);
          },
          fail:res=>{
            console.log(res)
          }
        })
      }; 
      setTimeout(() => {
          reject('some error')
      }, 5000)
    });

  },

  addComment:function(e){
    this.uploadCommentImage('123456');
    let that = this;
    let postTime = new Date();
    this.setData({['formData.postTime']:postTime,['formData.goods']:this.data.goods.id});
    console.log(this.data.formData);
    wx.request({
      // url: app.globalData.url+'/comment/add',
      url:'',
      data: that.data.formData,
      method: 'POST',
      success: function(res){
        // success
        let msg = res.data;
        console.log(msg)
        that.uploadCommentImage(msg.data);
        that.updateOrdersDetailIsComment();
        wx.navigateBack({
          delta: 1, // 回退前 delta(默认为1) 页面
          success: function(res){
            // success
          },
        })
      },
      fail: function(res) {
        // fail
        console.log("评价失败：",res);
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
    console.log("删除图片：",e)
    let files = this.data.files;
    files.splice(e.detail.index,1);
    this.setData({
      files:files
    })
    console.log(files)
  },

  chooseImage: function (e) {
    console.log("选择图片：",e);
    let tempFilePaths = e.detail.tempFilePaths;
    var that = this;
    for(let i=0;i<tempFilePaths.length;i++){
      that.setData({
        files: that.data.files.concat({url:tempFilePaths[i]})
      });
    }
    // console.log("files:",that.data.files)
  },

  selectFiles:function(files) {
    console.log('selectFiles:', files)
    // 返回false可以阻止某次文件上传
  },
  //评分
  radioChange:function(e){
    let score = e.detail.value;
    // console.log(score);
    this.setData({['formData.score']:score});
  },
  //匿名
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
    // console.log(this.data.formData.comment)
  },
  /**
   * 页面的初始数据
   */
  data: {
    files: [],
    user:null,
    ordersDetail:null,
    goods:null,
    commentFontCount:0,
    formData:{
      isAnonymous:false,
      score:5
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
    const eventChannel = this.getOpenerEventChannel();
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