Component({
    properties : {
      data : {
        type : Array,
        value : []
      },
      name : {
        type : String
      }
    },
    data : {
    },
    methods : {
      select : function(e) {
        var index = e.currentTarget.dataset.index;
        var current = this.data.current;
        if(current === index){
          index = -1;
        }
        this.setData({
          current : index
        });
      },
      getValue : function() {
        return this.data.current;
      }
    },
    ready : function() {
    }
})
