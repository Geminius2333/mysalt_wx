// pages/recAddress/add/add.js
//导入验证js
import WxValidate from "../../../utils/WxValidate.js";
const app = getApp();
Page({

  //添加收货地址
  addRecAddress:function(){
    this.setData({'formData.user': this.data.user.id});
    let json = this.data.formData;
    console.log(json);
    wx.request({
      url: app.globalData.url+'/recAddress/add',
      data: {json},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res){
        // success
        let msg = res.data;
        console.log(msg); 
        wx.navigateBack();
      },
    })
  },
  //获取省
  getProvinceList:function(){
    var that = this;
    wx.request({
      url: app.globalData.url +'/province/all',
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        let msg = res.data;
        that.setData({provinceList:msg.data});
        console.log(msg.data);
      },
    })
  },
  //更新表单数据
  formInputChange:function(e) {
    let { field } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    });
    //console.log(this.data.formData);
  },
  bindRegionChange:function(e){
    let area = e.detail.code[2]
    let { field } = e.currentTarget.dataset
    console.log(e);
    this.setData({ region: e.detail.value});
    this.setData({[`formData.${field}`]:area});
    console.log(this.data.formData);
  },

  //验证函数
  initValidate() {
    const rules = {
      name: {
        required: true,
        minlength: 2
      },
      phone: {
        required: true,
        tel: true
      },
      area:{
        required:true,
      },
      address:{
        required:true,
        minlength: 5
      }
    }
    const messages = {
      name: {
        required: '请填写收件人姓名',
        minlength: '请输入正确的名称'
      },
      phone: {
        required: '请填写手机号',
        tel: '请填写正确的手机号'
      },
      area:{
        required:'请选择所在地区',
      },
      address:{
        required:'请填写详细地址',
        minlength:'详细地址只有5位'
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },
  //点击提交
  submitForm(e) {
    const params = this.data.formData;
    console.log(params)
    // 传入表单数据，调用验证方法
    if (!this.WxValidate.checkForm(params)) {
        console.log(this.WxValidate.errorList);
        this.setData({ error: this.WxValidate.errorList[0].msg})
      return false
    }else{
      //wx.showToast({title:"验证成功！"});
      this.addRecAddress();
    }
  },

  /**
   * 页面的初始数据
   */
  data: {
    user:null,
    appUrl:null,
    formData:{
      user:'',
      name:'',
      phone:'',
      area:'440105',
      address:''
    },
    error:null,
    provinceList:null,
    cityList:null,
    areaList:null,
    region: ['广东省', '广州市', '海珠区'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initValidate();
    this.setData({appUrl:app.globalData.url});
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