
(function($){
  var ListView = Backbone.View.extend({
    el: $('body'), 
    initialize: function(){
      // Underscore.js function -> prevent looses of context
      _.bindAll(this, 'render'); 
       this.render(); 
    },
    render: function(){
      $(this.el).append("<h1>hello world</h1>");
    }
  });

  var listView = new ListView();
})(jQuery);
