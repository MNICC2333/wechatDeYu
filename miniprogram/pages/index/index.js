
// pages/me/me.js
Page({

  /** 页面的初始数据*/
  data: {
    cid:1,
    movies:[],
    city:'',//获取当前的位置城市
  },

  /** 生命周期函数--监听页面加载*/
  /**
   * 封装电影列表数据
   * @param {number} cid 类别ID
   * @param {number} offset 起始下标
   * @param {function} callback 封装方法：通过cid\offset加载电影列表
   */
  loadData(cid,offset,callback){
    // 加载等待框
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: 'https://api.tedu.cn/index.php',
      method:'GET',
      data:{cid, offset},
      success:(res) => {
        console.log('点击导航更新数据',res);
        callback(res.data);
      },
      fail:(err)=>{
        console.log(err);
      },
      complete:()=>{ //无论成功或者失败都会执行
        wx.hideLoading();//关闭弹窗
      }
    });   
  },
  /**
   * 获取当前点击列表的序号
   * @param {object} event 事件对象 
   */
  cutList(event){
    let cid = event.target.dataset.sign;
    console.log('cidcidcid',cid);
    // 实时更行cid的值
    this.setData({cid})
    //在缓存中有相应的数据，直接显示
    wx.getStorage({
      key:cid,
      // 如果缓存中有想要的数据，则执行此操作
      success: (data)=>{
        console.log('拿缓存');
        this.setData({movies:data.data});
      },
      // 没有执行以下操作：重新发送请求
      fail:()=>{
        // 异步的问题，更新要在回调里面
        this.loadData(cid, 0, (resData)=>{
          console.log('再次获取');
          this.setData({
            cid:cid,
            movies:resData
          });
          // 缓存点击列表的数据
          wx.setStorage({
            key:cid,
            data:resData
          })
        });
      }
    }) 
  },

  // 获取当前位置
    getLocationInfo(){
    // 全局封装一下
    // let QQMapWX = require('../../libs/qqmap-wx-jssdk.min');
    // let qqmapsdk = new QQMapWX({key:'DTIBZ-ZMPWJ-42FFR-D5QLQ-2QRPJ-B3FJI'});

    console.log(getApp().globaldata.qqmapsdk);

    getApp().globaldata.qqmapsdk.reverseGeocoder({
      success:(res)=>{
        console.log(res);
        let city = res.result.address_component.city;//当前位置
       
        getApp().globaldata.city = city //获取全局下的当前位置并更新全局数据

        this.setData({city})

      },
      fail:(err)=>{
        console.log('errerrerr',err);
      }
    })
  },


  // 第一次加载页面时的数据
  onLoad() {
    // 获取当前位置信息
    this.getLocationInfo();

    // 获取首页数据
    this.loadData(1,0,(resData)=>{
      this.setData({
        movies:resData
      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    console.log('触底就发送https请求');
    let cid = this.data.cid;
    let offset = this.data.movies.length;
    console.log(cid,offset);
    this.loadData(cid,offset,(resData)=>{
      this.setData({
        movies:this.data.movies.concat(resData)
      });
      if(resData.length == 0){
        wx.showToast({
          title: '到底啦~',
          icon:'error'
        });
        return;
      }
    })
  },

  /**
   * 下拉刷新事件
   */
  onPullDownRefresh(){
    console.log('下拉刷新事件触发...');
    this.loadData(this.data.cid,0,(resData)=>{
      // 替换列表
      this.setData({ movies:resData});
      // 更新缓存
      wx.setStorage({
        key:this.data.cid,
        data:resData
      });
      wx.stopPullDownRefresh()
    })
  },

  // 页面跳转，更新首页右上角城市信息
  onShow(){
    let nowCity = getApp().globaldata.city;
    this.setData({
      city: nowCity
    })
  }
})