
const city = require('../../libs/map');

// pages/citylist/citylist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    citylist:city,//外链全部城市信息
    letter:'A',//默认滚动条位置
    currentCity:'选择地址',//选择当前地址
  },

  // 获取右侧字母表
  getLetter(event){
    let zm = event.target.dataset.zm;
    console.log(zm);
    if(Object.is(zm,undefined)) return;
    this.setData({
      letter:zm,
    })
  },
  // 点击左上角地址，选择地址，更新首页地址
  getCity(event){
    let cityName = event.target.dataset.cityname;//当前点击的城市
    console.log(cityName);
    if(Object.is(cityName,undefined)) return;

    getApp().globaldata.city = cityName;//更新全局共享的位置
    wx.navigateBack()
  },

  // 点击定位城市，可以返回
  currentCity(event){
    let currentC = event.target.dataset.city;
    getApp().globaldata.city = currentC
    wx.navigateBack()
  },


   /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('this.data.citylist',this.data.citylist);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow(){
    let city = getApp().globaldata.city;
    this.setData({
      currentCity: city
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})