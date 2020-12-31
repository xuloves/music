// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: 0,
    latitude: 0,
    markers: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.getLocation({
      type: 'gcj02',
      altitude: true, //高精度定位
      success(res) {
        // 设置坐标
        const {
          latitude,
          longitude
        } = res
        const markers = [{
          iconPath: '/images/me/near.png',
          width: 50,
          height: 50,
          id: 2,
          longitude:longitude+0.005,
          latitude:latitude+0.005,
          zIndex:1
        }
        ,{
          iconPath: '/images/me/near.png',
          width: 50,
          height: 50,
          id: 3,
          zIndex:1,
          longitude,
          latitude:latitude+0.005
        },{
          iconPath: '/images/me/near.png',
          width: 50,
          height: 50,
          id: 1,
          zIndex:1,
          longitude:longitude+0.005,
          latitude
        }
      ]
        console.log(markers);
        that.setData({
          longitude,
          latitude,
          markers
        })
      },
      fail(err) {

      }
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