// pages/playlist/playlist.js
import Playlist from '../../models/playlist.js'
import Discover from '../../models/discover.js'
const discover = new Discover();
let playlist = new Playlist();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playlist: {},
    loading: false,
    loadingCenter: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      loadingCenter: true
    })
    if (this.options.playlistid) {
      playlist.getPlaylist(this.options.playlistid, (data) => {
        this.setData({
          playlist: data.playlist,
          loadingCenter: false
        })
      })
    } else if (this.options.idx) {
      discover.getToplist(this.options.idx, data => {
        this.setData({
          playlist: data.playlist,
          loadingCenter: false
        })
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
    return {
      title: this.data.playlist.name,
      imageUrl: this.data.playlist.coverImgUrl,
      path: '/pages/playlist/playlist?playlistid=' + this.data.playlist.id
    }
  }
})