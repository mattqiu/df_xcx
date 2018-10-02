const app = getApp();
Page({
  data:{
  },
  calHeight : function() {
    wx.createSelectorQuery().select('#j-city-order').boundingClientRect(res=>{
      console.log(res.height);
      this.setData({
        height : res.height
      });
    }).exec();
  },
  onLoad: function(options){
    this.Global = app.Global;
    this.Api = this.Global.Api;
    var cityName = options.cityName;
    var info = wx.getSystemInfoSync();
    this.setData({
      wh : info.windowHeight
    });
    this.Api.city().then(obj=>{
      this.setData({
        city : obj,
        cityName : cityName
      },()=>{
        this.calHeight();
        this.calOffset();
      })
    })
  },
  move : function(e) {
    var height = this.data.height;
    var wh = this.data.wh;
    var offdata = this.data.offset;
    var diff = height / 27;
    var off = e.currentTarget.offsetTop;
    var y = e.touches[0]['clientY'];

    var index = Math.floor((y-off) / diff);
    var origin_index = index;
    index = index < 1 ? 1 : index;
    index = index > 26 ? 26 : index;
    var charCode = String.fromCharCode(64 + index);
    var top = offdata[charCode];
    if(top){
      var scrollY = top;
      this.setData({
        scrollY : scrollY
      });
    }else{
      if(origin_index == 0){
        this.setData({
          scrollY : 0
        });
      }
    }

  },
  calOffset : function() {
    wx.createSelectorQuery().selectAll('.cityList-block').boundingClientRect(res=>{
      var data = {};
      this.Global._.each(res,function(v,k) {
        var index = v.dataset.index;
        data[index] = v.top;
      })
      this.setData({
        offset : data
      });
    }).exec();
  },
  setArea :function(e) {
    var item = e.currentTarget.dataset.index;
    var indexPage = app.getPage('index');
    indexPage.setArea({
      'cityName' : item.name,
      'areaid' :  item.id,
      'cityid' : item.parent
    });
    wx.navigateBack();
  },
  goback : function() {
    wx.navigateBack();
  }
})
