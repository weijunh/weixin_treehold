const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navH: 0,
    content: "" //发布的内容
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //自定义头部方法
    this.setData({
      navH: app.globalData.navHeight
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
  //   this.getTabBar：返回当前页面的 custom-tab-bar 的组件实例
  // 如果不设置这一步，使用vant-app的tabbar组件替换小程序的tabbar，会发生tabbar组件响应的激活样式不能及时地更新
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ active: 1 })
    }
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

  homeClick() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  backClick() {
    if (this.data.customBackReturn) {
      //自定义组件触发事件时，需要使用 triggerEvent 方法，指定事件名、detail对象和事件选项：
      // 微信小程序中是通过triggerEvent来给父组件传递信息的
      this.triggerEvent("customBackReturn")
    } else {
      if (getCurrentPages().length == 1) {
        wx.switchTab({
          url: '/pages/index/index',
        })
      } else {
        wx.navigateBack({
          delta: 1
        })
      }
    }
  },
  bindFormSubmit: function (e) {
    this.setData({
      content: e.detail.value.textarea
    })
    console.log(this.data)

  }
})