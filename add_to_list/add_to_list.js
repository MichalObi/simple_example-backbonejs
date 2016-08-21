
(function($){
  var ListView = Backbone.View.extend({
    el: $('body'), 
    // handle events
    events: {
      'click button#add_item': 'addItem'
    },
    initialize: function(){
      // Underscore.js function -> prevent looses of context
      _.bindAll(this, 'render', 'addItem'); 
      this.itemsCounter = 0;
      this.render(); 
    },
    render: function(){
      $(this.el).append("<button id='add_item'>Add item to list</button>");
      $(this.el).append("<h1>Total items: "+ this.itemsCounter +"</h1>");
      $(this.el).append("<ul class='items_list'></ul>");
    },
    addItem:function() {
       this.itemsCounter ++;
       $("h1").text("Total items: "+ this.itemsCounter);
       $('.items_list').append("<li class='test_item_"+this.itemsCounter+"'>Test item_"+ this.itemsCounter +"</li>");
    }
  });
  var listView = new ListView();
})(jQuery);
