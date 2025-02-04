const app = getApp()
// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navH: 0,
    statusHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //自定义头部方法
    this.setData({
      navH: app.globalData.navHeight,
      statusHeight: app.globalData.statusHeight
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

  },

  //   this.getTabBar：返回当前页面的 custom-tab-bar 的组件实例
  // 如果不设置这一步，使用vant-app的tabbar组件替换小程序的tabbar，会发生tabbar组件响应的激活样式不能及时地更新
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ active: 1 })
    }
  }
})