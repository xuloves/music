import Register from '../../models/register.js';
const register = new Register();
Page({
  //手机号
  phone: '',

  //判断注册还是找回密码
  type:1,
  /**
   * 页面的初始数据
   */
  data: {
    disabled: true,
    btnVal:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.type==1){
      this.type=1
     this.setData({ btnVal: "注册" })
     wx.setNavigationBarTitle({
      title: '注册账号',
    })
    }else{
      this.type=0
      this.setData({ btnVal: "找回密码" })
      wx.setNavigationBarTitle({
        title: '找回密码',
      })
    }
  },
  //发送验证码
  sendMsg: function (event) {
    register.sendMsg(this.phone, data => {
      if (data.code == 200) {
        wx.showToast({
          title: '发送成功',
          icon: 'success',
          duration: 1000
        })
      } else if (data.code == 400) {
        wx.showToast({
          title: '发送频繁',
          icon: 'error',
          duration: 1000
        })
      } else {
        wx.showToast({
          title: '发送失败',
          icon: 'error',
          duration: 1000
        })
      }
    })
  },

  //点击注册
  onRegisterSubmitTap: function (e) {
    const {phone,pwd,checkpwd,captcha}=e.detail.value
    //判空
    if(pwd==''||checkpwd==''){
      wx.showToast({
        title: '请输入密码',
        icon: 'error',
        duration: 2000
      })
      return
    }
    //判断密码相同
    if (pwd !==checkpwd) {
      wx.showToast({
        title: '输入密码不同',
        icon: 'error',
        duration: 2000
      })
      return
    }
    //是否输入验证码
    if (!captcha) {
      wx.showToast({
        title: '请输入验证码',
        icon: 'error',
        duration: 2000
      })
      return
    }
   
    //是否注册过
    register.checkPhone(phone, data => {
      console.log(data);
      if (data.exist == 1) {
        //找回密码
        if(this.type==0){
          register.registerAndfindPwd(phone, pwd, captcha, data => {
            wx.showToast({
              title: '修改成功！',
              icon: 'success',
              duration: 2000
            })
          })
        }else{
          wx.showToast({
            title: '该账号已注册！',
            icon: 'success',
            duration: 2000
          })
        }
      } else {
        if(this.type==0){
          wx.showToast({
            title: '该账号未注册！',
            icon: 'error',
            duration: 2000
          })
          return
        }
        //注册
        register.registerAndfindPwd(phone, pwd, captcha, data => {
          wx.showToast({
            title: '注册成功！',
            icon: 'success',
            duration: 2000
          })
        })

      }
      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }, 2000)
    })

  },

  checkPhoneNumber: function (e) {
    console.log(e)
    let phoneNo = e.detail.value
    // 正则验证
    let isValid = /^1[3456789]\d{9}$/.test(phoneNo)
    if (isValid) {
      this.setData({
        disabled: false
      })
      this.phone = phoneNo
    } else {
      wx.showToast({
        title: '手机号输入错误',
        icon: 'none',
        duration: 1000
      })
    }
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