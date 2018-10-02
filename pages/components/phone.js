const app = getApp();
Component({
    properties : {
      data : {
        type : Array,
        value : []
      }
    },
    data : {
      show : false
    },
    methods : {
      show : function() {
        this.setData({
          show : true
        });
      },
      hide : function() {
        this.setData({
          show : false
        })
      },
      sms : function() {
        
      },
      call : function(e) {
        var item = e.currentTarget.dataset.item;
        var phone = item.phone;
        this.Global.makePhone(phone);
      }
    },
    ready : function() {
      this.Global = app.Global;
    }
})
