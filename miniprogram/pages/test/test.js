
const app = getApp()
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    imgUrl: '',
    avatarUrl: defaultAvatarUrl,
    nicknameC:'点击登录',
    show: false,
    active:true
    },

     
    onClose() {
      this.setData({ show: false });
    },

    onChooseAvatar(e) {
      const { avatarUrl } = e.detail 
      this.setData({ avatarUrl, })     
    },

    formSubmit(e){
      // console.log('e.detail.value.nickname',e.detail.value.nickname);
      let nickname = e.detail.value.nickname
      console.log(nickname);
        if(this.data.nicknameC=='点击登录'){
          this.setData({ show: true });
          console.log('true');
        }       

        this.setData({
          nicknameC:e.detail.value.nickname
        })
        console.log('showtrue1');
    },
    sbumit(){
      if (this.data.nicknameC !== '点击登录' ) {
        this.setData({ show: false });
      }else if(this.data.nicknameC == ''){
        console.log(this.data.nicknameC);
        this.setData({
          nicknameC:'点击登录',
          avatarUrl: defaultAvatarUrl
        })
      } 
    },

   
  
  
})

