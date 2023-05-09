// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailData:[],
    isOpen:false,
    image:[],
    comments:[]
  },

  /**
   * 生命周期函数--监听页面加载
   * options 封装的事上一个页面传过来的参数
   */
  tapImage(event){
    // 设置空数组，接收截取后的元素
    let newUrls = [];
    // 截取图片路径
    this.data.detailData.thumb.forEach(url => {
      newUrls.push(url.split('@')[0])
    });
   
    // 获取当前图片的下标
    let index = event.target.dataset.index;
    if(Object.is(index,undefined)) return;

    wx.previewImage({
      urls:newUrls,//【需要预览的图片链接列表】
      current:newUrls[index] //点哪看那【当前显示图片的链接】
    })
  },
  // 显示和隐藏简介
  tapIntro(){
    this.setData({ 
      isOpen : !this.data.isOpen,
    });
  },
  onLoad(options) {
    let id = options.id
    console.log('ididid',id);
    // 发送网络请求获取当前影片的具体信息数据
    wx.request({
      url: 'https://api.tedu.cn/detail.php',
      method:'GET',
      data:{id:id},
      success:(res)=>{
        console.log('发送网络请求获取当前影片的具体信息数据',res);
        this.setData({
          detailData:res.data,
          image: res.data.thumb
        });
      }
    });

    // 获取数据库中的评论数据
    let db = wx.cloud.database({env:'cc-cloud-5gt7gfs4564db27d'});

    db.collection('comments').where({
      movieid:id
    }).limit(5).get({
      success: (res) => {
        console.log('获取数据库中的评论数据',res);
        this.setData({
          comments: res.data
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
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

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