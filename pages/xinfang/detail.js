const app = getApp();
Page({
  data:{
    limit : false,
    jubao : false,
    current : 0
  },
  toggleAllContent : function() {
    this.setData({
      limit : !this.data.limit
    });
  },
  jubao : function() {
    //没有用户信息就弹框
    this.Global.checkLogin().then(obj=>{
      var cjubao = this.selectComponent('#cjubao');
      cjubao.show();
    });
  },
  hidejubao : function() {
    this.setData({
      jubao : false
    })
  },
  swiperChange:function(e) {
                 console.log(e);
    var current = e.detail.current;
    console.log(current);
    this.setData({
      current : current
    })
  },
  showLocation : function() {
    var data = this.data;
    this.Global.showMapLocation({
      address : data.address,
      map_lat : data.map_lat,
      map_lng : data.map_lng,
      map_zoom : data.map_zoom,
      name: data.title
    })
  },
  onLoad: function(options){
    this.Global = app.Global;
    this.Api = this.Global.Api;
    var id = options.id;
    //获取地理位置
    this.Global.getUserMap().then(obj=>{
      var params = {
        id : id
      };
      if(obj.latitude){
        params['map_lat'] = obj.latitude;
        params['map_lng'] = obj.longitude;
      }
      this.Global.getUser().then(obj=>{
        console.log(obj);
        if(obj.id){
          params['uid'] = obj.id;
          params['is_login'] = 1;
        }else{
          params['is_login'] = 0;
        }
        this.Api.xfDetail(params).then(obj=>{
          this.setData(obj,()=>{
            wx.createSelectorQuery().select('#j-mdContent').boundingClientRect(res=>{
              if(res.height > 23 * 4){
                this.setData({
                  mdContentMore : true,
                  limit : true
                });
              }
            }).exec()
          });

          this.setData({
            options : options
          });
          wx.setNavigationBarTitle({
            title : obj.title
          })
          this.Global.wxParse.wxParse('_dk_rule', 'html',obj.dk_rule, this,15);
          this.Global.wxParse.wxParse('_sell_point', 'html',obj.sell_point, this,15);
          //同区域楼盘
          this.Api.xfList({
            limit : 6,
            area : obj.areaid,
            infoid : id,
            is_login : this.Global.isLogin()
          }).then(obj=>{
            console.log(obj);
            this.setData({
              'relationList' : obj
            })
          })
        });
      })
    });
    this.Global.loadFontFace();
  },
  goAreaList : function() {
    //this.Global.link('/pages/xinfang/list?area=' + this.data.areaid);
  },
  previewHxImage : function(e) {
    var image = e.currentTarget.dataset.image;
    image = image.replace(/\?.*/,'');
    wx.previewImage({
      urls : [image],
      current : image
    })
  },
  previewImage : function(e) {
    var index = e.currentTarget.dataset.index;
    var urls = this.Global._.map(this.data.images,function(v) {
      return v.url.replace(/\?.*/,'');
    });
    wx.previewImage({
      urls : urls,
      current : urls[index]
    });
  },
  qianyue : function() {
    this.Global.checkUser().then(obj=>{
      this.Api.addCo({
        uid : obj.id,
        hid : this.data.id
      }).then(obj=>{
        if(obj.status == 'success'){
          this.Global.showOkMsg(obj.msg);
        }else{
          this.Global.showErrorMsg(obj.msg);
        }
      })
    })
  },
  call : function() {
    var phones = this.data.phones;
    if(phones.length == 0){
      this.Global.showErrorMsg('没有电话');
    }
    if(phones.length == 1){
      this.Global.makePhone(phones[0]['phone']);
    }
    if(phones.length > 1){
      var cphone = this.selectComponent('#cphone');
      cphone.show();
    }
  },
  goBaobei : function() {
    this.Global.checkUser().then(obj=>{
      this.Global.WxService.navigateTo('/pages/baobei/index?id=' + this.data.id);
    });
  },
  onShareAppMessage : function() {
      var title = this.data.wx_share_title;
      var id = this.options.id;
      return {
          title : title,
          path : '/pages/xinfang/detail?id=' + id
      }
  },
  onReady : function() {
  }
})
