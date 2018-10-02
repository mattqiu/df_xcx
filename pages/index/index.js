import { $stopWuxRefresher } from '../../dist/index'
import Global from '../../utils/global';
const app = getApp()
Page({
  data: {
    current : 0
  },
  search:function(e) {
    var value = e.detail.value;
    var areaid = this.data.areaid;
    var cityid = this.data.cityid;
    var params = {
      kw : value
    };
    //console.log(params);
    wx.setStorageSync('from_xinfang_params',params);
    this.Global.WxService.switchTab('/pages/xinfang/list');
  },
  setArea : function(obj) {
    this.setData({
      cityName : obj.cityName,
      areaid : obj.areaid,
      cityid : obj.cityid
    });
  },
  onSwiperChange : function(e) {
    var current = e.detail.current;
    this.setData({
      current : current
    });
  },
  onPullDownRefresh : function() {
    this.init();
    wx.stopPullDownRefresh();
  },
  link : function(e) {
    var url = e.currentTarget.dataset.url;
    this.Global.link(url);
  },
  onLoad: function () {
    this.Global = app.Global;
    this.Api = this.Global.Api;
    app.setPage('index',this);
    this.Global.loadFontFace();
    this.init();
  },
  init : function() {
    return this.Api.index().then(obj=>{
      obj.isLoad = true;
      wx.setStorageSync('city',{
        'areaid' : obj.areaid,
        'cityid' : obj.cityid,

      });
      //wx.setStorageSync('from_xinfang_params',{
          //area : obj.areaid,
          //city : obj.cityid
      //})
      this.setData(obj);
      wx.setNavigationBarTitle({
        title : obj.title
      });
    })
  },
  onShareAppMessage : function() {
      var title = this.data.title;
      var id = this.options.id;
      return {
          title : title,
          path : '/pages/index/index'
      }
  },
  onReady : function() {
  }
})
