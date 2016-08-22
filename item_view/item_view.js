
(function($){

  var Item = Backbone.Model.extend({
    defaults: {
      part1: 'hello',
      part2: 'word'
    }
  });

  var List = Backbone.Collection.extend({
    model: Item
  });

  // new View for Item and specyfic render function
  var ItemView = Backbone.View.extend({
    tagName: 'li', 
    initialize: function(){
      _.bindAll(this, 'render'); 
    },
    render: function(){
      $(this.el).html('<span>'+this.model.get('part1')+' '+this.model.get('part2')+'</span>');
      return this; // for itemView.render().el in appendItem
    }
  });

  var ListView = Backbone.View.extend({
    el: $('body'), 
    // handle events
    events: {
      'click button#add_item': 'addItem'
    },
    initialize: function(){
      // Underscore.js function -> prevent looses of context
      _.bindAll(this, 'render', 'addItem', 'appendItem');
      this.collection = new List();
      this.collection.bind('add', this.appendItem);
      this.itemsCounter = 0;
      this.render(); 
    },
    render: function(){
      var self = this;
      $(this.el).append("<button id='add_item'>Add item to list</button>");
      $(this.el).append("<h1>Total items: "+ this.itemsCounter +"</h1>");
      $(this.el).append("<ul class='items_list'></ul>");
      // if it's not empty on start
      _(this.collection.models).each(function(item){ 
        self.appendItem(item);
      }, this);
    },
    addItem:function() {
       this.itemsCounter ++;
       var item = new Item();
       item.set({
        part2: item.get('part2') + " " + this.itemsCounter
       });
       // this collection has add method
       this.collection.add(item);
       $("h1").text("Total items: "+ this.itemsCounter);
    },
    appendItem:function(item){
      var itemView = new ItemView({
        model: item
      });
      $('.items_list').append(itemView.render().el);
    }
  });

  var listView = new ListView();
})(jQuery);
