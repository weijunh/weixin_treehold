import Toast from '../dist/toast/toast'
Component({
  /**   * 组件的初始数据   */
  data: { active: 0 },
  /**   * 组件的方法列表   */
  methods: {
    onChange: function (event) {
      // event.detail是vant-app的tabbar组件选择的序号，相当于获取点击van-tabbar-item的序号 
      if (event.detail == 0) {
        wx.switchTab({
          url: "/pages/index/index"
        })
        this.setData({ active: event.detail })
      }

      else if (event.detail == 1) {
        wx.switchTab({
          url: "/pages/release/release"
        })
        this.setData({ active: event.detail })
      }

      else if (event.detail == 2) {
        wx.switchTab({
          url: "/pages/myinfo/myinfo"
        })
        this.setData({ active: event.detail })
      }

      else if (event.detail == 3) {
        // 只允许从相机扫码
        wx.scanCode({
          scanType: ['barCode', 'qrCode', 'pdf417'],
          success(res) {
            console.log(res)
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 1000
            })
          }
        })
        this.setData({ active: event.detail })
      }

      else if (event.detail == 4) {
        wx.switchTab({
          url: "/pages/service/service"
        })
        this.setData({ active: event.detail })
      }

    }
  }
})