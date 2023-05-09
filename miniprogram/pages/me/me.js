// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin : false,  // 用于表示是否已经登录
    userInfo: {   // 用于绑定用户信息
      avatarUrl: '',
      nickName: '点击登录'
    },  
  },

  /** 点击头像，选择头像 */
  tapAvatar(){
    console.log('点击头像，选择头像')
    if(!this.data.isLogin) return; // 没登录
    // 选择头像
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      success: (res)=>{
        console.log('选择图片完毕', res)
        let path = res.tempFiles[0].tempFilePath
        // 修改用户头像路径为path即可
        let userInfo = this.data.userInfo
        userInfo.avatarUrl = path
        this.setData({userInfo})
        // 将选中的头像上传至云存储
        this.upload(path)
      }
    })
  },

  /** 将path指向的文件上传至云存储 */
  upload(path){
    let ext = path.substr(path.lastIndexOf('.')) // 截取后缀
    let cloudPath = Math.random() + ext // 0.234434242342.jpg
    wx.cloud.uploadFile({
      filePath: path,         // 本地文件路径
      cloudPath: cloudPath,   // 随机的云端存储路径
      success: (res)=>{
        console.log('上传文件成功', res)
        let fileID = res.fileID   // 访问图片的远程链接
        // 修改users集合中当前用户的avatarUrl为fileID即可完成持久化保存
        this.updateUserAvatar(fileID)
      },
      fail: (err)=>{
        console.warn(err)
      } 
    })
  },
  /** 修改云数据库，将当前用户的头像修改为fileID */
  updateUserAvatar(fileID){
    let db = wx.cloud.database()
    let _id = this.data.userInfo._id  // 当前登录用户的_id主键
    db.collection('users').doc(_id).update({
      data: { avatarUrl: fileID },
      success: (res)=>{
        console.log('修改用户头像', res)
      }
    })
  },

  /** 点击登录 */
  tapLogin(){
    if(this.data.isLogin) return;
    wx.getUserProfile({
      desc: '获取用户信息用于维护会员权益',
      success: (res)=>{
        console.log('获取用户信息', res)
        // 将res.data.userInfo 存入 this.data.userInfo
        this.setData({
          isLogin: true,  // 表示登录成功
          userInfo: res.userInfo
        })
        // 先去自家数据库中找找是否登录过，
        let db = wx.cloud.database()
        db.collection('users').get().then(loginRes=>{
          console.log('查询users个人信息', loginRes)
          // 找到了直接显示，没找到，注册用户
          if(loginRes.data.length==0){
            this.regist(res.userInfo)
          }else {
            this.setData({
              // 把登录用户信息更新掉this.data
              userInfo: loginRes.data[0] 
            })
          }
        })
      }
    })
  },

  /** 注册用户，将userInfo对象存入云数据库users集合 */
  regist(userInfo){
    let db = wx.cloud.database()
    db.collection('users').add({
      data: userInfo,
      success: (res)=>{
        console.log('注册用户', res)
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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