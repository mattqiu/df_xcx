const app = getApp();
const _ = app.Global._
Page({
  data:{
    index : -1,
    isNeedLoadMore: 1,
    page : 1,
    tabs : [{
      _default : '区域',
      name : '区域'
    },{
      _default : '均价',
      name : '均价'
    },{
      _default : '首付',
      name : '首付'
    },{
      _default : '筛选',
      name : '筛选'
    },{
      _default : '排序',
      name : '排序'
    }]
  },
  showFilter : function(e) {
    var _index = this.data.index;
    var index = e.currentTarget.dataset.index;
    if(index != _index){
      this.setData({
        index : index
      });
    }else{
      this.setData({
        index : -1
      });
    }
  },
  onSearch : function(e) {
    var kw = e.detail;
    var options = this.data.options;
    options['kw'] = kw;
    this.setData({
      options : options
    });
    this.reset();
  },
  //刷新tabs的显示内容
  refreshTabs : function() {
    var filter = this.data.filter;
    var tabs = this.data.tabs;
    //区域
    var f0 = filter[0];
    var value = this.data.options;
    var cityid = value.city;
    var areaid = value.area;
    var streetid = value.street;
    var name = '';

    var city = f0;

    if(cityid){
      var city = _.findWhere(f0.list,{
        id : cityid
      });
      var name = city.name;
      var areas = city.childAreas;
    }
    if(areaid){
      var area = _.findWhere(areas,{
        id : areaid
      });
      var name = area.name;
      var streets = area.childAreas;
    }
    if(streetid){
      var street = _.findWhere(streets,{
        id : streetid
      });
      var name = street.name;
    };
    tabs[0].name = name || tabs[0]._default;

    this.setData({
      tabs : tabs
    })

    //总价
    //首付
    //筛选
    //排序
  },
  onFilterSelect : function(e) {
      this.closeFilter();
      var index = e.currentTarget.dataset.index;
      var filter = this.data.filter;
      var value = e.detail;
      this.Global._.extend(this.data.options,value);
      this.setData({
        filter : filter,
        options : this.data.options
      });
      this.refreshTabs();
      this.reset();
  },
  closeFilter : function() {
    this.setData({
      index : -1
    })
  },
  onLoad: function(options){
    var params = this.getStorage();
    this.Global = app.Global;
    this.Api = this.Global.Api;
    this.Global.loadFontFace();
    app.setPage('xinfang.list',this);
    

    if(this.Global._.isEmpty(options)){
      this.options = params || {};
    }

    this.getData(this.options);
    //新房筛选
    this.Api.filter({
      cate : 'plotFilter'
    }).then(obj=>{
      //将参数合并到filter中
      this.setData({
        filter : obj,
        options : this.options,
        isLoad : true
      })
      this.refreshTabs();
    })
  },
  onShow : function() {
    var params = this.getStorage();
    var options = this.data.options;
    var isEqual = this.Global._.isEqual(options,params);
    var isLoad = this.data.isLoad;
    if(this.Global._.isEmpty(options) && this.Global._.isEmpty(params)){
      this.Global.getUser().then(obj=>{
        if(obj.is_true){
          var list = this.data.list;
          this.Global._.each(list,function(v,k) {
            list[k]['pay'] = list[k]['yj_origin'];
          });
          this.setData({
            list : list
          });
        }else{
          var list = this.data.list;
          this.Global._.each(list,function(v,k) {
            list[k]['pay'] = '暂无权限查看';
          });
          this.setData({
            list : list
          });
        }
      })
      return;
    }
    //如果相同就不用管，不相同重置
    if(isEqual || !isLoad){
      return;
    }else{
      this.setData({
        options : params
      });
      this.refreshTabs();
      this.reset();
    }
  },
  onReachBottom : function() {
    this.loadmore();
  },
  onReady : function() {
  },
  onPullDownRefresh : function() {
    this.reset();
    wx.stopPullDownRefresh();
  },
  reset : function() {
    this.setData({
      list : [],
      page : 1,
      isNeedLoadMore : 1
    });
    var params = this.Global._.extend({},this.data.options);
    this.setStorage(params);
    this.loadmore();
  },
  loadmore : function() {
    if(this.data.isNeedLoadMore == 1){
      this.getData(this.data.options);
    }
  },
  getData : function(options) {
    var page = this.data.page;
    var params = this.Global._.extend({},options,{
      page : page,
      is_login : this.Global.isLogin()
    });
    this.Global.getUserMap().then(obj=>{
      //判断是否登陆
      if(obj.latitude){
        params['map_lat'] = obj.latitude;
        params['map_lng'] = obj.longitude;
      }
      //新房列表
      this.Api.xfList(params).then(obj=>{
        var list = obj.list;
        this.data.list = this.Global._.union(this.data.list,list);
        var params = {
          list : this.data.list,
          page : obj.page+1,
        };
        if(obj.page >= obj.page_count){
          params.isNeedLoadMore = 2;
        }
        this.setData(params);
      });
    })
  },
  getStorage : function() {
    return wx.getStorageSync('from_xinfang_params');
  },
  setStorage: function(data) {
    return wx.setStorageSync('from_xinfang_params',data);
  },
  getShareParams : function() {
    var arr = [];
    this.Global._.each(this.data.options,function(v,k) {
      arr.push(k + '=' + v);
    });
    return arr.join('&');
  },
  onShareAppMessage : function() {
      var title = '新房';
      console.log(this.data.options);
      return {
          title : title,
          path : '/pages/xinfang/list?' + this.getShareParams()
      };
  }
})
