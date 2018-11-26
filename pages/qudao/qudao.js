// pages/qudao/qudao.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: String,
    showclear: false
  },
  confirm: function (e) {
    var value = e.detail.value;
    this.triggerEvent('confirm', value);
  },
  onInput: function (e) {
    var value = e.detail.value;
    if (value.length > 0) {
      this.setData({
        showclear: true
      })
    } else {
      this.setData({
        showclear: false
      })
    }
  },
  showFilter: function (e) {
    var _index = this.data.index;
    var index = e.currentTarget.dataset.index;
    if (index != _index) {
      this.setData({
        index: index
      });
    } else {
      this.setData({
        index: -1
      });
    }
  },
})