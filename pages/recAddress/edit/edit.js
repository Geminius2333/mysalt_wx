// pages/recAddress/edit/edit.js
//导入验证js
import WxValidate from "../../../utils/WxValidate.js";
const app = getApp();
Page({
  //更新收货地址请求
  updateRecAddress:function(){
    let recAddress = this.data.formData;
    wx.request({
      url: app.globalData.url+'/recAddress/update/'+recAddress.id,
      data: {recAddress},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res){
        // success
        let msg = res.data;
        console.log(msg);
        wx.navigateBack();
      },
    })
  },
  //更新表单数据
  formInputChange: function (e) {
    let { field } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    });
    //console.log(this.data.formData);
  },
  bindRegionChange: function (e) {
    let area = e.detail.code[2]
    let { field } = e.currentTarget.dataset
    console.log(e);
    this.setData({ region: e.detail.value });
    this.setData({ [`formData.${field}`]: area });
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
      area: {
        required: true,
      },
      address: {
        required: true,
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
      area: {
        required: '请选择所在地区',
      },
      address: {
        required: '请填写详细地址',
        minlength: '详细地址只有5位'
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
      this.setData({ error: this.WxValidate.errorList[0].msg })
      return false
    } else {
      //wx.showToast({title:"验证成功！"});
      this.updateRecAddress();
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    user: null,
    appUrl: null,
    formData: {
      id:'',
      user: '',
      name: '',
      phone: '',
      area: '440105',
      address: ''
    },
    error: null,
    region: ['广东省', '广州市', '海珠区'],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let that = this;
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('recAddress', function (data) {
      let recAddress = data.data;
      that.setData({formData:recAddress});
      let area = recAddress.recAddressArea.name;
      let city = recAddress.recAddressArea.city.name;
      let province = recAddress.recAddressArea.city.province.name;
    
      that.setData({region:[province,city,area]});
      console.log(recAddress)
    });
    this.initValidate();
    this.setData({ appUrl: app.globalData.url });
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