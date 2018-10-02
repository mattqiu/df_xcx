const app = getApp();
Component({
    properties : {
    },
    data : {
    },
    methods : {
    },
    ready : function() {
      this.Global = app.Global;
      var page = this.Global.getCurrentPage();
      var route = page.route;
      this.setData({
        route : route
      });
    }
})
