// pages/theatre/theatre.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city:'',//当前左上角地址
    cinemas:[],//当前地址下的电影院
  },
  //点击电影院列表 
  tapCinemas(event){
      let i = event.currentTarget.dataset.i;
      let cinema = this.data.cinemas[i];
 
      wx.openLocation({
        latitude:cinema.location.lat,
        longitude:cinema.location.lng,
        name:cinema.title,
        address:cinema.address,
        scale: 18
      })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  onShow(){
    // 更新左上角城市
    this.setData({
      city:getApp().globaldata.city
    });
    // 获取当前坐标下的影院信息
    getApp().globaldata.qqmapsdk.search({
      keyword:'影院',
      region: this.data.city,
      success:(res)=>{
        console.log(res);
        res.data.forEach((item) => {
          console.log('item._distance',item._distance);
          item.distance = (item._distance/1000).toFixed(2)
        })
        this.setData({
          cinemas:res.data,
        })

      },
      fail:(err)=>{
        console.log(err);
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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