// pages/orders/logistics/logistics.js
const app = getApp();
Page({

  getLogisticsInfo:function(trackingNo,expType){
    let that = this;
    wx.request({
      url:app.globalData.url+"/orders/logistcsInfo",
      method:'GET',
      success:function(res){
        let msg = res.data;
        let data = msg.data;
        let logisticsInfo = data.result;
        that.setData({'logisticsInfo':logisticsInfo});
        console.log(msg);
      }
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    deliveryStatus:['揽件','在途中', '正在派件','已签收','派送失败','疑难件','退件签收'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on("orders",function(data){
      console.log(data);
      that.setData({'orders':data});
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
    // this.getLogisticsInfo();
    let data = {
      "status": "0",/* status 0:正常查询 201:快递单号错误 203:快递公司不存在 204:快递公司识别失败 205:没有信息 207:该单号被限制，错误单号 */
      "msg": "ok",
      "result": {
        "number": "780098068058",
        "type": "zto",
        "list": [{
          "time": "2018-03-09 11:59:26",
          "status": "【石家庄市】快件已在【长安三部】 签收,签收人: 本人,感谢使用中通快递,期待再次为您服务!"
        }, {
          "time": "2018-03-09 09:03:10",
          "status": "【石家庄市】 快件已到达 【长安三部】（0311-85344265）,业务员 容晓光（13081105270） 正在第1次派件, 请保持电话畅通,并耐心等待"
        }, {
          "time": "2018-03-08 23:43:44",
          "status": "【石家庄市】 快件离开 【石家庄】 发往 【长安三部】"
        }, {
          "time": "2018-03-08 21:00:44",
          "status": "【石家庄市】 快件到达 【石家庄】"
        }, {
          "time": "2018-03-07 01:38:45",
          "status": "【广州市】 快件离开 【广州中心】 发往 【石家庄】"
        }, {
          "time": "2018-03-07 01:36:53",
          "status": "【广州市】 快件到达 【广州中心】"
        }, {
          "time": "2018-03-07 00:40:57",
          "status": "【广州市】 快件离开 【广州花都】 发往 【石家庄中转】"
        }, {
          "time": "2018-03-07 00:01:55",
          "status": "【广州市】 【广州花都】（020-37738523） 的 马溪 （18998345739） 已揽收"
        }],
        "deliverystatus": "3", /* 0：快递收件(揽件)1.在途中 2.正在派件 3.已签收 4.派送失败 5.疑难件 6.退件签收  */
        "issign": "1",                      /*  1.是否签收                  */
        "expName": "中通快递",              /*  快递公司名称                */       
        "expSite": "www.zto.com",           /*  快递公司官网                */
        "expPhone": "95311",                /*  快递公司电话                */
        "courier": "容晓光",                /*  快递员 或 快递站(没有则为空)*/
                    "courierPhone":"13081105270",       /*  快递员电话 (没有则为空)     */
                    "updateTime":"2019-08-27 13:56:19", /*  快递轨迹信息最新时间        */
                    "takeTime":"2天20小时14分",         /*  发货到收货消耗时长 (截止最新轨迹)  */
                    "logo":"http://img3.fegine.com/express/zto.jpg" /* 快递公司LOGO */
      }
    };
    let logistcsInfo = data.result;
    this.setData({'logisticsInfo':logistcsInfo});
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