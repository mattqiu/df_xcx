Component({
    properties : {
      placeholder : {
        type : String,
        value : '搜索项目名称'
      },
      value : {
        type : String,
        value : ''
      }
    },
    data : {
      showclear : false
    },
    methods : {
      'confirm' : function(e) {
        var value = e.detail.value;
        this.triggerEvent('confirm',value);
      },
      'onInput' : function(e) {
        var value = e.detail.value;
        if(value.length > 0){
          this.setData({
            showclear : true
          })
        }else{
          this.setData({
            showclear : false
          })
        }
      },
      'clear' : function() {
        this.setData({
          value : '',
          showclear : false
        });
        this.triggerEvent('clear');
      }
    }
})
