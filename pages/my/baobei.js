const app = getApp();
Page({
  data:{
    cid : 0,
    dayId: 0,
    dayList: [
      { name: '全部' },
      { name: '今日' },
      { name: '昨日' },
      { name: '本周' },
      { name: '本月' }
    ]
  },
  onLoad: function(options){
    this.Global = app.Global;
    this.Api = this.Global.Api;
  },
  onShow : function() {
    console.log(app.globalData.user);
    this.getData();
  },
  onClear : function() {
    this.setData({
      kw : ''
    });
    this.getData();
  },
  getData : function() {
    this.Global.getUser().then(obj=>{
      this.Api.subList({
        uid : obj.id,
        user_type : 0,
        kw : this.data.kw || '',
        day: this.data.dayId
      }).then(obj=>{
        this.setData({
          list : obj
        })
      })
    })
  },
  //带看
  goGenjin: function(e) {
    var item = e.currentTarget.dataset.item;
    this.Global.WxService.navigateTo('/pages/baobei/daikan?id=' + item.id);
  },
  //去详情
  goDetail : function(e) {
    var item = e.currentTarget.dataset.item;
    this.Global.WxService.navigateTo('/pages/baobei/order?id=' + item.id);
  },
  onSearch : function(e) {
    var kw = e.detail;
    this.setData({
      kw : kw
    });
    this.getData();
  },
  changeCid : function(e) {
    var cid = e.currentTarget.dataset.index;
    this.setData({
      cid : cid
    });
  },
  changeDay: function (e) {
    var dayId = e.currentTarget.dataset.index;
    this.setData({
      dayId: dayId
    });
    this.getData();
  },
})
