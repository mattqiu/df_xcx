import Global from './utils/global';
import config from './config';
//app.js
App({
  onLaunch: function () {
    wx.clearStorageSync();
    this.Global = new Global;
    this.config = config;
    //这个只会执行一次，获取到wxUser 里面可以知道是否需要注册
    this.Global.initLogin();
    //授权地理位置
    this.Global.WxService.getLocation({
        type : 'gci02'
    }).then(obj => {
        var cs = this.Global.coordtransform.gcj02tobd09(obj.longitude,obj.latitude);
        obj.longitude = cs[0];
        obj.latitude = cs[1];
        this.globalData.userMap = obj;

        this.Global._.each(this.userMapCalllback,function(v) {
          v(obj);
        })
    },obj=>{
        this.globalData.userMap = {};
        this.Global._.each(this.userMapCalllback,function(v) {
          v({});
        });
    });
    //获取身份证信息
    this.Global.Api.getIsOpenSfz().then(obj=>{
      this.globalData.isOpenSfz = obj.data;
    })
    //获得投诉建议
    this.Global.Api.getNoteList().then(obj=>{
      this.globalData.nodeList = obj;
      this.Global._.each(this.nodeListCallback,function(v) {
        v(obj);
      });
    })
    //获得站点配置
    this.Global.Api.config().then(obj=>{
      this.globalData._config = obj;
      this.Global._.each(this._configCallback,function(v) {
        v(obj);
      });
    })
    //获得底部信息
    this.Global.Api.getBottom().then(obj=>{
      this.globalData._bottom = obj;
      this.Global._.each(this._bottomCallback,function(v) {
        v(obj);
      });
    })
    //获得快速报备接口
    this.Global.Api.getPhoneType().then(obj=>{
      this.globalData.phoneType = !!obj.data;
    })
  },
  globalData: {
    userInfo: null,
    pages : {}
  },
  setPage : function(name,page) {
    this.globalData.pages[name] = page;
  },
  getPage : function(name) {
    return this.globalData.pages[name];
  },
  _configCallback : [],
  _bottomCallback : [],
  nodeListCallback : [],
  loginCallback: [],
  userMapCalllback : []
})
