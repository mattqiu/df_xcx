const app = getApp();
Page({
  data:{
    index: -1,
    isNeedLoadMore: 1,
    page: 1,
    cid : '',
    dayId: 0,
    dayList: [
      { name: '全部' },
      { name: '今日' },
      { name: '昨日' },
      { name: '本周' },
      { name: '本月' }
    ],
    list:[],
    list1:[]
  },
  onLoad: function(options){
    
  },
  onShow : function() {
    this.setData({
      kw: '',
      list1: '',
      page: 1,
      cid: '',
      dayId: '',
    });
    this.Global = app.Global;
    this.Api = this.Global.Api;
    this.getData();
  },
  onClear : function() {
    this.setData({
      kw : ''
    });
    this.getData();
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
      kw : kw,
      list1: '',
      page: 1,
    });
    this.getData();
  },
  changeCid : function(e) {
    var cid = e.currentTarget.dataset.index;
    console.log(e.currentTarget.dataset.cid);
    this.setData({
      cid : cid,
      page: 1,
      list1:''
    });
    this.getData();
  },
  changeDay: function (e) {
    var dayId = e.currentTarget.dataset.index;
    this.setData({
      dayId: dayId,
      page: 1,
      list1: ''
    });
    this.getData();
  },
  getData: function () {
    console.log(this.data.page);
    this.Global.getUser().then(obj => {
      this.Api.subList({
        uid: obj.id,
        user_type: 0,
        page: this.data.page,
        kw: this.data.kw || '',
        day: this.data.dayId,
        cid: this.data.cid,
      }).then(obj => {
        var list = obj.list;
        this.data.list = this.Global._.union(this.data.list1, list);
        var params = {
          list1: this.data.list,
          page: this.data.page + 1,
          list: obj.groups,
        };
        if (this.data.page >= obj.page_count) {
          params.isNeedLoadMore = 2;
        }

        this.setData(params);
        // this.setData({
        //   list: obj.groups,
        //   list1:obj.list
        // })
      })
    })
  },
  onReachBottom: function () {
    this.loadmore();
  },
  loadmore: function () {
    if (this.data.isNeedLoadMore == 1) {
      this.getData(this.data.options);
    }
  },
})
