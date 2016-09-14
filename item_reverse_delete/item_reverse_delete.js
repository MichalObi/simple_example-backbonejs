
(function($){

  Backbone.sync = function(method, model, success, error){
    success();
  }

  Backbone.pubSub = _.extend({}, Backbone.Events);

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
    events: {
      'click span.swap':  'swap',
      'click span.delete': 'remove'
    },
    initialize: function(){
      _.bindAll(this, 'render', 'unrender', 'remove', 'swap');

      this.model.bind('change', this.render);
      this.model.bind('remove', this.unrender);
    },
    render: function(){
      $(this.el).html('<span style="color:black;">'+this.model.get('part1')+' '+this.model.get('part2')+'</span> &nbsp; &nbsp; <span class="swap" style="font-family:sans-serif; color:blue; cursor:pointer;">[swap]</span> <span class="delete" style="cursor:pointer; color:red; font-family:sans-serif;">[delete]</span>');
      return this; // for itemView.render().el in appendItem
    },
    unrender: function(){
      $(this.el).remove();
    },
    remove: function() {
      this.model.destroy();
    },
    onUpdateItemsCounter: function() {

    },
    swap: function(){
      var swapped = {
        part1: this.model.get('part2'),
        part2: this.model.get('part1')
      };
      this.model.set(swapped);
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
